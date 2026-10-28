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
    body: "Helping your child ask for what they need, with words, signs, pictures, or a device.",
    media: <Photo image="communication" sizes="(min-width: 48rem) 36vw, 100vw" />,
  },
  {
    title: "Everyday routines",
    body: "Practice with the hard parts of the day: mealtimes, washing hands, getting dressed, and moving from one thing to the next.",
    media: <Photo image="routines" sizes="(min-width: 48rem) 36vw, 100vw" />,
  },
  {
    title: "Learning and connection",
    body: "Sitting for short activities, taking turns, and learning to play near and with other kids.",
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
              Before anything else, we assess your child and listen to you about what&apos;s hard at home right now.
              The goals we set together usually fall into a few of these areas.
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
