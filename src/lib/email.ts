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
  const to = COMPANY.email;

  if (!resend) {
    console.info("[email] RESEND_API_KEY missing — skipping notification", {
      source: payload.source,
      email: payload.email,
    });
    return { ok: false as const, reason: "missing_api_key" };
  }

  const subject = `New ${payload.source} lead — ${payload.name}`;
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0A2540">
      <h2 style="color:#0A2540;border-bottom:2px solid #D4AF37;padding-bottom:8px">
        New Lead from Doolenses Website
      </h2>
      <p><strong>Source:</strong> ${payload.source}</p>
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Phone:</strong> ${payload.phone}</p>
      ${payload.eventType ? `<p><strong>Event Type:</strong> ${payload.eventType}</p>` : ""}
      ${payload.eventDate ? `<p><strong>Event Date:</strong> ${payload.eventDate}</p>` : ""}
      ${payload.eventLocation ? `<p><strong>Location:</strong> ${payload.eventLocation}</p>` : ""}
      ${payload.eventDuration ? `<p><strong>Duration:</strong> ${payload.eventDuration}</p>` : ""}
      ${payload.budgetRange ? `<p><strong>Budget:</strong> ${payload.budgetRange}</p>` : ""}
      ${
        payload.productionNeeds?.length
          ? `<p><strong>Production Needs:</strong> ${payload.productionNeeds.join(", ")}</p>`
          : ""
      }
      ${payload.message ? `<p><strong>Message:</strong><br/>${payload.message.replace(/\n/g, "<br/>")}</p>` : ""}
      <p style="margin-top:24px;color:#666;font-size:12px">
        Reply promptly — Fortune-level production brands win leads with speed.
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: `Doolenses Leads <leads@${new URL(COMPANY.siteUrl).hostname}>`,
      to: [to],
      replyTo: payload.email,
      subject,
      html,
    });
    return { ok: true as const };
  } catch (error) {
    console.error("[email] Failed to send lead notification", error);
    return { ok: false as const, reason: "send_failed" };
  }
}

export async function sendLeadConfirmation(payload: {
  name: string;
  email: string;
}) {
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
          <p>Our production team has received your enquiry and will be in touch within one business day.</p>
          <p>In the meantime, you can reach us on WhatsApp at <strong>${COMPANY.phone}</strong>.</p>
          <p style="margin-top:24px">${COMPANY.tagline}</p>
          <p><strong>${COMPANY.name}</strong><br/>${COMPANY.subheadline}</p>
        </div>
      `,
    });
    return { ok: true as const };
  } catch (error) {
    console.error("[email] Failed to send confirmation", error);
    return { ok: false as const };
  }
}
