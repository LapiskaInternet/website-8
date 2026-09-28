import Image from "next/image";
import { Building2, FileText, Mail, Phone } from "lucide-react";

import { CONTACT } from "@/lib/banhu-data";

const QUICK_LINKS: { href: string; label: string }[] = [
  { href: "#home", label: "Home" },
  { href: "#add-ons", label: "Add-On Tours" },
  { href: "#packages", label: "Packages" },
  { href: "#services", label: "Services" },
  { href: "#events", label: "Events" },
  { href: "#community", label: "Community" },
  { href: "#booking", label: "Book Now" },
  { href: "#contact", label: "Contact" },
  { href: "#partner", label: "Become a Partner" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-banhu-green-deep text-banhu-cream/80">
      <div className="bead-strip h-1.5 w-full opacity-90" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:py-16">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/banhu-logo.png"
              alt="Banhu Tourism logo"
              width={56}
              height={56}
              className="rounded-full bg-white p-1 ring-1 ring-white/20"
            />
            <div>
              <p className="font-display text-lg font-bold text-banhu-cream">
                Banhu Tourism
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-banhu-orange-light">
                Travel &amp; Tours
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Authentic bushveld experiences in the heart of Mpumalanga.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-banhu-cream">
            Quick Links
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-banhu-orange-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-banhu-cream">
            Compliance
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Building2 aria-hidden="true" className="h-4 w-4 shrink-0 text-banhu-orange-light" />
              {CONTACT.cipc}
            </li>
            <li className="flex items-center gap-2.5">
              <FileText aria-hidden="true" className="h-4 w-4 shrink-0 text-banhu-orange-light" />
              {CONTACT.sars}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-banhu-orange-light" />
              <a
                href={CONTACT.phoneTel}
                className="transition-colors hover:text-banhu-orange-light"
              >
                {"Tel: " + CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-banhu-orange-light" />
              <a
                href={CONTACT.emailHref}
                className="break-all transition-colors hover:text-banhu-orange-light"
              >
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-banhu-cream/60 sm:flex-row">
          <p>© 2026 Banhu Tourism. All rights reserved.</p>
          <p>webmaster: Lapiska Internet Café</p>
        </div>
      </div>
    </footer>
  );
}
