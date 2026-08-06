import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  iconClassName?: string;
  tone?: "light" | "dark";
};

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      <li>
        <a
          href={COMPANY.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Doolenses on Instagram"
          className="inline-flex h-10 w-10 items-center justify-center border border-brand-line text-brand-black transition hover:border-brand-black"
        >
          <InstagramIcon className={cn("h-5 w-5", iconClassName)} />
        </a>
      </li>
    </ul>
  );
}
