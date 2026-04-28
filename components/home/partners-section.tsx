import { SectionHeader } from "@/components/section-header";

type PartnersSectionProps = {
  id: string;
  eyebrow: string;
  heading: string;
  supporting: string;
  logos: readonly string[];
};

export function PartnersSection({ id, eyebrow, heading, supporting, logos }: PartnersSectionProps) {
  return (
    <section id={id} className="section-shell-tight w-full bg-[#171412]" data-header-tone="dark">
      <div className="page-shell">
        <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          supporting={supporting}
          className="mb-10 max-w-3xl [&_p]:text-[color-mix(in_srgb,var(--color-light)_72%,transparent)] [&_h2]:text-[var(--color-light)]"
        />
        <div className="grid gap-3 border-y border-[color-mix(in_srgb,var(--color-light)_14%,transparent)] py-8 sm:grid-cols-2 lg:grid-cols-5">
          {logos.map((partner) => (
            <div
              key={partner}
              className="type-ui-sm text-center text-[color-mix(in_srgb,var(--color-light)_76%,transparent)]"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
