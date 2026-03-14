import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  supporting: string;
  className?: string;
};

export function SectionHeader({ eyebrow, heading, supporting, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-16 max-w-[48rem] space-y-6", className)}>
      <p className="eyebrow-rule type-eyebrow text-[var(--color-text-muted)]">{eyebrow}</p>
      <div className="space-y-6">
        <h2 className="type-section text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
          {heading}
        </h2>
        <p className="type-body-lg max-w-[42ch] text-[var(--color-text-secondary)] font-light">{supporting}</p>
      </div>
    </div>
  );
}
