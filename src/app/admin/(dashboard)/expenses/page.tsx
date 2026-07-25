import { listExpenses } from "@/actions/admin/expenses";
import { listProjects } from "@/actions/admin/projects";
import { DataTable } from "@/components/admin/DataTable";
import { ExpenseDeleteButton, ExpensePanel } from "@/components/admin/forms/ExpensePanel";
import { PageHeader } from "@/components/admin/PageHeader";
import { EXPENSE_CATEGORY_LABELS } from "@/lib/admin/constants";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import type { Expense } from "@/types/admin";

export default async function ExpensesPage() {
  const [expensesResult, projectsResult] = await Promise.all([
    listExpenses(),
    listProjects(),
  ]);

  const expenses = expensesResult.data ?? [];
  const projects = projectsResult.data ?? [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Expenses"
        description="Track operational costs and project-related spend."
      />

      <DataTable<Expense>
        rows={expenses}
        emptyMessage="No expenses recorded"
        emptyDescription="Add your first expense using the form below."
        columns={[
          {
            key: "expense_date",
            header: "Date",
            render: (row) => formatDate(row.expense_date),
          },
          {
            key: "category",
            header: "Category",
            render: (row) => EXPENSE_CATEGORY_LABELS[row.category],
          },
          { key: "description", header: "Description" },
          {
            key: "amount",
            header: "Amount",
            render: (row) => formatCurrency(row.amount),
          },
          { key: "vendor", header: "Vendor" },
          {
            key: "actions",
            header: "",
            render: (row) => <ExpenseDeleteButton expense={row} />,
          },
        ]}
      />

      <ExpensePanel projects={projects} />
    </div>
  );
}
