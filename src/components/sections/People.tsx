import { site } from "@/config/site";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";

// Only Anna Claire and Jimbo appear on the site; the client asked that other staff stay off it.
export function People() {
  return (
    <section id="people" aria-labelledby="people-title" className="tone-forest relative overflow-clip py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <Reveal variant="fade">
              <p className="subtitle">who you&apos;ll meet</p>
            </Reveal>
            <Words id="people-title" text="Anna Claire and Jimbo" className="display display-xl mt-3 max-w-[12ch]" />
          </div>
          <Reveal className="md:col-span-5 md:self-end" delay={0.1}>
            <p className="lede">
              They&apos;ve known each other since kindergarten in New Albany. Anna Claire is a Board Certified Behavior
              Analyst who writes every child&apos;s plan, and Jimbo spent five years teaching middle school science and
              using ABA in his own classroom.
            </p>
            <p className="mt-5">You&apos;ll meet both of them at your first conversation, before anything gets scheduled.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ScreenerTrigger className="btn btn-primary">Start with a conversation</ScreenerTrigger>
              <Link href="/about#our-story" className="link">
                Read their story
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-5 md:mt-24 md:grid-cols-12 md:items-start">
          <Reveal variant="clip" className="col-span-2 sm:col-span-1 md:col-span-4">
            <figure>
              <div className="aspect-[0.8] overflow-clip rounded-[1.5rem]">
                <Parallax range={10}>
                  <Photo image="portraitAnnaClaire" sizes="(min-width: 48rem) 30vw, (min-width: 40rem) 50vw, 100vw" />
                </Parallax>
              </div>
              <figcaption className="mt-3 text-[0.9375rem] text-muted">
                {site.owner.name}, {site.owner.credentials}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal variant="clip" delay={0.12} className="md:col-span-4 md:mt-24">
            <div className="arch-portrait aspect-[0.8] overflow-clip">
              <Parallax range={14}>
                <Photo image="porchChild" sizes="(min-width: 48rem) 30vw, 50vw" />
              </Parallax>
            </div>
          </Reveal>
          <Reveal variant="clip" delay={0.24} className="md:col-span-4 md:mt-10">
            <figure>
              <div className="aspect-[0.8] overflow-clip rounded-[1.5rem]">
                <Parallax range={10}>
                  <Photo image="portraitJimbo" sizes="(min-width: 48rem) 30vw, 50vw" />
                </Parallax>
              </div>
              <figcaption className="mt-3 text-[0.9375rem] text-muted">{site.partner.name}</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
