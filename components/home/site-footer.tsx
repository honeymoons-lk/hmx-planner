import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

function TiktokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

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
              Thoughtfully designed from first idea to final detail.
            </p>
            <Link 
              href="/plan/journey"
              className="type-ui-sm font-medium inline-flex items-center gap-1.5 text-[var(--color-light)] transition-colors hover:text-[color-mix(in_srgb,var(--color-light)_70%,transparent)] focus-visible:outline-none focus-visible:ring-[4px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm"
            >
              Ready to begin? Start Planning <span aria-hidden="true">&rarr;</span>
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
                <Link href="/#our-approach" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Our Approach</Link>
              </li>
              <li>
                <Link href="/#faqs" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">FAQs</Link>
              </li>
              <li>
                <Link href="/book-a-call" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Plan */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="type-ui-sm font-medium text-[var(--color-light)] mb-5 tracking-wide uppercase text-[0.85em]">Plan</h3>
            <ul className="space-y-3 type-ui-sm text-[color-mix(in_srgb,var(--color-light)_72%,var(--color-bg-alt))]">
              <li>
                <Link href="/plan/journey" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Start Planning</Link>
              </li>
              <li>
                <Link href="/book-a-call" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Book a Call</Link>
              </li>
              <li>
                <Link href="/partner-with-us" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Partner With Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Information */}
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="type-ui-sm font-medium text-[var(--color-light)] mb-5 tracking-wide uppercase text-[0.85em]">Information</h3>
            <ul className="space-y-3 type-ui-sm text-[color-mix(in_srgb,var(--color-light)_72%,var(--color-bg-alt))]">
              <li>
                <Link href="/privacy-policy" className="transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm">Privacy Policy</Link>
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
        <div className="mt-16 pt-8 border-t border-[color-mix(in_srgb,var(--color-light)_12%,transparent)] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="type-ui-sm text-[color-mix(in_srgb,var(--color-light)_50%,var(--color-bg-alt))]">
            © 2026 Luna Voyages. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a 
              href="https://facebook.com/lunavoyages" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[color-mix(in_srgb,var(--color-light)_50%,var(--color-bg-alt))] transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm p-1"
            >
              <Facebook className="w-[18px] h-[18px]" />
            </a>
            <a 
              href="https://instagram.com/lunavoyages" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[color-mix(in_srgb,var(--color-light)_50%,var(--color-bg-alt))] transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm p-1"
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a 
              href="https://tiktok.com/@lunavoyages" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="text-[color-mix(in_srgb,var(--color-light)_50%,var(--color-bg-alt))] transition-colors hover:text-[var(--color-light)] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-[color-mix(in_srgb,var(--color-light)_18%,transparent)] rounded-sm p-1"
            >
              <TiktokIcon className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
