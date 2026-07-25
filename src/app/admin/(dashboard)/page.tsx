import Link from "next/link";
import {
  CalendarDays,
  ClipboardList,
  Package,
  Plus,
  Receipt,
  TrendingUp,
} from "lucide-react";
import { LeadStatusChart, RevenueLineChart } from "@/components/admin/charts/AdminCharts";
import { DataTable } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { PriorityBadge } from "@/components/admin/PriorityBadge";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { LEAD_STATUSES } from "@/lib/admin/constants";
import { getDashboardStats } from "@/lib/admin/dashboard-data";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import type { Lead, LeadStatus } from "@/types/admin";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const leadChartData = LEAD_STATUSES.map((status) => ({
    status: status as LeadStatus,
    count: stats.leadCountsByStatus[status as LeadStatus],
  }));

  const quickActions = [
    { href: "/admin/leads/new", label: "New lead", icon: ClipboardList },
    { href: "/admin/projects/new", label: "New project", icon: Package },
    { href: "/admin/invoices/new", label: "New invoice", icon: Receipt },
    { href: "/admin/calendar", label: "Calendar", icon: CalendarDays },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of leads, productions, and revenue across Doolenses operations."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total leads" value={stats.totalLeads} hint="All pipeline stages" />
        <StatCard label="Active projects" value={stats.activeProjects} hint="Not yet completed" />
        <StatCard
          label="Monthly revenue"
          value={formatCurrency(stats.monthlyRevenue)}
          hint="Paid invoices this month"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          label="Upcoming events"
          value={stats.upcomingEvents}
          hint="Leads & projects in next 7 days"
          icon={<CalendarDays className="h-5 w-5" />}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {quickActions.map(({ href, label, icon: Icon }) => (
          <Button key={href} href={href} size="sm" variant="outline">
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-white/10 bg-brand-surface/40 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">Leads by status</h2>
          <LeadStatusChart data={leadChartData} />
        </section>
        <section className="rounded-lg border border-white/10 bg-brand-surface/40 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">Revenue trend</h2>
          <RevenueLineChart data={stats.revenueByMonth} />
        </section>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-white">Recent leads</h2>
          <Button href="/admin/leads/new" size="sm">
            <Plus className="h-4 w-4" />
            Add lead
          </Button>
        </div>
        <DataTable<Lead>
          rows={stats.recentLeads}
          emptyMessage="No leads yet"
          emptyDescription="Create a lead or wait for website submissions."
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
              header: "Event",
              render: (row) => formatDate(row.event_date),
            },
          ]}
        />
      </section>
    </div>
  );
}
