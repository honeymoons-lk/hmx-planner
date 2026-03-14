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
        <SectionHeader eyebrow={eyebrow} heading={heading} supporting={supporting} className="mb-12 max-w-3xl" />
        <div className="group relative focus-within:[&_.marquee-track]:[animation-play-state:paused] hover:[&_.marquee-track]:[animation-play-state:paused]">
          <div className="overflow-x-auto md:overflow-hidden border-y border-[var(--color-border-strong)] py-6">
            <div className="marquee-track flex w-max gap-12 motion-safe:animate-[marquee-left_32s_linear_infinite] motion-reduce:animate-none">
              {marqueeLogos.map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="type-eyebrow flex items-center justify-center text-center text-[var(--color-text-secondary)]"
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
