import type { Metadata } from "next";
import { CtaBand, PageHeader } from "@/components/PageParts";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { allFaqs, faqGroups } from "@/content/faqs";
import { graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "ABA Therapy Questions: Insurance, Scheduling, and Getting Started",
  description:
    "Answers for families considering ABA therapy at Wild & Free Behavior in New Albany, Mississippi: getting started, insurance and cost, therapy, and visiting.",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq" },
};

const slugify = (s: string) => `faq-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export default function FaqPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Questions", path: "/faq" }]}
        subtitle="questions"
        title="What families ask"
        layout="stacked"
        intro={<p>Straight answers about getting started, insurance, therapy, and visiting. If yours isn&apos;t here, call us.</p>}
      />

      <div className="wrap grid gap-12 pb-20 md:grid-cols-12 md:gap-x-8 md:pb-28 lg:gap-x-12">
        <nav aria-label="Question topics" className="md:col-span-3">
          <ul className="grid gap-2 md:sticky md:top-28">
            {faqGroups.map((g) => (
              <li key={g.title}>
                <a href={`#${slugify(g.title)}`} className="font-semibold text-ink hover:underline">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-14 md:col-span-9 lg:col-span-8">
          {faqGroups.map((g) => (
            <section key={g.title} id={slugify(g.title)} aria-labelledby={`${slugify(g.title)}-title`}>
              <h2 id={`${slugify(g.title)}-title`} className="display display-m mb-5 text-ink">
                {g.title}
              </h2>
              <FaqList items={g.items} />
            </section>
          ))}
        </div>
      </div>

      <CtaBand />
      <JsonLd
        data={graph({
          "@type": "FAQPage",
          mainEntity: allFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })}
      />
    </>
  );
}
