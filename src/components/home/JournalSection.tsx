import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HOME_JOURNAL } from "@/lib/constants";

/** Munson news-section: 3 journal cards using existing production stills. */
export function JournalSection() {
  return (
    <section className="bg-brand-paper px-4 py-[91px] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl md:text-[42px]">
            Latest From Set
          </h2>
          <span className="mx-auto mt-4 block h-1 w-10 bg-brand-gold" aria-hidden />
          <p className="mt-6 text-base leading-relaxed text-brand-body">
            Moments from recent productions across Accra — weddings, stages, and campaigns.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {HOME_JOURNAL.map((item) => (
            <article key={item.title} className="group">
              <Link href={item.href} className="block">
                <div className="relative aspect-[16/11] overflow-hidden bg-brand-mist">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-body">
                  {item.date}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-brand-ink transition group-hover:text-brand-gold">
                  {item.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold">
                  Read more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
