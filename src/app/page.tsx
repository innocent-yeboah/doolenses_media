import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { TrustBar } from "@/components/home/TrustBar";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeCTA } from "@/components/home/HomeCTA";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${COMPANY.name} | Television Production & Advertising Excellence`,
  description:
    "Premium television production and advertising in Accra, Ghana. Weddings, conferences, concerts, crusades, campaigns, and more — creative work for creative peoples.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustBar />
      <ServicesOverview />
      <WhyChoose />
      <Testimonials />
      <HomeCTA />
    </>
  );
}
