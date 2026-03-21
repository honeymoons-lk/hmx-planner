import type { Metadata } from "next";
import Link from "next/link";

import { LegalContentPage, LegalSection } from "@/components/legal-content-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Luna Voyages",
  description:
    "How Luna Voyages collects, uses, and protects personal information when you use our website and concierge travel planning services.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalContentPage
      eyebrow="LEGAL"
      title="Privacy policy"
      intro="This policy describes how Luna Voyages (“we”, “us”) handles personal information when you browse our website or use our concierge travel planning services. It is a general summary; your agreement or booking materials may include additional terms."
      lastUpdated="March 2026"
    >
      <LegalSection title="Who we are">
        <p>
          Luna Voyages provides bespoke romantic travel planning in Sri Lanka. For privacy-related
          questions, contact us through the channels listed on our{" "}
          <Link
            href="/book-a-call"
            className="text-[var(--color-brand)] underline decoration-[color-mix(in_srgb,var(--color-brand)_35%,transparent)] underline-offset-4 transition-colors hover:text-[var(--color-brand-hover)]"
          >
            contact
          </Link>{" "}
          page.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>Depending on how you interact with us, we may collect:</p>
        <ul>
          <li>
            <strong className="font-medium text-[var(--color-text)]">Contact and account details</strong> — for
            example name, email address, phone number, and country of residence when you submit a
            planning form or book a call.
          </li>
          <li>
            <strong className="font-medium text-[var(--color-text)]">Trip preferences</strong> — dates,
            budget range, occasion, accessibility or dietary notes, and other information you choose
            to share so we can design an itinerary.
          </li>
          <li>
            <strong className="font-medium text-[var(--color-text)]">Technical data</strong> — such as IP
            address, device type, browser, and pages visited, collected through cookies and similar
            technologies where applicable.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use information">
        <p>We use personal information to:</p>
        <ul>
          <li>Respond to enquiries and deliver our planning and concierge services;</li>
          <li>Coordinate with hotels, transport providers, and other partners you approve as part of your trip;</li>
          <li>Improve our website, communications, and service quality;</li>
          <li>Comply with legal obligations and protect our legitimate business interests.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Sharing">
        <p>
          We do not sell your personal information. We may share it with service providers who
          assist our operations (for example hosting or email), and with travel partners when
          necessary to fulfil your booking, always subject to appropriate confidentiality
          expectations.
        </p>
      </LegalSection>

      <LegalSection title="Retention and security">
        <p>
          We retain information only as long as needed for the purposes above, including legal,
          accounting, or dispute resolution requirements. We use reasonable technical and
          organisational measures to protect data; no method of transmission over the internet is
          completely secure.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          Where applicable law provides rights to access, correct, delete, or restrict processing of
          your data, you may contact us to make a request. You can also ask to unsubscribe from
          marketing messages at any time.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update this policy from time to time. The “Last updated” date at the top of this
          page will change when we do; continued use of the site after changes constitutes
          acceptance of the revised policy where permitted by law.
        </p>
      </LegalSection>
    </LegalContentPage>
  );
}
