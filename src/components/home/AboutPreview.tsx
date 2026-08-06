"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { COMPANY, STUDIO_STATS } from "@/lib/constants";

export function AboutPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="bg-brand-white px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">About Us</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-black sm:text-4xl md:text-5xl">
            Creative studio. Bold ideas.
          </h2>
          <span className="mt-4 block h-1 w-10 bg-brand-gold" aria-hidden />
          <p className="mt-6 text-base leading-relaxed text-brand-muted md:text-lg">{COMPANY.aboutBlurb}</p>
          <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">{COMPANY.heroTrust}</p>
          <div className="mt-8">
            <Button href="/about" variant="outlineDark">
              Learn More
            </Button>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-2 gap-4 sm:gap-6">
          {STUDIO_STATS.map((stat) => (
            <div key={stat.label} className="border border-brand-line bg-brand-soft p-6 text-center">
              <p className="font-display text-3xl font-bold text-brand-gold sm:text-4xl">
                <CountUp value={stat.numeric} suffix={stat.suffix} active={inView} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-brand-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl text-right">
        <Link href="/about" className="text-sm font-semibold text-brand-gold hover:underline">
          Learn more about Doolenses →
        </Link>
      </div>
    </section>
  );
}

function CountUp({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
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
