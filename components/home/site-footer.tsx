import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--color-border)_42%,transparent)] bg-[var(--color-dark)] text-[var(--color-light)]">
      <div className="page-shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Column 1: Brand */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start">
            <Link href="/" className="inline-flex items-center gap-3 text-[20px] tracking-tight mb-6 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">
              <Image src="/logo-icon.png" alt="Luna Voyages logo" width={34} height={34} />
              <span className="font-wordmark text-[0.92em] leading-none">LUNA VOYAGES</span>
            </Link>
            <p className="type-body text-[color-mix(in_srgb,var(--color-light)_90%,var(--color-bg-alt))] max-w-[22rem] mb-3">
              Concierge-crafted Sri Lanka honeymoons and romantic escapes for modern couples.
            </p>
            <p className="type-ui-sm text-[color-mix(in_srgb,var(--color-light)_60%,var(--color-bg-alt))] max-w-[20rem] mb-8">
              Bespoke journeys, thoughtfully designed from first idea to final detail.
            </p>
            <Link 
              href="/start-planning"
              className="type-ui-sm font-medium inline-flex items-center gap-2 text-[var(--color-light)] transition-colors hover:text-[color-mix(in_srgb,var(--color-light)_70%,transparent)] focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm"
            >
              Ready to begin? Start Planning
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70">
                <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Column 2: Explore */}
          <div className="md:col-span-2 lg:col-span-2 md:col-start-6 lg:col-start-7">
            <h3 className="type-ui-sm font-medium text-[var(--color-light)] mb-5 tracking-wide uppercase text-[0.85em]">Explore</h3>
            <ul className="space-y-3 type-ui-sm text-[color-mix(in_srgb,var(--color-light)_72%,var(--color-bg-alt))]">
              <li>
                <Link href="/about" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">About</Link>
              </li>
              <li>
                <Link href="/approach" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Our Approach</Link>
              </li>
              <li>
                <Link href="/faqs" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">FAQs</Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Journeys */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="type-ui-sm font-medium text-[var(--color-light)] mb-5 tracking-wide uppercase text-[0.85em]">Journeys</h3>
            <ul className="space-y-3 type-ui-sm text-[color-mix(in_srgb,var(--color-light)_72%,var(--color-bg-alt))]">
              <li>
                <Link href="/start-planning" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Start Planning</Link>
              </li>
              <li>
                <Link href="/book-a-call" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Book a Call</Link>
              </li>
              <li>
                <Link href="/real-honeymoons" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Honeymoons</Link>
              </li>
              <li>
                <Link href="/romantic-escapes" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Romantic Escapes</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Information */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="type-ui-sm font-medium text-[var(--color-light)] mb-5 tracking-wide uppercase text-[0.85em]">Information</h3>
            <ul className="space-y-3 type-ui-sm text-[color-mix(in_srgb,var(--color-light)_72%,var(--color-bg-alt))]">
              <li>
                <Link href="/partner-with-us" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Partner With Us</Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/sitemap" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-16 pt-8 border-t border-[color-mix(in_srgb,var(--color-light)_12%,transparent)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="type-ui-sm text-[color-mix(in_srgb,var(--color-light)_50%,var(--color-bg-alt))]">
            © 2026 Luna Voyages. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="type-ui-sm text-[color-mix(in_srgb,var(--color-light)_50%,var(--color-bg-alt))] hidden md:block">
              Designed for Sri Lanka journeys.
            </p>
            <a 
              href="https://instagram.com/lunavoyages" 
              target="_blank" 
              rel="noopener noreferrer"
              className="type-ui-sm text-[color-mix(in_srgb,var(--color-light)_50%,var(--color-bg-alt))] transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
