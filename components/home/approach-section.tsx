"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/section-header";

type ApproachStep = {
  title: string;
  description: string;
};

type ApproachSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  steps: readonly ApproachStep[];
};

export function ApproachSection({ id, eyebrow, heading, supporting, steps }: ApproachSectionProps) {
  const [activeApproachStep, setActiveApproachStep] = useState<number | null>(null);
  const [prefersReducedMotion] = useState(
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );

  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="mb-10 max-w-3xl" />

      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute left-0 right-0 top-2.5 h-px bg-border" />
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const isActive = activeApproachStep === index;
              const isDimmed = activeApproachStep !== null && activeApproachStep !== index;
              return (
                <article
                  key={step.title}
                  className={`${prefersReducedMotion ? "" : "transition-opacity duration-200"} ${
                    isDimmed ? "opacity-60" : "opacity-100"
                  }`}
                  onMouseEnter={() => setActiveApproachStep(index)}
                  onMouseLeave={() => setActiveApproachStep(null)}
                >
                  <div className="relative pb-6">
                    <span
                      className={`${prefersReducedMotion ? "" : "transition-all duration-200"} absolute left-0 top-0 h-2 w-2 rounded-full bg-foreground ${
                        isActive ? "scale-110 opacity-100" : "scale-100 opacity-75"
                      }`}
                    />
                  </div>
                  <h3 className="type-subheading font-serif font-medium tracking-wide text-foreground">{step.title}</h3>
                  <p className="type-body mt-3 text-muted-foreground">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative space-y-8 pl-6 md:hidden">
        <div className="absolute bottom-2 left-2 top-2 w-px bg-border" />
        {steps.map((step) => (
          <article key={step.title} className="relative">
            <span className="absolute -left-[18px] top-2.5 h-2 w-2 rounded-full bg-foreground/80" />
            <h3 className="type-subheading font-serif font-medium tracking-wide text-foreground">{step.title}</h3>
            <p className="type-body mt-3 text-muted-foreground">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
