import { site } from "@/config/site";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Words } from "@/components/motion/Words";
import { ScreenerTrigger } from "@/components/screener/ScreenerTrigger";

// Portraits are not captioned with names: the client has not yet identified who is who.

export function People() {
  return (
    <section id="people" aria-labelledby="people-title" className="tone-forest relative overflow-clip py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <Reveal variant="fade">
              <p className="subtitle">our team</p>
            </Reveal>
            <Words id="people-title" text="The people on the porch" className="display display-xl mt-3 max-w-[12ch]" />
          </div>
          <Reveal className="md:col-span-5 md:self-end" delay={0.1}>
            <p className="lede">
              Wild &amp; Free Behavior is owned and led by {site.owner.name}, {site.owner.credentials}, a Board Certified
              Behavior Analyst and Mississippi Licensed Behavior Analyst.
            </p>
            <p className="mt-5">
              Your first conversation is with Anna Claire and Jimbo, so you meet the people behind the practice before
              anything else happens.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <ScreenerTrigger className="btn btn-primary">Start with a conversation</ScreenerTrigger>
              <Link href="/about" className="link">
                About our team
              </Link>
            </div>
          </Reveal>
        </div>

        <figure className="mt-16 md:mt-24">
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-12 md:items-start">
            <Reveal variant="clip" className="col-span-2 sm:col-span-1 md:col-span-4">
              <div className="aspect-[0.8] overflow-clip rounded-[1.5rem]">
                <Parallax range={10}>
                  <Photo image="portraitA" sizes="(min-width: 48rem) 30vw, (min-width: 40rem) 50vw, 100vw" />
                </Parallax>
              </div>
            </Reveal>
            <Reveal variant="clip" delay={0.12} className="md:col-span-4 md:mt-24">
              <div className="arch-portrait aspect-[0.8] overflow-clip">
                <Parallax range={14}>
                  <Photo image="portraitC" sizes="(min-width: 48rem) 30vw, 50vw" />
                </Parallax>
              </div>
            </Reveal>
            <Reveal variant="clip" delay={0.24} className="md:col-span-4 md:mt-10">
              <div className="aspect-[0.8] overflow-clip rounded-[1.5rem]">
                <Parallax range={10}>
                  <Photo image="portraitB" sizes="(min-width: 48rem) 30vw, 50vw" />
                </Parallax>
              </div>
            </Reveal>
          </div>
          <figcaption className="mt-5 text-[0.9375rem] text-muted">Our team on the cabin porch.</figcaption>
        </figure>
      </div>
    </section>
  );
}
