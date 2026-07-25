"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AboutSlideshow } from "@/components/home/AboutSlideshow";
import { COMPANY, TRUST_STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TrustStat = (typeof TRUST_STATS)[number];

/** Iso Media “Discover Who We Are” — photo slideshow, transparent stats, scroll pop + count-up */
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

        <div className="min-w-0">
          <AboutSlideshow>
            <TrustStatsGrid className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4" compact />
          </AboutSlideshow>
        </div>
      </div>
    </section>
  );
}

function TrustStatsGrid({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={cn("grid grid-cols-2 gap-2.5 sm:gap-3", className)}>
      {TRUST_STATS.map((stat, index) => (
        <StatCard
          key={stat.label}
          stat={stat}
          compact={compact}
          active={inView}
          reduceMotion={Boolean(reduceMotion)}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}

function StatCard({
  stat,
  compact,
  active,
  reduceMotion,
  delay,
}: {
  stat: TrustStat;
  compact: boolean;
  active: boolean;
  reduceMotion: boolean;
  delay: number;
}) {
  const display = useCountUp(stat, active && !reduceMotion);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.92 }}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : reduceMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 28, scale: 0.92 }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "border border-white/25 text-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-[2px]",
        "bg-brand-navy/25 hover:bg-brand-navy/35",
        compact ? "px-2 py-3 sm:px-3 sm:py-3.5" : "px-3 py-4"
      )}
    >
      <p
        className={cn(
          "font-display font-bold text-brand-gold drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]",
          compact ? "text-xl sm:text-2xl md:text-3xl" : "text-2xl sm:text-3xl"
        )}
      >
        {display}
      </p>
      <p className="mt-1 text-[10px] uppercase leading-snug tracking-[0.12em] text-white/90 sm:text-xs">
        {stat.label}
      </p>
    </motion.div>
  );
}

function useCountUp(stat: TrustStat, active: boolean) {
  const target = typeof stat.numeric === "number" ? stat.numeric : null;
  const suffix = stat.suffix ?? "";
  const staticDisplay = "display" in stat ? stat.display : null;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === null) return;
    if (!active) {
      setValue(0);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  if (staticDisplay) return staticDisplay;
  if (target === null) return "";
  return `${value}${suffix}`;
}
