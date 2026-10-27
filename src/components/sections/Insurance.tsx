import Link from "next/link";
import { site } from "@/config/site";
import { InsuranceQuestion } from "@/components/InsuranceQuestion";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";

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
    <section id="insurance" aria-labelledby="insurance-title" className="tone-cafe relative py-24 md:py-36">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6">
          <Reveal variant="fade">
            <p className="subtitle">costs and coverage</p>
          </Reveal>
          <Words id="insurance-title" text="Paying for therapy" className="display display-xl mt-3" />
          <Reveal delay={0.1}>
            <p className="lede mt-7 max-w-[34rem]">
              We work with {site.insurance.primary}. Every plan is different, so our team checks your child&apos;s
              specific benefits before services begin.
            </p>
          </Reveal>
          <dl className="mt-12 border-t border-line">
            {paths.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * i} className="grid gap-2 border-b border-line py-7 md:grid-cols-[15rem_1fr] md:gap-8">
                <dt className="font-bold text-ink">{p.title}</dt>
                <dd>{p.body}</dd>
              </Reveal>
            ))}
          </dl>
          <Link href="/insurance" className="link mt-8 inline-block">
            More about insurance and private pay
          </Link>
        </div>

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8 lg:self-center">
          <InsuranceQuestion />
        </Reveal>
      </div>
    </section>
  );
}
