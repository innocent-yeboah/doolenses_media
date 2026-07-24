import { Logo } from "@/components/brand/Logo";
import { HeroVideo } from "@/components/home/HeroVideo";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* Doolenses showreel — cropped from Instagram reel for 16:9 hero */}
      <HeroVideo />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="max-w-3xl motion-safe:animate-fade-up">
          <h1 className="sr-only">{COMPANY.name}</h1>
          <Logo
            variant="light"
            size="hero"
            href={null}
            priority
            className="max-w-[min(100%,420px)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]"
          />
          <p className="mt-6 max-w-xl text-lg text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] sm:text-xl md:text-2xl">
            {COMPANY.subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/quote" size="lg">
              Book a Consultation
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Explore Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
