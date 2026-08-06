import { Button } from "@/components/ui/Button";

export function HomeCTA() {
  return (
    <section className="bg-brand-black px-6 py-20 text-center md:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Ready to bring your ideas to life?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/65 md:text-lg">
          Tell us about your next project — design, photography, video, web, print, or fashion.
        </p>
        <div className="mt-10">
          <Button href="/contact" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
