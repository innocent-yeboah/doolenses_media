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

type ContactPageProps = {
  searchParams?: { subject?: string };
};

export default function ContactPage({ searchParams }: ContactPageProps) {
  const initialSubject = searchParams?.subject?.trim() ?? "";

  return (
    <>
      <PageHero
        title="Contact Us"
        description="Let's bring your ideas to life."
        imageUrl="/hero/slide-04-jib-operator.jpg"
        imageAlt="Doolenses on set"
      />

      <section className="bg-brand-black px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="font-display text-2xl font-bold text-white">Get in touch</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Share your project brief — we&apos;ll respond within one business day.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-white/85">
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
              <li className="flex gap-3 text-white/70">
                <MapPin className="h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
                {COMPANY.address}
              </li>
            </ul>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Follow</p>
              <SocialLinks className="mt-4" tone="dark" />
            </div>
          </div>

          <div className="border border-white/15 bg-white/[0.03] p-6 sm:p-8 lg:col-span-3">
            <h2 className="font-display text-2xl font-bold text-white">Send a message</h2>
            <div className="mt-6">
              <ContactForm initialSubject={initialSubject} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
