import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { brand } from "@/data/brand";

export function FounderNote() {
  const { founder } = brand;

  return (
    <section className="bg-forest py-20 text-ivory sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] max-w-[400px] overflow-hidden rounded-xs border border-gold/40 shadow-[0_16px_36px_rgba(0,0,0,0.3)]">
            <Image
              src="/images/editorial/dried-bouquet.jpg"
              alt="Floral bouquet representing LEFEMME's founder Cecilia"
              fill
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="object-cover"
            />
            <div
              className="pointer-events-none absolute inset-3 border border-ivory/25"
              aria-hidden="true"
            />
          </div>
        </Reveal>
        <div className="max-w-xl">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-gold-soft">
              <span className="text-ivory/40" aria-hidden="true">
                05
              </span>
              <span className="inline-block h-px w-6 bg-gold/60" aria-hidden="true" />
              A note from the founder
            </p>
            <h2 className="font-serif mt-4 text-[clamp(2rem,4vw,3.4rem)] leading-[1.1]">
              {founder.noteTitle}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-[15px] sm:text-base leading-relaxed text-ivory/85 font-light">
              <p>{founder.noteContent[0]}</p>
              <p>{founder.noteContent[1]}</p>
              <p>{founder.noteContent[4]}</p>
              <p>{founder.noteContent[7]}</p>
            </div>
            <div className="mt-8 border-t border-gold/30 pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-soft">
                With love,
              </p>
              <p className="font-script mt-1 text-3xl text-ivory">
                {founder.name}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
