"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/admin/auth";
import { actionError, actionSuccess, type AdminActionResult } from "@/lib/admin/action-result";
import {
  createInvoiceSchema,
  markInvoicePaidSchema,
  updateInvoiceSchema,
} from "@/lib/admin/validations";
import { createClient } from "@/lib/supabase/server";
import type { Invoice, InvoiceItem } from "@/types/admin";

function normalizeEmail(email: string | null | undefined): string | null {
  if (!email?.trim()) return null;
  return email.trim();
}

async function generateInvoiceNumber(supabase: ReturnType<typeof createClient>): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `DL-${year}-`;

  const { data } = await supabase
    .from("invoices")
    .select("invoice_number")
    .like("invoice_number", `${prefix}%`)
    .order("invoice_number", { ascending: false })
    .limit(1);

  let nextNum = 1;
  const latest = data?.[0]?.invoice_number;
  if (latest) {
    const match = latest.match(/DL-\d{4}-(\d+)/);
    if (match?.[1]) nextNum = parseInt(match[1], 10) + 1;
  }

  return `${prefix}${String(nextNum).padStart(4, "0")}`;
}

export async function listInvoices(): Promise<AdminActionResult<Invoice[]>> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return actionError(error.message);
    return actionSuccess("Invoices loaded.", data as Invoice[]);
  } catch {
    return actionError("Unable to load invoices.");
  }
}

export async function getInvoice(id: string): Promise<AdminActionResult<Invoice>> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { data, error } = await supabase.from("invoices").select("*").eq("id", id).maybeSingle();
    if (error) return actionError(error.message);
    if (!data) return actionError("Invoice not found.");
    return actionSuccess("Invoice loaded.", data as Invoice);
  } catch {
    return actionError("Unable to load invoice.");
  }
}

export async function createInvoice(
  input: unknown
): Promise<AdminActionResult<Invoice>> {
  try {
    const { user } = await requireStaff();
    const parsed = createInvoiceSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid invoice data.");
    }

    const supabase = createClient();
    const invoiceNumber = await generateInvoiceNumber(supabase);

    let amount = parsed.data.amount ?? 0;
    const tax = parsed.data.tax ?? 0;

    if (parsed.data.items?.length) {
      amount = parsed.data.items.reduce(
        (sum, item) => sum + item.quantity * item.unit_price,
        0
      );
    }

    const totalAmount = amount + tax;

    const { data: invoice, error } = await supabase
      .from("invoices")
      .insert({
        invoice_number: invoiceNumber,
        project_id: parsed.data.project_id ?? null,
        client_name: parsed.data.client_name,
        client_email: normalizeEmail(parsed.data.client_email ?? null),
        client_phone: parsed.data.client_phone ?? null,
        amount,
        tax,
        total_amount: totalAmount,
        status: parsed.data.status ?? "draft",
        issue_date: parsed.data.issue_date ?? new Date().toISOString().slice(0, 10),
        due_date: parsed.data.due_date,
        notes: parsed.data.notes ?? null,
        created_by: user.id,
      })
      .select("*")
      .single();

    if (error) return actionError(error.message);

    if (parsed.data.items?.length) {
      const items = parsed.data.items.map((item) => ({
        invoice_id: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total: item.quantity * item.unit_price,
      }));

      const { error: itemsError } = await supabase.from("invoice_items").insert(items);
      if (itemsError) return actionError(itemsError.message);
    }

    revalidatePath("/admin/invoices");
    revalidatePath("/admin/reports");
    return actionSuccess("Invoice created.", invoice as Invoice);
  } catch {
    return actionError("Unable to create invoice.");
  }
}

export async function updateInvoice(
  input: unknown
): Promise<AdminActionResult<Invoice>> {
  try {
    await requireStaff();
    const parsed = updateInvoiceSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid invoice data.");
    }

    const { id, items, ...fields } = parsed.data;
    void items;
    const supabase = createClient();

    const patch: Record<string, unknown> = {
      ...fields,
      client_email:
        fields.client_email !== undefined
          ? normalizeEmail(fields.client_email ?? null)
          : undefined,
    };

    if (fields.amount !== undefined || fields.tax !== undefined) {
      const { data: existing } = await supabase
        .from("invoices")
        .select("amount, tax")
        .eq("id", id)
        .maybeSingle();

      const amount = fields.amount ?? existing?.amount ?? 0;
      const tax = fields.tax ?? existing?.tax ?? 0;
      patch.total_amount = Number(amount) + Number(tax);
    }

    const { data, error } = await supabase
      .from("invoices")
      .update(patch)
      .eq("id", id)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/invoices");
    revalidatePath("/admin/reports");
    return actionSuccess("Invoice updated.", data as Invoice);
  } catch {
    return actionError("Unable to update invoice.");
  }
}

export async function markInvoicePaid(
  input: unknown
): Promise<AdminActionResult<Invoice>> {
  try {
    await requireStaff();
    const parsed = markInvoicePaidSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid payment data.");
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("invoices")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        payment_method: parsed.data.payment_method,
      })
      .eq("id", parsed.data.id)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/invoices");
    revalidatePath("/admin/reports");
    return actionSuccess("Invoice marked as paid.", data as Invoice);
  } catch {
    return actionError("Unable to mark invoice paid.");
  }
}

export async function listInvoiceItems(
  invoiceId: string
): Promise<AdminActionResult<InvoiceItem[]>> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("invoice_items")
      .select("*")
      .eq("invoice_id", invoiceId);

    if (error) return actionError(error.message);
    return actionSuccess("Items loaded.", data as InvoiceItem[]);
  } catch {
    return actionError("Unable to load invoice items.");
  }
}
