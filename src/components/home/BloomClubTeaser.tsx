import Link from "next/link";
import { brand } from "@/data/brand";
import { Reveal } from "@/components/motion/Reveal";
import { NewsletterForm } from "@/components/bloom/NewsletterForm";
import { BloomDiscovery } from "@/components/interactive/BloomDiscovery";

export function BloomClubTeaser() {
  return (
    <section className="border-y border-gold/30 bg-blush/40 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <Reveal>
          <div className="flex items-center justify-center gap-2">
            <p className="text-[11px] uppercase tracking-[0.28em] text-taupe">
              06 · The community
            </p>
            <BloomDiscovery
              quoteId="community-note"
              variant="tag"
              label="Secret"
              align="center"
            />
          </div>
          <p className="font-script mt-3 text-4xl text-burgundy sm:text-5xl">
            {brand.community}
          </p>
          <h2 className="font-serif mt-3 text-[clamp(2rem,4vw,3.2rem)] text-forest">
            {brand.bloomClub.headline}
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-soft">
            {brand.bloomClub.invite} {brand.bloomClub.whisper}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-2 max-w-md text-left">
            <NewsletterForm source="homepage" />
          </div>
          <Link
            href="/bloom-club"
            className="mt-6 inline-flex text-[11px] uppercase tracking-[0.2em] text-forest underline decoration-gold/70 underline-offset-4"
          >
            Visit the Bloom Club
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
