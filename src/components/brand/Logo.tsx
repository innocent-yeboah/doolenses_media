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

/** Full brand lockup (mark + doolenses) intrinsic ratio ≈ 811×149 */
const LOCKUP = {
  sm: { width: 200, height: 37 },
  md: { width: 240, height: 44 },
  lg: { width: 300, height: 55 },
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
      src="/brand/doolenses-lockup.png"
      alt=""
      width={LOCKUP[size].width}
      height={LOCKUP[size].height}
      priority={priority}
      className={cn(
        "h-auto w-auto max-h-[2.35rem] object-contain object-left sm:max-h-[2.75rem]",
        size === "md" && "max-h-[2.75rem] sm:max-h-[3.25rem]",
        size === "lg" && "max-h-[3.5rem]",
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
