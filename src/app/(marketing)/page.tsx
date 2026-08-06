import type { Metadata } from "next";
import { StudioHero } from "@/components/studio/StudioHero";
import { StudioServices } from "@/components/studio/StudioServices";
import { StudioAbout } from "@/components/studio/StudioAbout";
import { StudioContact } from "@/components/studio/StudioContact";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${COMPANY.name} | ${COMPANY.subheadline}`,
  description: `${COMPANY.tagline}. ${COMPANY.agencyLine}.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <StudioHero />
      <StudioServices />
      <StudioAbout />
      <StudioContact />
    </>
  );
}
