import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { FieldNote } from "@/components/brand";
import { CtaBand, PageHeader, SectionHeading } from "@/components/PageParts";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";
import { graph, ownerNode } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Anna Claire Waldrop, BCBA, and Our Team",
  description:
    "Wild & Free Behavior is a small ABA practice in New Albany, Mississippi, owned and led by Anna Claire Waldrop, M.S., BCBA, LBA. Meet the people and the cabin.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

// Portraits are captioned as a group: the client has not yet told us who is who.

const expect = [
  { title: "A free first conversation", body: "With Anna Claire and Jimbo, before anything is scheduled." },
  { title: "Benefits checked first", body: "We look at your coverage and go over it with you before services begin." },
  { title: "The same days and times each week", body: "Set together after the assessment, so your week has a rhythm." },
  { title: "A Friday reminder", body: "A heads-up each Friday with your child's schedule for the week ahead." },
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
            We&apos;re a small ABA practice in New Albany, Mississippi, owned and led by {site.owner.name},{" "}
            {site.owner.credentials}. Home is a log cabin on Doctors Drive with a big front porch, warm pine rooms, and a
            garden.
          </p>
        }
      />

      <section aria-label="Our team on the porch" className="pb-20 md:pb-28">
        <div className="wrap">
          <figure className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-12 md:items-end">
              <div className="col-span-2 aspect-[0.8] overflow-hidden md:col-span-4">
                <Photo image="porchFamily" sizes="(min-width: 48rem) 32vw, 100vw" />
              </div>
              <div className="aspect-[0.8] overflow-hidden md:col-span-3 md:mb-20">
                <Photo image="portraitA" sizes="(min-width: 48rem) 24vw, 50vw" />
              </div>
              <div className="aspect-[0.8] overflow-hidden md:col-span-2">
                <Photo image="portraitB" sizes="(min-width: 48rem) 16vw, 50vw" />
              </div>
              <div className="col-span-2 aspect-[0.8] overflow-hidden sm:col-span-1 md:col-span-3 md:mb-10">
                <Photo image="portraitC" sizes="(min-width: 48rem) 24vw, 50vw" />
              </div>
            </div>
            <figcaption className="mt-4 text-[0.9375rem] text-muted">On the porch at Wild &amp; Free Behavior.</figcaption>
            <FieldNote className="absolute -top-12 right-2 hidden rotate-[-4deg] text-ink md:block">say hello</FieldNote>
          </figure>
        </div>
      </section>

      <section id="anna-claire-waldrop" aria-labelledby="owner-title" className="tone-forest py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-7">
            <SectionHeading id="owner-title" subtitle="owner and BCBA">
              {`${site.owner.name}, ${site.owner.credentials}`}
            </SectionHeading>
            <div className="prose mt-6">
              <p>
                {site.owner.firstName} owns Wild &amp; Free Behavior and leads its clinical work. She is a Board Certified
                Behavior Analyst (BCBA) and a Mississippi Licensed Behavior Analyst (LBA). As the practice&apos;s BCBA, she
                oversees each child&apos;s assessment and treatment plan.
              </p>
              <p>
                She earned her BCBA certification in {site.owner.bcbaSince} and her Mississippi license in{" "}
                {site.owner.lbaSince}.
              </p>
              <p>
                When you reach out, your first conversation is with {site.owner.firstName} and {site.partner.name}, so you
                meet the people behind the practice before anything else happens.
              </p>
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
              Our cabin sits on Doctors Drive in New Albany. Inside, the rooms are pine-paneled, with soft floor seating, low
              tables, and a check-in board on the wall. Outside there&apos;s a porch with rocking chairs and a garden where
              corn and tomatoes grow in summer.
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
      <JsonLd data={graph(ownerNode())} />
    </>
  );
}
