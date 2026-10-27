// Routing for the insurance and fit screener. Pure functions, no UI and no I/O,
// so every branch is unit tested and the production intake can reuse it unchanged.
// Nothing here ever rejects a family: uncertain cases route to staff review.

export type Payment =
  | "bcbs-ms"
  | "other-blue"
  | "medicaid-chip"
  | "other-insurance"
  | "private-pay"
  | "unsure";

export type OtherInsuranceChoice = "private-pay" | "talk" | "resources";
export type AgeBand = "under-2" | "2-3" | "4-6" | "7-plus";
export type Diagnosis = "diagnosed" | "evaluation-underway" | "not-yet" | "not-sure";
export type PriorAba = "yes" | "no" | "discuss";

export type Answers = {
  payment?: Payment;
  otherInsurance?: OtherInsuranceChoice;
  age?: AgeBand;
  diagnosis?: Diagnosis;
  priorAba?: PriorAba;
  town?: string;
};

export type StepId = "payment" | "other-insurance" | "child" | "result" | "contact" | "done";

export type ResultType =
  | "benefits-verification"
  | "plan-review"
  | "private-pay"
  | "staff-guidance"
  | "resources";

export type Note =
  | "medicaid-unconfirmed"
  | "plan-help"
  | "age-review"
  | "diagnosis-evaluation"
  | "diagnosis-unsure"
  | "also-verify-benefits"
  | "also-plan-review"
  | "also-private-pay";

export type Result = { type: ResultType; notes: Note[] };

export const TOTAL_STEPS = 3;

export function stepNumber(step: StepId): 1 | 2 | 3 {
  if (step === "payment" || step === "other-insurance") return 1;
  if (step === "child") return 2;
  return 3;
}

function skipsChildStep(a: Answers): boolean {
  return a.payment === "other-insurance" && a.otherInsurance === "resources";
}

export function canContinue(step: StepId, a: Answers): boolean {
  switch (step) {
    case "payment":
      return a.payment !== undefined;
    case "other-insurance":
      return a.otherInsurance !== undefined;
    case "child":
      return a.age !== undefined && a.diagnosis !== undefined && a.priorAba !== undefined;
    default:
      return true;
  }
}

export function nextStep(step: StepId, a: Answers): StepId {
  switch (step) {
    case "payment":
      return a.payment === "other-insurance" ? "other-insurance" : "child";
    case "other-insurance":
      return skipsChildStep(a) ? "result" : "child";
    case "child":
      return "result";
    case "result":
      return "contact";
    case "contact":
    case "done":
      return "done";
  }
}

export function prevStep(step: StepId, a: Answers): StepId | null {
  switch (step) {
    case "payment":
      return null;
    case "other-insurance":
      return "payment";
    case "child":
      return a.payment === "other-insurance" ? "other-insurance" : "payment";
    case "result":
      if (skipsChildStep(a)) return "other-insurance";
      return "child";
    case "contact":
      return "result";
    case "done":
      return null;
  }
}

function baseResult(a: Answers): Result {
  switch (a.payment) {
    case "bcbs-ms":
      return { type: "benefits-verification", notes: [] };
    case "other-blue":
      return { type: "plan-review", notes: [] };
    case "medicaid-chip":
      return { type: "staff-guidance", notes: ["medicaid-unconfirmed"] };
    case "private-pay":
      return { type: "private-pay", notes: [] };
    case "unsure":
      return { type: "staff-guidance", notes: ["plan-help"] };
    case "other-insurance":
      if (a.otherInsurance === "private-pay") return { type: "private-pay", notes: [] };
      if (a.otherInsurance === "resources") return { type: "resources", notes: [] };
      return { type: "staff-guidance", notes: [] };
    default:
      return { type: "staff-guidance", notes: [] };
  }
}

const carryOver: Partial<Record<ResultType, Note>> = {
  "benefits-verification": "also-verify-benefits",
  "plan-review": "also-plan-review",
  "private-pay": "also-private-pay",
};

export function getResult(a: Answers): Result {
  const base = baseResult(a);
  if (base.type === "resources") return base;

  const fit: Note[] = [];
  if (a.age === "under-2" || a.age === "7-plus") fit.push("age-review");
  if (a.diagnosis === "not-yet") fit.push("diagnosis-evaluation");
  if (a.diagnosis === "not-sure") fit.push("diagnosis-unsure");

  if (fit.length === 0) return base;

  // Age or diagnosis questions take priority: a person reviews them before anything else.
  const carried = carryOver[base.type];
  return {
    type: "staff-guidance",
    notes: [...base.notes, ...fit, ...(carried ? [carried] : [])],
  };
}
