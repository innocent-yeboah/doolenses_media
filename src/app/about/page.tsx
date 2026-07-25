import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { COMPANY, WHY_CHOOSE, TRUST_STATS } from "@/lib/constants";
import { TEAM } from "@/lib/data";

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
        imageUrl="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=2000&q=80"
        imageAlt="Cinematographer on a professional set"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">Our story</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
              Discover the Heart of Doolenses
            </h2>
            <div className="mt-6 space-y-4 text-brand-slate leading-relaxed">
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
          <div className="relative flex aspect-square items-center justify-center border border-white/10 bg-white p-10">
            <Image
              src="/brand/doolenses-logo.png"
              alt="Doolenses logo"
              width={420}
              height={130}
              className="h-auto w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-brand-surface/40 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-brand-gold">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-slate">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div className="border border-white/10 p-8">
            <h3 className="font-display text-2xl font-bold text-brand-gold">Mission</h3>
            <p className="mt-4 text-brand-muted leading-relaxed">
              To provide exceptional video production and media coverage that captures the essence of every
              event, fostering meaningful connections and lasting memories.
            </p>
          </div>
          <div className="border border-white/10 p-8">
            <h3 className="font-display text-2xl font-bold text-brand-gold">Vision</h3>
            <p className="mt-4 text-brand-muted leading-relaxed">
              To be Ghana&apos;s most trusted premium production partner — recognised for creative excellence,
              technical mastery, and unwavering professionalism.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The crew"
            title="Meet the Team"
            description="Placeholder profiles — replace with your real production leaders and portraits."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <article key={member.role} className="text-center">
                <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden border border-white/10">
                  <Image src={member.imageUrl} alt={member.name} fill sizes="220px" className="object-cover" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-brand-gold">{member.role}</p>
                <p className="mt-2 text-sm text-brand-slate">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-brand-surface/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Capabilities"
            title="Equipment & Production Power"
            description="Professional kits ready for studio, venue, and outdoor deployments nationwide."
          />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {EQUIPMENT.map((item) => (
              <li key={item} className="border border-white/10 bg-brand-navy/40 px-5 py-4 text-sm text-brand-muted">
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
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-slate">{item.description}</p>
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
