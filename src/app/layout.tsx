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
import { clinicNode, graph, websiteNode } from "@/lib/schema";
import "./globals.css";

const description =
  "ABA therapy for young children in a log cabin on Doctors Drive in New Albany, Mississippi. Start with a free conversation, and we'll help you check your insurance or private-pay options.";

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
  themeColor: "#f9f8f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rovey.variable} ${roveyCompanion.variable} ${angelica.variable} ${raleway.variable}`}
    >
      <body className="min-h-dvh">
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
        <TrackClicks />
        <JsonLd data={graph(clinicNode(), websiteNode())} />
      </body>
    </html>
  );
}
