import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ label, value, hint, icon, className }: StatCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-white/10 bg-brand-surface/60 p-5 shadow-elevate",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-slate">{label}</p>
        {icon ? <div className="text-brand-gold">{icon}</div> : null}
      </div>
      <p className="mt-3 font-display text-3xl font-bold text-white">{value}</p>
      {hint ? <p className="mt-2 text-xs text-brand-slate">{hint}</p> : null}
    </article>
  );
}
