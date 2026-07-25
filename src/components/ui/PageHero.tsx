import Image from "next/image";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  className?: string;
};

export function PageHero({
  title,
  description,
  imageUrl,
  imageAlt,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative flex min-h-[46vh] items-end overflow-hidden", className)}>
      <Image src={imageUrl} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/40 via-brand-navy/55 to-brand-navy/90" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base text-brand-muted sm:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
