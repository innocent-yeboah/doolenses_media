import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireStaff } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: {
    default: "Admin | Doolenses",
    template: "%s | Doolenses Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, user } = await requireStaff();

  return (
    <AdminShell
      profile={profile}
      userEmail={user.email ?? profile.email}
    >
      {children}
    </AdminShell>
  );
}
