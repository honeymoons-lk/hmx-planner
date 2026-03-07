"use client";

import { useEffect, useId, useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { proxiedImageUrl } from "@/lib/media";

type StayCategory = {
  title: string;
  description: string;
  image: string;
  alt: string;
  properties: readonly string[];
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
  const [isPaused, setIsPaused] = useState(false);
  const activeCategory = items[activeCategoryIndex];

  useEffect(() => {
    if (items.length <= 1) return;
    if (isPaused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveCategoryIndex((prev) => (prev + 1) % items.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [items.length, isPaused]);

  return (
    <section
      id={id}
      className="w-full py-[var(--section-space-mobile)] md:py-[var(--section-space-desktop)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="md:mb-12" />

        <div className="-mx-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label="Stay categories"
            className="inline-flex min-w-full items-center gap-5 border-b border-[color-mix(in_srgb,var(--color-border)_76%,transparent)] pb-3"
          >
            {items.map((category, index) => (
              <button
                key={category.title}
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
                className={`type-ui-sm relative shrink-0 pb-2 text-left transition-colors ${
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
      </div>

      <div className="relative mt-8 left-1/2 w-screen -translate-x-1/2">
        <div
          key={activeCategory.title}
          role="tabpanel"
          id={`${tabsId}-panel-${activeCategoryIndex}`}
          aria-labelledby={`${tabsId}-tab-${activeCategoryIndex}`}
        >
          <div className="relative h-[70vh] min-h-[420px] overflow-hidden bg-[var(--color-bg-alt)]">
            <img
              src={proxiedImageUrl(activeCategory.image)}
              alt={activeCategory.alt}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-opacity duration-300 ease-out motion-reduce:transition-none"
            />
          </div>

          <div className="mx-auto mt-7 grid w-full max-w-6xl gap-4 px-4 md:mt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:px-6">
            <div>
              <h3 className="type-section text-[var(--color-text)]">{activeCategory.title}</h3>
              <p className="type-body mt-2 max-w-[65ch] text-[var(--color-text-secondary)]">{activeCategory.description}</p>
              <p className="type-meta mt-4 text-[color-mix(in_srgb,var(--color-text-muted)_94%,var(--color-text-secondary))]">
                {activeCategory.properties.join(" · ")}
              </p>
            </div>
            <p className="type-eyebrow text-[var(--color-text-muted)]">
              {activeCategoryIndex + 1} / {items.length}
            </p>
          </div>
        </div>
      </div>

      <p className="type-meta mx-auto mt-7 w-full max-w-6xl px-4 text-muted-foreground md:mt-9 md:px-6">
        {footerNote}
      </p>
    </section>
  );
}
