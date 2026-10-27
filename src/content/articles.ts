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
    title: "Your child was just diagnosed with autism. Here's what to do next in North Mississippi.",
    short: "After an autism diagnosis",
    subtitle: "a place to start",
    description:
      "A practical order of steps for North Mississippi families after an autism diagnosis: paperwork, early intervention, school services, insurance, and where ABA fits.",
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
      "Who can diagnose autism, how early intervention and school evaluations differ, and evaluators in North Mississippi listed in the state's 2026 Autism Resource Guide.",
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
      "How Mississippi's autism insurance law works, which plans it covers, what BCBS of Mississippi requires before ABA starts, and the questions to ask about your plan.",
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
    subtitle: "a picture story",
    description:
      "A printable picture story of Wild & Free Behavior in New Albany, so your child can see the sign, the cabin, and the rooms before the first visit.",
    image: "sign",
    published: "2026-10-27",
    updated: "2026-10-27",
    reviewedBy: null,
    sources: [],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
