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
  const [activeApproachStep, setActiveApproachStep] = useState<number | null>(0);

  return (
    <section id={id} className="section-shell w-full bg-[var(--color-bg-alt)]" data-header-tone="light">
      <div className="page-shell">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-24">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+40px)]">
            <SectionHeader
              eyebrow={eyebrow}
              heading={heading}
              supporting={supporting}
              className="mb-0 max-w-none"
            />
            <div className="mt-7 h-[1px] w-12 bg-[var(--color-brand)]" aria-hidden="true" />
            <p className="type-body-lg mt-7 max-w-[34ch] text-[var(--color-text-secondary)] font-light">
              We take the friction out of Sri Lanka. From designing a route that flows beautifully to handling private drivers and reservations, we manage the journey so you can stay in the moment.
            </p>
          </div>

          <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2">
            {steps.map((step, index) => {
              const isActive = activeApproachStep === index;
              return (
                <article
                  key={step.title}
                  className="group relative border-t border-[var(--color-border-strong)] pt-8 transition-all duration-300"
                  onMouseEnter={() => setActiveApproachStep(index)}
                >
                  <div 
                    className={`absolute top-[-1px] left-0 h-[2px] bg-[var(--color-brand)] transition-all duration-500 ease-out ${
                      isActive ? "w-full" : "w-0"
                    }`} 
                  />
                  <p className="font-serif text-[26px] italic text-[var(--color-text-muted)] transition-colors duration-300 group-hover:text-[var(--color-brand)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 type-subheading font-serif text-[var(--color-text)]">
                    {step.title}
                  </h3>
                  <p className="type-body mt-4 text-[var(--color-text-secondary)] font-light">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
