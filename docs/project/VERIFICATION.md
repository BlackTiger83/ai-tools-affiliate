# Verification Log

Last checked: 2026-05-13

## Local gates

- `npm run check:content`: pass
- `npx astro check`: pass, no errors
- `npm run build`: pass, 12 pages built
- Secret-value scan outside `.env`/ignored dirs: pass
- Integration smoke tests: DataForSEO, Firecrawl, GitHub, Vercel auth pass

## GitHub

- Repository: `BlackTiger83/ai-tools-affiliate`
- Visibility: public, because the available token has `public_repo` scope only
- Main branch pushed: yes

## Vercel Preview

- Deployment URL: `https://ai-tools-affiliate-lfism7prp-teddy-1986s-projects.vercel.app`
- Stable project alias: `https://ai-tools-affiliate-teddy-1986-teddy-1986s-projects.vercel.app`
- Target: preview
- Status: Ready
- Public protection: disabled for this preview project so Steven can open the URL

## HTTP checks

- `/`: HTTP 200, `X-Robots-Tag: noindex, nofollow`
- `/tools/`: HTTP 200, `X-Robots-Tag: noindex, nofollow`
- `/robots.txt`: HTTP 200, `Disallow: /`, `X-Robots-Tag: noindex, nofollow`
- `/go/opusclip`: HTTP 404 safe placeholder, no raw affiliate destination leak, `X-Robots-Tag: noindex, nofollow`

## Launch state

Prelaunch only. No production deploy, no DNS, no GSC, no IndexNow, no indexing approval.
