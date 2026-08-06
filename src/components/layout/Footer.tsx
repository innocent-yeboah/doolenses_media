import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-black text-brand-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo variant="light" size="sm" />
          <p className="mt-5 text-sm leading-relaxed text-white/60">{COMPANY.tagline}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Quick links</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 transition hover:text-brand-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2 hover:text-brand-gold">
                <Mail className="h-4 w-4 text-brand-gold" aria-hidden />
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 hover:text-brand-gold">
                <Phone className="h-4 w-4 text-brand-gold" aria-hidden />
                {COMPANY.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
              <span>{COMPANY.addressShort}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Follow</h3>
          <div className="mt-5">
            <SocialLinks tone="dark" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>
            © {year} {COMPANY.legalName}. Accra, Ghana.
          </p>
          <p>{COMPANY.subheadline}</p>
        </div>
      </div>
    </footer>
  );
}
