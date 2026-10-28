import type { Metadata } from "next";
import { site } from "@/config/site";
import { CtaBand, PageHeader, SectionHeading } from "@/components/PageParts";
import { GuidesList } from "@/components/GuidesList";

export const metadata: Metadata = {
  title: "Autism and ABA Resources for North Mississippi Families",
  description:
    "Guides for North Mississippi families, written by our team in New Albany, on what to do after an autism diagnosis, finding an evaluation, ABA and BCBS, and the first visit.",
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
        title="Autism resources for North Mississippi families"
        layout="stacked"
        intro={
          <p>
            Guides for North Mississippi families, written by our team in New Albany. Pick the one that matches where
            you are right now.
          </p>
        }
      />

      <section aria-label="Guides" className="pb-20 md:pb-28">
        <div className="wrap">
          <GuidesList headingLevel="h2" />
        </div>
      </section>

      <section aria-labelledby="statewide-title" className="tone-forest py-24 md:py-32">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4">
            <SectionHeading id="statewide-title" subtitle="across the state">
              Statewide help
            </SectionHeading>
            <p className="mt-5">Free public resources. We aren&apos;t affiliated with these agencies.</p>
          </div>
          <ul className="border-t border-line md:col-span-8">
            {statewide.map((s) => (
              <li key={s.href} className="border-b border-line py-5">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link text-[1.0625rem]">
                  {s.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <p className="nums mt-1.5 text-muted">{s.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
