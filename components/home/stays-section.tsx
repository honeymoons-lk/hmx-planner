"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionHeader } from "@/components/section-header";

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
  const [activeByCategory, setActiveByCategory] = useState<number[]>(
    items.map((item, index) => (item.images.length ? index % item.images.length : 0)),
  );

  const hasImages = useMemo(() => items.some((item) => item.images.length > 1), [items]);

  useEffect(() => {
    if (!hasImages) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveByCategory((prev) =>
        prev.map((currentIndex, categoryIndex) => {
          const total = items[categoryIndex]?.images.length ?? 0;
          if (total <= 1) return currentIndex;
          return (currentIndex + 1) % total;
        }),
      );
    }, 4600);

    return () => window.clearInterval(timer);
  }, [hasImages, items]);

  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="md:mb-14" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:gap-8">
        {items.map((category, categoryIndex) => {
          const activeImageIndex = activeByCategory[categoryIndex] ?? 0;
          return (
            <article
              key={category.title}
              className="rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border)_78%,transparent)] bg-[var(--color-surface)] p-5 md:p-6"
            >
              <div className="space-y-2">
                <h3 className="type-subheading font-serif text-[var(--color-text)]">{category.title}</h3>
                <p className="type-body text-[var(--color-text-secondary)]">{category.description}</p>
              </div>

              <figure className="mt-5">
                <div className="relative h-[260px] overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] bg-[var(--color-bg-alt)] md:h-[280px]">
                  {category.images.map((stayImage, imageIndex) => (
                    <img
                      key={`${category.title}-${stayImage.caption || stayImage.alt}`}
                      src={stayImage.image}
                      alt={stayImage.alt}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ease-out ${
                        imageIndex === activeImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <figcaption className="type-meta mt-2 text-[color-mix(in_srgb,var(--color-text-muted)_92%,var(--color-text-secondary))]">
                  {category.images[activeImageIndex]?.caption}
                </figcaption>
              </figure>

              <div className="mt-4 flex items-center justify-between">
                <p className="type-eyebrow text-[var(--color-text-muted)]">
                  {activeImageIndex + 1} / {category.images.length}
                </p>
                <div className="flex items-center gap-1.5">
                  {category.images.map((stayImage, imageIndex) => (
                    <button
                      key={`${category.title}-${stayImage.alt}-dot`}
                      type="button"
                      aria-label={`Show ${stayImage.caption || stayImage.alt}`}
                      onClick={() =>
                        setActiveByCategory((prev) =>
                          prev.map((value, index) => (index === categoryIndex ? imageIndex : value)),
                        )
                      }
                      className={`h-1.5 rounded-full transition-all ${
                        imageIndex === activeImageIndex
                          ? "w-5 bg-[var(--color-brand)]"
                          : "w-1.5 bg-[color-mix(in_srgb,var(--color-border-strong)_82%,transparent)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </article>
          );
        })}
            </div>

      <p className="type-meta mt-8 text-muted-foreground md:mt-10">{footerNote}</p>
    </section>
  );
}
