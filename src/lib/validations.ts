import { z } from "zod";
import { BUDGET_RANGES, EVENT_TYPES } from "@/lib/constants";

const phoneRegex = /^[+]?[\d\s()-]{9,20}$/;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
  subject: z.string().min(2, "Please add a subject").max(120),
  message: z.string().min(10, "Please share a few more details").max(2000),
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  website: z.string().optional(),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export const quoteStep1Schema = z.object({
  name: z.string().min(2, "Please enter your full name").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
});

export const quoteStep2Schema = z.object({
  eventType: z.enum(EVENT_TYPES, { message: "Please select a service" }),
  eventDate: z.string().min(1, "Please select a date"),
  eventLocation: z.string().min(2, "Please enter a location").max(200),
  eventDuration: z.string().min(1, "Please select duration"),
});

export const quoteStep3Schema = z.object({
  productionNeeds: z.array(z.string()).min(1, "Select at least one need"),
  message: z.string().max(2000).optional(),
});

export const quoteStep4Schema = z.object({
  budgetRange: z.enum(BUDGET_RANGES, { message: "Please select a budget range" }),
  website: z.string().optional(),
});

export const quoteFormSchema = quoteStep1Schema
  .merge(quoteStep2Schema)
  .merge(quoteStep3Schema)
  .merge(quoteStep4Schema);

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
