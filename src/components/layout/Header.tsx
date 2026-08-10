"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS, STUDIO_SERVICES, getServiceHref } from "@/lib/constants";
import { cn } from "@/lib/utils";

type DropdownKey = "services" | null;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverMenu, setHoverMenu] = useState<DropdownKey>(null);
  const [mobileExpand, setMobileExpand] = useState<DropdownKey>(null);
  const [mobileService, setMobileService] = useState<string | null>(null);

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
                <ExplorerDropdown
                  key={link.href}
                  label={link.label}
                  href={link.href}
                  open={hoverMenu === "services"}
                  onOpen={() => setHoverMenu("services")}
                  onClose={() => setHoverMenu(null)}
                  linkClassName={linkTone}
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
                <div key={link.href} className="border-b border-brand-line">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-brand-black"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpand((v) => (v === "services" ? null : "services"))
                      }
                      className="p-3 text-brand-black"
                      aria-expanded={mobileExpand === "services"}
                      aria-label={`${mobileExpand === "services" ? "Collapse" : "Expand"} ${link.label}`}
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition",
                          mobileExpand === "services" && "rotate-180"
                        )}
                      />
                    </button>
                  </div>
                  {mobileExpand === "services" ? (
                    <ul className="space-y-1 pb-4 pl-1">
                      {STUDIO_SERVICES.map((service) => {
                        const expanded = mobileService === service.id;
                        return (
                          <li key={service.id}>
                            <div className="flex items-center justify-between">
                              <Link
                                href={getServiceHref(service.slug)}
                                onClick={() => setOpen(false)}
                                className="flex-1 py-2 text-sm font-medium text-brand-black"
                              >
                                {service.title}
                              </Link>
                              <button
                                type="button"
                                onClick={() =>
                                  setMobileService((v) => (v === service.id ? null : service.id))
                                }
                                className="p-2 text-brand-muted"
                                aria-expanded={expanded}
                                aria-label={`${expanded ? "Collapse" : "Expand"} ${service.title}`}
                              >
                                <ChevronDown
                                  className={cn("h-3.5 w-3.5 transition", expanded && "rotate-180")}
                                />
                              </button>
                            </div>
                            {expanded ? (
                              <ul className="mb-2 space-y-1 border-l border-brand-line pl-3">
                                {service.items.map((item) => (
                                  <li key={item}>
                                    <Link
                                      href={`/contact?subject=${encodeURIComponent(item)}`}
                                      onClick={() => setOpen(false)}
                                      className="block py-1.5 text-sm text-brand-muted transition hover:text-brand-gold"
                                    >
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
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

function ExplorerDropdown({
  label,
  href,
  open,
  onOpen,
  onClose,
  linkClassName,
}: {
  label: string;
  href: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  linkClassName: string;
}) {
  const [flyout, setFlyout] = useState<string | null>(null);

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={() => {
        onClose();
        setFlyout(null);
      }}
    >
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
          "absolute left-0 top-full z-50 pt-2 transition",
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        )}
      >
        <ul className="min-w-[15rem] border border-brand-line bg-brand-white py-2 shadow-elevate">
          {STUDIO_SERVICES.map((service) => {
            const active = flyout === service.id;
            return (
              <li
                key={service.id}
                className="relative"
                onMouseEnter={() => setFlyout(service.id)}
              >
                <Link
                  href={getServiceHref(service.slug)}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between gap-3 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] transition",
                    active
                      ? "bg-brand-soft text-brand-gold"
                      : "text-brand-black/75 hover:bg-brand-soft hover:text-brand-gold"
                  )}
                >
                  {service.title}
                  <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                </Link>

                <div
                  className={cn(
                    "absolute left-full top-0 z-50 pl-1 transition",
                    active ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
                  )}
                >
                  <ul className="min-w-[13rem] border border-brand-line bg-brand-white py-2 shadow-elevate">
                    <li>
                      <Link
                        href={getServiceHref(service.slug)}
                        onClick={onClose}
                        className="block border-b border-brand-line px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold transition hover:bg-brand-soft"
                      >
                        View all works
                      </Link>
                    </li>
                    {service.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/contact?subject=${encodeURIComponent(item)}`}
                          onClick={onClose}
                          className="block px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-brand-black/75 transition hover:bg-brand-soft hover:text-brand-gold"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
