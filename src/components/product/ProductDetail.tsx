"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/data/catalog";
import { formatDemoPrice } from "@/data/catalog";
import { brandFeatures } from "@/data/catalog";
import { DemoNote, DemoPrice } from "@/components/ui/DemoNote";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/cn";

export function ProductDetail({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const availableColors = product.colors.filter((color) => color.available);
  const [colorSlug, setColorSlug] = useState(availableColors[0]?.slug ?? "");
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const selected = useMemo(
    () => product.colors.find((color) => color.slug === colorSlug),
    [colorSlug, product.colors],
  );

  const galleryImage = product.images[activeImage] ?? product.images[0];
  const mainSrc = selected?.imageSrc ?? galleryImage.src;
  const imageComingSoon = Boolean(selected && !selected.imageSrc);

  function add() {
    if (!selected?.available) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        imageSrc: mainSrc,
        colorName: selected.name,
        colorSlug: selected.slug,
        unitPriceCents: product.priceCents,
        priceIsDemo: true,
      },
      quantity,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <div>
        <div
          className={cn(
            "product-frame relative overflow-hidden rounded-xs border border-gold/40 bg-[#FBF8F3] shadow-sm",
            product.category === "charm" ? "aspect-square" : "aspect-[4/3]"
          )}
        >
          <Image
            src={mainSrc}
            alt={galleryImage.alt}
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
        </div>
        {product.images.length > 1 ? (
          <ul className="mt-3 flex gap-2">
            {product.images.map((image, index) => (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View image ${index + 1} of ${product.name}`}
                  aria-pressed={activeImage === index}
                  className={cn(
                    "relative h-20 w-16 overflow-hidden border bg-ivory-deep",
                    activeImage === index ? "border-forest" : "border-gold/30",
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    className="object-contain p-1"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-xs text-taupe">
            Additional gallery images will appear here when supplied.
          </p>
        )}
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">
          {product.category === "handbag" ? "Handbag" : "Bag charm"}
        </p>
        <h1 className="font-serif mt-3 text-5xl text-forest sm:text-6xl">
          {product.name}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">{product.tagline}</p>
        <div className="mt-5">
          <DemoPrice
            amount={formatDemoPrice(product.priceCents)}
            className="text-xl text-ink"
          />
          <DemoNote className="mt-2">Demo price — not confirmed retail.</DemoNote>
        </div>

        <div className="mt-8 space-y-6">
          {product.colors.length > 0 ? (
            <fieldset>
              <legend className="text-[11px] uppercase tracking-[0.22em] text-taupe">
                Colour
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((color) => {
                  const active = color.slug === colorSlug;
                  return (
                    <button
                      key={color.slug}
                      type="button"
                      disabled={!color.available}
                      onClick={() => setColorSlug(color.slug)}
                      className={cn(
                        "inline-flex items-center gap-2 border px-3 py-2 text-sm transition-colors",
                        active
                          ? "border-forest bg-forest text-ivory"
                          : "border-gold/40 text-ink hover:border-forest",
                        !color.available && "cursor-not-allowed opacity-40",
                      )}
                      aria-pressed={active}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-white/30"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                      {!color.available ? " — coming soon" : null}
                    </button>
                  );
                })}
              </div>
              {imageComingSoon ? (
                <p className="mt-2 text-xs text-taupe">
                  Photography for {selected?.name} is coming soon. The current
                  image remains until a matching asset is supplied.
                </p>
              ) : null}
            </fieldset>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center border border-gold/40">
              <button
                type="button"
                className="h-12 w-12 text-lg text-forest"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                −
              </button>
              <input
                aria-label="Quantity"
                className="h-12 w-12 bg-transparent text-center text-sm outline-none"
                value={quantity}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  if (Number.isNaN(next)) return;
                  setQuantity(Math.min(12, Math.max(1, next)));
                }}
              />
              <button
                type="button"
                className="h-12 w-12 text-lg text-forest"
                aria-label="Increase quantity"
                onClick={() => setQuantity((value) => Math.min(12, value + 1))}
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={add}
              disabled={!selected?.available}
              className="h-12 min-w-[12rem] flex-1 bg-forest px-8 text-[11px] uppercase tracking-[0.22em] text-ivory transition-colors hover:bg-forest-soft disabled:opacity-50"
            >
              {added ? "Added to bag" : "Add to bag"}
            </button>
          </div>
        </div>

        <div className="mt-10 space-y-4 text-[15px] leading-7 text-ink-soft">
          <p>{product.description}</p>
          {product.charmNote ? <p>{product.charmNote}</p> : null}
          <DemoNote>Placeholder copy — replace with client-approved text.</DemoNote>
        </div>

        <div className="mt-10 border-t border-gold/30 pt-8">
          <h2 className="font-serif text-2xl text-forest">Thoughtful details</h2>
          <p className="mt-2 text-sm text-taupe">
            Presented as Lefemme brand features until confirmed per product.
          </p>
          <ul className="mt-5 space-y-3">
            {brandFeatures.map((feature) => (
              <li key={feature.id} className="text-sm leading-6 text-ink-soft">
                <span className="font-medium text-forest">{feature.title}.</span>{" "}
                {feature.body}
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-10 grid gap-4 border-t border-gold/30 pt-8 text-sm">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.2em] text-taupe">
              Materials
            </dt>
            <dd className="mt-1 text-ink-soft">Details coming soon.</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.2em] text-taupe">
              Dimensions
            </dt>
            <dd className="mt-1 text-ink-soft">Details coming soon.</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.2em] text-taupe">
              Shipping & returns
            </dt>
            <dd className="mt-1 text-ink-soft">
              Policy pages are placeholders until Lefemme confirms terms.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
