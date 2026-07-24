import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/data";
import { getServiceIcon } from "@/lib/icons";

export function ServicesGrid() {
  return (
    <div className="space-y-20">
      {SERVICES.map((service, index) => {
        const Icon = getServiceIcon(service.icon);
        const reversed = index % 2 === 1;

        return (
          <article
            key={service.id}
            id={service.slug}
            className="scroll-mt-28 grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <div className={reversed ? "lg:order-2" : undefined}>
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
                {/* CLIENT: Replace with Doolenses service photography */}
                <Image
                  src={service.imageUrl}
                  alt={`${service.name} production by Doolenses`}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className={reversed ? "lg:order-1" : undefined}>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center border border-brand-gold/40 text-brand-gold">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
                {service.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-slate">
                {service.description}
              </p>
              <ul className="mt-6 space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-brand-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-gold" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href={`/quote?service=${encodeURIComponent(service.name)}`}
                className="mt-8"
              >
                Request a Quote
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
