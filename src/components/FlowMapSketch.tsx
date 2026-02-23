"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SRI_LANKA_PATH } from "@/src/assets/sriLankaPath";

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
  prefersReducedMotion?: boolean;
};

const VIEWBOX = { width: 420, height: 520 };

const pinPositions: Record<string, { xPct: number; yPct: number }> = {
  colombo: { xPct: 0.26, yPct: 0.67 },
  cultural: { xPct: 0.49, yPct: 0.35 },
  tea: { xPct: 0.48, yPct: 0.56 },
  south: { xPct: 0.58, yPct: 0.83 },
  maldives: { xPct: 0.13, yPct: 0.92 },
};

function pointFromPct(xPct: number, yPct: number) {
  return {
    x: VIEWBOX.width * xPct,
    y: VIEWBOX.height * yPct,
  };
}

export function FlowMapSketch({
  id,
  eyebrow,
  heading,
  subcopy,
  steps,
  note,
  prefersReducedMotion = false,
}: FlowMapSketchProps) {
  const [isAnimated, setIsAnimated] = useState(false);
  const [pulsedPinIndex, setPulsedPinIndex] = useState<number | null>(null);
  const [activeStop, setActiveStop] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const routePathRef = useRef<SVGPathElement | null>(null);

  const stops = useMemo(
    () =>
      steps.map((step) => {
        const fallback = { xPct: 0.5, yPct: 0.5 };
        const pct = pinPositions[step.id] ?? fallback;
        return {
          ...step,
          ...pointFromPct(pct.xPct, pct.yPct),
        };
      }),
    [steps],
  );

  const routeD = useMemo(() => {
    const routeStops = stops.filter((stop) => stop.id !== "maldives");
    const [first, ...rest] = routeStops;
    if (!first) return "";
    let d = `M${first.x.toFixed(2)} ${first.y.toFixed(2)} `;
    for (let i = 0; i < rest.length; i += 1) {
      const prev = i === 0 ? first : rest[i - 1];
      const curr = rest[i];
      const cx = ((prev.x + curr.x) / 2).toFixed(2);
      d += `Q${cx} ${prev.y.toFixed(2)}, ${curr.x.toFixed(2)} ${curr.y.toFixed(2)} `;
    }
    return d.trim();
  }, [stops]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isAnimated) return;
    const section = sectionRef.current;
    const route = routePathRef.current;
    if (!section || !route) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        const length = route.getTotalLength();
        route.style.strokeDasharray = `${length}`;
        route.style.strokeDashoffset = `${length}`;
        route.style.transition = "none";

        requestAnimationFrame(() => {
          route.style.transition = "stroke-dashoffset 1600ms ease";
          route.style.strokeDashoffset = "0";
        });

        const timers: number[] = [];
        const doneTimer = window.setTimeout(() => setIsAnimated(true), 1600);
        timers.push(doneTimer);

        stops.forEach((_, index) => {
          const startTimer = window.setTimeout(() => setPulsedPinIndex(index), 1720 + index * 420);
          const endTimer = window.setTimeout(() => setPulsedPinIndex(null), 2010 + index * 420);
          timers.push(startTimer, endTimer);
        });

        observer.disconnect();
        return () => timers.forEach(window.clearTimeout);
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isAnimated, prefersReducedMotion, stops]);

  const islandStops = stops.filter((stop) => stop.id !== "maldives");
  const maldivesStop = stops.find((stop) => stop.id === "maldives");
  const southStop = stops.find((stop) => stop.id === "south");

  return (
    <section ref={sectionRef} id={id} className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="mb-10 max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground">{eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{heading}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{subcopy}</p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-12">
        <div className="w-full lg:max-w-[640px]">
          <svg
            viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
            width="100%"
            height="auto"
            role="img"
            aria-label="Illustrated route map of a typical Sri Lanka honeymoon flow"
            className="h-auto w-full"
          >
            <defs>
              <filter id="sketchWobble" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="5" dy="7" stdDeviation="0.6" floodOpacity="0.15" />
              </filter>
            </defs>

            <g className="sl-silhouette">
              <path id="sl-fill" d={SRI_LANKA_PATH} fill="var(--sl-fill, #D9DEE3)" filter="url(#softShadow)" />
              <g transform="translate(4, 6)" filter="url(#sketchWobble)">
                <path
                  d={SRI_LANKA_PATH}
                  fill="none"
                  stroke="rgba(0,0,0,0.16)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <g filter="url(#sketchWobble)">
                <path
                  id="sl-outline"
                  d={SRI_LANKA_PATH}
                  fill="none"
                  stroke="var(--sl-ink, #111)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>

            <path
              ref={routePathRef}
              id="sl-route"
              d={routeD}
              fill="none"
              stroke="var(--sl-route, #111)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={prefersReducedMotion ? { strokeDasharray: "none", strokeDashoffset: 0 } : undefined}
            />

            {southStop && maldivesStop ? (
              <path
                d={`M${southStop.x.toFixed(2)} ${southStop.y.toFixed(2)} C${(southStop.x - 35).toFixed(2)} ${(southStop.y + 18).toFixed(2)}, ${(maldivesStop.x + 32).toFixed(2)} ${(maldivesStop.y - 16).toFixed(2)}, ${maldivesStop.x.toFixed(2)} ${maldivesStop.y.toFixed(2)}`}
                fill="none"
                stroke="rgba(0,0,0,0.35)"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 7"
              />
            ) : null}

            {islandStops.map((pin, index) => {
              const highlighted = activeStop === index;
              const pulsing = pulsedPinIndex === index && !prefersReducedMotion;
              return (
                <g
                  key={pin.id}
                  className={`pin ${pulsing ? "pin-pulse" : ""}`}
                  filter="url(#sketchWobble)"
                  transform={`translate(${pin.x.toFixed(2)}, ${pin.y.toFixed(2)})`}
                  onMouseEnter={() => setActiveStop(index)}
                  onMouseLeave={() => setActiveStop(null)}
                >
                  <circle r={pulsing || highlighted ? 10.6 : 9.8} fill="#111" style={{ transition: "all 280ms ease" }} />
                  <circle
                    r={pulsing || highlighted ? 14.5 : 13.6}
                    fill="none"
                    stroke="rgba(0,0,0,0.35)"
                    strokeWidth="2.8"
                    style={{ transition: "all 280ms ease" }}
                  />
                </g>
              );
            })}

            {maldivesStop ? (
              <g
                className={`pin ${pulsedPinIndex === 4 && !prefersReducedMotion ? "pin-pulse" : ""}`}
                filter="url(#sketchWobble)"
                transform={`translate(${maldivesStop.x.toFixed(2)}, ${maldivesStop.y.toFixed(2)})`}
                onMouseEnter={() => setActiveStop(4)}
                onMouseLeave={() => setActiveStop(null)}
              >
                <circle r={pulsedPinIndex === 4 || activeStop === 4 ? 10.6 : 9.8} fill="#111" style={{ transition: "all 280ms ease" }} />
                <circle
                  r={pulsedPinIndex === 4 || activeStop === 4 ? 14.5 : 13.6}
                  fill="none"
                  stroke="rgba(0,0,0,0.35)"
                  strokeWidth="2.8"
                  style={{ transition: "all 280ms ease" }}
                />
              </g>
            ) : null}
          </svg>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <article
              key={step.id}
              className={`rounded-lg px-3 py-2 transition-colors ${activeStop === index ? "bg-[var(--brand-tint-2)]" : ""}`}
              onMouseEnter={() => setActiveStop(index)}
              onMouseLeave={() => setActiveStop(null)}
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <h3 className="text-base font-semibold text-foreground">{step.stop}</h3>
                <span className="text-xs font-medium text-muted-foreground">{step.nights}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.caption}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="mt-7 text-sm leading-relaxed text-muted-foreground">{note}</p>
    </section>
  );
}
