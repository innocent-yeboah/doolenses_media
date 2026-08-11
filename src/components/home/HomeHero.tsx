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
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-brand-black sm:items-center">
      <div className="absolute inset-0 z-[1]">
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%] sm:object-[center_35%]"
        />
      </div>

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-brand-black/60 via-brand-black/45 to-brand-black/80" />
      <div className="absolute inset-0 z-[2] bg-brand-black/20" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-16 pt-28 text-center sm:px-6 sm:py-28 md:px-8">
        <h1 className="max-w-[18ch] font-display text-[1.85rem] font-bold leading-[1.12] tracking-tight text-white motion-safe:animate-fade-up sm:max-w-none sm:text-5xl md:text-6xl lg:text-7xl">
          {HERO.headline}
        </h1>
        <div className="mt-8 w-full max-w-xs motion-safe:animate-fade-up sm:mt-10 sm:max-w-none">
          <Button href={HERO.cta.href} size="lg" className="w-full sm:w-auto">
            {HERO.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
