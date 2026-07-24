import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Visual treatment for dark or light surfaces */
  variant?: "light" | "dark";
  /** compact = mark + wordmark only feel via smaller lockup */
  size?: "sm" | "md" | "lg" | "hero";
  href?: string | null;
  className?: string;
  priority?: boolean;
};

const SIZES = {
  sm: { width: 140, height: 43 },
  md: { width: 180, height: 55 },
  lg: { width: 240, height: 73 },
  hero: { width: 420, height: 128 },
} as const;

/**
 * Official Doolenses lockup — mark + "doolenses" + tagline.
 * Assets extracted from brand banner; replace with vector SVG when available.
 */
export function Logo({
  variant = "light",
  size = "md",
  href = "/",
  className,
  priority = false,
}: LogoProps) {
  const dims = SIZES[size];
  const src =
    variant === "light"
      ? "/brand/doolenses-logo-white.png"
      : "/brand/doolenses-logo.png";

  const image = (
    <Image
      src={src}
      alt="doolenses — Creative Work for Creative Peoples"
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={cn(
        "h-auto w-auto max-w-full object-contain object-left",
        size === "hero" && "w-full max-w-[min(100%,28rem)] sm:max-w-[26rem] md:max-w-[28rem]",
        size === "md" && "max-h-14",
        size === "sm" && "max-h-11",
        className
      )}
    />
  );

  if (href === null) {
    return image;
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center transition opacity-100 hover:opacity-90"
      aria-label="Doolenses home"
    >
      {image}
    </Link>
  );
}

type LogoMarkProps = {
  variant?: "light" | "dark";
  className?: string;
  size?: number;
};

/** Triangular interlocking mark only — for favicon-style uses and compact UI. */
export function LogoMark({ variant = "light", className, size = 40 }: LogoMarkProps) {
  const src =
    variant === "light"
      ? "/brand/doolenses-mark-white.png"
      : "/brand/doolenses-mark.png";

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={cn("object-contain", className)}
      aria-hidden
    />
  );
}
