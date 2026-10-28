import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LogRules } from "@/components/brand";
import { CtaBand, PageHeader, SectionHeading } from "@/components/PageParts";
import { FaqList } from "@/components/FaqList";
import { InsuranceQuestion } from "@/components/InsuranceQuestion";
import { pickFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Paying for ABA Therapy: Insurance and Private Pay",
  description:
    "How families pay for ABA therapy at Wild & Free Behavior in New Albany, MS. We work with Blue Cross & Blue Shield of Mississippi, and private pay is an option.",
  alternates: { canonical: "/insurance" },
  openGraph: { url: "/insurance" },
};

const otherPlans = [
  {
    title: "Another Blue Cross plan",
    body: "If your Blue Cross card is from another state or an employer plan, we'll review it individually. We can't say yes or no until we look.",
  },
  {
    title: "Mississippi Medicaid or CHIP",
    body: "Tell us if your child has Medicaid or CHIP, and we'll talk with you directly about your options.",
  },
  {
    title: "Another insurance company",
    body: "Tell us the name on your card and we'll look into it. If it isn't a fit, we can talk through private pay or point you somewhere else.",
  },
];

const askInsurer = [
  "Does my plan cover ABA therapy for autism?",
  "Is my plan fully insured or self-funded through my employer?",
  "Is approval needed before the assessment, and again before therapy starts?",
  "What are my deductible, copay, and coinsurance for ABA?",
  "Is there a limit on hours, visits, or age?",
  "Is Wild & Free Behavior in network for my plan?",
];

export default function InsurancePage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Insurance", path: "/insurance" }]}
        subtitle="costs and coverage"
        title="Paying for ABA therapy"
        intro={
          <p>
            We work with {site.insurance.primary}, and private pay is always an option. Plans differ a lot, so we check
            your child&apos;s actual benefits and go over them with you before anything starts.
          </p>
        }
        aside={<InsuranceQuestion headingLevel="h2" />}
      />

      <section aria-labelledby="bcbs-title" className="pb-20 md:pb-28">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="prose md:col-span-7">
            <h2 id="bcbs-title">Blue Cross &amp; Blue Shield of Mississippi</h2>
            <p>
              Many BCBS of Mississippi plans cover ABA therapy for autism, but coverage depends on your specific plan. This
              is how it usually goes with us.
            </p>
            <ol>
              <li>
                <strong>We check your benefits.</strong> We look up what your plan covers for ABA and what your share of
                the cost is likely to be, and we go over it with you before services begin.
              </li>
              <li>
                <strong>The assessment is approved.</strong> BCBS of Mississippi requires approval before the initial autism
                assessment. Our team helps with that request.
              </li>
              <li>
                <strong>The plan is approved.</strong> After the assessment, the treatment plan goes to BCBS for approval
                before therapy starts. Approvals typically last six months.
              </li>
              <li>
                <strong>Reassessment.</strong> Around the six-month mark, your child is reassessed and an updated plan is
                submitted for the next approval.
              </li>
            </ol>
            <p>
              What you pay depends on your plan&apos;s deductible, copay, and coinsurance.{" "}
              <Link href="/resources/does-bcbs-of-mississippi-cover-aba-therapy">
                Read more about BCBS of Mississippi and ABA
              </Link>
              .
            </p>
          </div>
          <aside aria-labelledby="private-title" className="self-start border-t-2 border-accent pt-7 md:col-span-5 lg:col-span-4 lg:col-start-9">
            <h2 id="private-title" className="display display-m text-ink">
              Private pay
            </h2>
            <p className="mt-4">
              If insurance isn&apos;t an option, or you&apos;d rather not use it, private pay is available. We&apos;re
              happy to talk through what that looks like on a call, with no commitment.
            </p>
            <a href={site.phone.href} data-track="call" className="btn btn-ghost nums mt-6">
              Call {site.phone.display}
            </a>
          </aside>
        </div>
      </section>

      <section aria-labelledby="other-title" className="tone-forest py-24 md:py-32">
        <div className="wrap">
          <SectionHeading id="other-title" subtitle="other coverage">
            Other plans
          </SectionHeading>
          <dl className="mt-10 border-t border-line">
            {otherPlans.map((p) => (
              <div key={p.title} className="grid gap-2 border-b border-line py-7 md:grid-cols-12 md:gap-x-8">
                <dt className="display display-m text-ink md:col-span-5">{p.title}</dt>
                <dd className="md:col-span-7 lg:col-span-6">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="ask-title" className="tone-cafe relative overflow-hidden py-24 md:py-32">
        <LogRules className="absolute inset-0 h-full w-full text-ink/[0.05]" />
        <div className="wrap relative grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-5">
            <SectionHeading id="ask-title" subtitle="before you call">
              Questions to ask your insurance company
            </SectionHeading>
            <p className="mt-6 text-body">
              The member services number is usually on the back of your card. Write down who you spoke with and the date.
            </p>
          </div>
          <ol className="md:col-span-7">
            {askInsurer.map((q, i) => (
              <li key={q} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-beige/20 py-4 text-[1.0625rem]">
                <span aria-hidden="true" className="display text-[1.6rem] leading-none text-accent">
                  {i + 1}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="ins-faq-title" className="py-20 md:py-28">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4">
            <SectionHeading id="ins-faq-title" subtitle="questions">
              About cost
            </SectionHeading>
          </div>
          <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
            <FaqList items={pickFaqs(["insurance", "approval", "medicaid", "private-pay"])} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
