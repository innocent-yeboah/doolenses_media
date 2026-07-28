import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CAPABILITY_SKILLS, COMPANY } from "@/lib/constants";

/** Munson who-we-are: 2-col about + skill bars on light surface. */
export function AboutPreview() {
  return (
    <section className="bg-brand-paper px-4 py-[91px] sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-3xl font-bold text-brand-ink sm:text-4xl md:text-[42px] md:leading-[50px]">
            We Are {COMPANY.name}!
          </h2>
          <span className="mt-4 block h-1 w-10 bg-brand-gold" aria-hidden />
          <p className="mt-6 text-base leading-[1.7] text-brand-body sm:text-lg">
            {COMPANY.aboutBlurb}
          </p>
          <p className="mt-4 text-base leading-[1.7] text-brand-body sm:text-lg">
            From Accra stages to outdoor crusades, our crews capture moments with cinematic
            discipline — {COMPANY.tagline.toLowerCase()}.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="outlineDark" size="md" className="uppercase tracking-[0.12em]">
              About Us
            </Button>
          </div>
        </div>

        <div className="space-y-7 pt-2">
          {CAPABILITY_SKILLS.map((skill) => (
            <div key={skill.label}>
              <div className="mb-2 flex items-end justify-between gap-4">
                <p className="text-sm font-semibold text-brand-ink">{skill.label}</p>
                <p className="text-sm font-semibold text-brand-ink">{skill.percent}%</p>
              </div>
              <div className="h-[3px] w-full bg-[#e5e5e5]">
                <div
                  className="h-full bg-brand-ink transition-[width] duration-1000"
                  style={{ width: `${skill.percent}%` }}
                />
              </div>
            </div>
          ))}
          <p className="pt-2 text-sm text-brand-body">
            Prefer a deeper look?{" "}
            <Link href="/services" className="font-semibold text-brand-gold hover:underline">
              Explore our services
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
