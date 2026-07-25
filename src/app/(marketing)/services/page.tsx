import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Production Services",
  description:
    "Explore Doolenses production services — weddings, funerals, webinars, conferences, concerts, crusades, campaigns, educational programs, and award ceremonies.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Production Services"
        description="Streamlined processes for exceptional media coverage — tailored for every event in Accra and across Ghana."
        imageUrl="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=2000&q=80"
        imageAlt="Professional video production equipment on set"
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ServicesGrid />
        </div>
      </section>
      <section className="border-t border-white/10 bg-brand-surface/40 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white">Need a custom production package?</h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-slate">
          Tell us about your event and we&apos;ll design a crew, kit, and deliverable plan around your goals.
        </p>
        <Button href="/quote" className="mt-8" size="lg">
          Get a Free Quote
        </Button>
      </section>
    </>
  );
}
