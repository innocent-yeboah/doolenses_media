"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { COMPANY } from "@/lib/constants";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin";
  const inactive = searchParams.get("error") === "inactive";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    inactive ? "Your account is inactive. Contact an administrator." : null
  );
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: signError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signError) {
        setError(signError.message);
        setLoading(false);
        return;
      }
      router.replace(redirectTo);
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-navy px-4">
      <div className="w-full max-w-md border border-white/10 bg-brand-surface/40 p-8 shadow-elevate backdrop-blur">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/brand/doolenses-mark-new.png"
            alt="Doolenses"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
          <h1 className="mt-6 font-display text-2xl font-bold text-white">Operations Console</h1>
          <p className="mt-2 text-sm text-brand-slate">
            Sign in to manage leads, productions, and finance for {COMPANY.legalName}.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-muted">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-input w-full"
              placeholder="you@doolenses.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-brand-muted">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input w-full"
            />
          </div>

          {error ? (
            <p className="rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-gold-light disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
