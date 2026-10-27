# Review Notes: Full Site Build

The complete Wild & Free Behavior website: 14 pages, the insurance and fit screener, structured data, and launch switches. It is built and verified but not deployed. Intake runs in demo mode until HighLevel's HIPAA setup exists.

Strategy and the original brief are in `docs/`. Screenshots are in `review/`.

## Run it

```
npm install
npm run dev          # http://localhost:3000
npm test             # 26 unit tests (screener routing, intake validation)
npm run typecheck
npm run lint
npm run build && npm start
```

### Environment switches (all optional; defaults are safe)

| Variable | Default | Set at launch |
|---|---|---|
| `SITE_INDEXABLE` | off: every page `noindex`, robots.txt disallows all, footer says "Preview build" | `true` on the production deployment only |
| `NEXT_PUBLIC_INTAKE_MODE` | `demo`: the screener sends nothing | `webhook`, once HighLevel's HIPAA add-on and BAA are in place |
| `NEXT_PUBLIC_INTAKE_WEBHOOK_URL` | none | The HighLevel inbound webhook URL (`https://` only). Also added to the CSP `connect-src`. |

## Pages

| URL | Purpose | Target search intent |
|---|---|---|
| `/` | Homepage | ABA therapy New Albany MS, brand |
| `/aba-therapy` | What ABA looks like at the cabin, focus areas, who it's for | ABA therapy for young children, New Albany |
| `/getting-started` | Six steps from first message to weekly rhythm, what to have ready | how to start ABA therapy |
| `/insurance` | BCBS of Mississippi, other plans, Medicaid/CHIP, private pay, questions for your insurer | ABA insurance, BCBS Mississippi ABA |
| `/about` | Anna Claire Waldrop's credentials, team photos, the cabin, what families can count on | who runs it, trust |
| `/visit` | Address, directions, driving distances from nearby towns, first-visit prep | directions, nearby towns |
| `/faq` | 15 answers in four groups | long-tail questions |
| `/resources` | Guide hub plus statewide resources | |
| `/resources/after-an-autism-diagnosis` | Steps after a diagnosis in North Mississippi | after autism diagnosis Mississippi |
| `/resources/autism-evaluation-north-mississippi` | Who diagnoses, First Steps and school evaluations, evaluators listed in the state guide | autism testing Tupelo / North Mississippi |
| `/resources/does-bcbs-of-mississippi-cover-aba-therapy` | State law, plan types, BCBS approval steps, questions to ask | does BCBS of Mississippi cover ABA |
| `/resources/your-first-visit` | Printable picture story of the sign, cabin, and rooms | |
| `/privacy`, `/accessibility` | Policies | |
| `404` | Custom "This path goes nowhere." page | |

Old URLs from the previous site redirect with 301: `/abouta4ae63fc` and `/about-us` go to `/about`, `/contact` and `/contact-us` go to `/visit`, and `/home` goes to `/`.

## What changed from the homepage proof

