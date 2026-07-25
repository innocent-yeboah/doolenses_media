"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/admin/auth";
import { actionError, actionSuccess, type AdminActionResult } from "@/lib/admin/action-result";
import { companySettingsSchema } from "@/lib/admin/validations";
import { createClient } from "@/lib/supabase/server";
import type { CompanySettings } from "@/types/admin";

function normalizeEmail(email: string | null | undefined): string | null {
  if (!email?.trim()) return null;
  return email.trim();
}

export async function getCompanySettings(): Promise<AdminActionResult<CompanySettings>> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("company_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error) return actionError(error.message);
    if (!data) return actionError("Settings not found.");
    return actionSuccess("Settings loaded.", data as CompanySettings);
  } catch {
    return actionError("Unable to load settings.");
  }
}

export async function updateCompanySettings(
  input: unknown
): Promise<AdminActionResult<CompanySettings>> {
  try {
    const { profile } = await requireStaff();
    if (profile.role !== "admin") {
      return actionError("Only administrators can update company settings.");
    }

    const parsed = companySettingsSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid settings.");
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("company_settings")
      .update({
        ...parsed.data,
        email: normalizeEmail(parsed.data.email ?? null),
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/settings");
    return actionSuccess("Settings saved.", data as CompanySettings);
  } catch {
    return actionError("Unable to save settings.");
  }
}
