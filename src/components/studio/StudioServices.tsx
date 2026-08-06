import { STUDIO_SERVICES } from "@/lib/constants";

/** Editorial services grid — categories + offerings. */
export function StudioServices() {
  return (
    <section id="work" className="scroll-mt-24 border-t border-brand-line bg-brand-white px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-brand-muted">What we do</p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-brand-black sm:text-5xl md:text-6xl">
              Services
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-brand-muted md:text-right">
            Design, photography, video, web, print, and fashion — crafted as one creative system.
          </p>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {STUDIO_SERVICES.map((service, index) => (
            <article
              key={service.id}
              className="border-t border-brand-black pt-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl font-medium tracking-tight text-brand-black md:text-[1.75rem]">
                  {service.title}
                </h3>
                <span className="font-sans text-xs tracking-[0.16em] text-brand-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {service.items.map((item) => (
                  <li key={item} className="text-sm text-brand-muted md:text-[15px]">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
