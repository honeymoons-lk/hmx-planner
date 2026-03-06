import { BriefIntakeCard } from "@/components/brief-intake-card";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-[var(--section-space-mobile)] md:px-6 md:py-[var(--section-space-desktop)]">
      <div className="mx-auto w-full max-w-3xl">
        <BriefIntakeCard className="overflow-hidden border-border bg-card shadow-[var(--shadow-soft)]" />
      </div>
    </main>
  );
}
