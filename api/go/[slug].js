export default function handler(req, res) {
  const raw = String(req.query.slug || '').toLowerCase();
  const safe = raw.replace(/[^a-z0-9-]/g, '');
  const envKey = 'AFFILIATE_' + safe.toUpperCase().replace(/-/g, '_');
  const destination = process.env[envKey];
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-store');
  if (!destination) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Partner link is not configured yet.');
    return;
  }
  try {
    const url = new URL(destination);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('invalid protocol');
  } catch {
    res.statusCode = 500;
    res.end('Partner link is misconfigured.');
    return;
  }
  res.statusCode = 302;
  res.setHeader('Location', destination);
  res.end();
}
