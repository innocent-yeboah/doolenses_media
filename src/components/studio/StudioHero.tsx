import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

/** KOSMO-style hero — brand-first typography, white space, two CTAs. */
export function StudioHero() {
  return (
    <section className="relative flex min-h-[100svh] items-end bg-brand-white px-6 pb-20 pt-32 md:items-center md:px-8 md:pb-28 md:pt-36">
      <div className="mx-auto w-full max-w-6xl motion-safe:animate-fade-up">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand-muted">
          {COMPANY.subheadline}
        </p>
        <h1 className="mt-6 font-display text-6xl font-medium leading-[0.95] tracking-tight text-brand-black sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          {COMPANY.name}
        </h1>
        <p className="mt-8 max-w-2xl font-display text-2xl font-normal leading-snug text-brand-black sm:text-3xl md:text-4xl">
          {COMPANY.tagline}
        </p>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
          {COMPANY.heroTrust}
        </p>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button href="/#work" size="lg">
            View Our Work
          </Button>
          <Button href="/#contact" variant="outline" size="lg">
            Let&apos;s Talk
          </Button>
        </div>
      </div>
    </section>
  );
}
