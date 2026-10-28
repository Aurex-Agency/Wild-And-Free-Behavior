import { site } from "@/config/site";

// Answers stay within confirmed facts. Anything unresolved points families to a person.
// Plain strings so the same text feeds both the page and FAQPage structured data.

export type Faq = { id: string; q: string; a: string; link?: { href: string; label: string } };
export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        id: "get-started",
        q: "How do we get started?",
        a: `Use the short form on this site or call us at ${site.phone.display}. Someone from our team will follow up to learn about your child, and then we'll set up a free conversation with Anna Claire and Jimbo.`,
        link: { href: "/getting-started", label: "See every step" },
      },
      {
        id: "no-diagnosis",
        q: "What if we don't have a diagnosis yet?",
        a: "Reach out anyway, and we can talk through where you are in the process. If you're still looking for an evaluation, the Mississippi Department of Mental Health keeps an Autism Resource Guide that lists evaluators around the state.",
        link: { href: "/resources/autism-evaluation-north-mississippi", label: "Where to get an autism evaluation" },
      },
      {
        id: "fit",
        q: "What if we aren't sure this is a fit?",
        a: "That's what the free conversation is for. Bring your questions, and we'll be honest about whether we're the right place for your child.",
      },
      {
        id: "commitment",
        q: "Does reaching out commit us to anything?",
        a: "No. The form and the first conversation don't book therapy or commit you to anything.",
      },
      {
        id: "how-long",
        q: "How long does it take to start?",
        a: "It depends on insurance approvals and our current schedule. We'll give you an honest estimate when we talk.",
      },
    ],
  },
  {
    title: "Therapy",
    items: [
      {
        id: "schedule",
        q: "When is the weekly schedule decided?",
        a: "After the assessment. We choose your child's days and times together, and they stay the same each week.",
      },
      {
        id: "hours",
        q: "How many hours a week will my child come?",
        a: "It depends on your child's assessment, the plan our BCBA writes, and what your insurance approves. We'll walk you through the recommendation before anything starts.",
      },
      {
        id: "prior-aba",
        q: "My child has had ABA before. Does that matter?",
        a: "It helps. Knowing what your child has already worked on tells us where to start, so we'll ask about it early.",
      },
      {
        id: "who",
        q: "Who designs my child's plan?",
        a: `Each plan is written and overseen by our Board Certified Behavior Analyst, ${site.owner.name}, ${site.owner.credentials}.`,
        link: { href: "/about", label: "About our team" },
      },
    ],
  },
  {
    title: "Visiting",
    items: [
      {
        id: "where",
        q: "Where are you?",
        a: `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}. We're in a log cabin with a big front porch. Look for the stone sign out front.`,
        link: { href: "/visit", label: "Directions and visiting" },
      },
      {
        id: "first-visit",
        q: "How can we help our child get ready for the first visit?",
        a: "Some children do better when they've seen a place before they go. We made a printable picture story of the cabin you can look at together.",
        link: { href: "/resources/your-first-visit", label: "Your first visit to the cabin" },
      },
    ],
  },
  {
    title: "Insurance and cost",
    items: [
      {
        id: "insurance",
        q: "What insurance do you work with?",
        a: `We work with ${site.insurance.primary}. Plans vary, so we verify each child's benefits before services begin. If you have a different plan, tell us what it is and our team will look into it.`,
        link: { href: "/insurance", label: "Insurance and private pay" },
      },
      {
        id: "private-pay",
        q: "Can we pay privately?",
        a: "Yes, private pay is an option. We're happy to talk through what that looks like on a call.",
      },
      {
        id: "medicaid",
        q: "Do you take Mississippi Medicaid or CHIP?",
        a: "Tell us if your child has Medicaid or CHIP, and we'll talk with you directly about your options.",
      },
      {
        id: "approval",
        q: "Does insurance need to approve ABA first?",
        a: "Usually, yes. Blue Cross & Blue Shield of Mississippi, for example, requires approval before the initial assessment and before ABA therapy begins. Our team helps with those requests.",
        link: { href: "/resources/does-bcbs-of-mississippi-cover-aba-therapy", label: "Does BCBS of Mississippi cover ABA?" },
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((g) => g.items);

export function pickFaqs(ids: string[]) {
  return ids.map((id) => allFaqs.find((f) => f.id === id)).filter((f): f is Faq => Boolean(f));
}
