"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    src: "/hero/slide-01-control-booth.jpg",
    alt: "Doolenses live production control booth with multiview monitors during an event",
    caption: "Live control & ISO recording",
  },
  {
    src: "/hero/slide-02-studio-crane.jpg",
    alt: "Doolenses camera operator on a jib crane with Aputure lighting on set",
    caption: "Studio & cinematic gear",
  },
  {
    src: "/hero/slide-03-stadium-crew.jpg",
    alt: "Doolenses television production crew on-site at a stadium in Accra",
    caption: "On-location production crews",
  },
] as const;

const INTERVAL_MS = 6000;

/**
 * Full-bleed cinematic hero slideshow using real Doolenses production photography.
 */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-brand-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      {SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              active ? "opacity-100" : "opacity-0"
            )}
            aria-hidden={!active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn(
                "object-cover object-[center_25%] sm:object-center",
                active && !reducedMotion && "animate-hero-kenburns"
              )}
            />
          </div>
        );
      })}

      {/* Light cinematic overlays — keep photos visible */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-navy/50 via-brand-navy/20 to-brand-navy/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-navy/40 via-transparent to-transparent sm:from-brand-navy/55" />

      {/* Controls — tucked above safe area, clear of CTAs on mobile */}
      <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center px-4 sm:bottom-8 sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <p className="hidden max-w-xs text-xs uppercase tracking-[0.2em] text-white/70 sm:block">
          {SLIDES[index].caption}
        </p>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center border border-white/25 bg-brand-navy/50 text-white backdrop-blur-sm transition hover:border-brand-gold hover:text-brand-gold sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show slide ${i + 1}: ${slide.caption}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 transition-all duration-300",
                  i === index
                    ? "w-6 bg-brand-gold sm:w-8"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center border border-white/25 bg-brand-navy/50 text-white backdrop-blur-sm transition hover:border-brand-gold hover:text-brand-gold sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
