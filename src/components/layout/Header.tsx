"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS, STUDIO_SERVICES } from "@/lib/constants";
import { getPortfolioCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

const PORTFOLIO_CATEGORIES = getPortfolioCategories().filter((c) => c !== "All");

type DropdownKey = "services" | "portfolio" | null;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverMenu, setHoverMenu] = useState<DropdownKey>(null);
  const [mobileExpand, setMobileExpand] = useState<DropdownKey>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkTone = scrolled
    ? "text-brand-black/70 hover:text-brand-gold"
    : "text-white/85 hover:text-brand-gold";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-brand-line bg-brand-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-8">
        <Logo variant={scrolled || open ? "dark" : "light"} size="md" priority />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            if (link.href === "/services") {
              return (
                <DesktopDropdown
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  open={hoverMenu === "services"}
                  onOpen={() => setHoverMenu("services")}
                  onClose={() => setHoverMenu(null)}
                  linkClassName={linkTone}
                  items={STUDIO_SERVICES.map((s) => ({
                    href: `/services#${s.slug}`,
                    label: s.title,
                  }))}
                />
              );
            }

            if (link.href === "/portfolio") {
              return (
                <DesktopDropdown
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  open={hoverMenu === "portfolio"}
                  onOpen={() => setHoverMenu("portfolio")}
                  onClose={() => setHoverMenu(null)}
                  linkClassName={linkTone}
                  items={PORTFOLIO_CATEGORIES.map((category) => ({
                    href: `/portfolio?category=${encodeURIComponent(category)}`,
                    label: category,
                  }))}
                />
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition",
                  linkTone
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={cn("inline-flex p-2 lg:hidden", scrolled || open ? "text-brand-black" : "text-white")}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn("border-t border-brand-line bg-brand-white lg:hidden", open ? "block" : "hidden")}>
        <nav className="flex flex-col px-6 py-3" aria-label="Mobile">
          {NAV_LINKS.map((link) => {
            if (link.href === "/services") {
              return (
                <MobileAccordion
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  expanded={mobileExpand === "services"}
                  onToggle={() =>
                    setMobileExpand((v) => (v === "services" ? null : "services"))
                  }
                  onNavigate={() => setOpen(false)}
                  items={STUDIO_SERVICES.map((s) => ({
                    href: `/services#${s.slug}`,
                    label: s.title,
                  }))}
                />
              );
            }

            if (link.href === "/portfolio") {
              return (
                <MobileAccordion
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  expanded={mobileExpand === "portfolio"}
                  onToggle={() =>
                    setMobileExpand((v) => (v === "portfolio" ? null : "portfolio"))
                  }
                  onNavigate={() => setOpen(false)}
                  items={PORTFOLIO_CATEGORIES.map((category) => ({
                    href: `/portfolio?category=${encodeURIComponent(category)}`,
                    label: category,
                  }))}
                />
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-brand-line py-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand-black"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function DesktopDropdown({
  label,
  href,
  open,
  onOpen,
  onClose,
  linkClassName,
  items,
}: {
  label: string;
  href: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  linkClassName: string;
  items: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition",
          linkClassName,
          open && "text-brand-gold"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition duration-200", open && "rotate-180")}
          aria-hidden
        />
      </Link>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2 transition",
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        )}
      >
        <ul className="border border-brand-line bg-brand-white py-2 shadow-elevate">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-brand-black/75 transition hover:bg-brand-soft hover:text-brand-gold"
                onClick={onClose}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileAccordion({
  label,
  href,
  expanded,
  onToggle,
  onNavigate,
  items,
}: {
  label: string;
  href: string;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  items: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div className="border-b border-brand-line">
      <div className="flex items-center justify-between">
        <Link
          href={href}
          onClick={onNavigate}
          className="flex-1 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand-black"
        >
          {label}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          className="p-3 text-brand-black"
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${label}`}
        >
          <ChevronDown className={cn("h-4 w-4 transition", expanded && "rotate-180")} />
        </button>
      </div>
      {expanded ? (
        <ul className="space-y-1 pb-4 pl-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block py-2 text-sm text-brand-muted transition hover:text-brand-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
