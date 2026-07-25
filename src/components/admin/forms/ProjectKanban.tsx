"use client";

import Link from "next/link";
import { PROJECT_STATUS_LABELS } from "@/lib/admin/constants";
import { formatDate } from "@/lib/admin/format";
import type { Project, ProjectStatus } from "@/types/admin";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface ProjectKanbanProps {
  projects: Project[];
}

export function ProjectKanban({ projects }: ProjectKanbanProps) {
  const columns: ProjectStatus[] = [
    "planning",
    "pre_production",
    "production",
    "post_production",
    "delivered",
    "completed",
  ];

  return (
    <div className="grid gap-4 overflow-x-auto lg:grid-cols-3 xl:grid-cols-6">
      {columns.map((status) => {
        const columnProjects = projects.filter((p) => p.status === status);
        return (
          <div
            key={status}
            className="min-w-[220px] rounded-lg border border-white/10 bg-brand-surface/30 p-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-slate">
                {PROJECT_STATUS_LABELS[status]}
              </h3>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-brand-muted">
                {columnProjects.length}
              </span>
            </div>
            <ul className="space-y-2">
              {columnProjects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="block rounded-md border border-white/10 bg-brand-navy/40 p-3 transition hover:border-brand-gold/30"
                  >
                    <p className="font-medium text-white">{project.project_name}</p>
                    <p className="mt-1 text-xs text-brand-slate">{project.client_name}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <StatusBadge status={project.status} />
                      <span className="text-[11px] text-brand-slate">
                        {formatDate(project.event_date)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
              {columnProjects.length === 0 ? (
                <li className="py-4 text-center text-xs text-brand-slate">Empty</li>
              ) : null}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
