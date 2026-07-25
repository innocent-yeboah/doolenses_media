import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getFeaturedPortfolio } from "@/lib/data";

/** Iso Media “View Our Captivating Gallery” preview */
export function GalleryPreview() {
  const items = getFeaturedPortfolio(8);

  return (
    <section className="border-y border-white/10 bg-brand-surface/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our work speaks volumes"
          title="View Our Captivating Gallery"
          description="A glimpse of events we’ve captured across Accra and beyond."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group relative aspect-[4/5] overflow-hidden border border-white/10"
            >
              {/* CLIENT: Replace with real project stills */}
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-xs uppercase tracking-wider text-brand-gold">{item.category}</p>
                <p className="mt-1 font-display text-base font-semibold text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/portfolio" variant="outline" size="lg">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
