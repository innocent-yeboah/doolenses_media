"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Church,
  Film,
  GraduationCap,
  Heart,
  MonitorPlay,
  Music,
  Trophy,
  Users,
  Vote,
  Flower2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SERVICES } from "@/lib/data";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Flower2,
  MonitorPlay,
  Users,
  Music,
  Church,
  Vote,
  GraduationCap,
  Trophy,
};

/** Munson service-section: icon tabs + 2-col detail pane. */
export function ServicesOverview() {
  const tabs = SERVICES.slice(0, 5);
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "1");
  const active = SERVICES.find((s) => s.id === activeId) ?? tabs[0];
  const ActiveIcon = ICON_MAP[active.icon] ?? Film;

  return (
    <section className="bg-brand-paper px-4 py-[91px] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl md:text-[42px]">
            Our Services
          </h2>
          <span className="mx-auto mt-4 block h-1 w-10 bg-brand-gold" aria-hidden />
        </div>

        <div
          className="mt-12 flex gap-1 overflow-x-auto border-b border-[#e5e5e5] pb-px"
          role="tablist"
          aria-label="Services"
        >
          {tabs.map((service) => {
                const Icon = ICON_MAP[service.icon] ?? Film;
            const selected = service.id === activeId;
            return (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(service.id)}
                className={`flex min-w-[7.5rem] flex-1 flex-col items-center gap-3 border-b-2 px-3 py-4 transition ${
                  selected
                    ? "border-brand-gold text-brand-gold"
                    : "border-transparent text-brand-body hover:text-brand-ink"
                }`}
              >
                <Icon className="h-10 w-10" strokeWidth={1.25} aria-hidden />
                <span className="text-center text-[11px] font-semibold uppercase tracking-[0.1em]">
                  {service.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14" role="tabpanel">
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-mist">
            <Image
              src={active.imageUrl}
              alt={`${active.name} production by Doolenses`}
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="mb-4 text-brand-gold">
              <ActiveIcon className="h-12 w-12" strokeWidth={1.25} aria-hidden />
            </div>
            <h3 className="font-display text-2xl font-bold text-brand-ink sm:text-3xl">
              {active.name}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-brand-body">{active.description}</p>
            <p className="mt-4 text-base leading-relaxed text-brand-body">
              {active.features.slice(0, 2).join(" · ")}.
            </p>
            <div className="mt-8">
              <Button
                href={`/services#${active.slug}`}
                variant="outlineDark"
                className="uppercase tracking-[0.12em]"
              >
                View Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
