"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ABOUT_SLIDES = [
  {
    src: "/images/about/about-slide-01-idea.jpg",
    alt: "Doolenses brand story — It all begins with an idea. Television production and advertising excellence.",
  },
  {
    src: "/images/about/about-slide-02-videography.jpg",
    alt: "Doolenses brand story — The videography people. Television production and advertising excellence.",
  },
] as const;

const INTERVAL_MS = 5500;

type AboutSlideshowProps = {
  className?: string;
};

/** Brand-story slideshow for the Discover Who We Are photo panel */
export function AboutSlideshow({ className }: AboutSlideshowProps) {
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
      setIndex((i) => (i + 1) % ABOUT_SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden border border-white/10 bg-brand-navy",
        className
      )}
    >
      {ABOUT_SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              active ? "z-[1] opacity-100" : "z-0 opacity-0"
            )}
            aria-hidden={!active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              priority={i === 0}
              className="object-contain object-center sm:object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
