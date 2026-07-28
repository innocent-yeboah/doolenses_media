import { Clapperboard, Film, Sparkles } from "lucide-react";
import { PRODUCTION_PROCESS } from "@/lib/constants";

const ICONS = [Clapperboard, Film, Sparkles] as const;

/** Munson our-process: 3-col dark band. */
export function ProcessSection() {
  return (
    <section className="bg-brand-ink px-4 py-[91px] text-white sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-3 md:gap-8">
        {PRODUCTION_PROCESS.map((step, index) => {
          const Icon = ICONS[index] ?? Film;
          return (
            <article key={step.title} className="text-center md:text-left">
              <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center text-brand-gold md:mx-0">
                <Icon className="h-10 w-10" strokeWidth={1.25} aria-hidden />
              </div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                {step.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
