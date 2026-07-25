"use client";

import Link from "next/link";
import { AboutSlideshow } from "@/components/home/AboutSlideshow";
import { TrustStats } from "@/components/ui/TrustStats";
import { COMPANY } from "@/lib/constants";

/** Iso Media “Discover Who We Are” — photo slideshow + animated trust stats */
export function AboutPreview() {
  return (
    <section className="border-y border-white/10 bg-brand-surface/40 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Discover Who We Are
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Passion for every frame
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-slate sm:mt-5 sm:text-base md:text-lg">
            {COMPANY.aboutBlurb}
          </p>
          <Link
            href="/about"
            className="mt-5 inline-flex text-sm font-semibold text-brand-gold transition hover:text-brand-gold-light sm:mt-6"
          >
            Learn more about Doolenses →
          </Link>
        </div>

        <div className="min-w-0 space-y-4">
          <AboutSlideshow />
          <TrustStats variant="cards" compact />
        </div>
      </div>
    </section>
  );
}
