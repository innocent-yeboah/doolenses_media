import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-white/15 bg-brand-surface/30 px-6 py-16 text-center",
        className
      )}
    >
      {icon ? <div className="mb-4 text-brand-gold/80">{icon}</div> : null}
      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-brand-slate">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
