type ProgressIndicatorProps = {
  stage: 1 | 2 | 3;
};

const stages = ["Your journey", "A few final details", "Contact and review"] as const;

export function ProgressIndicator({ stage }: ProgressIndicatorProps) {
  const progressWidth = `${((stage - 1) / (stages.length - 1)) * 100}%`;

  return (
    <div className="rounded-[var(--radius-form)] border border-[color-mix(in_srgb,var(--color-border)_84%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_88%,var(--color-bg))] px-4 py-4 md:px-6 md:py-5">
      <div className="relative mb-4 h-4">
        <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[color-mix(in_srgb,var(--color-border-strong)_72%,transparent)]" />
        <span
          className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-[var(--color-brand)] transition-all duration-300"
          style={{ width: progressWidth }}
        />
        {stages.map((label, idx) => {
          const index = idx + 1;
          const completed = stage > index;
          const active = stage === index;
          const left = `${(idx / (stages.length - 1)) * 100}%`;
          return (
            <span
              key={`${label}-dot`}
              className={`absolute top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${
                active
                  ? "h-3 w-3 border-[var(--color-brand)] bg-[var(--color-brand)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-brand)_20%,transparent)]"
                  : completed
                    ? "h-2.5 w-2.5 border-[var(--color-brand)] bg-[var(--color-brand)]/90"
                    : "h-2.5 w-2.5 border-[var(--color-border-strong)] bg-[var(--color-bg)]"
              }`}
              style={{ left }}
              aria-hidden
            />
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
        {stages.map((label, idx) => {
          const index = idx + 1;
          const completed = stage > index;
          const active = stage === index;
          return (
            <p
              key={label}
              className={`type-ui-sm ${
                active
                  ? "text-[var(--color-text)]"
                  : completed
                    ? "text-[var(--color-text-secondary)]"
                    : "text-[var(--color-text-muted)]"
              }`}
            >
              <span className={`mr-1.5 ${active ? "text-[var(--color-brand)]" : ""}`}>{index}.</span>
              {label}
            </p>
          );
        })}
      </div>
    </div>
  );
}
