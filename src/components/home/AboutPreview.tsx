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
        <div className="order-2 flex flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 md:px-8 md:py-28 lg:order-1 lg:col-span-6 lg:pr-12 xl:pr-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-gold sm:text-[11px] sm:tracking-[0.28em]">
            {COMPANY.subheadline} · {COMPANY.city}
          </p>

          <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.02em] text-white sm:mt-6 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            We are <span className="brand-wordmark">Doolenses</span>
          </h2>

          <span className="mt-6 h-px w-14 bg-brand-gold sm:mt-7" aria-hidden />

          <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-white/65 sm:mt-7 md:text-base">
            {COMPANY.heroTrust}
          </p>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/45 sm:mt-5">
            Design, photography, videography, web, print, and fashion — one studio system for brands
            that need clarity and craft.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Button href="/about" variant="outline" className="w-full sm:w-auto">
              About the Studio
            </Button>
            <Link
              href="/contact"
              className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:text-brand-gold sm:text-left"
            >
              Start a conversation →
            </Link>
          </div>
        </div>

        <div className="relative order-1 isolate min-h-[18rem] w-full overflow-hidden bg-brand-black sm:min-h-[22rem] lg:order-2 lg:col-span-6 lg:min-h-[36rem]">
          <Image
            src="/hero/slide-01-music-video-set.jpg"
            alt="Doolenses production set — creative work in progress"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="z-0 object-cover object-[center_30%] grayscale"
          />
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-t from-brand-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand-black/55 lg:via-transparent lg:to-transparent"
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
