import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { articles } from "@/content/articles";

const pages: { path: string; priority: number; modified: string }[] = [
  { path: "/", priority: 1, modified: "2026-10-27" },
  { path: "/aba-therapy", priority: 0.9, modified: "2026-10-27" },
  { path: "/getting-started", priority: 0.9, modified: "2026-10-27" },
  { path: "/insurance", priority: 0.9, modified: "2026-10-27" },
  { path: "/about", priority: 0.7, modified: "2026-10-27" },
  { path: "/visit", priority: 0.8, modified: "2026-10-27" },
  { path: "/faq", priority: 0.7, modified: "2026-10-27" },
  { path: "/resources", priority: 0.6, modified: "2026-10-27" },
  { path: "/privacy", priority: 0.2, modified: "2026-10-27" },
  { path: "/accessibility", priority: 0.2, modified: "2026-10-27" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified: p.modified, priority: p.priority })),
    ...articles.map((a) => ({ url: `${site.url}/resources/${a.slug}`, lastModified: a.updated, priority: 0.6 })),
  ];
}
