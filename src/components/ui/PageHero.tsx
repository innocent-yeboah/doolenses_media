import Image from "next/image";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  className?: string;
  /** When false, the photo fills the banner with no title or description overlay. */
  showCopy?: boolean;
};

export function PageHero({
  title,
  description,
  imageUrl,
  imageAlt,
  className,
  showCopy = true,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex overflow-hidden",
        showCopy ? "min-h-[38vh] items-end sm:min-h-[42vh]" : "aspect-[1024/239] min-h-0 items-stretch",
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
      {showCopy ? (
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-brand-black/50 to-brand-black/80" />
      ) : (
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-black/70 to-transparent sm:h-32" />
      )}
      {showCopy ? (
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 md:px-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-sm text-white/80 sm:mt-4 sm:text-lg">{description}</p>
          ) : null}
        </div>
      ) : (
        <h1 className="sr-only">{title}</h1>
      )}
    </section>
  );
}
