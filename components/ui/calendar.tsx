"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type DateRange = {
  from?: Date
  to?: Date
}

type CalendarProps = {
  className?: string
  mode?: "range"
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
}

function toInputValue(date?: Date) {
  if (!date) return ""
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function fromInputValue(value: string) {
  if (!value) return undefined
  const [year, month, day] = value.split("-").map(Number)
  if (!year || !month || !day) return undefined
  return new Date(year, month - 1, day)
}

function Calendar({ className, selected, onSelect }: CalendarProps) {
  const fromValue = toInputValue(selected?.from)
  const toValue = toInputValue(selected?.to)

  const handleFromChange = (value: string) => {
    const from = fromInputValue(value)
    const nextTo = selected?.to && from && selected.to < from ? undefined : selected?.to
    onSelect?.({ from, to: nextTo })
  }

  const handleToChange = (value: string) => {
    const to = fromInputValue(value)
    onSelect?.({ from: selected?.from, to })
  }

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="space-y-1.5">
        <Label htmlFor="range-start">Start date</Label>
        <input
          id="range-start"
          type="date"
          value={fromValue}
          onChange={(event) => handleFromChange(event.target.value)}
          className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="range-end">End date</Label>
        <input
          id="range-end"
          type="date"
          min={fromValue || undefined}
          value={toValue}
          onChange={(event) => handleToChange(event.target.value)}
          className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
        />
      </div>
    </div>
  )
}

export { Calendar }
