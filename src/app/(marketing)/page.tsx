import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { HomeCTA } from "@/components/home/HomeCTA";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${COMPANY.name} | ${COMPANY.subheadline}`,
  description: `${COMPANY.tagline}. ${COMPANY.agencyLine}.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutPreview />
      <ServicesPreview />
      <PortfolioPreview />
      <HomeCTA />
    </>
  );
}
