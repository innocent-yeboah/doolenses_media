import Link from "next/link";
import { Suspense } from "react";
import { listLeads } from "@/actions/admin/leads";
import { DataTable } from "@/components/admin/DataTable";
import { LeadsFilters } from "@/components/admin/forms/LeadsFilters";
import { PageHeader } from "@/components/admin/PageHeader";
import { PriorityBadge } from "@/components/admin/PriorityBadge";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/admin/format";
import type { Lead } from "@/types/admin";

interface LeadsPageProps {
  searchParams: { search?: string; status?: string; source?: string };
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const result = await listLeads({
    search: searchParams.search,
    status: searchParams.status,
    source: searchParams.source,
  });

  const leads = result.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description="Manage inquiries from the website and manual entries."
        actions={
          <Button href="/admin/leads/new" size="sm">
            New lead
          </Button>
        }
      />

      <Suspense fallback={<div className="h-10 animate-pulse rounded bg-white/5" />}>
        <LeadsFilters />
      </Suspense>

      {!result.success ? (
        <p className="text-sm text-red-300">{result.message}</p>
      ) : null}

      <DataTable<Lead>
        rows={leads}
        emptyMessage="No leads match your filters"
        emptyDescription="Try adjusting filters or add a new lead."
        columns={[
          {
            key: "name",
            header: "Name",
            render: (row) => (
              <Link href={`/admin/leads/${row.id}`} className="font-medium text-white hover:text-brand-gold">
                {row.name}
              </Link>
            ),
          },
          { key: "phone", header: "Phone" },
          { key: "event_type", header: "Event type" },
          {
            key: "status",
            header: "Status",
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: "priority",
            header: "Priority",
            render: (row) => <PriorityBadge priority={row.priority} />,
          },
          {
            key: "event_date",
            header: "Event date",
            render: (row) => formatDate(row.event_date),
          },
          { key: "source", header: "Source" },
        ]}
      />
    </div>
  );
}
