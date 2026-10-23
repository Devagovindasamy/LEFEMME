import Image from "next/image";
import { brand } from "@/data/brand";
import { Reveal } from "@/components/motion/Reveal";
import { DemoNote } from "@/components/ui/DemoNote";

/**
 * Editorial Campaign & Instagram Section
 * High-fashion moving postcards and visual atelier diary.
 */
export function BloomFilm() {
  return (
    <section aria-labelledby="bloom-film-title" className="bg-[#FAF7F2] py-20 sm:py-28 border-t border-gold/30">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-gold" aria-hidden="true" />
            <p className="text-[11px] uppercase tracking-[0.3em] text-burgundy font-medium">
              07 · The Atelier Journal
            </p>
          </div>
          <h2
            id="bloom-film-title"
            className="font-serif mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.08] text-forest font-light"
          >
            Moving postcards from the house.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft font-light">
            Behind-the-scenes glimpses from our Paris atelier, leathercraft close-ups, and seasonal floral
            arrangements. A visual diary curated for our Bloom Club members.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-ink-soft">
            <span className="text-[11px] uppercase tracking-[0.2em] text-taupe font-medium">Instagram</span>
            {brand.instagramUrl ? (
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-forest font-serif italic text-lg underline decoration-gold underline-offset-4 hover:text-burgundy"
              >
                {brand.instagramHandle ?? "@lefemme_official"}
              </a>
            ) : (
              <span className="text-forest font-serif italic text-lg">
                @lefemme_official <span className="text-xs font-sans not-italic text-taupe">(Coming soon)</span>
              </span>
            )}
          </div>
          <DemoNote className="mt-6">
            Lefemme official campaign and social moments.
          </DemoNote>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto max-w-[320px] sm:max-w-[360px] overflow-hidden rounded-xs border border-gold/40 bg-ivory p-3 shadow-xl">
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-forest-deep rounded-xs">
              <Image
                src="/images/editorial/peonies-white.jpg"
                alt="Editorial botanical campaign still"
                fill
                quality={90}
                sizes="(min-width: 640px) 360px, 90vw"
                className="object-cover transition-transform duration-700 hover:scale-104"
              />
              {/* Play / Editorial Badge Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent flex flex-col justify-end p-5 text-ivory">
                <span className="text-[10px] uppercase tracking-[0.22em] text-gold-soft font-medium">
                  Episode 01 · Paris
                </span>
                <p className="font-serif text-xl text-ivory font-light mt-1">
                  The Architecture of Bloom
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
