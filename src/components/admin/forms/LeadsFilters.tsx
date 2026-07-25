"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { LEAD_STATUSES, SOURCE_OPTIONS } from "@/lib/admin/constants";

export function LeadsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      startTransition(() => {
        router.push(`/admin/leads?${params.toString()}`);
      });
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-3">
      <input
        type="search"
        placeholder="Search name, email, phone…"
        defaultValue={searchParams.get("search") ?? ""}
        className="field-input min-w-[200px] flex-1"
        onChange={(e) => update("search", e.target.value)}
        disabled={pending}
      />
      <select
        className="field-input w-auto"
        defaultValue={searchParams.get("status") ?? ""}
        onChange={(e) => update("status", e.target.value)}
        disabled={pending}
      >
        <option value="">All statuses</option>
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.replace(/_/g, " ")}
          </option>
        ))}
      </select>
      <select
        className="field-input w-auto"
        defaultValue={searchParams.get("source") ?? ""}
        onChange={(e) => update("source", e.target.value)}
        disabled={pending}
      >
        <option value="">All sources</option>
        {SOURCE_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
