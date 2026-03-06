"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar, type DateRange } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type BriefIntakeCardProps = {
  id?: string;
  className?: string;
  title?: string;
  description?: string;
};

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

function differenceInDays(from: Date, to: Date) {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate()).getTime();
  return Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
}

const formContent = {
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
    { value: "luxury", label: "Elevated & indulgent" },
    { value: "beach", label: "Beach & slow mornings" },
    { value: "adventure", label: "Nature & soft adventure" },
    { value: "culture", label: "Culture & boutique charm" },
  ],
  wowOptions: [
    { value: "private-dinner", label: "Private cliffside dinner" },
    { value: "safari", label: "Sunrise safari experience" },
    { value: "scenic-train", label: "Scenic train through tea country" },
    { value: "beach-villa", label: "Secluded beach villa stay" },
  ],
  paceOptions: [
    { value: "relaxed", label: "Light & easy" },
    { value: "balanced", label: "A bit of both" },
    { value: "packed", label: "Packed with highlights" },
  ],
  reassurance: "Takes about 60 seconds. We’ll reply personally within 24–48 hours.",
};

export function BriefIntakeCard({
  id,
  className,
  title = "Tell us about the journey you are imagining",
  description = "4 quick choices. Add dates if you have them. We’ll come back with a tailored proposal.",
}: BriefIntakeCardProps) {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [nights, setNights] = useState("");
  const [styles, setStyles] = useState<string[]>([]);
  const [styleSearch, setStyleSearch] = useState("");
  const [stylePopoverOpen, setStylePopoverOpen] = useState(false);
  const [pace, setPace] = useState("");
  const [wow, setWow] = useState("");

  const calculatedNights = useMemo(() => {
    if (timeframe !== "pick-dates") return null;
    if (!dateRange?.from || !dateRange?.to) return null;
    return differenceInDays(dateRange.from, dateRange.to);
  }, [dateRange, timeframe]);

  const selectedNightsValue = timeframe === "pick-dates" ? (calculatedNights ? String(calculatedNights) : "") : nights;

  const canSubmitBrief = useMemo(() => {
    const hasPrimaryFields = Boolean(timeframe && styles.length > 0 && wow && pace);
    if (!hasPrimaryFields) return false;
    if (timeframe === "pick-dates") {
      return Boolean(dateRange?.from && dateRange?.to && calculatedNights);
    }
    return Boolean(nights);
  }, [calculatedNights, dateRange?.from, dateRange?.to, nights, pace, styles.length, timeframe, wow]);

  const filteredStyleOptions = useMemo(() => {
    const query = styleSearch.trim().toLowerCase();
    if (!query) return formContent.styleOptions;
    return formContent.styleOptions.filter((styleOption) => styleOption.label.toLowerCase().includes(query));
  }, [styleSearch]);

  const toggleStyle = (value: string) => {
    setStyles((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleSubmitBrief = () => {
    const params = new URLSearchParams();

    if (timeframe) params.set("timeframe", timeframe);
    if (timeframe === "pick-dates") {
      if (dateRange?.from) params.set("start", toISODate(dateRange.from));
      if (dateRange?.to) params.set("end", toISODate(dateRange.to));
    }
    if (selectedNightsValue) params.set("nights", selectedNightsValue);
    if (styles.length) params.set("styles", styles.join(","));
    if (wow) params.set("wow", wow);
    if (pace) params.set("pace", pace);

    const query = params.toString();
    router.push(query ? `/plan/start?${query}` : "/plan/start");
  };

  return (
    <Card id={id} className={className}>
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-[var(--color-accent)] to-[var(--color-bg-alt)]" />
      <CardHeader className="space-y-3 px-7 pt-7">
        <CardTitle className="type-subheading font-serif">{title}</CardTitle>
        <CardDescription className="type-body text-muted-foreground">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-7 pb-7">
        <div className="space-y-2">
          <Label htmlFor="timeframe">When would you like to travel?</Label>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger id="timeframe" className="w-full">
              <SelectValue placeholder="Choose a timeframe" />
            </SelectTrigger>
            <SelectContent>
              {formContent.timeframeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {timeframe === "pick-dates" ? (
          <div className="space-y-2">
            <Label>Travel dates</Label>
            <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" className="w-full justify-start border-input text-left font-normal">
                <CalendarDays className="mr-2 h-4 w-4" />
                  {dateRange?.from && dateRange?.to
                    ? `${formatDateLabel(dateRange.from)} – ${formatDateLabel(dateRange.to)}`
                    : dateRange?.from
                      ? "Select return date"
                      : "Select your dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full min-w-[280px] border-border bg-popover p-3" align="start">
                <Calendar mode="range" selected={dateRange} onSelect={setDateRange} />
              </PopoverContent>
            </Popover>

            {calculatedNights ? (
              <p className="type-ui-sm text-muted-foreground">
                Trip length: {calculatedNights} night{calculatedNights > 1 ? "s" : ""} (auto-calculated)
              </p>
            ) : (
              <p className="type-ui-sm text-muted-foreground">Select return date</p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="nights">Nights</Label>
            <Select value={nights} onValueChange={setNights}>
              <SelectTrigger id="nights" className="w-full">
                <SelectValue placeholder="Choose stay length" />
              </SelectTrigger>
              <SelectContent>
                {formContent.nights.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label>What kind of experience are you picturing?</Label>
          <Popover open={stylePopoverOpen} onOpenChange={setStylePopoverOpen}>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" className="h-auto min-h-10 w-full justify-between">
                <span className="mr-3 flex flex-wrap gap-1.5 text-left">
                  {styles.length > 0 ? (
                    styles.map((value) => {
                      const label = formContent.styleOptions.find((item) => item.value === value)?.label ?? value;
                      return (
                        <span key={value} className="type-ui-sm rounded-md border border-border bg-muted px-2 py-0.5 text-foreground">
                          {label}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-muted-foreground">Choose one or more</span>
                  )}
                </span>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] border-border bg-popover p-0" align="start">
              <Command>
                <CommandInput placeholder="Search styles..." value={styleSearch} onChange={(event) => setStyleSearch(event.target.value)} />
                <CommandList>
                  {filteredStyleOptions.length === 0 ? (
                    <CommandEmpty>No styles found.</CommandEmpty>
                  ) : (
                    <CommandGroup>
                      {filteredStyleOptions.map((opt) => {
                        const isSelected = styles.includes(opt.value);
                        return (
                          <CommandItem key={opt.value} onClick={() => toggleStyle(opt.value)}>
                            <span
                              className={`inline-flex h-4 w-4 items-center justify-center rounded-sm border border-border ${
                                isSelected ? "bg-primary text-primary-foreground" : "bg-background"
                              }`}
                            >
                              {isSelected ? <Check className="h-3 w-3" /> : null}
                            </span>
                            {opt.label}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="wow">What would make this honeymoon unforgettable for you?</Label>
          <Select value={wow} onValueChange={setWow}>
            <SelectTrigger id="wow" className="w-full">
              <SelectValue placeholder="Choose a highlight" />
            </SelectTrigger>
            <SelectContent>
              {formContent.wowOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>How would you like the days to flow?</Label>
          <ToggleGroup type="single" value={pace} onValueChange={(v) => setPace(v || "")} className="grid w-full grid-cols-3 gap-2">
            {formContent.paceOptions.map((opt) => (
              <ToggleGroupItem key={opt.value} value={opt.value} className="w-full border border-border" aria-label={opt.label}>
                {opt.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <Button
            type="button"
            size="lg"
            className="w-full disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!canSubmitBrief}
            onClick={handleSubmitBrief}
          >
            Continue Planning
          </Button>

          <p className="type-ui-sm text-center text-muted-foreground">{formContent.reassurance}</p>

          <p className="type-ui-sm text-center text-muted-foreground">
            Prefer a quick chat first?{" "}
            <Link href="/plan/consultation" className="font-medium text-foreground underline underline-offset-4">
              Book a call
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
