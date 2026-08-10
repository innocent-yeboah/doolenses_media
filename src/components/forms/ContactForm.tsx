"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/actions/leads";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

export function ContactForm({ initialSubject = "" }: { initialSubject?: string }) {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
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
      subject: initialSubject,
      message: "",
      website: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    setMessage(null);
    startTransition(async () => {
      const result = await submitContactForm(values);
      setMessage({ type: result.success ? "success" : "error", text: result.message });
      if (result.success) reset({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input {...register("name")} className="field-input" placeholder="Your name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} type="email" className="field-input" placeholder="you@email.com" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} type="tel" className="field-input" placeholder="055 619 5581" />
        </Field>
        <Field label="Subject" error={errors.subject?.message}>
          <input {...register("subject")} className="field-input" placeholder="Project type or topic" />
        </Field>
      </div>
      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          className="field-input resize-y"
          placeholder="Tell us about your idea..."
        />
      </Field>
      <div className="absolute -left-[9999px] opacity-0" aria-hidden>
        <input {...register("website")} tabIndex={-1} autoComplete="off" />
      </div>
      {message ? (
        <p className={message.type === "success" ? "text-sm text-white" : "text-sm text-red-400"}>
          {message.text}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} size="lg">
        {pending ? "Sending…" : "Send Message"}
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
      <span className="mb-1.5 block font-medium text-white">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
