"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

/** Studio strengths shown as Munson-style skill bars. */
const SKILLS = [
  { label: "Graphic Design", value: 94 },
  { label: "Photography", value: 91 },
  { label: "Videography", value: 88 },
  { label: "Web Design", value: 86 },
] as const;

/**
 * Premium, simple About preview — Munson “who we are” rhythm:
 * story + CTA on the left, skill bars on the right.
 */
export function AboutPreview() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillsInView = useInView(skillsRef, { once: true, amount: 0.35 });

  return (
    <section className="relative overflow-hidden bg-brand-black">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.1),_transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="motion-safe:animate-fade-up">
            <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              We Are Doolenses!
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              {COMPANY.aboutBlurb} {COMPANY.tagline}.
            </p>
            <div className="mt-10">
              <Button href="/about" variant="outline">
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
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="font-display text-sm font-bold tabular-nums text-brand-gold">{value}%</span>
      </div>
      <div className="h-[3px] w-full bg-white/15" role="presentation">
        <div
          className="h-full bg-brand-gold transition-[width] duration-1000 ease-out motion-reduce:transition-none"
          style={{
            width: active ? `${value}%` : "0%",
            transitionDelay: active ? `${delayMs}ms` : "0ms",
          }}
        />
      </div>
    </div>
  );
}
