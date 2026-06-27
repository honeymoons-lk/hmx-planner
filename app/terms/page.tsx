import type { Metadata } from "next";
import Link from "next/link";

import { LegalContentPage, LegalSection } from "@/components/legal-content-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Luna Voyages",
  description:
    "Terms governing use of the Luna Voyages website and our concierge travel planning services for honeymoons and romantic escapes.",
};

export default function TermsPage() {
  return (
    <LegalContentPage
      eyebrow="LEGAL"
      title="Terms & conditions"
      intro="These terms apply to your use of the Luna Voyages website and our travel planning and concierge services. They are a general framework; specific bookings may be governed by separate agreements, supplier terms, and invoices."
      lastUpdated="March 2026"
    >
      <LegalSection title="Agreement">
        <p>
          By accessing our website or engaging Luna Voyages to plan travel, you agree to these
          terms. If you do not agree, please do not use our services.
        </p>
      </LegalSection>

      <LegalSection title="Our services">
        <p>
          Luna Voyages provides bespoke itinerary design, recommendations, and coordination support.
          We are a planning and concierge service, not a carrier, hotel operator, or insurer. Travel
          is provided by third-party suppliers; their conditions (including cancellation and liability
          rules) apply to the components they deliver.
        </p>
      </LegalSection>

      <LegalSection title="Information you provide">
        <p>
          You agree that information you submit is accurate to the best of your knowledge and that
          you have authority to book on behalf of all travellers named. You are responsible for
          passports, visas, health requirements, and insurance appropriate to your trip.
        </p>
      </LegalSection>

      <LegalSection title="Fees, deposits, and changes">
        <p>
          Quotes, deposits, payment schedules, and change or cancellation fees will be confirmed in
          writing for your specific arrangement. Until confirmed and paid according to agreed terms,
          availability and pricing from suppliers cannot be guaranteed.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by applicable law, Luna Voyages is not liable for indirect,
          incidental, or consequential losses, or for events outside our reasonable control
          (including supplier failure, weather, strikes, or government action). Our aggregate
          liability arising from our planning services is limited to the fees you paid us for those
          services in the twelve months preceding the claim, except where liability cannot be limited
          by law.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          Content on this website (text, branding, layout, and imagery where we hold rights) is
          owned by Luna Voyages or its licensors. You may not copy or reuse it for commercial
          purposes without permission.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of Sri Lanka, without regard to conflict-of-law
          principles, except where mandatory consumer protections in your country apply. Courts in
          Sri Lanka have non-exclusive jurisdiction unless otherwise required by law.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms can be directed through our{" "}
          <Link
            href="/book-a-call"
            className="text-[var(--color-brand)] underline decoration-[color-mix(in_srgb,var(--color-brand)_35%,transparent)] underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)]"
          >
            contact
          </Link>{" "}
          page.
        </p>
      </LegalSection>
    </LegalContentPage>
  );
}
