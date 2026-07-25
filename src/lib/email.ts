import { Resend } from "resend";
import { COMPANY } from "@/lib/constants";

type LeadEmailPayload = {
  name: string;
  email: string;
  phone: string;
  eventType?: string | null;
  eventDate?: string | null;
  eventLocation?: string | null;
  eventDuration?: string | null;
  budgetRange?: string | null;
  productionNeeds?: string[] | null;
  message?: string | null;
  source: string;
};

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendLeadNotification(payload: LeadEmailPayload) {
  const resend = getResend();
  if (!resend) {
    console.info("[email] RESEND_API_KEY missing — skipping", payload.source);
    return { ok: false as const };
  }

  try {
    await resend.emails.send({
      from: `Doolenses Leads <leads@${new URL(COMPANY.siteUrl).hostname}>`,
      to: [COMPANY.email],
      replyTo: payload.email,
      subject: `New ${payload.source} lead — ${payload.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0A2540">
          <h2 style="border-bottom:2px solid #D4AF37;padding-bottom:8px">New Lead — Doolenses</h2>
          <p><strong>Source:</strong> ${payload.source}</p>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Phone:</strong> ${payload.phone}</p>
          ${payload.eventType ? `<p><strong>Event:</strong> ${payload.eventType}</p>` : ""}
          ${payload.eventDate ? `<p><strong>Date:</strong> ${payload.eventDate}</p>` : ""}
          ${payload.eventLocation ? `<p><strong>Location:</strong> ${payload.eventLocation}</p>` : ""}
          ${payload.eventDuration ? `<p><strong>Duration:</strong> ${payload.eventDuration}</p>` : ""}
          ${payload.budgetRange ? `<p><strong>Budget:</strong> ${payload.budgetRange}</p>` : ""}
          ${payload.productionNeeds?.length ? `<p><strong>Needs:</strong> ${payload.productionNeeds.join(", ")}</p>` : ""}
          ${payload.message ? `<p><strong>Message:</strong><br/>${payload.message.replace(/\n/g, "<br/>")}</p>` : ""}
        </div>
      `,
    });
    return { ok: true as const };
  } catch (error) {
    console.error("[email] send failed", error);
    return { ok: false as const };
  }
}

export async function sendLeadConfirmation(payload: { name: string; email: string }) {
  const resend = getResend();
  if (!resend) return { ok: false as const };
  try {
    await resend.emails.send({
      from: `Doolenses <hello@${new URL(COMPANY.siteUrl).hostname}>`,
      to: [payload.email],
      subject: "We received your request — Doolenses",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0A2540">
          <h2 style="border-bottom:2px solid #D4AF37;padding-bottom:8px">Thank you, ${payload.name}</h2>
          <p>Our production team will be in touch within one business day.</p>
          <p>WhatsApp us anytime: <strong>${COMPANY.phone}</strong></p>
          <p style="margin-top:24px">${COMPANY.tagline}</p>
        </div>
      `,
    });
    return { ok: true as const };
  } catch {
    return { ok: false as const };
  }
}
