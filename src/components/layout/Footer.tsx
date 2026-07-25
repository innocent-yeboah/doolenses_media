import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-dark text-brand-muted">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo variant="light" size="md" />
          <p className="mt-4 text-sm leading-relaxed text-brand-slate">
            {COMPANY.subheadline}. Premium television production and advertising from Accra, Ghana.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-brand-slate transition hover:text-brand-gold">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/quote" className="text-sm text-brand-slate transition hover:text-brand-gold">
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-slate">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
              <span>{COMPANY.address}</span>
            </li>
            <li>
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 hover:text-brand-gold">
                <Phone className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 hover:text-brand-gold">
                <Mail className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Stay Inspired</h3>
          <p className="mt-4 text-sm text-brand-slate">
            Production insights and event inspiration from Accra&apos;s creative floors.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-brand-slate sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <p>{COMPANY.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
