"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { updateCompanySettings } from "@/actions/admin/settings";
import { Button } from "@/components/ui/Button";
import type { CompanySettings } from "@/types/admin";

interface SettingsFormProps {
  settings: CompanySettings;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateCompanySettings({
        company_name: form.get("company_name") as string,
        legal_name: (form.get("legal_name") as string) || null,
        email: (form.get("email") as string) || null,
        phone: (form.get("phone") as string) || null,
        office_phone: (form.get("office_phone") as string) || null,
        address: (form.get("address") as string) || null,
        tagline: (form.get("tagline") as string) || null,
      });

      if (!result.success) {
        setError(result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
      {error ? (
        <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Company name *</label>
          <input name="company_name" required defaultValue={settings.company_name} className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Legal name</label>
          <input name="legal_name" defaultValue={settings.legal_name ?? ""} className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Email</label>
          <input name="email" type="email" defaultValue={settings.email ?? ""} className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Phone</label>
          <input name="phone" defaultValue={settings.phone ?? ""} className="field-input" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Office phone</label>
          <input name="office_phone" defaultValue={settings.office_phone ?? ""} className="field-input" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Address</label>
          <textarea name="address" rows={2} defaultValue={settings.address ?? ""} className="field-input resize-y" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-brand-muted">Tagline</label>
          <input name="tagline" defaultValue={settings.tagline ?? ""} className="field-input" />
        </div>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
