import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChoose } from "@/components/home/WhyChoose";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeCTA } from "@/components/home/HomeCTA";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${COMPANY.name} | ${COMPANY.heroHeadline}`,
  description: `${COMPANY.heroTrust} ${COMPANY.tagline}.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutPreview />
      <ServicesOverview />
      <WhyChoose />
      <GalleryPreview />
      <Testimonials />
      <HomeCTA />
    </>
  );
}
