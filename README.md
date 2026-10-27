# Wild & Free Behavior

Website for Wild & Free Behavior, an ABA therapy practice in New Albany, Mississippi. Built by Aurex Agency.

Current stage: homepage browser proof (noindex, not deployed). Start with `REVIEW-NOTES.md`.

## Develop

```
npm install
npm run dev          # http://localhost:3000
npm test             # screener routing tests
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

## Where things live

| Path | What |
|---|---|
| `src/config/site.ts` | Every business fact (name, address, phone, credentials, hours). Change facts here only. |
| `src/lib/screener.ts` | Insurance and fit routing, pure and unit tested |
| `src/components/screener/copy.ts` | Screener wording for staff review |
| `src/components/brand.tsx` | Arch clip paths, sun rays, log-course rules, field notes |
| `src/lib/sun.ts` | Sun geometry measured from the logo |
| `scripts/images.mjs` | Crops, focal points, and responsive sizes for every photo |
| `docs/` | Build plan and phase 1 prompt |
| `review/` | Proof screenshots |
