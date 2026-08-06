import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { COMPANY, WHY_CHOOSE } from "@/lib/constants";
import { TEAM } from "@/lib/data";
import { TrustStats } from "@/components/ui/TrustStats";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the heart of Doolenses — Accra's premium television production and advertising company.",
  alternates: { canonical: "/about" },
};

const EQUIPMENT = [
  "Cinema & broadcast camera systems",
  "Professional audio & wireless kits",
  "LED & cinematic lighting packages",
  "Live switching & streaming workflows",
  "Drone / aerial cinematography",
  "Post-production colour & finishing suite",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        description="Discover the heart of Doolenses — creative work for creative people."
        imageUrl="/images/about/about-slide-02-videography.jpg"
        imageAlt="Doolenses — The videography people"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">Our story</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-ink md:text-4xl">
              Discover the Heart of Doolenses
            </h2>
            <div className="mt-6 space-y-4 text-brand-body leading-relaxed">
              <p>
                At Doolenses, we&apos;ve helped countless clients enhance their visibility through captivating
                event coverage. Our professional media solutions ensure your significant moments are
                immortalized with creativity and precision.
              </p>
              <p>
                Founded in Accra, Ghana, Doolenses began as a passion for storytelling through visuals. Today
                we deliver television production and advertising excellence for families, faith communities,
                brands, and institutions nationwide.
              </p>
              <p>Our studio ethos is simple: {COMPANY.tagline}.</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-black/10 bg-brand-navy lg:aspect-square">
            <Image
              src="/images/about/about-team.jpg"
              alt="The Doolenses production team in studio"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-brand-mist px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TrustStats variant="banner" />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div className="border border-black/10 p-8">
            <h3 className="font-display text-2xl font-bold text-brand-gold">Mission</h3>
            <p className="mt-4 text-brand-body leading-relaxed">
              To provide exceptional video production and media coverage that captures the essence of every
              event, fostering meaningful connections and lasting memories.
            </p>
          </div>
          <div className="border border-black/10 p-8">
            <h3 className="font-display text-2xl font-bold text-brand-gold">Vision</h3>
            <p className="mt-4 text-brand-body leading-relaxed">
              To be Ghana&apos;s most trusted premium production partner — recognised for creative excellence,
              technical mastery, and unwavering professionalism.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The crew"
            title="Meet the Team"
            description="The people behind the lens — production leaders who bring every shoot to life."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <article key={member.role} className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden border border-black/10">
                  <Image src={member.imageUrl} alt={member.name} fill sizes="220px" className="object-cover" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-ink">{member.name}</h3>
                <p className="text-sm text-brand-gold">{member.role}</p>
                <p className="mt-2 text-sm text-brand-body">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-brand-mist px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Capabilities"
            title="Equipment & Production Power"
            description="Professional kits ready for studio, venue, and outdoor deployments nationwide."
          />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {EQUIPMENT.map((item) => (
              <li key={item} className="border border-black/10 bg-white px-5 py-4 text-sm text-brand-body">
                <span className="mr-2 text-brand-gold" aria-hidden>
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why us" title="Why Choose Doolenses" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {WHY_CHOOSE.map((item) => (
              <div key={item.title} className="border-l border-brand-gold/40 pl-5">
                <h3 className="font-display text-xl font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-body">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/quote" size="lg">
              Elevate Your Next Event
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
