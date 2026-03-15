import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  supporting: string;
  className?: string;
};

export function SectionHeader({ eyebrow, heading, supporting, className }: SectionHeaderProps) {
  const isCentered = className?.includes("text-center");

  return (
    <div className={cn("mb-16 max-w-[48rem] space-y-6", className)}>
      <p className={cn("type-eyebrow text-[var(--color-text-muted)]", isCentered ? "flex items-center justify-center gap-[0.8rem] before:content-[''] before:w-[2.25rem] before:h-[1px] before:bg-[color-mix(in_srgb,var(--color-brand)_36%,var(--color-border-strong))] after:content-[''] after:w-[2.25rem] after:h-[1px] after:bg-[color-mix(in_srgb,var(--color-brand)_36%,var(--color-border-strong))]" : "eyebrow-rule")}>{eyebrow}</p>
      <div className="space-y-6">
        <h2 className="type-section text-balance-pretty font-serif tracking-tight text-[var(--color-text)]">
          {heading}
        </h2>
        <p className={cn("type-body-lg max-w-[42ch] text-[var(--color-text-secondary)] font-light", isCentered && "mx-auto")}>{supporting}</p>
      </div>
    </div>
  );
}
