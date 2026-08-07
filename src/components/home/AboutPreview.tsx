"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { COMPANY, STUDIO_STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Studio strengths shown as Munson-style skill bars. */
const SKILLS = [
  { label: "Graphic Design", value: 94 },
  { label: "Photography", value: 91 },
  { label: "Videography", value: 88 },
  { label: "Web Design", value: 86 },
] as const;

/**
 * Premium, simple About preview — Munson “who we are” rhythm:
 * story + CTA on the left, skill bars on the right, quiet stats below.
 */
export function AboutPreview() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.35 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  return (
    <section className="relative overflow-hidden bg-brand-soft">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.08),_transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="motion-safe:animate-fade-up">
            <h2 className="font-display text-4xl font-bold tracking-tight text-brand-black sm:text-5xl md:text-6xl">
              We Are Doolenses!
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-brand-muted md:text-lg">
              {COMPANY.aboutBlurb} {COMPANY.tagline}.
            </p>
            <div className="mt-10">
              <Button href="/about" variant="outlineDark">
                About Us
              </Button>
            </div>
          </div>

          <div ref={skillsRef} className="space-y-7">
            {SKILLS.map((skill, i) => (
              <SkillBar
                key={skill.label}
                label={skill.label}
                value={skill.value}
                active={skillsInView}
                delayMs={i * 90}
              />
            ))}
          </div>
        </div>

        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 gap-y-10 border-t border-brand-line/80 pt-12 sm:grid-cols-4 sm:gap-0"
        >
          {STUDIO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "text-center sm:px-4",
                i > 0 && "sm:border-l sm:border-brand-line/80"
              )}
            >
              <p className="font-display text-3xl font-bold tracking-tight text-brand-black sm:text-4xl">
                <CountUp value={stat.numeric} suffix={stat.suffix} active={statsInView} />
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  label,
  value,
  active,
  delayMs,
}: {
  label: string;
  value: number;
  active: boolean;
  delayMs: number;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-brand-black">{label}</span>
        <span className="font-display text-sm font-bold text-brand-gold tabular-nums">{value}%</span>
      </div>
      <div className="h-[3px] w-full bg-brand-line/70" role="presentation">
        <div
          className="h-full bg-brand-gold transition-[width] duration-1000 ease-out"
          style={{
            width: active ? `${value}%` : "0%",
            transitionDelay: active ? `${delayMs}ms` : "0ms",
          }}
        />
      </div>
    </div>
  );
}

function CountUp({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1400, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <>
      {n}
      {suffix}
    </>
  );
}
