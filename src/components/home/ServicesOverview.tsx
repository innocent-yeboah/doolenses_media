import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/data";

/**
 * Iso Media GH service format:
 * portrait image → title → short description, 3-column grid.
 */
export function ServicesOverview() {
  return (
    <section className="bg-brand-dark px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we produce"
          title="Explore Our Professional Services"
          description="High-quality video production and media coverage tailored for every kind of event."
        />

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/services#${service.slug}`}
              className="group block min-w-0 text-left"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-navy">
                {/* CLIENT: Replace with real Doolenses service photography */}
                <Image
                  src={service.imageUrl}
                  alt={`${service.name} production by Doolenses`}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 transition group-hover:opacity-40" />
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-white transition group-hover:text-brand-gold sm:text-2xl">
                {service.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">
                {service.shortDescription}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-brand-gold transition group-hover:gap-3">
                Read more
                <span aria-hidden className="text-base leading-none">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center sm:mt-14">
          <Button href="/services" variant="outline" size="lg">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
