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
      <main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="mx-auto w-full max-w-5xl space-y-8 md:space-y-12">
          <ProgressIndicator stage={1} />

          <section className="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-[minmax(0,40%)_minmax(0,60%)] lg:gap-12">
            <article className="plan-step-card relative flex flex-col justify-end overflow-hidden min-h-[240px] md:min-h-[400px] lg:min-h-[600px]">
              <img
                src={proxiedImageUrl(journeyImage)}
                alt="Tea-country morning in Sri Lanka"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(28,23,21,0.7)_0%,rgba(28,23,21,0.2)_40%,rgba(28,23,21,0.02)_100%)]" />
              <div className="relative z-10 space-y-2 p-6 md:space-y-3 md:p-8">
                <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-light)_88%,var(--color-bg-alt))]">
                  Luna Voyages
                </p>
                <p className="type-body text-[color-mix(in_srgb,var(--color-light)_95%,var(--color-bg-alt))] font-light max-w-[24ch]">
                  Begin shaping your journey.
                </p>
              </div>
            </article>

            <div className="flex flex-col gap-6 md:gap-8">
              <BriefIntakeCard />
              
              <div className="px-2 md:px-4 space-y-2">
                <h3 className="type-eyebrow text-[var(--color-text-muted)]">Why travellers trust Luna</h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-[var(--color-text-secondary)] font-light max-w-[54ch]">
                  A new concierge brand, grounded in long-standing Sri Lanka hospitality relationships and personally curated journey design.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
