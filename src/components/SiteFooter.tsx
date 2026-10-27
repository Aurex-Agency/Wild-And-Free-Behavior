/* eslint-disable @next/next/no-img-element -- static SVG logo */
import { nav, site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-cafe pb-28 pt-16 text-beige md:pb-12 md:pt-20">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-4">
          <img src="/brand/logo-cream.svg" alt={site.name} width={830} height={850} className="h-auto w-36 md:w-40" />
          <p className="mt-6 max-w-[22rem] text-beige/85">ABA therapy for young children in New Albany, Mississippi.</p>
        </div>

        <div className="md:col-span-3 md:col-start-6">
          <h2 className="eyebrow text-sand">Visit</h2>
          <address className="nums mt-4 not-italic leading-relaxed">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
            <br />
            <a href={site.phone.href} className="link mt-2 inline-block">
              {site.phone.display}
            </a>
          </address>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="eyebrow text-sand">On this page</h2>
          <ul className="mt-4 grid gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#faq" className="hover:underline">
                Questions
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="wrap mt-14">
        <div className="flex flex-col gap-3 border-t border-beige/20 pt-6 text-[0.875rem] text-beige/75 md:flex-row md:justify-between">
          <p>
            Clinical services led by {site.owner.name}, {site.owner.credentials}.
          </p>
          <p className="nums">© 2026 {site.legalName}. Design preview, not yet published.</p>
        </div>
      </div>
    </footer>
  );
}
