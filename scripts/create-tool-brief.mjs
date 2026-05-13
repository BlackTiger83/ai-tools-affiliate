import fs from 'node:fs';
import path from 'node:path';

const input = process.argv.slice(2).join(' ').trim();
if (!input) {
  console.error('Usage: npm run brief -- "OpusClip"');
  process.exit(1);
}
const slug = input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const title = input.replace(/\s+/g, ' ').trim();
const pages = [
  { type: 'review', url: `/tools/${slug}/review/`, keyword: `${title} review`, intent: 'commercial', angle: `Who should use ${title}, who should skip it, and what workflow it actually improves.` },
  { type: 'pricing', url: `/tools/${slug}/pricing/`, keyword: `${title} pricing`, intent: 'commercial', angle: `Plan-fit guidance without hard-coding stale prices.` },
  { type: 'alternatives', url: `/tools/${slug}/alternatives/`, keyword: `${title} alternatives`, intent: 'comparison', angle: `Decision tree by use case, budget, and workflow constraints.` },
  { type: 'comparison', url: `/compare/${slug}-vs-competitor/`, keyword: `${title} vs competitor`, intent: 'comparison', angle: `Pick a direct competitor after SERP and product research.` },
  { type: 'guide', url: `/guides/${slug}-workflow/`, keyword: `how to use ${title}`, intent: 'tutorial', angle: `Concrete workflow page that proves practical value.` }
];
const out = { tool: title, slug, createdAt: new Date().toISOString(), status: 'brief_seed', pages, next: ['Run Firecrawl/source research', 'Run DataForSEO keyword suggestions US/en', 'Replace competitor placeholder', 'Ask Steven for draft approval'] };
const dir = path.join('data', 'briefs');
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, `${slug}.json`);
fs.writeFileSync(file, JSON.stringify(out, null, 2));
console.log(JSON.stringify({ ok: true, file, pages }, null, 2));
