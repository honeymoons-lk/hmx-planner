import { cn } from "@/lib/utils";

type TrustBridgeSectionProps = {
  eyebrow: string;
  heading: string;
  subcopy: string;
  proofPoints: readonly string[];
};

export function TrustBridgeSection({ eyebrow, heading, subcopy, proofPoints }: TrustBridgeSectionProps) {
  return (
    <section className="w-full py-16 md:py-24 bg-[var(--color-bg-alt)] border-b border-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)]">
      <div className="page-shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Context */}
          <div className="lg:col-span-6 lg:col-start-1 xl:col-span-5 xl:col-start-2 flex flex-col space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="type-eyebrow text-[var(--color-text-muted)] eyebrow-rule">
                {eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-[var(--color-text)] text-balance leading-tight">
                {heading}
              </h2>
            </div>
            <p className="type-body-lg text-[var(--color-text-secondary)] font-light max-w-[42ch]">
              {subcopy}
            </p>
          </div>

          {/* Right Column: Proof Points */}
          <div className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-8 flex flex-col justify-center space-y-6 md:space-y-8 lg:pt-2">
            {proofPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <span className="type-eyebrow text-[var(--color-brand)] mt-1 opacity-60">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <p className="type-body text-[var(--color-text)] font-light leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
