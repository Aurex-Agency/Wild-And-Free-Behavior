import { site } from "@/config/site";
import Link from "next/link";
import { LogRules } from "@/components/brand";
import { Photo } from "@/components/Photo";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";

// Portraits are not captioned with names: the client has not yet identified who is who.

export function People() {
  return (
    <section id="people" aria-labelledby="people-title" className="relative bg-beige-deep py-20 md:py-28">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
          <div className="md:col-span-6 lg:col-span-5">
            <p className="subtitle text-forest">our team</p>
            <h2 id="people-title" className="display display-l mt-4 text-forest">
              The people on the porch
            </h2>
          </div>
          <div className="md:col-span-6 lg:col-span-6 lg:col-start-7 md:pt-10">
            <p className="lede">
              Wild &amp; Free Behavior is owned and led by {site.owner.name}, {site.owner.credentials}, a Board Certified
              Behavior Analyst and Mississippi Licensed Behavior Analyst.
            </p>
            <p className="mt-5">
              Your first conversation is with Anna Claire and Jimbo, so you meet the people behind the practice before
              anything else happens. Bring your questions, and bring your child&apos;s story.
            </p>
            <div className="mt-7">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <ScreenerTrigger className="btn btn-outline">Start with a conversation</ScreenerTrigger>
                <Link href="/about" className="link">
                  About our team
                </Link>
              </div>
            </div>
          </div>
        </div>

        <figure className="relative mt-14 md:mt-20">
          <LogRules className="absolute -top-8 left-0 hidden h-16 w-1/3 text-cafe/15 md:block" lines={[0, 22, 41, 68, 100]} />
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-12 md:items-end">
            <div className="col-span-2 aspect-[0.8] overflow-hidden sm:col-span-1 md:col-span-4 md:col-start-1">
              <Photo image="portraitA" sizes="(min-width: 48rem) 30vw, (min-width: 40rem) 50vw, 100vw" />
            </div>
            <div className="aspect-[0.8] overflow-hidden md:col-span-3 md:mb-16">
              <Photo image="portraitB" sizes="(min-width: 48rem) 24vw, 50vw" />
            </div>
            <div className="aspect-[0.8] overflow-hidden md:col-span-4 md:col-start-9">
              <Photo image="portraitC" sizes="(min-width: 48rem) 30vw, 50vw" />
            </div>
          </div>
          <figcaption className="mt-4 text-[0.9375rem] text-cafe-soft">Our team on the cabin porch.</figcaption>
        </figure>
      </div>
    </section>
  );
}
