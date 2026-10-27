/* eslint-disable @next/next/no-img-element -- static SVG wordmark */
import Link from "next/link";
import { site } from "@/config/site";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ScreenerTrigger } from "./screener/ScreenerTrigger";

export function SiteHeader() {
  return (
    <header className="relative z-30">
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6 lg:h-24">
        <Link href="/" className="-ml-1 flex shrink-0 items-center p-1" aria-label={`${site.name} home`}>
          <img src="/brand/wordmark.svg" alt="" width={805} height={380} className="h-11 w-auto lg:h-14" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks variant="desktop" />
        </nav>

        <div className="flex items-center gap-1 lg:gap-5">
          <a href={site.phone.href} className="nums hidden font-semibold text-forest hover:underline xl:inline" data-track="call">
            {site.phone.display}
          </a>
          <a href={site.phone.href} className="btn min-h-11 px-3 text-forest lg:hidden" data-track="call">
            Call
          </a>
          <div className="hidden lg:block">
            <ScreenerTrigger className="btn btn-primary min-h-12 px-5">Get started</ScreenerTrigger>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
