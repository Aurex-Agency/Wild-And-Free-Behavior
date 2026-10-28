import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { FieldNote } from "@/components/brand";
import { CtaBand, PageHeader, SectionHeading } from "@/components/PageParts";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";
import { graph, ownerNode, partnerNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us: Anna Claire Waldrop, BCBA, and Jimbo Waldrop",
  description:
    "Meet Anna Claire Waldrop, M.S., BCBA, LBA, and her husband Jimbo, who run Wild & Free Behavior, a small ABA practice in a log cabin in New Albany, Mississippi.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

// Story facts come from 2017 coverage by TODAY, Shepherd Center, and United Spinal, and the practice's
// earlier website. The client asked that the accident be mentioned briefly and the injury kept out of focus.
// Only Anna Claire and Jimbo appear on the site, and their children are never mentioned.

const expect = [
  { title: "A free first conversation", body: "With Anna Claire and Jimbo, before anything is scheduled." },
  { title: "A plan written by a BCBA", body: "Anna Claire writes and oversees every child's plan." },
  { title: "The same days and times each week", body: "We set them together after the assessment, and they don't move around." },
  { title: "A Friday reminder", body: "Every Friday we send your child's schedule for the week ahead." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "About", path: "/about" }]}
        subtitle="the people on the porch"
        title="About Wild & Free Behavior"
        layout="stacked"
        intro={
          <p>
            Wild &amp; Free Behavior belongs to Anna Claire and Jimbo Waldrop. They run it out of a log cabin on Doctors
            Drive in New Albany, Mississippi, the town where they both grew up.
          </p>
        }
      />

      <section aria-label="Anna Claire and Jimbo on the porch" className="pb-20 md:pb-28">
        <div className="wrap">
          <figure className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-12 md:items-end">
              <div className="col-span-2 aspect-[0.8] overflow-hidden md:col-span-5">
                <Photo image="porchFamily" sizes="(min-width: 48rem) 40vw, 100vw" />
              </div>
              <div className="aspect-[0.8] overflow-hidden md:col-span-4 md:mb-20">
                <Photo image="portraitAnnaClaire" sizes="(min-width: 48rem) 32vw, 50vw" />
              </div>
              <div className="aspect-[0.8] overflow-hidden md:col-span-3">
                <Photo image="portraitJimbo" sizes="(min-width: 48rem) 24vw, 50vw" />
              </div>
            </div>
            <figcaption className="mt-4 text-[0.9375rem] text-muted">Anna Claire and Jimbo on the cabin porch.</figcaption>
            <FieldNote className="absolute -top-12 right-2 hidden rotate-[-4deg] text-ink md:block">say hello</FieldNote>
          </figure>
        </div>
      </section>

      <section id="our-story" aria-labelledby="story-title" className="tone-paper py-24 md:py-32">
        <div className="wrap grid items-start gap-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-6 lg:col-span-6">
            <SectionHeading id="story-title" subtitle="our story">
              Since kindergarten
            </SectionHeading>
            <div className="prose mt-6">
              <p>
                Anna Claire and Jimbo met in kindergarten in New Albany. He asked her to be his girlfriend the week
                before sixth grade, and they&apos;ve been together, more or less, ever since.
              </p>
              <p>
                In February 2016, a month after they got engaged, they were in a serious car accident on the way back
                to Delta State. Anna Claire spent that spring in rehab in Atlanta, where she said her therapists
                &ldquo;became family.&rdquo; They kept their wedding date anyway, and on October 22, 2016, they were
                married back home in New Albany.
              </p>
              <p>
                Anna Claire went on to earn her master&apos;s and became a Board Certified Behavior Analyst in 2020.
                Jimbo taught middle school science and coached football for five years, and used ABA in his own
                classroom. Now they run Wild &amp; Free Behavior together, in a log cabin on Doctors Drive, in the town
                where they grew up.
              </p>
            </div>
          </div>
          <figure className="md:col-span-6 lg:col-span-5 lg:col-start-8 md:mt-16">
            <div className="aspect-[1.25] overflow-hidden rounded-[1.5rem]">
              <Photo image="office" sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 50vw, 100vw" />
            </div>
            <figcaption className="mt-3 text-[0.9375rem] text-muted">Jimbo and Anna Claire inside the cabin.</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="owner-title" className="tone-forest py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-7">
            <div id="anna-claire-waldrop">
              <SectionHeading id="owner-title" subtitle="owner and BCBA">
                {`${site.owner.name}, ${site.owner.credentials}`}
              </SectionHeading>
              <div className="prose mt-6">
                <p>
                  Anna Claire owns Wild &amp; Free Behavior and runs the clinical side. She&apos;s a Board Certified
                  Behavior Analyst (BCBA) and a Mississippi Licensed Behavior Analyst (LBA), and she oversees every
                  child&apos;s assessment and treatment plan.
                </p>
                <p>
                  Her first degree, from Delta State, was in speech and hearing science. She went on to earn a
                  master&apos;s, then her BCBA certification in {site.owner.bcbaSince} and her Mississippi license in{" "}
                  {site.owner.lbaSince}.
                </p>
              </div>
            </div>
            <div id="jimbo-waldrop" className="mt-14">
              <h3 className="display display-m text-ink">{site.partner.name}</h3>
              <div className="prose mt-4">
                <p>
                  Jimbo has a biology degree from Delta State and a master&apos;s in teaching. He taught middle school
                  science and coached football for five years, and he used ABA with students in his own classroom.
                </p>
                <p>He&apos;s part of every first conversation with families, so you&apos;ll meet him early on.</p>
              </div>
            </div>
          </div>
          <aside aria-labelledby="verify-title" className="self-start tone-paper rounded-[1.5rem] p-7 md:col-span-5 md:p-9 lg:col-span-4 lg:col-start-9">
            <h3 id="verify-title" className="display display-m text-ink">
              Check any provider&apos;s credentials
            </h3>
            <p className="mt-4">
              Behavior analysts in Mississippi should hold a current BCBA certification and a state license. You can look
              anyone up, including us.
            </p>
            <ul className="mt-5 grid gap-3">
              <li>
                <a className="link" href={site.resources.bacbRegistry} target="_blank" rel="noopener noreferrer">
                  BACB certificant registry<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a className="link" href={site.resources.msAutismBoardLookup} target="_blank" rel="noopener noreferrer">
                  Mississippi Autism Board license lookup<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section aria-labelledby="cabin-title" className="py-20 md:py-28">
        <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <figure className="md:col-span-6">
            <div className="aspect-[1.25] overflow-hidden">
              <Photo image="cabin" sizes="(min-width: 48rem) 50vw, 100vw" />
            </div>
          </figure>
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <SectionHeading id="cabin-title" subtitle="the cabin">
              A log cabin on Doctors Drive
            </SectionHeading>
            <p className="mt-6">
              The cabin sits on Doctors Drive in New Albany, in Union County. Inside, the rooms are paneled in pine,
              with cushions on the floor, low tables, a play room with a little teepee, and a check-in board on the
              wall. Outside there&apos;s a porch with rocking chairs and a garden where corn and tomatoes grow in summer.
            </p>
            <Link href="/visit" className="link mt-6 inline-block">
              Visiting the cabin
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="expect-title" className="relative overflow-hidden tone-forest py-20 md:py-28">
        <div className="wrap relative grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-5">
            <SectionHeading id="expect-title" subtitle="working with us">
              What you can count on
            </SectionHeading>
            <div className="mt-8">
              <ScreenerTrigger>Find your next step</ScreenerTrigger>
            </div>
          </div>
          <dl className="border-t border-line md:col-span-7">
            {expect.map((e) => (
              <div key={e.title} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[16rem_1fr] sm:gap-6">
                <dt className="font-bold text-ink">{e.title}</dt>
                <dd>{e.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
      <JsonLd data={graph(ownerNode(), partnerNode())} />
    </>
  );
}
