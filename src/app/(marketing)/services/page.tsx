import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { STUDIO_SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Graphic design, photography, videography, web design, printing, and fashion from Doolenses.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Creative solutions for every need."
        imageUrl="/hero/slide-02-studio-cyclorama.jpg"
        imageAlt="Doolenses creative studio"
      />

      <section className="px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl space-y-20">
          {STUDIO_SERVICES.map((service, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
              >
                <div className={reversed ? "lg:order-2" : undefined}>
                  <div className="relative aspect-[16/11] overflow-hidden bg-brand-soft">
                    <Image
                      src={service.imageUrl}
                      alt={`${service.title} by Doolenses`}
                      fill
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className={reversed ? "lg:order-1" : undefined}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-bold text-brand-black md:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-brand-muted">{service.description}</p>
                  <ul className="mt-6 space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-brand-black">
                        <span className="h-1.5 w-1.5 bg-brand-gold" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" className="mt-8">
                    Start a Project
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
