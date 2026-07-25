"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createInvoice } from "@/actions/admin/invoices";
import { Button } from "@/components/ui/Button";
import { INVOICE_STATUSES } from "@/lib/admin/constants";
import type { Project } from "@/types/admin";

interface InvoiceCreateFormProps {
  projects: Project[];
}

export function InvoiceCreateForm({ projects }: InvoiceCreateFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState([{ description: "", quantity: 1, unit_price: 0 }]);

  function addItem() {
    setItems([...items, { description: "", quantity: 1, unit_price: 0 }]);
  }

  function updateItem(index: number, field: string, value: string | number) {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    setItems(next);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);

    const validItems = items.filter((i) => i.description.trim() && i.unit_price > 0);

    startTransition(async () => {
      const result = await createInvoice({
        project_id: (form.get("project_id") as string) || null,
        client_name: form.get("client_name") as string,
        client_email: (form.get("client_email") as string) || null,
        client_phone: (form.get("client_phone") as string) || null,
        tax: Number(form.get("tax") || 0),
        status: form.get("status") as string,
        due_date: form.get("due_date") as string,
        notes: (form.get("notes") as string) || null,
        items: validItems.length ? validItems : undefined,
        amount: validItems.length
          ? undefined
          : Number(form.get("amount") || 0),
      });

      if (!result.success) {
        setError(result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/admin/invoices");
      router.refresh();
    });
  }

  function handleProjectChange(projectId: string) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    const form = document.getElementById("invoice-form") as HTMLFormElement | null;
    if (!form) return;
    (form.elements.namedItem("client_name") as HTMLInputElement).value = project.client_name;
    (form.elements.namedItem("client_email") as HTMLInputElement).value = project.client_email ?? "";
    (form.elements.namedItem("client_phone") as HTMLInputElement).value = project.client_phone ?? "";
  }

  return (
    <form id="invoice-form" onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-6">
      {error ? (
        <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Link project</label>
          <select
            name="project_id"
            className="field-input"
            onChange={(e) => handleProjectChange(e.target.value)}
          >
            <option value="">None</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.project_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Status</label>
          <select name="status" className="field-input" defaultValue="draft">
            {INVOICE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Client name *</label>
          <input name="client_name" required className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Client email</label>
          <input name="client_email" type="email" className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Client phone</label>
          <input name="client_phone" className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Due date *</label>
          <input name="due_date" type="date" required className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Tax (GHS)</label>
          <input name="tax" type="number" step="0.01" defaultValue={0} className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Flat amount (if no line items)</label>
          <input name="amount" type="number" step="0.01" defaultValue={0} className="field-input" />
        </div>
      </div>

      <div className="space-y-3 rounded-lg border border-white/10 bg-brand-surface/40 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-white">Line items</h3>
          <Button type="button" size="sm" variant="outline" onClick={addItem}>
            Add line
          </Button>
        </div>
        {items.map((item, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-4">
            <input
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(i, "description", e.target.value)}
              className="field-input sm:col-span-2"
            />
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateItem(i, "quantity", Number(e.target.value))}
              className="field-input"
            />
            <input
              type="number"
              step="0.01"
              min={0}
              placeholder="Unit price"
              value={item.unit_price || ""}
              onChange={(e) => updateItem(i, "unit_price", Number(e.target.value))}
              className="field-input"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-muted">Notes</label>
        <textarea name="notes" rows={2} className="field-input resize-y" />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create invoice"}
        </Button>
        <Button href="/admin/invoices" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
