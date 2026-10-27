// Every business fact the site displays lives here, so the header, footer, copy,
// and structured data never drift apart. Anything marked `verified: false` still
// needs client confirmation before launch (see REVIEW-NOTES.md).

export const site = {
  name: "Wild & Free Behavior",
  legalName: "Wild & Free Behavior, LLC",
  // Placeholder until the production domain is pointed at this site.
  url: "https://www.wildandfreebehavior.com",
  // Proof builds stay out of search. Flip to true only at launch.
  indexable: false,

  address: {
    street: "403 Doctors Drive",
    city: "New Albany",
    region: "MS",
    regionName: "Mississippi",
    postalCode: "38652",
    county: "Union County",
    // Source: NPPES NPI 1760190078 and the stone sign out front.
    verified: true,
  },

  phone: {
    display: "662-539-7129",
    href: "tel:+16625397129",
    // Source: NPPES (last updated 2022). Confirm it is the line families should call.
    verified: false,
  },

  // Google Maps search for the street address. No embed, no tracking.
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=403+Doctors+Drive+New+Albany+MS+38652",

  // Unknown until the client confirms. Components render nothing while this is null.
  hours: null as null | ReadonlyArray<{ days: string; time: string }>,

  owner: {
    name: "Anna Claire Waldrop",
    credentials: "M.S., BCBA, LBA",
    role: "Owner and Board Certified Behavior Analyst",
    // NPPES lists M.S., BCBA, LBA. Re-verify on the BACB registry and the MS Autism Board.
    verified: false,
  },

  // Named in the meeting notes. Last name, role, and credentials are unknown.
  partner: { name: "Jimbo", role: null as string | null },

  insurance: {
    primary: "Blue Cross & Blue Shield of Mississippi",
    primaryShort: "BCBS of Mississippi",
  },

  // Keep to what the page states. Add nearby towns once the client confirms where families come from.
  areaServed: ["New Albany", "Union County"],

  resources: {
    dmhAutismGuide: "https://www.dmh.ms.gov/wp-content/uploads/2026/04/Autism-Resource-Guide.pdf",
  },
} as const;

export const nav = [
  { label: "ABA Therapy", href: "#approach" },
  { label: "Getting Started", href: "#getting-started" },
  { label: "Insurance", href: "#insurance" },
  { label: "About", href: "#people" },
  { label: "Visit", href: "#visit" },
] as const;
