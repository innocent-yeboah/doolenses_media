import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "hero";
  href?: string | null;
  className?: string;
  priority?: boolean;
};

const SIZES = {
  sm: { width: 150, height: 46 },
  md: { width: 190, height: 58 },
  lg: { width: 260, height: 80 },
  hero: { width: 380, height: 116 },
} as const;

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
      alt="doolenses — Creative Work for Creative People"
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={cn(
        "h-auto w-auto max-w-full object-contain object-left",
        size === "hero" && "w-full max-w-[min(100%,24rem)] md:max-w-[26rem]",
        size === "md" && "max-h-14",
        size === "sm" && "max-h-11",
        className
      )}
    />
  );

  if (href === null) return image;

  return (
    <Link href={href} className="inline-flex items-center transition hover:opacity-90" aria-label="Doolenses home">
      {image}
    </Link>
  );
}
