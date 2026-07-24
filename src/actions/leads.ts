"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendLeadConfirmation, sendLeadNotification } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  contactFormSchema,
  newsletterSchema,
  portfolioInquireSchema,
  quoteFormSchema,
  type ContactFormValues,
  type NewsletterFormValues,
  type PortfolioInquireValues,
  type QuoteFormValues,
} from "@/lib/validations";

export type ActionResult = {
  success: boolean;
  message: string;
};

async function getClientKey(prefix: string) {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return `${prefix}:${ip}`;
}

function isHoneypotFilled(website?: string) {
  return Boolean(website && website.trim().length > 0);
}

async function saveLead(row: Record<string, unknown>): Promise<boolean> {
  const admin = createAdminClient();
  if (!admin) {
    console.info("[leads] Supabase not configured — lead logged locally", row);
    return true;
  }

  const { error } = await admin.from("leads").insert(row);
  if (error) {
    console.error("[leads] Insert failed", error);
    return false;
  }
  return true;
}

export async function submitContactForm(
  values: ContactFormValues
): Promise<ActionResult> {
  const parsed = contactFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid form data." };
  }

  if (isHoneypotFilled(parsed.data.website)) {
    return { success: true, message: "Thank you. We will be in touch shortly." };
  }

  const rate = checkRateLimit(await getClientKey("contact"), 5, 60_000);
  if (!rate.allowed) {
    return {
      success: false,
      message: `Too many requests. Please try again in ${rate.retryAfterSec} seconds.`,
    };
  }

  const { name, email, phone, eventType, message } = parsed.data;
  const saved = await saveLead({
    name,
    email,
    phone,
    event_type: eventType,
    message,
    source: "contact",
    status: "new",
  });

  if (!saved) {
    return {
      success: false,
      message: "Let's try that again together? Please retry or call us directly.",
    };
  }

  await sendLeadNotification({
    name,
    email,
    phone,
    eventType,
    message,
    source: "contact",
  });
  await sendLeadConfirmation({ name, email });

  return {
    success: true,
    message: "Thank you. Our team will contact you within one business day.",
  };
}

export async function submitQuoteForm(
  values: QuoteFormValues
): Promise<ActionResult> {
  const parsed = quoteFormSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid form data." };
  }

  if (isHoneypotFilled(parsed.data.website)) {
    return { success: true, message: "Thank you. We will be in touch shortly." };
  }

  const rate = checkRateLimit(await getClientKey("quote"), 3, 60_000);
  if (!rate.allowed) {
    return {
      success: false,
      message: `Too many requests. Please try again in ${rate.retryAfterSec} seconds.`,
    };
  }

  const data = parsed.data;
  const needsSummary = data.productionNeeds.join(", ");
  const fullMessage = [
    data.message,
    data.eventDuration ? `Duration: ${data.eventDuration}` : null,
    `Needs: ${needsSummary}`,
  ]
    .filter(Boolean)
    .join("\n");

  const saved = await saveLead({
    name: data.name,
    email: data.email,
    phone: data.phone,
    event_type: data.eventType,
    event_date: data.eventDate,
    event_location: data.eventLocation,
    budget_range: data.budgetRange,
    message: fullMessage,
    source: "quote",
    status: "new",
    notes: JSON.stringify({
      production_needs: data.productionNeeds,
      event_duration: data.eventDuration,
    }),
  });

  if (!saved) {
    return {
      success: false,
      message: "Let's try that again together? Please retry or WhatsApp us.",
    };
  }

  await sendLeadNotification({
    name: data.name,
    email: data.email,
    phone: data.phone,
    eventType: data.eventType,
    eventDate: data.eventDate,
    eventLocation: data.eventLocation,
    eventDuration: data.eventDuration,
    budgetRange: data.budgetRange,
    productionNeeds: data.productionNeeds,
    message: data.message,
    source: "quote",
  });
  await sendLeadConfirmation({ name: data.name, email: data.email });

  return {
    success: true,
    message: "Quote request received. We'll prepare a tailored proposal for you.",
  };
}

export async function submitNewsletter(
  values: NewsletterFormValues
): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid email." };
  }

  if (isHoneypotFilled(parsed.data.website)) {
    return { success: true, message: "You're on the list." };
  }

  const rate = checkRateLimit(await getClientKey("newsletter"), 5, 60_000);
  if (!rate.allowed) {
    return {
      success: false,
      message: `Too many requests. Please try again in ${rate.retryAfterSec} seconds.`,
    };
  }

  const { email } = parsed.data;
  const saved = await saveLead({
    name: "Newsletter Subscriber",
    email,
    phone: "N/A",
    message: "Newsletter signup",
    source: "newsletter",
    status: "new",
  });

  if (!saved) {
    return {
      success: false,
      message: "Let's try that again together?",
    };
  }

  return { success: true, message: "Welcome — you'll hear from us soon." };
}

export async function submitPortfolioInquire(
  values: PortfolioInquireValues
): Promise<ActionResult> {
  const parsed = portfolioInquireSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message || "Invalid form data." };
  }

  if (isHoneypotFilled(parsed.data.website)) {
    return { success: true, message: "Thank you. We will be in touch shortly." };
  }

  const rate = checkRateLimit(await getClientKey("portfolio"), 5, 60_000);
  if (!rate.allowed) {
    return {
      success: false,
      message: `Too many requests. Please try again in ${rate.retryAfterSec} seconds.`,
    };
  }

  const { name, email, phone, projectTitle, message } = parsed.data;
  const saved = await saveLead({
    name,
    email,
    phone,
    message: `Inquiry about project: ${projectTitle}\n\n${message}`,
    source: "portfolio_inquire",
    status: "new",
  });

  if (!saved) {
    return {
      success: false,
      message: "Let's try that again together?",
    };
  }

  await sendLeadNotification({
    name,
    email,
    phone,
    message: `Project: ${projectTitle}\n${message}`,
    source: "portfolio_inquire",
  });

  return {
    success: true,
    message: "Thanks — we'll share more about this project shortly.",
  };
}
