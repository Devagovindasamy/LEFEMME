"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Product } from "@/data/catalog";
import { formatDemoPrice } from "@/data/catalog";
import { DemoPrice } from "@/components/ui/DemoNote";
import { BloomDiscovery } from "@/components/interactive/BloomDiscovery";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const image = product.images[0];
  const isCharm = product.category === "charm";
  const availableColors = product.colors.filter((color) => color.available);

  return (
    <article className="group flex flex-col justify-between">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Product Visual Frame */}
        <div
          className={`relative overflow-hidden rounded-xs border border-gold/30 bg-[#FBF8F3] transition-colors duration-300 group-hover:border-forest/60 ${
            isCharm ? "aspect-square" : "aspect-[4/3]"
          }`}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className={isCharm ? "object-cover" : "object-cover"}
              priority={priority}
            />
          </motion.div>

          {/* Subtle Discovery Pin for Selected Silhouettes */}
          {(product.id === "adina" || product.id === "hadar") && (
            <div className="absolute top-2.5 right-2.5 z-10" onClick={(e) => e.stopPropagation()}>
              <BloomDiscovery
                quoteId={product.id === "adina" ? "adina-detail" : "hadar-detail"}
                variant="seal"
                align="right"
                label={`${product.name} Atelier Note`}
              />
            </div>
          )}

          {/* Quick Hover Tag */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:hidden">
            <span className="bg-forest/95 px-4 py-1.5 text-[9px] uppercase tracking-[0.24em] text-ivory backdrop-blur shadow-sm">
              Discover Piece
            </span>
          </div>
        </div>

        {/* Product Header & Info */}
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-forest font-light group-hover:text-burgundy transition-colors">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-ink-soft line-clamp-1">{product.tagline}</p>
          </div>
          <DemoPrice
            amount={formatDemoPrice(product.priceCents)}
            className="shrink-0 text-sm font-medium text-ink"
          />
        </div>
      </Link>

      {/* Colour Swatches (if available) */}
      {availableColors.length > 0 ? (
        <ul className="mt-3 flex items-center gap-2" aria-label="Available colours">
          {availableColors.map((color) => (
            <li key={color.slug}>
              <span
                className="block h-3.5 w-3.5 rounded-full border border-ink/20 shadow-xs transition-transform hover:scale-120"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                <span className="sr-only">{color.name}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
