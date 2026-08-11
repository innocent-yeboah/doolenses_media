import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { STUDIO_SERVICES, getServiceHref } from "@/lib/constants";

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

      <section className="bg-brand-black px-4 py-14 sm:px-6 sm:py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl space-y-14 sm:space-y-20">
          {STUDIO_SERVICES.map((service, index) => {
            const reversed = index % 2 === 1;
            return (
              <article
                key={service.id}
                id={service.slug}
                className="scroll-mt-24 grid items-center gap-8 sm:scroll-mt-28 sm:gap-10 lg:grid-cols-2 lg:gap-14"
              >
                <div className={reversed ? "lg:order-2" : undefined}>
                  <div className="relative aspect-[16/11] overflow-hidden bg-white/5">
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
                  <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                        <span className="h-1.5 w-1.5 bg-brand-gold" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                      href={getServiceHref(service.slug)}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      View Works
                    </Button>
                    <Button href="/contact" className="w-full sm:w-auto">
                      Start a Project
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
