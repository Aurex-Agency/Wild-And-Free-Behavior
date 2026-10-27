import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { ArticleLayout, articleMetadata } from "@/components/ArticleLayout";

const slug = "does-bcbs-of-mississippi-cover-aba-therapy";
export const metadata: Metadata = articleMetadata(slug);

export default function Page() {
  return (
    <ArticleLayout slug={slug}>
      <h2>The short answer</h2>
      <p>
        Many Blue Cross &amp; Blue Shield of Mississippi plans cover ABA therapy for autism, but coverage depends on your
        specific plan. The only way to know for sure is to check your child&apos;s benefits, and that&apos;s something
        our team helps with.
      </p>

      <h2>Mississippi&apos;s autism insurance law</h2>
      <p>
        In 2015, Mississippi passed a law requiring certain health plans to cover the screening, diagnosis, and treatment
        of autism, including ABA therapy. It&apos;s found at Mississippi Code § 83-9-26. According to the Mississippi
        Insurance Department, the law applies to:
      </p>
      <ul>
        <li>All large group health plans</li>
        <li>Older (&ldquo;grandfathered&rdquo;) plans sold in the individual and small group markets</li>
      </ul>
      <p>It doesn&apos;t apply to:</p>
      <ul>
        <li>Newer individual and small group plans</li>
        <li>Many self-funded employer plans, which federal law exempts from state insurance rules</li>
        <li>Medicare supplement and other limited-benefit policies</li>
      </ul>
      <p>
        Under the law, plans don&apos;t have to cover ABA past age 8, and the ABA benefit is limited to 25 hours a week,
        though coverage can go beyond those limits when an ongoing treatment plan shows it&apos;s medically necessary.
        The Insurance Department lists Blue Cross &amp; Blue Shield of Mississippi among the insurers that voluntarily
        removed the age restriction for ABA.
      </p>
      <p>
        If you get insurance through work, ask your HR department whether your plan is fully insured or self-funded. It
        makes a difference.
      </p>

      <h2>What BCBS of Mississippi requires before ABA starts</h2>
      <p>
        In its response to the Mississippi Insurance Department, Blue Cross &amp; Blue Shield of Mississippi described
        these steps:
      </p>
      <ol>
        <li>
          <strong>Approval for the assessment.</strong> Prior authorization is required for the initial autism assessment.
        </li>
        <li>
          <strong>An order and a treatment plan.</strong> ABA needs an order from an in-network physician or licensed
          psychologist, plus an individualized treatment plan with measurable goals.
        </li>
        <li>
          <strong>Approval for therapy.</strong> ABA is approved for six months at a time, based on the approved treatment
          plan.
        </li>
        <li>
          <strong>Reassessment.</strong> At six months, your child is reassessed and an updated plan is submitted.
        </li>
      </ol>
      <p>
        That response dates from 2018, and insurers update their rules, so we confirm the current requirements for each
        child.
      </p>

      <h2>What you&apos;ll pay</h2>
      <p>
        Your share depends on your plan&apos;s deductible, copay, and coinsurance, and on whether the provider is in
        network. Ask for those numbers before services begin, and ask whether there are limits on hours or visits.
      </p>

      <h2>Questions to ask BCBS</h2>
      <ul>
        <li>Does my plan cover ABA therapy for autism?</li>
        <li>Is prior authorization needed for the assessment and for therapy?</li>
        <li>What are my deductible, copay, and coinsurance for ABA?</li>
        <li>Are there limits on hours, visits, or age?</li>
        <li>Is Wild &amp; Free Behavior in network for my plan?</li>
      </ul>
      <p>The member services number is on the back of your card. Write down who you spoke with and the date.</p>

      <h2>If something is denied</h2>
      <p>
        Ask for the reason in writing and what would be needed to reconsider. The Mississippi Insurance Department&apos;s
        autism hotline, 1-833-488-6472, can also help you understand your options. It&apos;s open weekdays from 8 a.m. to
        5 p.m. Central.
      </p>

      <h2>How we help</h2>
      <p>
        We work with Blue Cross &amp; Blue Shield of Mississippi. Our team checks your child&apos;s benefits and helps
        with the approval requests for the assessment and the treatment plan. If BCBS isn&apos;t your insurance,
        we&apos;ll talk through other options, including private pay.
      </p>
      <p>
        <Link href="/insurance">Insurance and private pay at Wild &amp; Free Behavior</Link>, or call{" "}
        <a href={site.phone.href} data-track="call">
          {site.phone.display}
        </a>
        .
      </p>
    </ArticleLayout>
  );
}
