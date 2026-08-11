import Image from "next/image";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  className?: string;
};

export function PageHero({ title, description, imageUrl, imageAlt, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[38vh] items-end overflow-hidden sm:min-h-[42vh]",
        className
      )}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/50 to-brand-black/80" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 md:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:mt-4 sm:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
