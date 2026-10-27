import { test } from "node:test";
import assert from "node:assert/strict";
import { intakeMode, submitIntake, validateContact, type Contact } from "./intake.ts";

const base: Contact = { name: "", phone: "", email: "", method: "", note: "" };

test("defaults to demo mode when no webhook is configured", () => {
  assert.equal(intakeMode, "demo");
});

test("demo mode never sends anything", async () => {
  const outcome = await submitIntake({
    source: "website-screener",
    submittedAt: new Date().toISOString(),
    page: "/",
    contact: { ...base, name: "A", phone: "6625550100" },
    answers: {},
    result: { type: "staff-guidance", notes: [] },
  });
  assert.deepEqual(outcome, { ok: false, reason: "not-configured" });
});

test("a name and one way to reach the family are required", () => {
  assert.deepEqual(Object.keys(validateContact(base)).sort(), ["name", "reach"]);
  assert.deepEqual(validateContact({ ...base, name: "Sam" }), {
    reach: "Please add a phone number or an email address so we can reach you.",
  });
});

test("a ten-digit phone number is enough", () => {
  assert.deepEqual(validateContact({ ...base, name: "Sam", phone: "(662) 555-0142" }), {});
});

test("an email address is enough", () => {
  assert.deepEqual(validateContact({ ...base, name: "Sam", email: "sam@example.com" }), {});
});

test("short phone numbers and malformed emails don't count", () => {
  assert.ok(validateContact({ ...base, name: "Sam", phone: "555-0142" }).reach);
  assert.ok(validateContact({ ...base, name: "Sam", email: "sam@example" }).reach);
});

test("a name of only spaces is treated as empty", () => {
  assert.ok(validateContact({ ...base, name: "   ", email: "sam@example.com" }).name);
});
