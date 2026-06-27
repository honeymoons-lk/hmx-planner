import type { Metadata } from "next";

import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HomeHeader } from "@/components/home/home-header";
import { MomentsSection } from "@/components/home/moments-section";
import { SiteFooter } from "@/components/home/site-footer";
import { StaysSection } from "@/components/home/stays-section";
import { homeContent } from "@/content/home-content";

export const metadata: Metadata = {
  title: "Sri Lanka Romantic Experiences | Luna Voyages",
  description:
    "Explore Sri Lanka romantic travel experiences, from boutique beach stays and tea country mornings to safari sundowners, heritage evenings and private villas.",
  alternates: {
    canonical: "/sri-lanka/experiences",
  },
};

export default function SriLankaExperiencesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-foreground">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <section className="section-shell w-full">
        <div className="page-shell max-w-4xl">
          <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">Sri Lanka experiences</p>
          <h1 className="type-hero mt-6 max-w-[13ch] font-serif text-[var(--color-text)]">
            Romantic Sri Lanka Experiences
          </h1>
          <p className="type-body-lg mt-6 max-w-[58ch] text-[var(--color-text-secondary)]">
            A Sri Lanka honeymoon can move from private beach dinners and tea country mornings to safari,
            heritage stays, scenic drives and quiet villa time. We choose the moments that fit your pace.
          </p>
        </div>
      </section>

      <MomentsSection
        id={homeContent.moments.id}
        eyebrow={homeContent.moments.eyebrow}
        heading={homeContent.moments.heading}
        supporting={homeContent.moments.subcopy}
        panels={homeContent.moments.panels}
      />

      <StaysSection
        id={homeContent.stays.id}
        eyebrow={homeContent.stays.eyebrow}
        heading={homeContent.stays.heading}
        supporting={homeContent.stays.subcopy}
        footerNote={homeContent.stays.footerNote}
        items={homeContent.stays.items}
      />

      <FinalCtaSection
        heading="Build your Sri Lanka journey around the right moments."
        subcopy="Tell us what kind of romance, privacy and pace you want. We will curate the route and stays around it."
        primary="Plan My Sri Lanka Trip"
        secondary="View Itinerary Ideas"
        primaryHref="/plan/journey"
        secondaryHref="/sri-lanka/itineraries"
      />

      <SiteFooter />
    </main>
  );
}
