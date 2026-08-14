"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS, STUDIO_SERVICES, getServiceHref } from "@/lib/constants";
import { cn } from "@/lib/utils";

type DropdownKey = "services" | null;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverMenu, setHoverMenu] = useState<DropdownKey>(null);
  const [mobileExpand, setMobileExpand] = useState<DropdownKey>(null);
  const [mobileService, setMobileService] = useState<string | null>(null);
  const solidNav = scrolled || open || pathname === "/services/graphic-design";

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

  const linkTone = "text-white/85 hover:text-brand-gold";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solidNav
          ? "border-b border-white/10 bg-brand-black/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between px-4 sm:h-24 sm:px-6 md:px-8">
        <Logo variant="light" size="sm" priority />

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
          className="inline-flex p-2 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-t border-white/10 bg-brand-black sm:max-h-[calc(100dvh-6rem)] lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col px-4 py-3 sm:px-6" aria-label="Mobile">
          {NAV_LINKS.map((link) => {
            if (link.href === "/services") {
              return (
                <div key={link.href} className="border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpand((v) => (v === "services" ? null : "services"))
                      }
                      className="p-3 text-white"
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
                                className="flex-1 py-2 text-sm font-medium text-white"
                              >
                                {service.title}
                              </Link>
                              <button
                                type="button"
                                onClick={() =>
                                  setMobileService((v) => (v === service.id ? null : service.id))
                                }
                                className="p-2 text-white/60"
                                aria-expanded={expanded}
                                aria-label={`${expanded ? "Collapse" : "Expand"} ${service.title}`}
                              >
                                <ChevronDown
                                  className={cn("h-3.5 w-3.5 transition", expanded && "rotate-180")}
                                />
                              </button>
                            </div>
                            {expanded ? (
                              <ul className="mb-2 space-y-1 border-l border-white/15 pl-3">
                                {service.items.map((item) => (
                                  <li key={item}>
                                    <Link
                                      href={`/contact?subject=${encodeURIComponent(item)}`}
                                      onClick={() => setOpen(false)}
                                      className="block py-1.5 text-sm text-white/60 transition hover:text-brand-gold"
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
                className="border-b border-white/10 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white"
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
        <ul className="min-w-[15rem] border border-white/15 bg-brand-black py-2 shadow-elevate">
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
                      ? "bg-white/5 text-brand-gold"
                      : "text-white/75 hover:bg-white/5 hover:text-brand-gold"
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
                  <ul className="min-w-[13rem] border border-white/15 bg-brand-black py-2 shadow-elevate">
                    <li>
                      <Link
                        href={getServiceHref(service.slug)}
                        onClick={onClose}
                        className="block border-b border-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-gold transition hover:bg-white/5"
                      >
                        View all works
                      </Link>
                    </li>
                    {service.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/contact?subject=${encodeURIComponent(item)}`}
                          onClick={onClose}
                          className="block px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white/75 transition hover:bg-white/5 hover:text-brand-gold"
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
