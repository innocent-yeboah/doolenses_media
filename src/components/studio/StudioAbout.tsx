import Image from "next/image";
import { COMPANY } from "@/lib/constants";

/** Editorial about — large quote + grayscale still. */
export function StudioAbout() {
  return (
    <section id="about" className="scroll-mt-24 bg-brand-soft px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand-muted">About</p>
          <blockquote className="mt-8">
            <p className="font-display text-3xl font-medium leading-[1.2] tracking-tight text-brand-black sm:text-4xl md:text-5xl md:leading-[1.15]">
              &ldquo;{COMPANY.aboutBlurb}&rdquo;
            </p>
          </blockquote>
          <p className="mt-10 max-w-md text-sm leading-relaxed text-brand-muted md:text-base">
            Based in {COMPANY.city}, {COMPANY.country}. {COMPANY.agencyLine}.
          </p>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden bg-brand-line lg:col-span-5">
          <Image
            src="/hero/slide-02-studio-cyclorama.jpg"
            alt="Doolenses creative studio production"
            fill
            sizes="(max-width:1024px) 100vw, 40vw"
            className="object-cover grayscale"
          />
        </div>
      </div>
    </section>
  );
}
