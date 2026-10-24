import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";

export const metadata = {
  title: "Our Story",
  description: "The official story of LEFEMME and a letter from founder Cecilia.",
};

export default function OurStoryPage() {
  const { founder, whyLefemme } = brand;

  return (
    <main id="main">
      {/* Editorial Header */}
      <section className="relative h-[48vh] min-h-[340px]">
        <Image
          src="/images/editorial/peonies-row.jpg"
          alt="A row of soft blooming peonies"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest/30 backdrop-blur-[1px]" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ivory/90 font-medium">
              Our Story · LEFEMME
            </p>
            <h1 className="font-serif mt-2 text-5xl text-ivory sm:text-6xl font-light">
              Why Floral.
            </h1>
          </div>
        </div>
      </section>

      {/* Founder Letter & Brand Heart */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="border-l-2 border-burgundy/60 pl-6">
          <p className="text-xs uppercase tracking-[0.24em] text-burgundy font-semibold">
            Founder’s Letter
          </p>
          <h2 className="font-serif mt-2 text-3xl sm:text-4xl text-forest font-light">
            {founder.noteTitle}
          </h2>
        </div>

        <div className="mt-8 space-y-6 text-base sm:text-[17px] leading-8 text-ink-soft font-light">
          {founder.noteContent.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 border-t border-gold/30 pt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-taupe">With love,</p>
          <p className="font-script mt-2 text-4xl text-burgundy">{founder.name}</p>
          <p className="mt-1 text-xs text-taupe font-medium">{founder.title}</p>
        </div>

        {/* Editorial Visual Break */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xs border border-gold/40 shadow-md">
            <Image
              src="/images/editorial/burgundy-blooms.jpg"
              alt="Burgundy floral still life"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xs border border-gold/40 shadow-md">
            <Image
              src="/images/editorial/peonies-book.jpg"
              alt="Pink peonies resting on an open journal"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Why LEFEMME Pillars */}
        <div className="mt-20 border-t border-gold/30 pt-14">
          <p className="text-xs uppercase tracking-[0.28em] text-burgundy font-semibold text-center">
            The Philosophy
          </p>
          <h2 className="font-serif mt-2 text-3xl sm:text-4xl text-forest font-light text-center">
            Why LEFEMME
          </h2>
          <p className="mt-3 text-center text-sm text-ink-soft max-w-xl mx-auto">
            Flowers are our first love. But there’s so much more to LEFEMME. We believe you deserve a bag that’s feminine, colourful, thoughtfully made, and beautiful from every angle.
          </p>

          <div className="mt-10 space-y-8">
            {whyLefemme.map((pillar) => (
              <div
                key={pillar.numeral}
                className="border-b border-gold/25 pb-8 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-sm text-gold-soft font-semibold">
                    {pillar.numeral}
                  </span>
                  <h3 className="font-serif text-2xl text-forest font-medium">
                    {pillar.heading}
                  </h3>
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-burgundy font-medium">
                  {pillar.supporting}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center bg-forest px-8 text-[11px] uppercase tracking-[0.24em] text-ivory shadow-md transition-colors hover:bg-forest-soft"
            >
              Explore the Silhouettes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
