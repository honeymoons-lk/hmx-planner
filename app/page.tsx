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
    <main className="h-screen snap-y snap-mandatory overflow-y-auto overscroll-y-contain bg-gradient-to-b from-[var(--color-bg-alt)] via-background to-[var(--color-bg)] text-foreground scroll-smooth">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <div className="snap-start">
        <HeroSection content={homeContent.hero} />
      </div>

      <div className="snap-start">
        <MomentsSection
          id={homeContent.moments.id}
          eyebrow={homeContent.moments.eyebrow}
          heading={homeContent.moments.heading}
          supporting={homeContent.moments.subcopy}
          panels={homeContent.moments.panels}
        />
      </div>

      <div className="snap-start">
        <StaysSection
          id={homeContent.stays.id}
          eyebrow={homeContent.stays.eyebrow}
          heading={homeContent.stays.heading}
          supporting={homeContent.stays.subcopy}
          footerNote={homeContent.stays.footerNote}
          items={homeContent.stays.items}
        />
      </div>

      <div className="snap-start">
        <FlowMapSketch
          id={homeContent.flow.id}
          eyebrow={homeContent.flow.eyebrow}
          heading={homeContent.flow.heading}
          subcopy={homeContent.flow.subcopy}
          steps={homeContent.flow.steps}
          note={homeContent.flow.note}
        />
      </div>


      <div className="snap-start">
        <StoriesSection
          id={homeContent.stories.id}
          eyebrow={homeContent.stories.eyebrow}
          heading={homeContent.stories.heading}
          supporting={homeContent.stories.subcopy}
          caseStudies={homeContent.stories.caseStudies}
        />
      </div>

      <div className="snap-start">
        <ApproachSection
          id={homeContent.approach.id}
          eyebrow={homeContent.approach.eyebrow}
          heading={homeContent.approach.heading}
          supporting={homeContent.approach.subcopy}
          steps={homeContent.approach.steps}
        />
      </div>

      <div className="snap-start">
        <PartnersSection
          id={homeContent.partners.id}
          eyebrow={homeContent.partners.eyebrow}
          heading={homeContent.partners.heading}
          supporting={homeContent.partners.subcopy}
          logos={homeContent.partners.logos}
        />
      </div>

      <div className="snap-start">
        <WhySection
          id={homeContent.why.id}
          eyebrow={homeContent.why.eyebrow}
          heading={homeContent.why.heading}
          supporting={homeContent.why.subcopy}
          objections={homeContent.why.objections}
          closing={homeContent.why.closing}
        />
      </div>

      

      <div className="snap-start">
        <FinalCtaSection
          heading={homeContent.finalCta.heading}
          subcopy={homeContent.finalCta.subcopy}
          primary={homeContent.finalCta.primary}
          secondary={homeContent.finalCta.secondary}
        />
      </div>

      <div className="snap-start">
        <SiteFooter
          note={homeContent.footer.note}
          links={homeContent.footer.links}
          copyright={homeContent.footer.copyright}
        />
      </div>
    </main>
  );
}
