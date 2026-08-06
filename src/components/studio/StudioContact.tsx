"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone } from "lucide-react";
import { submitContactForm } from "@/actions/leads";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { COMPANY } from "@/lib/constants";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";

/** Editorial contact — form + essentials. */
export function StudioContact() {
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
      eventType: "Other",
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
    <section id="contact" className="scroll-mt-24 border-t border-brand-line bg-brand-white px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand-muted">Contact</p>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-brand-black sm:text-5xl">
            Let&apos;s talk
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-brand-muted md:text-base">
            Tell us about your project. We&apos;ll respond within one business day.
          </p>

          <ul className="mt-10 space-y-5 text-sm">
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-3 text-brand-black transition hover:opacity-60"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-3 text-brand-black transition hover:opacity-60"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {COMPANY.phoneDisplay}
              </a>
            </li>
          </ul>

          <div className="mt-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-brand-muted">
              Follow
            </p>
            <SocialLinks />
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Name" error={errors.name?.message}>
                <input {...register("name")} className="field-input" placeholder="Your name" />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  type="email"
                  className="field-input"
                  placeholder="you@studio.com"
                />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input
                  {...register("phone")}
                  type="tel"
                  className="field-input"
                  placeholder="055 619 5581"
                />
              </Field>
              <Field label="Interest" error={errors.eventType?.message}>
                <select {...register("eventType")} className="field-input">
                  <option value="Other">General inquiry</option>
                  <option value="Weddings">Photography</option>
                  <option value="Musical Concerts">Videography</option>
                  <option value="Educational Programs">Graphic / Web Design</option>
                  <option value="Award Ceremonies">Printing / Fashion</option>
                </select>
              </Field>
            </div>
            <Field label="Message" error={errors.message?.message}>
              <textarea
                {...register("message")}
                rows={4}
                className="field-input resize-y"
                placeholder="Tell us about your idea..."
              />
            </Field>
            <div className="absolute -left-[9999px] opacity-0" aria-hidden>
              <input {...register("website")} tabIndex={-1} autoComplete="off" />
            </div>
            {message ? (
              <p
                className={
                  message.type === "success" ? "text-sm text-brand-black" : "text-sm text-red-600"
                }
              >
                {message.text}
              </p>
            ) : null}
            <Button type="submit" disabled={pending} size="lg">
              {pending ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
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
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-brand-muted">
        {label}
      </span>
      {children}
      {error ? <span className="mt-2 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
