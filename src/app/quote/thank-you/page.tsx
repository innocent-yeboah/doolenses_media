import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { formatPhoneForWhatsApp } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quote Received",
  robots: { index: false, follow: false },
};

export default function QuoteThankYouPage() {
  const whatsapp = `https://wa.me/${formatPhoneForWhatsApp(COMPANY.phone)}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`;

  return (
    <section className="flex min-h-[80vh] items-center px-4 py-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-gold" aria-hidden />
        <h1 className="mt-6 font-display text-4xl font-bold text-white md:text-5xl">
          Thank you — we&apos;ve got it
        </h1>
        <p className="mt-4 text-lg text-brand-slate">
          Your quote request is with our production team. Here&apos;s what happens next:
        </p>
        <ol className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm text-brand-muted">
          <li className="border border-white/10 bg-brand-surface/40 px-4 py-3">
            <span className="font-semibold text-brand-gold">1.</span> We review your event details and production needs.
          </li>
          <li className="border border-white/10 bg-brand-surface/40 px-4 py-3">
            <span className="font-semibold text-brand-gold">2.</span> A producer contacts you within one business day.
          </li>
          <li className="border border-white/10 bg-brand-surface/40 px-4 py-3">
            <span className="font-semibold text-brand-gold">3.</span> You receive a tailored package and timeline proposal.
          </li>
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={whatsapp}>Message us on WhatsApp</Button>
          <Button href="/portfolio" variant="outline">
            Browse Gallery
          </Button>
        </div>
        <p className="mt-8 text-sm text-brand-slate">
          Prefer to call?{" "}
          <Link href={`tel:${COMPANY.phone}`} className="text-brand-gold hover:underline">
            {COMPANY.phone}
          </Link>
        </p>
      </div>
    </section>
  );
}
