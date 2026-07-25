"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import type { Profile } from "@/types/admin";

type AdminShellProps = {
  children: React.ReactNode;
  profile: Profile;
  userEmail: string;
};

export function AdminShell({ children, profile, userEmail }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-muted">
      <Toaster theme="dark" position="top-right" richColors />
      <AdminSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
      />
      <div
        className={
          collapsed
            ? "lg:pl-[4.5rem]"
            : "lg:pl-64"
        }
      >
        <AdminTopbar
          title="Operations Console"
          subtitle={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
          userName={profile.full_name}
          userEmail={userEmail}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
