import { homeContent } from "@/content/home-content";
import { FlowMapSketch } from "@/src/components/FlowMapSketch";
import { HomeHeader } from "@/components/home/home-header";
import { HeroSection } from "@/components/home/hero-section";
import { MomentsSection } from "@/components/home/moments-section";
import { StaysSection } from "@/components/home/stays-section";
import { PartnersSection } from "@/components/home/partners-section";
import { StoriesSection } from "@/components/home/stories-section";
import { ApproachSection } from "@/components/home/approach-section";
import { WhySection } from "@/components/home/why-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { SiteFooter } from "@/components/home/site-footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--color-bg-alt)] via-background to-[var(--color-bg)] text-foreground">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <HeroSection content={homeContent.hero} />

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

      <FlowMapSketch
        id={homeContent.flow.id}
        eyebrow={homeContent.flow.eyebrow}
        heading={homeContent.flow.heading}
        subcopy={homeContent.flow.subcopy}
        steps={homeContent.flow.steps}
        note={homeContent.flow.note}
      />


      <StoriesSection
        id={homeContent.stories.id}
        eyebrow={homeContent.stories.eyebrow}
        heading={homeContent.stories.heading}
        supporting={homeContent.stories.subcopy}
        caseStudies={homeContent.stories.caseStudies}
      />

      <ApproachSection
        id={homeContent.approach.id}
        eyebrow={homeContent.approach.eyebrow}
        heading={homeContent.approach.heading}
        supporting={homeContent.approach.subcopy}
        steps={homeContent.approach.steps}
      />

    <PartnersSection
        id={homeContent.partners.id}
        eyebrow={homeContent.partners.eyebrow}
        heading={homeContent.partners.heading}
        supporting={homeContent.partners.subcopy}
        logos={homeContent.partners.logos}
      />

      <WhySection
        id={homeContent.why.id}
        eyebrow={homeContent.why.eyebrow}
        heading={homeContent.why.heading}
        supporting={homeContent.why.subcopy}
        objections={homeContent.why.objections}
        closing={homeContent.why.closing}
      />

      

      <FinalCtaSection
        heading={homeContent.finalCta.heading}
        subcopy={homeContent.finalCta.subcopy}
        primary={homeContent.finalCta.primary}
        secondary={homeContent.finalCta.secondary}
      />

      <SiteFooter
        note={homeContent.footer.note}
        links={homeContent.footer.links}
        copyright={homeContent.footer.copyright}
      />
    </main>
  );
}
