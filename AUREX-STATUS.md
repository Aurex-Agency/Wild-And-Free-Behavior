# Aurex Project Status

## Current state

**Project:** Wild & Free Behavior (ABA therapy, New Albany, MS)
**Operating mode:** DEEP (new website)
**Branch:** `proof/homepage`
**PR/deployment:** PR #1 against `main`; not deployed
**Stage:** Full build complete, awaiting human visual approval, BCBA/legal review, and launch prerequisites
**Last updated:** 2026-10-27

## Approved decisions

- verified strategy and conversion: `docs/WEBSITE-BUILD-PLAN.md`
- site architecture: 14 pages built per plan section 5 (see REVIEW-NOTES.md)
- creative direction: "A cabin, a garden, and a plan" (awaiting Kalob's visual approval)
- client confirmations (2026-10-27, via Kalob): phone 662-539-7129 is current; no Horn Lake location; photo waivers signed; use the brand fonts fully
- engineering approach: Next.js 16 App Router, TypeScript, Tailwind 4, all routes static; intake demo by default, HighLevel webhook behind env switch

## Asset truth

- authentic evidence approved for publication: all 18 client photos (waivers signed)
- interface assets: traced wordmark, rebuilt logo SVGs, measured sun geometry, log-course rules, arch clip paths
- fonts: Rovey (free release, letters only) + Gilda Display companion for numerals and punctuation; White Angelica; Raleway
- unresolved identity questions: who is in each portrait; Jimbo's full name and role

## Most recent work

**Task:** Complete the build after client answers
**Result:** All pages, guides, SEO plumbing, live-intake path, and tests done; see REVIEW-NOTES.md
**Files/areas changed:** `src/app/*` (new routes), `src/components/*`, `src/content/*`, `src/lib/intake.ts`, `src/lib/track.ts`, `src/lib/schema.ts`, `next.config.ts`, `scripts/images.mjs`, `review/`

## Independent verdicts

**Technical:** Pass
**Visual:** Ready for human review
**Business/content:** Revise (BCBA review of clinical copy, legal review of privacy page, open items)

## Browser evidence

- [x] 360px
- [x] 390/393px
- [x] 430px
- [x] 768px (homepage)
- [x] 1024px (homepage)
- [x] 1440px (all pages)
- [x] 1920px (homepage)
- [x] 2560px (homepage)
- [x] motion-enabled state
- [x] static/reduced-motion state
- [x] keyboard/focus and mobile navigation
- [x] build/typecheck
- [x] primary conversion flow (demo and mocked live webhook)

## Known issues

### Blockers (launch only)

- HighLevel HIPAA add-on, BAA, inbound webhook, CORS check
- BCBA review of clinical copy; legal review of privacy page
- Ages, Jimbo's role, Medicaid/CHIP, hours

### Important

- Interior pages checked at 1440 and 390; 768/1024/1920 checked on the homepage only
- Logo is a trace of a 1080px PNG; request a vector

### Polish

- none

## Current human decision

**Decision needed:** Approve the visual direction across the full site.
**Recommendation:** Approve; then send the BCBA review packet and the open-questions list to the client.
**Evidence to review:** `review/` or `npm run dev`

## Next action

**Next action:** Client review round (BCBA copy, open facts), then launch steps 1 to 5 in REVIEW-NOTES.md.
**Suggested model/class:** STANDARD
**Why:** Build is complete; remaining work is review and configuration.
