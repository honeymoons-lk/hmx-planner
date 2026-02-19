"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, type DateRange } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  ArrowRight,
  CalendarDays,
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

const dateLabelFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatDateLabel(date: Date) {
  return dateLabelFormatter.format(date);
}

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Concierge-first content map
 * - Avoid “planner” language
 * - Use “brief / proposal” language
 * - Avoid repeating the same claims in multiple places
 */
const content = {
  header: {
    brand: "Honeymoons.lk",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Stays", href: "#stays" },
      { label: "Partners", href: "#partners" },
      { label: "Stories", href: "#stories" },
    ],
  },
  hero: {
    kicker: "Sri Lanka Honeymoon Concierge",
    heading: "Your Sri Lanka honeymoon, handled end-to-end.",
    subcopy:
      "Tell us your style and pace. We plan, book, and run the trip — with a local concierge team on the ground.",
    supportLine:
      "Private transfers, vetted stays, and support while you’re in-country — handled.",
    reassurance: "Reviewed by our concierge team • First reply within 24–48h",
    timeframeOptions: [
      { value: "next-3-months", label: "Next 3 months" },
      { value: "3-6-months", label: "3–6 months" },
      { value: "6-12-months", label: "6–12 months" },
      { value: "pick-dates", label: "I know my dates" },
    ],
    nights: [
      { value: "5-7", label: "5–7 nights" },
      { value: "8-10", label: "8–10 nights" },
      { value: "11-14", label: "11–14 nights" },
      { value: "not-sure", label: "Not sure yet" },
    ],
    styleOptions: [
      { value: "luxury", label: "Luxury" },
      { value: "beach", label: "Beach" },
      { value: "adventure", label: "Adventure" },
      { value: "culture", label: "Culture" },
    ],
    wowOptions: [
      { value: "private-dinner", label: "Private dinner" },
      { value: "safari", label: "Safari" },
      { value: "scenic-train", label: "Scenic train" },
      { value: "beach-villa", label: "Beach villa" },
    ],
    optional: {
      title: "Optional preferences",
      budgetOptions: [
        { value: "value", label: "Value" },
        { value: "mid", label: "Mid" },
        { value: "lux", label: "Luxury" },
      ],
      paceOptions: [
        { value: "relaxed", label: "Relaxed" },
        { value: "balanced", label: "Balanced" },
        { value: "packed", label: "Packed" },
      ],
    },
    secondaryStrip: {
      label: "Also planning",
      items: ["Minimoons", "Babymoons", "Anniversary Escapes"],
    },
  },
  partners: {
    id: "partners",
    heading: "Trusted Sri Lankan partners",
    subcopy: "A few brands we regularly book with.",
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
  stays: {
    id: "stays",
    heading: "The kind of stays we curate",
    subcopy:
      "Not a catalogue. Just a quick sense of the standard we typically book.",
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
  howItWorks: {
    id: "how-it-works",
    heading: "How it works",
    subcopy: "A simple 4-step flow — you approve, we handle the rest.",
    steps: [
      {
        title: "Share your honeymoon brief",
        description:
          "Tell us your dates, vibe, and what matters most as a couple.",
        icon: MessageSquareHeart,
      },
      {
        title: "We craft a tailored proposal",
        description:
          "We design the route, stays, and wow moments to fit your pace and budget range.",
        icon: MapPinned,
      },
      {
        title: "Refine together",
        description:
          "You review. We adjust details until it feels exactly right.",
        icon: CalendarCheck2,
      },
      {
        title: "We run the trip",
        description:
          "Bookings, transfers, and on-ground support — coordinated end-to-end.",
        icon: HeartHandshake,
      },
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
        summary:
          "10 nights: boutique stays, tea trails, and a relaxed beach finale.",
      },
      {
        couple: "R + M",
        route: "Sigiriya → Kandy → Galle",
        budget: "$2,800–$3,400",
        summary:
          "8 nights: culture landmarks plus intimate coastal time.",
      },
      {
        couple: "D + S",
        route: "Bentota → Yala → Weligama",
        budget: "$5,500–$6,600",
        summary:
          "9 nights: villa stays, private safari, and signature dining.",
      },
    ],
  },
  whyUs: {
    heading: "Why Honeymoons.lk",
    subcopy: "Concierge-run honeymoons — not a booking marketplace.",
    points: [
      {
        title: "Operator-led, not listings-led",
        description:
          "One team owns the trip end-to-end — planning, bookings, and logistics.",
        icon: Compass,
      },
      {
        title: "No OTA overwhelm",
        description:
          "No hotel grids or price hunting. We curate options that match your brief.",
        icon: ShieldCheck,
      },
      {
        title: "Clear budget guidance",
        description:
          "We design to your comfort range and explain tradeoffs before you commit.",
        icon: Wallet,
      },
    ],
  },
  finalCta: {
    heading: "Ready for a Sri Lanka honeymoon concierge to handle it?",
    subcopy:
      "Start your brief. We’ll come back with a tailored proposal within 24–48 hours.",
    cta: "Start my honeymoon brief",
  },
  footer: {
    note: "Concierge-crafted Sri Lanka honeymoons for modern couples.",
    copyright: "© 2026 Honeymoons.lk",
  },
} as const;

