import type { AgeBand, Diagnosis, Note, OtherInsuranceChoice, Payment, PriorAba, ResultType } from "@/lib/screener";

// Screener wording, kept apart from the dialog markup so staff can review it in one place.
// Nothing here promises coverage, eligibility, or an appointment.

export const paymentOptions: { value: Payment; label: string; hint?: string; feedback: string }[] = [
  {
    value: "bcbs-ms",
    label: "Blue Cross & Blue Shield of Mississippi",
    feedback: "Our team will need to verify your child's specific plan and benefits.",
  },
  {
    value: "other-blue",
    label: "Another Blue Cross plan",
    hint: "From another state, or through an employer",
    feedback: "A person on our team will review your plan. This isn't a yes or a no yet.",
  },
  {
    value: "medicaid-chip",
    label: "Mississippi Medicaid or CHIP",
    feedback: "We'll talk with you about Medicaid or CHIP directly and point you to resources.",
  },
  {
    value: "other-insurance",
    label: "Another insurance company",
    feedback: "Next, we'll ask what would help most.",
  },
  {
    value: "private-pay",
    label: "No insurance, or I'd rather pay privately",
    feedback: "Private pay is an option. We'll talk it through on a call.",
  },
  {
    value: "unsure",
    label: "I'm not sure",
    feedback:
      "That's common. The insurance company's name is usually on the front of the card, and the plan name is often near the member ID. Please don't upload the card here.",
  },
];

export const otherInsuranceOptions: { value: OtherInsuranceChoice; label: string; hint: string }[] = [
  { value: "private-pay", label: "Explore private pay", hint: "Talk through paying privately on a call" },
  { value: "talk", label: "Talk with our team", hint: "A person looks at your situation" },
  { value: "resources", label: "See other resources", hint: "Places to look for ABA providers" },
];

export const ageOptions: { value: AgeBand; label: string }[] = [
  { value: "under-2", label: "Under 2" },
  { value: "2-3", label: "2 or 3" },
  { value: "4-6", label: "4 to 6" },
  { value: "7-plus", label: "7 or older" },
];

export const diagnosisOptions: { value: Diagnosis; label: string }[] = [
  { value: "diagnosed", label: "Yes" },
  { value: "evaluation-underway", label: "An evaluation is underway" },
  { value: "not-yet", label: "Not yet" },
  { value: "not-sure", label: "I'm not sure" },
];

export const priorAbaOptions: { value: PriorAba; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "discuss", label: "I'd rather talk about it" },
];

export const results: Record<ResultType, { title: string; body: string }> = {
  "benefits-verification": {
    title: "Next, we verify your benefits",
    body: "Our team will check your child's Blue Cross & Blue Shield of Mississippi plan and benefits, then reach out to set up your free conversation with Anna Claire and Jimbo.",
  },
  "plan-review": {
    title: "Next, a person reviews your plan",
    body: "We'll look at your specific Blue Cross plan and let you know what we find. Nothing is decided yet.",
  },
  "private-pay": {
    title: "Next, a private-pay conversation",
    body: "We'll set up a call to talk through private pay and answer your questions. There's no commitment.",
  },
  "staff-guidance": {
    title: "Next, a conversation with our team",
    body: "Some situations need a person, not a form. Someone from our team will reach out to talk through where your child is right now.",
  },
  resources: {
    title: "A few places to start",
    body: "Your insurance company's provider directory lists in-network ABA providers. It's usually on the insurer's website, or you can call the member services number on your card.",
  },
};

export const notes: Record<Note, string> = {
  "medicaid-unconfirmed": "We'll confirm whether we can work with Mississippi Medicaid or CHIP for your child.",
  "plan-help": "Have your insurance card nearby when we talk. You won't need to send it ahead of time.",
  "age-review": "Your child's age is outside the range we usually see, so a member of our team will talk with you about it directly.",
  "diagnosis-evaluation": "If you're still looking for an autism evaluation, the Mississippi Department of Mental Health keeps a resource guide that lists options around the state.",
  "diagnosis-unsure": "That's okay. We can talk through where you are in the process.",
  "also-verify-benefits": "We'll also check your Blue Cross & Blue Shield of Mississippi benefits.",
  "also-plan-review": "We'll also review your Blue Cross plan.",
  "also-private-pay": "We can talk about private pay on the same call.",
};
