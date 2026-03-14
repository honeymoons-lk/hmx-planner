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
    <section id={id} className="section-shell-tight w-full">
      <div className="page-shell">
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="mb-8 max-w-3xl" />
        <div className="premium-panel group relative rounded-[30px] p-3 focus-within:[&_.marquee-track]:[animation-play-state:paused] hover:[&_.marquee-track]:[animation-play-state:paused]">
          <div className="overflow-x-auto md:overflow-hidden">
            <div className="marquee-track flex w-max gap-3 motion-safe:animate-[marquee-left_26s_linear_infinite] motion-reduce:animate-none">
              {marqueeLogos.map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="type-eyebrow flex h-16 min-w-[164px] items-center justify-center rounded-[20px] border border-[color-mix(in_srgb,var(--color-border)_72%,transparent)] bg-[color-mix(in_srgb,var(--color-surface-strong)_72%,var(--color-bg-alt))] px-4 text-center font-medium text-[var(--color-text-secondary)]"
                  tabIndex={0}
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
