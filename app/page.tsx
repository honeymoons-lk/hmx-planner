import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  Compass,
  HeartHandshake,
  MapPinned,
  Menu,
  MessageSquareHeart,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const content = {
  header: {
    brand: "Honeymoons.lk",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Styles", href: "#styles" },
      { label: "Wow Moments", href: "#experiences" },
      { label: "Stories", href: "#stories" },
    ],
  },
  hero: {
    kicker: "Sri Lanka Honeymoon Concierge",
    heading: "Your honeymoon, planned like a love story. Not a booking list.",
    subcopy:
      "We design your route, stays, and once-in-a-lifetime moments around your pace, style, and budget. One expert planner, from first call to final sunset.",
  },
  proof: [
    "Local planners based in Sri Lanka",
    "Personal itinerary + WhatsApp support",
    "Plans built around your budget range",
  ],
  howItWorks: {
    heading: "How It Works",
    subcopy:
      "A simple 4-step process from preferences to confirmed journey.",
    steps: [
      {
        title: "Share your vision",
        description:
          "Tell us your dates, budget comfort zone, and the vibe you want as a couple.",
        icon: MessageSquareHeart,
      },
      {
        title: "Get a custom route",
        description:
          "Your planner crafts a day-by-day honeymoon path with thoughtful pacing.",
        icon: MapPinned,
      },
      {
        title: "Refine together",
        description:
          "We adjust hotels, experiences, and flow until it feels exactly right.",
        icon: CalendarCheck2,
      },
      {
        title: "Travel stress-free",
        description:
          "Everything is coordinated for you, with support while you are in-country.",
        icon: HeartHandshake,
      },
    ],
  },
  styles: {
    heading: "Honeymoon Styles",
    subcopy: "Start with a style and we prefill your planner instantly.",
    items: [
      {
        title: "Luxury Escape",
        description: "Private villas, signature dining, and elevated comfort.",
        href: "/plan/start?style=luxury",
      },
      {
        title: "Beach & Slow Days",
        description: "Oceanfront stays, spa mornings, and golden-hour evenings.",
        href: "/plan/start?style=beach",
      },
      {
        title: "Nature & Adventure",
        description: "Tea hills, safaris, scenic trains, and soft adventure.",
        href: "/plan/start?style=adventure",
      },
      {
        title: "Culture & Boutique",
        description: "Heritage towns, curated stays, and meaningful local moments.",
        href: "/plan/start?style=culture",
      },
    ],
  },
  experiences: {
    heading: "Signature Wow Moments",
    subcopy: "Layer unforgettable highlights into your route.",
    items: [
      {
        title: "Private Cliffside Dinner",
        description: "A candlelit setup with ocean views and custom menu planning.",
        href: "/plan/start?experience=private-dinner",
      },
      {
        title: "Scenic Train + Tea Estate Day",
        description:
          "Reserved seats, private transfers, and a photo-ready tea country journey.",
        href: "/plan/start?experience=scenic-train",
      },
      {
        title: "Sunrise Wildlife Safari",
        description:
          "Early access safari with an expert tracker and curated picnic stop.",
        href: "/plan/start?experience=safari",
      },
    ],
  },
  stories: {
    heading: "Real Honeymoons",
    subcopy: "Recent journeys we planned across different budgets.",
    caseStudies: [
      {
        couple: "N + A",
        route: "Colombo -> Ella -> Tangalle",
        budget: "$4,200 - $5,000",
        summary:
          "10 nights focused on boutique stays, tea trails, and relaxed beach finale.",
      },
      {
        couple: "R + M",
        route: "Sigiriya -> Kandy -> Galle",
        budget: "$2,800 - $3,400",
        summary:
          "8 nights blending cultural landmarks with intimate coastal time.",
      },
      {
        couple: "D + S",
        route: "Bentota -> Yala -> Weligama",
        budget: "$5,500 - $6,600",
        summary:
          "9 nights with villa stays, private safari, and premium dining moments.",
      },
    ],
  },
  whyUs: {
    heading: "Why Honeymoons.lk",
    subcopy:
      "We are a planning concierge, explicitly not an OTA marketplace.",
    points: [
      {
        title: "Planner-first, not listing-first",
        description:
          "You work with one human expert who shapes your whole trip end-to-end.",
        icon: Compass,
      },
      {
        title: "No OTA overwhelm",
        description:
          "No endless hotel grids, filters, or generic booking flows. Just a tailored plan.",
        icon: ShieldCheck,
      },
      {
        title: "Budget clarity up front",
        description:
          "We design to your comfort range and explain tradeoffs clearly before decisions.",
        icon: Wallet,
      },
    ],
  },
  finalCta: {
    heading: "Ready to plan your honeymoon with a real expert?",
    subcopy:
      "Tell us your dates and style. We will craft your first custom draft itinerary.",
  },
  footer: {
    note: "Concierge-crafted Sri Lanka honeymoons for modern couples.",
    copyright: "© 2026 Honeymoons.lk",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-rose-50/40 text-stone-900">
      <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            {content.header.brand}
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
            {content.header.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-stone-700 transition-colors hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild>
              <Link href="/plan/start">Start Planning</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[290px]">
              <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile">
                {content.header.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-sm text-base text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="my-2" />
                <Button asChild>
                  <Link href="/plan/start">Start Planning</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 md:gap-12 md:px-6 md:py-20">
        <div className="space-y-6">
          <Badge variant="secondary" className="bg-rose-100 text-rose-800">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            {content.hero.kicker}
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {content.hero.heading}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-stone-600 md:text-lg">
            {content.hero.subcopy}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/plan/start">
                Start Planning <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
        </div>

        <Card className="border-stone-200 bg-white/90 shadow-sm">
          <CardHeader>
            <CardTitle>Planner Preview</CardTitle>
            <CardDescription>
              A sample of how your honeymoon brief transforms into a polished route.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border border-stone-200 bg-gradient-to-r from-rose-100 to-amber-100 p-4">
              <p className="text-sm font-medium text-stone-800">9 Nights | Couple Focused</p>
              <p className="mt-1 text-sm text-stone-600">Hill country romance + south coast unwind</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                <p className="text-xs uppercase tracking-wide text-stone-500">Stay style</p>
                <p className="mt-1 text-sm font-medium text-stone-800">Boutique + Villa mix</p>
              </div>
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
                <p className="text-xs uppercase tracking-wide text-stone-500">Budget range</p>
                <p className="mt-1 text-sm font-medium text-stone-800">$3.5k - $4.5k</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-4/5 rounded-full bg-stone-200" />
              <div className="h-3 w-3/5 rounded-full bg-stone-200" />
              <div className="h-3 w-2/3 rounded-full bg-stone-200" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-label="Proof bar" className="border-y border-stone-200 bg-white/70">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 py-5 text-sm text-stone-700 md:grid-cols-3 md:px-6">
          {content.proof.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {content.howItWorks.heading}
          </h2>
          <p className="text-stone-600">{content.howItWorks.subcopy}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.howItWorks.steps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="h-full border-stone-200">
                <CardHeader>
                  <div className="mb-3 w-fit rounded-md bg-rose-100 p-2 text-rose-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-stone-600">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="styles" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {content.styles.heading}
          </h2>
          <p className="text-stone-600">{content.styles.subcopy}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {content.styles.items.map((style, index) => (
            <Card key={style.title} className="overflow-hidden border-stone-200">
              <div
                className={`h-2 ${
                  index % 2 === 0
                    ? "bg-gradient-to-r from-rose-300 to-amber-300"
                    : "bg-gradient-to-r from-sky-300 to-emerald-300"
                }`}
              />
              <CardHeader>
                <CardTitle>{style.title}</CardTitle>
                <CardDescription>{style.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href={style.href}>Start Planning</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="experiences" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {content.experiences.heading}
          </h2>
          <p className="text-stone-600">{content.experiences.subcopy}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {content.experiences.items.map((experience) => (
            <Card key={experience.title} className="border-stone-200">
              <CardHeader>
                <CardTitle>{experience.title}</CardTitle>
                <CardDescription>{experience.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href={experience.href}>Start Planning</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="stories" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {content.stories.heading}
          </h2>
          <p className="text-stone-600">{content.stories.subcopy}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {content.stories.caseStudies.map((story) => (
            <Card key={story.couple} className="border-stone-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4 text-lg">
                  <span>{story.couple}</span>
                  <Badge variant="secondary">{story.budget}</Badge>
                </CardTitle>
                <CardDescription>{story.route}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-stone-600">{story.summary}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {content.whyUs.heading}
          </h2>
          <p className="text-stone-600">{content.whyUs.subcopy}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {content.whyUs.points.map((point) => {
            const Icon = point.icon;
            return (
              <Card key={point.title} className="border-stone-200">
                <CardHeader>
                  <div className="mb-3 w-fit rounded-md bg-stone-100 p-2 text-stone-700">
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
        <Card className="border-rose-200 bg-gradient-to-r from-rose-50 to-amber-50">
          <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {content.finalCta.heading}
              </h2>
              <p className="text-stone-600">{content.finalCta.subcopy}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/plan/start">Start Planning</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-stone-200 bg-white/80">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-stone-600 md:flex-row md:items-center md:justify-between md:px-6">
          <p>{content.footer.note}</p>
          <p>{content.footer.copyright}</p>
        </div>
      </footer>
    </main>
  );
}
