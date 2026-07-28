"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Munson testimonial-section: dark single-quote carousel. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const item = TESTIMONIALS[index];

  return (
    <section className="relative bg-brand-ink px-4 py-[91px] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <Quote className="mx-auto h-12 w-12 text-brand-gold/70" strokeWidth={1.25} aria-hidden />
        <blockquote
          key={item.name}
          className="mt-8 motion-safe:animate-fade-in"
        >
          <p className="px-2 text-xl italic leading-relaxed text-white/70 sm:px-10 sm:text-2xl md:px-16">
            &ldquo;{item.quote}&rdquo;
          </p>
          <footer className="mt-10 flex flex-col items-center gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-brand-gold/40">
              <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
            </div>
            <cite className="not-italic font-display text-lg font-semibold text-white">
              {item.name}
            </cite>
            <p className="text-sm text-white/50">{item.role}</p>
            <div className="flex gap-1 text-brand-gold" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </footer>
        </blockquote>
      </div>

      <button
        type="button"
        onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 p-2 text-white/50 transition hover:text-brand-gold sm:left-8"
        )}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/50 transition hover:text-brand-gold sm:right-8"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-7 w-7" />
      </button>
    </section>
  );
}
