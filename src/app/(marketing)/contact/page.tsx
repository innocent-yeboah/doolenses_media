import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Let's bring your ideas to life. Contact Doolenses in Accra.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Let's bring your ideas to life."
        imageUrl="/hero/slide-04-jib-operator.jpg"
        imageAlt="Doolenses on set"
      />

      <section className="px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-black">Get in touch</h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                Share your project brief — we&apos;ll respond within one business day.
              </p>
            </div>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex gap-3 hover:text-brand-gold">
                  <Mail className="h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone}`} className="flex gap-3 hover:text-brand-gold">
                  <Phone className="h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
                <span>{COMPANY.address}</span>
              </li>
            </ul>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted">Follow</p>
              <SocialLinks className="mt-4" />
            </div>
          </div>

          <div className="border border-brand-line bg-brand-soft/50 p-6 sm:p-8 lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-brand-black">Send a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
