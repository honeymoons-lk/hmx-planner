import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 md:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Book a consultation</CardTitle>
            <CardDescription>
              Scheduling coming next. For now, send us your details via the planner.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/plan/start">Go to planner start</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
