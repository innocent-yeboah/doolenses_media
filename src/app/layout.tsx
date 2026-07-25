import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { COMPANY } from "@/lib/constants";
import "./globals.css";

const display = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.siteUrl),
  title: {
    default: `${COMPANY.name} | ${COMPANY.subheadline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Doolenses is a premium television production and advertising company in Accra, Ghana. Capturing moments, creating memories — creative work for creative people.",
  keywords: [
    "television production Accra",
    "event videography Ghana",
    "wedding films Accra",
    "Doolenses",
    "media production Accra",
  ],
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/brand/icon-48.png", type: "image/png", sizes: "48x48" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: COMPANY.siteUrl,
    siteName: COMPANY.name,
    title: `${COMPANY.name} | ${COMPANY.heroHeadline}`,
    description: COMPANY.tagline,
    images: [{ url: "/brand/doolenses-logo-on-white.png", alt: "Doolenses logo" }],
  },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY.name,
  description: COMPANY.subheadline,
  slogan: COMPANY.tagline,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Aygaherbal off Pokuase Road",
    addressLocality: "Accra",
    addressCountry: "GH",
  },
  url: COMPANY.siteUrl,
  areaServed: { "@type": "Country", name: "Ghana" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-brand-navy font-sans text-brand-muted antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
