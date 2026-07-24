# Doolenses

Premium lead-generation website for **Doolenses** — television production and advertising excellence in Accra, Ghana.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Supabase (leads database)
- Resend (email notifications)
- React Hook Form + Zod

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for lead inserts |
| `RESEND_API_KEY` | Email delivery |
| `COMPANY_PHONE` | WhatsApp / contact phone |
| `COMPANY_EMAIL` | Lead notification inbox |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |

Forms still work without Supabase/Resend configured — leads are logged server-side until you connect credentials.

## Database

Run `supabase/migrations/001_initial_schema.sql` in the Supabase SQL editor.

## Pages

| Route | Purpose |
|---|---|
| `/` | Homepage + trust + services + testimonials |
| `/services` | Detailed service catalogue |
| `/portfolio` | Filterable project gallery |
| `/about` | Story, mission, team, equipment |
| `/contact` | Form, map, WhatsApp |
| `/quote` | Multi-step quote wizard |
| `/quote/thank-you` | Confirmation + next steps |

## Deploy

Deploy to Vercel and add the same environment variables in the project settings.

Replace Unsplash placeholders (marked with `CLIENT:` comments) with real Doolenses photography and update `COMPANY_EMAIL` when ready.
