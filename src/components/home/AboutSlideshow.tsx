"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ABOUT_SLIDES = [
  {
    src: "/about/about-slide-01-crane.jpg",
    alt: "Doolenses production crew filming with a camera crane on location in Accra",
  },
  {
    src: "/about/about-slide-02-arri.jpg",
    alt: "Doolenses ARRI cinema camera rig with matte box, monitor, and cinema lens",
  },
] as const;

const INTERVAL_MS = 5500;

type AboutSlideshowProps = {
  children?: React.ReactNode;
  className?: string;
};

/** Dual-image slideshow for the Discover Who We Are photo panel */
export function AboutSlideshow({ children, className }: AboutSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    setIndex((next + ABOUT_SLIDES.length) % ABOUT_SLIDES.length);
  }, []);

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
      setIndex((i) => (i + 1) % ABOUT_SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused]);

  return (
    <div
      className={cn(
        "relative h-[300px] w-full overflow-hidden border border-white/10 sm:h-[380px] lg:h-[440px]",
        className
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {ABOUT_SLIDES.map((slide, i) => {
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
              sizes="(max-width:1024px) 100vw, 50vw"
              priority={i === 0}
              className={cn(
                "object-cover",
                i === 0 ? "object-[center_20%] sm:object-center" : "object-center",
                active && !reducedMotion && "animate-hero-kenburns"
              )}
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

      {children}

      <div
        className="absolute right-3 top-3 z-20 flex items-center gap-1.5"
        role="tablist"
        aria-label="About photos"
      >
        {ABOUT_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show photo ${i + 1}`}
            onClick={() => goTo(i)}
            className={cn(
              "h-1.5 transition-all duration-300",
              i === index ? "w-6 bg-brand-gold" : "w-1.5 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  );
}
