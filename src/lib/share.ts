import type { Metadata } from "next";
import { site } from "@/config/site";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

// Next merges metadata shallowly: a page that sets `openGraph` replaces the layout's whole
// object. Every page builds from this base so shared links keep the photo, site name, and locale.
const base = {
  type: "website",
  siteName: site.name,
  locale: "en_US",
  images: [
    {
      url: "/opengraph-image.jpg",
      width: 1200,
      height: 630,
      alt: "The Wild & Free Behavior sign at 403 Doctors Drive in New Albany, Mississippi",
    },
  ],
} satisfies OpenGraph;

export function openGraph(page: OpenGraph = {}): OpenGraph {
  return { ...base, ...page } as OpenGraph;
}
