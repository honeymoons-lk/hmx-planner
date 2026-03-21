import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";

type PeopleSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  link: {
    text: string;
    href: string;
  };
};

export function PeopleSection({ id, eyebrow, heading, body, link }: PeopleSectionProps) {
  return (
    <section id={id} className="section-shell-tight w-full bg-[var(--color-bg-alt)] border-y border-[var(--color-border-strong)]">
      <div className="page-shell">
        <div className="max-w-3xl flex flex-col items-start">
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            supporting={body}
            className="mb-8 [&_p.type-body-lg]:max-w-[65ch]"
          />
          <Link
            href={link.href}
            className="group inline-flex items-center gap-2 type-body font-medium text-[var(--color-brand)] transition-colors hover:text-[var(--color-text)]"
          >
            {link.text}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
