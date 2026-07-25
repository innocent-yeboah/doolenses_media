"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/admin/auth";
import { actionError, actionSuccess, type AdminActionResult } from "@/lib/admin/action-result";
import {
  createLeadSchema,
  leadFiltersSchema,
  updateLeadSchema,
} from "@/lib/admin/validations";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/types/admin";

export type LeadFilters = {
  status?: string;
  priority?: string;
  source?: string;
  search?: string;
  assignedTo?: string | null;
  limit?: number;
};

function normalizeEmail(email: string | null | undefined): string | null {
  if (!email?.trim()) return null;
  return email.trim();
}

function applyLeadStatusTimestamps(
  status: string | undefined,
  existing: Lead
): Partial<Lead> {
  const now = new Date().toISOString();
  const patch: Partial<Lead> = {};
  if (!status || status === existing.status) return patch;

  if (status === "contacted" && !existing.contacted_at) patch.contacted_at = now;
  if (status === "quoted" && !existing.quoted_at) patch.quoted_at = now;
  if (status === "booked" && !existing.booked_at) patch.booked_at = now;
  if (status === "completed" && !existing.completed_at) patch.completed_at = now;
  return patch;
}

export async function listLeads(
  filters: LeadFilters = {}
): Promise<AdminActionResult<Lead[]>> {
  try {
    await requireStaff();
    const parsed = leadFiltersSchema.safeParse(filters);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid filters.");
    }

    const supabase = createClient();
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

    const { status, priority, source, search, assignedTo, limit } = parsed.data;
    if (status) query = query.eq("status", status);
    if (priority) query = query.eq("priority", priority);
    if (source) query = query.eq("source", source);
    if (assignedTo) query = query.eq("assigned_to", assignedTo);
    if (search?.trim()) {
      const term = `%${search.trim()}%`;
      query = query.or(`name.ilike.${term},email.ilike.${term},phone.ilike.${term}`);
    }
    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error) return actionError(error.message);

    return actionSuccess("Leads loaded.", data as Lead[]);
  } catch {
    return actionError("Unable to load leads.");
  }
}

export async function getLead(id: string): Promise<AdminActionResult<Lead>> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { data, error } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();
    if (error) return actionError(error.message);
    if (!data) return actionError("Lead not found.");
    return actionSuccess("Lead loaded.", data as Lead);
  } catch {
    return actionError("Unable to load lead.");
  }
}

export async function createLead(
  input: unknown
): Promise<AdminActionResult<Lead>> {
  try {
    const { user } = await requireStaff();
    const parsed = createLeadSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid lead data.");
    }

    const supabase = createClient();
    const payload = {
      ...parsed.data,
      email: normalizeEmail(parsed.data.email ?? null),
      status: parsed.data.status ?? "new",
      priority: parsed.data.priority ?? "normal",
      created_by: user.id,
    };

    const { data, error } = await supabase.from("leads").insert(payload).select("*").single();
    if (error) return actionError(error.message);

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    revalidatePath("/admin/calendar");
    return actionSuccess("Lead created.", data as Lead);
  } catch {
    return actionError("Unable to create lead.");
  }
}

export async function updateLead(
  input: unknown
): Promise<AdminActionResult<Lead>> {
  try {
    await requireStaff();
    const parsed = updateLeadSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid lead data.");
    }

    const { id, ...fields } = parsed.data;
    const supabase = createClient();

    const { data: existing, error: fetchError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) return actionError(fetchError.message);
    if (!existing) return actionError("Lead not found.");

    const statusPatch = applyLeadStatusTimestamps(fields.status, existing as Lead);
    const payload = {
      ...fields,
      ...statusPatch,
      email: fields.email !== undefined ? normalizeEmail(fields.email ?? null) : undefined,
    };

    const { data, error } = await supabase
      .from("leads")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads/${id}`);
    revalidatePath("/admin/calendar");
    return actionSuccess("Lead updated.", data as Lead);
  } catch {
    return actionError("Unable to update lead.");
  }
}

export async function deleteLead(id: string): Promise<AdminActionResult> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) return actionError(error.message);

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    return actionSuccess("Lead deleted.");
  } catch {
    return actionError("Unable to delete lead.");
  }
}

export async function convertLeadToProject(
  leadId: string
): Promise<AdminActionResult<{ projectId: string }>> {
  try {
    const { user } = await requireStaff();
    const supabase = createClient();

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .maybeSingle();

    if (leadError) return actionError(leadError.message);
    if (!lead) return actionError("Lead not found.");

    const projectName = lead.event_type
      ? `${lead.name} — ${lead.event_type}`
      : `${lead.name} Production`;

    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        lead_id: lead.id,
        client_name: lead.name,
        client_phone: lead.phone,
        client_email: lead.email,
        project_name: projectName,
        project_type: lead.event_type,
        description: lead.message,
        event_date: lead.event_date,
        event_location: lead.event_location,
        budget: lead.quote_amount,
        status: "planning",
        priority: lead.priority,
        notes: lead.notes,
        created_by: user.id,
      })
      .select("id")
      .single();

    if (projectError) return actionError(projectError.message);

    const now = new Date().toISOString();
    const { error: updateError } = await supabase
      .from("leads")
      .update({ status: "booked", booked_at: lead.booked_at ?? now })
      .eq("id", leadId);

    if (updateError) return actionError(updateError.message);

    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    revalidatePath(`/admin/leads/${leadId}`);
    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${project.id}`);
    return actionSuccess("Lead converted to project.", { projectId: project.id });
  } catch {
    return actionError("Unable to convert lead.");
  }
}
