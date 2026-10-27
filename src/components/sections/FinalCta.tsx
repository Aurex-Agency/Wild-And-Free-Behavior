import { site } from "@/config/site";
import { SunMark } from "@/components/brand";
import { Photo } from "@/components/Photo";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative overflow-hidden bg-forest text-beige">
      <div className="aspect-[2.1] w-full overflow-hidden md:aspect-[3.2]">
        <Photo image="wallScript" sizes="100vw" />
      </div>
      <div className="wrap relative py-16 text-center md:py-24">
        <SunMark className="mx-auto h-10 w-16 text-sand md:h-12 md:w-20" />
        <h2 id="cta-title" className="display display-l mx-auto mt-2 max-w-[16ch]">
          Start with a conversation
        </h2>
        <p className="lede mx-auto mt-6 max-w-[34rem] text-beige/90">
          Tell us a little about your child, or give us a call. The first conversation is free.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <ScreenerTrigger className="btn btn-light w-full sm:w-auto">Find your next step</ScreenerTrigger>
          <a href={site.phone.href} className="btn nums w-full text-beige shadow-[inset_0_0_0_1.5px_var(--color-sand)] hover:bg-forest-deep sm:w-auto">
            Call {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
