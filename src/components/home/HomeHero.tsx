import Image from "next/image";
import { Button } from "@/components/ui/Button";

const HERO = {
  src: "/hero/slide-01-music-video-set.jpg",
  alt: "Doolenses filming a music video set with performers and a camera jib",
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
          className="object-cover grayscale"
        />
      </div>

      <div className="absolute inset-0 z-[2] bg-brand-black/45" />

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
