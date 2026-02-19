"use client";

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, type DateRange } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
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
} from "lucide-react"

const dateLabelFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
})

function formatDateLabel(date: Date) {
  return dateLabelFormatter.format(date)
}

function toISODate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

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
    budgetOptions: [
      { value: "value", label: "Value" },
      { value: "mid", label: "Mid" },
      { value: "lux", label: "Luxury" },
    ],
    styleOptions: [
      { value: "luxury", label: "Luxury" },
      { value: "beach", label: "Beach" },
      { value: "adventure", label: "Adventure" },
      { value: "culture", label: "Culture" },
    ],
    paceOptions: [
      { value: "relaxed", label: "Relaxed" },
      { value: "balanced", label: "Balanced" },
      { value: "packed", label: "Packed" },
    ],
    wowOptions: [
      { value: "private-dinner", label: "Private dinner" },
      { value: "safari", label: "Safari" },
      { value: "scenic-train", label: "Scenic train" },
      { value: "beach-villa", label: "Beach villa" },
    ],
    outcomes: [
      "Suggested route + pacing",
      "Stay style recommendations",
      "3 signature wow moments",
    ],
  },
  proof: [
    "Local planners based in Sri Lanka",
    "Personal itinerary + WhatsApp support",
    "Plans built around your budget range",
  ],
  partners: {
    heading: "Partners we trust",
    subcopy: "Trusted Sri Lankan brands we love working with.",
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
        href: "/plan/start?wow=private-dinner",
      },
      {
        title: "Scenic Train + Tea Estate Day",
        description:
          "Reserved seats, private transfers, and a photo-ready tea country journey.",
        href: "/plan/start?wow=scenic-train",
      },
      {
        title: "Sunrise Wildlife Safari",
        description:
          "Early access safari with an expert tracker and curated picnic stop.",
        href: "/plan/start?wow=safari",
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
}

