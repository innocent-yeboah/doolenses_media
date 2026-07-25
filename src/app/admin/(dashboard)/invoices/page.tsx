import { listInvoices } from "@/actions/admin/invoices";
import { MarkPaidButton } from "@/components/admin/forms/MarkPaidButton";
import { DataTable } from "@/components/admin/DataTable";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import type { Invoice } from "@/types/admin";

export default async function InvoicesPage() {
  const result = await listInvoices();
  const invoices = result.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Client billing and payment tracking in GHS."
        actions={
          <Button href="/admin/invoices/new" size="sm">
            New invoice
          </Button>
        }
      />

      {!result.success ? (
        <p className="text-sm text-red-300">{result.message}</p>
      ) : null}

      <DataTable<Invoice>
        rows={invoices}
        emptyMessage="No invoices yet"
        emptyDescription="Create an invoice for a client or project."
        columns={[
          {
            key: "invoice_number",
            header: "Invoice #",
            render: (row) => (
              <span className="font-mono text-white">{row.invoice_number}</span>
            ),
          },
          { key: "client_name", header: "Client" },
          {
            key: "total_amount",
            header: "Total",
            render: (row) => formatCurrency(row.total_amount),
          },
          {
            key: "status",
            header: "Status",
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: "due_date",
            header: "Due",
            render: (row) => formatDate(row.due_date),
          },
          {
            key: "paid_at",
            header: "Paid",
            render: (row) => formatDate(row.paid_at),
          },
          {
            key: "actions",
            header: "",
            render: (row) => <MarkPaidButton invoice={row} />,
          },
        ]}
      />
    </div>
  );
}
