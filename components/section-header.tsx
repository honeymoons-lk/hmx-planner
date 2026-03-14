import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  supporting: string;
  className?: string;
};

export function SectionHeader({ eyebrow, heading, supporting, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 max-w-[44rem] space-y-5", className)}>
      <p className="eyebrow-rule type-eyebrow text-[var(--color-text-muted)]">{eyebrow}</p>
      <div className="space-y-[var(--heading-body-gap)]">
        <h2 className="type-section text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
          {heading}
        </h2>
        <p className="type-body-lg max-w-[40rem] text-[var(--color-text-secondary)]">{supporting}</p>
      </div>
    </div>
  );
}
