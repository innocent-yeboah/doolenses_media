import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WorksSection } from "@/components/home/WorksSection";
import { FactCounter } from "@/components/home/FactCounter";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Testimonials } from "@/components/home/Testimonials";
import { JournalSection } from "@/components/home/JournalSection";
import { BrandStrip } from "@/components/home/BrandStrip";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${COMPANY.name} | ${COMPANY.heroHeadline}`,
  description: `${COMPANY.heroTrust} ${COMPANY.tagline}.`,
  alternates: { canonical: "/" },
};

/** Munson Home One section rhythm adapted for Doolenses. */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutPreview />
      <ProcessSection />
      <WorksSection />
      <FactCounter />
      <ServicesOverview />
      <Testimonials />
      <JournalSection />
      <BrandStrip />
    </>
  );
}
