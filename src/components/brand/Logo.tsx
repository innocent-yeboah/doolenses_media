import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** light = white wordmark (over dark hero); dark = black wordmark (over white) */
  variant?: "light" | "dark";
  withWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
  priority?: boolean;
};

const MARK = {
  sm: 64,
  md: 77,
  lg: 97,
} as const;

/**
 * Doolenses logo: mono mark + Harabara Mais Demo wordmark.
 */
export function Logo({
  variant = "dark",
  withWordmark = true,
  size = "md",
  href = "/",
  className,
  priority = false,
}: LogoProps) {
  const px = MARK[size];

  const content = (
    <span className="inline-flex items-center gap-0.5">
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
            "brand-wordmark leading-none",
            size === "sm" && "text-2xl sm:text-3xl",
            size === "md" && "text-3xl sm:text-4xl",
            size === "lg" && "text-4xl",
            variant === "light" ? "text-white" : "text-brand-ink"
          )}
        >
          {COMPANY.name}
        </span>
      ) : null}
    </span>
  );

  if (href === null) {
    return (
      <span role="img" aria-label={`${COMPANY.name} logo`} className={className}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center transition hover:opacity-90", className)}
      aria-label={`${COMPANY.name} home`}
    >
      {content}
    </Link>
  );
}
