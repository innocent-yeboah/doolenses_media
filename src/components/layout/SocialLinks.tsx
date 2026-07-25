import { Instagram } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  {
    href: COMPANY.social.instagram,
    label: "Doolenses on Instagram",
    icon: Instagram,
  },
] as const;

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
};

/** Public profile links — Instagram is the primary channel. */
export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-brand-slate transition hover:border-brand-gold/40 hover:text-brand-gold"
          >
            <Icon className={cn("h-5 w-5", iconClassName)} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
