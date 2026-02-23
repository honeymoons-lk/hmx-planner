#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const INPUT_PATH = path.join(ROOT, "data", "sri-lanka.geojson");
const OUTPUT_PATH = path.join(ROOT, "src", "assets", "sriLankaPath.ts");
const VIEWBOX = { width: 420, height: 520, padding: 24 };

function isPosition(value) {
  return Array.isArray(value) && value.length >= 2 && typeof value[0] === "number" && typeof value[1] === "number";
}

function flattenPositions(coordinates, acc = []) {
  if (!Array.isArray(coordinates)) return acc;
  if (isPosition(coordinates)) {
    acc.push([coordinates[0], coordinates[1]]);
    return acc;
  }
  for (const item of coordinates) flattenPositions(item, acc);
  return acc;
}

function toPathCommands(coordinates, project) {
  if (!Array.isArray(coordinates) || coordinates.length === 0) return "";
  let d = "";
  const polygonRings = Array.isArray(coordinates[0]?.[0]?.[0]) ? coordinates : [coordinates];

  for (const rings of polygonRings) {
    for (const ring of rings) {
      if (!Array.isArray(ring) || ring.length < 3) continue;
      ring.forEach((point, index) => {
        if (!isPosition(point)) return;
        const [x, y] = project(point[0], point[1]);
        d += `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
      });
      d += "Z ";
    }
  }

  return d.trim();
}

async function tryBuildWithD3(feature) {
  try {
    const d3 = await import("d3-geo");
    const projection = d3.geoMercator();
    projection.fitExtent(
      [
        [VIEWBOX.padding, VIEWBOX.padding],
        [VIEWBOX.width - VIEWBOX.padding, VIEWBOX.height - VIEWBOX.padding],
      ],
      feature,
    );
    const pathBuilder = d3.geoPath(projection);
    const d = pathBuilder(feature);
    return typeof d === "string" ? d : null;
  } catch {
    return null;
  }
}

async function main() {
  const file = await fs.readFile(INPUT_PATH, "utf8");
  const geojson = JSON.parse(file);

  const feature = geojson.features?.find(
    (item) =>
      item?.properties?.ADMIN === "Sri Lanka" ||
      item?.properties?.name === "Sri Lanka" ||
      item?.properties?.ISO_A3 === "LKA",
  );

  if (!feature?.geometry?.coordinates) {
    throw new Error("Could not find Sri Lanka feature in GeoJSON.");
  }

  const d3Path = await tryBuildWithD3(feature);

  let d = d3Path;
  if (!d3Path) {
    const points = flattenPositions(feature.geometry.coordinates);
    if (!points.length) throw new Error("No polygon coordinates found for Sri Lanka.");

    const lons = points.map(([lon]) => lon);
    const lats = points.map(([, lat]) => lat);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const lonRange = maxLon - minLon;
    const latRange = maxLat - minLat;

    const innerWidth = VIEWBOX.width - VIEWBOX.padding * 2;
    const innerHeight = VIEWBOX.height - VIEWBOX.padding * 2;
    const scale = Math.min(innerWidth / lonRange, innerHeight / latRange);

    const projectedWidth = lonRange * scale;
    const projectedHeight = latRange * scale;
    const offsetX = (VIEWBOX.width - projectedWidth) / 2;
    const offsetY = (VIEWBOX.height - projectedHeight) / 2;

    const project = (lon, lat) => {
      const x = (lon - minLon) * scale + offsetX;
      const y = (maxLat - lat) * scale + offsetY;
      return [x, y];
    };

    d = toPathCommands(feature.geometry.coordinates, project);
  }

  if (!d) throw new Error("Failed to create SVG path.");

  const output = `export const SRI_LANKA_PATH = \`${d}\`;\n`;
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, output, "utf8");
  console.log(`Wrote Sri Lanka path to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
