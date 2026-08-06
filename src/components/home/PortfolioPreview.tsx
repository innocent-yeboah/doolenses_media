import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getFeaturedPortfolio } from "@/lib/data";

export function PortfolioPreview() {
  const items = getFeaturedPortfolio(6);

  return (
    <section className="bg-brand-white px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Portfolio"
          description="Recent projects and creative collaborations."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link key={item.id} href="/portfolio" className="group block overflow-hidden bg-brand-soft">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
                  {item.category}
                </p>
                <h3 className="mt-2 font-display text-lg font-bold text-brand-black group-hover:text-brand-gold">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button href="/portfolio" variant="outlineDark">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
