import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PlanThanksPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 md:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Request received</CardTitle>
            <CardDescription>
              Your Sri Lanka concierge team will reply within 24–48 hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">If you chose WhatsApp, we’ll reach out there.</p>
            <Button asChild>
              <Link href="/">Back to home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
