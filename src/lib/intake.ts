// Where screener contact requests go.
//
// "demo" (default): nothing leaves the browser. Used for previews and until HighLevel's HIPAA
// add-on and Business Associate Agreement are in place.
//
// "webhook": the browser posts straight to a HighLevel inbound webhook, so intake details never
// pass through the website host. Enable only with a HIPAA-enabled HighLevel account:
//   NEXT_PUBLIC_INTAKE_MODE=webhook
//   NEXT_PUBLIC_INTAKE_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
// The endpoint must accept a cross-origin JSON POST from the site's domain.

import type { Answers, Result } from "./screener";

export type IntakeMode = "demo" | "webhook";

const endpoint = process.env.NEXT_PUBLIC_INTAKE_WEBHOOK_URL ?? "";

export const intakeMode: IntakeMode =
  process.env.NEXT_PUBLIC_INTAKE_MODE === "webhook" && endpoint.startsWith("https://") ? "webhook" : "demo";

export type Contact = {
  name: string;
  phone: string;
  email: string;
  method: "" | "call" | "text" | "email";
  note: string;
};

export type IntakePayload = {
  source: "website-screener";
  submittedAt: string;
  page: string;
  contact: Contact;
  answers: Answers;
  result: Result;
};

export type SubmitOutcome = { ok: true } | { ok: false; reason: "network" | "rejected" | "not-configured" };

export type ContactErrors = Partial<Record<"name" | "reach", string>>;

const digits = (s: string) => s.replace(/\D/g, "");

/** Live intake needs a name and one way to reach the family. Nothing else is required. */
export function validateContact(c: Contact): ContactErrors {
  const errors: ContactErrors = {};
  if (!c.name.trim()) errors.name = "Please add your name.";
  const phoneOk = digits(c.phone).length >= 10;
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email.trim());
  if (!phoneOk && !emailOk) errors.reach = "Please add a phone number or an email address so we can reach you.";
  return errors;
}

export async function submitIntake(payload: IntakePayload, signal?: AbortSignal): Promise<SubmitOutcome> {
  if (intakeMode !== "webhook") return { ok: false, reason: "not-configured" };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal,
    });
    return res.ok ? { ok: true } : { ok: false, reason: "rejected" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
