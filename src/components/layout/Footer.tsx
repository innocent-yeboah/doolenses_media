import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { COMPANY, HOME_JOURNAL, NAV_LINKS } from "@/lib/constants";

/** Munson-style 4-widget dark footer. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-white">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:py-20">
        <div className="lg:col-span-3">
          <Logo variant="light" size="md" />
          <p className="mt-5 text-sm leading-relaxed text-white/65">
            {COMPANY.agencyLine}. Premium coverage from Accra, Ghana.
          </p>
          <SocialLinks className="mt-6" tone="dark" />
          <p className="mt-8 text-xs text-white/45">
            © {year} {COMPANY.legalName}. All rights reserved.
          </p>
        </div>

        <div className="lg:col-span-3 lg:col-start-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Recent work
          </h3>
          <ul className="mt-5 space-y-4">
            {HOME_JOURNAL.slice(0, 2).map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="group flex gap-3">
                  <span className="relative h-[60px] w-[60px] shrink-0 overflow-hidden bg-white/10">
                    <Image
                      src={item.imageUrl}
                      alt=""
                      fill
                      sizes="60px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white/90 transition group-hover:text-brand-gold">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-xs text-white/45">{item.date}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Instagram
          </h3>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              "/services/weddings.jpg",
              "/services/conferences.jpg",
              "/services/musical-concerts.jpg",
              "/services/crusades.jpg",
              "/services/award-ceremonies.jpg",
              "/hero/slide-01-music-video-set.jpg",
            ].map((src) => (
              <a
                key={src}
                href={COMPANY.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden bg-white/10"
                aria-label="View on Instagram"
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-start gap-2 transition hover:text-brand-gold"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-start gap-2 transition hover:text-brand-gold"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
                {COMPANY.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
              <span>{COMPANY.addressShort}</span>
            </li>
          </ul>
          <ul className="mt-6 space-y-2">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/55 transition hover:text-brand-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:px-8 lg:px-16">
          <p>{COMPANY.tagline}</p>
          <p>Creative work, for creative people — Accra, Ghana</p>
        </div>
      </div>
    </footer>
  );
}
