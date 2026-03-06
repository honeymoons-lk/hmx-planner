import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  supporting: string;
  className?: string;
};

export function SectionHeader({ eyebrow, heading, supporting, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 max-w-3xl", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-[32px] leading-[1.25] font-medium tracking-tight md:text-[44px]">
        {heading}
      </h2>
      <p className="mt-4 text-base leading-[1.75] text-[var(--color-text-secondary)] md:text-[18px]">{supporting}</p>
    </div>
  );
}
