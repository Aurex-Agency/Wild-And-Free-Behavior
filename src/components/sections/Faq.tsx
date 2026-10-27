import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { pickFaqs } from "@/content/faqs";

const homeFaqs = pickFaqs(["get-started", "insurance", "private-pay", "no-diagnosis", "fit", "schedule"]);

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 md:py-28">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-8">
            <p className="subtitle text-forest">questions</p>
            <h2 id="faq-title" className="display display-l mt-3 text-forest">
              What families ask
            </h2>
            <Link href="/faq" className="link mt-6 inline-block">
              All questions
            </Link>
          </div>
        </div>
        <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
          <FaqList items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}
