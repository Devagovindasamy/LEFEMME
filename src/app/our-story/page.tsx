import Image from "next/image";
import { DemoNote } from "@/components/ui/DemoNote";

export const metadata = {
  title: "Our Story",
  description: "Why Lefemme is floral — a placeholder brand story until client copy arrives.",
};

export default function OurStoryPage() {
  return (
    <main id="main">
      <section className="relative h-[46vh] min-h-[320px]">
        <Image
          src="/images/editorial/peonies-row.jpg"
          alt="A row of white peonies"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest/25" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-ivory">
              Our story
            </p>
            <h1 className="font-serif mt-2 text-5xl text-ivory sm:text-6xl">
              Why floral.
            </h1>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="font-serif text-3xl leading-snug text-forest">
          Lefemme is a feminine floral handbag house. The Bloom Club is its
          community — an invitation to belong, not a campaign to convert.
        </p>
        <p className="mt-6 text-base leading-8 text-ink-soft">
          This page is waiting for the client’s origin story. Until then, the
          direction is clear: 70% refined elegance, 30% playful personality.
          Structured silhouettes. Gold-toned hardware. Florals as a signature,
          never a costume.
        </p>
        <p className="mt-4 text-base leading-8 text-ink-soft">
          We have not invented a founder biography, a city of origin, or a
          manufacturing claim. Those details will live here when they are true.
        </p>
        <DemoNote className="mt-6">Placeholder copy for client replacement.</DemoNote>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/editorial/burgundy-blooms.jpg"
              alt="Burgundy floral still life"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/editorial/peonies-book.jpg"
              alt="Pink peonies resting on an open book"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
