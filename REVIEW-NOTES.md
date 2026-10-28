# Review Notes: Full Site Build

The complete Wild & Free Behavior website: 14 pages, the insurance and fit screener, structured data, and launch switches. It is built and verified but not deployed. Intake runs in demo mode until HighLevel's HIPAA setup exists.

Strategy and the original brief are in `docs/`. Screenshots are in `review/`.

## Redesign: golden hour at the cabin

The first build read as generic: cream on cream, timid type, and almost no motion. The redesign keeps every page, fact, and flow, and changes the look and feel.

- **Color:** deep forest green grounds, with the logo's sand and terracotta as light. Warm cafe brown marks the insurance and focus sections and the footer. Long reading (the guides) stays on a paper column for comfort. Interior pages close on a sand band, so every page ends on a warm note.
- **Type:** Rovey set large (the hero "Grow" runs up to 13.5rem), White Angelica script above every heading, and Raleway for reading.
- **Brand shapes:** the logo's arch frames photos, its sun rays draw behind the hero, and a large sun draws itself above each closing call to action.
- **Signature moment:** on the homepage the tomato photo starts inside the arch and opens to full-bleed as you scroll. The caption "Steady weeks grow good days" then settles in.
- **Motion:**
  - Headlines rise in word by word.
  - Photos drift slightly against the scroll.
  - The getting-started path draws itself as you read.
  - The focus list swaps its photo as you move down it.
  - A marquee runs under the hero.
  - Pages crossfade on navigation.
  - Desktop gets smooth wheel scrolling.
- **How the motion is built:**
  - There is no animation library.
  - Reveals use one small IntersectionObserver hook and CSS transitions.
  - Scroll-linked effects (parallax, the arch, the steps line) are CSS scroll-driven animations. They run off the main thread and need no JavaScript.
  - Smooth scrolling (Lenis) loads on demand, only for desktop mouse and trackpad users, so phones never download it.
  - Browsers without scroll timelines (Firefox today) and reduced-motion visitors get still photos and a full-bleed arch photo. Everything stays readable without JavaScript.
- **Why no Motion library:** an earlier pass used Motion (framer-motion). It added about 55 KB of JavaScript and pulled mobile Performance below 90. Moving the effects to CSS brought the JavaScript back to about 156 KB, close to the first build's 146 KB.

## Round 2 (2026-10-28): header, hero, insurance, copy

Kalob's feedback on the redesign, and what changed:

- **Header glitch while scrolling:** the header decided direction frame by frame. When a smooth or momentum scroll slowed down, the small frames read as "not scrolling down" and the header flashed back in, about 13 times per downward read on desktop. It now judges direction by distance: it hides after 48px down and returns after 64px up. Measured: 2 state changes on a full downward read (it turns solid, then hides once).
- **Too much insurance:**
  - The homepage insurance section is gone.
  - "Insurance" is out of the main nav. The nav is now ABA Therapy, About, Getting Started, Visit, Questions, and "Insurance and cost" lives in the footer.
  - The hero facts and the marquee no longer name the insurer.
  - The homepage FAQ keeps one insurance question, listed last.
  - The FAQ page lists its insurance group last.
  - About's "what you can count on" list swaps "Benefits checked first" for "A plan written by a BCBA".
  - The screener asks about the child first and payment second. Every "Find your next step" button used to open on "How will you pay for services?"
  - The Insurance page stays, for families searching for it, retitled "Paying for ABA therapy".
- **Hero, too much open space:**
  - It no longer forces full-screen height.
  - The text sits beside a larger arch.
  - The arch slowly crossfades through the garden, the pine-walled room, and the check-in board (desktop only, still for reduced motion).
  - A photo of the cabin overlaps the arch with a handwritten "our cabin".
  - A facts row sits under the buttons.
  - Phones keep one photo and a shorter paragraph, so the button stays in the first screen (777px at 390×844).
- **Copy, for search and to sound human:**
  - Rewrote the homepage sections, ABA Therapy, Getting Started, About, Visit, FAQ and Resources intros, the Insurance intro, the screener wording, and the default and per-page titles and descriptions.
  - Removed the patterns that read as machine-written ("Here is exactly what happens", "It starts with", "From there", "from X to Y" spans, "A person on our team will...", repeated reassurances).
  - Search phrases are worked in where they read naturally: "ABA therapy" with New Albany, MS, autism, Union County, North Mississippi, and real distances to Ripley, Pontotoc, and Tupelo from the Visit page.
  - The diagnosis guide's title is now "What to do after an autism diagnosis in North Mississippi" (it was an 89-character "Here's what to do next" line).
  - No new facts were added.

**Working-copy warning:** this project lives in an iCloud-synced Desktop folder. iCloud creates conflict copies named `* 2`, `* 3` (including inside `.next`), which break typechecking and once got committed. Three such screenshots were merged into `main` with PR #1, and this branch removes them. Move the repo out of iCloud, for example to `~/Code`, or exclude it from sync.

## Round 3 (2026-10-28): people, their story, photos

Kalob's feedback after merging round 2, and what changed:

- **People on the site.** Only Anna Claire and Jimbo appear, by name. Kalob confirmed Jimbo is the man in the floral shirt.
  - Two former staff members (the redhead in the blue outfit and the blonde with glasses) are never to appear. They were on the porch and in the doorway of both cabin photos, and both photos were replaced with fall shots from the January 2025 shoot.
  - The two other current team members (the brunette and the blond man in the black polo) also stay off the site, at Kalob's request. Their portraits and the brunette's two garden photos were removed, including the hero's lead image.
  - Anna Claire and Jimbo's daughters appear in several photos but are never mentioned or named.
  - Photos where a child's name can be read (cubby hooks, a basket) are never used.
