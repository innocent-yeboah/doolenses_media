import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.25em]",
            dark ? "text-brand-gold" : "text-brand-gold"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl font-bold sm:text-4xl md:text-[42px] md:leading-[50px]",
          eyebrow && "mt-3",
          dark ? "text-white" : "text-brand-ink"
        )}
      >
        {title}
      </h2>
      <span
        className={cn(
          "mt-4 block h-1 w-10 bg-brand-gold",
          align === "center" && "mx-auto"
        )}
        aria-hidden
      />
      {description ? (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/65" : "text-brand-body"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
