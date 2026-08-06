"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  Package,
  Receipt,
  Wrench,
  Settings,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS: ReadonlyArray<{
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}> = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: ClipboardList },
  { href: "/admin/projects", label: "Projects", icon: Package },
  { href: "/admin/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/admin/equipment", label: "Equipment", icon: Wrench },
  { href: "/admin/invoices", label: "Invoices", icon: Receipt },
  { href: "/admin/expenses", label: "Expenses", icon: Wallet },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function AdminSidebar({
  open = false,
  onClose,
  collapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex h-16 items-center border-b border-white/10 px-4",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        {!collapsed ? (
          <Link href="/admin" className="min-w-0" onClick={onClose}>
            <Logo size="sm" href={null} className="[&_span]:text-white" />
          </Link>
        ) : (
          <Link
            href="/admin"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-gold/15 text-brand-gold"
            aria-label="Admin dashboard"
            onClick={onClose}
          >
            <LayoutDashboard className="h-5 w-5" />
          </Link>
        )}

        {onToggleCollapse ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden rounded-md p-1.5 text-brand-slate transition hover:bg-white/5 hover:text-brand-gold lg:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        ) : null}

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-brand-slate transition hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin navigation">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(href, exact);
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition",
                collapsed && "justify-center px-2",
                active
                  ? "bg-brand-gold/15 text-brand-gold"
                  : "text-brand-slate hover:bg-white/5 hover:text-white"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className={cn("h-4 w-4 shrink-0", active && "text-brand-gold")} aria-hidden />
              {!collapsed ? <span>{label}</span> : null}
            </Link>
          );
        })}
      </nav>

      {!collapsed ? (
        <div className="border-t border-white/10 p-4">
          <p className="text-xs text-brand-slate">Doolenses Admin</p>
          <p className="mt-1 text-[11px] text-brand-slate/80">Production operating system</p>
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden h-screen shrink-0 border-r border-white/10 bg-brand-navy transition-[width] duration-300 lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:flex-col",
          collapsed ? "lg:w-[72px]" : "lg:w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-brand-dark/70 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation overlay"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 overflow-hidden border-r border-white/10 bg-brand-navy shadow-elevate transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full pointer-events-none"
        )}
        aria-hidden={!open}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
