import { Button } from "@/components/ui/Button";
import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { COMPANY } from "@/lib/constants";

/** Iso Media GH-style hero with cinematic production slideshow */
export function HomeHero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden sm:items-center">
      <HeroSlideshow />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-28 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
        <div className="max-w-3xl motion-safe:animate-fade-up">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-gold sm:mb-4 sm:text-xs">
            {COMPANY.name}
          </p>
          <h1 className="font-display text-[2rem] font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl lg:text-7xl">
            {COMPANY.heroHeadline}
          </h1>
          <p className="mt-4 text-base text-white/95 drop-shadow sm:mt-5 sm:text-lg md:text-xl">
            {COMPANY.subheadline}
          </p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-brand-gold sm:text-sm sm:tracking-[0.18em]">
            {COMPANY.tagline}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-brand-muted sm:mt-6 sm:text-base md:text-lg">
            {COMPANY.heroTrust}
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="/quote" size="lg" className="w-full sm:w-auto">
              Book a Consultation
            </Button>
            <Button href="/services" variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
