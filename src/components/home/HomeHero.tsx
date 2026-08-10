import Image from "next/image";
import { Button } from "@/components/ui/Button";

const HERO = {
  src: "/hero/hero-stage-performance.png",
  alt: "Doolenses stage performance with talent under cinematic lighting",
  headline: "We craft visuals that are really fresh & unique",
  cta: { label: "Get Started", href: "/contact" },
} as const;

/** Full-bleed hero — single image with centered copy + CTA. */
export function HomeHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-brand-black">
      <div className="absolute inset-0 z-[1]">
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </div>

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-brand-black/55 via-brand-black/40 to-brand-black/70" />
      <div className="absolute inset-0 z-[2] bg-brand-black/25" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-28 text-center md:px-8">
        <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white motion-safe:animate-fade-up sm:text-5xl md:text-6xl lg:text-7xl">
          {HERO.headline}
        </h1>
        <div className="mt-10 motion-safe:animate-fade-up">
          <Button href={HERO.cta.href} size="lg">
            {HERO.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
