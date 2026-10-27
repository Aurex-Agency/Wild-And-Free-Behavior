import { site } from "@/config/site";

// Answers stay within known facts. Anything unresolved points families to staff.
const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do we get started?",
    a: (
      <>
        Use the short form on this page or call us at{" "}
        <a className="link nums" href={site.phone.href}>
          {site.phone.display}
        </a>
        . Someone from our team will follow up to learn about your child, and then we&apos;ll set up a free conversation
        with Anna Claire and Jimbo.
      </>
    ),
  },
  {
    q: "What insurance do you work with?",
    a: `We work with ${site.insurance.primary}. Plans vary, so we verify each child's benefits before services begin. If you have a different plan, tell us what it is and our team will look into it.`,
  },
  {
    q: "Can we pay privately?",
    a: "Yes, private pay is an option. We're happy to talk through what that looks like on a call.",
  },
  {
    q: "What if we don't have a diagnosis yet?",
    a: (
      <>
        Reach out anyway, and we can talk through where you are in the process. If you&apos;re still looking for an
        evaluation, the{" "}
        <a className="link" href={site.resources.dmhAutismGuide} target="_blank" rel="noopener noreferrer">
          Mississippi Department of Mental Health Autism Resource Guide
          <span className="sr-only"> (PDF, opens in a new tab)</span>
        </a>{" "}
        lists options around the state.
      </>
    ),
  },
  {
    q: "What if we aren't sure this is a fit?",
    a: "That's what the free conversation is for. Bring your questions, and we'll be honest about whether we're the right place for your child.",
  },
  {
    q: "When is the weekly schedule decided?",
    a: "After the assessment. We choose your child's days and times together, and they stay the same each week.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 md:py-28">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-8">
            <p className="eyebrow text-forest">Questions</p>
            <h2 id="faq-title" className="display display-l mt-4 text-forest">
              What families ask
            </h2>
          </div>
        </div>
        <div className="border-t border-cafe/20 md:col-span-8 lg:col-span-7 lg:col-start-6">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-cafe/20">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.125rem] font-bold text-cafe marker:hidden hover:text-forest md:text-[1.1875rem] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                  <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-forest" />
                  <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-forest transition-transform duration-200 group-open:scale-y-0 motion-reduce:transition-none" />
                </span>
              </summary>
              <div className="max-w-[40rem] pb-6 pr-8">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
