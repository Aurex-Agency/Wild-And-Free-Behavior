import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import { angelica, raleway, rovey } from "./fonts";
import { ArchClipPaths } from "@/components/brand";
import "./globals.css";

const title = "ABA Therapy in New Albany, MS | Wild & Free Behavior";
const description =
  "ABA therapy for young children in a log cabin on Doctors Drive in New Albany, Mississippi. Start with a free conversation, and we'll help you check your insurance or private-pay options.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f9f8f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${rovey.variable} ${angelica.variable} ${raleway.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 bg-forest px-4 py-3 font-semibold text-beige focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <ArchClipPaths />
        {children}
      </body>
    </html>
  );
}
