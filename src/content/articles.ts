import type { ImageKey } from "@/components/Photo";

export type Source = { label: string; href: string };

export type ArticleMeta = {
  slug: string;
  title: string;
  /** Short label for lists and breadcrumbs. */
  short: string;
  subtitle: string;
  description: string;
  image: ImageKey;
  published: string;
  updated: string;
  /** Set once the BCBA has reviewed the article. Rendered as a byline only when present. */
  reviewedBy: string | null;
  sources: Source[];
};

const dmh: Source = {
  label: "Mississippi Department of Mental Health, Autism Resource Guide (April 2026, PDF)",
  href: "https://www.dmh.ms.gov/wp-content/uploads/2026/04/Autism-Resource-Guide.pdf",
};
const firstSteps: Source = {
  label: "Mississippi State Department of Health, First Steps Early Intervention: qualification and enrollment",
  href: "https://msdh.ms.gov/Page/41,0,74,830.html",
};
const midAutism: Source = {
  label: "Mississippi Insurance Department, Autism insurance benefits",
  href: "https://www.mid.ms.gov/mississippi-insurance-department/healthcare/autism/",
};
const bcbsResponse: Source = {
  label: "Blue Cross & Blue Shield of Mississippi, response to the Mississippi Insurance Department on autism benefits (2018, PDF)",
  href: "https://www.mid.ms.gov/healthcare/pdf/Blue%20Cross%20Blue%20Shield.pdf",
};

export const articles: ArticleMeta[] = [
  {
    slug: "after-an-autism-diagnosis",
    title: "What to do after an autism diagnosis in North Mississippi",
    short: "After an autism diagnosis",
    subtitle: "a place to start",
    description:
      "A plain-language guide for North Mississippi families on what to do after an autism diagnosis, covering paperwork, early intervention, school evaluations, and insurance.",
    image: "learning",
    published: "2026-10-27",
    updated: "2026-10-27",
    reviewedBy: null,
    sources: [firstSteps, dmh, midAutism],
  },
  {
    slug: "autism-evaluation-north-mississippi",
    title: "Where to get an autism evaluation in North Mississippi",
    short: "Autism evaluations",
    subtitle: "finding answers",
    description:
      "How autism is diagnosed in Mississippi, and how early intervention differs from a school evaluation. Includes evaluators in North Mississippi from the state's 2026 Autism Resource Guide.",
    image: "communication",
    published: "2026-10-27",
    updated: "2026-10-27",
    reviewedBy: null,
    sources: [dmh, firstSteps],
  },
  {
    slug: "does-bcbs-of-mississippi-cover-aba-therapy",
    title: "Does Blue Cross & Blue Shield of Mississippi cover ABA therapy?",
    short: "BCBS of Mississippi and ABA",
    subtitle: "insurance, plainly",
    description:
      "How Mississippi's autism insurance law works and which plans it covers. What BCBS of Mississippi requires before ABA starts, and the questions worth asking about your plan.",
    image: "tableWork",
    published: "2026-10-27",
    updated: "2026-10-27",
    reviewedBy: null,
    sources: [midAutism, bcbsResponse],
  },
  {
    slug: "your-first-visit",
    title: "Your first visit to the cabin",
    short: "Your first visit",
    subtitle: "look before you come",
    description:
      "Photos of our sign, the cabin, and the rooms inside, to look at with your child before your first visit to Wild & Free Behavior in New Albany. Print it if that helps.",
    image: "sign",
    published: "2026-10-27",
    updated: "2026-10-28",
    reviewedBy: null,
    sources: [],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
