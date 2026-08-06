import Link from "next/link";
import {
  Camera,
  Clapperboard,
  Monitor,
  Palette,
  Printer,
  Shirt,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { STUDIO_SERVICES } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Palette,
  Camera,
  Clapperboard,
  Monitor,
  Printer,
  Shirt,
};

export function ServicesPreview() {
  return (
    <section className="bg-brand-soft px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="What we do"
          title="Our Services"
          description="Six creative disciplines under one studio roof."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STUDIO_SERVICES.map((service) => {
            const Icon = ICONS[service.icon] ?? Palette;
            return (
              <Link
                key={service.id}
                href={`/services#${service.slug}`}
                className="group border border-brand-line bg-brand-white p-7 transition hover:border-brand-gold"
              >
                <Icon className="h-9 w-9 text-brand-gold" strokeWidth={1.4} aria-hidden />
                <h3 className="mt-5 font-display text-xl font-bold text-brand-black group-hover:text-brand-gold">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{service.shortDescription}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button href="/services" variant="outlineDark">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
