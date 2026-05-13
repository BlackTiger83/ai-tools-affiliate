# AI Tools Affiliate

English-language AI-tools affiliate portal operated by the Hermes `aitools` profile.

Current state: prelaunch, preview-only, noindex.

## Default workflow

1. Send a tool name to the Telegram bot.
2. Agent researches public sources and DataForSEO opportunities.
3. Agent proposes five page briefs.
4. Steven approves selected briefs.
5. Agent writes review-status MDX drafts.
6. Agent runs gates and creates a Vercel Preview.
7. Production and indexing require explicit approval.

## Commands

```bash
npm run check:content
npx astro check
npm run build
npm run brief -- OpusClip
npm run verify:integrations
```

## Safety

- Public copy is English-only.
- Preview stays `noindex,nofollow`.
- No GSC/IndexNow until launch approval.
- Affiliate CTAs use `/go/<slug>` only.
- Raw affiliate URLs and secrets must not appear in MDX or built HTML.
