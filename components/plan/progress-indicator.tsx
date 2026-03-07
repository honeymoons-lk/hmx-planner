type ProgressIndicatorProps = {
  stage: 1 | 2 | 3;
};

const stages = ["Your journey", "A few final details", "Contact and review"] as const;

export function ProgressIndicator({ stage }: ProgressIndicatorProps) {
  const progressWidth = `${((stage - 1) / (stages.length - 1)) * 100}%`;

  return (
    <div className="space-y-3 rounded-[var(--radius-form)] border border-border bg-[var(--color-surface)] p-5 md:p-6">
      <div className="relative h-1 w-full rounded-full bg-[var(--color-border)]">
        <span
          className="absolute left-0 top-0 h-1 rounded-full bg-[var(--color-brand)] transition-all duration-300"
          style={{ width: progressWidth }}
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {stages.map((label, idx) => {
          const index = idx + 1;
          const active = stage >= index;
          return (
            <p
              key={label}
              className={`type-ui-sm ${
                active ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"
              }`}
            >
              <span className="mr-1.5">{index}.</span>
              {label}
            </p>
          );
        })}
      </div>
    </div>
  );
}
