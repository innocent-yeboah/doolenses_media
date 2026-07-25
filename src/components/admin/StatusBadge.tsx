import { getStatusBadgeColors, getStatusLabel } from "@/lib/admin/constants";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const colors = getStatusBadgeColors(status);
  const displayLabel = label ?? getStatusLabel(status);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      {displayLabel}
    </span>
  );
}
