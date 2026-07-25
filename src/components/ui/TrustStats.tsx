"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TRUST_STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TrustStat = (typeof TRUST_STATS)[number];

type TrustStatsProps = {
  className?: string;
  /** Card tiles (home) vs clean banner row (about) */
  variant?: "cards" | "banner";
  compact?: boolean;
};

/**
 * Scroll-triggered trust stats with count-up numbers and pop-in motion.
 * Respects prefers-reduced-motion.
 */
export function TrustStats({ className, variant = "banner", compact = false }: TrustStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        variant === "banner"
          ? "grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6"
          : "grid grid-cols-2 gap-2.5 sm:gap-3",
        className
      )}
    >
      {TRUST_STATS.map((stat, index) => (
        <StatItem
          key={stat.label}
          stat={stat}
          variant={variant}
          compact={compact}
          active={inView}
          reduceMotion={Boolean(reduceMotion)}
          delay={index * 0.12}
        />
      ))}
    </div>
  );
}

function StatItem({
  stat,
  variant,
  compact,
  active,
  reduceMotion,
  delay,
}: {
  stat: TrustStat;
  variant: "cards" | "banner";
  compact: boolean;
  active: boolean;
  reduceMotion: boolean;
  delay: number;
}) {
  const display = useCountUp(stat, active && !reduceMotion);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 32, scale: 0.86 }}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : reduceMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 32, scale: 0.86 }
      }
      transition={{
        type: reduceMotion ? "tween" : "spring",
        duration: reduceMotion ? 0 : undefined,
        stiffness: 380,
        damping: 22,
        delay: reduceMotion ? 0 : delay,
      }}
      className={cn(
        "text-center",
        variant === "cards" && [
          "border border-white/25 bg-transparent",
          compact ? "px-2 py-3 sm:px-3 sm:py-3.5" : "px-3 py-4",
        ]
      )}
    >
      <p
        className={cn(
          "font-display font-bold text-brand-gold",
          variant === "banner" && "text-3xl sm:text-4xl md:text-5xl",
          variant === "cards" &&
            (compact ? "text-xl sm:text-2xl md:text-3xl" : "text-2xl sm:text-3xl"),
          variant === "cards" && "drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]"
        )}
      >
        {display}
      </p>
      <p
        className={cn(
          "mt-1 uppercase leading-snug tracking-[0.16em]",
          variant === "banner" && "text-xs text-brand-slate sm:text-sm",
          variant === "cards" && "text-[10px] tracking-[0.12em] text-white/90 sm:text-xs"
        )}
      >
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

    const duration = 1600;
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
