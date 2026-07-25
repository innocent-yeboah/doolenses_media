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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevate transition hover:scale-105 hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
