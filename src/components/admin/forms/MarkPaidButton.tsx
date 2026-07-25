"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { markInvoicePaid } from "@/actions/admin/invoices";
import type { Invoice, PaymentMethod } from "@/types/admin";

interface MarkPaidButtonProps {
  invoice: Invoice;
}

export function MarkPaidButton({ invoice }: MarkPaidButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  if (invoice.status === "paid") return null;

  function handleMarkPaid() {
    startTransition(async () => {
      const result = await markInvoicePaid({
        id: invoice.id,
        payment_method: "mobile_money" as PaymentMethod,
      });
      if (!result.success) toast.error(result.message);
      else {
        toast.success(result.message);
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleMarkPaid}
      disabled={pending}
      className="text-xs text-brand-gold hover:underline disabled:opacity-50"
    >
      Mark paid
    </button>
  );
}
