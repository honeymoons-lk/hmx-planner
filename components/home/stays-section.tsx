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
    <section id={id} className="w-full py-[var(--section-space-mobile)] md:py-[var(--section-space-desktop)]">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="md:mb-12" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,40%)_minmax(0,60%)] lg:gap-14 xl:gap-16">
          <div>
            <div className="-mx-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div
                role="tablist"
                aria-label="Stay categories"
                className="inline-flex min-w-full items-center gap-5 border-b border-[color-mix(in_srgb,var(--color-border)_76%,transparent)] pb-3"
              >
                {items.map((category, index) => (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    id={`${tabsId}-tab-${index}`}
                    aria-controls={`${tabsId}-panel-${index}`}
                    aria-selected={index === activeCategoryIndex}
                    tabIndex={index === activeCategoryIndex ? 0 : -1}
                    onClick={() => setActiveCategoryIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight") {
                        event.preventDefault();
                        setActiveCategoryIndex((prev) => (prev + 1) % items.length);
                      }
                      if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        setActiveCategoryIndex((prev) => (prev - 1 + items.length) % items.length);
                      }
                    }}
                    className={`type-ui-sm relative shrink-0 pb-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${
                      index === activeCategoryIndex
                        ? "text-[var(--color-text)]"
                        : "text-[color-mix(in_srgb,var(--color-text-muted)_92%,var(--color-text-secondary))] hover:text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {category.title}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-[var(--color-brand)] transition-all ${
                        index === activeCategoryIndex ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div
              key={activeCategory.id}
              role="tabpanel"
              id={`${tabsId}-panel-${activeCategoryIndex}`}
              aria-labelledby={`${tabsId}-tab-${activeCategoryIndex}`}
              className="mt-10 md:mt-12"
            >
              <h3 className="type-section text-[var(--color-text)]">{activeCategory.title}</h3>
              <p className="type-body mt-4 max-w-[46ch] text-[var(--color-text-secondary)]">{activeCategory.description}</p>

              <p className="type-meta mt-9 text-[color-mix(in_srgb,var(--color-text-muted)_90%,var(--color-text-secondary))]">
                {activeCategory.framingLine}
              </p>

              <div className="mt-5 space-y-4 md:space-y-[18px]">
                {activeCategory.properties.map((property, index) => {
                  const isActive = index === activePropertyIndex;
                  return (
                    <button
                      key={`${property.name}-${property.location}`}
                      type="button"
                      onMouseEnter={() => setActivePropertyIndex(index)}
                      onFocus={() => setActivePropertyIndex(index)}
                      onClick={() => setActivePropertyIndex(index)}
                      className={`group flex w-full items-start gap-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${
                        isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"
                      }`}
                      aria-label={`Preview ${property.name} in ${property.location}`}
                    >
                      <span aria-hidden className="mt-1 inline-flex h-6 w-1 items-center justify-center">
                        {isActive ? <span className="h-4 w-px bg-[color-mix(in_srgb,var(--color-brand)_82%,var(--color-text))]" /> : null}
                      </span>
                      <span className="font-sans text-[17px] leading-[1.55]">
                        <span className={`font-medium ${isActive ? "text-[var(--color-text)]" : ""}`}>{property.name}</span>
                        <span className="mx-2 text-[color-mix(in_srgb,var(--color-text-muted)_85%,var(--color-border-strong))]">
                          —
                        </span>
                        <span className="text-[color-mix(in_srgb,var(--color-text-secondary)_88%,var(--color-text-muted))]">
                          {property.location}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="type-meta mt-9 max-w-[46ch] text-[var(--color-text-muted)]">{activeCategory.reassuranceLine}</p>
            </div>
          </div>

          <div className="lg:pt-2 xl:mr-[-140px] 2xl:mr-[-180px]">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-bg-alt)] md:aspect-[4/3] lg:aspect-[16/10]">
              {activeProperty ? (
                <img
                  key={`${activeCategory.id}-${activeProperty.name}`}
                  src={proxiedImageUrl(activeProperty.image)}
                  alt={activeProperty.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-opacity duration-300 ease-out motion-reduce:transition-none"
                />
              ) : null}
            </div>
            <div className="mt-5">
              <p className="type-subheading text-[var(--color-text)]">{activeProperty?.name}</p>
              <p className="type-meta mt-2 text-[var(--color-text-muted)]">{activeProperty?.location}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="type-meta mx-auto mt-7 w-full max-w-6xl px-4 text-muted-foreground md:mt-9 md:px-6">
        {footerNote}
      </p>
    </section>
  );
}