export default function HomePage() {
  const router = useRouter()

  const [timeframe, setTimeframe] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [nights, setNights] = useState("")
  const [budget, setBudget] = useState("")
  const [style, setStyle] = useState("")
  const [pace, setPace] = useState("")
  const [wow, setWow] = useState("")

  const canCreateDraft = useMemo(() => {
    const hasPrimaryFields = Boolean(timeframe && style && wow)
    if (!hasPrimaryFields) return false
    if (timeframe !== "pick-dates") return true
    return Boolean(dateRange?.from && dateRange?.to)
  }, [dateRange?.from, dateRange?.to, style, timeframe, wow])

  const handleCreateDraft = () => {
    const params = new URLSearchParams()

    if (timeframe) params.set("timeframe", timeframe)
    if (timeframe === "pick-dates") {
      if (dateRange?.from) params.set("start", toISODate(dateRange.from))
      if (dateRange?.to) params.set("end", toISODate(dateRange.to))
    }
    if (nights) params.set("nights", nights)
    if (budget) params.set("budget", budget)
    if (style) params.set("style", style)
    if (pace) params.set("pace", pace)
    if (wow) params.set("wow", wow)

    const query = params.toString()
    router.push(query ? `/plan/start?${query}` : "/plan/start")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--brand-tint-2)]/35 via-background to-[var(--brand-tint-1)]/35 text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
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
                    className="rounded-sm text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-10 px-4 py-14 md:grid-cols-2 md:gap-12 md:px-6 md:py-20">
        <div className="space-y-6 md:pt-4">
          <Badge variant="secondary" className="bg-[var(--brand-tint-1)] text-foreground">
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            {content.hero.kicker}
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            {content.hero.heading}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.hero.subcopy}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" size="lg">
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>
          <Link
            href="#mini-planner"
            className="inline-flex text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Ready now? Start on the right →
          </Link>
        </div>

        <Card id="mini-planner" className="overflow-hidden border-border bg-card shadow-md shadow-primary/10 md:sticky md:top-24">
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-[var(--brand-tint-1)] to-[var(--brand-tint-2)]" />
          <CardHeader className="space-y-2 px-6 pt-6">
            <CardTitle className="text-2xl">Start your plan</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              4 quick questions. We&apos;ll tailor your first draft.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-6 pb-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="timeframe">When?</Label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger id="timeframe" className="w-full">
                    <SelectValue placeholder="Choose timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    {content.hero.timeframeOptions.map((timeframeOption) => (
                      <SelectItem key={timeframeOption.value} value={timeframeOption.value}>
                        {timeframeOption.label}
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
                    {content.hero.nights.map((nightOption) => (
                      <SelectItem key={nightOption.value} value={nightOption.value}>
                        {nightOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

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
                  <PopoverContent className="w-full min-w-[280px] border-border bg-popover p-3" align="start">
                    <Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
                  </PopoverContent>
                </Popover>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Label>Style</Label>
                <ToggleGroup
                  type="single"
                  value={style}
                  onValueChange={(value) => setStyle(value || "")}
                  className="grid w-full grid-cols-2 gap-2"
                >
                  {content.hero.styleOptions.map((option) => (
                    <ToggleGroupItem
                      key={option.value}
                      value={option.value}
                      className="w-full border border-border"
                      aria-label={option.label}
                    >
                      {option.label}
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
                    {content.hero.wowOptions.map((wowOption) => (
                      <SelectItem key={wowOption.value} value={wowOption.value}>
                        {wowOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Accordion type="single" collapsible className="rounded-md border border-border px-3">
              <AccordionItem value="optional">
                <AccordionTrigger>Optional preferences</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4">
                    <div className="space-y-3">
                      <Label>Budget comfort</Label>
                      <RadioGroup
                        value={budget}
                        onValueChange={setBudget}
                        className="grid gap-2 sm:grid-cols-3"
                      >
                        {content.hero.budgetOptions.map((option) => (
                          <Label
                            key={option.value}
                            htmlFor={`budget-${option.value}`}
                            className="border-input hover:bg-muted focus-within:border-ring focus-within:ring-ring/40 flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 focus-within:ring-2"
                          >
                            <RadioGroupItem id={`budget-${option.value}`} value={option.value} />
                            {option.label}
                          </Label>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-3">
                      <Label>Pace</Label>
                      <ToggleGroup
                        type="single"
                        value={pace}
                        onValueChange={(value) => setPace(value || "")}
                        className="grid w-full grid-cols-3 gap-2"
                      >
                        {content.hero.paceOptions.map((option) => (
                          <ToggleGroupItem
                            key={option.value}
                            value={option.value}
                            className="w-full border border-border"
                            aria-label={option.label}
                          >
                            {option.label}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-2">
              <Button
                type="button"
                size="lg"
                className="w-full disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!canCreateDraft}
                onClick={handleCreateDraft}
              >
                Get my draft itinerary
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Reviewed by a real planner • First reply within 24–48h
              </p>
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

      <section aria-label="Proof bar" className="border-y border-border bg-background/80">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 py-5 text-sm text-muted-foreground md:grid-cols-3 md:px-6">
          {content.proof.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {content.partners.heading}
          </h2>
          <p className="text-muted-foreground">{content.partners.subcopy}</p>
        </div>
        <Carousel className="mx-10 md:mx-12">
          <CarouselContent>
            {content.partners.logos.map((partner) => (
              <CarouselItem
                key={partner}
                className="basis-[48%] md:basis-[31%] lg:basis-[22%] xl:basis-[17%]"
              >
                <div className="flex h-20 items-center justify-center rounded-lg border border-border bg-[var(--brand-tint-2)] px-4 text-center text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {partner}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {content.howItWorks.heading}
          </h2>
          <p className="text-muted-foreground">{content.howItWorks.subcopy}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.howItWorks.steps.map((step) => {
            const Icon = step.icon
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
            )
          })}
        </div>
      </section>

      <section id="styles" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {content.styles.heading}
          </h2>
          <p className="text-muted-foreground">{content.styles.subcopy}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {content.styles.items.map((style, index) => (
            <Card key={style.title} className="overflow-hidden border-border">
              <div
                className={`h-2 ${
                  index % 2 === 0
                    ? "bg-gradient-to-r from-primary to-[var(--brand-tint-1)]"
                    : "bg-gradient-to-r from-[var(--brand-tint-1)] to-[var(--brand-tint-2)]"
                }`}
              />
              <CardHeader>
                <CardTitle>{style.title}</CardTitle>
                <CardDescription>{style.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href={style.href}>Start this style</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex justify-start">
          <Button asChild size="lg">
            <Link href="/plan/start">Get my draft itinerary</Link>
          </Button>
        </div>
      </section>

      <section id="experiences" className="mx-auto w-full max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {content.experiences.heading}
          </h2>
          <p className="text-muted-foreground">{content.experiences.subcopy}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {content.experiences.items.map((experience) => (
            <Card key={experience.title} className="border-border">
              <CardHeader>
                <CardTitle>{experience.title}</CardTitle>
                <CardDescription>{experience.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link href={experience.href}>Include this in my plan</Link>
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
                  <Link href="/real-honeymoons">See this itinerary</Link>
                </Button>
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
          <p className="text-muted-foreground">{content.whyUs.subcopy}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {content.whyUs.points.map((point) => {
            const Icon = point.icon
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
            )
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-6 md:pb-20">
        <Card className="border-border bg-gradient-to-r from-[var(--brand-tint-2)] to-[var(--brand-tint-1)]">
          <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {content.finalCta.heading}
              </h2>
              <p className="text-muted-foreground">{content.finalCta.subcopy}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/plan/start">Get my draft itinerary</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t border-border bg-background/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <p>{content.footer.note}</p>
          <p>{content.footer.copyright}</p>
        </div>
      </footer>
    </main>
  )
}
