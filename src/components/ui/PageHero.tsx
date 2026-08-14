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
  if (!showCopy) {
    return (
      <section className={cn("bg-brand-black pt-[4.75rem] sm:pt-24", className)}>
        <h1 className="sr-only">{title}</h1>
        <div className="flex min-h-[12rem] items-center bg-white sm:block sm:min-h-0 sm:aspect-[1024/239]">
          <div className="relative aspect-[1024/239] w-full">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              quality={95}
              sizes="100vw"
              className="object-contain object-center"
            />
          </div>
        </div>
      </section>
    );
  }

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
