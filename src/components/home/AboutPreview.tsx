import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { COMPANY } from "@/lib/constants";

/**
 * Homepage about preview — Fortune-grade editorial split:
 * restrained copy, clear brand signal, photographic anchor.
 */
export function AboutPreview() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-brand-black">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-12 lg:items-stretch">
        <div className="flex flex-col justify-center px-6 py-20 md:px-8 md:py-28 lg:col-span-6 lg:pr-12 xl:pr-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
            {COMPANY.subheadline} · {COMPANY.city}
          </p>

          <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            We are Doolenses
          </h2>

          <span className="mt-7 h-px w-14 bg-brand-gold" aria-hidden />

          <p className="mt-7 max-w-md text-[15px] leading-[1.75] text-white/65 md:text-base">
            {COMPANY.heroTrust}
          </p>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/45">
            Design, photography, videography, web, print, and fashion — one studio system for brands
            that need clarity and craft.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/about" variant="outline">
              About the Studio
            </Button>
            <Link
              href="/contact"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-brand-gold"
            >
              Start a conversation →
            </Link>
          </div>
        </div>

        <div className="relative min-h-[22rem] lg:col-span-6 lg:min-h-full">
          <Image
            src="/images/about/about-team.jpg"
            alt="Doolenses creative team at work"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/35 to-transparent lg:from-brand-black/80"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-black/50 via-transparent to-transparent lg:hidden"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
