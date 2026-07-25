"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { assignEquipment, createEquipment } from "@/actions/admin/equipment";
import { Button } from "@/components/ui/Button";
import { EQUIPMENT_CATEGORIES } from "@/lib/admin/constants";
import type { Equipment, Project } from "@/types/admin";

interface EquipmentPanelProps {
  equipment: Equipment[];
  projects: Project[];
}

export function EquipmentPanel({ equipment, projects }: EquipmentPanelProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createEquipment({
        item_name: form.get("item_name") as string,
        category: form.get("category") as string,
        description: (form.get("description") as string) || null,
        quantity: Number(form.get("quantity") || 1),
        available: Number(form.get("available") || form.get("quantity") || 1),
        condition: form.get("condition") as string,
        location: (form.get("location") as string) || null,
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

  function handleAssign(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await assignEquipment({
        equipment_id: form.get("equipment_id") as string,
        project_id: form.get("project_id") as string,
        notes: (form.get("notes") as string) || null,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      router.refresh();
    });
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleCreate} className="space-y-4 rounded-lg border border-white/10 bg-brand-surface/40 p-6">
        <h2 className="font-display text-lg font-semibold text-white">Add equipment</h2>
        {error ? (
          <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Item name *</label>
            <input name="item_name" required className="field-input" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Category</label>
            <select name="category" className="field-input" defaultValue="other">
              {EQUIPMENT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Condition</label>
            <select name="condition" className="field-input" defaultValue="good">
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="needs_repair">Needs repair</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Quantity</label>
            <input name="quantity" type="number" min={1} defaultValue={1} className="field-input" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Available</label>
            <input name="available" type="number" min={0} defaultValue={1} className="field-input" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Location</label>
            <input name="location" className="field-input" />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Description</label>
            <textarea name="description" rows={2} className="field-input resize-y" />
          </div>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Adding…" : "Add equipment"}
        </Button>
      </form>

      {equipment.length > 0 && projects.length > 0 ? (
        <form onSubmit={handleAssign} className="space-y-4 rounded-lg border border-white/10 bg-brand-surface/40 p-6">
          <h2 className="font-display text-lg font-semibold text-white">Assign to project</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-muted">Equipment</label>
              <select name="equipment_id" required className="field-input">
                <option value="">Select…</option>
                {equipment
                  .filter((e) => e.available > 0)
                  .map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.item_name} ({e.available} avail.)
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-muted">Project</label>
              <select name="project_id" required className="field-input">
                <option value="">Select…</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.project_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-brand-muted">Notes</label>
              <input name="notes" className="field-input" />
            </div>
          </div>
          <Button type="submit" size="sm" disabled={pending}>
            Assign
          </Button>
        </form>
      ) : null}
    </div>
  );
}
