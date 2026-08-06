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
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl",
          eyebrow && "mt-3",
          dark ? "text-white" : "text-brand-black"
        )}
      >
        {title}
      </h2>
      <span
        className={cn("mt-4 block h-1 w-10 bg-brand-gold", align === "center" && "mx-auto")}
        aria-hidden
      />
      {description ? (
        <p className={cn("mt-5 text-base leading-relaxed md:text-lg", dark ? "text-white/70" : "text-brand-muted")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
