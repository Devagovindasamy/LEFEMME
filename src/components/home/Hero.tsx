"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { brand } from "@/data/brand";
import { getHandbags } from "@/data/catalog";
import { BloomDiscovery } from "@/components/interactive/BloomDiscovery";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const handbags = getHandbags();
  const heroBag = handbags[0] ?? { name: "Adina", slug: "adina", tagline: "A wine-red bloom, carried close." };

  return (
    <section className="relative overflow-hidden bg-[#FAF6F0] border-b border-gold/30">
      {/* Background Editorial Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 select-none opacity-[0.035] font-serif text-[38vw] leading-none text-forest"
      >
        L
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Editorial Typography & Actions */}
          <div className="flex flex-col justify-center">
            {/* Super-title / Kicker */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              <p className="text-[11px] uppercase tracking-[0.32em] text-burgundy font-medium">
                Atelier Collection · {brand.community}
              </p>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="font-serif mt-5 text-[clamp(2.75rem,5.2vw,4.8rem)] font-light leading-[1.04] text-forest"
            >
              Carry a <span className="italic font-normal text-burgundy">Little Bloom.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
              className="mt-6 max-w-lg text-[16px] sm:text-[17px] leading-relaxed text-ink-soft font-light"
            >
              {brand.supportingLine} Handcrafted botanical handbags sculpted in rich
              full-grain leather, embroidered with floral motifs, and complemented by artisanal bag charms.
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/shop"
                className="inline-flex h-13 items-center justify-center bg-forest px-8 text-[11px] uppercase tracking-[0.24em] text-ivory shadow-[0_8px_20px_rgba(30,58,47,0.2)] transition-all hover:bg-forest-soft hover:shadow-[0_12px_28px_rgba(30,58,47,0.3)] active:scale-[0.98]"
              >
                Explore Collection
              </Link>
              <a
                href="#collection"
                className="inline-flex h-13 items-center justify-center border border-gold/60 bg-transparent px-7 text-[11px] uppercase tracking-[0.22em] text-forest transition-colors hover:border-forest hover:bg-ivory/60"
              >
                The Five Silhouettes
              </a>
            </motion.div>

            {/* Micro Navigation for the 5 Silhouettes */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="mt-12 border-t border-gold/30 pt-6"
            >
              <p className="text-[10px] uppercase tracking-[0.26em] text-taupe font-medium">
                Signature House Editions
              </p>
              <nav aria-label="Quick bag silhouettes" className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                {handbags.map((bag, i) => (
                  <Link
                    key={bag.id}
                    href={`/products/${bag.slug}`}
                    className="group inline-flex items-center gap-1.5 text-sm font-serif text-forest/90 transition-colors hover:text-burgundy"
                  >
                    <span className="text-[10px] text-gold font-sans">0{i + 1}</span>
                    <span className="underline decoration-gold/40 underline-offset-4 group-hover:decoration-burgundy">
                      {bag.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Right Column: Hero Fashion Editorial Image */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
            className="relative"
          >
            {/* Decorative Architectural Framing */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none overflow-hidden rounded-sm border border-gold/40 bg-ivory shadow-[0_20px_50px_rgba(30,58,47,0.14)]">
              {/* Product Visual */}
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-ivory-deep">
                <Image
                  src="/images/products/adina.jpg"
                  alt="Lefemme Adina structured handbag in burgundy with gold hardware"
                  fill
                  priority
                  quality={92}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-103"
                />
              </div>

              {/* Editorial Caption Bar */}
              <div className="flex items-center justify-between border-t border-gold/30 bg-ivory px-5 py-4">
                <div>
                  <p className="font-serif text-lg text-forest font-medium">{heroBag.name}</p>
                  <p className="text-xs text-ink-soft">{heroBag.tagline}</p>
                </div>
                <Link
                  href={`/products/${heroBag.slug}`}
                  className="text-[10px] uppercase tracking-[0.2em] text-burgundy font-medium underline decoration-gold underline-offset-4 hover:text-forest"
                >
                  View Details →
                </Link>
              </div>
            </div>

            {/* Floating Luxury Tag */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
              className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 hidden sm:flex items-center gap-3 border border-gold/50 bg-ivory/95 px-4 py-3 shadow-lg backdrop-blur"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest text-[11px] text-ivory font-serif">
                L
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-forest font-semibold">
                  Handcrafted Edition
                </p>
                <p className="text-[11px] text-taupe">Vegetable-tanned leather & brass</p>
              </div>
              <div className="border-l border-gold/40 pl-3 ml-1">
                <BloomDiscovery quoteId="hero-annotation" variant="tag" label="Atelier Note" align="left" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
