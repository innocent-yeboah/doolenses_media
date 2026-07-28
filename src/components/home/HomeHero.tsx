"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    src: "/hero/slide-01-music-video-set.jpg",
    alt: "Doolenses filming a music video set with performers and a camera jib",
    title: COMPANY.heroHeadline,
  },
  {
    src: "/hero/slide-02-studio-cyclorama.jpg",
    alt: "Doolenses studio shoot with performers on a cyclorama and camera crane",
    title: "Creative work, for creative people",
  },
  {
    src: "/hero/slide-03-pink-set-monitor.jpg",
    alt: "Behind the camera on a stylized pink and green Doolenses production set",
    title: "Television production & advertising excellence",
  },
  {
    src: "/hero/slide-05-stadium-crew.jpg",
    alt: "Doolenses production crew with equipment trolley at a stadium",
    title: "Capturing moments, creating memories",
  },
  {
    src: "/hero/slide-06-beetle-crane.jpg",
    alt: "Doolenses camera crane filming talent on a customized Beetle outdoors",
    title: COMPANY.heroHeadline,
  },
] as const;

const INTERVAL_MS = 6000;

/** Munson main-slider: full-bleed carousel, centered H1 + single CTA, side arrows. */
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
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[index];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-brand-ink sm:min-h-[800px]">
      {SLIDES.map((item, i) => {
        const active = i === index;
        return (
          <div
            key={item.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-in-out",
              active ? "z-[1] opacity-100" : "z-0 opacity-0"
            )}
            aria-hidden={!active}
          >
            <Image
              src={item.src}
              alt={item.alt}
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

      <div className="pointer-events-none absolute inset-0 z-[2] bg-brand-ink/35" />

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 sm:min-h-[800px] sm:px-8">
        <div
          key={slide.src}
          className="mx-auto max-w-4xl text-center motion-safe:animate-fade-up"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
            {COMPANY.name}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-[60px] lg:leading-[1.15]">
            {slide.title}
          </h1>
          <div className="mt-10">
            <Button href="/quote" size="lg" className="min-w-[180px] uppercase tracking-[0.12em]">
              Get Started
            </Button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-black/20 p-2 text-white backdrop-blur-sm transition hover:border-brand-gold hover:text-brand-gold sm:left-6 sm:p-3"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/25 bg-black/20 p-2 text-white backdrop-blur-sm transition hover:border-brand-gold hover:text-brand-gold sm:right-6 sm:p-3"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </section>
  );
}
