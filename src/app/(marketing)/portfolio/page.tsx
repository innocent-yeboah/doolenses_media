import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PortfolioGallery } from "@/components/portfolio/PortfolioGallery";
import { getPortfolioCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Recent projects and creative collaborations from Doolenses studio.",
  alternates: { canonical: "/portfolio" },
};

type PortfolioPageProps = {
  searchParams?: { category?: string };
};

export default function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const categories = getPortfolioCategories();
  const requested = searchParams?.category ?? "All";
  const initialCategory = categories.includes(requested) ? requested : "All";

  return (
    <>
      <PageHero
        title="Our Work"
        description="Recent projects and creative collaborations."
        imageUrl="/hero/slide-01-music-video-set.jpg"
        imageAlt="Doolenses production work"
      />
      <section className="px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <PortfolioGallery initialCategory={initialCategory} />
        </div>
      </section>
    </>
  );
}
