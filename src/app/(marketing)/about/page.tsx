import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { COMPANY, STUDIO_VALUES } from "@/lib/constants";
import { TEAM } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Doolenses",
  description: COMPANY.aboutBlurb,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Doolenses"
        description="We are the explorers, the dreamers, and the builders."
        imageUrl="/images/about/about-slide-02-videography.jpg"
        imageAlt="Doolenses creative studio"
      />

      <section className="px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">Our story</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-black md:text-4xl">
              Built for bold creative work
            </h2>
            <div className="mt-6 space-y-4 text-brand-muted leading-relaxed">
              <p>{COMPANY.aboutBlurb}</p>
              <p>
                Based in {COMPANY.city}, {COMPANY.country}, Doolenses brings design, photography,
                videography, web, print, and fashion together as one creative system — so your brand
                feels consistent from concept to delivery.
              </p>
              <p>Our studio ethos is simple: {COMPANY.tagline}.</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-brand-soft lg:aspect-square">
            <Image
              src="/images/about/about-team.jpg"
              alt="The Doolenses team"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-soft px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="border border-brand-line bg-brand-white p-8">
            <h3 className="font-display text-2xl font-bold text-brand-gold">Mission</h3>
            <p className="mt-4 leading-relaxed text-brand-muted">
              To craft bold ideas and visuals that truly work — helping brands and people show up with
              clarity, craft, and confidence.
            </p>
          </div>
          <div className="border border-brand-line bg-brand-white p-8">
            <h3 className="font-display text-2xl font-bold text-brand-gold">Vision</h3>
            <p className="mt-4 leading-relaxed text-brand-muted">
              To be Accra&apos;s most trusted creative studio for design, image, motion, and brand
              experiences that travel across screens and surfaces.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Values" title="What guides our work" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STUDIO_VALUES.map((item) => (
              <div key={item.title} className="border-t border-brand-black pt-5">
                <h3 className="font-display text-xl font-bold text-brand-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-brand-line bg-brand-soft px-6 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="The crew"
            title="Meet the Team"
            description="The people behind the work — creative leads who bring every project to life."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <article key={member.role} className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden bg-brand-line">
                  <Image src={member.imageUrl} alt={member.name} fill sizes="220px" className="object-cover" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-black">{member.name}</h3>
                <p className="text-sm text-brand-gold">{member.role}</p>
                <p className="mt-2 text-sm text-brand-muted">{member.bio}</p>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button href="/contact" size="lg">
              Work With Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