export default function HomePage() {
  const router = useRouter();
  const marqueeLogos = [...content.partners.logos, ...content.partners.logos];

  const [timeframe, setTimeframe] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [nights, setNights] = useState("");
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("");
  const [pace, setPace] = useState("");
  const [wow, setWow] = useState("");

  const canSubmitBrief = useMemo(() => {
    const hasPrimaryFields = Boolean(timeframe && style && wow);
    if (!hasPrimaryFields) return false;
    if (timeframe !== "pick-dates") return true;
    return Boolean(dateRange?.from && dateRange?.to);
  }, [dateRange?.from, dateRange?.to, style, timeframe, wow]);

  const handleSubmitBrief = () => {
    const params = new URLSearchParams();

    if (timeframe) params.set("timeframe", timeframe);
    if (timeframe === "pick-dates") {
      if (dateRange?.from) params.set("start", toISODate(dateRange.from));
      if (dateRange?.to) params.set("end", toISODate(dateRange.to));
    }
    if (nights) params.set("nights", nights);
    if (budget) params.set("budget", budget);
    if (style) params.set("style", style);
    if (pace) params.set("pace", pace);
    if (wow) params.set("wow", wow);

    const query = params.toString();
    router.push(query ? `/plan/start?${query}` : "/plan/start");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--brand-tint-2)]/35 via-background to-[var(--brand-tint-1)]/35 text-foreground">
      {/* HEADER */}
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
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            {/* Keep header CTA but make it consistent with concierge positioning */}
            <Button asChild>
              <Link href="#brief-card">Start my brief</Link>
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
                    key={link.href}
                    href={link.href}
                    className="rounded-sm text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="my-2" />
                <Button asChild>
                  <Link href="#brief-card">Start my brief</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 px-4 py-14 md:grid-cols-2 md:gap-10 md:px-6 md:py-20">
        {/* Left */}
        <div className="space-y-6 md:max-w-xl md:pt-4">
          <Badge variant="secondary" className="bg-[var(--brand-tint-1)] text-foreground">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            {content.hero.kicker}
          </Badge>

          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {content.hero.heading}
          </h1>

          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.hero.subcopy}
          </p>

          <p className="text-sm font-medium text-foreground/90 md:text-base">
            {content.hero.supportLine}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" size="lg">
              <Link href={`#${content.howItWorks.id}`}>See how it works</Link>
            </Button>
          </div>

          {/* Secondary: other moons (subtle, not core nav) */}
          <div className="rounded-md border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
            <span className="mr-2 font-medium text-foreground/90">
              {content.hero.secondaryStrip.label}
            </span>
            <span>{content.hero.secondaryStrip.items[0]}</span>
            <span className="mx-2">•</span>
            <span>{content.hero.secondaryStrip.items[1]}</span>
            <span className="mx-2">•</span>
            <span>{content.hero.secondaryStrip.items[2]}</span>
          </div>
        </div>

        {/* Right: Honeymoon brief card */}
        <Card
          id="brief-card"
          className="overflow-hidden border-border bg-card shadow-md shadow-primary/10 md:sticky md:top-24 md:max-w-[540px] md:justify-self-end"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-[var(--brand-tint-1)] to-[var(--brand-tint-2)]" />
          <CardHeader className="space-y-2 px-6 pt-6">
            <CardTitle className="text-2xl">Start your honeymoon brief</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              4 quick questions. We&apos;ll come back with a tailored proposal.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 px-6 pb-6">
            {/* When + Nights */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="timeframe">When?</Label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger id="timeframe" className="w-full">
                    <SelectValue placeholder="Choose timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    {content.hero.timeframeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nights">Nights</Label>
                <Select value={nights} onValueChange={setNights}>
                  <SelectTrigger id="nights" className="w-full">
                    <SelectValue placeholder="Choose stay length" />
                  </SelectTrigger>
                  <SelectContent>
                    {content.hero.nights.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Optional date range picker */}
            {timeframe === "pick-dates" ? (
              <div className="space-y-2">
                <Label>Travel dates</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start border-input text-left font-normal"
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {dateRange?.from && dateRange?.to
                        ? `${formatDateLabel(dateRange.from)} – ${formatDateLabel(dateRange.to)}`
                        : dateRange?.from
                          ? "Select return date"
                          : "Select travel dates"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full min-w-[280px] border-border bg-popover p-3"
                    align="start"
                  >
                    <Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
                  </PopoverContent>
                </Popover>
              </div>
            ) : null}

            {/* Style + Wow */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label>Style</Label>
                <ToggleGroup
                  type="single"
                  value={style}
                  onValueChange={(v) => setStyle(v || "")}
                  className="grid w-full grid-cols-2 gap-2"
                >
                  {content.hero.styleOptions.map((opt) => (
                    <ToggleGroupItem
                      key={opt.value}
                      value={opt.value}
                      className="w-full border border-border"
                      aria-label={opt.label}
                    >
                      {opt.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wow">Top wow moment</Label>
                <Select value={wow} onValueChange={setWow}>
                  <SelectTrigger id="wow" className="w-full">
                    <SelectValue placeholder="Choose wow moment" />
                  </SelectTrigger>
                  <SelectContent>
                    {content.hero.wowOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Optional preferences */}
            <Accordion type="single" collapsible className="rounded-md border border-border px-3">
              <AccordionItem value="optional">
                <AccordionTrigger>{content.hero.optional.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4">
                    <div className="space-y-3">
                      <Label>Budget comfort</Label>
                      <RadioGroup
                        value={budget}
                        onValueChange={setBudget}
                        className="grid gap-2 sm:grid-cols-3"
                      >
                        {content.hero.optional.budgetOptions.map((opt) => (
                          <Label
                            key={opt.value}
                            htmlFor={`budget-${opt.value}`}
                            className="flex cursor-pointer items-center gap-3 rounded-md border border-input px-3 py-2 hover:bg-muted focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40"
                          >
                            <RadioGroupItem id={`budget-${opt.value}`} value={opt.value} />
                            {opt.label}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Pace</Label>
                      <ToggleGroup
                        type="single"
                        value={pace}
                        onValueChange={(v) => setPace(v || "")}
                        className="grid w-full grid-cols-3 gap-2"
                      >
                        {content.hero.optional.paceOptions.map((opt) => (
                          <ToggleGroupItem
                            key={opt.value}
                            value={opt.value}
                            className="w-full border border-border"
                            aria-label={opt.label}
                          >
                            {opt.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA */}
            <div className="space-y-2">
              <Button
                type="button"
                size="lg"
                className="w-full disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!canSubmitBrief}
                onClick={handleSubmitBrief}
              >
                Get my tailored proposal
              </Button>

              <p className="text-center text-xs text-muted-foreground">{content.hero.reassurance}</p>

              <p className="text-center text-xs text-muted-foreground">
                Need to talk first?{" "}
                <Link
                  href="/plan/consultation"
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Book a call
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* TRUST MARQUEE */}
      <section id={content.partners.id} className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{content.partners.heading}</h2>
          <p className="text-muted-foreground">{content.partners.subcopy}</p>
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

      {/* STAYS TEASER */}
      <section id={content.stays.id} className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{content.stays.heading}</h2>
          <p className="text-muted-foreground">{content.stays.subcopy}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.stays.items.map((stay) => (
            <Card key={stay.title} className="overflow-hidden border-border">
              <div className="h-20 bg-gradient-to-r from-[var(--brand-tint-2)] to-muted" />
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg">{stay.title}</CardTitle>
                <CardDescription>{stay.description}</CardDescription>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stay.badges.map((b) => (
                    <Badge key={b} variant="secondary" className="text-[10px]">
                      {b}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id={content.howItWorks.id} className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{content.howItWorks.heading}</h2>
          <p className="text-muted-foreground">{content.howItWorks.subcopy}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.howItWorks.steps.map((step) => {
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

      {/* STORIES */}
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
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{story.summary}</p>
                <Button asChild variant="outline">
                  <Link href="/real-honeymoons">See this honeymoon</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* WHY US */}
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

      {/* FINAL CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-6 md:pb-20">
        <Card className="border-border bg-gradient-to-r from-[var(--brand-tint-2)] to-[var(--brand-tint-1)]">
          <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{content.finalCta.heading}</h2>
              <p className="text-muted-foreground">{content.finalCta.subcopy}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="#brief-card">{content.finalCta.cta}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`#${content.howItWorks.id}`}>See how it works</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <p>{content.footer.note}</p>
          <p>{content.footer.copyright}</p>
        </div>
      </footer>
    </main>
  );
}
