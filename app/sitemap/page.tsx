import type { Metadata } from "next";
import Link from "next/link";

import { PlanningHeader, PlanningMicroFooter } from "@/components/plan/planning-chrome";

export const metadata: Metadata = {
  title: "Luna Voyages Sitemap",
  description: "Human-readable sitemap for the Luna Voyages website.",
};

const routeGroups = [
  {
    title: "Main site",
    description: "Primary public-facing pages and reference pages.",
    links: [
      { href: "/", label: "Home", note: "Main landing page for Luna Voyages." },
      { href: "/real-honeymoons", label: "Real Honeymoons", note: "Designed-journey proof page." },
      { href: "/style-guide", label: "Style Guide", note: "Brand and UI system reference." },
      { href: "/design-brief", label: "Design Brief", note: "Designer handoff and brand direction." },
      { href: "/sitemap", label: "Sitemap", note: "Human-readable route index." },
      { href: "/privacy-policy", label: "Privacy Policy", note: "How we handle personal information." },
      { href: "/terms", label: "Terms & Conditions", note: "Site and service terms." },
      { href: "/partner-with-us", label: "Partner With Us", note: "B2B partner and collaboration information." },
    ],
  },
  {
    title: "Planning flow",
    description: "The concierge proposal journey.",
    links: [
      { href: "/plan/journey", label: "Plan Journey", note: "Step 1 of the planning funnel." },
      { href: "/plan/details", label: "Plan Details", note: "Step 2 for comfort tier, occasion, and notes." },
      { href: "/plan/contact", label: "Plan Contact", note: "Step 3 for contact details and final review." },
      { href: "/plan/thank-you", label: "Plan Thank You", note: "Post-submission confirmation page." },
    ],
  },
  {
    title: "Book a call flow",
    description: "Lower-friction conversation-first path.",
    links: [
      { href: "/book-a-call", label: "Book a Call", note: "Short call request page." },
      { href: "/book-a-call/thank-you", label: "Book a Call Thank You", note: "Confirmation after call request." },
    ],
  },
  {
    title: "Utility",
    description: "Non-page route currently exposed publicly.",
    links: [
      { href: "/robots.txt", label: "robots.txt", note: "Current crawler instructions file." },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PlanningHeader />
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto w-full max-w-6xl space-y-8">
          <section className="relative overflow-hidden rounded-[var(--radius-form)] border border-[color-mix(in_srgb,var(--color-border)_84%,transparent)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--color-surface)_96%,var(--color-bg))_0%,color-mix(in_srgb,var(--color-bg-alt)_34%,var(--color-surface))_100%)] p-6 shadow-[var(--shadow-soft)] md:p-10">
            <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full border border-[color-mix(in_srgb,var(--color-brand)_14%,transparent)]" />
            <p className="type-eyebrow mb-4 text-[var(--color-text-muted)]">Site map</p>
            <h1 className="type-hero max-w-[12ch] font-serif text-[var(--color-text)]">Every current page route.</h1>
            <p className="type-body mt-5 max-w-[68ch] text-[var(--color-text-secondary)]">
              This is a human-readable route index for the current Luna Voyages site. It is intended as
              a quick reference, not an XML sitemap.
            </p>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            {routeGroups.map((group) => (
              <section
                key={group.title}
                className="rounded-[var(--radius-form)] border border-[color-mix(in_srgb,var(--color-border)_84%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_95%,var(--color-bg))] p-6 shadow-[var(--shadow-soft)]"
              >
                <h2 className="type-subheading font-serif text-[var(--color-text)]">{group.title}</h2>
                <p className="type-body mt-3 text-[var(--color-text-secondary)]">{group.description}</p>

                <div className="mt-6 space-y-4">
                  {group.links.map((link) => (
                    <div
                      key={link.href}
                      className="rounded-[var(--radius-input)] border border-[color-mix(in_srgb,var(--color-border)_74%,transparent)] bg-[color-mix(in_srgb,var(--color-surface)_88%,var(--color-bg))] p-4"
                    >
                      <Link
                        href={link.href}
                        className="type-ui-sm text-[var(--color-brand)] underline decoration-[color-mix(in_srgb,var(--color-brand)_35%,transparent)] underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)]"
                      >
                        {link.href}
                      </Link>
                      <p className="type-ui-sm mt-2 text-[var(--color-text)]">{link.label}</p>
                      <p className="type-meta mt-1 text-[var(--color-text-muted)]">{link.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <PlanningMicroFooter />
    </>
  );
}
