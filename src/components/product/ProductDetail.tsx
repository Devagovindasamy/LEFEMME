"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/data/catalog";
import { formatDemoPrice } from "@/data/catalog";
import { brandFeatures } from "@/data/catalog";
import { DemoNote, DemoPrice } from "@/components/ui/DemoNote";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/cn";
import { SeenInBloom } from "@/components/product/SeenInBloom";
import { CustomerReviews } from "@/components/product/CustomerReviews";
import { ProductGallery } from "@/components/product/ProductGallery";

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

  // Sync color selection when clicking a gallery thumbnail
  function handleThumbnailClick(index: number) {
    setActiveImage(index);
    const clickedImage = product.images[index];
    if (clickedImage) {
      // Find matching color variant if one exists with this imageSrc
      const matchingColor = product.colors.find(
        (c) => c.imageSrc === clickedImage.src && c.available
      );
      if (matchingColor) {
        setColorSlug(matchingColor.slug);
      }
    }
  }

  // Sync gallery image when clicking a color swatch
  function handleColorSelect(slug: string) {
    setColorSlug(slug);
    const color = product.colors.find((c) => c.slug === slug);
    if (color?.imageSrc) {
      const imgIdx = product.images.findIndex((img) => img.src === color.imageSrc);
      if (imgIdx !== -1) {
        setActiveImage(imgIdx);
      }
    }
  }

  const galleryImage = product.images[activeImage] ?? product.images[0];
  const mainSrc = galleryImage?.src ?? selected?.imageSrc ?? "/images/placeholder-product.svg";
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
        <ProductGallery
          productName={product.name}
          category={product.category}
          images={product.images}
          activeImage={activeImage}
          mainSrc={mainSrc}
          mainAlt={galleryImage.alt}
          onSelectImage={handleThumbnailClick}
        />

        {/* Seen in Bloom ♡ and Customer Reviews repositioned beneath product gallery to utilize empty vertical space */}
        <div className="mt-12 space-y-12">
          <SeenInBloom productName={product.name} className="mt-0 pt-8" />
          <CustomerReviews productName={product.name} className="mt-0 pt-8" />
        </div>
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
          <p className="mt-1 text-xs text-taupe">
            {product.tentativePriceNote ?? "Tentative Launch Price"}
          </p>
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
                      onClick={() => handleColorSelect(color.slug)}
                      className={cn(
                        "inline-flex items-center gap-2 border px-3 py-2 text-sm transition-colors",
                        active
                          ? "border-forest bg-forest text-ivory shadow-xs"
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
        </div>

        {product.features && product.features.length > 0 ? (
          <div className="mt-10 border-t border-gold/30 pt-8">
            <h2 className="font-serif text-2xl text-forest">Thoughtful details</h2>
            <p className="mt-2 text-sm text-taupe">
              Crafted with intention for your everyday moments.
            </p>
            <ul className="mt-5 space-y-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="text-sm leading-6 text-ink-soft">
                  <span className="font-medium text-forest">{feature.feature}.</span>{" "}
                  {feature.description}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-10 border-t border-gold/30 pt-8">
            <h2 className="font-serif text-2xl text-forest">Thoughtful details</h2>
            <ul className="mt-5 space-y-3">
              {brandFeatures.map((feature) => (
                <li key={feature.id} className="text-sm leading-6 text-ink-soft">
                  <span className="font-medium text-forest">{feature.title}.</span>{" "}
                  {feature.body}
                </li>
              ))}
            </ul>
          </div>
        )}

        <dl className="mt-10 grid gap-4 border-t border-gold/30 pt-8 text-sm">
          {product.materials ? (
            <div>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-taupe">
                Materials & Construction
              </dt>
              <dd className="mt-1.5 space-y-1 text-ink-soft">
                {product.materials.exterior ? <p><strong>Exterior:</strong> {product.materials.exterior}</p> : null}
                {product.materials.interior ? <p><strong>Interior:</strong> {product.materials.interior}</p> : null}
                {product.materials.hardware ? <p><strong>Hardware:</strong> {product.materials.hardware}</p> : null}
                {product.materials.closure ? <p><strong>Closure:</strong> {product.materials.closure}</p> : null}
                {product.materials.decoration ? <p><strong>Artwork:</strong> {product.materials.decoration}</p> : null}
              </dd>
            </div>
          ) : null}
          {product.dimensions ? (
            <div>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-taupe">
                Dimensions & Specifications
              </dt>
              <dd className="mt-1.5 space-y-1 text-ink-soft">
                {product.dimensions.length ? <p><strong>Length:</strong> {product.dimensions.length}</p> : null}
                {product.dimensions.topWidth ? <p><strong>Top Width:</strong> {product.dimensions.topWidth} / Bottom Width: {product.dimensions.bottomWidth}</p> : null}
                {product.dimensions.height ? <p><strong>Height:</strong> {product.dimensions.height}</p> : null}
                {product.dimensions.depth ? <p><strong>Depth:</strong> {product.dimensions.depth}</p> : null}
                {product.dimensions.handleDrop ? <p><strong>Handle Drop:</strong> {product.dimensions.handleDrop}</p> : null}
                {product.dimensions.laptopCompatibility ? <p><strong>Compatibility:</strong> {product.dimensions.laptopCompatibility}</p> : null}
                {product.dimensions.hangingLength ? <p><strong>Hanging Length:</strong> {product.dimensions.hangingLength}</p> : null}
              </dd>
            </div>
          ) : null}
          <div>
            <dt className="text-[11px] uppercase tracking-[0.2em] text-taupe">
              Shipping & Delivery
            </dt>
            <dd className="mt-1 text-ink-soft">
              Both Cash on Delivery (COD) and online payment options available. Delivery across India.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
