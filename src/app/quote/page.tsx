import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Request a tailored production quote from Doolenses. Share your event details and we'll prepare a professional proposal.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        title="Get a Free Quote"
        description="Four quick steps — we'll follow up with a tailored production proposal."
        // CLIENT: Replace with consultation / planning imagery
        imageUrl="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=2000&q=80"
        imageAlt="Creative production consultation"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl border border-white/10 bg-brand-surface/30 p-6 sm:p-10">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
