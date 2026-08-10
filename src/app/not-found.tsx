import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-brand-black px-6 py-28 text-center">
      <div className="max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-white/65">That page isn&apos;t in our shot list.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Return Home</Button>
          <Button href="/contact" variant="outline">
            Contact Us
          </Button>
        </div>
        <p className="mt-6 text-sm text-white/55">
          Or <Link href="/services" className="text-brand-gold hover:underline">browse services</Link>.
        </p>
      </div>
    </section>
  );
}
