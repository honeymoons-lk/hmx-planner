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
      <main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto w-full max-w-5xl space-y-12">
          <ProgressIndicator stage={1} />

          <section className="grid gap-8 lg:grid-cols-[minmax(0,40%)_minmax(0,60%)] lg:gap-12">
            <article className="overflow-hidden rounded-[8px] bg-[var(--color-bg-alt)]">
              <div className="relative">
                <img
                  src={proxiedImageUrl(journeyImage)}
                  alt="Tea-country morning in Sri Lanka"
                  className="aspect-[4/5] w-full object-cover object-center md:aspect-[3/4] lg:aspect-[4/5]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,23,21,0.42)_0%,rgba(28,23,21,0.10)_52%,rgba(28,23,21,0.02)_100%)]" />
              </div>
              <div className="space-y-3 px-6 py-8">
                <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-text-muted)_88%,var(--color-text-secondary))]">
                  Luna Voyages
                </p>
                <p className="type-body text-[var(--color-text-secondary)] font-light">
                  Begin your private planning file with a few thoughtful choices.
                </p>
              </div>
            </article>

            <BriefIntakeCard className="shadow-sm" />
          </section>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
