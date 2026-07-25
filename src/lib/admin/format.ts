import { format, parseISO } from "date-fns";

const currencyFormatter = new Intl.NumberFormat("en-GH", {
  style: "currency",
  currency: "GHS",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format amounts in Ghana Cedis. */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) {
    return currencyFormatter.format(0);
  }
  return currencyFormatter.format(amount);
}

/** Format ISO date or date-only strings for display. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  try {
    const date = value.includes("T") ? parseISO(value) : parseISO(`${value}T00:00:00`);
    return format(date, "d MMM yyyy");
  } catch {
    return value;
  }
}

/** Format ISO timestamps with time. */
export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  try {
    return format(parseISO(value), "d MMM yyyy, h:mm a");
  } catch {
    return value;
  }
}

/** Build initials from a person's name (max two characters). */
export function initialsFromName(name: string | null | undefined): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}
