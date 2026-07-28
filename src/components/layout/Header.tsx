"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Munson-style header: logo left, nav + social right, sticky solid bar on scroll. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-black/5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:h-20 sm:px-8 lg:px-16">
        <Logo variant={scrolled || open ? "dark" : "light"} size="md" priority />

        <div className="hidden items-center gap-10 lg:flex">
          <nav className="flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] font-semibold uppercase tracking-[0.14em] transition",
                  scrolled
                    ? "text-brand-ink hover:text-brand-gold"
                    : "text-white/90 hover:text-brand-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className={cn(
                "text-[13px] font-semibold uppercase tracking-[0.14em] transition",
                scrolled
                  ? "text-brand-ink hover:text-brand-gold"
                  : "text-white/90 hover:text-brand-gold"
              )}
            >
              Quote
            </Link>
          </nav>
          <SocialLinks
            className={cn(scrolled ? "" : "[&_a]:border-white/20 [&_a]:text-white")}
            tone={scrolled ? "light" : "dark"}
          />
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex p-2 lg:hidden",
            scrolled || open ? "text-brand-ink" : "text-white"
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-black/5 bg-brand-ink lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
          {[...NAV_LINKS, { href: "/quote", label: "Quote" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/85 hover:bg-white/5 hover:text-brand-gold"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 px-3">
            <SocialLinks tone="dark" />
          </div>
        </nav>
      </div>
    </header>
  );
}
