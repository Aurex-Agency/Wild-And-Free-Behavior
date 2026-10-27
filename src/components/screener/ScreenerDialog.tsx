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

type Contact = { name: string; phone: string; email: string; method: "" | "call" | "text" | "email"; note: string };

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
  done: "That's the whole preview",
};

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
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const moved = useRef(false);

  const result = getResult(answers);
  const title = step === "result" ? results[result.type].title : stepTitles[step];
  const current = stepNumber(step);

  const restart = useCallback(() => {
    setAnswers({});
    setContact(emptyContact);
    setError(null);
    moved.current = true;
    setStep("payment");
  }, []);

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<OpenDetail>).detail ?? {};
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setError(null);
      if (detail.payment) {
        setAnswers((a) => ({ ...a, payment: detail.payment }));
        setStep("payment");
      } else {
        setStep((s) => (s === "done" ? "payment" : s));
        if (step === "done") {
          setAnswers({});
          setContact(emptyContact);
        }
      }
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
      moved.current = true;
      requestAnimationFrame(() => headingRef.current?.focus());
    }
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [step]);

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
    go(nextStep(step, answers));
  }

  function back() {
    const to = prevStep(step, answers);
    if (to) go(to);
  }

  function finish(e: SubmitEvent<HTMLFormElement>) {
    // Preview only: nothing is sent anywhere.
    e.preventDefault();
    go("done");
  }

  const set = (patch: Partial<Answers>) => {
    setError(null);
    setAnswers((a) => ({ ...a, ...patch }));
  };

  const chosenPayment = paymentOptions.find((o) => o.value === answers.payment);
  const showEvalLink = result.notes.includes("diagnosis-evaluation") || result.type === "resources" || result.notes.includes("medicaid-unconfirmed");

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

      <p className="bg-sand-soft px-5 py-2 text-[0.9375rem] font-semibold text-cafe sm:px-8">
        Design preview. Nothing you choose here is sent or saved.
      </p>

      <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
        <h2
          id="screener-title"
          ref={headingRef}
          tabIndex={-1}
          className="mb-6 text-[1.5rem] font-bold leading-tight text-forest focus:outline-none md:text-[1.75rem]"
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
                autoComplete="off"
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
              In the live version, these details go to our team so we can reach out. For this preview, use the sample data.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="c-name" className="mb-2 block font-semibold">
                  Parent or caregiver name
                </label>
                {/* Autofill is off in the preview so a reviewer's real details are never filled in. */}
                <input id="c-name" className="field" autoComplete="off" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
              </div>
              <div>
                <label htmlFor="c-phone" className="mb-2 block font-semibold">
                  Phone
                </label>
                <input id="c-phone" type="tel" className="field nums" autoComplete="off" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-2 block font-semibold">
                  Email
                </label>
                <input id="c-email" type="email" className="field" autoComplete="off" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
              </div>
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
              onChange={(v) => setContact({ ...contact, method: v })}
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
                onChange={(e) => setContact({ ...contact, note: e.target.value })}
              />
            </div>
            <div>
              <button type="button" className="btn btn-outline" onClick={() => setContact(sampleContact)}>
                Fill sample data
              </button>
            </div>
          </form>
        )}

        {step === "done" && (
          <div className="grid gap-4">
            <p className="lede">This is a preview. Nothing was sent or saved.</p>
            <p>
              In the live version, this is where your details would go to our team, and this screen would tell you when to expect a call. You can also reach us at{" "}
              <a className="link nums" href={site.phone.href}>
                {site.phone.display}
              </a>
              .
            </p>
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
              Close preview
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1">
              {prevStep(step, answers) && (
                <button type="button" className="btn px-3 text-forest" onClick={back}>
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
              <button key="finish" type="submit" form="screener-contact" className="btn btn-primary">
                Finish preview
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
