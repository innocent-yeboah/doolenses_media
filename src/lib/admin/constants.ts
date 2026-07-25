import type {
  EquipmentCategory,
  ExpenseCategory,
  InvoiceStatus,
  LeadPriority,
  LeadStatus,
  ProfileRole,
  ProjectStatus,
  ProjectTaskStatus,
  ShiftType,
} from "@/types/admin";

export const LEAD_STATUSES: readonly LeadStatus[] = [
  "new",
  "contacted",
  "quoted",
  "negotiating",
  "booked",
  "completed",
  "lost",
] as const;

export const LEAD_PRIORITIES: readonly LeadPriority[] = [
  "low",
  "normal",
  "high",
  "urgent",
] as const;

export const PROJECT_STATUSES: readonly ProjectStatus[] = [
  "planning",
  "pre_production",
  "production",
  "post_production",
  "delivered",
  "completed",
] as const;

export const PROJECT_TASK_STATUSES: readonly ProjectTaskStatus[] = [
  "pending",
  "in_progress",
  "completed",
  "blocked",
] as const;

export const EQUIPMENT_CATEGORIES: readonly EquipmentCategory[] = [
  "camera",
  "audio",
  "lighting",
  "grip",
  "editing",
  "studio",
  "other",
] as const;

export const INVOICE_STATUSES: readonly InvoiceStatus[] = [
  "draft",
  "sent",
  "paid",
  "overdue",
  "cancelled",
] as const;

export const EXPENSE_CATEGORIES: readonly ExpenseCategory[] = [
  "equipment",
  "supplies",
  "transport",
  "salaries",
  "utilities",
  "rent",
  "marketing",
  "other",
] as const;

export const EVENT_TYPES = [
  "Weddings",
  "Funerals",
  "Webinars",
  "Conferences",
  "Musical Concerts",
  "Crusades",
  "Election Campaigns",
  "Educational Programs",
  "Award Ceremonies",
  "Other",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const SOURCE_OPTIONS = [
  { value: "website", label: "Website" },
  { value: "contact", label: "Contact form" },
  { value: "quote", label: "Quote request" },
  { value: "newsletter", label: "Newsletter" },
  { value: "portfolio_inquire", label: "Portfolio inquiry" },
  { value: "consultation", label: "Consultation" },
  { value: "referral", label: "Referral" },
  { value: "phone", label: "Phone call" },
  { value: "social", label: "Social media" },
  { value: "other", label: "Other" },
] as const;

export const SHIFT_OPTIONS: readonly { value: ShiftType; label: string }[] = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "full_day", label: "Full day" },
] as const;

export const ROLE_OPTIONS: readonly { value: ProfileRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "staff", label: "Staff" },
  { value: "technician", label: "Technician" },
] as const;

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  negotiating: "Negotiating",
  booked: "Booked",
  completed: "Completed",
  lost: "Lost",
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: "Planning",
  pre_production: "Pre-production",
  production: "Production",
  post_production: "Post-production",
  delivered: "Delivered",
  completed: "Completed",
};

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  overdue: "Overdue",
  cancelled: "Cancelled",
};

export const PRIORITY_LABELS: Record<LeadPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

type BadgeColors = {
  bg: string;
  text: string;
  border: string;
};

export const LEAD_STATUS_COLORS: Record<LeadStatus, BadgeColors> = {
  new: {
    bg: "bg-sky-500/15",
    text: "text-sky-300",
    border: "border-sky-500/30",
  },
  contacted: {
    bg: "bg-indigo-500/15",
    text: "text-indigo-300",
    border: "border-indigo-500/30",
  },
  quoted: {
    bg: "bg-violet-500/15",
    text: "text-violet-300",
    border: "border-violet-500/30",
  },
  negotiating: {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
  },
  booked: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
  },
  completed: {
    bg: "bg-brand-gold/15",
    text: "text-brand-gold",
    border: "border-brand-gold/40",
  },
  lost: {
    bg: "bg-red-500/15",
    text: "text-red-300",
    border: "border-red-500/30",
  },
};

