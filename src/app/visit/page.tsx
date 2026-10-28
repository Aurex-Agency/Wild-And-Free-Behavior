import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { ArchRays, raysHeadroom } from "@/components/brand";
import { CtaBand, PageHeader, SectionHeading } from "@/components/PageParts";
import { FaqList } from "@/components/FaqList";
import { Photo } from "@/components/Photo";
import { pickFaqs } from "@/content/faqs";

export const metadata: Metadata = {
  title: "Visit the Cabin: 403 Doctors Drive, New Albany, MS",
  description:
    "Find Wild & Free Behavior at 403 Doctors Drive in New Albany, Mississippi: a log cabin with a stone sign out front. Directions and distances from nearby towns.",
  alternates: { canonical: "/visit" },
  openGraph: { url: "/visit" },
};

// Road distances to 403 Doctors Drive from each town center (OpenStreetMap routing, October 2026).
const distances = [
  { town: "Myrtle", miles: 8, route: "" },
  { town: "Blue Springs", miles: 14, route: "" },
  { town: "Ripley", miles: 21, route: "south on Highway 15" },
  { town: "Pontotoc", miles: 22, route: "north on Highway 15" },
  { town: "Tupelo", miles: 28, route: "west on I-22" },
  { town: "Oxford", miles: 33, route: "east on Highway 30" },
];

const REACH = 0.22;

export default function VisitPage() {
  return (
    <>
      <PageHeader
        trail={[{ name: "Visit", path: "/visit" }]}
        subtitle="come on in"
        title="Visit the cabin in New Albany"
        intro={
          <p>
            We&apos;re at {site.address.street} in New Albany, in a log cabin with a big front porch. Look for the stone
            sign out front.
          </p>
        }
        aside={
          <figure className="relative mx-auto w-full max-w-[22rem] md:ml-auto md:mr-6">
            <div style={{ paddingTop: `${raysHeadroom(REACH) * 100}%` }} />
            <div className="relative">
              <ArchRays reach={REACH} animate weight={2} className="text-ink" />
              <div className="arch-portrait aspect-[0.8]">
                <Photo image="cabinPortrait" priority sizes="(min-width: 48rem) 22rem, 90vw" />
              </div>
            </div>
          </figure>
        }
      />

      <section aria-labelledby="address-title" className="pb-20 pt-6 md:pb-28">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="tone-paper self-start rounded-[1.5rem] p-7 md:sticky md:top-28 md:col-span-5 md:p-10">
            <h2 id="address-title" className="display display-m text-ink">
              Address
            </h2>
            <address className="nums mt-5 text-[1.125rem] not-italic leading-relaxed">
              <span className="block font-bold text-body">{site.name}</span>
              <span className="block">{site.address.street}</span>
              <span className="block">
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
              <a href={site.phone.href} className="link mt-3 inline-block" data-track="call">
                {site.phone.display}
              </a>
            </address>
            {site.hours && (
              <dl className="nums mt-6 text-[0.9375rem]">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-line py-2">
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            )}
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-7 w-full sm:w-auto"
              data-track="directions"
            >
              Get directions
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
            <p className="mt-6 text-[0.9375rem]">
              We&apos;ll set up your first visit together after we talk.
            </p>
          </div>

          <div className="md:col-span-7 lg:col-span-6 lg:col-start-7">
            <SectionHeading id="drive-title" subtitle="driving in">
              From nearby towns
            </SectionHeading>
            <p className="mt-5 max-w-[34rem]">
              New Albany sits where I-22 meets Highways 15 and 30, so families from around North Mississippi can get here
              without much trouble. Approximate road distances:
            </p>
            <dl className="nums mt-8 border-t border-line">
              {distances.map((d) => (
                <div key={d.town} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-line py-4">
                  <dt>
                    <span className="font-bold text-body">{d.town}</span>
                    {d.route && <span className="text-muted">, {d.route}</span>}
                  </dt>
                  <dd className="font-semibold text-ink">about {d.miles} miles</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="first-visit-title" className="tone-forest relative">
        <div className="wrap grid items-center gap-10 py-20 md:grid-cols-12 md:gap-x-8 md:py-28 lg:gap-x-12">
          <div className="md:col-span-5">
            <SectionHeading id="first-visit-title" subtitle="for your child">
              Before the first visit
            </SectionHeading>
            <p className="mt-6">
              New places can be hard. We made a printable picture story of the sign, the cabin, and the rooms, so your child
              can see where they&apos;re going before you come.
            </p>
            <Link href="/resources/your-first-visit" className="btn btn-ghost mt-7">
              See the picture story
            </Link>
          </div>
          <div className="md:col-span-7">
            <div className="aspect-[1.5] overflow-hidden">
              <Photo image="sign" sizes="(min-width: 48rem) 55vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="visit-faq-title" className="py-20 md:py-28">
        <div className="wrap grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-4">
            <SectionHeading id="visit-faq-title" subtitle="questions">
              About visiting
            </SectionHeading>
          </div>
          <div className="md:col-span-8 lg:col-span-7 lg:col-start-6">
            <FaqList items={pickFaqs(["where", "first-visit", "get-started"])} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
