import { Logo } from "@/components/brand/Logo";
import { COMPANY } from "@/lib/constants";

/** Minimal editorial footer. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-line bg-brand-white px-6 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Logo size="sm" />
        <p className="text-xs tracking-[0.12em] text-brand-muted">
          © {year} {COMPANY.legalName}. Accra, Ghana.
        </p>
      </div>
    </footer>
  );
}
