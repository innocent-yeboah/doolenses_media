"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/admin/auth";
import { actionError, actionSuccess, type AdminActionResult } from "@/lib/admin/action-result";
import {
  assignEquipmentSchema,
  createEquipmentSchema,
  updateEquipmentSchema,
} from "@/lib/admin/validations";
import { createClient } from "@/lib/supabase/server";
import type { Equipment } from "@/types/admin";

export interface EquipmentAssignmentRow {
  id: string;
  equipment_id: string;
  project_id: string;
  assigned_by: string | null;
  assigned_at: string;
  returned_at: string | null;
  notes: string | null;
}

export async function listEquipment(): Promise<AdminActionResult<Equipment[]>> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("equipment")
      .select("*")
      .order("item_name", { ascending: true });

    if (error) return actionError(error.message);
    return actionSuccess("Equipment loaded.", data as Equipment[]);
  } catch {
    return actionError("Unable to load equipment.");
  }
}

export async function createEquipment(
  input: unknown
): Promise<AdminActionResult<Equipment>> {
  try {
    await requireStaff();
    const parsed = createEquipmentSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid equipment data.");
    }

    const quantity = parsed.data.quantity ?? 1;
    const available = parsed.data.available ?? quantity;

    const supabase = createClient();
    const { data, error } = await supabase
      .from("equipment")
      .insert({
        ...parsed.data,
        quantity,
        available,
        category: parsed.data.category ?? "other",
        condition: parsed.data.condition ?? "good",
      })
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/equipment");
    return actionSuccess("Equipment added.", data as Equipment);
  } catch {
    return actionError("Unable to add equipment.");
  }
}

export async function updateEquipment(
  input: unknown
): Promise<AdminActionResult<Equipment>> {
  try {
    await requireStaff();
    const parsed = updateEquipmentSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid equipment data.");
    }

    const { id, ...fields } = parsed.data;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("equipment")
      .update(fields)
      .eq("id", id)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/equipment");
    return actionSuccess("Equipment updated.", data as Equipment);
  } catch {
    return actionError("Unable to update equipment.");
  }
}

export async function assignEquipment(
  input: unknown
): Promise<AdminActionResult<EquipmentAssignmentRow>> {
  try {
    const { user } = await requireStaff();
    const parsed = assignEquipmentSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid assignment.");
    }

    const supabase = createClient();

    const { data: equipment, error: equipError } = await supabase
      .from("equipment")
      .select("*")
      .eq("id", parsed.data.equipment_id)
      .maybeSingle();

    if (equipError) return actionError(equipError.message);
    if (!equipment) return actionError("Equipment not found.");
    if (equipment.available < 1) {
      return actionError("No units available for this item.");
    }

    const { data: assignment, error: assignError } = await supabase
      .from("equipment_assignments")
      .insert({
        equipment_id: parsed.data.equipment_id,
        project_id: parsed.data.project_id,
        assigned_by: user.id,
        notes: parsed.data.notes ?? null,
      })
      .select("*")
      .single();

    if (assignError) return actionError(assignError.message);

    const { error: updateError } = await supabase
      .from("equipment")
      .update({ available: equipment.available - 1 })
      .eq("id", parsed.data.equipment_id);

    if (updateError) return actionError(updateError.message);

    revalidatePath("/admin/equipment");
    revalidatePath(`/admin/projects/${parsed.data.project_id}`);
    return actionSuccess("Equipment assigned.", assignment as EquipmentAssignmentRow);
  } catch {
    return actionError("Unable to assign equipment.");
  }
}