- **Client answers applied:** the phone number is confirmed, there is no Horn Lake location (single-location schema), and photo waivers are signed (all 18 photos are cleared, including the porch family group now on About).
- **Fonts used fully.** Rovey draws every letter, and headings now include punctuation and numbers. The only Rovey file available is the free release, which has no numerals or punctuation, so Gilda Display (open license, chosen to match Rovey's weight and lining figures) supplies exactly those characters. It only downloads on pages that need it. If a full Rovey file is ever dropped into `src/fonts/rovey.woff2`, it takes over automatically. White Angelica now carries the brand sheet's "Subtitle" role above every section heading, as well as the handwritten notes. Raleway Medium stays the body face.
- **Screener headings** are back in Rovey.
- **Intake:** live mode (validation, honeypot, sending, failure with retry, success) is behind an env switch.
- **Events:** a privacy-safe event layer with no provider installed.

## SEO

- One H1 per page. Unique titles that all say MS or Mississippi. Parent-focused meta descriptions. Self-referencing canonicals on `https://www.wildandfreebehavior.com`.
- `sitemap.xml` (14 URLs) and `robots.txt` follow `SITE_INDEXABLE`. Verified: with the flag on, Lighthouse SEO scores 100.
- Structured data, only from visible facts:
  - `MedicalClinic` with geo coordinates (OpenStreetMap match for 403 Doctors Drive) and areaServed matching the Visit page
  - `WebSite`
  - `Person` with credentials (About)
  - `BreadcrumbList` (all interior pages)
  - `FAQPage` (/faq)
  - `Article` (guides)
  - No ratings, reviews, prices, or hours.
- Internal links: every page links into Getting Started or opens the screener, articles cross-link to the service and insurance pages, and the footer lists every page and guide.
- Article facts are sourced and dated on the page. Sources: Mississippi Insurance Department autism page, BCBSMS's 2018 response to MID, MSDH First Steps, the DMH Autism Resource Guide (April 2026). Driving distances were computed with OpenStreetMap routing.

## Intake, events, and privacy

- **Demo mode (default):** zero network requests and no browser storage. Verified on every screener branch.
- **Live mode:** the browser posts JSON directly to the HighLevel webhook, so intake data never passes through the website host. That avoids needing Vercel's BAA. Payload: source, timestamp, page, contact (name, phone, email, method, note), screener answers, and result.
  - Before launch, check that HighLevel's inbound webhook accepts a cross-origin POST from the site's domain. It was tested here against an intercepted mock endpoint.
  - If HighLevel blocks CORS, switch to a HighLevel form embed for the contact step, or a server route with Vercel's BAA.
- **Events** (`src/lib/track.ts`): `screener_open`, `screener_step` (number), `screener_result` (type), `contact_submit` (type), `call_click`, `directions_click`. Verified to carry no personal or health details. No provider is installed. When one is chosen (cookieless, such as Plausible), wire it in `send()` and add its origin to the CSP. Never ad pixels or session replay.
- **Security headers (production):** CSP, HSTS, nosniff, frame denial, strict referrer, and a permissions policy. `'unsafe-inline'` scripts are required by static Next.js pages.

## Next.js 16 note

With Cache Components on (the create-next-app default, and slated to become standard), visited pages stay in the DOM hidden by React `<Activity>`. Every id and `aria-labelledby` reference is therefore unique per route, and the sticky mobile bar only watches the hero on `/`. Both bugs were found and fixed in QA, and a soft-navigation audit now checks them. End-to-end tests should use role-based or visibility-filtered locators.

## Content to review

**BCBA review** (Anna Claire), before launch:
- `/aba-therapy`: focus areas, "What ABA looks like here", "You're part of the plan", "A plan that grows with your child", "Who we work with".
- `/getting-started` step text, especially the approval wording and "What helps".
- `/insurance` BCBS steps ("We check your benefits", the approval sequence).
- `/about`: "oversees each child's assessment and treatment plan", the credential dates (December 2020 and March 2021, from the earlier website), and "What you can count on".
- All four guides. The picture story is written for children, so check the wording.
- FAQ answers and screener copy (`src/components/screener/copy.ts`).

**Legal review:** `/privacy` (written to match how the site behaves, including the HighLevel BAA requirement) and `/accessibility`.

**Business decision:** the evaluation guide lists four North Mississippi evaluators from the DMH guide. Practices that also provide ABA were left out on purpose; the page notes that more are in the guide.

## Still open (does not block review; some block launch)

| Item | Status |
|---|---|
| Ages served and the "but..." exception | Copy says "young children". Screener routes under 2 and 7+ to staff. |
| Jimbo's full name, role, credentials | First name only, everywhere |
| Who is in each portrait | Captions are group-level only |
| Medicaid / CHIP acceptance | Routes to staff review |
| Hours | Hidden until `site.hours` is set |
| Garden used in sessions | Described as "a garden" outside, nothing more |
| Friday reminders | Described as part of the process. Needs the HighLevel workflow. |
| Vector logo | Wordmark is traced from the 1080px PNG |
| HighLevel HIPAA add-on, BAA, inbound webhook, CORS check | Required before live intake |
| Aurex BAA with the practice, legal review | Recommended |
| Google Business Profile, DMH guide listing, BCBS directory check | Plan section 6 |
| Analytics provider | Not chosen |
| Deployment, DNS, Search Console | Not started. Never touch MX on `wildandfreebehaviorllc.com`. |

## Launch steps

1. HighLevel: enable the HIPAA add-on, sign the BAA, create an inbound-webhook workflow, and confirm it accepts a CORS POST from the domain.
2. Vercel production env: `SITE_INDEXABLE=true`, `NEXT_PUBLIC_INTAKE_MODE=webhook`, `NEXT_PUBLIC_INTAKE_WEBHOOK_URL=...`. Leave previews unset so they stay noindex and demo.
3. Deploy, then submit one real test lead end to end.
4. With approval, point `wildandfreebehavior.com` and `www` at Vercel in GoDaddy DNS.
5. Verify Search Console and Bing, submit `sitemap.xml`, and update the Google Business Profile website link.

## Verification (evidence)

- Unit tests: 26 of 26 pass. Typecheck and ESLint are clean. Production build: 21 static routes.
- Screener, demo build: 35 of 35 checks. Every branch, keyboard, Escape and focus return, back, restart, inline preselect, no requests, no storage, no errors. The 390×844 first screen shows the CTA (bottom at 799px).
- Live intake build: 17 of 17. Validation and `aria-invalid`, nothing sent while invalid, 500 shows a recoverable error that keeps answers, retry succeeds, payload shape, no CSP violations, events carry no personal or health details.
- Navigation: 12 of 12. Current page marked, soft navigation, breadcrumbs, 15 FAQ items, 404 status, sticky bar on interior pages, mobile menu, print view.
- Soft-navigation audit: no duplicate ids, and every label resolves to visible text across five routes.
- Routes: all 14 pages return 200, unknown paths 404, legacy URLs 301. Security headers present.
- Structured data parses on every page tested.
- Full-page screenshots at 1440 and 390 for every page: no horizontal overflow, no console errors.
- Lighthouse mobile, production build:

| Page | Performance | Accessibility | Best Practices |
|---|---|---|---|
| Home | 90 | 100 | 100 |
| ABA Therapy | 93 | 100 | 100 |
| Insurance | 95 | 100 | 100 |
| BCBS guide | 94 | 100 | 100 |
| Visit | 92 | 100 | 100 |

  SEO scores 69 in preview because of the intentional noindex, and 100 with `SITE_INDEXABLE=true`.

**Verdicts**

- **Technical:** PASS.
- **Visual:** READY FOR HUMAN REVIEW. All pages were reviewed at desktop and phone widths and the fixes were applied. Approval is Kalob's.
- **Business/content:** REVISE. BCBA review, legal review, and the open items above are needed before launch.
