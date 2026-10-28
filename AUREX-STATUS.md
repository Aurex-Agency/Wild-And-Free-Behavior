# Aurex Project Status

## Current state

**Project:** Wild & Free Behavior (ABA therapy, New Albany, MS)
**Operating mode:** DEEP (new website)
**Branch:** `story/people-and-photos`
**PR/deployment:** Round 3 PR against `main` (PRs #1 to #3 are merged; Vercel builds previews); not deployed by Aurex
**Stage:** Round 3 (people, story, photos) awaiting Kalob's review; BCBA/legal review and launch prerequisites unchanged
**Last updated:** 2026-10-28

## Approved decisions

- verified strategy and conversion: `docs/WEBSITE-BUILD-PLAN.md`
- site architecture: 14 pages built per plan section 5 (see REVIEW-NOTES.md)
- creative direction: "Golden hour at the cabin" (dark forest grounds, sand light, arch and sun motifs, scroll-led motion). Replaces "A cabin, a garden, and a plan", which Kalob rejected on 2026-10-27 as boring and generic (cream background, no motion). Awaiting Kalob's visual approval.
- client confirmations (2026-10-27, via Kalob): phone 662-539-7129 is current; no Horn Lake location; photo waivers signed; use the brand fonts fully
- engineering approach: Next.js 16 App Router, TypeScript, Tailwind 4, all routes static; intake demo by default, HighLevel webhook behind env switch

## Asset truth

- authentic evidence approved for publication: client photos from both Drive folders (waivers signed), except two former staff members, the two other current team members, and any photo where a child's name can be read. See "Round 3" in REVIEW-NOTES.md.
- interface assets: traced wordmark, rebuilt logo SVGs, measured sun geometry, log-course rules, arch clip paths
- fonts: Rovey (free release, letters only) + Gilda Display companion for numerals and punctuation; White Angelica; Raleway
- identity: Anna Claire and Jimbo Waldrop are named on the site; Jimbo has no job title

## Most recent work

**Task:** Round 3: Anna Claire and Jimbo's story, people and photo cleanup, "Your first visit" rewrite, copy pass
**Result (round 3):** only Anna Claire and Jimbo appear, by name; their story is on About; five photos showing people who must stay off the site were replaced; new photos from the January 2025 shoot; the first visit guide is rewritten for parents to read aloud. See "Round 3" in REVIEW-NOTES.md.

**Round 2:** header glitch, less insurance, tighter hero, human and SEO copy
**Result (round 2):** header no longer flickers while scrolling; insurance pulled out of the homepage, main nav, hero, and the screener's first step; hero rebuilt with a crossfading arch and the cabin; site copy rewritten. See "Round 2" in REVIEW-NOTES.md.

**Previous round, result:**
- New tone system and type scale.
- Homepage sections rebuilt around the arch and sun.
- Motion system built with CSS scroll-driven animations, IntersectionObserver reveals, view transitions, and Lenis on desktop.
- Interior pages carried through.
- All checks re-run. See "Redesign" in REVIEW-NOTES.md.

**Files/areas changed:** `src/app/globals.css`, `src/components/motion/*` (new), `src/components/sections/*`, `src/components/PageParts.tsx`, `ArticleLayout.tsx`, header, footer, menu, action bar, screener styling, interior pages, `review/`

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

- The repo sits in an iCloud-synced folder that creates `* 2` conflict copies; move it out of iCloud

### Blockers (launch only)

- HighLevel HIPAA add-on, BAA, inbound webhook, CORS check
- BCBA review of clinical copy; legal review of privacy page
- Ages, Medicaid/CHIP, hours

### Important

- Interior pages checked at 1440 and 390; 768/1024/1920 checked on the homepage only
- Logo is a trace of a 1080px PNG; request a vector

### Polish

- none

## Current human decision

**Decision needed:** Review round 3 (people, story, photos) and merge when Anna Claire and Jimbo approve.
**Recommendation:** Look over the round 3 PR's Vercel preview on a phone and a laptop, especially the homepage team section, About, and "Your first visit".
**Evidence to review:** the round 3 PR's Vercel preview, `review/`, or `npm run dev`

## Next action

**Next action:** Client review round (BCBA copy, open facts), then launch steps 1 to 5 in REVIEW-NOTES.md.
**Suggested model/class:** STANDARD
**Why:** Build is complete; remaining work is review and configuration.
