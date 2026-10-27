import { site } from "@/config/site";
import { SunMark } from "@/components/brand";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";
import { paymentOptions } from "@/components/screener/copy";

const paths = [
  {
    title: site.insurance.primary,
    body: "We'll verify your child's plan and benefits with you. Plans often need to approve the assessment and therapy before they start, and our team helps with that.",
  },
  {
    title: "Another plan, or not sure",
    body: "Tell us what's on your card and a person on our team will look into it. There's no automatic yes or no.",
  },
  {
    title: "Private pay",
    body: "If insurance isn't an option, we're glad to talk through private pay on a call.",
  },
];

export function Insurance() {
  return (
    <section id="insurance" aria-labelledby="insurance-title" className="py-20 md:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6">
          <p className="eyebrow text-forest">Insurance and private pay</p>
          <h2 id="insurance-title" className="display display-l mt-4 text-forest">
            Paying for therapy
          </h2>
          <p className="lede mt-6 max-w-[34rem]">
            We work with {site.insurance.primary}. Every plan is different, so our team checks your child&apos;s
            specific benefits before services begin.
          </p>
          <dl className="mt-10 border-t border-cafe/20">
            {paths.map((p) => (
              <div key={p.title} className="grid gap-2 border-b border-cafe/20 py-6 md:grid-cols-[14rem_1fr] md:gap-8">
                <dt className="font-bold text-forest">{p.title}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* A live first question: choosing an answer opens the screener with it selected */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative bg-sand-soft px-6 pb-8 pt-9 md:px-10 md:pb-10 md:pt-12">
            <SunMark className="absolute -top-5 left-6 h-10 w-16 text-forest md:left-10" />
            <p className="eyebrow text-forest">Check your options</p>
            <h3 className="mt-3 text-[1.5rem] font-bold leading-tight text-cafe">How will you pay for services?</h3>
            <p className="mt-2 text-[0.9375rem] text-cafe-soft">
              Three short questions. Nothing is booked, and this preview doesn&apos;t send anything.
            </p>
            <ul className="mt-6 grid gap-2.5">
              {paymentOptions.map((o) => (
                <li key={o.value}>
                  <ScreenerTrigger
                    payment={o.value}
                    className="option w-full text-left font-semibold leading-snug text-cafe"
                  >
                    {o.label}
                  </ScreenerTrigger>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
