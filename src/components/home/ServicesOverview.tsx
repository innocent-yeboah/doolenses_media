import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/data";
import { getServiceIcon } from "@/lib/icons";

/** Iso Media “Explore Our Professional Services” grid — 9 Doolenses services */
export function ServicesOverview() {
  return (
    <section className="bg-section-glow px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we produce"
          title="Explore Our Professional Services"
          description="High-quality video production and media coverage tailored for every kind of event."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <Link
                key={service.id}
                href={`/services#${service.slug}`}
                className="group border border-white/10 bg-brand-surface/30 p-6 transition duration-300 hover:border-brand-gold/50 hover:bg-brand-surface/60"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center border border-brand-gold/40 text-brand-gold transition group-hover:bg-brand-gold group-hover:text-brand-navy">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{service.name}</h3>
                <p className="mt-2 text-sm text-brand-slate">{service.shortLabel}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
                  Learn More
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
