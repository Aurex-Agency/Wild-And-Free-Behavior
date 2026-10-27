import Link from "next/link";
import { site } from "@/config/site";
import { ArchRays, FieldNote, raysHeadroom } from "@/components/brand";
import { Photo } from "@/components/Photo";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";

const REACH = { desktop: 0.3, mobile: 0.13 };

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-x-clip pb-14 pt-4 md:pb-24 lg:pt-6">
      <div className="wrap grid items-end gap-y-7 md:grid-cols-12 md:gap-x-8 lg:gap-x-12">
        {/* Photo: arch window with the logo's rays. Comes first on phones. */}
        <div className="relative w-full md:order-2 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8 lg:max-w-[27rem] lg:justify-self-end xl:mr-8">
          <div className="hidden md:block" style={{ paddingTop: `${raysHeadroom(REACH.desktop) * 100}%` }} />
          <div className="md:hidden" style={{ paddingTop: `${raysHeadroom(REACH.mobile) * 100}%` }} />
          <div className="relative">
            <ArchRays reach={REACH.desktop} animate weight={2.25} className="hidden text-forest md:block" />
            <ArchRays reach={REACH.mobile} animate weight={1.75} className="text-forest md:hidden" />
            <div
              className="arch-frame arch-reveal relative aspect-[1.4] md:aspect-[0.8]"
              data-mobile-clip
            >
              <Photo
                image="heroGarden"
                mobileImage="heroGardenMobile"
                priority
                sizes="(min-width: 80rem) 34rem, (min-width: 64rem) 40vw, 48vw"
                mobileSizes="calc(100vw - 2.5rem)"
              />
            </div>
          </div>
          <FieldNote className="absolute -bottom-12 right-0 hidden rotate-[-4deg] text-forest md:block">
            out in the garden
          </FieldNote>
        </div>

        <div className="md:order-1 md:col-span-6 md:pb-6 lg:col-span-7 lg:pb-12">
          <p className="eyebrow nums text-forest">ABA therapy · New Albany, Mississippi</p>
          <h1 id="hero-title" className="mt-4 md:mt-5">
            <span className="display display-xl block text-forest">Room to grow</span>
            <span className="mt-3 block max-w-[24ch] text-[1.2rem] font-semibold leading-tight text-cafe md:mt-4 md:max-w-[22ch] md:text-[1.6rem] lg:text-[1.85rem]">
              ABA therapy for young children in New Albany, Mississippi
            </span>
          </h1>
          <p className="mt-4 max-w-[36rem] text-cafe md:mt-5">
            We&apos;re a small practice in a log cabin on Doctors Drive, led by a Board Certified Behavior Analyst. It
            starts with a free conversation with Anna Claire and Jimbo.
          </p>
          <div id="hero-actions" className="mt-6 flex md:mt-7 flex-wrap items-center gap-x-6 gap-y-4">
            <ScreenerTrigger>Find your next step</ScreenerTrigger>
            <Link href="/about" className="link">
              Meet the team
            </Link>
          </div>
          <p className="nums mt-8 flex flex-wrap gap-x-5 gap-y-1 border-t border-cafe/15 pt-4 text-[0.9375rem] text-cafe-soft">
            <span>{site.address.street}, New Albany</span>
            <a href={site.phone.href} className="font-semibold text-forest hover:underline" data-track="call">
              {site.phone.display}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
