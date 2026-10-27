import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// Previews and staging stay out of search. Production sets SITE_INDEXABLE=true at launch.
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
