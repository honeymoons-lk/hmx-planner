"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHeader } from "@/components/section-header";

type FlowStep = {
  id: string;
  stop: string;
  nights: string;
  caption: string;
};

type FlowMapSketchProps = {
  id: string;
  eyebrow: string;
  heading: string;
  subcopy: string;
  steps: readonly FlowStep[];
  note: string;
};

type LngLat = [number, number];

type MapboxMap = {
  on: (event: string, cb: () => void) => void;
  remove: () => void;
  addSource: (id: string, source: unknown) => void;
  addLayer: (layer: unknown) => void;
  getStyle: () => { layers?: Array<{ id: string; type?: string }> };
  setLayoutProperty: (layerId: string, name: string, value: unknown) => void;
  setPaintProperty: (layerId: string, name: string, value: unknown) => void;
  fitBounds: (bounds: [[number, number], [number, number]], options?: unknown) => void;
  dragRotate: { disable: () => void };
  touchZoomRotate: { disableRotation: () => void };
  scrollZoom: { disable: () => void };
  boxZoom: { disable: () => void };
  dragPan: { disable: () => void };
  doubleClickZoom: { disable: () => void };
  keyboard: { disable: () => void };
};

type MapboxMarker = {
  setLngLat: (lngLat: LngLat) => MapboxMarker;
  addTo: (map: MapboxMap) => MapboxMarker;
  remove: () => void;
};

type MapboxCtor = {
  accessToken: string;
  Map: new (options: unknown) => MapboxMap;
  Marker: new (options?: unknown) => MapboxMarker;
};

declare global {
  interface Window {
    mapboxgl?: MapboxCtor;
  }
}

const STOP_COORDS: Record<string, LngLat> = {
  colombo: [79.8612, 6.9271],
  cultural: [80.7603, 7.957],
  tea: [81.0466, 6.8667],
  south: [80.7974, 6.0243],
};

const MAP_BOUNDS: [[number, number], [number, number]] = [
  [79.4, 5.75],
  [81.35, 8.55],
];

function createMarkerElement() {
  const marker = document.createElement("button");
  marker.type = "button";
  marker.setAttribute("aria-label", "Journey stop");
  marker.style.width = "18px";
  marker.style.height = "18px";
  marker.style.border = "0";
  marker.style.borderRadius = "999px";
  marker.style.background = "transparent";
  marker.style.padding = "0";
  marker.style.cursor = "default";
  marker.style.display = "grid";
  marker.style.placeItems = "center";
  marker.style.transition = "transform 220ms ease";

  const halo = document.createElement("span");
  halo.style.width = "18px";
  halo.style.height = "18px";
  halo.style.borderRadius = "999px";
  halo.style.border = "1px solid rgba(110, 44, 58, 0.38)";
  halo.style.background = "rgba(110, 44, 58, 0.1)";
  halo.style.display = "grid";
  halo.style.placeItems = "center";
  halo.style.transition = "all 220ms ease";

  const dot = document.createElement("span");
  dot.style.width = "7px";
  dot.style.height = "7px";
  dot.style.borderRadius = "999px";
  dot.style.background = "#6e2c3a";
  dot.style.boxShadow = "0 2px 6px rgba(28, 23, 21, 0.12)";

  halo.appendChild(dot);
  marker.appendChild(halo);

  return { marker, halo };
}

function setMarkerActiveState(marker: HTMLElement, halo: HTMLElement, active: boolean) {
  marker.style.transform = active ? "scale(1.08)" : "scale(1)";
  halo.style.background = active ? "rgba(110, 44, 58, 0.16)" : "rgba(110, 44, 58, 0.1)";
  halo.style.borderColor = active ? "rgba(110, 44, 58, 0.58)" : "rgba(110, 44, 58, 0.38)";
}

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

    const steps = 16;
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

