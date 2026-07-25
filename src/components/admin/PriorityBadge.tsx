import { PRIORITY_COLORS, PRIORITY_LABELS } from "@/lib/admin/constants";
import type { LeadPriority } from "@/types/admin";
import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: LeadPriority | string;
  className?: string;
}

function isLeadPriority(value: string): value is LeadPriority {
  return value in PRIORITY_COLORS;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const colors = isLeadPriority(priority)
    ? PRIORITY_COLORS[priority]
    : PRIORITY_COLORS.normal;
  const label = isLeadPriority(priority) ? PRIORITY_LABELS[priority] : priority;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {label}
    </span>
  );
}
