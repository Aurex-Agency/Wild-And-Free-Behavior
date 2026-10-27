"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type SubmitEvent } from "react";
import {
  canContinue,
  getResult,
  nextStep,
  prevStep,
  stepNumber,
  TOTAL_STEPS,
  type Answers,
  type StepId,
} from "@/lib/screener";
import { intakeMode, submitIntake, validateContact, type Contact, type ContactErrors } from "@/lib/intake";
import { track } from "@/lib/track";
import { site } from "@/config/site";
import { SunMark } from "@/components/brand";
import { OPEN_EVENT, type OpenDetail } from "./events";
import {
  ageOptions,
  diagnosisOptions,
  notes as noteCopy,
  otherInsuranceOptions,
  paymentOptions,
  priorAbaOptions,
  results,
} from "./copy";

const live = intakeMode === "webhook";

const emptyContact: Contact = { name: "", phone: "", email: "", method: "", note: "" };

// Obviously fictional values: 555-01xx is reserved for fiction, example.com for documentation.
const sampleContact: Contact = {
  name: "Sample Parent",
  phone: "662-555-0142",
  email: "parent@example.com",
  method: "call",
  note: "Sample note for the design preview.",
};

const stepTitles: Record<Exclude<StepId, "result">, string> = {
  payment: "How will you pay for services?",
  "other-insurance": "What would help most right now?",
  child: "A little about your child",
  contact: "How should we reach you?",
  done: live ? "Thank you. We have your details." : "That's the whole preview.",
};

type SendState = "idle" | "sending" | "failed";

function OptionGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
  hideLegend = false,
}: {
  name: string;
  legend: string;
  options: { value: T; label: string; hint?: string }[];
  value: T | undefined;
  onChange: (v: T) => void;
  hideLegend?: boolean;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className={hideLegend ? "sr-only" : "mb-3 font-semibold text-cafe"}>{legend}</legend>
      <div className="grid gap-2.5">
        {options.map((o) => (
          <label key={o.value} className="option">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <span className="leading-snug">
              <span className="block">{o.label}</span>
              {o.hint && <span className="mt-0.5 block text-[0.9375rem] font-medium text-cafe-soft">{o.hint}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function ScreenerDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [step, setStep] = useState<StepId>("payment");
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [send, setSend] = useState<SendState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const moved = useRef(false);

  const result = getResult(answers);
  const title = step === "result" ? results[result.type].title : stepTitles[step];
  const current = stepNumber(step);

  const reset = useCallback(() => {
    setAnswers({});
    setContact(emptyContact);
    setContactErrors({});
    setHoneypot("");
    setSend("idle");
    setError(null);
  }, []);

  const restart = useCallback(() => {
    reset();
    moved.current = true;
    setStep("payment");
  }, [reset]);

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<OpenDetail>).detail ?? {};
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setError(null);
      if (step === "done") reset();
      if (detail.payment) {
        setAnswers((a) => ({ ...(step === "done" ? {} : a), payment: detail.payment }));
        setStep("payment");
      } else if (step === "done") {
        setStep("payment");
      }
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
      track("screener_open", { page: location.pathname });
      moved.current = true;
      requestAnimationFrame(() => headingRef.current?.focus());
    }
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [step, reset]);

  // Move focus to the new step's heading and announce progress.
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    headingRef.current?.focus();
    setAnnouncement(`Step ${stepNumber(step)} of ${TOTAL_STEPS}: ${title}`);
  }, [step, title]);

  function close() {
    dialogRef.current?.close();
  }

  function onClose() {
    const target = returnFocusRef.current;
    if (target && document.contains(target)) target.focus();
  }

  function go(to: StepId) {
    setError(null);
    moved.current = true;
    setStep(to);
  }

  function next() {
    if (!canContinue(step, answers)) {
      setError(
        step === "child"
          ? "Please answer the three questions above. The town is optional."
          : "Please choose one option to continue.",
      );
      return;
    }
    const to = nextStep(step, answers);
    track("screener_step", { step: stepNumber(step) });
    if (to === "result") track("screener_result", { result: getResult(answers).type });
    go(to);
  }

  function back() {
    const to = prevStep(step, answers);
    if (to) go(to);
  }

  async function finish(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!live) {
      // Preview only: nothing is sent anywhere.
      go("done");
      return;
    }
    if (send === "sending") return;
    const errors = validateContact(contact);
    setContactErrors(errors);
    if (errors.name || errors.reach) {
      setError("Please fix the highlighted fields.");
      return;
    }
    // Bots fill hidden fields; people never see this one.
    if (honeypot) {
      go("done");
      return;
    }
    setSend("sending");
    setError(null);
    const outcome = await submitIntake({
      source: "website-screener",
      submittedAt: new Date().toISOString(),
      page: location.pathname,
      contact,
      answers,
      result,
    });
    if (outcome.ok) {
      track("contact_submit", { result: result.type });
      setSend("idle");
      go("done");
    } else {
      setSend("failed");
      setError(
        `We couldn't send that just now. Your answers are still here, so you can try again, or call us at ${site.phone.display}.`,
      );
    }
  }

  const set = (patch: Partial<Answers>) => {
    setError(null);
    setAnswers((a) => ({ ...a, ...patch }));
  };

  const setField = (patch: Partial<Contact>) => {
    setContact((c) => ({ ...c, ...patch }));
    if (contactErrors.name || contactErrors.reach) setContactErrors({});
  };

  const chosenPayment = paymentOptions.find((o) => o.value === answers.payment);
  const showEvalLink =
    result.notes.includes("diagnosis-evaluation") || result.type === "resources" || result.notes.includes("medicaid-unconfirmed");
  const auto = (value: string) => (live ? value : "off");

  return (
    <dialog ref={dialogRef} className="screener" aria-labelledby="screener-title" onClose={onClose}>
      <div className="flex items-center justify-between gap-4 border-b border-cafe/15 px-5 py-3.5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="ray-meter text-forest" data-step={current}>
            <SunMark groups className="h-7 w-11" />
          </span>
          <p className="eyebrow nums text-forest">
            Step {current} of {TOTAL_STEPS}
          </p>
        </div>
        <button type="button" onClick={close} className="btn min-h-11 px-3 text-forest hover:bg-sand-soft">
          Close
        </button>
      </div>

      {!live && (
        <p className="bg-sand-soft px-5 py-2 text-[0.9375rem] font-semibold text-cafe sm:px-8">
          Design preview. Nothing you choose here is sent or saved.
        </p>
      )}

      <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
        <h2
          id="screener-title"
          ref={headingRef}
          tabIndex={-1}
          className="display display-m mb-6 text-forest focus:outline-none"
        >
          {title}
        </h2>

        {step === "payment" && (
          <div className="grid gap-4">
            <OptionGroup
              name="payment"
              legend={title}
              hideLegend
              options={paymentOptions}
              value={answers.payment}
              onChange={(v) => set({ payment: v })}
            />
            {chosenPayment && (
              <p aria-live="polite" className="border-l-2 border-sand pl-4 text-cafe">
                {chosenPayment.feedback}
              </p>
            )}
          </div>
        )}

        {step === "other-insurance" && (
          <OptionGroup
            name="other-insurance"
            legend={title}
            hideLegend
            options={otherInsuranceOptions}
            value={answers.otherInsurance}
            onChange={(v) => set({ otherInsurance: v })}
          />
        )}

        {step === "child" && (
          <div className="grid gap-7">
            <OptionGroup name="age" legend="How old is your child?" options={ageOptions} value={answers.age} onChange={(v) => set({ age: v })} />
            <OptionGroup
              name="diagnosis"
              legend="Does your child have an autism diagnosis?"
              options={diagnosisOptions}
              value={answers.diagnosis}
              onChange={(v) => set({ diagnosis: v })}
            />
            <OptionGroup
              name="prior-aba"
              legend="Has your child had ABA therapy before?"
              options={priorAbaOptions}
              value={answers.priorAba}
              onChange={(v) => set({ priorAba: v })}
            />
            <div>
              <label htmlFor="screener-town" className="mb-2 block font-semibold">
                Town or county <span className="font-medium text-cafe-soft">(optional)</span>
              </label>
              <input
                id="screener-town"
                className="field"
                value={answers.town ?? ""}
                onChange={(e) => set({ town: e.target.value })}
                autoComplete={auto("address-level2")}
              />
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="grid gap-4">
            <p className="lede">{results[result.type].body}</p>
            {result.notes.map((n) => (
              <p key={n} className="border-l-2 border-sand pl-4">
                {noteCopy[n]}
              </p>
            ))}
            {showEvalLink && (
              <p>
                <ExternalLink href={site.resources.dmhAutismGuide}>
                  Mississippi Department of Mental Health Autism Resource Guide (PDF)
                </ExternalLink>
              </p>
            )}
            {result.type === "resources" && (
              <p className="text-[0.9375rem] text-cafe-soft">
                We don&apos;t recommend a specific provider through this tool. If you&apos;d still like to talk, we&apos;re glad to.
              </p>
            )}
          </div>
        )}

        {step === "contact" && (
          <form id="screener-contact" onSubmit={finish} noValidate className="grid gap-5">
            <p className="text-cafe-soft">
              {live
                ? "We'll use these details only to reach you about your child. Please leave out medical records and insurance numbers."
                : "In the live version, these details go to our team so we can reach out. For this preview, use the sample data."}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="c-name" className="mb-2 block font-semibold">
                  Parent or caregiver name
                </label>
                {/* Autofill is off in the preview so a reviewer's real details are never filled in. */}
                <input
                  id="c-name"
                  className="field"
                  autoComplete={auto("name")}
                  value={contact.name}
                  aria-invalid={contactErrors.name ? true : undefined}
                  aria-describedby={contactErrors.name ? "c-name-error" : undefined}
                  onChange={(e) => setField({ name: e.target.value })}
                />
                {contactErrors.name && (
                  <p id="c-name-error" className="mt-1.5 text-[0.9375rem] font-semibold text-[#8a2f1d]">
                    {contactErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="c-phone" className="mb-2 block font-semibold">
                  Phone
                </label>
                <input
                  id="c-phone"
                  type="tel"
                  inputMode="tel"
                  className="field nums"
                  autoComplete={auto("tel")}
                  value={contact.phone}
                  aria-invalid={contactErrors.reach ? true : undefined}
                  aria-describedby={contactErrors.reach ? "c-reach-error" : undefined}
                  onChange={(e) => setField({ phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-2 block font-semibold">
                  Email
                </label>
                <input
                  id="c-email"
                  type="email"
                  className="field"
                  autoComplete={auto("email")}
                  value={contact.email}
                  aria-invalid={contactErrors.reach ? true : undefined}
                  aria-describedby={contactErrors.reach ? "c-reach-error" : undefined}
                  onChange={(e) => setField({ email: e.target.value })}
                />
              </div>
              {contactErrors.reach && (
                <p id="c-reach-error" className="text-[0.9375rem] font-semibold text-[#8a2f1d] sm:col-span-2">
                  {contactErrors.reach}
                </p>
              )}
            </div>
            <OptionGroup
              name="contact-method"
              legend="Best way to reach you"
              options={[
                { value: "call" as const, label: "Phone call" },
                { value: "text" as const, label: "Text message" },
                { value: "email" as const, label: "Email" },
              ]}
              value={contact.method || undefined}
              onChange={(v) => setField({ method: v })}
            />
            <div>
              <label htmlFor="c-note" className="mb-2 block font-semibold">
                Anything you&apos;d like us to know <span className="font-medium text-cafe-soft">(optional)</span>
              </label>
              <p id="c-note-hint" className="mb-2 text-[0.9375rem] text-cafe-soft">
                Please don&apos;t include medical records or insurance numbers.
              </p>
              <textarea
                id="c-note"
                aria-describedby="c-note-hint"
                rows={3}
                className="field"
                value={contact.note}
                onChange={(e) => setField({ note: e.target.value })}
              />
            </div>
            {/* Spam trap: hidden from people and assistive tech. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="c-company">Company</label>
              <input id="c-company" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            {!live && (
              <div>
                <button type="button" className="btn btn-outline" onClick={() => setContact(sampleContact)}>
                  Fill sample data
                </button>
              </div>
            )}
          </form>
        )}

        {step === "done" && (
          <div className="grid gap-4">
            {live ? (
              <>
                <p className="lede">Someone from our team will reach out to talk about your child and the next step.</p>
                <p>
                  Nothing has been scheduled yet, and you&apos;re not committed to anything. If you&apos;d rather talk now, call us at{" "}
                  <a className="link nums" href={site.phone.href} data-track="call">
                    {site.phone.display}
                  </a>
                  .
                </p>
              </>
            ) : (
              <>
                <p className="lede">This is a preview. Nothing was sent or saved.</p>
                <p>
                  In the live version, this is where your details would go to our team, and this screen would tell you what
                  happens next. You can also reach us at{" "}
                  <a className="link nums" href={site.phone.href} data-track="call">
                    {site.phone.display}
                  </a>
                  .
                </p>
              </>
            )}
          </div>
        )}

        {error && (
          <p role="alert" className="mt-5 font-semibold text-[#8a2f1d]">
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cafe/15 px-5 py-4 sm:px-8">
        {step === "done" ? (
          <>
            <button type="button" className="btn px-3 text-forest underline underline-offset-4" onClick={restart}>
              Start over
            </button>
            <button type="button" className="btn btn-primary" onClick={close}>
              {live ? "Close" : "Close preview"}
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1">
              {prevStep(step, answers) && (
                <button type="button" className="btn px-3 text-forest" onClick={back} disabled={send === "sending"}>
                  Back
                </button>
              )}
              {(step === "result" || step === "contact") && (
                <button type="button" className="btn px-3 text-cafe-soft underline underline-offset-4" onClick={restart}>
                  Start over
                </button>
              )}
            </div>
            {/* Distinct keys stop React reusing one node, which would flip it to "submit" mid-click. */}
            {step === "contact" ? (
              <button
                key="finish"
                type="submit"
                form="screener-contact"
                className="btn btn-primary"
                aria-disabled={send === "sending" ? true : undefined}
              >
                {live ? (send === "sending" ? "Sending..." : send === "failed" ? "Try again" : "Send to our team") : "Finish preview"}
              </button>
            ) : (
              <button key="next" type="button" className="btn btn-primary" onClick={next}>
                {step === "result"
                  ? result.type === "resources"
                    ? "Talk with our team anyway"
                    : "Continue to contact details"
                  : "Continue"}
              </button>
            )}
          </>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </dialog>
  );
}
