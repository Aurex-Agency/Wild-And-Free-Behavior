# Wild & Free Behavior

Website for Wild & Free Behavior, an ABA therapy practice in New Albany, Mississippi. Built by Aurex Agency.

Status: complete build, not yet deployed. Start with `REVIEW-NOTES.md`.

## Develop

```
npm install
npm run dev          # http://localhost:3000
npm test             # unit tests
npm run typecheck
npm run lint
npm run build
```

Photo derivatives are prebuilt into `public/images` from camera originals kept outside the repo:

```
npm run images                              # originals in ../homepage-mockup/assets
WFB_ASSETS=/path/to/originals npm run images
ONLY=cabin,tomato npm run images            # rebuild selected entries
```

## Launch switches

| Variable | Effect |
|---|---|
| `SITE_INDEXABLE=true` | Lets search engines index the site. Production only. |
| `NEXT_PUBLIC_INTAKE_MODE=webhook` | Sends screener contact requests to HighLevel. Only with HIPAA add-on and BAA in place. |
| `NEXT_PUBLIC_INTAKE_WEBHOOK_URL` | HighLevel inbound webhook (https). |

## Where things live

| Path | What |
|---|---|
| `src/config/site.ts` | Every business fact (name, address, phone, credentials, hours). Change facts here only. |
| `src/content/faqs.ts`, `src/content/articles.ts` | FAQ answers and guide metadata |
| `src/app/*` | Pages. Guides live under `src/app/resources/` |
| `src/lib/screener.ts` | Insurance and fit routing, pure and unit tested |
| `src/lib/intake.ts` | Demo or HighLevel webhook submission, contact validation |
| `src/lib/track.ts` | Privacy-safe conversion events (no provider installed) |
| `src/lib/schema.ts` | Structured data builders |
| `src/components/brand.tsx` | Arch clip paths, sun rays, log-course rules, field notes |
| `scripts/images.mjs` | Crops, focal points, and responsive sizes for every photo |
| `docs/` | Build plan and original phase 1 prompt |
| `review/` | Screenshots |
