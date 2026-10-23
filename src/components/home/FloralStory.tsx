import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DemoNote } from "@/components/ui/DemoNote";
import { BloomDiscovery } from "@/components/interactive/BloomDiscovery";

export function FloralStory() {
  return (
    <section className="bg-paper py-20 sm:py-28 relative overflow-hidden">
      {/* Decorative background aura */}
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blush/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-8">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto aspect-[3/4] max-w-[380px] overflow-hidden rounded-t-[140px] border border-gold/30 shadow-[0_12px_32px_rgba(30,58,47,0.06)]">
            <Image
              src="/images/editorial/peonies-white.jpg"
              alt="Cream peonies with dew, photographed in soft light"
              fill
              sizes="(min-width: 1024px) 36vw, 100vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Bloom Discovery Petal Touchpoint */}
            <div className="absolute bottom-4 right-4 z-10">
              <BloomDiscovery
                quoteId="botanical-whisper"
                variant="petal"
                align="left"
                label="Discover floral note"
              />
            </div>
          </div>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.2em] text-taupe">
            Peonies, in soft light · The floral signature
          </p>
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionHeading
              align="left"
              numeral="02"
              eyebrow="Why floral"
              title="A signature, not a motif."
              body="Floral is the Lefemme handwriting — romantic without becoming costume, detailed without becoming busy. Each bag is designed to feel like a small garden you can carry."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="mt-8 border-l-2 border-burgundy/60 pl-5">
              <p className="font-serif text-2xl italic leading-snug text-forest">
                “Elegant first. Playful always.”
              </p>
              <cite className="mt-2 block text-[11px] uppercase not-italic tracking-[0.2em] text-taupe">
                The house balance — 70 / 30
              </cite>
            </blockquote>
          </Reveal>
          <Reveal delay={0.16}>
            <DemoNote className="mt-6">
              Placeholder brand copy — replace with client-approved story.
            </DemoNote>
            <Link
              href="/our-story"
              className="mt-6 inline-flex h-11 items-center border-b border-forest text-[11px] uppercase tracking-[0.2em] text-forest transition-colors hover:border-gold hover:text-burgundy"
            >
              Read our story
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
