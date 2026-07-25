import type { ReactNode } from "react";
import { EmptyState } from "@/components/admin/EmptyState";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  columns: DataTableColumn<T>[];
  rows: T[];
  emptyMessage?: string;
  emptyDescription?: string;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "No records yet",
  emptyDescription = "Items will appear here once they are created.",
  className,
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <EmptyState title={emptyMessage} description={emptyDescription} />;
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-white/10 bg-brand-surface/40", className)}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-brand-navy/60">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-brand-slate",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-white/[0.03]">
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.key}`}
                    className={cn("px-4 py-3 text-sm text-brand-muted", column.className)}
                  >
                    {column.render
                      ? column.render(row)
                      : String((row as Record<string, unknown>)[column.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
