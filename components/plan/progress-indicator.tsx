import { Check } from "lucide-react";

type ProgressIndicatorProps = {
  stage: 1 | 2 | 3;
};

const stages = ["Your journey", "Final details", "Contact & review"] as const;

export function ProgressIndicator({ stage }: ProgressIndicatorProps) {
  return (
    <div className="plan-step-card px-4 py-5 md:px-8 md:py-8">
      <div className="relative mx-auto max-w-xl">
        {/* Tracks Container */}
        <div className="absolute left-3 right-3 top-[11px]">
          {/* Background Track */}
          <div className="absolute left-0 top-0 h-[1px] w-full bg-[color-mix(in_srgb,var(--color-border-strong)_40%,transparent)]" />
          {/* Active Track */}
          <div
            className="absolute left-0 top-0 h-[1px] bg-[var(--color-brand)] transition-all duration-500 ease-in-out"
            style={{ width: `${((stage - 1) / (stages.length - 1)) * 100}%` }}
          />
        </div>

        {/* Nodes */}
        <div className="relative flex justify-between">
          {stages.map((label, idx) => {
            const index = idx + 1;
            const isCompleted = stage > index;
            const isActive = stage === index;

            return (
              <div key={label} className="relative flex flex-col items-center">
                {/* Node */}
                <div
                  className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-[var(--color-surface)] transition-all duration-300 ${
                    isActive
                      ? "border-[var(--color-brand)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-brand)_8%,transparent)]"
                      : isCompleted
                        ? "border-[var(--color-brand)] bg-[var(--color-brand)]"
                        : "border-[color-mix(in_srgb,var(--color-border-strong)_60%,transparent)]"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  ) : isActive ? (
                    <div className="h-2 w-2 rounded-full bg-[var(--color-brand)]" />
                  ) : null}
                </div>

                {/* Label */}
                <span
                  className={`absolute top-10 w-[84px] text-center text-[11px] font-medium tracking-wide transition-colors duration-300 sm:w-32 sm:text-[13px] ${
                    isActive
                      ? "text-[var(--color-brand)]"
                      : isCompleted
                        ? "text-[var(--color-text-secondary)]"
                        : "text-[var(--color-text-muted)] opacity-60"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Spacer for absolute labels */}
        <div className="h-10 sm:h-12" />
      </div>
    </div>
  );
}
