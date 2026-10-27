# Aurex Project Status

## Current state

**Project:** Wild & Free Behavior (ABA therapy, New Albany, MS)
**Operating mode:** DEEP (new website)
**Branch:** `proof/homepage`
**PR/deployment:** PR against `main`; not deployed
**Stage:** Browser proof
**Last updated:** 2026-10-27

## Approved decisions

- verified strategy and conversion: plan in `docs/WEBSITE-BUILD-PLAN.md` (not yet client-reviewed)
- site architecture: launch sitemap in plan section 5 (proposed)
- creative direction: "A cabin, a garden, and a plan" (proposed, awaiting Kalob)
- desktop homepage: awaiting human review
- mobile homepage: awaiting human review
- page-category patterns: none yet
- engineering approach: Next.js 16 App Router, TypeScript, Tailwind 4, fully static; screener is the only meaningful client island

## Asset truth

- authentic evidence approved for publication: none yet (photo releases pending)
- interface assets: traced wordmark, rebuilt logo SVGs, measured sun geometry, log-course rules, arch clip paths
- art-direction references: none used
- temporary stand-ins: Rovey demo font (letters only), White Angelica personal-use font
- retired assets: none
- unresolved rights or identity questions: who is in each portrait; releases for all children; whether any child is a client; font licenses; vector logo

## Most recent work

**Task:** Phase 1 homepage proof plus screener demo
**Result:** Built and verified; see `REVIEW-NOTES.md`
**Files/areas changed:** whole app (`src/`), `scripts/images.mjs`, `public/`, `docs/`, `review/`

## Independent verdicts

**Technical:** Pass (proof scope)
**Visual:** Ready for human review
**Business/content:** Revise (client facts and BCBA review outstanding)

## Browser evidence

- [x] 360px
- [x] 390/393px
- [x] 430px
- [x] 768px
- [x] 1024px
- [x] 1440px
- [x] 1920px
- [x] 2560px or wider when full-bleed
- [x] motion-enabled state
- [x] static/reduced-motion state
- [x] keyboard/focus and mobile navigation
- [x] build/typecheck
- [x] primary conversion flow (demo only; no live intake by design)

## Known issues

### Blockers

- Launch only: font licenses, photo releases, HighLevel HIPAA add-on and BAA, client fact confirmations

### Important

- Mobile LCP is 3.3s on simulated slow 4G (Lighthouse Performance 92). Measure field data after deploy before tuning further.
- Logo is a trace of a 1080px PNG; request vector

### Polish

- Hero rays bleed past the viewport edge on phones by design; confirm Kalob likes it

## Current human decision

**Decision needed:** Approve or redirect the visual direction on desktop and mobile.
**Recommendation:** Approve the direction; keep the arch, rays, and photo-led rhythm for interior pages.
**Evidence to review:** `review/` screenshots or `npm run dev`

## Next action

**Next action:** After visual approval, send the client question list (plan section 14), then build the interior page bundle (ABA Therapy, Getting Started, Insurance, About, Visit, FAQ).
**Suggested model/class:** STANDARD
**Why:** Direction and system exist; interior pages reuse them.
