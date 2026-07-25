import Image from "next/image";
import Link from "next/link";
import { COMPANY, TRUST_STATS } from "@/lib/constants";

/** Iso Media “Discover Who We Are” — photo + trust stats, mobile-first */
export function AboutPreview() {
  return (
    <section className="border-y border-white/10 bg-brand-surface/40 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
            Discover Who We Are
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Passion for every frame
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-slate sm:mt-5 sm:text-base md:text-lg">
            {COMPANY.aboutBlurb}
          </p>
          <Link
            href="/about"
            className="mt-5 inline-flex text-sm font-semibold text-brand-gold transition hover:text-brand-gold-light sm:mt-6"
          >
            Learn more about Doolenses →
          </Link>
        </div>

        <div className="min-w-0">
          {/* Photo */}
          <div className="relative h-[280px] w-full overflow-hidden border border-white/10 sm:h-[360px] lg:h-[420px]">
            <Image
              src="/about/about-preview.jpg"
              alt="Doolenses production crew filming with a camera crane on location in Accra"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover object-[center_20%] sm:object-center"
            />
            {/* Soft fade only on larger screens where stats overlay the photo */}
            <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-brand-navy/90 via-brand-navy/15 to-transparent lg:block" />

            {/* Desktop / tablet overlay stats */}
            <div className="absolute inset-x-0 bottom-0 hidden grid-cols-2 gap-3 p-4 sm:gap-3 sm:p-5 lg:grid">
              {TRUST_STATS.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} compact />
              ))}
            </div>
          </div>

          {/* Mobile stats below photo — no overlap, full readability */}
          <div className="mt-4 grid grid-cols-2 gap-3 lg:hidden">
            {TRUST_STATS.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  label,
  compact = false,
}: {
  value: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "border border-white/15 bg-brand-navy/75 px-2.5 py-3 text-center backdrop-blur-sm"
          : "border border-white/10 bg-brand-navy/50 px-3 py-4 text-center"
      }
    >
      <p
        className={
          compact
            ? "font-display text-xl font-bold text-brand-gold sm:text-2xl"
            : "font-display text-2xl font-bold text-brand-gold sm:text-3xl"
        }
      >
        {value}
      </p>
      <p className="mt-1 text-[10px] uppercase leading-snug tracking-[0.12em] text-brand-muted sm:text-xs">
        {label}
      </p>
    </div>
  );
}
