import Link from "next/link";
import { Photo } from "@/components/Photo";
import { FocusIndex } from "@/components/motion/FocusIndex";
import { Words } from "@/components/motion/Words";
import { Reveal } from "@/components/motion/Reveal";

// Focus areas are possibilities shaped by each child's assessment, not promised outcomes.
// Wording flagged for BCBA review in REVIEW-NOTES.md.

const items = [
  {
    title: "Communication",
    body: "Finding ways for your child to ask for what they need, whether that's words, signs, pictures, or a device.",
    media: <Photo image="communication" sizes="(min-width: 48rem) 36vw, 100vw" />,
  },
  {
    title: "Everyday routines",
    body: "Practicing the parts of the day that tend to be hard, like mealtimes, washing hands, getting dressed, or switching from one activity to the next.",
    media: <Photo image="routines" sizes="(min-width: 48rem) 36vw, 100vw" />,
  },
  {
    title: "Learning and connection",
    body: "Short activities, taking turns, and playing near and with other kids, at a pace that fits your child.",
    media: <Photo image="learning" sizes="(min-width: 48rem) 36vw, 100vw" />,
  },
  {
    title: "Family priorities",
    body: "The things that would make your days at home easier. You tell us what those are, and they shape the plan.",
    media: <Photo image="toddler" sizes="(min-width: 48rem) 36vw, 100vw" />,
  },
];

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="tone-deep relative py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <Reveal variant="fade">
              <p className="subtitle">what we work on</p>
            </Reveal>
            <Words id="approach-title" text="Built around your child" className="display display-xl mt-3" />
          </div>
          <Reveal className="md:col-span-5 md:self-end" delay={0.15}>
            <p className="lede">
              ABA therapy here starts with an assessment and with what matters most to your family. From there, your
              child&apos;s plan might focus on a few of these areas.
            </p>
            <Link href="/aba-therapy" className="link mt-6 inline-block">
              How ABA therapy works at the cabin
            </Link>
          </Reveal>
        </div>
        <div className="mt-16 md:mt-24">
          <FocusIndex items={items} />
        </div>
      </div>
    </section>
  );
}
