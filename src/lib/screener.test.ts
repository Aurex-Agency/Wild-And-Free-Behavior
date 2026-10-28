import { test } from "node:test";
import assert from "node:assert/strict";
import {
  canContinue,
  FIRST_STEP,
  getResult,
  nextStep,
  prevStep,
  stepNumber,
  type Answers,
  type StepId,
} from "./screener.ts";

const fit: Answers = { age: "4-6", diagnosis: "diagnosed", priorAba: "no" };

function walk(answers: Answers): StepId[] {
  const path: StepId[] = [FIRST_STEP];
  let step: StepId = FIRST_STEP;
  while (step !== "done") {
    step = nextStep(step, answers);
    path.push(step);
  }
  return path;
}

test("BCBS of Mississippi with a typical fit goes to benefits verification", () => {
  const a: Answers = { payment: "bcbs-ms", ...fit };
  assert.deepEqual(walk(a), ["child", "payment", "result", "contact", "done"]);
  assert.deepEqual(getResult(a), { type: "benefits-verification", notes: [] });
});

test("another Blue Cross plan goes to manual plan review, never accepted or rejected", () => {
  assert.deepEqual(getResult({ payment: "other-blue", ...fit }), { type: "plan-review", notes: [] });
});

test("Medicaid or CHIP goes to staff review with an unconfirmed note", () => {
  assert.deepEqual(getResult({ payment: "medicaid-chip", ...fit }), {
    type: "staff-guidance",
    notes: ["medicaid-unconfirmed"],
  });
});

test("the child comes first, and other insurance asks a follow-up after payment", () => {
  const a: Answers = { payment: "other-insurance", otherInsurance: "talk", ...fit };
  assert.deepEqual(walk(a), ["child", "payment", "other-insurance", "result", "contact", "done"]);
});

test("other insurance then private pay goes to a private-pay conversation", () => {
  assert.equal(getResult({ payment: "other-insurance", otherInsurance: "private-pay", ...fit }).type, "private-pay");
});

test("other insurance then talk with our team goes to staff guidance", () => {
  assert.equal(getResult({ payment: "other-insurance", otherInsurance: "talk", ...fit }).type, "staff-guidance");
});

test("other insurance then resources goes to resources, and back returns to the follow-up", () => {
  const a: Answers = { payment: "other-insurance", otherInsurance: "resources", ...fit };
  assert.deepEqual(walk(a), ["child", "payment", "other-insurance", "result", "contact", "done"]);
  assert.deepEqual(getResult(a), { type: "resources", notes: [] });
  assert.equal(prevStep("result", a), "other-insurance");
});

test("resources stays resources even if child answers exist from an earlier path", () => {
  const a: Answers = { payment: "other-insurance", otherInsurance: "resources", age: "7-plus", diagnosis: "not-yet" };
  assert.equal(getResult(a).type, "resources");
});

test("no insurance or private pay goes to a private-pay conversation", () => {
  assert.deepEqual(getResult({ payment: "private-pay", ...fit }), { type: "private-pay", notes: [] });
});

test("not sure about insurance gets plan help and staff guidance", () => {
  assert.deepEqual(getResult({ payment: "unsure", ...fit }), { type: "staff-guidance", notes: ["plan-help"] });
});

test("an age outside the usual band routes to staff review and keeps the insurance context", () => {
  for (const age of ["under-2", "7-plus"] as const) {
    assert.deepEqual(getResult({ payment: "bcbs-ms", age, diagnosis: "diagnosed", priorAba: "yes" }), {
      type: "staff-guidance",
      notes: ["age-review", "also-verify-benefits"],
    });
  }
});

test("no diagnosis yet routes to staff review with evaluation resources", () => {
  assert.deepEqual(getResult({ payment: "other-blue", age: "2-3", diagnosis: "not-yet", priorAba: "no" }), {
    type: "staff-guidance",
    notes: ["diagnosis-evaluation", "also-plan-review"],
  });
});

test("unsure about diagnosis routes to staff review", () => {
  assert.deepEqual(getResult({ payment: "private-pay", age: "4-6", diagnosis: "not-sure", priorAba: "discuss" }), {
    type: "staff-guidance",
    notes: ["diagnosis-unsure", "also-private-pay"],
  });
});

test("an evaluation underway is not treated as an exception", () => {
  assert.equal(getResult({ payment: "bcbs-ms", age: "2-3", diagnosis: "evaluation-underway", priorAba: "no" }).type, "benefits-verification");
});

test("several exceptions combine without losing earlier notes", () => {
  assert.deepEqual(getResult({ payment: "medicaid-chip", age: "under-2", diagnosis: "not-sure", priorAba: "no" }), {
    type: "staff-guidance",
    notes: ["medicaid-unconfirmed", "age-review", "diagnosis-unsure"],
  });
});

test("back navigation retraces the path", () => {
  const direct: Answers = { payment: "bcbs-ms", ...fit };
  assert.equal(prevStep("child", direct), null);
  assert.equal(prevStep("payment", direct), "child");
  assert.equal(prevStep("result", direct), "payment");
  assert.equal(prevStep("contact", direct), "result");
  assert.equal(prevStep("done", direct), null);
  assert.equal(prevStep("result", { payment: "other-insurance", otherInsurance: "talk" }), "other-insurance");
  assert.equal(prevStep("other-insurance", { payment: "other-insurance" }), "payment");
});

test("changing payment away from other insurance ignores the stale follow-up answer", () => {
  const a: Answers = { payment: "bcbs-ms", otherInsurance: "resources", ...fit };
  assert.equal(nextStep("payment", a), "result");
  assert.equal(getResult(a).type, "benefits-verification");
});

test("each step requires its own answers before continuing", () => {
  assert.equal(canContinue("payment", {}), false);
  assert.equal(canContinue("payment", { payment: "unsure" }), true);
  assert.equal(canContinue("other-insurance", { payment: "other-insurance" }), false);
  assert.equal(canContinue("child", { age: "2-3", diagnosis: "diagnosed" }), false);
  assert.equal(canContinue("child", fit), true);
  assert.equal(canContinue("contact", {}), true);
});

test("progress maps to three visible steps", () => {
  assert.deepEqual(
    (["child", "payment", "other-insurance", "result", "contact", "done"] as const).map(stepNumber),
    [1, 2, 2, 3, 3, 3],
  );
});
