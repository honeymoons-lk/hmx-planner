import { NextRequest, NextResponse } from "next/server";

function fallbackSvg() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1200">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#3b302c"/>
      <stop offset="50%" stop-color="#6b564d"/>
      <stop offset="100%" stop-color="#907567"/>
    </linearGradient>
  </defs>
  <rect width="1800" height="1200" fill="url(#bg)"/>
</svg>`.trim();
}

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get("src");

  if (!src) {
    return new NextResponse("Missing src parameter", { status: 400 });
  }

  try {
    const response = await fetch(src, {
      cache: "force-cache",
      headers: {
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Upstream image fetch failed with ${response.status}`);
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

