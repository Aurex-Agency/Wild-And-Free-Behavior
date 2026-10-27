import Link from "next/link";
import { GuidesList } from "@/components/GuidesList";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";

export function Guides() {
  return (
    <section aria-labelledby="guides-title" className="tone-deep relative pb-24 md:pb-36">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-4">
          <Reveal variant="fade">
            <p className="subtitle">for families</p>
          </Reveal>
          <Words id="guides-title" text="Guides for the road ahead" className="display display-l mt-3" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[24rem]">
              Plain answers for North Mississippi families, from a new diagnosis to insurance to a first visit.
            </p>
            <Link href="/resources" className="link mt-6 inline-block">
              All resources
            </Link>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <GuidesList />
        </div>
      </div>
    </section>
  );
}
