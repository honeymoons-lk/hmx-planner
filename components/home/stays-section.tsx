"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { proxiedImageUrl } from "@/lib/media";

type StayImage = {
  image: string;
  alt: string;
  caption?: string;
};

type StayCategory = {
  title: string;
  description: string;
  images: readonly StayImage[];
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
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeCategory = items[activeCategoryIndex];
  const activeImages = activeCategory?.images ?? [];

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeCategoryIndex]);

  useEffect(() => {
    if (!activeImages.length || activeImages.length === 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % activeImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [activeImages]);

  return (
    <section id={id} className="w-full py-[var(--section-space-mobile)] md:py-[var(--section-space-desktop)]">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="md:mb-12" />

        <div className="-mx-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="inline-flex min-w-full items-center gap-5 border-b border-[color-mix(in_srgb,var(--color-border)_76%,transparent)] pb-3">
            {items.map((category, index) => (
              <button
                key={category.title}
                type="button"
                onClick={() => setActiveCategoryIndex(index)}
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
        <div className="relative h-[48vh] min-h-[340px] overflow-hidden bg-[var(--color-bg-alt)] md:h-[54vh] lg:h-[1080px] lg:min-h-[1080px] lg:max-h-[1080px]">
          {activeImages.map((stayImage, imageIndex) => (
            <img
              key={`${activeCategory.title}-${stayImage.caption || stayImage.alt}`}
              src={proxiedImageUrl(stayImage.image)}
              alt={stayImage.alt}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
                imageIndex === activeImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.24)_40%,rgba(0,0,0,0.08)_68%,rgba(0,0,0,0.02)_100%)]" />

          <div className="absolute bottom-7 left-5 right-5 z-10 md:bottom-9 md:left-8 md:right-8 lg:left-10 lg:right-10">
            <h3 className="type-section max-w-[18ch] font-serif text-[color-mix(in_srgb,var(--color-light)_94%,var(--color-bg-alt))]">
              {activeCategory.title}
            </h3>
            <p className="type-body mt-2 max-w-[56ch] text-[color-mix(in_srgb,var(--color-light)_88%,var(--color-bg-alt))]">
              {activeCategory.description}
            </p>
            <p className="type-meta mt-2 text-[color-mix(in_srgb,var(--color-light)_76%,var(--color-bg-alt))]">
              {activeImages[activeImageIndex]?.caption}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 flex w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <p className="type-eyebrow text-[var(--color-text-muted)]">
          {activeImageIndex + 1} / {Math.max(activeImages.length, 1)}
        </p>
        <div className="flex items-center gap-1.5">
          {activeImages.map((stayImage, imageIndex) => (
            <button
              key={`${stayImage.alt}-dot`}
              type="button"
              aria-label={`Show ${stayImage.caption || stayImage.alt}`}
              onClick={() => setActiveImageIndex(imageIndex)}
              className={`h-1.5 rounded-full transition-all ${
                imageIndex === activeImageIndex
                  ? "w-6 bg-[var(--color-brand)]"
                  : "w-2 bg-[color-mix(in_srgb,var(--color-border-strong)_86%,transparent)]"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="type-meta mx-auto mt-7 w-full max-w-6xl px-4 text-muted-foreground md:mt-9 md:px-6">
        {footerNote}
      </p>
    </section>
  );
}
