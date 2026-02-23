import { BriefIntakeCard } from "@/components/brief-intake-card";

export default function StartPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <BriefIntakeCard className="overflow-hidden border-border bg-card shadow-sm shadow-primary/10" />
      </div>
    </main>
  );
}
