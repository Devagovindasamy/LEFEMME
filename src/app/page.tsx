import Link from "next/link";
import { BloomClubTeaser } from "@/components/home/BloomClubTeaser";
import { BloomFilm } from "@/components/home/BloomFilm";
import { CollectionTicker } from "@/components/home/CollectionTicker";
import { FloralStory } from "@/components/home/FloralStory";
import { FounderNote } from "@/components/home/FounderNote";
import { Hero } from "@/components/home/Hero";
import { EntranceGate } from "@/components/home/EntranceGate";
import { ThoughtfulDetails } from "@/components/home/ThoughtfulDetails";
import { Reveal } from "@/components/motion/Reveal";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BloomDiscovery } from "@/components/interactive/BloomDiscovery";
import { getCharms, getHandbags } from "@/data/catalog";
import { ensureCatalogSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureCatalogSeeded();
  const handbags = getHandbags();
  const charms = getCharms();

  return (
    <main id="main">
      <EntranceGate />
      <Hero />
      <CollectionTicker />

      <section id="collection" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              numeral="01"
              eyebrow="The collection"
              title="Five handbags, each a little bloom."
              body="Open a bag to explore colour, details, and the demo bag. Portraits stay still on hover — no surprise image swaps."
            />
          </Reveal>
          <div className="mt-12">
            <ProductGrid products={handbags} />
          </div>
          <Reveal className="mt-10 text-center">
            <Link
              href="/handbags"
              className="text-[11px] uppercase tracking-[0.22em] text-forest underline decoration-gold underline-offset-4"
            >
              View all handbags
            </Link>
          </Reveal>
        </div>
      </section>

      <FloralStory />
      <ThoughtfulDetails />

      <section className="bg-ivory-deep py-20 sm:py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <SectionHeading
                  align="left"
                  numeral="04"
                  eyebrow="A finishing touch"
                  title="Bag charms, for the Bloomies."
                  body="Heart, butterfly, bow, blueberry, and cherry — stitched leather companions. Hand-finished with gold-toned ring hardware."
                />
              </div>
              <div className="mt-3">
                <BloomDiscovery
                  quoteId="charm-play"
                  variant="ribbon"
                  label="Bloomie styling tip"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/charms"
                className="inline-flex h-11 shrink-0 items-center border border-forest/30 px-6 text-[11px] uppercase tracking-[0.2em] text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory"
              >
                View bag charms
              </Link>
            </Reveal>
          </div>
          <div className="mt-12">
            <ProductGrid products={charms} />
          </div>
        </div>
      </section>

      <FounderNote />
      <BloomClubTeaser />
      <BloomFilm />
    </main>
  );
}
