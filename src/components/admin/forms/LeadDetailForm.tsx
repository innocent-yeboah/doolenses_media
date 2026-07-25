"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { convertLeadToProject, deleteLead, updateLead } from "@/actions/admin/leads";
import { Button } from "@/components/ui/Button";
import { LEAD_PRIORITIES, LEAD_STATUSES } from "@/lib/admin/constants";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/admin/format";
import type { Lead } from "@/types/admin";

interface LeadDetailFormProps {
  lead: Lead;
  canDelete: boolean;
}

export function LeadDetailForm({ lead, canDelete }: LeadDetailFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateLead({
        id: lead.id,
        status: form.get("status") as string,
        priority: form.get("priority") as string,
        notes: (form.get("notes") as string) || null,
        quote_amount: form.get("quote_amount")
          ? Number(form.get("quote_amount"))
          : null,
        lost_reason: (form.get("lost_reason") as string) || null,
      });

      if (!result.success) {
        setError(result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    });
  }

  function handleConvert() {
    startTransition(async () => {
      const result = await convertLeadToProject(lead.id);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      router.push(`/admin/projects/${result.data!.projectId}`);
    });
  }

  function handleDelete() {
    if (!confirm("Delete this lead permanently?")) return;
    startTransition(async () => {
      const result = await deleteLead(lead.id);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      router.push("/admin/leads");
    });
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-lg border border-white/10 bg-brand-surface/40 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-brand-slate">Contact</p>
          <p className="mt-1 font-medium text-white">{lead.name}</p>
          <p className="text-sm text-brand-muted">{lead.email ?? "—"}</p>
          <p className="text-sm text-brand-muted">{lead.phone}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-brand-slate">Event</p>
          <p className="mt-1 text-white">{lead.event_type ?? "—"}</p>
          <p className="text-sm text-brand-muted">{formatDate(lead.event_date)}</p>
          <p className="text-sm text-brand-muted">{lead.event_location ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-brand-slate">Meta</p>
          <p className="text-sm text-brand-muted">Source: {lead.source ?? "—"}</p>
          <p className="text-sm text-brand-muted">Budget: {lead.budget_range ?? "—"}</p>
          <p className="text-sm text-brand-muted">Created: {formatDateTime(lead.created_at)}</p>
        </div>
        {lead.message ? (
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-xs uppercase tracking-wider text-brand-slate">Message</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-brand-muted">{lead.message}</p>
          </div>
        ) : null}
      </div>

      <form onSubmit={handleUpdate} className="space-y-4 rounded-lg border border-white/10 bg-brand-surface/40 p-6">
        <h2 className="font-display text-lg font-semibold text-white">Update lead</h2>
        {error ? (
          <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Status</label>
            <select name="status" defaultValue={lead.status} className="field-input">
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Priority</label>
            <select name="priority" defaultValue={lead.priority} className="field-input">
              {LEAD_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Quote amount (GHS)</label>
            <input
              name="quote_amount"
              type="number"
              step="0.01"
              defaultValue={lead.quote_amount ?? ""}
              className="field-input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Lost reason</label>
            <input name="lost_reason" defaultValue={lead.lost_reason ?? ""} className="field-input" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Notes</label>
            <textarea name="notes" rows={4} defaultValue={lead.notes ?? ""} className="field-input resize-y" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving…" : "Save changes"}
          </Button>
          <Button type="button" variant="outline" disabled={pending} onClick={handleConvert}>
            Convert to project
          </Button>
          {canDelete ? (
            <Button type="button" variant="ghost" disabled={pending} onClick={handleDelete}>
              Delete lead
            </Button>
          ) : null}
        </div>
      </form>

      {lead.quote_amount ? (
        <p className="text-sm text-brand-slate">
          Current quote: {formatCurrency(lead.quote_amount)}
        </p>
      ) : null}
    </div>
  );
}
