"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    src: "/hero/slide-01-control-booth.jpg",
    alt: "Doolenses live production control booth with multiview monitors during an event",
  },
  {
    src: "/hero/slide-02-studio-crane.jpg",
    alt: "Doolenses camera operator on a jib crane with Aputure lighting on set",
  },
  {
    src: "/hero/slide-03-stadium-crew.jpg",
    alt: "Doolenses television production crew on-site at a stadium in Accra",
  },
] as const;

const INTERVAL_MS = 6000;

/**
 * Full-bleed cinematic hero slideshow using real Doolenses production photography.
 */
export function HeroSlideshow() {
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
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-navy" aria-hidden>
      {SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              active ? "opacity-100" : "opacity-0"
            )}
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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-navy/50 via-brand-navy/20 to-brand-navy/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-navy/40 via-transparent to-transparent sm:from-brand-navy/55" />
    </div>
  );
}
