<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes (Wild & Free Behavior)

- Follow the Aurex Website OS (`/Users/kalobadair/Aurex/Aurex-Website-OS/CLAUDE.md`). Read `AUREX-STATUS.md` and `REVIEW-NOTES.md` before changing anything.
- Business facts live only in `src/config/site.ts`. Never invent hours, prices, reviews, emails, or insurance outcomes.
- Rovey is the demo font until the license is bought: any text set with the `display` class must be letters and spaces only.
- No em or en dashes in site copy. No ad pixels or session replay. The screener sends nothing until a HIPAA-covered HighLevel intake exists.
- Camera originals stay outside the repo; regenerate derivatives with `npm run images`.
