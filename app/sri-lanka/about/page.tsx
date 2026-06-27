import type { Metadata } from "next";
import Link from "next/link";
import { Car, Headphones, Hotel, MapPinned, Plane } from "lucide-react";

import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HomeHeader } from "@/components/home/home-header";
import { SiteFooter } from "@/components/home/site-footer";
import { SectionHeader } from "@/components/section-header";
import { homeContent } from "@/content/home-content";

export const metadata: Metadata = {
  title: "Sri Lanka Local Support | Luna Voyages",
  description:
    "How Luna Voyages supports Sri Lanka honeymoons and romantic journeys with local coordination, airport pickups, private transfers, drivers and hotel support.",
  alternates: {
    canonical: "/sri-lanka/about",
  },
};

const support = [
  {
    title: "Airport pickup",
    body: "A calmer arrival after a long flight, with the transfer planned before you land.",
    icon: Plane,
  },
  {
    title: "Private drivers",
    body: "Reliable local drivers for the route, not a patchwork of last-minute transfers.",
    icon: Car,
  },
  {
    title: "Hotel coordination",
    body: "Arrival notes, room preferences, celebration details and timing handled with the properties.",
    icon: Hotel,
  },
  {
    title: "Route support",
    body: "Practical guidance around drive times, pacing, weather, and changes while you travel.",
    icon: MapPinned,
  },
  {
    title: "Help during the trip",
    body: "On-ground communication if plans need to flex or a local detail needs attention.",
    icon: Headphones,
  },
] as const;

export default function SriLankaAboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-foreground">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <section className="section-shell w-full">
        <div className="page-shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="Sri Lanka local support"
              heading="We are not just planning from a distance."
              supporting="Sri Lanka is beautiful, varied and logistically nuanced. Luna Voyages plans the journey before you arrive, then supports it through local relationships, trusted drivers, hotel coordination and practical on-ground care."
              className="mb-0"
            />
            <Link
              href="/sri-lanka"
              className="type-ui-sm mt-7 inline-flex text-[var(--color-brand)] underline decoration-[color-mix(in_srgb,var(--color-brand)_35%,transparent)] underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)]"
            >
              Back to Sri Lanka romantic journeys
            </Link>
          </div>
          <figure className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border-strong)_70%,transparent)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-panel)]">
            <img
              src="https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&w=1800&q=80"
              alt="Misty Sri Lanka hill country"
              className="aspect-[4/3] w-full object-cover"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      <section className="section-shell-tight w-full bg-[var(--color-bg-alt)] border-y border-[var(--color-border-strong)]">
        <div className="page-shell">
          <div className="mb-12 max-w-3xl">
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">What we coordinate</p>
            <h2 className="type-section mt-5 font-serif text-[var(--color-text)]">
              The practical details that make Sri Lanka feel seamless.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {support.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="surface-outline bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] p-6 shadow-[var(--shadow-soft)]"
                >
                  <Icon className="h-5 w-5 text-[var(--color-brand)]" />
                  <h3 className="type-subheading mt-6 font-serif text-[var(--color-text)]">{item.title}</h3>
                  <p className="type-body mt-4 text-[var(--color-text-secondary)]">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell w-full">
        <div className="page-shell max-w-4xl">
          <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">Why it matters</p>
          <h2 className="type-section mt-5 font-serif text-[var(--color-text)]">
            Private travel in Sri Lanka depends on the route, the driver, and the handoffs.
          </h2>
          <div className="mt-6 space-y-5 text-[var(--color-text-secondary)]">
            <p className="type-body-lg">
              The difference between a trip that feels graceful and one that feels tiring is often invisible
              before you arrive: realistic drive times, well-paced hotel changes, reliable local drivers,
              thoughtful arrival timing and someone who can help if plans change.
            </p>
            <p className="type-body">
              That is why Luna Voyages treats local support as part of the product, not an afterthought.
            </p>
          </div>
        </div>
      </section>

      <FinalCtaSection
        heading="Ready to plan your Sri Lanka trip?"
        subcopy="Share your brief and we will shape the journey around your dates, pace and travel style."
        primary="Plan My Sri Lanka Trip"
        secondary="View Itinerary Ideas"
        primaryHref="/plan/journey"
        secondaryHref="/sri-lanka/itineraries"
      />

      <SiteFooter />
    </main>
  );
}
