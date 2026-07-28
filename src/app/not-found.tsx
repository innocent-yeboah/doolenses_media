import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-brand-paper px-4 py-28 text-center">
      <div className="max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">Page not found</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-brand-ink md:text-5xl">
          Let&apos;s get you back on set
        </h1>
        <p className="mt-4 text-brand-body">
          That page isn&apos;t in our shot list. Head home or request a quote for your next production.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Return Home</Button>
          <Button href="/quote" variant="outlineDark">
            Get a Quote
          </Button>
        </div>
        <p className="mt-6 text-sm text-brand-body">
          Or <Link href="/contact" className="text-brand-gold hover:underline">contact the team</Link>.
        </p>
      </div>
    </section>
  );
}
