import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { COMPANY } from "@/lib/constants";
import { formatPhoneForWhatsApp } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Doolenses in Accra for professional television production and advertising. Call, WhatsApp, or send a message.",
  alternates: { canonical: "/contact" },
};

type ContactPageProps = { searchParams?: { project?: string } };

export default function ContactPage({ searchParams }: ContactPageProps) {
  const project = searchParams?.project;
  const whatsapp = `https://wa.me/${formatPhoneForWhatsApp(COMPANY.phone)}?text=${encodeURIComponent(
    project
      ? `Hello, I am interested in a production similar to "${project}". Please let me know how we can proceed.`
      : COMPANY.whatsappMessage
  )}`;

  return (
    <>
      <PageHero
        title="Contact Us"
        description="Tell us about your event — we'll respond within one business day."
        imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=2000&q=80"
        imageAlt="Production planning workspace"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">Get in touch</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-slate">
                Whether you need a full production crew or a focused coverage package, our Accra team is ready.
              </p>
            </div>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
                <span>{COMPANY.address}</span>
              </li>
              <li>
                <a href={`tel:${COMPANY.officePhone}`} className="flex gap-3 hover:text-brand-gold">
                  <Phone className="h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-brand-slate">Office</span>
                    {COMPANY.officePhoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone}`} className="flex gap-3 hover:text-brand-gold">
                  <Phone className="h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-brand-slate">Mobile</span>
                    {COMPANY.phoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex gap-3 hover:text-brand-gold">
                  <Mail className="h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
                  {COMPANY.email}
                </a>
              </li>
            </ul>
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                <Clock className="h-4 w-4 text-brand-gold" aria-hidden />
                Business hours
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-brand-slate">
                <li>{COMPANY.hours.weekdays}</li>
                <li>{COMPANY.hours.saturday}</li>
                <li>{COMPANY.hours.sunday}</li>
              </ul>
            </div>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
            >
              Chat on WhatsApp
            </a>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Follow us</h3>
              <p className="mt-2 text-sm text-brand-slate">
                Production stills and behind-the-scenes on Instagram.
              </p>
              <SocialLinks className="mt-4" />
              <a
                href={COMPANY.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-brand-gold transition hover:underline"
              >
                @doolenses
              </a>
            </div>
          </div>

          <div className="border border-white/10 bg-brand-surface/30 p-6 sm:p-8 lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-white">Send a message</h2>
            {project ? <p className="mt-2 text-sm text-brand-gold">Inquiring about: {project}</p> : null}
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-display text-2xl font-bold text-white">Find us</h2>
          <div className="overflow-hidden border border-white/10">
            <iframe
              title={`Doolenses location — ${COMPANY.addressShort}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY.mapsQuery)}&output=embed`}
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
