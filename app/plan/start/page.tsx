import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PlanStartPage({
  searchParams,
}: {
  searchParams: {
    timeframe?: string
    start?: string
    end?: string
    nights?: string
    style?: string
    wow?: string
    budget?: string
    pace?: string
  }
}) {
  const params = searchParams

  return (
    <main className="min-h-screen bg-background px-4 py-10 md:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Draft Plan Inputs</CardTitle>
            <CardDescription>
              Temporary planner intake preview from query params.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
              <div className="rounded-md border border-border bg-card p-3">
                <p className="text-muted-foreground">Timeframe</p>
                <p className="font-medium text-foreground">{params.timeframe || "Not selected"}</p>
              </div>
              <div className="rounded-md border border-border bg-card p-3">
                <p className="text-muted-foreground">Start date</p>
                <p className="font-medium text-foreground">{params.start || "Not selected"}</p>
              </div>
              <div className="rounded-md border border-border bg-card p-3">
                <p className="text-muted-foreground">End date</p>
                <p className="font-medium text-foreground">{params.end || "Not selected"}</p>
              </div>
              <div className="rounded-md border border-border bg-card p-3">
                <p className="text-muted-foreground">Nights</p>
                <p className="font-medium text-foreground">{params.nights || "Not selected"}</p>
              </div>
              <div className="rounded-md border border-border bg-card p-3">
                <p className="text-muted-foreground">Style</p>
                <p className="font-medium text-foreground">{params.style || "Not selected"}</p>
              </div>
              <div className="rounded-md border border-border bg-card p-3">
                <p className="text-muted-foreground">Top wow moment</p>
                <p className="font-medium text-foreground">{params.wow || "Not selected"}</p>
              </div>
              <div className="rounded-md border border-border bg-card p-3">
                <p className="text-muted-foreground">Budget comfort</p>
                <p className="font-medium text-foreground">{params.budget || "Not selected"}</p>
              </div>
              <div className="rounded-md border border-border bg-card p-3">
                <p className="text-muted-foreground">Pace</p>
                <p className="font-medium text-foreground">{params.pace || "Not selected"}</p>
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/plan/consultation">Book a consultation</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
