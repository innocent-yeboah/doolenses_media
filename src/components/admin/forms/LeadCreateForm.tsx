"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createLead } from "@/actions/admin/leads";
import { Button } from "@/components/ui/Button";
import {
  EVENT_TYPES,
  LEAD_PRIORITIES,
  LEAD_STATUSES,
  SOURCE_OPTIONS,
} from "@/lib/admin/constants";

export function LeadCreateForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createLead({
        name: form.get("name") as string,
        email: (form.get("email") as string) || null,
        phone: form.get("phone") as string,
        event_type: (form.get("event_type") as string) || null,
        event_date: (form.get("event_date") as string) || null,
        event_location: (form.get("event_location") as string) || null,
        budget_range: (form.get("budget_range") as string) || null,
        message: (form.get("message") as string) || null,
        source: (form.get("source") as string) || "other",
        status: form.get("status") as string,
        priority: form.get("priority") as string,
        notes: (form.get("notes") as string) || null,
      });

      if (!result.success) {
        setError(result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push(`/admin/leads/${result.data!.id}`);
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
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Name *</label>
          <input name="name" required className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Email</label>
          <input name="email" type="email" className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Phone *</label>
          <input name="phone" required className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Event type</label>
          <select name="event_type" className="field-input">
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
          <input name="event_date" type="date" className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Location</label>
          <input name="event_location" className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Budget range</label>
          <input name="budget_range" className="field-input" placeholder="e.g. GHS 5,000 – 10,000" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Source</label>
          <select name="source" className="field-input" defaultValue="other">
            {SOURCE_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Status</label>
          <select name="status" className="field-input" defaultValue="new">
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Priority</label>
          <select name="priority" className="field-input" defaultValue="normal">
            {LEAD_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Message</label>
          <textarea name="message" rows={3} className="field-input resize-y" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Notes</label>
          <textarea name="notes" rows={2} className="field-input resize-y" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create lead"}
        </Button>
        <Button href="/admin/leads" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
