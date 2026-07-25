import { Suspense } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-brand-navy text-brand-slate">
          Loading…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
