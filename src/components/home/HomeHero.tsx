"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SLIDES = [
  "/hero/slide-01-music-video-set.jpg",
  "/hero/slide-02-studio-cyclorama.jpg",
  "/hero/slide-03-pink-set-monitor.jpg",
  "/hero/slide-05-stadium-crew.jpg",
  "/hero/slide-06-beetle-crane.jpg",
] as const;

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
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5500);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden sm:items-center">
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === index ? "z-[1] opacity-100" : "z-0 opacity-0"
          )}
        >
          <Image
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn("object-cover", i === index && !reducedMotion && "animate-hero-kenburns")}
          />
        </div>
      ))}
      <div className="absolute inset-0 z-[2] bg-brand-black/55" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:pb-28 md:px-8">
        <div className="max-w-3xl motion-safe:animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
            {COMPANY.subheadline}
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            {COMPANY.heroHeadline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">{COMPANY.tagline}</p>
          <div className="mt-10">
            <Button href="/portfolio" size="lg">
              Explore Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
