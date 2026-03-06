import { BriefIntakeCard } from "@/components/brief-intake-card";
import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";

export default function StartPage() {
  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-3xl">
          <BriefIntakeCard className="overflow-hidden border-border bg-[var(--color-surface)] shadow-[var(--shadow-soft)]" />
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}

