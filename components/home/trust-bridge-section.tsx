type TrustBridgeSectionProps = {
  eyebrow: string;
  heading: string;
  subcopy: string;
  proofPoints: readonly string[];
};

export function TrustBridgeSection({ eyebrow, heading, subcopy, proofPoints }: TrustBridgeSectionProps) {
  return (
    <section className="w-full border-b border-[color-mix(in_srgb,var(--color-border-strong)_42%,transparent)] bg-[var(--color-bg-alt)] py-18 md:py-24" data-header-tone="light">
      <div className="page-shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="space-y-5">
            <p className="type-eyebrow text-[var(--color-text-muted)] eyebrow-rule">{eyebrow}</p>
            <h2 className="text-4xl font-serif leading-[1.04] tracking-tight text-[var(--color-text)] md:text-5xl">
              {heading}
            </h2>
            <p className="type-body-lg max-w-[46ch] text-[var(--color-text-secondary)]">{subcopy}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-4 lg:grid-cols-1 lg:gap-0">
            {proofPoints.map((point, index) => (
              <article key={index} className="border-t border-[color-mix(in_srgb,var(--color-border-strong)_52%,transparent)] pt-5 lg:py-8">
                <p className="font-serif text-[2.2rem] leading-none text-[var(--color-brand)] md:text-[2.6rem]">
                  {index === 0 ? "30+" : `0${index + 1}`}
                </p>
                <p className="mt-3 type-body text-[var(--color-text)] font-light leading-relaxed">{point}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
