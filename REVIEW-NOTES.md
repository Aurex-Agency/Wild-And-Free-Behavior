# Review Notes: Homepage Browser Proof

Phase 1 proof for Wild & Free Behavior, built from `docs/BUILD-PROMPT.md` and `docs/WEBSITE-BUILD-PLAN.md`. Local only, noindex, nothing deployed.

## Run it

```
npm install
npm run dev          # http://localhost:3000
npm test             # screener routing, 19 unit tests
npm run typecheck
npm run build && npm start
```

Rebuild photo derivatives (originals stay outside the repo in `../homepage-mockup/assets`):

```
npm run images                 # all
ONLY=cabin npm run images      # one entry
```

## Design direction

**"A cabin, a garden, and a plan."** The practice is a log cabin with a porch, a stone sign, pine-walled rooms, and a children's garden. The page is built like arriving there: the garden (hero), inside (what therapy can focus on), the path in (getting started), a steady week (rhythm), paying for it, the people on the porch, and how to find the cabin.

Quality carriers, all visible in the proof:

1. **Arch-window hero.** The photo sits in the logo's own arch: a circle segment measured from `logo.png` (chord 280, rise 90.1), not a generic rounded rectangle. The cabin's arched window echoes the same shape.
2. **Sun rays from the logo.** All 18 rays were measured from the logo raster and redrawn as real lines (`src/lib/sun.ts`). They draw outward once on load, form the screener's progress meter, open sections, and make the favicon.
3. **Log-course rules.** Hairlines with deliberately uneven spacing, used as dividers and as texture inside forest-green panels.
4. **Field notes.** Short White Angelica captions ("out in the garden", "circle time", "same time every week", "say hello", "look for the stone sign"). Decorative only: `aria-hidden`, and each idea is also said in body text.
5. **Weekly rhythm strip.** A Monday to Friday example schedule with session blocks at the same time, plus the Friday reminder. Clearly labeled as an example.
6. **Getting-started path.** Five steps with arch markers on one continuous line, beside a real table-work photo.
7. **Mobile composition.** A wider arch crop of a different photo (`IMG_9479`) so photo, H1, sentence, and CTA all fit the 390×844 first screen (CTA bottom at 802px). A sticky Call / Get started bar appears once the hero buttons scroll away.
8. **Inline first question.** The insurance section shows "How will you pay for services?" with live options. Each opens the screener with that answer already chosen.

Not used on purpose: centered pill-badge hero, icon card grids, testimonials, stats, stock imagery, gradients, glass, fade-up on every block, generic icon sets. Copy has no em or en dashes and none of the banned words in the build prompt.

## Source assets

| Asset | Use |
|---|---|
| `logo.png` (1080px, opaque white background) | Wordmark traced to SVG (`public/brand/wordmark.svg`), full logo rebuilt as SVG (`logo-cream.svg`, `logo-forest.svg`) from the traced wordmark plus measured sun geometry, favicon (`src/app/icon.svg`), and `apple-icon.png`. **Request a vector original.** The trace is faithful at header and footer sizes but shows slight edge wobble when very large. |
| `rovey.otf` | Converted to `src/fonts/rovey-free-demo.woff2`. See Fonts. |
| `white-angelica.ttf` | Converted to `src/fonts/white-angelica.woff2`. |
| `raleway.ttf` | Not used directly. Raleway is OFL; `next/font/google` self-hosts a Latin subset at build time, and browsers never contact Google. |
| 18 photos | 13 used. Crops and focal points are listed in `scripts/images.mjs`. AVIF and WebP at several widths, EXIF and GPS stripped. |

### Photos and crops

| Key | File | Crop and role |
|---|---|---|
| heroGarden | IMG_9484 | Desktop hero arch (0.8). Adult and two children among the corn. |
| heroGardenMobile | IMG_9479 | Mobile hero arch (1.4). Three children in the garden, heads well below the arch curve. |
| routines | IMG_9513 | Approach: everyday routines (check-in board, "circle time" sign). |
| communication | IMG_9539 | Approach: worksheet. |
| learning | IMG_9485 | Approach: learning and connection. |
| tableWork | IMG_9541 | Getting started. Black and white kept deliberately as a contrast beat. Ask whether a color original exists. |
| tomato | IMG_9487 | "Week by week" full-bleed pause. |
| portraitA/B/C | IMG_9454, 9457, 9460 | People. **No names attached.** |
| cabin | IMG_9473 | Visit. Desktop crop shows the arched window, porch, and stone sign; the card sits left so the sign stays visible. |
| wallScript | IMG_9554 | Final call to action. |
| (share image) | IMG_9472 | `opengraph-image.jpg`, the stone sign. No faces in social previews. |

Unused: IMG_9467 (family group, identities unknown), IMG_9475 (the cabin photo covers place; IMG_9472 is used only as the share image), IMG_9510 (dark backlit, held for a later page), IMG_9519 (good, held for the ABA Therapy page), IMG_9527 (merch tee, retro style not adopted).

## Fonts

- **Rovey (demo).** The local file is literally named "RoveyFree-Regular". It has 60 glyphs: letters and space only. No numerals, no punctuation. Every Rovey line in the proof is letters-only, and this was checked by script. Screener headings use Raleway because they need question marks and commas. **Buy the full Rovey license with web-embedding rights (Craft Supply Co.) before launch.**
- **White Angelica.** Personal-use license. **Buy the commercial license with web rights (Creatype Studio) before launch.** Missing glyph: en dash, which is not used.
- **Raleway.** Medium (500) for body, per the brand sheet. `lining-nums` on phone numbers, addresses, and ages, because Raleway defaults to old-style figures. `display: optional` keeps body text from repainting late on slow connections, which took mobile LCP from paragraph text to the hero photo.

## Color

