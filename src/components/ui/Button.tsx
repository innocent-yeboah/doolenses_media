import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "outlineDark";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gold text-brand-black hover:bg-brand-gold-light focus-visible:ring-brand-gold",
  secondary:
    "bg-brand-black text-brand-white hover:bg-black focus-visible:ring-brand-black",
  ghost:
    "bg-transparent text-brand-black hover:bg-brand-soft focus-visible:ring-brand-gold",
  outline:
    "bg-transparent border border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black focus-visible:ring-brand-white",
  outlineDark:
    "bg-transparent border border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white focus-visible:ring-brand-black",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-3.5 text-sm",
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
    "inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-[0.08em] uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} target={target ?? "_blank"} rel={rel ?? "noopener noreferrer"} className={classes}>
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
