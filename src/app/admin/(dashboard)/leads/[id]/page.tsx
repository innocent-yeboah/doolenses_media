import { notFound } from "next/navigation";
import { getLead } from "@/actions/admin/leads";
import { LeadDetailForm } from "@/components/admin/forms/LeadDetailForm";
import { PageHeader } from "@/components/admin/PageHeader";
import { PriorityBadge } from "@/components/admin/PriorityBadge";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { requireStaff } from "@/lib/admin/auth";

interface LeadDetailPageProps {
  params: { id: string };
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { profile } = await requireStaff();
  const result = await getLead(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  const lead = result.data;
  const canDelete = profile.role === "admin" || profile.role === "manager";

  return (
    <div className="space-y-6">
      <PageHeader
        title={lead.name}
        description={lead.event_type ?? "Lead detail"}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge status={lead.status} />
            <PriorityBadge priority={lead.priority} />
          </div>
        }
      />
      <LeadDetailForm lead={lead} canDelete={canDelete} />
    </div>
  );
}
