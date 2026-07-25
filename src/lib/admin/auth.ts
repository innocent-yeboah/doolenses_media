import { createClient } from "@/lib/supabase/server";
import type { Profile, StaffSession } from "@/types/admin";
import { redirect } from "next/navigation";

async function fetchActiveProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Profile;
}

/** Require an authenticated, active staff member. Redirects to login when invalid. */
export async function requireStaff(): Promise<StaffSession> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  const profile = await fetchActiveProfile(user.id);

  if (!profile || !profile.is_active) {
    redirect("/admin/login?error=inactive");
  }

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    profile,
  };
}

/** Return staff session when available; otherwise null without redirecting. */
export async function getOptionalStaff(): Promise<StaffSession | null> {
  const supabase = createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const profile = await fetchActiveProfile(user.id);

  if (!profile || !profile.is_active) {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    profile,
  };
}
