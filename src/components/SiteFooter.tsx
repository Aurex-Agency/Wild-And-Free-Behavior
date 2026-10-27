/* eslint-disable @next/next/no-img-element -- static SVG logo */
import Link from "next/link";
import { footerNav, legalNav, site } from "@/config/site";
import { articles } from "@/content/articles";

export function SiteFooter() {
  return (
    <footer className="tone-cafe relative overflow-hidden pb-28 pt-20 md:pb-10 md:pt-28">
      <div className="wrap grid gap-14 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-4 lg:col-span-4">
          <Link href="/" aria-label={`${site.name} home`} className="inline-block">
            <img src="/brand/logo-cream.svg" alt="" width={830} height={850} loading="lazy" decoding="async" className="h-auto w-40 md:w-48" />
          </Link>
          <p className="mt-7 max-w-[22rem] text-body">ABA therapy for young children, from a log cabin on Doctors Drive in New Albany, Mississippi.</p>
        </div>

        <div className="md:col-span-4 lg:col-span-3">
          <h2 className="eyebrow text-accent">Visit</h2>
          <address className="nums mt-5 not-italic leading-relaxed text-ink">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
          </address>
          <a href={site.phone.href} className="display nums mt-5 inline-block text-[2rem] text-ink hover:text-accent" data-track="call">
            {site.phone.display}
          </a>
          <p className="mt-4">
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="link" data-track="directions">
              Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-4 lg:col-span-2">
          <h2 className="eyebrow text-accent">Pages</h2>
          <ul className="mt-5 grid gap-2.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link text-ink/85 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Guides for families" className="md:col-span-8 lg:col-span-3">
          <h2 className="eyebrow text-accent">Guides for families</h2>
          <ul className="mt-5 grid gap-2.5">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/resources/${a.slug}`} className="nav-link text-ink/85 hover:text-ink">
                  {a.short}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* A watermark, drawn from CSS so it isn't read as low-contrast page text. */}
      <div
        aria-hidden="true"
        data-text="Room to grow"
        className="signoff display pointer-events-none mt-20 select-none whitespace-nowrap text-center text-[15vw] leading-[0.8] text-ink/[0.06] md:mt-24"
      />

      <div className="wrap mt-8 md:mt-10">
        <div className="flex flex-col gap-4 border-t border-line pt-6 text-[0.875rem] text-muted lg:flex-row lg:items-center lg:justify-between">
          <p>
            Clinical services led by {site.owner.name}, {site.owner.credentials}.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link hover:text-ink">
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
