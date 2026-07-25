"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Clear the Supabase session cookies and return to the admin login screen. */
export async function signOutAdmin() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
