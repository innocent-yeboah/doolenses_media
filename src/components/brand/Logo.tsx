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
  sm: 36,
  md: 44,
  lg: 56,
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
    <span className="inline-flex items-center gap-3">
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
            "brand-wordmark",
            size === "sm" && "text-lg sm:text-2xl",
            size === "md" && "text-xl sm:text-2xl",
            size === "lg" && "text-3xl",
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
