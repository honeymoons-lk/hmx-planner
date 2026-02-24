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
      <p className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{heading}</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{supporting}</p>
    </div>
  );
}