function styleMapEditorial(map: MapboxMap) {
  const layers = map.getStyle().layers ?? [];

  for (const layer of layers) {
    const id = layer.id;
    const type = layer.type ?? "";

    const hideLayer =
      type === "symbol" ||
      id.includes("road") ||
      id.includes("transit") ||
      id.includes("poi") ||
      id.includes("airport") ||
      id.includes("building") ||
      id.includes("hillshade") ||
      id.includes("contour");

    if (hideLayer) {
      try {
        map.setLayoutProperty(id, "visibility", "none");
      } catch {
        // Layer can be non-layout or immutable in current style fragment.
      }
    }

    if (id.includes("background")) {
      try {
        map.setPaintProperty(id, "background-color", "#f4ece3");
      } catch {}
    }

    if (id.includes("water") && type === "fill") {
      try {
        map.setPaintProperty(id, "fill-color", "#ebe1d3");
        map.setPaintProperty(id, "fill-opacity", 1);
      } catch {}
    }

    if ((id.includes("land") || id.includes("landuse")) && type === "fill") {
      try {
        map.setPaintProperty(id, "fill-color", "#f7efe6");
      } catch {}
    }

    if ((id.includes("coast") || id.includes("admin") || id.includes("boundary")) && type === "line") {
      try {
        map.setPaintProperty(id, "line-color", "#dfd0c0");
        map.setPaintProperty(id, "line-opacity", 0.45);
      } catch {}
    }
  }
}

function loadMapboxGl() {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  if (window.mapboxgl) return Promise.resolve(window.mapboxgl);

  return new Promise<MapboxCtor>((resolve, reject) => {
    const cssId = "mapbox-gl-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
      document.head.appendChild(link);
    }

    const scriptId = "mapbox-gl-js";
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => {
        if (window.mapboxgl) resolve(window.mapboxgl);
      });
      existing.addEventListener("error", () => reject(new Error("Failed loading Mapbox GL JS")));
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.async = true;
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js";
    script.onload = () => {
      if (window.mapboxgl) resolve(window.mapboxgl);
      else reject(new Error("Mapbox GL loaded but unavailable"));
    };
    script.onerror = () => reject(new Error("Failed loading Mapbox GL JS"));
    document.body.appendChild(script);
  });
}

