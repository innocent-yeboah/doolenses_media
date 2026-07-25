# Doolenses

Premium lead-generation website for **Doolenses** — television production and advertising in Accra, Ghana.

Structure and tone modelled on [Iso Media GH](https://isomediagh.com), adapted for Doolenses' 9 services and dark/gold brand.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Supabase · Resend · React Hook Form · Zod

## Run

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Pages

| Route | Purpose |
|---|---|
| `/` | Iso Media-style homepage (hero, about preview, services, why us, gallery, testimonials, CTA) |
| `/services` | 9 detailed production services |
| `/portfolio` | Filterable gallery |
| `/about` | Story, mission, team, equipment |
| `/contact` | Form, map, WhatsApp |
| `/quote` | Multi-step quote wizard |

## Database

Run `supabase/migrations/001_initial_schema.sql` in Supabase SQL editor.
