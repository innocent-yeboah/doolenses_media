import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { requireStaff } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/admin/format";
import type { Notification } from "@/types/admin";

export default async function NotificationsPage() {
  const { user } = await requireStaff();
  const supabase = createClient();
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const notifications = (data ?? []) as Notification[];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="System alerts for leads, projects, invoices, and tasks."
      />
      {notifications.length === 0 ? (
        <EmptyState
          title="No notifications yet"
          description="You will see alerts here when leads and projects need attention."
        />
      ) : (
        <ul className="divide-y divide-white/10 border border-white/10">
          {notifications.map((n) => (
            <li key={n.id} className={`px-4 py-4 ${n.read ? "opacity-60" : "bg-brand-surface/30"}`}>
              <p className="font-medium text-white">{n.title}</p>
              <p className="mt-1 text-sm text-brand-slate">{n.message}</p>
              <p className="mt-2 text-xs text-brand-muted">{formatDateTime(n.created_at)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
