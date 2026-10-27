import Link from "next/link";
import type { CSSProperties } from "react";
import { site } from "@/config/site";
import { ArchRays, raysHeadroom } from "@/components/brand";
import { Photo } from "@/components/Photo";
import { Parallax } from "@/components/motion/Parallax";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";

const REACH = { desktop: 0.24, mobile: 0.12 };
const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

const facts = [
  { label: "Led by", value: "A Board Certified Behavior Analyst" },
  { label: "First step", value: "A free conversation" },
  { label: "Insurance", value: site.insurance.primaryShort },
  { label: "Find us", value: site.address.street },
];

/**
 * Golden hour at the cabin: dark forest ground, the logo's arch as a window onto the
 * garden, sun rays drawing out behind it, and the headline set like the logo itself
 * (handwritten script over spaced capitals). Entrance runs in CSS so it starts before
 * hydration and never delays the content.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="tone-deep relative isolate overflow-clip pt-[4.75rem] lg:pt-[5.75rem]">
      <div aria-hidden="true" className="sun-glow pointer-events-none absolute -right-[18%] -top-[12%] h-[110svh] w-[95vw] md:-right-[6%] md:w-[62vw]" />

      <div className="wrap relative grid min-h-[calc(100svh-4.75rem)] content-end gap-y-5 pb-10 pt-2 md:grid-cols-12 md:gap-y-8 md:pt-6 md:items-end md:gap-x-8 md:pb-16 lg:min-h-[calc(100svh-5.75rem-5.5rem)]">
        <div className="relative w-full md:order-2 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8 lg:mx-auto lg:max-w-[29rem] 2xl:max-w-[35rem]">
          <div className="hidden md:block" style={{ paddingTop: `${raysHeadroom(REACH.desktop) * 100}%` }} />
          <div className="md:hidden" style={{ paddingTop: `${raysHeadroom(REACH.mobile) * 100}%` }} />
          <div className="relative">
            <ArchRays reach={REACH.desktop} animate weight={1.5} className="hidden text-sand md:block" />
            <ArchRays reach={REACH.mobile} animate weight={1.25} className="text-sand md:hidden" />
            <div className="arch-frame relative aspect-[1.4] md:aspect-[0.8]" data-mobile-clip>
              <Parallax range={14}>
                <Photo
                  image="heroGarden"
                  mobileImage="heroGardenMobile"
                  priority
                  sizes="(min-width: 96rem) 35rem, (min-width: 64rem) 29rem, 48vw"
                  mobileSizes="calc(100vw - 2.5rem)"
                  imgClassName="settle"
                />
              </Parallax>
            </div>
          </div>
          <p aria-hidden="true" className="note fade-in absolute -bottom-10 right-2 hidden rotate-[-4deg] md:block" style={d(1300)}>
            out in the garden
          </p>
        </div>

        <div className="relative z-10 md:order-1 md:col-span-6 lg:col-span-7">
          <p className="eyebrow nums fade-in hidden text-accent md:block" style={d(100)}>
            ABA therapy · New Albany, Mississippi
          </p>
          <h1 id="hero-title" className="md:mt-7">
            <span className="note fade-in block pl-[0.12em] text-[clamp(2.4rem,1.5rem+3.2vw,4.8rem)]" style={d(150)}>
              room to
            </span>
            <span className="rise -mt-[0.12em]">
              <span className="display text-[clamp(5.2rem,0.6rem+13.5vw,13.5rem)] leading-[0.8]" style={d(280)}>
                Grow
              </span>
            </span>
            <span
              className="fade-in mt-3 block max-w-[24ch] text-[1.2rem] font-semibold leading-snug text-ink md:mt-7 md:text-[1.6rem]"
              style={d(650)}
            >
              ABA therapy for young children in New Albany, Mississippi
            </span>
          </h1>
          <p className="fade-in mt-3 max-w-[34rem] text-[1rem] text-body md:mt-5 md:text-[1.125rem]" style={d(800)}>
            A small practice in a log cabin on Doctors Drive, led by a Board Certified Behavior Analyst. It starts with a
            free conversation with Anna Claire and Jimbo.
          </p>
          <div id="hero-actions" className="fade-in mt-5 flex flex-wrap items-center gap-3 md:mt-9" style={d(950)}>
            <ScreenerTrigger className="btn btn-primary">Find your next step</ScreenerTrigger>
            <Link href="/about" className="btn btn-ghost">
              Meet the team
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-line">
        <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`fade-in border-line py-5 md:py-6 ${i % 2 === 1 ? "border-l pl-5" : "pr-5"} ${i > 1 ? "border-t lg:border-t-0" : ""} ${
                i > 0 ? "lg:border-l lg:pl-8" : ""
              }`}
              style={d(1100 + i * 90)}
            >
              <dt className="eyebrow text-accent">{f.label}</dt>
              <dd className="mt-1.5 font-semibold leading-snug text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
