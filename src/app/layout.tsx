import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
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
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.siteUrl),
  title: {
    default: `${COMPANY.name} | ${COMPANY.subheadline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description: `${COMPANY.tagline}. ${COMPANY.agencyLine} in Accra, Ghana.`,
  keywords: [
    "Doolenses",
    "creative studio Accra",
    "graphic design Ghana",
    "photography Accra",
    "videography Ghana",
    "web design Accra",
    "printing Ghana",
    "fashion costume Accra",
  ],
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/brand/icon-48.png", type: "image/png", sizes: "48x48" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: COMPANY.siteUrl,
    siteName: COMPANY.legalName,
    title: `${COMPANY.name} | ${COMPANY.subheadline}`,
    description: COMPANY.tagline,
    images: [{ url: "/brand/doolenses-mark-mono.png", alt: "Doolenses logo" }],
  },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: COMPANY.legalName,
  description: COMPANY.agencyLine,
  slogan: COMPANY.tagline,
  telephone: [COMPANY.officePhoneDisplay, COMPANY.phoneDisplay],
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "House No. 13, Mahogany Close, Near Mary-Lucy Hospital",
    addressLocality: "Awoshie, Accra",
    addressCountry: "GH",
  },
  url: COMPANY.siteUrl,
  sameAs: [COMPANY.social.instagram],
  areaServed: { "@type": "Country", name: "Ghana" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-brand-black font-sans text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
