"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createProject } from "@/actions/admin/projects";
import { Button } from "@/components/ui/Button";
import { EVENT_TYPES, LEAD_PRIORITIES, PROJECT_STATUSES } from "@/lib/admin/constants";
import type { Lead } from "@/types/admin";

interface ProjectCreateFormProps {
  lead?: Lead | null;
}

export function ProjectCreateForm({ lead }: ProjectCreateFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createProject({
        lead_id: lead?.id ?? ((form.get("lead_id") as string) || null),
        client_name: form.get("client_name") as string,
        client_phone: (form.get("client_phone") as string) || null,
        client_email: (form.get("client_email") as string) || null,
        project_name: form.get("project_name") as string,
        project_type: (form.get("project_type") as string) || null,
        description: (form.get("description") as string) || null,
        event_date: (form.get("event_date") as string) || null,
        event_location: (form.get("event_location") as string) || null,
        status: form.get("status") as string,
        priority: form.get("priority") as string,
        start_date: (form.get("start_date") as string) || null,
        estimated_completion: (form.get("estimated_completion") as string) || null,
        budget: form.get("budget") ? Number(form.get("budget")) : null,
        notes: (form.get("notes") as string) || null,
      });

      if (!result.success) {
        setError(result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push(`/admin/projects/${result.data!.id}`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      {error ? (
        <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Client name *</label>
          <input
            name="client_name"
            required
            defaultValue={lead?.name ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Project name *</label>
          <input
            name="project_name"
            required
            defaultValue={
              lead
                ? lead.event_type
                  ? `${lead.name} — ${lead.event_type}`
                  : `${lead.name} Production`
                : ""
            }
            className="field-input"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Client phone</label>
          <input name="client_phone" defaultValue={lead?.phone ?? ""} className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Client email</label>
          <input name="client_email" type="email" defaultValue={lead?.email ?? ""} className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Project type</label>
          <select name="project_type" defaultValue={lead?.event_type ?? ""} className="field-input">
            <option value="">Select…</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Event date</label>
          <input
            name="event_date"
            type="date"
            defaultValue={lead?.event_date ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Location</label>
          <input
            name="event_location"
            defaultValue={lead?.event_location ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Budget (GHS)</label>
          <input
            name="budget"
            type="number"
            step="0.01"
            defaultValue={lead?.quote_amount ?? ""}
            className="field-input"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Status</label>
          <select name="status" className="field-input" defaultValue="planning">
            {PROJECT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Priority</label>
          <select name="priority" className="field-input" defaultValue={lead?.priority ?? "normal"}>
            {LEAD_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Start date</label>
          <input name="start_date" type="date" className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Est. completion</label>
          <input name="estimated_completion" type="date" className="field-input" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Description</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={lead?.message ?? ""}
            className="field-input resize-y"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Notes</label>
          <textarea name="notes" rows={2} defaultValue={lead?.notes ?? ""} className="field-input resize-y" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create project"}
        </Button>
        <Button href="/admin/projects" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
