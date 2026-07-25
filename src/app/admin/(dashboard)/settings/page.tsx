import { getCompanySettings } from "@/actions/admin/settings";
import { SettingsForm } from "@/components/admin/forms/SettingsForm";
import { EmptyState } from "@/components/admin/EmptyState";
import { PageHeader } from "@/components/admin/PageHeader";
import { requireStaff } from "@/lib/admin/auth";

export default async function SettingsPage() {
  const { profile } = await requireStaff();
  const result = await getCompanySettings();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Company profile and contact details used across operations."
      />

      {profile.role !== "admin" ? (
        <p className="rounded border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Only administrators can edit settings. You can view current values below.
        </p>
      ) : null}

      {!result.success || !result.data ? (
        <EmptyState title="Settings unavailable" description={result.message} />
      ) : profile.role === "admin" ? (
        <SettingsForm settings={result.data} />
      ) : (
        <div className="mx-auto max-w-2xl space-y-4 rounded-lg border border-white/10 bg-brand-surface/40 p-6">
          <dl className="grid gap-3 sm:grid-cols-2">
            {Object.entries(result.data).map(([key, value]) =>
              key === "id" ? null : (
                <div key={key}>
                  <dt className="text-xs uppercase tracking-wider text-brand-slate">
                    {key.replace(/_/g, " ")}
                  </dt>
                  <dd className="mt-1 text-sm text-white">{String(value ?? "—")}</dd>
                </div>
              )
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
