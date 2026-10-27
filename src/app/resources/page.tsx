import type { Metadata } from "next";
import { site } from "@/config/site";
import { CtaBand, PageHeader, SectionHeading } from "@/components/PageParts";
import { GuidesList } from "@/components/GuidesList";

export const metadata: Metadata = {
  title: "Autism and ABA Resources for North Mississippi Families",
  description:
    "Plain-language guides for families in North Mississippi: after an autism diagnosis, finding an evaluation, BCBS of Mississippi and ABA, and preparing for a first visit.",
  alternates: { canonical: "/resources" },
  openGraph: { url: "/resources" },
};

const statewide = [
  {
    name: "Mississippi Department of Mental Health, Autism Resource Guide",
    detail: "Evaluators, ABA providers, and other services around the state. DMH Helpline: 1-877-210-8513.",
    href: site.resources.dmhAutismGuide,
  },
  {
    name: "First Steps Early Intervention (Mississippi State Department of Health)",
    detail: "For infants and toddlers under 3. Referrals: 1-800-451-3903.",
    href: "https://msdh.ms.gov/Page/41,0,74,830.html",
  },
  {
    name: "Mississippi Insurance Department, autism insurance benefits",
    detail: "Which plans the state law covers. Autism hotline: 1-833-488-6472.",
    href: "https://www.mid.ms.gov/mississippi-insurance-department/healthcare/autism/",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Resources", path: "/resources" }]}
        subtitle="a place to start"
        title="Resources for families"
        layout="stacked"
        intro={
          <p>
            Plain-language guides for families in North Mississippi, written by our team. Start wherever you are: a new
            diagnosis, a question about insurance, or a first visit coming up.
          </p>
        }
      />

      <section aria-label="Guides" className="pb-20 md:pb-28">
        <div className="wrap">
          <GuidesList headingLevel="h2" />
        </div>
      </section>

      <section aria-labelledby="statewide-title" className="bg-beige-deep py-20 md:py-28">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4">
            <SectionHeading id="statewide-title" subtitle="across the state">
              Statewide help
            </SectionHeading>
            <p className="mt-5">Free public resources. We aren&apos;t affiliated with these agencies.</p>
          </div>
          <ul className="border-t border-cafe/20 md:col-span-8">
            {statewide.map((s) => (
              <li key={s.href} className="border-b border-cafe/20 py-5">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link text-[1.0625rem]">
                  {s.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <p className="nums mt-1.5 text-cafe-soft">{s.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
