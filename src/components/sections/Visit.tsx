import Link from "next/link";
import { site } from "@/config/site";
import { Photo } from "@/components/Photo";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";

/** Full-bleed cabin with a slow parallax, and the address card riding over its lower edge. */
export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="tone-deep relative">
      <div className="relative h-[70svh] min-h-[26rem] overflow-clip md:h-[92svh]">
        <Parallax range={18}>
          <Photo image="cabin" sizes="100vw" />
        </Parallax>
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-forest-deep via-forest-deep/10 to-transparent" />
      </div>

      <div className="wrap relative -mt-40 pb-24 md:-mt-64 md:pb-36">
        <Reveal className="grid gap-10 rounded-[1.75rem] bg-forest-night p-7 ring-1 ring-line md:max-w-[52rem] md:grid-cols-2 md:gap-10 md:p-12">
          <div>
            <p className="subtitle">come on in</p>
            <h2 id="visit-title" className="display display-l mt-3">
              Find the cabin
            </h2>
            <p className="mt-6">
              We&apos;re in a log cabin with a big front porch on Doctors Drive in New Albany. Look for the stone sign out
              front.
            </p>
          </div>
          <div className="md:border-l md:border-line md:pl-10">
            <address className="nums not-italic leading-relaxed text-ink">
              <span className="block font-bold">{site.name}</span>
              <span className="block">{site.address.street}</span>
              <span className="block">
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
            </address>
            <a href={site.phone.href} className="display nums mt-4 inline-block text-[2rem] text-ink hover:text-accent" data-track="call">
              {site.phone.display}
            </a>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                data-track="directions"
              >
                Get directions
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
              <Link href="/visit" className="btn btn-ghost">
                Visiting
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
