import { requireStaff } from "@/lib/admin/auth";
import { LEAD_STATUSES } from "@/lib/admin/constants";
import { createClient } from "@/lib/supabase/server";
import type { Lead, LeadStatus } from "@/types/admin";
import {
  addDays,
  endOfMonth,
  format,
  startOfMonth,
  subMonths,
} from "date-fns";

export interface DashboardStats {
  leadCountsByStatus: Record<LeadStatus, number>;
  totalLeads: number;
  activeProjects: number;
  monthlyRevenue: number;
  upcomingEvents: number;
  recentLeads: Lead[];
  revenueByMonth: { month: string; revenue: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await requireStaff();
  const supabase = createClient();

  const today = new Date();
  const monthStart = format(startOfMonth(today), "yyyy-MM-dd");
  const monthEnd = format(endOfMonth(today), "yyyy-MM-dd");
  const weekEnd = format(addDays(today, 7), "yyyy-MM-dd");
  const todayStr = format(today, "yyyy-MM-dd");

  const [
    leadsResult,
    projectsResult,
    revenueResult,
    upcomingLeadsResult,
    upcomingProjectsResult,
    revenueHistoryResult,
    recentLeadsResult,
  ] = await Promise.all([
    supabase.from("leads").select("status"),
    supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .neq("status", "completed"),
    supabase
      .from("invoices")
      .select("total_amount")
      .eq("status", "paid")
      .gte("paid_at", `${monthStart}T00:00:00`)
      .lte("paid_at", `${monthEnd}T23:59:59`),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .not("event_date", "is", null)
      .gte("event_date", todayStr)
      .lte("event_date", weekEnd),
    supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .not("event_date", "is", null)
      .gte("event_date", todayStr)
      .lte("event_date", weekEnd),
    supabase
      .from("invoices")
      .select("total_amount, paid_at")
      .eq("status", "paid")
      .gte("paid_at", `${format(subMonths(today, 5), "yyyy-MM")}-01T00:00:00`),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(10),
  ]);

  const leadCountsByStatus = LEAD_STATUSES.reduce(
    (acc, status) => {
      acc[status] = 0;
      return acc;
    },
    {} as Record<LeadStatus, number>
  );

  for (const row of leadsResult.data ?? []) {
    const status = row.status as LeadStatus;
    if (status in leadCountsByStatus) {
      leadCountsByStatus[status] += 1;
    }
  }

  const totalLeads = Object.values(leadCountsByStatus).reduce((a, b) => a + b, 0);
  const monthlyRevenue = (revenueResult.data ?? []).reduce(
    (sum, inv) => sum + Number(inv.total_amount),
    0
  );

  const revenueMap = new Map<string, number>();
  for (let i = 5; i >= 0; i -= 1) {
    const d = subMonths(today, i);
    revenueMap.set(format(d, "MMM yyyy"), 0);
  }
  for (const inv of revenueHistoryResult.data ?? []) {
    if (!inv.paid_at) continue;
    const key = format(new Date(inv.paid_at), "MMM yyyy");
    if (revenueMap.has(key)) {
      revenueMap.set(key, (revenueMap.get(key) ?? 0) + Number(inv.total_amount));
    }
  }

  return {
    leadCountsByStatus,
    totalLeads,
    activeProjects: projectsResult.count ?? 0,
    monthlyRevenue,
    upcomingEvents: (upcomingLeadsResult.count ?? 0) + (upcomingProjectsResult.count ?? 0),
    recentLeads: (recentLeadsResult.data ?? []) as Lead[],
    revenueByMonth: Array.from(revenueMap.entries()).map(([month, revenue]) => ({
      month,
      revenue,
    })),
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "lead" | "project";
  status: string;
}

export async function getCalendarEvents(
  year: number,
  month: number
): Promise<CalendarEvent[]> {
  await requireStaff();
  const supabase = createClient();

  const start = format(new Date(year, month - 1, 1), "yyyy-MM-dd");
  const end = format(new Date(year, month, 0), "yyyy-MM-dd");

  const [leadsResult, projectsResult] = await Promise.all([
    supabase
      .from("leads")
      .select("id, name, event_date, status, event_type")
      .not("event_date", "is", null)
      .gte("event_date", start)
      .lte("event_date", end),
    supabase
      .from("projects")
      .select("id, project_name, event_date, status")
      .not("event_date", "is", null)
      .gte("event_date", start)
      .lte("event_date", end),
  ]);

  const events: CalendarEvent[] = [];

  for (const lead of leadsResult.data ?? []) {
    if (!lead.event_date) continue;
    events.push({
      id: lead.id,
      title: lead.event_type ? `${lead.name} (${lead.event_type})` : lead.name,
      date: lead.event_date,
      type: "lead",
      status: lead.status,
    });
  }

  for (const project of projectsResult.data ?? []) {
    if (!project.event_date) continue;
    events.push({
      id: project.id,
      title: project.project_name,
      date: project.event_date,
      type: "project",
      status: project.status,
    });
  }

  return events.sort((a, b) => a.date.localeCompare(b.date));
}

export interface ReportAggregates {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  leadCount: number;
  projectCount: number;
  invoiceCount: number;
  expenseByCategory: { category: string; amount: number }[];
  leadsByStatus: { status: string; count: number }[];
}

export async function getReportAggregates(): Promise<ReportAggregates> {
  await requireStaff();
  const supabase = createClient();

  const [invoices, expenses, leads, projects] = await Promise.all([
    supabase.from("invoices").select("total_amount, status"),
    supabase.from("expenses").select("amount, category"),
    supabase.from("leads").select("status"),
    supabase.from("projects").select("id", { count: "exact", head: true }),
  ]);

  const totalRevenue = (invoices.data ?? [])
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + Number(i.total_amount), 0);

  const totalExpenses = (expenses.data ?? []).reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const categoryMap = new Map<string, number>();
  for (const exp of expenses.data ?? []) {
    categoryMap.set(
      exp.category,
      (categoryMap.get(exp.category) ?? 0) + Number(exp.amount)
    );
  }

  const statusMap = new Map<string, number>();
  for (const lead of leads.data ?? []) {
    statusMap.set(lead.status, (statusMap.get(lead.status) ?? 0) + 1);
  }

  return {
    totalRevenue,
    totalExpenses,
    netProfit: totalRevenue - totalExpenses,
    leadCount: leads.data?.length ?? 0,
    projectCount: projects.count ?? 0,
    invoiceCount: invoices.data?.length ?? 0,
    expenseByCategory: Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
    })),
    leadsByStatus: Array.from(statusMap.entries()).map(([status, count]) => ({
      status,
      count,
    })),
  };
}
