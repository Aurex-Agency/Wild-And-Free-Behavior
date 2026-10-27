/* eslint-disable @next/next/no-img-element -- static SVG wordmark */
import Link from "next/link";
import { site } from "@/config/site";
import { HeaderShell } from "./motion/HeaderShell";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ScreenerTrigger } from "./screener/ScreenerTrigger";

export function SiteHeader() {
  return (
    <HeaderShell>
      <div className="wrap flex h-[4.75rem] items-center justify-between gap-6 lg:h-[5.75rem]">
        <Link href="/" className="-ml-1 flex shrink-0 items-center p-1" aria-label={`${site.name} home`}>
          <img src="/brand/wordmark-cream.svg" alt="" width={805} height={380} className="h-11 w-auto lg:h-[3.4rem]" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks variant="desktop" />
        </nav>

        <div className="flex items-center gap-1 lg:gap-6">
          <a href={site.phone.href} className="nav-link nums hidden font-semibold text-ink xl:inline" data-track="call">
            {site.phone.display}
          </a>
          <a href={site.phone.href} className="btn btn-text min-h-11 lg:hidden" data-track="call">
            Call
          </a>
          <div className="hidden lg:block">
            <ScreenerTrigger className="btn btn-primary min-h-12 px-6">Get started</ScreenerTrigger>
          </div>
          <MobileMenu />
        </div>
      </div>
    </HeaderShell>
  );
}
