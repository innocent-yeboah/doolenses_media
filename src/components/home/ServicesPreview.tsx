"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STUDIO_SERVICES, getServiceHref } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Munson-style services: point-to-open category dropdowns + featured panel.
 * Mobile: horizontally scrollable category chips.
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

  useEffect(() => {
    const close = () => setOpenMenu(null);
    window.addEventListener("scroll", close, { passive: true });
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close);
      window.removeEventListener("resize", close);
    };
  }, []);

  return (
    <section className="overflow-x-clip bg-brand-black px-4 py-16 text-brand-white sm:px-6 sm:py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Our Services
          </h2>
          <span className="mx-auto mt-4 block h-1 w-10 bg-brand-gold" aria-hidden />
          <p className="mx-auto mt-5 max-w-lg text-sm text-white/70 sm:text-base">
            Six creative disciplines under one studio roof.
          </p>
        </div>

        <div
          className="relative z-20 -mx-4 mt-10 overflow-x-auto overscroll-x-contain border-b border-white/15 px-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:px-0 [&::-webkit-scrollbar]:hidden"
          role="menubar"
          aria-label="Studio services"
        >
          <div className="flex min-w-max gap-1 md:min-w-0 md:w-full">
            {STUDIO_SERVICES.map((service, index) => {
              const selected = service.id === activeId;
              const menuOpen = openMenu === service.id;
              const alignEnd = index >= STUDIO_SERVICES.length - 2;

              return (
                <div
                  key={service.id}
                  className="relative shrink-0 md:min-w-0 md:flex-1"
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover)").matches) pointAt(service.id);
                  }}
                  onMouseLeave={() => {
                    if (window.matchMedia("(hover: hover)").matches) setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    id={`service-tab-${service.id}`}
                    onClick={() => {
                      if (openMenu === service.id) {
                        setOpenMenu(null);
                        return;
                      }
                      pointAt(service.id);
                    }}
                    className={cn(
                      "relative flex w-full cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap px-3 py-4 text-center transition sm:px-3 sm:py-5",
                      selected ? "text-white" : "text-white/55 hover:text-white"
                    )}
                  >
                    <span className="font-display text-[11px] font-semibold tracking-wide sm:text-xs md:text-sm">
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

                  <div
                    className={cn(
                      "absolute top-full z-30 w-[min(16rem,calc(100vw-2rem))] pt-0 transition duration-200",
                      alignEnd
                        ? "right-0 md:left-1/2 md:right-auto md:-translate-x-1/2"
                        : "left-0 md:left-1/2 md:-translate-x-1/2",
                      menuOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible pointer-events-none -translate-y-1 opacity-0"
                    )}
                  >
                    <ul
                      className="border border-white/15 bg-brand-black py-2 shadow-elevate"
                      role="menu"
                      aria-label={`${service.title} offers`}
                    >
                      <li role="none">
                        <Link
                          href={getServiceHref(service.slug)}
                          role="menuitem"
                          className="block cursor-pointer border-b border-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold transition hover:bg-white/5"
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
                            className="block cursor-pointer px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white/75 transition hover:bg-white/5 hover:text-brand-gold"
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
        </div>

        <div
          key={active.id}
          id={`service-panel-${active.id}`}
          role="region"
          aria-labelledby={`service-tab-${active.id}`}
          className="mt-10 grid items-center gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-2 lg:gap-14"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-black motion-safe:animate-fade-up">
            <Image
              src={active.imageUrl}
              alt={active.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent" />
          </div>

          <div className="motion-safe:animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
              Discipline
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:mt-4 sm:text-3xl md:text-4xl">
              {active.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-base md:text-lg">
              {active.description}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/55 sm:mt-4">{active.shortDescription}</p>

            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 sm:mt-6 sm:gap-x-5">
              {active.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                  <span className="h-1 w-1 shrink-0 bg-brand-gold" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
              <Button href={getServiceHref(active.slug)} variant="outline" className="w-full sm:w-auto">
                View Works
              </Button>
              <Button href="/contact" size="md" className="w-full sm:w-auto">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
