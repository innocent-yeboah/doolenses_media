import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "outlineDark";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gold text-brand-navy hover:bg-brand-gold-light focus-visible:ring-brand-gold",
  secondary:
    "bg-white text-brand-navy hover:bg-brand-muted focus-visible:ring-white",
  ghost:
    "bg-transparent text-brand-muted hover:text-white hover:bg-white/5 focus-visible:ring-brand-gold",
  outline:
    "bg-transparent border border-brand-gold/70 text-brand-gold hover:bg-brand-gold hover:text-brand-navy focus-visible:ring-brand-gold",
  /** Munson theme-btn-two — outline that fills on light surfaces */
  outlineDark:
    "bg-transparent border border-brand-gold text-brand-ink hover:bg-brand-gold hover:text-brand-navy focus-visible:ring-brand-gold",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy disabled:opacity-60 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
