"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/admin/auth";
import { actionError, actionSuccess, type AdminActionResult } from "@/lib/admin/action-result";
import {
  scheduleFiltersSchema,
  updateProfileRoleSchema,
  upsertScheduleSchema,
} from "@/lib/admin/validations";
import { createClient } from "@/lib/supabase/server";
import type { Profile, TeamSchedule } from "@/types/admin";

export async function listProfiles(): Promise<AdminActionResult<Profile[]>> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name", { ascending: true });

    if (error) return actionError(error.message);
    return actionSuccess("Team loaded.", data as Profile[]);
  } catch {
    return actionError("Unable to load team.");
  }
}

export async function updateProfileRole(
  input: unknown
): Promise<AdminActionResult<Profile>> {
  try {
    const { profile } = await requireStaff();
    if (profile.role !== "admin") {
      return actionError("Only administrators can change roles.");
    }

    const parsed = updateProfileRoleSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid role data.");
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .update({ role: parsed.data.role })
      .eq("id", parsed.data.id)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/team");
    return actionSuccess("Role updated.", data as Profile);
  } catch {
    return actionError("Unable to update role.");
  }
}

export async function listSchedule(
  filters: { startDate?: string; endDate?: string; userId?: string | null } = {}
): Promise<AdminActionResult<TeamSchedule[]>> {
  try {
    await requireStaff();
    const parsed = scheduleFiltersSchema.safeParse(filters);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid filters.");
    }

    const supabase = createClient();
    let query = supabase.from("team_schedule").select("*").order("date", { ascending: true });

    if (parsed.data.startDate) query = query.gte("date", parsed.data.startDate);
    if (parsed.data.endDate) query = query.lte("date", parsed.data.endDate);
    if (parsed.data.userId) query = query.eq("user_id", parsed.data.userId);

    const { data, error } = await query;
    if (error) return actionError(error.message);
    return actionSuccess("Schedule loaded.", data as TeamSchedule[]);
  } catch {
    return actionError("Unable to load schedule.");
  }
}

export async function upsertSchedule(
  input: unknown
): Promise<AdminActionResult<TeamSchedule>> {
  try {
    await requireStaff();
    const parsed = upsertScheduleSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid schedule data.");
    }

    const supabase = createClient();
    const payload = {
      user_id: parsed.data.user_id,
      date: parsed.data.date,
      shift: parsed.data.shift,
      project_id: parsed.data.project_id ?? null,
      notes: parsed.data.notes ?? null,
    };

    if (parsed.data.id) {
      const { data, error } = await supabase
        .from("team_schedule")
        .update(payload)
        .eq("id", parsed.data.id)
        .select("*")
        .single();

      if (error) return actionError(error.message);
      revalidatePath("/admin/team");
      revalidatePath("/admin/calendar");
      return actionSuccess("Schedule updated.", data as TeamSchedule);
    }

    const { data, error } = await supabase
      .from("team_schedule")
      .insert(payload)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/team");
    revalidatePath("/admin/calendar");
    return actionSuccess("Schedule entry added.", data as TeamSchedule);
  } catch {
    return actionError("Unable to save schedule.");
  }
}
