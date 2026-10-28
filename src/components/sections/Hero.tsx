import Link from "next/link";
import type { CSSProperties } from "react";
import { ArchRays, SunMark, raysHeadroom } from "@/components/brand";
import { Photo } from "@/components/Photo";
import { Parallax } from "@/components/motion/Parallax";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";

const REACH = { desktop: 0.2, mobile: 0.12 };
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

const facts = ["Led by a BCBA", "Free first conversation", "403 Doctors Drive"];

/**
 * Golden hour at the cabin. The logo's arch is a window onto a day at the practice: the
 * garden, then Anna Claire on the porch, then the play room, crossfading slowly (desktop
 * only, see .hero-cycle). The cabin itself sits in front of the arch. The headline
 * is set like the logo (script over spaced capitals). The entrance runs in CSS so it starts
 * before hydration and never delays the content.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="tone-deep relative isolate overflow-clip pt-[4.75rem] lg:pt-[5.75rem]">
      <div aria-hidden="true" className="sun-glow pointer-events-none absolute -right-[18%] -top-[10%] h-[100svh] w-[95vw] md:-right-[4%] md:w-[66vw]" />

      <div className="wrap relative grid gap-y-5 pb-12 pt-2 md:grid-cols-12 md:items-center md:gap-x-10 md:pb-16 md:pt-8 lg:gap-x-12 lg:pb-20 lg:pt-6">
        <div className="relative md:order-2 md:col-span-6">
          <div className="relative w-full md:ml-auto md:max-w-[25rem] lg:mr-[4%] lg:max-w-[28rem] 2xl:max-w-[32rem]">
            <div className="hidden md:block" style={{ paddingTop: `${raysHeadroom(REACH.desktop) * 100}%` }} />
            <div className="md:hidden" style={{ paddingTop: `${raysHeadroom(REACH.mobile) * 100}%` }} />
            <div className="relative">
              <ArchRays reach={REACH.desktop} animate weight={1.5} className="hidden text-sand md:block" />
              <ArchRays reach={REACH.mobile} animate weight={1.25} className="text-sand md:hidden" />
              <div className="arch-frame relative aspect-[1.4] md:aspect-[0.8]" data-mobile-clip>
                <Parallax range={12}>
                  <Photo
                    image="heroGarden"
                    mobileImage="heroGardenMobile"
                    priority
                    sizes="(min-width: 96rem) 32rem, (min-width: 64rem) 28rem, 25rem"
                    mobileSizes="calc(100vw - 2.5rem)"
                    imgClassName="settle"
                  />
                  <div aria-hidden="true" className="hero-cycle hidden md:block">
                    <Photo image="heroPorch" alt="" sizes="(min-width: 96rem) 32rem, 28rem" className="absolute inset-0" />
                    <Photo image="playroom" alt="" sizes="(min-width: 96rem) 32rem, 28rem" className="absolute inset-0" />
                  </div>
                </Parallax>
              </div>

              {/* Only where the gap beside the text column is wide enough for it to overlap nothing. */}
              <figure className="fade-in absolute -left-[36%] bottom-[7%] hidden w-[56%] min-[85rem]:block" style={d(1000)}>
                <div className="aspect-[1.55] overflow-clip rounded-[1.1rem] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] ring-[6px] ring-forest-deep">
                  <Photo image="cabin" sizes="16rem" />
                </div>
                <figcaption className="note absolute right-[42%] top-full mt-2 whitespace-nowrap text-[1.6rem] leading-none">our cabin</figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="relative z-10 md:order-1 md:col-span-6">
          <p className="eyebrow nums fade-in hidden text-accent md:block" style={d(100)}>
            ABA therapy · New Albany, Mississippi
          </p>
          <h1 id="hero-title" className="md:mt-6">
            <span className="note fade-in block pl-[0.12em] text-[clamp(2.4rem,1.5rem+3.2vw,4.6rem)]" style={d(150)}>
              room to
            </span>
            <span className="rise -mt-[0.12em]">
              <span className="display text-[clamp(5.2rem,0.6rem+13vw,12.5rem)] leading-[0.8]" style={d(280)}>
                Grow
              </span>
            </span>
            <span
              className="fade-in mt-3 block max-w-[24ch] text-[1.2rem] font-semibold leading-snug text-ink md:mt-6 md:text-[1.6rem]"
              style={d(650)}
            >
              ABA therapy for young children in New Albany, Mississippi
            </span>
          </h1>
          <p className="fade-in mt-3 max-w-[34rem] text-[1rem] text-body md:mt-5 md:text-[1.125rem]" style={d(800)}>
            Anna Claire and Jimbo Waldrop run a small practice out of a log cabin on Doctors Drive, in the town where
            they grew up.
            {/* Phones keep the button in the first screen; the facts row repeats this below it. */}
            <span className="hidden sm:inline"> Anna Claire is a Board Certified Behavior Analyst. Your first conversation with them is free.</span>
          </p>
          <div id="hero-actions" className="fade-in mt-5 flex flex-wrap items-center gap-3 md:mt-8" style={d(950)}>
            <ScreenerTrigger className="btn btn-primary">Find your next step</ScreenerTrigger>
            <Link href="/about#our-story" className="btn btn-ghost">
              Our story
            </Link>
          </div>
          <ul className="fade-in mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.95rem] font-semibold text-ink/85 md:mt-9" style={d(1100)}>
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <SunMark className="h-3.5 w-6 shrink-0 text-accent" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
