"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter portfolio">
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
                ? "bg-brand-black text-white"
                : "bg-brand-soft text-brand-muted hover:text-brand-black"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="group overflow-hidden border border-brand-line bg-brand-white">
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-soft">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold">
                {item.category}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-brand-black">{item.title}</h3>
              <p className="mt-2 text-sm text-brand-muted">{item.description}</p>
              <Link
                href="/contact"
                className="mt-4 inline-flex text-sm font-semibold text-brand-black underline-offset-4 transition hover:text-brand-gold hover:underline"
              >
                View Project
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
