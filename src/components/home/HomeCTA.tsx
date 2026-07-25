import { Button } from "@/components/ui/Button";

/** Iso Media “Elevate Your Next Event” closing CTA */
export function HomeCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.12)_0%,transparent_55%)]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
          Ready to Elevate Your Event?
        </h2>
        <p className="mt-4 text-lg text-brand-slate">
          Let us bring your vision to life with our expert production services
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/quote" size="lg">
            Get a Free Quote
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact the Team
          </Button>
        </div>
      </div>
    </section>
  );
}
