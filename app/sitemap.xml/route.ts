import { getAllProducts } from "@/lib/products";

export async function GET() {
  const baseUrl = "https://coffeesuyo.com";

  // Get all products for dynamic routes
  const products = await getAllProducts();

  // Static routes
  const staticRoutes = [
    "",
    "/products",
    "/about",
    "/contact",
    "/blog",
    "/faq",
    "/shipping",
    "/privacy",
    "/terms",
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === "" ? "daily" : "weekly"}</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>
  `,
    )
    .join("")}
  ${products
    .map(
      (product) => `
  <url>
    <loc>${baseUrl}/products/${product.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  `,
    )
    .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
