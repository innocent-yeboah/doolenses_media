import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { WHY_CHOOSE } from "@/lib/constants";

export function WhyChoose() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Doolenses difference"
          title="Why Choose Doolenses"
          description="Ready to make your vision reality? We bring events to life with expert production."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {WHY_CHOOSE.map((item) => (
            <article key={item.title} className="flex gap-4 border-l border-brand-gold/40 pl-5">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
              <div>
                <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-slate md:text-base">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/quote" size="lg">
            Get a Free Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
