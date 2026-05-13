import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'src', 'content');
const distDir = path.join(root, 'dist');
const errors = [];
const warnings = [];
const rawAffiliatePatterns = [
  /[?&](ref|aff|affiliate|utm_source)=/i,
  /partnerstack\.com/i,
  /impact\.com/i,
  /shareasale\.com/i,
  /awin1\.com/i,
  /cj\.com/i
];

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

for (const file of walk(contentDir).filter(f => /\.mdx?$/.test(f))) {
  const raw = fs.readFileSync(file, 'utf8');
  const parsed = matter(raw);
  const rel = path.relative(root, file);
  for (const pattern of rawAffiliatePatterns) {
    if (pattern.test(raw)) errors.push(`${rel}: possible raw affiliate URL pattern ${pattern}`);
  }
  for (const field of ['title', 'description', 'status', 'cluster', 'intent', 'risk']) {
    if (!parsed.data[field]) errors.push(`${rel}: missing frontmatter ${field}`);
  }
  if (/\b(und|oder|nicht|Preis|Vergleich)\b/.test(parsed.content)) {
    warnings.push(`${rel}: possible German public-copy word, review manually`);
  }
  if ((parsed.data.status === 'published' || parsed.data.status === 'approved') && parsed.data.risk === 'high') {
    errors.push(`${rel}: high-risk content cannot be approved/published without manual override`);
  }
}

if (fs.existsSync(distDir)) {
  for (const file of walk(distDir).filter(f => /\.(html|js|txt)$/.test(f))) {
    const raw = fs.readFileSync(file, 'utf8');
    for (const pattern of rawAffiliatePatterns) {
      if (pattern.test(raw)) errors.push(`${path.relative(root, file)}: built artifact contains raw affiliate URL pattern ${pattern}`);
    }
  }
}

console.log(JSON.stringify({ ok: errors.length === 0, errors, warnings }, null, 2));
if (errors.length) process.exit(1);