export const PROJECT_STATUS_COLORS: Record<ProjectStatus, BadgeColors> = {
  planning: {
    bg: "bg-sky-500/15",
    text: "text-sky-300",
    border: "border-sky-500/30",
  },
  pre_production: {
    bg: "bg-indigo-500/15",
    text: "text-indigo-300",
    border: "border-indigo-500/30",
  },
  production: {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
  },
  post_production: {
    bg: "bg-violet-500/15",
    text: "text-violet-300",
    border: "border-violet-500/30",
  },
  delivered: {
    bg: "bg-teal-500/15",
    text: "text-teal-300",
    border: "border-teal-500/30",
  },
  completed: {
    bg: "bg-brand-gold/15",
    text: "text-brand-gold",
    border: "border-brand-gold/40",
  },
};

export const INVOICE_STATUS_COLORS: Record<InvoiceStatus, BadgeColors> = {
  draft: {
    bg: "bg-brand-slate/15",
    text: "text-brand-slate",
    border: "border-brand-slate/30",
  },
  sent: {
    bg: "bg-sky-500/15",
    text: "text-sky-300",
    border: "border-sky-500/30",
  },
  paid: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
  },
  overdue: {
    bg: "bg-red-500/15",
    text: "text-red-300",
    border: "border-red-500/30",
  },
  cancelled: {
    bg: "bg-neutral-500/15",
    text: "text-neutral-400",
    border: "border-neutral-500/30",
  },
};

export const TASK_STATUS_COLORS: Record<ProjectTaskStatus, BadgeColors> = {
  pending: {
    bg: "bg-brand-slate/15",
    text: "text-brand-slate",
    border: "border-brand-slate/30",
  },
  in_progress: {
    bg: "bg-sky-500/15",
    text: "text-sky-300",
    border: "border-sky-500/30",
  },
  completed: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
  },
  blocked: {
    bg: "bg-red-500/15",
    text: "text-red-300",
    border: "border-red-500/30",
  },
};

export const PRIORITY_COLORS: Record<LeadPriority, BadgeColors> = {
  low: {
    bg: "bg-brand-slate/15",
    text: "text-brand-slate",
    border: "border-brand-slate/30",
  },
  normal: {
    bg: "bg-sky-500/15",
    text: "text-sky-300",
    border: "border-sky-500/30",
  },
  high: {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
  },
  urgent: {
    bg: "bg-red-500/15",
    text: "text-red-300",
    border: "border-red-500/30",
  },
};

export const EQUIPMENT_CATEGORY_LABELS: Record<EquipmentCategory, string> = {
  camera: "Camera",
  audio: "Audio",
  lighting: "Lighting",
  grip: "Grip",
  editing: "Editing",
  studio: "Studio",
  other: "Other",
};

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  equipment: "Equipment",
  supplies: "Supplies",
  transport: "Transport",
  salaries: "Salaries",
  utilities: "Utilities",
  rent: "Rent",
  marketing: "Marketing",
  other: "Other",
};

/** Resolve badge colors for any known status string. */
export function getStatusBadgeColors(status: string): BadgeColors {
  if (status in LEAD_STATUS_COLORS) {
    return LEAD_STATUS_COLORS[status as LeadStatus];
  }
  if (status in PROJECT_STATUS_COLORS) {
    return PROJECT_STATUS_COLORS[status as ProjectStatus];
  }
  if (status in INVOICE_STATUS_COLORS) {
    return INVOICE_STATUS_COLORS[status as InvoiceStatus];
  }
  if (status in TASK_STATUS_COLORS) {
    return TASK_STATUS_COLORS[status as ProjectTaskStatus];
  }
  return {
    bg: "bg-brand-surface",
    text: "text-brand-muted",
    border: "border-white/10",
  };
}

/** Human-readable label for status strings. */
export function getStatusLabel(status: string): string {
  if (status in LEAD_STATUS_LABELS) {
    return LEAD_STATUS_LABELS[status as LeadStatus];
  }
  if (status in PROJECT_STATUS_LABELS) {
    return PROJECT_STATUS_LABELS[status as ProjectStatus];
  }
  if (status in INVOICE_STATUS_LABELS) {
    return INVOICE_STATUS_LABELS[status as InvoiceStatus];
  }
  return status.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
