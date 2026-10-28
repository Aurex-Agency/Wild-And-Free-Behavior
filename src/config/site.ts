// Every business fact the site displays lives here, so the header, footer, copy,
// and structured data never drift apart. Anything still marked `verified: false`
// needs client confirmation (see REVIEW-NOTES.md).

// Search engines only index the production deployment, and only when this is set at launch.
const indexable = process.env.SITE_INDEXABLE === "true";

export const site = {
  name: "Wild & Free Behavior",
  legalName: "Wild & Free Behavior, LLC",
  url: "https://www.wildandfreebehavior.com",
  indexable,
  // Preview builds say so in the footer.
  preview: !indexable,

  address: {
    street: "403 Doctors Drive",
    city: "New Albany",
    region: "MS",
    regionName: "Mississippi",
    postalCode: "38652",
    county: "Union County",
    // NPPES NPI 1760190078 and the stone sign out front. Single location (confirmed: no Horn Lake office).
    verified: true,
    // OpenStreetMap Nominatim, house-level match for 403 Doctors Drive (2026-10-27).
    geo: { latitude: 34.4966, longitude: -89.028 },
  },

  phone: {
    display: "662-539-7129",
    href: "tel:+16625397129",
    e164: "+1-662-539-7129",
    verified: true,
  },

  // Google Maps search for the street address. No embed, no tracking.
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=403+Doctors+Drive+New+Albany+MS+38652",

  // Unknown until the client confirms. Components render nothing while this is null.
  hours: null as null | ReadonlyArray<{ days: string; time: string }>,

  owner: {
    name: "Anna Claire Waldrop",
    firstName: "Anna Claire",
    credentials: "M.S., BCBA, LBA",
    role: "Owner and Board Certified Behavior Analyst",
    // Dates from the practice's earlier website. Credentials match NPPES.
    bcbaSince: "December 2020",
    lbaSince: "March 2021",
    verified: false,
  },

  // Anna Claire's husband. He sits in on every first conversation; no job title has been given.
  partner: { name: "Jimbo Waldrop", firstName: "Jimbo" },

  insurance: {
    primary: "Blue Cross & Blue Shield of Mississippi",
    primaryShort: "BCBS of Mississippi",
  },

  // Matches what the Visit page states.
  areaServed: ["New Albany", "Union County", "Tupelo", "Pontotoc", "Ripley", "Oxford"],

  resources: {
    dmhAutismGuide: "https://www.dmh.ms.gov/wp-content/uploads/2026/04/Autism-Resource-Guide.pdf",
    bacbRegistry: "https://www.bacb.com/find-a-certificant/",
    msAutismBoardLookup: "https://www.msautismboard.ms.gov/secure/licenseverification.asp",
  },
} as const;

export const nav = [
  { label: "ABA Therapy", href: "/aba-therapy" },
  { label: "About", href: "/about" },
  { label: "Getting Started", href: "/getting-started" },
  { label: "Visit", href: "/visit" },
  { label: "Questions", href: "/faq" },
] as const;

export const footerNav = [
  ...nav,
  { label: "Insurance and cost", href: "/insurance" },
  { label: "Resources", href: "/resources" },
] as const;

export const legalNav = [
  { label: "Privacy", href: "/privacy" },
  { label: "Accessibility", href: "/accessibility" },
] as const;