- **Their story.** About has a new "Our story" section built from 2017 coverage (TODAY, Shepherd Center, United Spinal) and the practice's earlier website. The accident gets one careful sentence, with no injury details, as Kalob asked. Both bios now name Jimbo, with his degrees and teaching years. Merging the PR means Anna Claire and Jimbo approved it.
- **Homepage.** The team section is now "Anna Claire and Jimbo", with their portraits, their names, and a short version of the story. The hero's second button is "Our story". The arch now fades from the garden to Anna Claire on the porch to the play room.
- **New photos** from both Drive folders: Anna Claire's portrait, Anna Claire on the porch with a child, the two of them inside the cabin, circle time, Jimbo with picture cards, the play room, the book ledge, instruments at circle time, and the cabin in the fall. Originals were downloaded at full size into `../homepage-mockup/assets` and run through `npm run images`.
- **"Your first visit" rewrite.** It used to be written in the child's voice ("I will look for a big stone sign"). It now opens with a short note from Anna Claire and Jimbo. The captions are written for a parent to read aloud, and each one describes only what its photo shows. It has a new subtitle and description and is still printable.
- **Structured data.** Jimbo is a Person node with a link to Anna Claire as his spouse.

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
- All four guides. "Your first visit" is written for parents to read aloud, so check the wording.
- FAQ answers and screener copy (`src/components/screener/copy.ts`).

**Legal review:** `/privacy` (written to match how the site behaves, including the HighLevel BAA requirement) and `/accessibility`.

**Business decision:** the evaluation guide lists four North Mississippi evaluators from the DMH guide. Practices that also provide ABA were left out on purpose; the page notes that more are in the guide.

## Still open (does not block review; some block launch)

| Item | Status |
|---|---|
| Ages served and the "but..." exception | Copy says "young children". Screener routes under 2 and 7+ to staff. |
| Jimbo's job title | None given. He is named as Jimbo Waldrop with his degrees and teaching years. |
| Who is in each portrait | Resolved: Anna Claire and Jimbo are named. Other staff are not on the site. |
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

- Round 3 re-run: unit tests 26 of 26, screener 38 of 38, navigation 12 of 12, soft-navigation audit 13 of 13, header 2 state changes per downward read, every reveal fires (the one unshown element at 390 is a desktop-only block), and no overflow or console errors on Home, About, and "Your first visit" at 1440 and 390. `review/` was recaptured so it no longer shows anyone who must stay off the site.
- Unit tests: 26 of 26 pass. Typecheck and ESLint are clean. Production build: 21 static routes.
- Screener, demo build: 38 of 38 checks (child step first, payment second; the Insurance page's inline question opens on the child step with payment kept). Every branch, keyboard, Escape and focus return, back, restart, inline preselect, no requests, no storage, no errors. The 390×844 first screen shows the CTA (bottom at 799px).
- Live intake build: 17 of 17. Validation and `aria-invalid`, nothing sent while invalid, 500 shows a recoverable error that keeps answers, retry succeeds, payload shape, no CSP violations, events carry no personal or health details.
- Navigation: 12 of 12. Current page marked, soft navigation, breadcrumbs, 15 FAQ items, 404 status, sticky bar on interior pages, mobile menu, print view.
- Soft-navigation audit: no duplicate ids, and every label resolves to visible text across five routes.
- Routes: all 14 pages return 200, unknown paths 404, legacy URLs 301. Security headers present.
- Structured data parses on every page tested.
- Full-page screenshots at 1440 and 390 for every page: no horizontal overflow, no console errors. The `review/` full pages are captured with reduced motion so the pinned arch section reads as a still photo. `desktop-home-arch-sequence.jpg` shows the arch opening.
- Lighthouse mobile, production build, after round 3:

| Page | Performance | Accessibility | Best Practices |
|---|---|---|---|
| Home | 91 | 100 | 100 |
| ABA Therapy | 93 | 100 | 100 |
| About | 92 | 100 | 100 |
| Your first visit | 92 | 100 | 100 |
| Visit | 91 | 100 | 100 |

  - Round 2 for comparison: Home 91, 89, 90; ABA Therapy 93; Getting Started 94; About 92; Visit 92.

  - Desktop scores 100 for Performance, Accessibility, and Best Practices.
  - Observed LCP on the homepage is under 0.9s. The mobile figure is Lighthouse's simulated slow-4G estimate.
  - SEO scores 69 in preview because of the intentional noindex, and 100 with `SITE_INDEXABLE=true` (home, ABA Therapy, Visit, and the BCBS guide checked).
- Motion checks:
  - No scroll-container ancestors under any scroll-driven element.
  - Parallax, arch, and steps progress match scroll position at 1440 and 390.
  - Every reveal fires.
  - With reduced motion, the arch section is a still full-bleed photo, nothing translates, and Lenis is off.
  - In-page anchors land just below the header, at 96px.

**Verdicts**

- **Technical:** PASS.
- **Visual:** READY FOR HUMAN REVIEW. All pages were reviewed at desktop and phone widths and the fixes were applied. Approval is Kalob's.
- **Business/content:** REVISE. BCBA review, legal review, and the open items above are needed before launch.
