"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitQuoteForm } from "@/actions/leads";
import { Button } from "@/components/ui/Button";
import { BUDGET_RANGES, EVENT_TYPES, PRODUCTION_NEEDS } from "@/lib/constants";
import {
  quoteFormSchema,
  quoteStep1Schema,
  quoteStep2Schema,
  quoteStep3Schema,
  quoteStep4Schema,
  type QuoteFormValues,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

const STEPS = ["Contact", "Event details", "Production needs", "Budget"] as const;

export function QuoteForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "Weddings",
      eventDate: "",
      eventLocation: "",
      eventDuration: "Half day (4–6 hrs)",
      productionNeeds: [],
      message: "",
      budgetRange: "Prefer to discuss",
      website: "",
    },
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const productionNeeds = watch("productionNeeds");

  const next = async () => {
    setError(null);
    const schemas = [quoteStep1Schema, quoteStep2Schema, quoteStep3Schema, quoteStep4Schema];
    const fields = Object.keys(schemas[step].shape) as (keyof QuoteFormValues)[];
    if (await trigger(fields)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = (values: QuoteFormValues) => {
    setError(null);
    startTransition(async () => {
      const result = await submitQuoteForm(values);
      if (result.success) {
        router.push("/quote/thank-you");
        return;
      }
      setError(result.message);
    });
  };

  const toggleNeed = (id: string) => {
    const current = productionNeeds || [];
    setValue(
      "productionNeeds",
      current.includes(id) ? current.filter((n) => n !== id) : [...current, id],
      { shouldValidate: true }
    );
  };

  return (
    <div>
      <ol className="mb-10 flex flex-wrap gap-2" aria-label="Quote form progress">
        {STEPS.map((label, index) => (
          <li
            key={label}
            className={cn(
              "flex items-center gap-2 border px-3 py-1.5 text-xs font-medium uppercase tracking-wider",
              index === step
                ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                : index < step
                  ? "border-brand-gold/40 text-brand-gold/80"
                  : "border-black/15 text-brand-body"
            )}
          >
            <span className="font-display text-sm">{index + 1}</span>
            <span className="hidden sm:inline">{label}</span>
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {step === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" error={errors.name?.message} className="sm:col-span-2">
              <input {...register("name")} className="field-input" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input {...register("email")} type="email" className="field-input" />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input {...register("phone")} type="tel" className="field-input" />
            </Field>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Event type" error={errors.eventType?.message}>
              <select {...register("eventType")} className="field-input">
                {EVENT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Event date" error={errors.eventDate?.message}>
              <input {...register("eventDate")} type="date" className="field-input" />
            </Field>
            <Field label="Location" error={errors.eventLocation?.message}>
              <input {...register("eventLocation")} className="field-input" placeholder="Venue / city" />
            </Field>
            <Field label="Duration" error={errors.eventDuration?.message}>
              <select {...register("eventDuration")} className="field-input">
                <option>Half day (4–6 hrs)</option>
                <option>Full day (8–12 hrs)</option>
                <option>Multi-day</option>
                <option>Custom / TBD</option>
              </select>
            </Field>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-brand-ink">What do you need?</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {PRODUCTION_NEEDS.map((need) => {
                  const checked = productionNeeds?.includes(need.id);
                  return (
                    <button
                      key={need.id}
                      type="button"
                      onClick={() => toggleNeed(need.id)}
                      aria-pressed={checked}
                      className={cn(
                        "border px-4 py-3 text-left text-sm transition",
                        checked
                          ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                          : "border-black/15 text-brand-body hover:border-brand-gold/50"
                      )}
                    >
                      {need.label}
                    </button>
                  );
                })}
              </div>
              {errors.productionNeeds ? (
                <p className="mt-2 text-xs text-red-400">{errors.productionNeeds.message}</p>
              ) : null}
            </fieldset>
            <Field label="Additional notes (optional)" error={errors.message?.message}>
              <textarea {...register("message")} rows={4} className="field-input resize-y" />
            </Field>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <Field label="Budget range" error={errors.budgetRange?.message}>
              <select {...register("budgetRange")} className="field-input">
                {BUDGET_RANGES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </Field>
            <p className="text-sm text-brand-body">
              Budgets help us recommend the right crew and package. Exact pricing follows a short consultation.
            </p>
            <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
              <input {...register("website")} tabIndex={-1} autoComplete="off" />
            </div>
          </div>
        ) : null}

        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0 || pending}
            className={step === 0 ? "invisible" : ""}
          >
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={next}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={pending}>
              {pending ? "Submitting..." : "Request Quote"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block text-sm", className)}>
      <span className="mb-1.5 block font-medium text-brand-ink">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
