/* eslint-disable @next/next/no-img-element -- static SVG logo */
import Link from "next/link";
import { footerNav, legalNav, site } from "@/config/site";
import { articles } from "@/content/articles";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-cafe pb-28 pt-16 text-beige md:pb-12 md:pt-20">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-4 lg:col-span-3">
          <Link href="/" aria-label={`${site.name} home`} className="inline-block">
            <img src="/brand/logo-cream.svg" alt="" width={830} height={850} className="h-auto w-36 md:w-40" />
          </Link>
          <p className="mt-6 max-w-[22rem] text-beige/85">ABA therapy for young children in New Albany, Mississippi.</p>
        </div>

        <div className="md:col-span-4 lg:col-span-3">
          <h2 className="eyebrow text-sand">Visit</h2>
          <address className="nums mt-4 not-italic leading-relaxed">
            {site.name}
            <br />
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
            <br />
            <a href={site.phone.href} className="link mt-2 inline-block" data-track="call">
              {site.phone.display}
            </a>
          </address>
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-beige/85 underline underline-offset-4 hover:text-beige"
            data-track="directions"
          >
            Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
          </a>
        </div>

        <nav aria-label="Footer" className="md:col-span-4 lg:col-span-2">
          <h2 className="eyebrow text-sand">Pages</h2>
          <ul className="mt-4 grid gap-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Guides for families" className="md:col-span-8 lg:col-span-4">
          <h2 className="eyebrow text-sand">Guides for families</h2>
          <ul className="mt-4 grid gap-2">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/resources/${a.slug}`} className="hover:underline">
                  {a.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="wrap mt-14">
        <div className="flex flex-col gap-4 border-t border-beige/20 pt-6 text-[0.875rem] text-beige/75 lg:flex-row lg:items-center lg:justify-between">
          <p>
            Clinical services led by {site.owner.name}, {site.owner.credentials}.
          </p>
          <ul className="flex gap-5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline underline-offset-4 hover:text-beige">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="nums">
            © 2026 {site.legalName}.{site.preview ? " Preview build, not yet published." : ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
