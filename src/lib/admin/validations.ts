import { z } from "zod";
import {
  EQUIPMENT_CATEGORIES,
  EXPENSE_CATEGORIES,
  INVOICE_STATUSES,
  LEAD_PRIORITIES,
  LEAD_STATUSES,
  PROJECT_STATUSES,
  PROJECT_TASK_STATUSES,
  SHIFT_OPTIONS,
} from "@/lib/admin/constants";

const optionalUuid = z.string().uuid().optional().nullable();
const optionalDate = z.string().optional().nullable();
const optionalEmail = z.union([z.string().email(), z.literal(""), z.null()]).optional();
const optionalNumber = z.coerce.number().optional().nullable();

export const leadFiltersSchema = z.object({
  status: z.enum(LEAD_STATUSES as unknown as [string, ...string[]]).optional(),
  priority: z.enum(LEAD_PRIORITIES as unknown as [string, ...string[]]).optional(),
  source: z.string().optional(),
  search: z.string().optional(),
  assignedTo: optionalUuid,
  limit: z.coerce.number().int().min(1).max(500).optional(),
});

export const createLeadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: optionalEmail,
  phone: z.string().min(6, "Phone is required"),
  event_type: z.string().optional().nullable(),
  event_date: optionalDate,
  event_location: z.string().optional().nullable(),
  budget_range: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  status: z.enum(LEAD_STATUSES as unknown as [string, ...string[]]).optional(),
  priority: z.enum(LEAD_PRIORITIES as unknown as [string, ...string[]]).optional(),
  assigned_to: optionalUuid,
  notes: z.string().optional().nullable(),
  quote_amount: optionalNumber,
});

export const updateLeadSchema = createLeadSchema.partial().extend({
  id: z.string().uuid(),
  lost_reason: z.string().optional().nullable(),
});

export const createProjectSchema = z.object({
  lead_id: optionalUuid,
  client_name: z.string().min(2),
  client_phone: z.string().optional().nullable(),
  client_email: optionalEmail,
  project_name: z.string().min(2),
  project_type: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  event_date: optionalDate,
  event_location: z.string().optional().nullable(),
  status: z.enum(PROJECT_STATUSES as unknown as [string, ...string[]]).optional(),
  priority: z.enum(LEAD_PRIORITIES as unknown as [string, ...string[]]).optional(),
  start_date: optionalDate,
  estimated_completion: optionalDate,
  budget: optionalNumber,
  notes: z.string().optional().nullable(),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string().uuid(),
  actual_cost: optionalNumber,
  actual_completion: optionalDate,
});

export const projectStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(PROJECT_STATUSES as unknown as [string, ...string[]]),
});

export const createProjectTaskSchema = z.object({
  project_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  assigned_to: optionalUuid,
  status: z.enum(PROJECT_TASK_STATUSES as unknown as [string, ...string[]]).optional(),
  priority: z.enum(LEAD_PRIORITIES as unknown as [string, ...string[]]).optional(),
  due_date: optionalDate,
});

export const updateProjectTaskSchema = createProjectTaskSchema.partial().extend({
  id: z.string().uuid(),
});

export const createEquipmentSchema = z.object({
  item_name: z.string().min(1),
  category: z.enum(EQUIPMENT_CATEGORIES as unknown as [string, ...string[]]).optional(),
  description: z.string().optional().nullable(),
  quantity: z.coerce.number().int().min(1).optional(),
  available: z.coerce.number().int().min(0).optional(),
  condition: z.enum(["excellent", "good", "fair", "needs_repair"]).optional(),
  location: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const updateEquipmentSchema = createEquipmentSchema.partial().extend({
  id: z.string().uuid(),
});

export const assignEquipmentSchema = z.object({
  equipment_id: z.string().uuid(),
  project_id: z.string().uuid(),
  notes: z.string().optional().nullable(),
});

export const invoiceItemSchema = z.object({
  description: z.string().min(1),
  quantity: z.coerce.number().int().min(1),
  unit_price: z.coerce.number().min(0),
});

export const createInvoiceSchema = z.object({
  project_id: optionalUuid,
  client_name: z.string().min(2),
  client_email: optionalEmail,
  client_phone: z.string().optional().nullable(),
  amount: z.coerce.number().min(0).optional(),
  tax: z.coerce.number().min(0).optional(),
  status: z.enum(INVOICE_STATUSES as unknown as [string, ...string[]]).optional(),
  issue_date: optionalDate,
  due_date: z.string().min(1, "Due date is required"),
  notes: z.string().optional().nullable(),
  items: z.array(invoiceItemSchema).optional(),
});

export const updateInvoiceSchema = createInvoiceSchema.partial().extend({
  id: z.string().uuid(),
});

export const markInvoicePaidSchema = z.object({
  id: z.string().uuid(),
  payment_method: z.enum(["cash", "mobile_money", "bank_transfer", "card", "cheque"]),
});

export const createExpenseSchema = z.object({
  expense_date: optionalDate,
  category: z.enum(EXPENSE_CATEGORIES as unknown as [string, ...string[]]).optional(),
  description: z.string().min(1),
  amount: z.coerce.number().min(0.01),
  vendor: z.string().optional().nullable(),
  receipt_url: z.string().optional().nullable(),
  project_id: optionalUuid,
  notes: z.string().optional().nullable(),
});

export const updateExpenseSchema = createExpenseSchema.partial().extend({
  id: z.string().uuid(),
});

export const updateProfileRoleSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(["admin", "manager", "staff", "technician"]),
});

export const scheduleFiltersSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  userId: optionalUuid,
});

export const upsertScheduleSchema = z.object({
  id: optionalUuid,
  user_id: z.string().uuid(),
  date: z.string().min(1),
  shift: z.enum(SHIFT_OPTIONS.map((s) => s.value) as [string, ...string[]]),
  project_id: optionalUuid,
  notes: z.string().optional().nullable(),
});

export const companySettingsSchema = z.object({
  company_name: z.string().min(1),
  legal_name: z.string().optional().nullable(),
  email: optionalEmail,
  phone: z.string().optional().nullable(),
  office_phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
});
