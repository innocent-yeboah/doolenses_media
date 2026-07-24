import { TRUST_STATS } from "@/lib/constants";

export function TrustBar() {
  return (
    <section
      aria-label="Company highlights"
      className="border-y border-white/10 bg-brand-surface/80"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="font-display text-2xl font-bold text-brand-gold md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-slate sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
