"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Editorial header — logo wordmark + sparse nav. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
        scrolled || open ? "border-b border-brand-line bg-brand-white/95 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-8">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-brand-black md:text-[1.65rem]"
          aria-label={`${COMPANY.name} home`}
        >
          {COMPANY.name}
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.18em] text-brand-black/70 transition hover:text-brand-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex p-2 text-brand-black md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn("border-t border-brand-line bg-brand-white md:hidden", open ? "block" : "hidden")}>
        <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-brand-line py-4 text-sm font-medium uppercase tracking-[0.16em] text-brand-black"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
