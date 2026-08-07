"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Munson-style main slider: full-bleed image slides with centered copy + CTA.
 * @see https://azim.commonsupport.com/Munson/
 */
const SLIDES = [
  {
    src: "/hero/slide-01-music-video-set.jpg",
    alt: "Doolenses filming a music video set with performers and a camera jib",
    headline: "We craft visuals that are really fresh & unique",
    cta: { label: "Get Started", href: "/contact" },
  },
  {
    src: "/hero/slide-02-studio-cyclorama.jpg",
    alt: "Doolenses studio shoot with performers on a cyclorama and camera crane",
    headline: "Design, photo, video & web — one Accra studio",
    cta: { label: "Free Consultation", href: "/contact" },
  },
  {
    src: "/hero/slide-03-pink-set-monitor.jpg",
    alt: "Behind the camera on a stylized pink and green Doolenses production set",
    headline: "Bold ideas and visuals that truly work",
    cta: { label: "Start a Project", href: "/contact" },
  },
  {
    src: "/hero/slide-05-stadium-crew.jpg",
    alt: "Doolenses production crew with equipment trolley at a stadium",
    headline: "Creative work for creative people",
    cta: { label: "Explore Our Work", href: "/portfolio" },
  },
] as const;

const INTERVAL_MS = 5500;

export function HomeHero() {
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
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const active = SLIDES[index];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-black">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === index ? "z-[1] opacity-100" : "z-0 opacity-0"
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover grayscale",
              i === index && !reducedMotion && "animate-hero-kenburns"
            )}
          />
        </div>
      ))}

      {/* Munson slide-overlay — light tint so type stays readable */}
      <div className="absolute inset-0 z-[2] bg-brand-black/45" />

      {/* Centered caption — Munson .slider-caption */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-28 text-center md:px-8">
        <h1
          key={active.headline}
          className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white motion-safe:animate-fade-up sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {active.headline}
        </h1>
        <div className="mt-10 motion-safe:animate-fade-up">
          <Button href={active.cta.href} size="lg">
            {active.cta.label}
          </Button>
        </div>
      </div>

    </section>
  );
}
