import { BriefIntakeCard } from "@/components/brief-intake-card";
import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";
import { ProgressIndicator } from "@/components/plan/progress-indicator";
import { proxiedImageUrl } from "@/lib/media";

const journeyImage =
  "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80";

export default function JourneyPage() {
  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <ProgressIndicator stage={1} />

          <section className="grid gap-6 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-8">
            <article className="overflow-hidden rounded-[var(--radius-form)] border border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[var(--color-bg-alt)] shadow-[var(--shadow-soft)]">
              <div className="relative">
                <img
                  src={proxiedImageUrl(journeyImage)}
                  alt="Tea-country morning in Sri Lanka"
                  className="aspect-[4/5] w-full object-cover object-center md:aspect-[3/4] lg:aspect-[4/5]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,23,21,0.42)_0%,rgba(28,23,21,0.10)_52%,rgba(28,23,21,0.02)_100%)]" />
              </div>
              <div className="space-y-2 px-5 py-5 md:px-6">
                <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-text-muted)_88%,var(--color-text-secondary))]">
                  Luna Voyages
                </p>
                <p className="type-body text-[var(--color-text-secondary)]">
                  Begin your private planning file with a few thoughtful choices.
                </p>
              </div>
            </article>

            <BriefIntakeCard className="overflow-hidden border-[color-mix(in_srgb,var(--color-border)_88%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] shadow-[var(--shadow-soft)]" />
          </section>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
