import { SectionHeader } from "@/components/section-header";

type PartnersSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  logos: readonly string[];
};

export function PartnersSection({ id, eyebrow, heading, supporting, logos }: PartnersSectionProps) {
  const marqueeLogos = [...logos, ...logos];

  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="mb-8 max-w-3xl" />
      <div className="group relative rounded-[var(--radius-card)] border border-border bg-background/70 p-3 focus-within:[&_.marquee-track]:[animation-play-state:paused] hover:[&_.marquee-track]:[animation-play-state:paused]">
        <div className="overflow-x-auto md:overflow-hidden">
          <div className="marquee-track flex w-max gap-3 motion-safe:animate-[marquee-left_26s_linear_infinite] motion-reduce:animate-none">
            {marqueeLogos.map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="type-eyebrow flex h-16 min-w-[160px] items-center justify-center rounded-[var(--radius-input)] border border-border bg-[var(--brand-tint-2)] px-4 text-center font-medium text-muted-foreground"
                tabIndex={0}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
