import { NextResponse } from "next/server";
import { SRI_LANKA_PATH } from "@/src/assets/sriLankaPath";

type LngLat = [number, number];

const STOPS: LngLat[] = [
  [79.8612, 6.9271],
  [80.7603, 7.957],
  [81.0466, 6.8667],
  [80.7974, 6.0243],
];

const STATIC_PIN_POSITIONS = [
  { x: 109, y: 349 }, // Colombo
  { x: 206, y: 184 }, // Cultural Triangle
  { x: 203, y: 292 }, // Tea Country
  { x: 243, y: 432 }, // South Coast
];

function buildCurvedRoute(points: LngLat[]) {
  if (points.length < 2) return points;
  const output: LngLat[] = [];

  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const sign = i % 2 === 0 ? 1 : -1;
    const curve = len * 0.18;
    const cx = (a[0] + b[0]) / 2 + nx * curve * sign;
    const cy = (a[1] + b[1]) / 2 + ny * curve * sign;

    const steps = 20;
    for (let tIndex = 0; tIndex <= steps; tIndex += 1) {
      const t = tIndex / steps;
      const inv = 1 - t;
      const x = inv * inv * a[0] + 2 * inv * t * cx + t * t * b[0];
      const y = inv * inv * a[1] + 2 * inv * t * cy + t * t * b[1];
      output.push([x, y]);
    }
  }

  return output;
}

function createOverlayGeoJson() {
  const route = buildCurvedRoute(STOPS);

  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          stroke: "#6E2C3A",
          "stroke-width": 2,
          "stroke-opacity": 0.92,
        },
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      },
      ...STOPS.map((coord) => ({
        type: "Feature",
        properties: {
          "marker-color": "#6E2C3A",
          "marker-size": "small",
          "marker-symbol": "",
        },
        geometry: {
          type: "Point",
          coordinates: coord,
        },
      })),
    ],
  };
}

function localSriLankaSvg() {
  const route =
    `M ${STATIC_PIN_POSITIONS[0].x} ${STATIC_PIN_POSITIONS[0].y} ` +
    `Q 152 272, ${STATIC_PIN_POSITIONS[1].x} ${STATIC_PIN_POSITIONS[1].y} ` +
    `Q 225 243, ${STATIC_PIN_POSITIONS[2].x} ${STATIC_PIN_POSITIONS[2].y} ` +
    `Q 210 364, ${STATIC_PIN_POSITIONS[3].x} ${STATIC_PIN_POSITIONS[3].y}`;

  const pinSvg = STATIC_PIN_POSITIONS.map(
    (p) => `
      <g transform="translate(${p.x} ${p.y})">
        <circle r="9" fill="rgba(110,44,58,0.12)" stroke="rgba(110,44,58,0.42)" stroke-width="1.2"/>
        <circle r="3.4" fill="#6E2C3A"/>
      </g>
    `,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1200" viewBox="0 0 420 520">
  <defs>
    <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.08)"/>
    </filter>
  </defs>
  <rect width="420" height="520" fill="#f4ece3"/>
  <path d="${SRI_LANKA_PATH}" fill="#f7efe6" stroke="#dbcab9" stroke-width="2" filter="url(#soft-shadow)"/>
  <path d="${route}" fill="none" stroke="#6E2C3A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  ${pinSvg}
</svg>`;
}

export async function GET() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (!token) {
    const svg = localSriLankaSvg();
    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  }

  const overlay = encodeURIComponent(JSON.stringify(createOverlayGeoJson()));

  const centerLng = 80.56;
  const centerLat = 6.95;
  const zoom = 7.0;

  const remoteUrl =
    `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/geojson(${overlay})/` +
    `${centerLng},${centerLat},${zoom},0,0/1400x1200@2x?access_token=${token}`;

  try {
    const upstream = await fetch(remoteUrl, { cache: "no-store" });
    if (!upstream.ok) throw new Error(await upstream.text());

    const contentType = upstream.headers.get("content-type") ?? "image/png";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch {
    const svg = localSriLankaSvg();
    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  }
}
