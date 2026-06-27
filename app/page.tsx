import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Sparkles } from "lucide-react";

import { HomeHeader } from "@/components/home/home-header";
import { SiteFooter } from "@/components/home/site-footer";
import { Button } from "@/components/ui/button";
import { homeContent } from "@/content/home-content";

export const metadata: Metadata = {
  title: "Luna Voyages | Romantic Travel Concierge",
  description:
    "Luna Voyages creates personalised romantic journeys, honeymoons and private travel experiences with local support and curated planning.",
  alternates: {
    canonical: "/",
  },
};

const serviceSteps = [
  {
    title: "Tell us your travel style",
    body: "Share the mood, pace, dates, comfort level, and moments you care about most.",
  },
  {
    title: "We design the journey",
    body: "We shape a thoughtful route, curate stays, and refine the details around how you want to travel.",
  },
  {
    title: "Local teams handle the details",
    body: "Trusted partners coordinate transfers, arrivals, hotel notes, drivers, and on-ground care.",
  },
  {
    title: "You travel with confidence",
    body: "Your trip has a clear plan, calm support, and room to enjoy the moments that matter.",
  },
] as const;

const trustPoints = [
  "Local knowledge and partner relationships",
  "Airport pickup support and private transfers",
  "Curated stays chosen for privacy and atmosphere",
  "Romantic experiences shaped around the occasion",
  "Hands-on planning from first idea to final detail",
] as const;

const journeyTypes = [
  "Honeymoons",
  "Anniversaries",
  "Private couple escapes",
  "Quiet luxury retreats",
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <HomeHeader
        brand={homeContent.header.brand}
        links={homeContent.header.links}
        cta={homeContent.header.cta}
      />

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2400&q=82"
            alt="Private romantic travel setting at sunset"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,11,10,0.84)_0%,rgba(24,18,16,0.55)_48%,rgba(24,18,16,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,15,13,0.18)_0%,rgba(20,15,13,0.66)_100%)]" />
        </div>

        <div className="page-shell relative z-10 flex min-h-[calc(100svh-var(--header-height))] items-center py-24 md:py-28 lg:min-h-[720px]">
          <div className="max-w-[43rem]">
            <div className="flex items-center gap-3">
              <Sparkles className="h-4 w-4 text-[color-mix(in_srgb,var(--color-accent)_82%,var(--color-light))]" />
              <span className="type-eyebrow text-[color-mix(in_srgb,var(--color-light)_86%,var(--color-bg-alt))]">
                Romantic travel concierge
              </span>
            </div>
            <h1 className="type-hero mt-6 max-w-[12ch] font-serif text-[var(--color-light)]">
              Romantic Travel, Personally Planned
            </h1>
            <p className="type-body-lg mt-6 max-w-[42ch] text-[color-mix(in_srgb,var(--color-light)_90%,transparent)]">
              Luna Voyages designs thoughtful honeymoons, anniversaries and private journeys with curated
              stays, local support and calm end-to-end planning.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-[var(--color-light)] text-[var(--color-brand)] hover:bg-white"
              >
                <Link href="/sri-lanka">Explore Sri Lanka Journeys</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[color-mix(in_srgb,var(--color-light)_38%,transparent)] text-[var(--color-light)] hover:bg-[color-mix(in_srgb,var(--color-light)_10%,transparent)] hover:text-white"
              >
                <Link href="/plan/journey">Start Planning</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3">
              {journeyTypes.map((type) => (
                <span
                  key={type}
                  className="type-ui-sm text-[color-mix(in_srgb,var(--color-light)_82%,transparent)]"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-shell w-full">
        <div className="page-shell">
          <div className="mb-12 max-w-3xl">
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">How it works</p>
            <h2 className="type-section mt-5 font-serif text-[var(--color-text)]">
              A calmer way to plan a meaningful trip.
            </h2>
            <p className="type-body-lg mt-5 max-w-[46ch] text-[var(--color-text-secondary)]">
              We turn early ideas into a considered journey, then coordinate the details through trusted
              local teams so the experience feels personal before and during travel.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {serviceSteps.map((step, index) => (
              <article
                key={step.title}
                className="surface-outline bg-[color-mix(in_srgb,var(--color-surface)_94%,var(--color-bg))] p-6 shadow-[var(--shadow-soft)]"
              >
                <span className="type-eyebrow text-[var(--color-brand)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="type-subheading mt-6 font-serif text-[var(--color-text)]">{step.title}</h3>
                <p className="type-body mt-4 text-[var(--color-text-secondary)]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell w-full bg-[var(--color-bg-alt)]">
        <div className="page-shell grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
          <div>
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">Current featured destination</p>
            <h2 className="type-section mt-5 max-w-[14ch] font-serif text-[var(--color-text)]">
              Sri Lanka is our active destination.
            </h2>
            <p className="type-body-lg mt-5 max-w-[46ch] text-[var(--color-text-secondary)]">
              Our strongest destination focus today is Sri Lanka romantic travel: boutique stays, private
              transfers, hill country, wildlife, coastline, local coordination, and journeys designed for two.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/sri-lanka">
                  Explore Sri Lanka romantic journeys <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sri-lanka">Plan a Sri Lanka honeymoon</Link>
              </Button>
            </div>
          </div>
          <figure className="overflow-hidden rounded-[var(--radius-card)] border border-[color-mix(in_srgb,var(--color-border-strong)_70%,transparent)] bg-[var(--color-surface-muted)] shadow-[var(--shadow-panel)]">
            <img
              src="https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1800&q=82"
              alt="Misty hill country landscape"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section id="about" className="section-shell w-full">
        <div className="page-shell grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-20">
          <div>
            <p className="type-eyebrow eyebrow-rule text-[var(--color-text-muted)]">Why Luna Voyages</p>
            <h2 className="type-section mt-5 font-serif text-[var(--color-text)]">
              Premium, personal, and handled with local care.
            </h2>
            <p className="type-body-lg mt-5 max-w-[44ch] text-[var(--color-text-secondary)]">
              Luna Voyages is built for couples who want a romantic journey to feel considered, not crowded.
              More destinations may be added later, but we only open destinations where we can support the
              experience properly.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="flex gap-4 border-t border-[var(--color-border-strong)] pt-5"
              >
                <Check className="mt-1 h-4 w-4 flex-none text-[var(--color-brand)]" />
                <p className="type-body text-[var(--color-text-secondary)]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[var(--color-dark)] py-24 text-[var(--color-light)] md:py-32">
        <div className="page-shell relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
              <p className="type-eyebrow text-[color-mix(in_srgb,var(--color-light)_64%,transparent)]">
                Start with the right first conversation
              </p>
            </div>
            <h2 className="type-section max-w-[14ch] font-serif text-[var(--color-light)]">
              Start Planning Your Journey
            </h2>
            <p className="type-body-lg mt-5 max-w-[48ch] text-[color-mix(in_srgb,var(--color-light)_78%,transparent)]">
              Tell us what you are celebrating, how you like to travel, and the kind of experience you want
              to come home remembering.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg" className="bg-[var(--color-light)] text-[var(--color-brand)] hover:bg-white">
              <Link href="/plan/journey">Start Planning Your Journey</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[color-mix(in_srgb,var(--color-light)_30%,transparent)] text-[var(--color-light)] hover:bg-[color-mix(in_srgb,var(--color-light)_10%,transparent)] hover:text-white"
            >
              <Link href="/book-a-call">Book a Call</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
