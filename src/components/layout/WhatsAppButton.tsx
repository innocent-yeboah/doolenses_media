"use client";

import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { formatPhoneForWhatsApp } from "@/lib/utils";

export function WhatsAppButton() {
  const href = `https://wa.me/${formatPhoneForWhatsApp(COMPANY.phone)}?text=${encodeURIComponent(COMPANY.whatsappMessage)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Doolenses on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand-black text-brand-white shadow-elevate transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
    </a>
  );
}
