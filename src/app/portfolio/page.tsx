import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View our captivating gallery — weddings, conferences, concerts, crusades, campaigns, and more across Ghana.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        title="Our Captivating Gallery"
        description="Our work speaks volumes. Browse past productions and inquire about a similar package."
        imageUrl="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=2000&q=80"
        imageAlt="Live event production with stage lighting"
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PortfolioGallery />
        </div>
      </section>
      <section className="border-t border-white/10 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-white">Want your event featured here?</h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-slate">
          Let&apos;s create work that elevates your brand and audience.
        </p>
        <Button href="/quote" className="mt-8">
          Start a Project
        </Button>
      </section>
    </>
  );
}
