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
              {brand.supportingLine} Feminine floral handbags crafted in premium PU leather,
              featuring signature botanical artwork, thoughtful everyday pockets, and playful charms.
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

          {/* Right Column: Unified Campaign-Style Editorial Hero Scene (Inspired by The Label I Reference) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
            className="relative"
          >
            {/* The Single Unified Editorial Stage Container */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[200px] border border-gold/40 bg-gradient-to-b from-[#FCF9F3] via-[#FAF6EF] to-[#F3EAE0] p-4 sm:p-6 lg:p-7 shadow-[0_24px_50px_rgba(30,58,47,0.12)]">
              {/* Blooming Botanical Branches in Background (Inspired by The Label I Reference) */}
              <svg
                viewBox="0 0 600 360"
                className="pointer-events-none absolute inset-x-0 top-0 h-[68%] w-full select-none"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="bloomGlow" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stopColor="#F6EFE4" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FAF6EF" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Soft warm aura */}
                <circle cx="300" cy="160" r="160" fill="url(#bloomGlow)" />

                {/* Graceful Arching Blossom Branches */}
                <g stroke="#9E8365" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.6">
                  <path d="M 40 260 C 110 210, 180 140, 300 110 C 400 90, 480 80, 560 60" />
                  <path d="M 170 155 C 150 110, 110 80, 70 70" />
                  <path d="M 230 125 C 250 85, 280 55, 320 35" />
                  <path d="M 370 100 C 410 70, 450 50, 490 30" />
                  <path d="M 430 115 C 470 145, 510 170, 560 190" />
                </g>

                {/* Delicate Botanical Blossoms with 5 rounded petals & gold centers */}
                {[
                  { cx: 70, cy: 70, r: 12 },
                  { cx: 120, cy: 95, r: 10 },
                  { cx: 170, cy: 155, r: 13 },
                  { cx: 220, cy: 130, r: 11 },
                  { cx: 300, cy: 110, r: 14 },
                  { cx: 320, cy: 35, r: 10 },
                  { cx: 380, cy: 95, r: 12 },
                  { cx: 450, cy: 60, r: 11 },
                  { cx: 490, cy: 30, r: 13 },
                  { cx: 520, cy: 175, r: 11 },
                  { cx: 560, cy: 60, r: 10 },
                ].map((b, idx) => (
                  <g key={idx} transform={`translate(${b.cx}, ${b.cy})`}>
                    {[0, 72, 144, 216, 288].map((deg) => (
                      <ellipse
                        key={deg}
                        cx="0"
                        cy={-b.r * 0.7}
                        rx={b.r * 0.45}
                        ry={b.r * 0.65}
                        transform={`rotate(${deg})`}
                        fill="#FFFDF8"
                        stroke="#E8DEC8"
                        strokeWidth="0.8"
                      />
                    ))}
                    <circle cx="0" cy="0" r={b.r * 0.28} fill="#C6A15B" />
                  </g>
                ))}

                {/* Floating Petals Drifting in Breeze */}
                <g fill="#F5EFE6" stroke="#E2D4BC" strokeWidth="0.6" opacity="0.85">
                  <path d="M 140 180 C 135 174, 137 165, 144 163 C 149 168, 147 178, 140 180 Z" />
                  <path d="M 260 80 C 255 75, 257 66, 263 65 C 268 70, 266 79, 260 80 Z" />
                  <path d="M 350 140 C 344 135, 347 126, 353 125 C 358 130, 355 139, 350 140 Z" />
                  <path d="M 460 120 C 454 114, 457 105, 463 104 C 468 110, 465 119, 460 120 Z" />
                  <path d="M 510 90 C 505 85, 507 76, 513 75 C 518 80, 515 89, 510 90 Z" />
                </g>
              </svg>

              {/* Pedestal Grounding Horizon Line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-24 inset-x-8 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
              />

              {/* Mobile Presentation (< sm, e.g. 390px): Clean Vertical Campaign Arrangement */}
              <div className="sm:hidden relative z-10 space-y-4 pt-4">
                {/* Primary Focal Handbag: Adina */}
                <Link
                  href="/products/adina"
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative aspect-square w-full max-w-[220px] mx-auto rounded-xs border border-gold/40 bg-[#FAF6F0] p-3 shadow-md transition-all duration-300 group-hover:border-forest/60">
                    <Image
                      src="/images/client_products/Adina/forest-green.png"
                      alt="Adina Floral Shoulder Bag in Forest Green"
                      fill
                      priority
                      sizes="65vw"
                      className="object-contain object-center drop-shadow-md transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full border border-burgundy/25 bg-ivory/95 px-2.5 py-0.5 shadow-2xs">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-burgundy font-semibold">
                        Signature · 01
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="font-serif text-base text-forest font-medium">Adina Shoulder Bag</p>
                    <p className="text-[11px] text-ink-soft">Forest Bloom · Everyday Classic</p>
                    <span className="inline-block mt-0.5 text-[9px] uppercase tracking-[0.16em] text-burgundy font-medium underline decoration-gold/60 underline-offset-4">
                      Explore Piece →
                    </span>
                  </div>
                </Link>

                {/* Companion Silhouettes: Ariel & Noa */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {/* Ariel */}
                  <Link
                    href="/products/ariel"
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative aspect-square w-full rounded-xs border border-gold/30 bg-[#FAF6F0] p-2.5 shadow-xs transition-all duration-300 group-hover:border-gold">
                      <Image
                        src="/images/client_products/Ariel/Beige.png"
                        alt="Ariel Floral Medium Handbag in Ivory Bloom"
                        fill
                        sizes="40vw"
                        className="object-contain object-center drop-shadow-xs transition-transform duration-500 group-hover:scale-103"
                      />
                    </div>
                    <div className="mt-1.5">
                      <span className="text-[9px] uppercase tracking-[0.18em] text-taupe font-medium">02 · Curved</span>
                      <p className="font-serif text-xs text-forest font-medium">Ariel Handbag</p>
                    </div>
                  </Link>

                  {/* Noa */}
                  <Link
                    href="/products/noa"
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative aspect-square w-full rounded-xs border border-gold/30 bg-[#FAF6F0] p-2.5 shadow-xs transition-all duration-300 group-hover:border-gold">
                      <Image
                        src="/images/client_products/Noa/Black.png"
                        alt="Noa Structured Floral Shoulder Bag in Midnight Bloom"
                        fill
                        sizes="40vw"
                        className="object-contain object-center drop-shadow-xs transition-transform duration-500 group-hover:scale-103"
                      />
                    </div>
                    <div className="mt-1.5">
                      <span className="text-[9px] uppercase tracking-[0.18em] text-taupe font-medium">03 · Structured</span>
                      <p className="font-serif text-xs text-forest font-medium">Noa Shoulder Bag</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Tablet & Desktop Presentation (>= sm): Balanced 3-Silhouette Campaign Triad */}
              <div className="hidden sm:grid relative z-10 grid-cols-[0.9fr_1.2fr_0.9fr] items-end gap-3 sm:gap-4 lg:gap-5 pt-8 sm:pt-14">
                {/* Left: Ariel (Grounded on Plinth) */}
                <Link
                  href="/products/ariel"
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative aspect-square w-full rounded-xs border border-gold/35 bg-[#FAF6F0] p-2.5 sm:p-3 shadow-xs transition-all duration-300 group-hover:border-gold group-hover:shadow-md">
                    <Image
                      src="/images/client_products/Ariel/Beige.png"
                      alt="Ariel Floral Medium Handbag in Ivory Bloom"
                      fill
                      sizes="(min-width: 1024px) 15vw, 25vw"
                      className="object-contain object-center drop-shadow-sm transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-taupe font-medium">
                      02 · Curved Handbag
                    </span>
                    <p className="font-serif text-xs sm:text-sm text-forest font-medium group-hover:text-burgundy transition-colors mt-0.5">
                      Ariel · Ivory Bloom
                    </p>
                  </div>
                </Link>

                {/* Center: Adina (Elevated Primary Focal Silhouette) */}
                <Link
                  href="/products/adina"
                  className="group flex flex-col items-center text-center -translate-y-4 sm:-translate-y-6 lg:-translate-y-8"
                >
                  <div className="relative aspect-square w-full rounded-xs border-2 border-gold/60 bg-[#FAF6F0] p-3 sm:p-4 shadow-[0_14px_32px_rgba(30,58,47,0.14)] transition-all duration-300 group-hover:border-forest group-hover:shadow-[0_18px_40px_rgba(30,58,47,0.2)]">
                    <Image
                      src="/images/client_products/Adina/forest-green.png"
                      alt="Adina Floral Shoulder Bag in Forest Green with burgundy florals"
                      fill
                      priority
                      quality={95}
                      sizes="(min-width: 1024px) 22vw, 35vw"
                      className="object-contain object-center drop-shadow-md transition-transform duration-500 group-hover:scale-103"
                    />
                    {/* Focal badge */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 rounded-full border border-burgundy/25 bg-ivory/95 px-3 py-0.5 shadow-2xs whitespace-nowrap">
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-burgundy font-semibold">
                        Signature House Edition · 01
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-burgundy font-medium">
                      Everyday Shoulder Bag
                    </span>
                    <p className="font-serif text-sm sm:text-base text-forest font-medium group-hover:text-burgundy transition-colors mt-0.5">
                      Adina · Forest Bloom
                    </p>
                    <span className="mt-1 inline-flex text-[9px] uppercase tracking-[0.18em] text-forest group-hover:text-burgundy underline decoration-gold/60 underline-offset-4">
                      Explore Piece →
                    </span>
                  </div>
                </Link>

                {/* Right: Noa (Grounded on Plinth) */}
                <Link
                  href="/products/noa"
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative aspect-square w-full rounded-xs border border-gold/35 bg-[#FAF6F0] p-2.5 sm:p-3 shadow-xs transition-all duration-300 group-hover:border-gold group-hover:shadow-md">
                    <Image
                      src="/images/client_products/Noa/Black.png"
                      alt="Noa Structured Floral Shoulder Bag in Midnight Bloom"
                      fill
                      sizes="(min-width: 1024px) 15vw, 25vw"
                      className="object-contain object-center drop-shadow-sm transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-taupe font-medium">
                      03 · Structured Silhouette
                    </span>
                    <p className="font-serif text-xs sm:text-sm text-forest font-medium group-hover:text-burgundy transition-colors mt-0.5">
                      Noa · Midnight Bloom
                    </p>
                  </div>
                </Link>
              </div>

              {/* Integrated Campaign Footer Bar */}
              <div className="relative z-10 mt-6 sm:mt-8 flex items-center justify-between border-t border-gold/30 bg-ivory/60 px-3.5 sm:px-4 py-3 backdrop-blur-xs rounded-xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-[10px] text-ivory font-serif">
                    L
                  </span>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.22em] text-burgundy font-semibold">
                      LEFEMME Atelier Campaign
                    </p>
                    <p className="text-[11px] text-forest font-light">
                      Three Signature Silhouettes · Handcrafted PU Leather
                    </p>
                  </div>
                </div>
                <BloomDiscovery quoteId="hero-annotation" variant="tag" label="Atelier Note" align="right" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
