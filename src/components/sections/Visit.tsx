import Link from "next/link";
import { site } from "@/config/site";
import { FieldNote } from "@/components/brand";
import { Photo } from "@/components/Photo";

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="relative">
      <div className="relative">
        <div className="aspect-[1.1] w-full overflow-hidden md:aspect-[1.65] 2xl:aspect-auto 2xl:h-[56rem]">
          <Photo image="cabin" sizes="100vw" />
        </div>
      </div>

      <div className="wrap relative">
        <div className="grid gap-10 bg-beige pb-4 pt-10 md:-mt-40 md:max-w-[46rem] md:grid-cols-2 md:gap-8 md:p-12 lg:-mt-56">
          <div>
            <p className="subtitle text-forest">come on in</p>
            <h2 id="visit-title" className="display display-l mt-4 text-forest">
              Find the cabin
            </h2>
            <p className="mt-5">
              We&apos;re in a log cabin with a big front porch on Doctors Drive in New Albany. Look for the stone sign out
              front.
            </p>
            <FieldNote className="mt-6 hidden rotate-[-3deg] text-forest md:block">look for the stone sign</FieldNote>
          </div>
          <div className="md:border-l md:border-cafe/15 md:pl-8">
            <address className="nums not-italic leading-relaxed">
              <span className="block font-bold text-cafe">{site.name}</span>
              <span className="block">{site.address.street}</span>
              <span className="block">
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </span>
              <a href={site.phone.href} className="link mt-3 inline-block" data-track="call">
                {site.phone.display}
              </a>
            </address>
            {site.hours && (
              <dl className="nums mt-5 text-[0.9375rem]">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
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
              className="btn btn-primary mt-7 w-full md:w-auto"
              data-track="directions"
            >
              Get directions
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
            <p className="mt-4">
              <Link href="/visit" className="link">
                Visiting and driving in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
