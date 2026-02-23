"use client";

import { type KeyboardEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BriefIntakeCard } from "@/components/brief-intake-card";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  HeartHandshake,
  MapPinned,
  Menu,
  MessageSquareHeart,
  Quote,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

const content = {
  header: {
    brand: "Honeymoons.lk",
    links: [
      { label: "Honeymoons in Sri Lanka", href: "/sri-lanka" },
      { label: "Our Approach", href: "/approach" },
      { label: "Real Honeymoons", href: "/real-honeymoons" },
    ],
    cta: { label: "Start Planning", href: "/start" },
  },
  hero: {
    kicker: "Sri Lanka Romantic Travel Concierge",
    heading: "Your Sri Lanka romantic escape, handled end-to-end",
    emotionSentence:
      "Tea hills at sunrise. Barefoot dinners by the sea. Quiet villas made just for two.",
    emotionTagline: "Designed around you. Managed by us.",
    testimonials: [
      {
        quote:
          "We felt completely looked after — every detail was seamless from the moment we landed.",
        name: "Emma & Daniel",
        origin: "UK",
      },
      {
        quote:
          "The stays were stunning and the pacing was perfect. It felt effortless the whole way through.",
        name: "Nadia & Aaron",
        origin: "AU",
      },
      {
        quote: "It didn’t feel like a package. It felt like it was built for us.",
        name: "Rhea & Mark",
        origin: "SG",
      },
    ],
    secondaryStrip: {
      label: "Also designing romantic escapes for",
      items: ["Mini-moons", "Anniversary escapes", "Baby-moons"],
    },
  },
  moments: {
    id: "moments",
    eyebrow: "THE MOMENTS WE DESIGN",
    heading: "The highlights your honeymoon will be built around.",
    subcopy: "Not a list of activities. The experiences that shape the story.",
    panels: [
      {
        title: "PRIVATE BEACH DINNERS",
        body: "Sunset. Candlelight. Just the two of you, with the ocean doing the rest.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      },
      {
        title: "TEA COUNTRY SLOW MORNINGS",
        body: "Misty hills, estate breakfasts, and mornings that aren’t rushed.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      },
      {
        title: "SAFARI SUNDOWNERS",
        body: "Private jeeps, golden light, and champagne in the wild.",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      },
      {
        title: "HERITAGE EVENINGS",
        body: "Old forts, quiet courtyards, and stories in stone.",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      },
    ],
  },
  stays: {
    id: "stays",
    heading: "The kind of stays we curate",
    subcopy: "A quick sense of the standard we book — tailored to your style and budget.",
    note: "Not a catalogue.",
    items: [
      {
        title: "Boutique villas",
        description: "Private, design-led stays with intimate service.",
        badges: ["Uga", "Teardrop"],
      },
      {
        title: "Luxury beach resorts",
        description: "Refined coastal properties with easy indulgence.",
        badges: ["Jetwing", "Cinnamon"],
      },
      {
        title: "Tea estate retreats",
        description: "Cool-climate hideaways surrounded by tea country.",
        badges: ["Resplendent"],
      },
      {
        title: "Heritage stays",
        description: "Character-rich properties with timeless Sri Lankan charm.",
        badges: ["Aitken Spence"],
      },
    ],
  },
  flow: {
    id: "flow",
    heading: "A typical Sri Lanka honeymoon flow",
    subcopy: "A proven rhythm — we tailor the details to you.",
    steps: [
      {
        stop: "Colombo (1 night)",
        detail: "Reset after landing. Great food, easy pace.",
      },
      {
        stop: "Cultural Triangle (2–3 nights)",
        detail: "Sigiriya, temples, slow luxury.",
      },
      {
        stop: "Tea Country (2 nights)",
        detail: "Scenic train + estate mornings.",
      },
      {
        stop: "South Coast (3–5 nights)",
        detail: "Beach time, dinners, and downtime.",
      },
      {
        stop: "Optional: Maldives (3–5 nights)",
        detail: "Barefoot luxury to finish.",
      },
    ],
    note: "This is a starting point — we design around your dates and preferences.",
  },
  partners: {
    id: "partners",
    heading: "Trusted Sri Lankan partners",
    subcopy: "A few names we regularly book with.",
    logos: [
      "Jetwing",
      "Cinnamon",
      "Aitken Spence",
      "Shangri-La",
      "Anantara",
      "Uga",
      "Resplendent Ceylon",
      "Teardrop Hotels",
      "Dilmah",
      "SriLankan Airlines",
    ],
  },
  stories: {
    id: "stories",
    heading: "Real honeymoons",
    subcopy: "Recent journeys across different styles and budgets.",
    caseStudies: [
      {
        couple: "N + A",
        route: "Colombo → Ella → Tangalle",
        budget: "$4,200–$5,000",
        summary: "10 nights: boutique stays, tea trails, and a relaxed beach finale.",
        quote: "Sample itinerary",
      },
      {
        couple: "R + M",
        route: "Sigiriya → Kandy → Galle",
        budget: "$2,800–$3,400",
        summary: "8 nights: culture landmarks plus intimate coastal time.",
        quote: "Sample itinerary",
      },
      {
        couple: "D + S",
        route: "Bentota → Yala → Weligama",
        budget: "$5,500–$6,600",
        summary: "9 nights: villa stays, private safari, and signature dining.",
        quote: "Sample itinerary",
      },
    ],
  },
  approach: {
    id: "approach",
    heading: "Our approach",
    subcopy: "Concierge craft with clarity, not booking-engine complexity.",
    steps: [
      {
        title: "Discovery",
        description: "Your dates, budget, and what matters most to you.",
        icon: MessageSquareHeart,
      },
      {
        title: "Design",
        description: "We craft a tailored route, stays, and moments.",
        icon: MapPinned,
      },
      {
        title: "Refinement",
        description: "You review. We adjust until it feels right.",
        icon: Sparkles,
      },
      {
        title: "Seamless travel",
        description: "We handle bookings, transfers, and on-ground support.",
        icon: HeartHandshake,
      },
    ],
  },
  whyUs: {
    heading: "Why Honeymoons.lk",
    subcopy: "Concierge-led honeymoon design, grounded in Sri Lanka expertise.",
    points: [
      {
        title: "Concierge-led, not listings-led",
        description: "One team owns the trip end-to-end — planning, bookings, and logistics.",
        icon: Compass,
      },
      {
        title: "No OTA overwhelm",
        description: "No hotel grids or price hunting. We curate options that match your brief.",
        icon: ShieldCheck,
      },
      {
        title: "Clear budget guidance",
        description: "We design to your comfort range and explain tradeoffs before you commit.",
        icon: Wallet,
      },
    ],
  },
  finalCta: {
    heading: "Ready to plan your Sri Lanka honeymoon?",
    subcopy:
      "Share your brief and we’ll come back with tailored options within 24–48 hours.",
    primary: "Start Planning",
    secondary: "Explore Our Approach",
  },
  footer: {
    note: "Concierge-crafted Sri Lanka honeymoons for modern couples.",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
      { label: "Partner With Us", href: "/partner-with-us" },
      { label: "Privacy", href: "/privacy" },
    ],
    copyright: "© 2026 Honeymoons.lk",
  },
} as const;

export default function HomePage() {
  const [testimonialApi, setTestimonialApi] = useState<CarouselApi | null>(null);
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);
  const [isMomentPaused, setIsMomentPaused] = useState(false);
  const [momentUserInteracted, setMomentUserInteracted] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const marqueeLogos = [...content.partners.logos, ...content.partners.logos];

  useEffect(() => {
    if (!testimonialApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const intervalId = window.setInterval(() => {
      testimonialApi.scrollNext();
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [testimonialApi]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleMotionChange();
    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      const visible = document.visibilityState === "visible";
      setIsPageVisible(visible);
      if (!visible) {
        setIsMomentPaused(true);
      } else if (!momentUserInteracted && !prefersReducedMotion) {
        setIsMomentPaused(false);
      }
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [momentUserInteracted, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isMomentPaused) return;
    if (!isPageVisible) return;

    const intervalId = window.setInterval(() => {
      setActiveMomentIndex((prev) => (prev + 1) % content.moments.panels.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isMomentPaused, isPageVisible, prefersReducedMotion]);

  const handleMomentNavigate = (nextIndex: number) => {
    const total = content.moments.panels.length;
    const normalized = ((nextIndex % total) + total) % total;
    setActiveMomentIndex(normalized);
    setMomentUserInteracted(true);
    setIsMomentPaused(true);
  };

  const handleMomentKeyDown: KeyboardEventHandler<HTMLElement> = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handleMomentNavigate(activeMomentIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleMomentNavigate(activeMomentIndex + 1);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--brand-tint-2)]/35 via-background to-[var(--brand-tint-1)]/35 text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {content.header.brand}
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {content.header.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild>
              <Link href={content.header.cta.href}>{content.header.cta.label}</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[290px]">
              <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile">
                {content.header.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-sm text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="my-2" />
                <Button asChild>
                  <Link href={content.header.cta.href}>{content.header.cta.label}</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 px-4 py-14 md:grid-cols-12 md:gap-10 md:px-6 md:py-16">
        <div className="space-y-6 md:col-span-5 md:max-w-xl md:pt-4">
          <Badge variant="secondary" className="bg-[var(--brand-tint-1)] text-foreground">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            {content.hero.kicker}
          </Badge>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {content.hero.heading}
          </h1>

          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
            {content.hero.emotionSentence}
          </p>

          <p className="text-base leading-relaxed text-foreground/85 md:text-lg">
            {content.hero.emotionTagline}
          </p>

          <div className="mt-8 max-w-[520px]">
            <Carousel setApi={setTestimonialApi} className="rounded-xl bg-[var(--brand-tint-2)]/40 p-5">
              <CarouselContent className="-ml-0 gap-0">
                {content.hero.testimonials.map((item) => (
                  <CarouselItem key={`${item.name}-${item.origin}`} className="pl-0">
                    <div className="space-y-3">
                      <Quote className="h-4 w-4 text-primary/70" aria-hidden="true" />
                      <p className="text-base leading-relaxed text-foreground/90">{item.quote}</p>
                      <p className="text-sm font-medium text-foreground/75">{`— ${item.name}, ${item.origin}`}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="mt-14">
            <p className="text-base">
              <span className="font-semibold text-foreground">{content.hero.secondaryStrip.label}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {content.hero.secondaryStrip.items[0]} · {content.hero.secondaryStrip.items[1]} ·{" "}
              {content.hero.secondaryStrip.items[2]}
            </p>
          </div>
        </div>

        <BriefIntakeCard
          id="brief-card"
          className="overflow-hidden border-border bg-card shadow-md shadow-primary/10 md:col-span-7 md:sticky md:top-24 md:max-w-[620px] md:justify-self-end"
        />
      </section>

      <section id={content.moments.id} className="moments-section w-full py-20 md:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[1.5px] text-muted-foreground">
            {content.moments.eyebrow}
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            {content.moments.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {content.moments.subcopy}
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <div
            className="group relative h-[48vh] min-h-[360px] w-full overflow-hidden md:h-[55vh] lg:h-[60vh] lg:min-h-[520px] lg:max-h-[720px]"
            tabIndex={0}
            onKeyDown={handleMomentKeyDown}
            onMouseEnter={() => {
              if (window.matchMedia("(min-width: 1024px)").matches) setIsMomentPaused(true);
            }}
            onMouseLeave={() => {
              if (!momentUserInteracted && !prefersReducedMotion && isPageVisible) {
                setIsMomentPaused(false);
              }
            }}
          >
            {content.moments.panels.map((panel, index) => {
              const isActive = index === activeMomentIndex;
              return (
                <div
                  key={panel.title}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity ${
                    prefersReducedMotion ? "duration-150" : "duration-[800ms]"
                  } ease-out ${isActive ? "opacity-100" : "opacity-0"}`}
                >
                  <div
                    className={`absolute inset-0 transition-transform ${
                      prefersReducedMotion ? "duration-150" : "duration-[800ms]"
                    } ease-out ${isActive ? "scale-[1.02]" : "scale-100"} md:group-hover:scale-105`}
                    style={{
                      backgroundImage: `url(${panel.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.18) 70%, rgba(0,0,0,0.05) 100%)",
                    }}
                  />
                  <div className="absolute bottom-7 left-5 z-10 max-w-[520px] md:bottom-14 md:left-14">
                    <h3 className="text-[20px] font-semibold uppercase tracking-[1.5px] text-white md:text-[28px]">
                      {panel.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.6] text-white/95 md:text-[18px]">
                      {panel.body}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
              {content.moments.panels.map((panel, index) => (
                <button
                  key={`${panel.title}-dot`}
                  type="button"
                  aria-label={`Go to moment ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === activeMomentIndex ? "bg-white" : "bg-white/45 hover:bg-white/70"
                  }`}
                  onClick={() => handleMomentNavigate(index)}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Previous moment"
              className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/25 p-2 text-white/85 transition-colors hover:bg-black/40 lg:block"
              onClick={() => handleMomentNavigate(activeMomentIndex - 1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next moment"
              className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/25 p-2 text-white/85 transition-colors hover:bg-black/40 lg:block"
              onClick={() => handleMomentNavigate(activeMomentIndex + 1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section id={content.stays.id} className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-8 max-w-3xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{content.stays.heading}</h2>
          <p className="text-muted-foreground">{content.stays.subcopy}</p>
          <p className="text-sm text-muted-foreground">{content.stays.note}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.stays.items.map((stay) => (
            <Card key={stay.title} className="overflow-hidden border-border">
              <div className="h-20 bg-gradient-to-r from-[var(--brand-tint-2)] to-muted" />
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg">{stay.title}</CardTitle>
                <CardDescription>{stay.description}</CardDescription>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stay.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="text-[10px]">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section id={content.flow.id} className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{content.flow.heading}</h2>
          <p className="text-muted-foreground">{content.flow.subcopy}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {content.flow.steps.map((step) => (
            <Card key={step.stop} className="border-border">
              <CardHeader className="space-y-1">
                <CardTitle className="text-base">{step.stop}</CardTitle>
                <CardDescription>{step.detail}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <p className="mt-5 text-sm text-muted-foreground">{content.flow.note}</p>
      </section>

      <section id={content.partners.id} className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="mb-6 max-w-xl space-y-2">
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{content.partners.heading}</h3>
          <p className="text-sm text-muted-foreground">{content.partners.subcopy}</p>
        </div>
        <div className="group relative rounded-xl border border-border bg-background/70 p-3 focus-within:[&_.marquee-track]:[animation-play-state:paused] hover:[&_.marquee-track]:[animation-play-state:paused]">
          <div className="overflow-x-auto md:overflow-hidden">
            <div className="marquee-track flex w-max gap-3 motion-safe:animate-[marquee-left_26s_linear_infinite] motion-reduce:animate-none">
              {marqueeLogos.map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="flex h-16 min-w-[160px] items-center justify-center rounded-lg border border-border bg-[var(--brand-tint-2)] px-4 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground"
                  tabIndex={0}
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id={content.stories.id} className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{content.stories.heading}</h2>
          <p className="text-muted-foreground">{content.stories.subcopy}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {content.stories.caseStudies.map((story) => (
            <Card key={story.couple} className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4 text-lg">
                  <span>{story.couple}</span>
                  <Badge variant="secondary">{story.budget}</Badge>
                </CardTitle>
                <CardDescription>{story.route}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{story.summary}</p>
                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">{story.quote}</p>
                <Button asChild variant="outline">
                  <Link href="/real-honeymoons">See this honeymoon</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id={content.approach.id} className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{content.approach.heading}</h2>
          <p className="text-muted-foreground">{content.approach.subcopy}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.approach.steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="h-full border-border">
                <CardHeader>
                  <div className="mb-3 w-fit rounded-md bg-[var(--brand-tint-1)] p-2 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{content.whyUs.heading}</h2>
          <p className="text-muted-foreground">{content.whyUs.subcopy}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {content.whyUs.points.map((point) => {
            const Icon = point.icon;
            return (
              <Card key={point.title} className="border-border">
                <CardHeader>
                  <div className="mb-3 w-fit rounded-md bg-muted p-2 text-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{point.title}</CardTitle>
                  <CardDescription>{point.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-6 md:pb-20">
        <Card className="border-border bg-gradient-to-r from-[var(--brand-tint-2)] to-[var(--brand-tint-1)]">
          <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{content.finalCta.heading}</h2>
              <p className="text-muted-foreground">{content.finalCta.subcopy}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/start">{content.finalCta.primary}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/approach">{content.finalCta.secondary}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border bg-background/90">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
          <div className="flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>{content.footer.note}</p>
            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {content.footer.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{content.footer.copyright}</p>
        </div>
      </footer>
    </main>
  );
}
