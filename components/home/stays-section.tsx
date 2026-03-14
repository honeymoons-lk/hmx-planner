"use client";

import { useEffect, useId, useState } from "react";
import { SectionHeader } from "@/components/section-header";
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

export function StaysSection({ id, eyebrow, heading, supporting, footerNote, items }: StaysSectionProps) {
  const tabsId = useId();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activePropertyIndex, setActivePropertyIndex] = useState(0);
  const activeCategory = items[activeCategoryIndex];
  const activeProperty = activeCategory?.properties[activePropertyIndex];

  useEffect(() => {
    setActivePropertyIndex(0);
  }, [activeCategoryIndex]);

  return (
    <section id={id} className="section-shell w-full">
      <div className="page-shell">
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="md:mb-20" />

        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-24">
          {/* Left: Typographic Accordion */}
          <div className="space-y-8 lg:space-y-12">
            {items.map((category, index) => {
              const isActive = index === activeCategoryIndex;
              return (
                <div key={category.id} className="group flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategoryIndex(index);
                      setActivePropertyIndex(0);
                    }}
                    className="text-left focus-visible:outline-none"
                  >
                    <h3
                      className={`type-section font-serif tracking-tight transition-colors duration-500 ${
                        isActive
                          ? "text-[var(--color-text)]"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {category.title}
                    </h3>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isActive ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="type-body max-w-[44ch] text-[var(--color-text-secondary)] font-light">
                        {category.description}
                      </p>

                      <div className="mt-10 mb-4">
                        <p className="type-eyebrow text-[var(--color-text-muted)] mb-5">
                          {category.framingLine}
                        </p>
                        <ul className="space-y-3">
                          {category.properties.map((property, pIdx) => {
                            const isPropActive = pIdx === activePropertyIndex;
                            return (
                              <li key={`${property.name}-${property.location}`}>
                                <button
                                  type="button"
                                  onMouseEnter={() => setActivePropertyIndex(pIdx)}
                                  onClick={() => setActivePropertyIndex(pIdx)}
                                  className="group/prop flex items-center gap-4 text-left focus-visible:outline-none w-full py-1"
                                >
                                  <span
                                    className={`h-[1px] transition-all duration-500 ease-out ${
                                      isPropActive
                                        ? "w-8 bg-[var(--color-brand)]"
                                        : "w-0 bg-transparent group-hover/prop:w-4 group-hover/prop:bg-[var(--color-border-strong)]"
                                    }`}
                                  />
                                  <span
                                    className={`text-[16px] transition-colors duration-300 ${
                                      isPropActive
                                        ? "text-[var(--color-text)] font-medium"
                                        : "text-[var(--color-text-secondary)] group-hover/prop:text-[var(--color-text)]"
                                    }`}
                                  >
                                    {property.name}
                                  </span>
                                  <span className="text-[14px] text-[var(--color-text-muted)] italic font-serif">
                                    — {property.location}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <p className="mt-8 max-w-[46ch] text-[14px] text-[var(--color-text-muted)] italic font-serif">
                        {category.reassuranceLine}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Cinematic Image Frame */}
          <div className="lg:sticky lg:top-[calc(var(--header-height)+40px)]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[4px] bg-[var(--color-bg-alt)]">
              {activeProperty ? (
                <img
                  key={`${activeCategory.id}-${activeProperty.name}`}
                  src={proxiedImageUrl(activeProperty.image)}
                  alt={activeProperty.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover animate-in fade-in duration-1000 ease-out"
                />
              ) : null}
            </div>
            <div className="mt-6 flex items-start justify-between gap-4 border-t border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pt-5">
              <div>
                <p className="type-subheading font-serif text-[var(--color-text)]">
                  {activeProperty?.name}
                </p>
                <p className="mt-2 type-eyebrow text-[var(--color-text-muted)]">
                  {activeProperty?.location}
                </p>
              </div>
              <span className="type-eyebrow text-[var(--color-brand)] text-right max-w-[120px]">
                {activeCategory.title}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)] pt-8 md:mt-24">
          <p className="text-[14px] max-w-[52rem] text-[var(--color-text-muted)]">
            {footerNote}
          </p>
        </div>
      </div>
    </section>
  );
}
