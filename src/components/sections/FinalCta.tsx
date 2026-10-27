import { site } from "@/config/site";
import { DrawnSun } from "@/components/motion/DrawnSun";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";

/** Closing sunrise: the logo's rays draw out across the section as it comes into view. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="tone-deep relative isolate overflow-hidden pb-24 pt-20 text-center md:pb-36 md:pt-28">
      <div aria-hidden="true" className="sun-glow absolute left-1/2 top-[8%] -z-10 h-[70%] w-[110%] -translate-x-1/2" />
      <DrawnSun className="mx-auto w-[min(92vw,58rem)] text-sand" weight={1.25} />
      <div className="wrap mt-2 md:mt-4">
        <Words id="cta-title" text="Start with a conversation" className="display display-xl mx-auto max-w-[13ch]" />
        <Reveal delay={0.2}>
          <p className="lede mx-auto mt-7 max-w-[34rem]">
            Tell us a little about your child, or give us a call. The first conversation is free.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ScreenerTrigger className="btn btn-primary w-full sm:w-auto">Find your next step</ScreenerTrigger>
            <a href={site.phone.href} data-track="call" className="btn btn-ghost nums w-full sm:w-auto">
              Call {site.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
