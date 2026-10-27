import Link from "next/link";
import { site } from "@/config/site";
import { InsuranceQuestion } from "@/components/InsuranceQuestion";

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
          <p className="subtitle text-forest">costs and coverage</p>
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
          <Link href="/insurance" className="link mt-7 inline-block">
            More about insurance and private pay
          </Link>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <InsuranceQuestion />
        </div>
      </div>
    </section>
  );
}
