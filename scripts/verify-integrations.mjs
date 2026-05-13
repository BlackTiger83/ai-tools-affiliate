import fs from 'node:fs';

function parseEnv(path = '.env') {
  const out = {};
  if (!fs.existsSync(path)) return out;
  for (const line of fs.readFileSync(path, 'utf8').split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#') || !line.includes('=')) continue;
    const [k, ...rest] = line.split('=');
    out[k.trim()] = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
  }
  return out;
}
const env = { ...process.env, ...parseEnv() };
async function check(name, fn) {
  try { return { name, ...(await fn()) }; }
  catch (err) { return { name, ok: false, error: err.name || 'Error' }; }
}
const results = [];
results.push(await check('DataForSEO auth', async () => {
  const token = env.DATAFORSEO_BASIC_TOKEN || (env.DATAFORSEO_LOGIN && env.DATAFORSEO_PASSWORD ? Buffer.from(`${env.DATAFORSEO_LOGIN}:${env.DATAFORSEO_PASSWORD}`).toString('base64') : '');
  if (!token) return { ok: false, status: 'missing' };
  const res = await fetch('https://api.dataforseo.com/v3/appendix/user_data', { headers: { Authorization: `Basic ${token}` } });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok && body.status_code === 20000, http: res.status, status_code: body.status_code, status_message: body.status_message };
}));
results.push(await check('Firecrawl auth', async () => {
  if (!env.FIRECRAWL_API_KEY) return { ok: false, status: 'missing' };
  const res = await fetch('https://api.firecrawl.dev/v2/team/credit-usage', { headers: { Authorization: `Bearer ${env.FIRECRAWL_API_KEY}` } });
  return { ok: res.ok, http: res.status };
}));
results.push(await check('GitHub auth', async () => {
  const token = env.GITHUB_TOKEN || env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!token) return { ok: false, status: 'missing' };
  const res = await fetch('https://api.github.com/user', { headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'ai-tools-affiliate-verify' } });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, http: res.status, login: body.login || null };
}));
results.push(await check('Vercel auth', async () => {
  if (!env.VERCEL_TOKEN) return { ok: false, status: 'missing' };
  const res = await fetch('https://api.vercel.com/v2/user', { headers: { Authorization: `Bearer ${env.VERCEL_TOKEN}` } });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, http: res.status, username: body.user?.username || body.username || null };
}));
console.log(JSON.stringify({ ok: results.every(r => r.ok || r.status === 'missing'), results }, null, 2));
