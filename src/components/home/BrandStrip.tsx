import Image from "next/image";

const STRIP = [
  { src: "/brand/doolenses-lockup-v2.png", alt: "Doolenses mark" },
  { src: "/services/weddings.jpg", alt: "Weddings production" },
  { src: "/services/conferences.jpg", alt: "Conference production" },
  { src: "/services/musical-concerts.jpg", alt: "Concert production" },
  { src: "/services/award-ceremonies.jpg", alt: "Awards production" },
  { src: "/brand/doolenses-wordmark.png", alt: "Doolenses wordmark" },
] as const;

/** Munson brand-section: soft logo / still strip. */
export function BrandStrip() {
  return (
    <section className="border-y border-black/5 bg-brand-mist px-4 py-12 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-8 sm:gap-12">
        {STRIP.map((item) => (
          <div
            key={item.src}
            className="relative h-12 w-24 opacity-35 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-14 sm:w-28"
          >
            <Image src={item.src} alt={item.alt} fill sizes="112px" className="object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
}
