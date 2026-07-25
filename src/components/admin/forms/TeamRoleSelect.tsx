"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { updateProfileRole } from "@/actions/admin/team";
import { ROLE_OPTIONS } from "@/lib/admin/constants";
import type { Profile, ProfileRole } from "@/types/admin";

interface TeamRoleSelectProps {
  profile: Profile;
  isAdmin: boolean;
}

export function TeamRoleSelect({ profile, isAdmin }: TeamRoleSelectProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  if (!isAdmin) {
    return <span className="capitalize text-brand-muted">{profile.role}</span>;
  }

  function handleChange(role: ProfileRole) {
    startTransition(async () => {
      const result = await updateProfileRole({ id: profile.id, role });
      if (!result.success) toast.error(result.message);
      else {
        toast.success(result.message);
        router.refresh();
      }
    });
  }

  return (
    <select
      value={profile.role}
      onChange={(e) => handleChange(e.target.value as ProfileRole)}
      disabled={pending}
      className="field-input w-auto py-1 text-xs capitalize"
    >
      {ROLE_OPTIONS.map((r) => (
        <option key={r.value} value={r.value}>
          {r.label}
        </option>
      ))}
    </select>
  );
}
