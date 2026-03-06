import { NextResponse } from "next/server";

const HERO_SOURCE =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2600&q=80";

function fallbackSvg() {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1100">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#3a2d2a"/>
      <stop offset="55%" stop-color="#5b453f"/>
      <stop offset="100%" stop-color="#8a6e5f"/>
    </linearGradient>
  </defs>
  <rect width="1800" height="1100" fill="url(#bg)"/>
</svg>`;
  return svg.trim();
}

export async function GET() {
  try {
    const response = await fetch(HERO_SOURCE, {
      cache: "force-cache",
      headers: {
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Hero image fetch failed with ${response.status}`);
    }

    const contentType = response.headers.get("content-type") ?? "image/jpeg";
    const buffer = Buffer.from(await response.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new NextResponse(fallbackSvg(), {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
}