export function FlowMapSketch({ id, eyebrow, heading, subcopy, steps, note }: FlowMapSketchProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markersRef = useRef<Array<{ id: string; marker: MapboxMarker; el: HTMLElement; halo: HTMLElement }>>([]);

  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error" | "missing-token">("loading");
  const mapIsReadyRef = useRef(false);

  const routePoints = useMemo(
    () =>
      steps
        .map((step) => ({ step, point: STOP_COORDS[step.id] }))
        .filter((entry): entry is { step: FlowStep; point: LngLat } => Boolean(entry.point)),
    [steps],
  );

  useEffect(() => {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    if (!mapboxToken) {
      setMapStatus("missing-token");
      return;
    }

    let cancelled = false;
    let loadTimeout: number | null = null;

    async function initMap() {
      if (!mapContainerRef.current) return;

      try {
        const mapboxgl = await loadMapboxGl();
        if (cancelled || !mapContainerRef.current) return;

        // Avoid non-essential telemetry/event calls that blockers commonly block.
        try {
          (mapboxgl as unknown as { setTelemetryEnabled?: (enabled: boolean) => void }).setTelemetryEnabled?.(false);
        } catch {}

        mapboxgl.accessToken = mapboxToken!;

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/light-v11",
          attributionControl: false,
          logoPosition: "bottom-right",
          cooperativeGestures: true,
        });

        mapRef.current = map;

        loadTimeout = window.setTimeout(() => {
          if (!cancelled) {
            setMapStatus("error");
          }
        }, 12000);

        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();
        map.scrollZoom.disable();
        map.boxZoom.disable();
        map.dragPan.disable();
        map.doubleClickZoom.disable();
        map.keyboard.disable();

        map.on("load", () => {
          if (loadTimeout) window.clearTimeout(loadTimeout);
          mapIsReadyRef.current = true;
          styleMapEditorial(map);

          const routeLine = buildCurvedRoute(routePoints.map((item) => item.point));

          map.addSource("journey-route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: routeLine,
              },
            },
          });

          map.addLayer({
            id: "journey-route-halo",
            type: "line",
            source: "journey-route",
            paint: {
              "line-color": "rgba(110, 44, 58, 0.16)",
              "line-width": 5,
              "line-blur": 0.4,
            },
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
          });

          map.addLayer({
            id: "journey-route-line",
            type: "line",
            source: "journey-route",
            paint: {
              "line-color": "#6E2C3A",
              "line-width": 2,
              "line-opacity": 0.92,
            },
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
          });

          markersRef.current = routePoints.map(({ step, point }) => {
            const { marker: markerEl, halo } = createMarkerElement();
            const marker = new mapboxgl.Marker({ element: markerEl, anchor: "center" })
              .setLngLat(point)
              .addTo(map);

            markerEl.addEventListener("mouseenter", () => setActiveStopId(step.id));
            markerEl.addEventListener("mouseleave", () => setActiveStopId(null));

            return { id: step.id, marker, el: markerEl, halo };
          });

          map.fitBounds(MAP_BOUNDS, {
            padding: { top: 56, right: 48, bottom: 56, left: 48 },
            duration: 0,
          });

          setMapStatus("ready");
        });

        map.on("error", (...args: unknown[]) => {
          if (cancelled) return;

          const payload = (args[0] ?? {}) as { error?: { message?: string } };
          const msg = payload.error?.message ?? "";
          const isMethodNotAllowed = msg.toLowerCase().includes("method not allowed");

          // Ignore common non-fatal endpoint noise (e.g., telemetry/events) once map is usable.
          if (mapIsReadyRef.current && isMethodNotAllowed) return;
          if (mapIsReadyRef.current) return;

          setMapStatus("error");
        });
      } catch {
        if (!cancelled) setMapStatus("error");
      }
    }

    initMap();

    return () => {
      cancelled = true;
      mapIsReadyRef.current = false;
      if (loadTimeout) window.clearTimeout(loadTimeout);
      markersRef.current.forEach((item) => item.marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [routePoints]);

  useEffect(() => {
    for (const marker of markersRef.current) {
      setMarkerActiveState(marker.el, marker.halo, marker.id === activeStopId);
    }
  }, [activeStopId]);

  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={subcopy} />

      <div className="space-y-6 lg:space-y-0">
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <div className="grid items-stretch gap-0 lg:grid-cols-[minmax(0,62vw)_minmax(0,38vw)]">
            <div className="relative min-h-[420px] lg:min-h-[74vh] lg:max-h-[820px]">
              <div
                ref={mapContainerRef}
                className="absolute inset-0 z-10 w-full overflow-hidden bg-[#f4ece3]"
                aria-label="Map showing a typical Sri Lanka honeymoon journey"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f4ece3]/58 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f4ece3]/52 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-20 bg-gradient-to-l from-[#f8f3ee]/68 to-transparent lg:w-28" />

              {mapStatus !== "ready" ? (
                <div className="pointer-events-none absolute inset-0 grid place-items-center bg-[#f4ece3]/78 px-6 text-center">
                  <p className="type-ui-sm text-[var(--color-text-secondary)]">
                    {mapStatus === "missing-token"
                      ? "Add NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to .env.local to render the journey map."
                      : mapStatus === "error"
                        ? "Unable to load live map. Check network, token restrictions, and blocker settings."
                        : "Loading editorial route map..."}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="relative bg-[color-mix(in_srgb,var(--color-bg)_90%,var(--color-bg-alt))] px-6 py-8 md:px-10 lg:px-12 lg:py-14">
              <div className="mx-auto max-w-[460px] space-y-5 lg:sticky lg:top-24">
                {steps.map((step) => {
                  const active = activeStopId === step.id;
                  return (
                    <article
                      key={step.id}
                      className={`px-1 py-2 transition-colors ${active ? "bg-[color-mix(in_srgb,var(--color-bg-alt)_62%,transparent)]" : ""}`}
                      onMouseEnter={() => setActiveStopId(step.id)}
                      onMouseLeave={() => setActiveStopId(null)}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        <h3 className="type-subheading font-serif font-medium text-foreground">{step.stop}</h3>
                        <span className="type-eyebrow text-muted-foreground">{step.nights}</span>
                      </div>
                      <p className="type-body mt-2 text-muted-foreground">{step.caption}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="type-body mt-7 text-muted-foreground">{note}</p>
    </section>
  );
}
