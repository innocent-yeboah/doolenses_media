import Image from "next/image";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="border-y border-white/10 bg-brand-surface/50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Client voices"
          title="Trusted by Creative People"
          description="Leaders, families, and organisations who chose Doolenses for their defining moments."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <blockquote
              key={item.name}
              className="relative border border-white/10 bg-brand-navy/40 p-6"
            >
              <Quote className="mb-4 h-6 w-6 text-brand-gold/70" aria-hidden />
              <p className="text-sm leading-relaxed text-brand-muted">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  {/* CLIENT: Replace with real client portraits (with permission) */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <cite className="not-italic font-semibold text-white">{item.name}</cite>
                  <p className="text-xs text-brand-slate">{item.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
