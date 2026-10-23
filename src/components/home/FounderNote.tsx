import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { DemoNote } from "@/components/ui/DemoNote";

export function FounderNote() {
  return (
    <section className="bg-forest py-20 text-ivory sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] max-w-[400px] overflow-hidden">
            <Image
              src="/images/editorial/dried-bouquet.jpg"
              alt="Warm-toned dried floral bouquet, used as a stand-in until a founder portrait is supplied"
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
              This space is waiting for her voice.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-8 text-ivory/80">
              The founder’s name, portrait, and story have not been supplied for
              this demo. Until they are, this note remains an editable placeholder —
              a quiet page in the house, not an invented biography.
            </p>
            <DemoNote className="mt-6 !text-gold-soft">
              Placeholder founder copy. Do not publish as biography.
            </DemoNote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
