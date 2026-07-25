"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    src: "/hero/slide-01-music-video-set.jpg",
    alt: "Doolenses filming a music video set with performers and a camera jib",
  },
  {
    src: "/hero/slide-02-studio-cyclorama.jpg",
    alt: "Doolenses studio shoot with performers on a cyclorama and camera crane",
  },
  {
    src: "/hero/slide-03-pink-set-monitor.jpg",
    alt: "Behind the camera on a stylized pink and green Doolenses production set",
  },
  {
    src: "/hero/slide-04-jib-operator.jpg",
    alt: "Doolenses crew member operating camera jib counterweight on set",
  },
  {
    src: "/hero/slide-05-stadium-crew.jpg",
    alt: "Doolenses production crew with equipment trolley at a stadium",
  },
  {
    src: "/hero/slide-06-beetle-crane.jpg",
    alt: "Doolenses camera crane filming talent on a customized Beetle outdoors",
  },
] as const;

const INTERVAL_MS = 5000;

/**
 * Full-bleed cinematic hero slideshow — six production stills, auto crossfade + ken burns.
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
              "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
              active ? "z-[1] opacity-100" : "z-0 opacity-0"
            )}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn(
                "object-cover object-center",
                active && !reducedMotion && "animate-hero-kenburns"
              )}
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-brand-navy/45 via-brand-navy/15 to-brand-navy/80" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-brand-navy/35 via-transparent to-transparent sm:from-brand-navy/50" />
    </div>
  );
}
