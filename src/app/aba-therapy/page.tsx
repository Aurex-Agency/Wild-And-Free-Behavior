import type { Metadata } from "next";
import Link from "next/link";
import { FieldNote, LogRules } from "@/components/brand";
import { CtaBand, PageHeader, SectionHeading } from "@/components/PageParts";
import { FaqList } from "@/components/FaqList";
import { Photo, type ImageKey } from "@/components/Photo";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";
import { pickFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "ABA Therapy for Young Children in New Albany, MS",
  description:
    "What ABA therapy looks like at Wild & Free Behavior in New Albany, Mississippi: an assessment, a plan written by a BCBA, practical goals, and family priorities.",
  alternates: { canonical: "/aba-therapy" },
  openGraph: { url: "/aba-therapy" },
};

// Clinical wording on this page is flagged for BCBA review in REVIEW-NOTES.md.

const areas: { title: string; body: string; image: ImageKey }[] = [
  {
    title: "Communication",
    body: "Finding ways for your child to ask for what they need and share what they want, whether that's words, signs, pictures, or a device.",
    image: "communication",
  },
  {
    title: "Everyday routines",
    body: "Practicing the parts of the day that tend to be hard: mealtimes, washing hands, getting dressed, waiting, and moving from one activity to the next.",
    image: "routines",
  },
  {
    title: "Learning and connection",
    body: "Short activities, following simple directions, taking turns, and playing near and with other children.",
    image: "learning",
  },
  {
    title: "Family priorities",
    body: "The things that would make your days easier. You tell us what those are, and they shape the goals.",
    image: "heroGardenMobile",
  },
];

const inside: { image: ImageKey; caption: string; aspect: string }[] = [
  { image: "windowRoom", caption: "A table by the window", aspect: "aspect-[1.3]" },
  { image: "tableWork", caption: "Work time at a small table", aspect: "aspect-[1.3]" },
  { image: "wallScript", caption: "Our name on the pine wall", aspect: "aspect-[1.3]" },
];

export default function AbaTherapyPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "ABA Therapy", path: "/aba-therapy" }]}
        subtitle="at the cabin"
        title="ABA therapy for young children in New Albany"
        intro={
          <p>
            Applied behavior analysis, or ABA, teaches everyday skills in small, practical steps, building on what works
            for your child. At Wild &amp; Free Behavior, every plan is designed by a Board Certified Behavior Analyst, and
            our home base is a log cabin on Doctors Drive.
          </p>
        }
        aside={
          <figure className="relative mx-auto max-w-[24rem] md:ml-auto md:mr-0">
            <div className="arch-portrait aspect-[0.8]">
              <Photo image="toddler" priority sizes="(min-width: 48rem) 24rem, 90vw" />
            </div>
            <FieldNote className="absolute -bottom-9 left-2 rotate-[-5deg] text-forest md:-left-16">time to play</FieldNote>
          </figure>
        }
      />

      <section aria-labelledby="looks-like" className="pb-20 pt-6 md:pb-28 md:pt-10">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="prose md:col-span-7">
            <h2 id="looks-like">What ABA looks like here</h2>
            <p>
              It starts with getting to know your child. During the assessment, we spend time with your child and talk
              with you to learn what they&apos;re already good at, what&apos;s hard right now, and what would make the
              biggest difference at home.
            </p>
            <p>
              From there, our BCBA writes a plan with specific goals. Sessions work toward those goals a little at a time,
              with plenty of practice and encouragement, and the plan changes as your child learns.
            </p>
            <p>
              Insurance plans that cover ABA review the plan on a regular schedule. With Blue Cross &amp; Blue Shield of
              Mississippi, approvals typically last six months, followed by a reassessment and an updated plan.{" "}
              <Link href="/resources/does-bcbs-of-mississippi-cover-aba-therapy">
                How BCBS of Mississippi handles ABA
              </Link>
              .
            </p>
          </div>
          <aside aria-labelledby="who-title" className="self-start bg-sand-soft p-7 md:col-span-5 md:p-9 lg:col-span-4 lg:col-start-9">
            <h2 id="who-title" className="display display-m text-forest">
              Who we work with
            </h2>
            <p className="mt-4">
              We work with young children who have an autism diagnosis, including families who are just getting started
              after a new diagnosis.
            </p>
            <p className="mt-4">
              If your child is older or younger than the children we usually see, or you&apos;re still waiting on an
              evaluation, reach out anyway. A person on our team will talk it through with you.
            </p>
            <div className="mt-6">
              <ScreenerTrigger>Find your next step</ScreenerTrigger>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="focus-title" className="on-dark relative overflow-hidden bg-forest py-20 text-beige md:py-28">
        <LogRules className="absolute inset-0 h-full w-full text-beige/[0.05]" />
        <div className="wrap relative">
          <div className="max-w-[40rem]">
            <SectionHeading id="focus-title" subtitle="goals that fit your family" tone="dark">
              What therapy can focus on
            </SectionHeading>
            <p className="lede mt-6 text-beige/90">
              Goals come from your child&apos;s assessment, so not every child works on every area.
            </p>
          </div>
          <ul className="mt-12 border-t border-beige/20">
            {areas.map((a) => (
              <li key={a.title} className="grid items-center gap-5 border-b border-beige/20 py-7 md:grid-cols-12 md:gap-x-8">
                <h3 className="display display-m md:col-span-4">{a.title}</h3>
                <p className="text-beige/90 md:col-span-5">{a.body}</p>
                <div className="hidden aspect-[1.5] overflow-hidden md:col-span-3 md:block">
                  <Photo image={a.image} sizes="(min-width: 80rem) 18rem, 22vw" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="inside-title" className="py-20 md:py-28">
        <div className="wrap">
          <SectionHeading id="inside-title" subtitle="a look around">
            Inside the cabin
          </SectionHeading>
          <p className="mt-5 max-w-[36rem]">
            Pine-paneled rooms, soft floor seating, low tables for work time, and a check-in board on the wall. Outside
            there&apos;s a porch and a garden.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_1fr] lg:items-end">
            {inside.map((p, i) => (
              <li key={p.image} className={i === 1 ? "lg:mb-12" : undefined}>
                <figure>
                  <div className={`${p.aspect} overflow-hidden`}>
                    <Photo image={p.image} sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 50vw, 100vw" />
                  </div>
                  <figcaption className="mt-3 text-[0.9375rem] text-cafe-soft">{p.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Working together" className="bg-beige-deep py-20 md:py-28">
        <div className="wrap grid gap-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="display display-l text-forest">You&apos;re part of the plan</h2>
            <p className="mt-5">
              You know your child better than anyone, so your priorities shape the goals. We&apos;ll talk with you about
              what your child is working on and how it&apos;s going, and you can always ask why we&apos;re doing
              something.
            </p>
          </div>
          <div>
            <h2 className="display display-l text-forest">A plan that grows with your child</h2>
            <p className="mt-5">
              Progress is reviewed regularly, and the plan is updated when goals are met or when something isn&apos;t
              working. Insurance reassessments, usually every six months with BCBS of Mississippi, are a natural time to
              step back and look at the bigger picture.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="aba-faq-title" className="py-20 md:py-28">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4">
            <SectionHeading id="aba-faq-title" subtitle="questions">
              About therapy
            </SectionHeading>
            <Link href="/faq" className="link mt-6 inline-block">
              All questions
            </Link>
          </div>
          <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
            <FaqList items={pickFaqs(["hours", "who", "prior-aba", "schedule"])} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
