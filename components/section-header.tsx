import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  supporting: string;
  className?: string;
};

export function SectionHeader({ eyebrow, heading, supporting, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 max-w-3xl", className)}>
      <p className="type-eyebrow text-muted-foreground">{eyebrow}</p>
      <h2 className="type-section mt-4 font-serif tracking-tight">{heading}</h2>
      <p className="type-body-lg mt-[var(--heading-body-gap)] text-[var(--color-text-secondary)]">{supporting}</p>
    </div>
  );
}
