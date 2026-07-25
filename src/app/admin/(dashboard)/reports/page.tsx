import { LeadStatusChart, SimpleBarChart } from "@/components/admin/charts/AdminCharts";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { EXPENSE_CATEGORY_LABELS } from "@/lib/admin/constants";
import { getReportAggregates } from "@/lib/admin/dashboard-data";
import { formatCurrency } from "@/lib/admin/format";
import type { LeadStatus } from "@/types/admin";

export default async function ReportsPage() {
  const report = await getReportAggregates();

  const leadChartData = report.leadsByStatus.map((item) => ({
    status: item.status as LeadStatus,
    count: item.count,
  }));

  const expenseChartData = report.expenseByCategory.map((item) => ({
    label: EXPENSE_CATEGORY_LABELS[item.category as keyof typeof EXPENSE_CATEGORY_LABELS] ?? item.category,
    value: item.amount,
  }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Financial and pipeline summaries across the business."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total revenue" value={formatCurrency(report.totalRevenue)} />
        <StatCard label="Total expenses" value={formatCurrency(report.totalExpenses)} />
        <StatCard
          label="Net profit"
          value={formatCurrency(report.netProfit)}
          hint="Paid invoices minus expenses"
        />
        <StatCard label="Projects" value={report.projectCount} hint={`${report.leadCount} leads · ${report.invoiceCount} invoices`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-white/10 bg-brand-surface/40 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">Lead pipeline</h2>
          <LeadStatusChart data={leadChartData} />
        </section>
        <section className="rounded-lg border border-white/10 bg-brand-surface/40 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-white">Expenses by category</h2>
          <SimpleBarChart data={expenseChartData} valueLabel="GHS" />
        </section>
      </div>
    </div>
  );
}
