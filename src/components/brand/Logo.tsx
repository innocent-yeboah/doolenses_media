import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Show wordmark beside the mark */
  withWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
  priority?: boolean;
};

const MARK = {
  sm: 32,
  md: 40,
  lg: 56,
} as const;

/**
 * Editorial monochrome mark (white geometry on black square) + optional wordmark.
 */
export function Logo({
  withWordmark = true,
  size = "md",
  href = "/",
  className,
  priority = false,
}: LogoProps) {
  const px = MARK[size];

  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/brand/doolenses-mark-mono.png"
        alt=""
        width={px}
        height={px}
        priority={priority}
        className="shrink-0 object-contain"
        aria-hidden
      />
      {withWordmark ? (
        <span
          className={cn(
            "font-display font-semibold tracking-tight text-brand-black",
            size === "sm" && "text-lg",
            size === "md" && "text-2xl md:text-[1.65rem]",
            size === "lg" && "text-3xl"
          )}
        >
          {COMPANY.name}
        </span>
      ) : null}
    </span>
  );

  if (href === null) {
    return (
      <span role="img" aria-label={`${COMPANY.name} logo`}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center transition hover:opacity-80"
      aria-label={`${COMPANY.name} home`}
    >
      {content}
    </Link>
  );
}
