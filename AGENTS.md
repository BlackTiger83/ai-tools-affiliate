# AGENTS.md — AI Tools Affiliate

## Project

Build an English AI-tools affiliate authority portal. Current state is prelaunch/preview-only.

## Workdir

`/home/hermes/ai-tools-affiliate`

## Stack

Astro + MDX + TypeScript + Zod, Vercel Preview, DataForSEO, Firecrawl, GitHub.

## Commands

```bash
npm run check:content
npx astro check
npm run build
npm run brief -- OpusClip
```

## Rules

- Public copy must be English.
- Keep preview/staging noindex.
- Do not production deploy or index without explicit approval.
- Do not invent pricing, features, metrics, discounts, or hands-on testing.
- Store volatile facts in `data/` or `evidence/`, not Hermes memory.
- No raw affiliate URLs in MDX or built HTML. Use `/go/<slug>` and `rel="sponsored nofollow"`.
- Secrets only in `.env`, `.secrets/`, Vercel/GitHub stores, or profile env. Never commit them.

## Definition of done for preview work

- Content gate passes.
- Astro check passes.
- Build passes.
- Vercel preview is created.
- Preview has `X-Robots-Tag: noindex, nofollow`.
- `/robots.txt` disallows all while prelaunch.
