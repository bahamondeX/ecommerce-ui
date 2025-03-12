export function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://coffeesuyo.com/sitemap.xml
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
