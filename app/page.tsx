import { homeContent } from "@/content/home-content";
import { FlowMapSketch } from "@/src/components/FlowMapSketch";
import { HomeHeader } from "@/components/home/home-header";
import { HeroSection } from "@/components/home/hero-section";
import { PrivateBriefSection } from "@/components/home/private-brief-section";
import { TrustBridgeSection } from "@/components/home/trust-bridge-section";
import { MomentsSection } from "@/components/home/moments-section";
import { StaysSection } from "@/components/home/stays-section";
import { PartnersSection } from "@/components/home/partners-section";
import { PhilosophySection } from "@/components/home/philosophy-section";
import { StoriesSection } from "@/components/home/stories-section";
import { ApproachSection } from "@/components/home/approach-section";
import { WhySection } from "@/components/home/why-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { SiteFooter } from "@/components/home/site-footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <HeroSection content={homeContent.hero} />
      <PrivateBriefSection />

      <TrustBridgeSection
        eyebrow={homeContent.trustBridge.eyebrow}
        heading={homeContent.trustBridge.heading}
        subcopy={homeContent.trustBridge.subcopy}
        proofPoints={homeContent.trustBridge.proofPoints}
      />

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
        cta={homeContent.stories.cta}
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

      <PhilosophySection
        id={homeContent.philosophy.id}
        eyebrow={homeContent.philosophy.eyebrow}
        heading={homeContent.philosophy.heading}
        body={homeContent.philosophy.body}
        link={homeContent.philosophy.link}
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

      <SiteFooter />
    </main>
  );
}
