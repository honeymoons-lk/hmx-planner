import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import { PlanningProvider } from "@/components/planning-context";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const wordmarkFont = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-wordmark",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunavoyages.com"),
  title: "Luna Voyages | Romantic Travel Concierge",
  description:
    "Luna Voyages creates personalised romantic journeys, honeymoons and private travel experiences with local support and curated planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${wordmarkFont.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <PlanningProvider>
          {children}
        </PlanningProvider>
      </body>
    </html>
  );
}
