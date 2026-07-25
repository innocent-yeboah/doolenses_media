import { listProfiles } from "@/actions/admin/team";
import { DataTable } from "@/components/admin/DataTable";
import { TeamRoleSelect } from "@/components/admin/forms/TeamRoleSelect";
import { PageHeader } from "@/components/admin/PageHeader";
import { requireStaff } from "@/lib/admin/auth";
import { formatDateTime, initialsFromName } from "@/lib/admin/format";
import type { Profile } from "@/types/admin";

export default async function TeamPage() {
  const { profile: currentProfile } = await requireStaff();
  const result = await listProfiles();
  const profiles = result.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team"
        description="Staff profiles and roles across Doolenses operations."
      />

      {!result.success ? (
        <p className="text-sm text-red-300">{result.message}</p>
      ) : null}

      <DataTable<Profile>
        rows={profiles}
        emptyMessage="No team members"
        emptyDescription="Staff profiles are created when users sign up via Supabase Auth."
        columns={[
          {
            key: "full_name",
            header: "Member",
            render: (row) => (
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/15 text-xs font-semibold text-brand-gold">
                  {initialsFromName(row.full_name ?? row.email)}
                </span>
                <div>
                  <p className="font-medium text-white">{row.full_name ?? "—"}</p>
                  <p className="text-xs text-brand-slate">{row.email}</p>
                </div>
              </div>
            ),
          },
          {
            key: "role",
            header: "Role",
            render: (row) => (
              <TeamRoleSelect profile={row} isAdmin={currentProfile.role === "admin"} />
            ),
          },
          {
            key: "phone",
            header: "Phone",
          },
          {
            key: "is_active",
            header: "Status",
            render: (row) => (
              <span className={row.is_active ? "text-emerald-300" : "text-red-300"}>
                {row.is_active ? "Active" : "Inactive"}
              </span>
            ),
          },
          {
            key: "last_login",
            header: "Last login",
            render: (row) => formatDateTime(row.last_login),
          },
        ]}
      />
    </div>
  );
}
