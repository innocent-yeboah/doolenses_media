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

        <div className="relative isolate h-full min-h-[28rem] w-full overflow-hidden bg-brand-black lg:col-span-6 lg:min-h-[36rem]">
          <Image
            src="/hero/slide-01-music-video-set.jpg"
            alt="Doolenses production set — creative work in progress"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="z-0 object-cover object-[center_30%] grayscale"
          />
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-r from-brand-black/55 via-transparent to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-t from-brand-black/35 via-transparent to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[2] ring-1 ring-inset ring-white/10"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
