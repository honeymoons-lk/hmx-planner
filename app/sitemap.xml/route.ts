const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunavoyages.com";

const routes = [
  "",
  "/sri-lanka",
  "/sri-lanka/about",
  "/sri-lanka/experiences",
  "/sri-lanka/itineraries",
  "/about",
  "/partner-with-us",
  "/book-a-call",
  "/plan/journey",
  "/privacy-policy",
  "/terms",
  "/sitemap",
] as const;

export function GET() {
  const lastModified = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
