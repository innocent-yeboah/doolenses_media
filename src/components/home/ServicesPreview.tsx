"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { STUDIO_SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Munson-style services: text tabs + featured image/copy panel.
 */
type ServiceId = (typeof STUDIO_SERVICES)[number]["id"];

export function ServicesPreview() {
  const [activeId, setActiveId] = useState<ServiceId>(STUDIO_SERVICES[0].id);
  const active = STUDIO_SERVICES.find((s) => s.id === activeId) ?? STUDIO_SERVICES[0];

  return (
    <section className="bg-brand-white px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-black sm:text-4xl md:text-5xl">
            Our Services
          </h2>
          <span className="mx-auto mt-4 block h-1 w-10 bg-brand-gold" aria-hidden />
          <p className="mx-auto mt-5 max-w-lg text-base text-brand-muted">
            Six creative disciplines under one studio roof.
          </p>
        </div>

        <div
          className="mt-14 flex gap-1 overflow-x-auto border-b border-brand-line pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Studio services"
        >
          {STUDIO_SERVICES.map((service) => {
            const selected = service.id === activeId;
            return (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`service-panel-${service.id}`}
                id={`service-tab-${service.id}`}
                onClick={() => setActiveId(service.id)}
                className={cn(
                  "relative flex min-w-[7.5rem] flex-1 items-center justify-center px-3 py-5 text-center transition",
                  selected ? "text-brand-black" : "text-brand-muted hover:text-brand-black"
                )}
              >
                <span className="font-display text-xs font-semibold tracking-wide sm:text-sm">
                  {service.title}
                </span>
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 transition",
                    selected ? "bg-brand-gold" : "bg-transparent"
                  )}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        <div
          key={active.id}
          id={`service-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`service-tab-${active.id}`}
          className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-black motion-safe:animate-fade-up">
            <Image
              src={active.imageUrl}
              alt={active.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/35 to-transparent" />
          </div>

          <div className="motion-safe:animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
              Discipline
            </p>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
              {active.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-brand-muted md:text-lg">
              {active.description}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-muted">{active.shortDescription}</p>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {active.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-brand-black">
                  <span className="h-1 w-1 shrink-0 bg-brand-gold" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={`/services#${active.slug}`} variant="outlineDark">
                View Project
              </Button>
              <Button href="/contact" size="md">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
