"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDemoPrice } from "@/data/catalog";
import { DemoNote } from "@/components/ui/DemoNote";
import { cartCount, cartSubtotal, useCartStore } from "@/store/cart";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const count = cartCount(items);
  const subtotal = cartSubtotal(items);

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">
        Shopping bag
      </p>
      <h1 className="font-serif mt-3 text-5xl text-forest">Your bag</h1>
      <DemoNote className="mt-3">Demo cart — no live inventory.</DemoNote>

      {!hasHydrated ? (
        <p className="mt-12 text-ink-soft">Loading bag…</p>
      ) : items.length === 0 ? (
        <div className="mt-12 border border-gold/30 bg-paper px-8 py-16 text-center">
          <p className="font-serif text-3xl text-forest">Nothing here yet.</p>
          <p className="mt-3 text-ink-soft">The collection is five handbags and five charms.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-12 items-center bg-forest px-6 text-[11px] uppercase tracking-[0.2em] text-ivory"
          >
            Shop the collection
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
          <ul>
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.colorSlug}`}
                className="flex gap-4 border-b border-gold/25 py-6"
              >
                <Link
                  href={`/products/${item.slug}`}
                  className="relative h-28 w-24 shrink-0 bg-ivory-deep"
                >
                  <Image src={item.imageSrc} alt="" fill className="object-contain p-2" />
                </Link>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/products/${item.slug}`} className="font-serif text-2xl text-forest">
                        {item.name}
                      </Link>
                      <p className="text-sm text-taupe">{item.colorName}</p>
                    </div>
                    <p>{formatDemoPrice(item.unitPriceCents * item.quantity)}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="inline-flex items-center border border-gold/40">
                      <button
                        type="button"
                        className="h-9 w-9"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() =>
                          setQuantity(item.productId, item.colorSlug, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        className="h-9 w-9"
                        aria-label={`Increase ${item.name}`}
                        onClick={() =>
                          setQuantity(item.productId, item.colorSlug, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-[11px] uppercase tracking-[0.16em] text-taupe"
                      onClick={() => removeItem(item.productId, item.colorSlug)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit border border-gold/30 bg-paper p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-taupe">
              {count} {count === 1 ? "piece" : "pieces"}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span>Subtotal</span>
              <span className="text-xl">{formatDemoPrice(subtotal)}</span>
            </div>
            <DemoNote className="mt-2">Demo prices only.</DemoNote>
            <Link
              href="/checkout"
              className="mt-6 flex h-12 items-center justify-center bg-forest text-[11px] uppercase tracking-[0.22em] text-ivory"
            >
              Continue to demo checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
