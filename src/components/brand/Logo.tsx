import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** light = white lockup (over dark); dark = inverted for light surfaces */
  variant?: "light" | "dark";
  withWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string | null;
  className?: string;
  priority?: boolean;
};

/** Full brand lockup (mark + doolenses) intrinsic ratio ≈ 794×153 */
const LOCKUP = {
  sm: { width: 210, height: 40 },
  md: { width: 250, height: 48 },
  lg: { width: 310, height: 60 },
} as const;

const MARK_ONLY = {
  sm: 52,
  md: 62,
  lg: 78,
} as const;

/**
 * Doolenses logo — official brand lockup with mark + brand name.
 */
export function Logo({
  variant = "dark",
  withWordmark = true,
  size = "md",
  href = "/",
  className,
  priority = false,
}: LogoProps) {
  const content = withWordmark ? (
    <Image
      src="/brand/doolenses-lockup-v2.png"
      alt=""
      width={LOCKUP[size].width}
      height={LOCKUP[size].height}
      priority={priority}
      className={cn(
        "h-auto w-auto max-h-[2.5rem] object-contain object-left sm:max-h-[2.9rem]",
        size === "md" && "max-h-[2.9rem] sm:max-h-[3.4rem]",
        size === "lg" && "max-h-[3.75rem]",
        variant === "dark" && "invert"
      )}
      aria-hidden
    />
  ) : (
    <Image
      src="/brand/doolenses-mark-clear.png"
      alt=""
      width={MARK_ONLY[size]}
      height={MARK_ONLY[size]}
      priority={priority}
      className={cn("shrink-0 object-contain", variant === "dark" && "invert")}
      aria-hidden
    />
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
