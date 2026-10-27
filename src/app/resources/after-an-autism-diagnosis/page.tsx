import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { ArticleLayout, articleMetadata } from "@/components/ArticleLayout";

const slug = "after-an-autism-diagnosis";
export const metadata: Metadata = articleMetadata(slug);

export default function Page() {
  return (
    <ArticleLayout slug={slug}>
      <p>
        A new diagnosis often comes with a long report, a lot of new words, and not much direction about what happens
        next. This guide puts the next steps in a practical order for families in North Mississippi. You don&apos;t have
        to do all of it this week.
      </p>

      <h2>1. Keep the evaluation report somewhere safe</h2>
      <p>
        The written report from your child&apos;s evaluation matters. Insurance companies usually need it before they
        approve services like ABA therapy, and schools and therapists will ask for it too. Keep a paper copy, and a scan
        or photo on your phone.
      </p>

      <h2>2. Talk with your child&apos;s pediatrician</h2>
      <p>
        Your pediatrician can help coordinate what comes next, including referrals for therapies your child may need,
        such as speech, occupational therapy, or ABA. Some insurance plans ask for a doctor&apos;s order or referral
        before ABA can start, so it helps to have that conversation early.
      </p>

      <h2>3. Look into early intervention or school services</h2>
      <p>
        <strong>If your child is under 3,</strong> Mississippi&apos;s First Steps Early Intervention Program, run by the
        Mississippi State Department of Health, serves infants and toddlers with developmental delays or with diagnosed
        conditions likely to cause delays. Families can refer their own child by calling 1-800-451-3903 toll-free, or
        601-576-7427 in the Jackson area. A service coordinator from your local program follows up after the referral,
        and services usually happen at home or in other everyday settings.
      </p>
      <p>
        <strong>If your child is 3 or older,</strong> contact your school district about a special education evaluation.
        Federal law requires school districts to find and evaluate children who may need special education, a process
        often called Child Find. In Union County, that&apos;s either the New Albany or the Union County school district,
        depending on where you live. A school evaluation decides eligibility for school services. It&apos;s separate
        from a medical diagnosis, and you can pursue both.
      </p>

      <h2>4. Learn what ABA is, and ask questions</h2>
      <p>
        Applied behavior analysis, or ABA, is one of the services often recommended after an autism diagnosis. It teaches
        everyday skills like communication, routines, and play in small steps, with a plan designed by a Board Certified
        Behavior Analyst (BCBA). A good provider will explain their approach plainly and welcome your questions.
      </p>
      <p>Questions worth asking any ABA provider:</p>
      <ul>
        <li>Who writes and oversees my child&apos;s plan, and are they a BCBA licensed in Mississippi?</li>
        <li>How will you decide what my child works on?</li>
        <li>How will I know how things are going?</li>
        <li>How is the weekly schedule set, and how often does it change?</li>
        <li>What does my insurance cover, and what will I pay?</li>
      </ul>
      <p>
        <Link href="/aba-therapy">How ABA therapy works at our cabin</Link>
      </p>

      <h2>5. Check your insurance</h2>
      <p>
        Mississippi law requires many health plans to cover autism treatment, including ABA, but not every plan falls
        under it. Large group plans and some older individual and small group plans are covered. Newer individual and
        small group plans aren&apos;t, and self-funded employer plans often aren&apos;t either, because federal law
        exempts them from state insurance rules.
      </p>
      <p>
        The simplest way to know is to call the member services number on your card and ask. The Mississippi Insurance
        Department also runs an autism insurance hotline at 1-833-488-6472, weekdays from 8 a.m. to 5 p.m. Central.
      </p>
      <p>
        <Link href="/resources/does-bcbs-of-mississippi-cover-aba-therapy">
          Does Blue Cross &amp; Blue Shield of Mississippi cover ABA therapy?
        </Link>
      </p>

      <h2>6. Use the state&apos;s resource guide</h2>
      <p>
        The Mississippi Department of Mental Health&apos;s Division of Autism Services publishes an{" "}
        <a href={site.resources.dmhAutismGuide} target="_blank" rel="noopener noreferrer">
          Autism Resource Guide<span className="sr-only"> (PDF, opens in a new tab)</span>
        </a>{" "}
        that lists evaluators, ABA providers, and other services around the state. You can also call the DMH Helpline at
        1-877-210-8513 for help finding services near you.
      </p>

      <h2>Where we fit</h2>
      <p>
        Wild &amp; Free Behavior provides ABA therapy for young children in New Albany. If you&apos;re early in this
        process and not sure where to start, call us at{" "}
        <a href={site.phone.href} data-track="call">
          {site.phone.display}
        </a>{" "}
        or use the short form on our site. We&apos;ll tell you honestly whether we&apos;re a good fit, and if we&apos;re
        not, we&apos;ll help you figure out where to look next.
      </p>
    </ArticleLayout>
  );
}
