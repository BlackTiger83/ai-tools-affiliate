export function GET() {
  return new Response(`User-agent: *
Disallow: /
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow'
    }
  });
}
