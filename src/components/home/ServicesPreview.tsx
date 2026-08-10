"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STUDIO_SERVICES, getServiceHref } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Munson-style services: point-to-open category dropdowns + featured panel.
 */
type ServiceId = (typeof STUDIO_SERVICES)[number]["id"];

export function ServicesPreview() {
  const [activeId, setActiveId] = useState<ServiceId>(STUDIO_SERVICES[0].id);
  const [openMenu, setOpenMenu] = useState<ServiceId | null>(null);
  const active = STUDIO_SERVICES.find((s) => s.id === activeId) ?? STUDIO_SERVICES[0];

  const pointAt = (id: ServiceId) => {
    setActiveId(id);
    setOpenMenu(id);
  };

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
          className="relative z-20 mt-14 flex gap-1 overflow-visible border-b border-brand-line"
          role="menubar"
          aria-label="Studio services"
        >
          {STUDIO_SERVICES.map((service) => {
            const selected = service.id === activeId;
            const menuOpen = openMenu === service.id;

            return (
              <div
                key={service.id}
                className="relative min-w-[7.5rem] flex-1"
                onMouseEnter={() => pointAt(service.id)}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => pointAt(service.id)}
              >
                <button
                  type="button"
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  id={`service-tab-${service.id}`}
                  onClick={() => pointAt(service.id)}
                  className={cn(
                    "relative flex w-full cursor-pointer items-center justify-center gap-1.5 px-3 py-5 text-center transition",
                    selected ? "text-brand-black" : "text-brand-muted hover:text-brand-black"
                  )}
                >
                  <span className="font-display text-xs font-semibold tracking-wide sm:text-sm">
                    {service.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 transition duration-200",
                      menuOpen && "rotate-180 text-brand-gold",
                      selected && !menuOpen && "text-brand-gold"
                    )}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 transition",
                      selected || menuOpen ? "bg-brand-gold" : "bg-transparent"
                    )}
                    aria-hidden
                  />
                </button>

                {/* Point-and-dropdown panel — stays open while pointer is over category or menu */}
                <div
                  className={cn(
                    "absolute left-1/2 top-full z-30 w-56 -translate-x-1/2 pt-0 transition duration-200",
                    menuOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible pointer-events-none -translate-y-1 opacity-0"
                  )}
                >
                  <ul
                    className="border border-brand-line bg-brand-white py-2 shadow-elevate"
                    role="menu"
                    aria-label={`${service.title} offers`}
                  >
                    <li role="none">
                      <Link
                        href={getServiceHref(service.slug)}
                        role="menuitem"
                        className="block cursor-pointer border-b border-brand-line px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold transition hover:bg-brand-soft"
                        onClick={() => setOpenMenu(null)}
                      >
                        View all works
                      </Link>
                    </li>
                    {service.items.map((item) => (
                      <li key={item} role="none">
                        <Link
                          href={`/contact?subject=${encodeURIComponent(item)}`}
                          role="menuitem"
                          className="block cursor-pointer px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-brand-black/75 transition hover:bg-brand-soft hover:text-brand-gold"
                          onClick={() => setOpenMenu(null)}
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div
          key={active.id}
          id={`service-panel-${active.id}`}
          role="region"
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
              <Button href={getServiceHref(active.slug)} variant="outlineDark">
                View Works
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
