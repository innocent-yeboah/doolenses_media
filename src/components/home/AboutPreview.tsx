import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

/** Homepage about preview — story + CTA. */
export function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-brand-black">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.1),_transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
        <div className="max-w-2xl motion-safe:animate-fade-up">
          <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            We Are Doolenses!
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            {COMPANY.aboutBlurb} {COMPANY.tagline}.
          </p>
          <div className="mt-10">
            <Button href="/about" variant="outline">
              About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
