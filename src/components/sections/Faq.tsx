import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { pickFaqs } from "@/content/faqs";

const homeFaqs = pickFaqs(["get-started", "no-diagnosis", "who", "schedule", "first-visit", "insurance"]);

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="tone-forest relative py-24 md:py-36">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Reveal variant="fade">
              <p className="subtitle">questions</p>
            </Reveal>
            <Words id="faq-title" text="What families ask" className="display display-l mt-3" />
            <Reveal delay={0.1}>
              <Link href="/faq" className="link mt-7 inline-block">
                All questions
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
          <FaqList items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
