import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
          <div className="mx-auto max-w-[380px]">
            {/* Arched Floral Image Container - strictly clips only the photo hover-zoom */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[140px] border border-gold/30 shadow-[0_12px_32px_rgba(30,58,47,0.06)]">
              <Image
                src="/images/editorial/peonies-white.jpg"
                alt="Cream peonies with dew, photographed in soft light"
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Floral Signature Caption & Botanical Whisper Touchpoint */}
            <div className="mt-4 flex flex-col items-center gap-2.5">
              <p className="text-center text-[11px] uppercase tracking-[0.2em] text-taupe">
                Peonies, in soft light · The floral signature
              </p>
              <BloomDiscovery
                quoteId="botanical-whisper"
                variant="petal"
                placement="inline"
                align="center"
                label="Discover floral note"
              />
            </div>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <SectionHeading
              align="left"
              numeral="02"
              eyebrow="Why floral"
              title="A signature, not a motif."
              body="I’ve always loved flowers. And I’ve always loved the idea of carrying a little bit of that beauty with me."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <blockquote className="mt-6 border-l-2 border-burgundy/60 pl-5">
              <p className="font-serif text-2xl italic leading-snug text-forest">
                “Elegant first. Playful always.”
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-6 space-y-4 text-[15px] leading-7 text-ink-soft">
              <p>
                But whenever I looked for a floral handbag, I could never quite find what I was looking for. Something colourful, something feminine, something beautiful without being too expensive.
              </p>
              <p>
                And I thought, surely I can’t be the only girl who feels this way?
              </p>
              <p className="font-serif italic text-forest">
                That’s how LEFEMME began.
              </p>
              <p>
                Not because the world needed another handbag brand, but because I wanted to create something I would genuinely love, and hoped that somewhere out there, another girl would love it too.
              </p>
            </div>

            <div className="mt-6 border-t border-gold/20 pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-taupe">
                With love,
              </p>
              <p className="font-serif text-lg text-burgundy">
                Cecilia ♡
              </p>
            </div>

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
