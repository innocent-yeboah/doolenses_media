"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Bell, LogOut, Menu } from "lucide-react";
import { initialsFromName } from "@/lib/admin/format";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface AdminTopbarProps {
  title: string;
  subtitle?: string;
  userName?: string | null;
  userEmail?: string | null;
  onMenuClick?: () => void;
  className?: string;
}

export function AdminTopbar({
  title,
  subtitle,
  userName,
  userEmail,
  onMenuClick,
  className,
}: AdminTopbarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/admin/login");
      router.refresh();
    });
  };

  const displayName = userName?.trim() || userEmail || "Staff member";
  const initials = initialsFromName(displayName);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-white/10 bg-brand-navy/95 backdrop-blur-md",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {onMenuClick ? (
            <button
              type="button"
              onClick={onMenuClick}
              className="rounded-md p-2 text-brand-slate transition hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : null}
          <div className="min-w-0">
            <h2 className="truncate font-display text-lg font-semibold text-white sm:text-xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="truncate text-xs text-brand-slate sm:text-sm">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/admin/notifications"
            className="relative rounded-md p-2 text-brand-slate transition hover:bg-white/5 hover:text-brand-gold"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
          </Link>

          <div className="hidden items-center gap-3 border-l border-white/10 pl-3 sm:flex">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-semibold text-brand-gold"
              aria-hidden
            >
              {initials}
            </div>
            <div className="min-w-0 max-w-[180px]">
              <p className="truncate text-sm font-medium text-white">{displayName}</p>
              {userEmail ? (
                <p className="truncate text-xs text-brand-slate">{userEmail}</p>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-xs font-semibold text-brand-muted transition hover:border-brand-gold/40 hover:text-brand-gold disabled:opacity-60 sm:text-sm"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{isPending ? "Signing out…" : "Sign out"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
