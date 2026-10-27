import { site } from "@/config/site";

// Only facts that are visible on the page. No ratings, reviews, prices, or hours until confirmed.
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": `${site.url}/#clinic`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/brand/logo-forest.svg`,
        image: `${site.url}/opengraph-image.jpg`,
        telephone: `+1-${site.phone.display}`,
        description: "ABA therapy for young children in New Albany, Mississippi.",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: "US",
        },
        areaServed: site.areaServed.map((name) => ({ "@type": "Place", name: `${name}, Mississippi` })),
        founder: { "@id": `${site.url}/#owner` },
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#owner`,
        name: site.owner.name,
        jobTitle: site.owner.role,
        worksFor: { "@id": `${site.url}/#clinic` },
        hasCredential: [
          { "@type": "EducationalOccupationalCredential", name: "Board Certified Behavior Analyst (BCBA)" },
          { "@type": "EducationalOccupationalCredential", name: "Mississippi Licensed Behavior Analyst (LBA)" },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Static, trusted data from site config. Escape "<" so the JSON can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
