import type { Metadata } from "next";
import Link from "next/link";

import { LegalContentPage, LegalSection } from "@/components/legal-content-page";

export const metadata: Metadata = {
  title: "Partner With Us | Luna Voyages",
  description:
    "Hotels, villas, and experience operators in Sri Lanka: how we collaborate with partners to craft honeymoons and romantic escapes.",
};

export default function PartnerWithUsPage() {
  return (
    <LegalContentPage
      eyebrow="FOR PROPERTIES & OPERATORS"
      title="Partner with Luna Voyages"
      intro="We are independent planners who match each couple to the right stays and experiences. If your property or brand aligns with slow, detail-led romantic travel, we would like to hear from you."
    >
      <LegalSection title="How we work with partners">
        <p>
          Luna Voyages designs bespoke Sri Lanka journeys for honeymoons, mini-moons, and romantic
          escapes. We are not a traditional wholesaler: we recommend properties and partners when
          they are the best fit for a specific brief, season, and pace—not because of a fixed roster
          alone.
        </p>
        <p>
          On the ground, we draw on long-standing relationships across Sri Lanka&apos;s hospitality
          landscape. We value partners who share our focus on guest care, clarity, and experiences
          that feel calm and considered.
        </p>
      </LegalSection>

      <LegalSection title="What we look for">
        <ul>
          <li>Consistent service quality and honest communication on availability and inclusions;</li>
          <li>Spaces and experiences that suit couples seeking privacy, comfort, and authentic local context;</li>
          <li>Reliable operations for transfers, special dinners, wellness, and guided moments where relevant;</li>
          <li>Willingness to collaborate on the small details that make a trip feel seamless.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Get in touch">
        <p>
          If you represent a hotel, villa, retreat, or experience operator and would like to explore
          collaboration, reach out with a short introduction and what makes your offer distinctive
          for romantic travellers.
        </p>
        <p>
          <Link
            href="/book-a-call"
            className="text-[var(--color-brand)] underline decoration-[color-mix(in_srgb,var(--color-brand)_35%,transparent)] underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)]"
          >
            Book a call
          </Link>{" "}
          or use the same flow to leave your details—we will respond when we have capacity for new
          partner conversations.
        </p>
      </LegalSection>
    </LegalContentPage>
  );
}
