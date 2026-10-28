import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { ArticleLayout, articleMetadata } from "@/components/ArticleLayout";

const slug = "autism-evaluation-north-mississippi";
export const metadata: Metadata = articleMetadata(slug);

// Listings come from the DMH Autism Resource Guide (April 2026), evaluators section, limited to
// North Mississippi practices that focus on evaluation. Re-check against each new edition.
const evaluators = [
  {
    name: "Cardinal Clinical Consulting",
    town: "Tupelo",
    href: "https://www.cardinalclinical.com/",
    note: "IQ and autism testing. Does not provide ABA. Self-pay or CareCredit.",
  },
  {
    name: "Campbell Psychological Services",
    town: "Oxford",
    href: "https://www.campbellps.com/",
    note: "IQ and autism testing. Most major insurance; does not accept Medicaid.",
  },
  {
    name: "Delta Autumn Consulting",
    town: "Oxford",
    href: "https://deltaautumn.com/",
    note: "IQ and autism testing. Private insurance, including Blue Cross Blue Shield, and Medicare.",
  },
  {
    name: "Autism and Developmental Disabilities Clinic, Mississippi State University",
    town: "Starkville",
    href: "https://www.addc.msstate.edu/",
    note: "Autism assessments, along with behavioral and academic interventions.",
  },
];

export default function Page() {
  return (
    <ArticleLayout slug={slug}>
      <p>
        If you&apos;re wondering whether your child has autism, or a doctor or teacher has raised the question, the next
        step is a developmental evaluation. This guide covers how evaluations work in Mississippi and where families in
        North Mississippi can look.
      </p>

      <h2>Who can diagnose autism</h2>
      <p>
        Autism is diagnosed through a comprehensive evaluation by a qualified professional, such as a psychologist,
        developmental pediatrician, or psychiatrist. There&apos;s no single medical test. Instead, clinicians look at
        behavior, development, and communication.
      </p>

      <h2>Start with your pediatrician</h2>
      <p>
        Your child&apos;s doctor can screen for developmental concerns and refer you for a full evaluation. While
        you&apos;re there, ask whether your insurance needs a referral for the evaluation, and whether the evaluator
        you&apos;re considering is in network.
      </p>

      <h2>Early intervention and school evaluations</h2>
      <p>
        <strong>Under 3:</strong> Mississippi&apos;s First Steps Early Intervention Program evaluates a child&apos;s
        development to decide eligibility for early intervention services. That isn&apos;t the same as a medical autism
        diagnosis, but it can get support started while you wait. Call 1-800-451-3903 to make a referral.
      </p>
      <p>
        <strong>3 and older:</strong> your school district can evaluate your child for special education services. A
        school evaluation decides eligibility for school services. Insurance usually needs a medical diagnosis to cover
        ABA, so a school evaluation on its own often isn&apos;t enough for therapy outside school.
      </p>

      <h2>Evaluators in North Mississippi</h2>
      <p>
        The Mississippi Department of Mental Health&apos;s April 2026{" "}
        <a href={site.resources.dmhAutismGuide} target="_blank" rel="noopener noreferrer">
          Autism Resource Guide<span className="sr-only"> (PDF, opens in a new tab)</span>
        </a>{" "}
        lists these evaluators in North Mississippi. We aren&apos;t affiliated with them, and details change, so call
        ahead to confirm ages, insurance, and wait times.
      </p>
      <ul>
        {evaluators.map((e) => (
          <li key={e.name}>
            <a href={e.href} target="_blank" rel="noopener noreferrer">
              {e.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            , {e.town}. {e.note}
          </li>
        ))}
      </ul>
      <p>The guide lists more options elsewhere in the state, including Southaven and the Jackson area.</p>

      <h2>Questions to ask when you call</h2>
      <ul>
        <li>What ages do you evaluate?</li>
        <li>Do you take my insurance, and do I need a referral?</li>
        <li>How long is the wait for an appointment?</li>
        <li>What does the evaluation include, and how long does it take?</li>
        <li>Will the written report include a diagnosis and recommendations my insurance will need?</li>
      </ul>

      <h2>While you wait</h2>
      <p>
        Waits for evaluations can be long. You don&apos;t have to wait to ask for help: early intervention and school
        services don&apos;t require a medical diagnosis, and you&apos;re welcome to call us at{" "}
        <a href={site.phone.href} data-track="call">
          {site.phone.display}
        </a>{" "}
        to talk through where you are.
      </p>
      <p>
        <Link href="/resources/after-an-autism-diagnosis">What to do after a diagnosis</Link>
      </p>
    </ArticleLayout>
  );
}
