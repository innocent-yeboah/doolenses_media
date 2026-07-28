"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getFeaturedPortfolio } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Munson portfolio-section: filter pills + 3-col hover grid. */
export function WorksSection() {
  const items = useMemo(() => getFeaturedPortfolio(8), []);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );
  const [filter, setFilter] = useState("All");

  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <section className="bg-brand-paper px-4 py-[91px] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl md:text-[42px]">
            Our Works
          </h2>
          <span className="mx-auto mt-4 block h-1 w-10 bg-brand-gold" aria-hidden />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition",
                filter === cat
                  ? "bg-[#f2f2f2] text-brand-ink"
                  : "bg-transparent text-brand-body hover:text-brand-ink"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group relative aspect-[4/3] overflow-hidden bg-brand-mist"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-ink/0 transition duration-500 group-hover:bg-brand-ink/55" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 opacity-0 transition duration-500 group-hover:opacity-100">
                <div>
                  <p className="font-display text-lg font-bold text-white">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brand-gold">
                    {item.category}
                  </p>
                </div>
                <span className="inline-flex h-10 w-10 items-center justify-center bg-white text-brand-ink">
                  <Plus className="h-5 w-5" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/portfolio" size="lg" className="uppercase tracking-[0.12em]">
            See More
          </Button>
        </div>
      </div>
    </section>
  );
}
