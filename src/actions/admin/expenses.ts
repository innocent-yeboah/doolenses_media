"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/admin/auth";
import { actionError, actionSuccess, type AdminActionResult } from "@/lib/admin/action-result";
import { createExpenseSchema, updateExpenseSchema } from "@/lib/admin/validations";
import { createClient } from "@/lib/supabase/server";
import type { Expense } from "@/types/admin";

export async function listExpenses(): Promise<AdminActionResult<Expense[]>> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("expense_date", { ascending: false });

    if (error) return actionError(error.message);
    return actionSuccess("Expenses loaded.", data as Expense[]);
  } catch {
    return actionError("Unable to load expenses.");
  }
}

export async function createExpense(
  input: unknown
): Promise<AdminActionResult<Expense>> {
  try {
    const { user } = await requireStaff();
    const parsed = createExpenseSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid expense data.");
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("expenses")
      .insert({
        ...parsed.data,
        expense_date: parsed.data.expense_date ?? new Date().toISOString().slice(0, 10),
        category: parsed.data.category ?? "other",
        created_by: user.id,
      })
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/expenses");
    revalidatePath("/admin/reports");
    return actionSuccess("Expense recorded.", data as Expense);
  } catch {
    return actionError("Unable to create expense.");
  }
}

export async function updateExpense(
  input: unknown
): Promise<AdminActionResult<Expense>> {
  try {
    await requireStaff();
    const parsed = updateExpenseSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid expense data.");
    }

    const { id, ...fields } = parsed.data;
    const supabase = createClient();
    const { data, error } = await supabase
      .from("expenses")
      .update(fields)
      .eq("id", id)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/expenses");
    revalidatePath("/admin/reports");
    return actionSuccess("Expense updated.", data as Expense);
  } catch {
    return actionError("Unable to update expense.");
  }
}

export async function deleteExpense(id: string): Promise<AdminActionResult> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { error } = await supabase.from("expenses").delete().eq("id", id);
    if (error) return actionError(error.message);

    revalidatePath("/admin/expenses");
    revalidatePath("/admin/reports");
    return actionSuccess("Expense deleted.");
  } catch {
    return actionError("Unable to delete expense.");
  }
}
