import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import {
  SERVICE_WORKS,
  STUDIO_SERVICES,
  getStudioService,
  type StudioServiceSlug,
} from "@/lib/constants";

type ServicePageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return STUDIO_SERVICES.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = getStudioService(params.slug);
  if (!service) return { title: "Service" };

  return {
    title: `${service.title} Works`,
    description: `${service.description} Explore selected ${service.title.toLowerCase()} work from Doolenses.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default function ServiceWorksPage({ params }: ServicePageProps) {
  const service = getStudioService(params.slug);
  if (!service) notFound();

  const slug = service.slug as StudioServiceSlug;
  const works = SERVICE_WORKS[slug] ?? [];

  return (
    <>
      <PageHero
        title={service.title}
        description={`Selected ${service.title.toLowerCase()} works — ${service.shortDescription}`}
        imageUrl={service.imageUrl}
        imageAlt={`Doolenses ${service.title} work`}
      />

      <section className="bg-brand-black px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 border-b border-white/15 pb-8 sm:pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                Studio works
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                {service.shortDescription}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                {service.description}
              </p>
            </div>
            <Button href="/contact" className="w-full shrink-0 sm:w-auto">
              Start a Project
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 sm:mt-8 sm:gap-x-6">
            {service.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/90">
                <span className="h-1 w-1 bg-brand-gold" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <article key={work.id} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold">
                  {work.category}
                </p>
                <h3 className="mt-1.5 font-display text-lg font-bold text-white sm:text-xl">
                  {work.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{work.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:pt-10">
            <Link
              href="/services"
              className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55 transition hover:text-brand-gold"
            >
              ← All disciplines
            </Link>
            <Button href="/contact" variant="outline" className="w-full sm:w-auto">
              Request a Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
