"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/actions/leads";
import { Button } from "@/components/ui/Button";
import { EVENT_TYPES } from "@/lib/constants";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

export function ContactForm({
  defaultEventType,
}: {
  defaultEventType?: (typeof EVENT_TYPES)[number];
}) {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: defaultEventType || "Weddings",
      message: "",
      website: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    setMessage(null);
    startTransition(async () => {
      const result = await submitContactForm(values);
      setMessage({ type: result.success ? "success" : "error", text: result.message });
      if (result.success) reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input {...register("name")} className="field-input" placeholder="Your name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} type="email" className="field-input" placeholder="you@company.com" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} type="tel" className="field-input" placeholder="055 619 5581" />
        </Field>
        <Field label="Event type" error={errors.eventType?.message}>
          <select {...register("eventType")} className="field-input">
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          className="field-input resize-y"
          placeholder="Tell us about your event, date, and vision..."
        />
      </Field>
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <input {...register("website")} tabIndex={-1} autoComplete="off" />
      </div>
      {message ? (
        <p className={message.type === "success" ? "text-sm text-emerald-400" : "text-sm text-red-400"}>
          {message.text}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-brand-muted">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
