import { BriefIntakeCard } from "@/components/brief-intake-card";

export function PrivateBriefSection() {
  return (
    <section id="private-brief" className="section-shell-tight w-full bg-[var(--color-bg)]" data-header-tone="light">
      <div className="page-shell">
        <div className="mx-auto grid max-w-5xl gap-8 rounded-[14px] border border-[color-mix(in_srgb,var(--color-border)_86%,transparent)] bg-[var(--color-surface)] px-5 py-10 shadow-[0_22px_64px_rgba(34,26,22,0.08)] md:px-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-12">
          <div className="space-y-5 lg:pt-6">
            <p className="type-eyebrow text-[var(--color-brand)]">Private Journey Brief</p>
            <h2 className="text-4xl font-serif leading-[1.03] text-[var(--color-text)] md:text-5xl">
              Start with a few thoughtful details.
            </h2>
            <p className="type-body-lg max-w-[40ch] text-[var(--color-text-secondary)]">
              A few thoughtful details help us understand the rhythm, style, and level of service your journey needs.
            </p>
            <p className="type-meta text-[var(--color-text-muted)] italic">
              Best suited for couples seeking a fully curated Sri Lanka escape.
            </p>
          </div>

          <BriefIntakeCard
            id="brief-card"
            mode="starter"
            title="Begin your private brief"
            description="Concierge intake designed to shape your route and stay style before we begin planning."
            className="w-full border-[color-mix(in_srgb,var(--color-border)_85%,transparent)] bg-[var(--color-bg)]"
          />
        </div>
      </div>
    </section>
  );
}
