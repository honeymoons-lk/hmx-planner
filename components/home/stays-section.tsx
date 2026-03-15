"use client";

import { useState } from "react";
import { proxiedImageUrl } from "@/lib/media";

type StayProperty = {
  name: string;
  location: string;
  image: string;
  alt: string;
};

type StayCategory = {
  id: string;
  title: string;
  description: string;
  framingLine: string;
  reassuranceLine: string;
  properties: readonly StayProperty[];
};

type StaysSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  footerNote: string;
  items: readonly StayCategory[];
};

function StayCategoryBlock({ category, layout }: { category: StayCategory; layout: any }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`flex flex-col ${layout.container} justify-between gap-10 md:gap-16 lg:gap-0`}>
      {/* Image Side */}
      <div className={`w-[calc(100%+2rem)] -mx-4 md:w-full md:mx-0 ${layout.image}`}>
        <div className="relative w-full h-full overflow-hidden bg-[var(--color-bg-alt)] md:rounded-[2px] group/image">
          <div className="absolute inset-0 h-full w-full transition-transform duration-[2.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/image:scale-[1.03]">
            {category.properties.map((prop, idx) => (
              <img
                key={`${prop.name}-${idx}`}
                src={proxiedImageUrl(prop.image)}
                alt={prop.alt}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  idx === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Text Side */}
      <div className={`w-full flex flex-col ${layout.text}`}>
        <span className="type-eyebrow text-[var(--color-brand)] mb-5 md:mb-6 block">
          {category.framingLine}
        </span>
        
        <h3 className="type-section font-serif tracking-tight text-[var(--color-text)] mb-6 md:mb-7">
          {category.title}
        </h3>
        
        <p className="type-body-lg text-[var(--color-text-secondary)] font-light mb-12 md:mb-14 max-w-[38ch]">
          {category.description}
        </p>

        <div className="border-t border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pt-7 md:pt-8">
          <p className="type-eyebrow text-[var(--color-text-muted)] mb-5 md:mb-6">
            Curated Examples
          </p>
          <ul className="space-y-4">
            {category.properties.map((prop, idx) => {
              const isActive = idx === activeIndex;
              return (
                <li key={`${prop.name}-${prop.location}`}>
                  <button
                    type="button"
                    className="flex items-baseline gap-4 md:gap-5 group/btn w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-surface)] rounded-sm py-1"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                  >
                    <span className={`h-[1px] flex-shrink-0 relative top-[-4px] md:top-[-5px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive 
                        ? "w-6 md:w-8 bg-[var(--color-brand)]" 
                        : "w-4 md:w-6 bg-[color-mix(in_srgb,var(--color-border-strong)_60%,transparent)] group-hover/btn:bg-[color-mix(in_srgb,var(--color-brand)_40%,transparent)] group-hover/btn:w-5 md:group-hover/btn:w-7"
                    }`} />
                    <div className={`transition-opacity duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isActive ? "opacity-100" : "opacity-40 group-hover/btn:opacity-70"
                    }`}>
                      <span className="type-ui-sm text-[var(--color-text)] block mb-1">
                        {prop.name}
                      </span>
                      <span className="type-meta text-[var(--color-text-muted)] italic font-serif">
                        — {prop.location}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="type-meta mt-10 md:mt-12 text-[var(--color-text-muted)] italic font-serif max-w-[38ch]">
          {category.reassuranceLine}
        </p>
      </div>
    </div>
  );
}

export function StaysSection({ id, eyebrow, heading, supporting, footerNote, items }: StaysSectionProps) {
  const layouts = [
    {
      container: "lg:flex-row lg:items-center",
      image: "lg:w-[60%] aspect-[4/3] md:aspect-[4/5] lg:aspect-[3/4]",
      text: "lg:w-[32%] lg:pl-8 xl:pl-16",
    },
    {
      container: "lg:flex-row-reverse lg:items-end",
      image: "lg:w-[50%] aspect-[4/3] md:aspect-[4/5] lg:aspect-[4/5]",
      text: "lg:w-[40%] lg:pr-8 xl:pr-16 lg:pb-32",
    },
    {
      container: "lg:flex-row lg:items-start",
      image: "lg:w-[65%] aspect-[4/3] md:aspect-[4/5] lg:aspect-[16/9]",
      text: "lg:w-[28%] lg:pl-8 xl:pl-12 lg:pt-48",
    },
    {
      container: "lg:flex-row-reverse lg:items-center",
      image: "lg:w-[55%] aspect-[4/3] md:aspect-[4/5] lg:aspect-[3/4]",
      text: "lg:w-[35%] lg:pr-8 xl:pr-16",
    }
  ];

  return (
    <section id={id} className="section-shell w-full bg-[var(--color-surface)] pt-32 md:pt-48 lg:pt-56 rounded-t-[2.5rem] md:rounded-t-[4rem]">
      <div className="page-shell">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 lg:gap-16 mb-16 md:mb-24 lg:mb-32">
          <div className="lg:w-[60%]">
            <span className="type-eyebrow text-[var(--color-brand)] mb-5 md:mb-6 block">
              {eyebrow}
            </span>
            <h2 className="type-section font-serif tracking-tight text-[var(--color-text)] max-w-[16ch]">
              {heading}
            </h2>
          </div>
          <div className="lg:w-[32%] lg:pl-8 xl:pl-16 lg:pt-14">
            <p className="type-body-lg text-[var(--color-text-secondary)] font-light max-w-[38ch]">
              {supporting}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex flex-col gap-24 md:gap-40 lg:gap-72 w-full">
          {items.map((category, index) => (
            <StayCategoryBlock 
              key={category.id} 
              category={category} 
              layout={layouts[index % layouts.length]} 
            />
          ))}
        </div>

        <div className="mt-32 md:mt-48 border-t border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pt-12">
          <p className="type-meta max-w-[52rem] text-[var(--color-text-muted)]">
            {footerNote}
          </p>
        </div>
      </div>
    </section>
  );
}
