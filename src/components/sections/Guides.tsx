import Link from "next/link";
import { GuidesList } from "@/components/GuidesList";

export function Guides() {
  return (
    <section aria-labelledby="guides-title" className="bg-beige-deep py-20 md:py-28">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4">
          <p className="subtitle text-forest">for families</p>
          <h2 id="guides-title" className="display display-l mt-3 text-forest">
            Guides for the road ahead
          </h2>
          <p className="mt-5 max-w-[24rem]">
            Plain answers for North Mississippi families, from a new diagnosis to insurance to a first visit.
          </p>
          <Link href="/resources" className="link mt-6 inline-block">
            All resources
          </Link>
        </div>
        <div className="md:col-span-8">
          <GuidesList />
        </div>
      </div>
    </section>
  );
}
