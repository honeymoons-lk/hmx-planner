"use client";

import { useState } from "react";
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

export function FlowMapSketch({ id, eyebrow, heading, subcopy, steps, note }: FlowMapSketchProps) {
  const [activeStopId, setActiveStopId] = useState<string | null>(null);

  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={subcopy} />

      <div className="space-y-6 lg:space-y-0">
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <div className="grid items-stretch gap-0 lg:grid-cols-[minmax(0,62vw)_minmax(0,38vw)]">
            <div className="relative min-h-[420px] overflow-hidden bg-[#f4ece3] lg:min-h-[74vh] lg:max-h-[820px]">
              <img
                src="/api/map/flow-static"
                alt="Sri Lanka honeymoon route map"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f4ece3]/58 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f4ece3]/52 to-transparent" />
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-20 bg-gradient-to-l from-[#f8f3ee]/68 to-transparent lg:w-28" />
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
