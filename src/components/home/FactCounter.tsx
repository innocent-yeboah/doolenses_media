"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { TRUST_STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TrustStat = (typeof TRUST_STATS)[number];

/** Munson fact-counter: stats over production still + dark overlay. */
export function FactCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-8 lg:px-16">
      <Image
        src="/hero/slide-05-stadium-crew.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[rgba(35,35,35,0.9)]" aria-hidden />
      <div ref={ref} className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-2 gap-8 py-6 md:grid-cols-4 md:gap-0">
        {TRUST_STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "px-4 text-center",
              index < TRUST_STATS.length - 1 && "md:border-r md:border-white/15"
            )}
          >
            <p className="font-display text-4xl font-bold text-white sm:text-5xl">
              <CountValue
                stat={stat}
                active={inView}
                animate={!reduceMotion}
              />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/55">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountValue({
  stat,
  active,
  animate,
}: {
  stat: TrustStat;
  active: boolean;
  animate: boolean;
}) {
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
    if (!animate) {
      setValue(target);
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
  }, [active, animate, target]);

  if (staticDisplay) return <>{staticDisplay}</>;
  if (target === null) return null;
  return (
    <>
      {active ? value : 0}
      {suffix}
    </>
  );
}
