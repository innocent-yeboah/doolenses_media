"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getPortfolioCategories, PORTFOLIO } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PortfolioGallery() {
  const categories = getPortfolioCategories();
  const [active, setActive] = useState("All");
  const items = useMemo(
    () => (active === "All" ? PORTFOLIO : PORTFOLIO.filter((i) => i.category === active)),
    [active]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter gallery by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={active === category}
            onClick={() => setActive(category)}
            className={cn(
              "px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition",
              active === category
                ? "bg-[#f2f2f2] text-brand-ink"
                : "bg-transparent text-brand-body hover:text-brand-ink"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="group overflow-hidden bg-brand-mist">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 bg-brand-ink/85 px-2 py-1 text-xs font-medium uppercase tracking-wider text-brand-gold">
                {item.category}
              </div>
            </div>
            <div className="bg-white p-5">
              <h3 className="font-display text-xl font-semibold text-brand-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-brand-body">{item.clientName}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-brand-body">
                <MapPin className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
                {item.location}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-brand-body">{item.description}</p>
              <Button
                href={`/contact?project=${encodeURIComponent(item.title)}`}
                variant="outlineDark"
                size="sm"
                className="mt-5"
              >
                Inquire about this project
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
