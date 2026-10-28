import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import { angelica, raleway, rovey, roveyCompanion } from "./fonts";
import { ArchClipPaths } from "@/components/brand";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ActionBar } from "@/components/ActionBar";
import { ScreenerDialog } from "@/components/screener/ScreenerDialog";
import { TrackClicks } from "@/components/TrackClicks";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { clinicNode, graph, websiteNode } from "@/lib/schema";
import "./globals.css";

const description =
  "ABA therapy for young children with autism in New Albany, Mississippi, led by a BCBA in a log cabin on Doctors Drive. Your first conversation is free.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ABA Therapy in New Albany, MS | Wild & Free Behavior",
    template: "%s | Wild & Free Behavior",
  },
  description,
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#062b2b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rovey.variable} ${roveyCompanion.variable} ${angelica.variable} ${raleway.variable}`}
    >
      <body className="min-h-dvh">
        <noscript>
          {/* Scroll reveals start hidden; without JavaScript, show everything. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-sun] path{stroke-dashoffset:0!important;opacity:1!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only z-50 bg-forest px-4 py-3 font-semibold text-beige focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ArchClipPaths />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ActionBar />
        <ScreenerDialog />
        <SmoothScroll />
        <TrackClicks />
        <JsonLd data={graph(clinicNode(), websiteNode())} />
      </body>
    </html>
  );
}