The brand sheet's printed RGB and CMYK values disagree with its hex codes in places. The hex codes are the source of truth: Forest `#0a4040`, Modern Cafe `#322d2a`, Blushed Sand `#dbb199`, Cultured Beige `#f9f8f4`. Two tints were added for surfaces only: `#f1ece3` and `#efe2d8`. Sand is never used as text on light grounds.

## Interactive vs. demonstration-only

**Interactive:** anchor navigation, the mobile menu (Escape closes, focus returns), the sticky mobile bar, FAQ accordions (native `details`), Get directions (Google Maps search, new tab), tap to call, and the full screener: every branch, back with preserved answers, close, Escape, restart, sample data, and completion.

**Demonstration only:** the screener and contact step. Nothing is sent, stored, or tracked. Verified: zero network requests and empty localStorage, sessionStorage, and cookies after every path. Autofill is off on the demo fields so a reviewer's real details are never filled in. In production, turn autofill back on.

**Screener logic** lives in `src/lib/screener.ts` (pure functions, 19 unit tests). Wording is in `src/components/screener/copy.ts`. No path ever says accepted, approved, booked, or "you qualify". Ages outside 2 to 6 and an uncertain diagnosis route to staff review and keep the insurance context.

## Unverified facts and placeholders

All business facts are in `src/config/site.ts`.

| Item | Status in proof |
|---|---|
| Phone 662-539-7129 | Shown. From NPPES (2022). **Confirm.** |
| 403 Doctors Drive address | Shown. Verified by NPPES and the sign. |
| Anna Claire Waldrop, M.S., BCBA, LBA, owner | Shown. **Re-verify on the BACB registry and MS Autism Board.** |
| Jimbo | First name only. Role, last name, and credentials unknown. |
| Ages | Copy says "young children". Screener bands are 2 to 3 and 4 to 6, with under 2 and 7+ routed to staff. **Confirm the range and the "but..." exception.** |
| Medicaid or CHIP | Option routes to staff review. **Confirm whether it's accepted.** |
| BCBS approval language | "Plans often need to approve the assessment and therapy." Based on a Mississippi state publication. **BCBA review.** |
| Hours | Not shown. `site.hours` renders nothing while null. |
| Garden | Note says "out in the garden", not "the garden out back". **Confirm it is at the clinic and used with children.** |
| Friday reminders | Described as a heads-up each Friday. **Planned HighLevel feature, not built.** |
| "The first conversation is free" | From meeting notes. Confirm the wording. |
| Social links, email | Not shown. |
| Horn Lake address | Not shown. **Ask if a second location exists.** |
| Privacy and accessibility pages | Not linked yet (no dead links). |

### Clinical copy for BCBA review

- Approach areas: everyday routines, communication (words, signs, pictures, or a device), learning and connection, family priorities.
- Getting started step 3 ("Your insurance may need to approve this step first") and step 5 ("reviewed and updated as they grow").
- "Week by week" paragraph (garden comparison).
- Screener result and note wording in `copy.ts`.

## Prelaunch requirements (deferred to the full build)

1. Font licenses: Rovey full version and White Angelica commercial, with web rights. Replace the demo woff2 and remove the letters-only constraint.
2. Signed photo releases for every adult and child pictured. Confirm whether any child is a client; if so, written HIPAA authorization is required.
3. Vector logo from the client's designer.
4. **HighLevel HIPAA add-on and signed BAA before any live intake.** Intake data goes from the browser to HighLevel only, never through Vercel (Vercel's BAA is a paid add-on). Aurex likely becomes a business associate, so get legal review.
5. No ad pixels, session replay, or heatmaps. Analytics events carry step numbers and result types only.
6. Notice of Privacy Practices link and website privacy policy.
7. Credential verification on the BACB and MS Autism Board registries.
8. Set `site.indexable = true` and the real URL at launch, then add a sitemap and the redirects from the plan (`/abouta4ae63fc` to `/about`, `/contact` to `/visit`).

## Verdicts

**Technical: PASS (proof scope).**
- `npm test`: 19 of 19 pass. Typecheck and ESLint are clean. Production build: all routes static.
- Headless Chrome e2e: 35 of 35 checks pass (two of them are informational measurements at 360 and 430). Every screener branch, keyboard open, focus to heading, error on empty continue, arrow keys between options, Escape closes with focus returned, back preserves answers, sample data, completion, restart, inline preselect, zero network requests, no storage, no console errors.
- Keyboard: logical tab order, a 3px focus ring on every stop, skip link works.
- No horizontal overflow at 360, 390, 430, 768, 1024, 1440, 1920, or 2560. Reduced motion shows rays fully drawn with no animation.
- Lighthouse on the production build. Mobile: Performance 92, Accessibility 100, Best Practices 100, SEO 69. Desktop: 100 / 100 / 100 / 69. SEO is 69 only because of the deliberate noindex (`is-crawlable`). Mobile LCP is 3.3s simulated slow 4G (hero photo), CLS 0, TBT about 70ms.
- Bug found and fixed during QA: React reused the footer button node, so "Continue to contact details" turned into a submit button mid-click and skipped the contact step. The buttons now have distinct keys.

**Visual: READY FOR HUMAN REVIEW.** Desktop and mobile were composed and reviewed at real scroll states. Kalob approves or redirects. Screenshots are in `review/`.

**Business/content: REVISE (expected at this stage).** The copy stays within known facts, but the items in "Unverified facts" need client answers, and the clinical copy needs BCBA review.

## Screenshots (`review/`)

- `desktop-1440-hero.jpg`, `desktop-1440-full.jpg`
- `mobile-390-first-screen.jpg`, `mobile-390-full.jpg`
- `dialog-payment-1280.jpg`, `dialog-mobile-390.jpg`, `menu-open-390.jpg`
