/** Admin dashboard types aligned with Supabase public schema. */

export type ProfileRole = "admin" | "manager" | "staff" | "technician";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: ProfileRole;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export type LeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "negotiating"
  | "booked"
  | "completed"
  | "lost";

export type LeadPriority = "low" | "normal" | "high" | "urgent";

export interface Lead {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string | null;
  phone: string;
  event_type: string | null;
  event_date: string | null;
  event_location: string | null;
  budget_range: string | null;
  message: string | null;
  source: string | null;
  status: LeadStatus;
  priority: LeadPriority;
  assigned_to: string | null;
  notes: string | null;
  contacted_at: string | null;
  quoted_at: string | null;
  quote_amount: number | null;
  booked_at: string | null;
  completed_at: string | null;
  lost_reason: string | null;
  created_by: string | null;
}

export type ProjectStatus =
  | "planning"
  | "pre_production"
  | "production"
  | "post_production"
  | "delivered"
  | "completed";

export interface Project {
  id: string;
  created_at: string;
  updated_at: string;
  lead_id: string | null;
  client_name: string;
  client_phone: string | null;
  client_email: string | null;
  project_name: string;
  project_type: string | null;
  description: string | null;
  event_date: string | null;
  event_location: string | null;
  status: ProjectStatus;
  priority: LeadPriority;
  start_date: string | null;
  estimated_completion: string | null;
  actual_completion: string | null;
  budget: number | null;
  actual_cost: number | null;
  assigned_team: string[];
  notes: string | null;
  completed_at: string | null;
  created_by: string | null;
}

export type ProjectTaskStatus = "pending" | "in_progress" | "completed" | "blocked";

export interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  assigned_to: string | null;
  status: ProjectTaskStatus;
  priority: LeadPriority;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
}

export type EquipmentCategory =
  | "camera"
  | "audio"
  | "lighting"
  | "grip"
  | "editing"
  | "studio"
  | "other";

export type EquipmentCondition = "excellent" | "good" | "fair" | "needs_repair";

export interface Equipment {
  id: string;
  created_at: string;
  updated_at: string;
  item_name: string;
  category: EquipmentCategory;
  description: string | null;
  quantity: number;
  available: number;
  condition: EquipmentCondition;
  location: string | null;
  notes: string | null;
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export type PaymentMethod = "cash" | "mobile_money" | "bank_transfer" | "card" | "cheque";

export interface Invoice {
  id: string;
  created_at: string;
  updated_at: string;
  invoice_number: string;
  project_id: string | null;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  amount: number;
  tax: number;
  total_amount: number;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  paid_at: string | null;
  payment_method: PaymentMethod | null;
  notes: string | null;
  created_by: string | null;
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export type ExpenseCategory =
  | "equipment"
  | "supplies"
  | "transport"
  | "salaries"
  | "utilities"
  | "rent"
  | "marketing"
  | "other";

export interface Expense {
  id: string;
  created_at: string;
  expense_date: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  vendor: string | null;
  receipt_url: string | null;
  project_id: string | null;
  approved_by: string | null;
  notes: string | null;
  created_by: string | null;
}

export type ShiftType = "morning" | "afternoon" | "evening" | "full_day";

export interface TeamSchedule {
  id: string;
  created_at: string;
  user_id: string;
  date: string;
  shift: ShiftType;
  project_id: string | null;
  notes: string | null;
}

export type NotificationType =
  | "lead"
  | "project"
  | "invoice"
  | "equipment"
  | "task"
  | "system";

export interface Notification {
  id: string;
  created_at: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  link: string | null;
  read: boolean;
  read_at: string | null;
}

export interface CompanySettings {
  id: number;
  company_name: string;
  legal_name: string | null;
  email: string | null;
  phone: string | null;
  office_phone: string | null;
  address: string | null;
  tagline: string | null;
  updated_at: string;
}

export interface StaffSession {
  user: {
    id: string;
    email?: string;
  };
  profile: Profile;
}
