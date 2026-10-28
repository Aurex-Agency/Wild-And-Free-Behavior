import type { Metadata } from "next";
import { CtaBand, PageHeader } from "@/components/PageParts";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { allFaqs, faqGroups } from "@/content/faqs";
import { graph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Common Questions About ABA Therapy in New Albany, MS",
  description:
    "Answers for parents in New Albany and Union County about ABA therapy at Wild & Free Behavior: first steps, what therapy looks like, visiting the cabin, and cost.",
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
        title="What families ask about ABA therapy"
        layout="stacked"
        intro={<p>The questions parents ask us most, answered as plainly as we can. If yours isn&apos;t here, give us a call.</p>}
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
