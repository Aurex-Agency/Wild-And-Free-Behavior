import { site } from "@/config/site";

// Structured data mirrors what the pages visibly say. No ratings, reviews, prices, or hours
// until they are real and shown.

export const ids = {
  clinic: `${site.url}/#clinic`,
  owner: `${site.url}/about#anna-claire-waldrop`,
  website: `${site.url}/#website`,
};

export function clinicNode() {
  return {
    "@type": "MedicalClinic",
    "@id": ids.clinic,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/brand/logo-forest.svg`,
    image: `${site.url}/opengraph-image.jpg`,
    telephone: site.phone.e164,
    description: "ABA therapy for young children in New Albany, Mississippi.",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.geo.latitude, longitude: site.address.geo.longitude },
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name: `${name}, Mississippi` })),
    founder: { "@id": ids.owner },
  };
}

export function websiteNode() {
  return { "@type": "WebSite", "@id": ids.website, url: site.url, name: site.name, publisher: { "@id": ids.clinic } };
}

export function ownerNode() {
  return {
    "@type": "Person",
    "@id": ids.owner,
    name: site.owner.name,
    jobTitle: site.owner.role,
    worksFor: { "@id": ids.clinic },
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", name: "Board Certified Behavior Analyst (BCBA)" },
      { "@type": "EducationalOccupationalCredential", name: "Mississippi Licensed Behavior Analyst (LBA)" },
    ],
  };
}

export function breadcrumbNode(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
