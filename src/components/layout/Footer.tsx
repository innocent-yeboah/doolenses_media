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
        <div className="lg:col-span-1">
          <Logo variant="light" size="md" />
          <p className="mt-4 text-sm leading-relaxed text-brand-slate">
            {COMPANY.subheadline}. Premium television production and advertising from Accra,
            Ghana.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-brand-slate transition hover:text-brand-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/quote"
                className="text-sm text-brand-slate transition hover:text-brand-gold"
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-slate">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
              <span>{COMPANY.address}</span>
            </li>
            <li>
              <a
                href={`tel:${COMPANY.phone}`}
                className="flex items-center gap-3 transition hover:text-brand-gold"
              >
                <Phone className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-3 transition hover:text-brand-gold"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
                {COMPANY.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            <SocialLink href={COMPANY.social.facebook} label="Facebook">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href={COMPANY.social.instagram} label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href={COMPANY.social.youtube} label="YouTube">
              <YoutubeIcon />
            </SocialLink>
            <SocialLink href={COMPANY.social.linkedin} label="LinkedIn">
              <LinkedinIcon />
            </SocialLink>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Stay Inspired
          </h3>
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
          <p>Television Production &amp; Advertising — Accra, Ghana</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-brand-slate transition hover:border-brand-gold hover:text-brand-gold"
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.026 2.087 15.855 2 14.643 2 11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm5.25-.75a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.5 31.5 0 000 12a31.5 31.5 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.5 31.5 0 0024 12a31.5 31.5 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.94 6.5A2.44 2.44 0 114.5 4.06 2.44 2.44 0 016.94 6.5zM4.75 8.75h4.38V20H4.75zm7.13 0h4.2v1.54h.06a4.6 4.6 0 014.14-2.27c4.43 0 5.25 2.91 5.25 6.7V20h-4.38v-5.12c0-1.22-.02-2.8-1.7-2.8-1.71 0-1.97 1.33-1.97 2.71V20h-4.4z" />
    </svg>
  );
}
