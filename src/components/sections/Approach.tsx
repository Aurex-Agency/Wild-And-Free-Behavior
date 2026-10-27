import Link from "next/link";
import { LogRules } from "@/components/brand";
import { Photo } from "@/components/Photo";

// Focus areas are possibilities shaped by each child's assessment, not promised outcomes.
// Wording flagged for BCBA review in REVIEW-NOTES.md.

function Area({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="display display-m text-forest">{title}</h3>
      <p className="mt-3 max-w-[32rem]">{children}</p>
    </div>
  );
}

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="relative bg-beige-deep py-20 md:py-28">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-5 lg:col-span-4">
            <p className="subtitle text-forest">what we work on</p>
            <h2 id="approach-title" className="display display-l mt-4 text-forest">
              Built around your child
            </h2>
            <p className="lede mt-6">
              ABA therapy here starts with an assessment and with what matters most to your family. From there, your
              child&apos;s plan might focus on a few of these areas.
            </p>
            <Link href="/aba-therapy" className="link mt-6 inline-block">
              How ABA therapy works at the cabin
            </Link>
          </div>

          {/* Routines: tall photo with its text alongside */}
          <div className="grid gap-6 sm:grid-cols-[1fr_1fr] md:col-span-7 md:col-start-6 md:gap-8 lg:col-start-6">
            <figure className="relative">
              <div className="aspect-[0.79] overflow-hidden">
                <Photo image="routines" sizes="(min-width: 64rem) 26vw, (min-width: 40rem) 45vw, 100vw" />
              </div>
            </figure>
            <div className="self-end pb-2 sm:pt-24">
              <Area title="Everyday routines">
                Practicing the parts of the day that tend to be hard, like mealtimes, washing hands, getting dressed,
                or switching from one activity to the next.
              </Area>
              <LogRules className="mt-8 h-9 w-full text-cafe/15" lines={[0, 30, 52, 100]} />
              <div className="mt-8">
                <Area title="Communication">
                  Finding ways for your child to ask for what they need, whether that&apos;s words, signs, pictures, or a
                  device.
                </Area>
              </div>
            </div>
          </div>
        </div>

        {/* Learning and connection: wide garden photo, text overlapping its lower edge on large screens */}
        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4 md:self-center lg:col-span-3 lg:col-start-2">
            <div className="aspect-[1.5] overflow-hidden md:aspect-[0.9]">
              <Photo image="communication" sizes="(min-width: 64rem) 22vw, (min-width: 48rem) 32vw, 100vw" />
            </div>
          </div>
          <figure className="relative md:col-span-8 lg:col-span-7">
            <div className="aspect-[1.6] overflow-hidden">
              <Photo image="learning" sizes="(min-width: 64rem) 55vw, (min-width: 48rem) 64vw, 100vw" />
            </div>
            <div className="bg-beige-deep pt-6 md:absolute md:-bottom-20 md:-right-6 md:max-w-[24rem] md:bg-beige md:p-8 lg:-right-16">
              <Area title="Learning and connection">
                Short activities, taking turns, and playing near and with other kids, at a pace that fits your child.
              </Area>
            </div>
          </figure>
        </div>

        {/* Family priorities: a text-only band so the section doesn't read as a grid of cards */}
        <div className="relative mt-16 overflow-hidden bg-forest px-6 py-10 text-beige md:mt-32 md:px-12 md:py-14">
          <LogRules className="absolute inset-0 h-full w-full text-beige/[0.07]" />
          <div className="relative grid gap-6 md:grid-cols-12 md:items-end md:gap-x-8">
            <h3 className="display display-l md:col-span-5">Family priorities</h3>
            <p className="lede md:col-span-6 md:col-start-7">
              The things that would make your days at home easier. You tell us what those are, and they shape the plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
