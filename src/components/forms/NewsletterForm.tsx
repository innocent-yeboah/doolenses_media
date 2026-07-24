"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitNewsletter } from "@/actions/leads";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validations";

export function NewsletterForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", website: "" },
  });

  const onSubmit = (values: NewsletterFormValues) => {
    setMessage(null);
    startTransition(async () => {
      const result = await submitNewsletter(values);
      setMessage(result.message);
      if (result.success) reset();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          {...register("email")}
          type="email"
          placeholder="Email address"
          className="field-input flex-1"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-brand-gold px-4 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-gold-light disabled:opacity-60"
        >
          {pending ? "..." : "Subscribe"}
        </button>
      </div>
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <input {...register("website")} tabIndex={-1} autoComplete="off" />
      </div>
      {errors.email ? (
        <p className="text-xs text-red-400">{errors.email.message}</p>
      ) : null}
      {message ? <p className="text-xs text-brand-gold">{message}</p> : null}
    </form>
  );
}
