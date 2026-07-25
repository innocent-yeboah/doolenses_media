"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createExpense, deleteExpense } from "@/actions/admin/expenses";
import { Button } from "@/components/ui/Button";
import { EXPENSE_CATEGORIES } from "@/lib/admin/constants";
import type { Expense, Project } from "@/types/admin";

interface ExpensePanelProps {
  projects: Project[];
}

export function ExpensePanel({ projects }: ExpensePanelProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createExpense({
        expense_date: (form.get("expense_date") as string) || undefined,
        category: form.get("category") as string,
        description: form.get("description") as string,
        amount: Number(form.get("amount")),
        vendor: (form.get("vendor") as string) || null,
        project_id: (form.get("project_id") as string) || null,
        notes: (form.get("notes") as string) || null,
      });

      if (!result.success) {
        setError(result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      (e.target as HTMLFormElement).reset();
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleCreate} className="space-y-4 rounded-lg border border-white/10 bg-brand-surface/40 p-6">
      <h2 className="font-display text-lg font-semibold text-white">Record expense</h2>
      {error ? (
        <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Date</label>
          <input name="expense_date" type="date" className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Category</label>
          <select name="category" className="field-input" defaultValue="other">
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Amount (GHS) *</label>
          <input name="amount" type="number" step="0.01" min={0.01} required className="field-input" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Description *</label>
          <input name="description" required className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Vendor</label>
          <input name="vendor" className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Project</label>
          <select name="project_id" className="field-input">
            <option value="">None</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.project_name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Notes</label>
          <input name="notes" className="field-input" />
        </div>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Add expense"}
      </Button>
    </form>
  );
}

interface ExpenseDeleteButtonProps {
  expense: Expense;
}

export function ExpenseDeleteButton({ expense }: ExpenseDeleteButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Delete this expense?")) return;
    startTransition(async () => {
      const result = await deleteExpense(expense.id);
      if (!result.success) toast.error(result.message);
      else {
        toast.success(result.message);
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-xs text-red-300 hover:text-red-200 disabled:opacity-50"
    >
      Delete
    </button>
  );
}
