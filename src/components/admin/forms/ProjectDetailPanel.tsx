"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  addProjectTask,
  updateProject,
  updateProjectStatus,
  updateProjectTask,
} from "@/actions/admin/projects";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/Button";
import { LEAD_PRIORITIES, PROJECT_STATUSES, PROJECT_TASK_STATUSES } from "@/lib/admin/constants";
import { formatCurrency, formatDate } from "@/lib/admin/format";
import type { Project, ProjectTask } from "@/types/admin";

interface ProjectDetailPanelProps {
  project: Project;
  tasks: ProjectTask[];
}

export function ProjectDetailPanel({ project, tasks }: ProjectDetailPanelProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleProjectUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateProject({
        id: project.id,
        status: form.get("status") as string,
        priority: form.get("priority") as string,
        notes: (form.get("notes") as string) || null,
        budget: form.get("budget") ? Number(form.get("budget")) : null,
        actual_cost: form.get("actual_cost") ? Number(form.get("actual_cost")) : null,
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

  function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await addProjectTask({
        project_id: project.id,
        title: form.get("title") as string,
        description: (form.get("description") as string) || null,
        due_date: (form.get("due_date") as string) || null,
        priority: form.get("priority") as string,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      (e.target as HTMLFormElement).reset();
      router.refresh();
    });
  }

  function handleTaskStatus(taskId: string, status: string) {
    startTransition(async () => {
      const result = await updateProjectTask({ id: taskId, status });
      if (!result.success) toast.error(result.message);
      else router.refresh();
    });
  }

  function handleQuickStatus(status: string) {
    startTransition(async () => {
      const result = await updateProjectStatus({ id: project.id, status });
      if (!result.success) toast.error(result.message);
      else {
        toast.success(result.message);
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-lg border border-white/10 bg-brand-surface/40 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-brand-slate">Client</p>
          <p className="mt-1 font-medium text-white">{project.client_name}</p>
          <p className="text-sm text-brand-muted">{project.client_email ?? "—"}</p>
          <p className="text-sm text-brand-muted">{project.client_phone ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-brand-slate">Event</p>
          <p className="text-sm text-brand-muted">{formatDate(project.event_date)}</p>
          <p className="text-sm text-brand-muted">{project.event_location ?? "—"}</p>
          <p className="text-sm text-brand-muted">{project.project_type ?? "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-brand-slate">Finance</p>
          <p className="text-sm text-brand-muted">Budget: {formatCurrency(project.budget)}</p>
          <p className="text-sm text-brand-muted">Actual: {formatCurrency(project.actual_cost)}</p>
          {project.lead_id ? (
            <Link href={`/admin/leads/${project.lead_id}`} className="text-sm text-brand-gold hover:underline">
              View source lead
            </Link>
          ) : null}
        </div>
        {project.description ? (
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="text-xs uppercase tracking-wider text-brand-slate">Description</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-brand-muted">{project.description}</p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {PROJECT_STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            disabled={pending || project.status === s}
            onClick={() => handleQuickStatus(s)}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-brand-muted transition hover:border-brand-gold/50 hover:text-brand-gold disabled:opacity-40"
          >
            {s.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <form onSubmit={handleProjectUpdate} className="space-y-4 rounded-lg border border-white/10 bg-brand-surface/40 p-6">
        <h2 className="font-display text-lg font-semibold text-white">Project settings</h2>
        {error ? (
          <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Status</label>
            <select name="status" defaultValue={project.status} className="field-input">
              {PROJECT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Priority</label>
            <select name="priority" defaultValue={project.priority} className="field-input">
              {LEAD_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Budget (GHS)</label>
            <input name="budget" type="number" step="0.01" defaultValue={project.budget ?? ""} className="field-input" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Actual cost (GHS)</label>
            <input name="actual_cost" type="number" step="0.01" defaultValue={project.actual_cost ?? ""} className="field-input" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-brand-muted">Notes</label>
            <textarea name="notes" rows={3} defaultValue={project.notes ?? ""} className="field-input resize-y" />
          </div>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save project"}
        </Button>
      </form>

      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold text-white">Tasks</h2>

        <form onSubmit={handleAddTask} className="grid gap-3 rounded-lg border border-white/10 bg-brand-surface/40 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <input name="title" required placeholder="Task title" className="field-input lg:col-span-2" />
          <input name="due_date" type="date" className="field-input" />
          <select name="priority" defaultValue="normal" className="field-input">
            {LEAD_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <input name="description" placeholder="Description" className="field-input sm:col-span-2 lg:col-span-3" />
          <Button type="submit" size="sm" disabled={pending}>
            Add task
          </Button>
        </form>

        {tasks.length === 0 ? (
          <p className="text-sm text-brand-slate">No tasks yet.</p>
        ) : (
          <ul className="divide-y divide-white/10 rounded-lg border border-white/10 bg-brand-surface/40">
            {tasks.map((task) => (
              <li key={task.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{task.title}</p>
                  {task.description ? (
                    <p className="text-sm text-brand-slate">{task.description}</p>
                  ) : null}
                  <p className="text-xs text-brand-slate">Due {formatDate(task.due_date)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={task.status} />
                  <select
                    value={task.status}
                    onChange={(e) => handleTaskStatus(task.id, e.target.value)}
                    className="field-input w-auto py-1 text-xs"
                    disabled={pending}
                  >
                    {PROJECT_TASK_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
