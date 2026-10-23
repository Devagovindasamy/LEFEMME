"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { formatDemoPrice } from "@/data/catalog";
import {
  cartCount,
  cartSubtotal,
  useCartStore,
} from "@/store/cart";
import { DemoNote } from "@/components/ui/DemoNote";

export function CartDrawer() {
  const reduceMotion = useReducedMotion();
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const count = cartCount(items);
  const subtotal = cartSubtotal(items);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Close shopping bag"
            className="fixed inset-0 z-50 bg-ink/35"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-ivory shadow-2xl"
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-gold/30 px-5 py-4">
              <h2 id="cart-title" className="font-serif text-2xl text-forest">
                Shopping bag
                <span className="ml-2 text-base text-taupe">({count})</span>
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex h-10 w-10 items-center justify-center text-forest"
                aria-label="Close shopping bag"
              >
                <X size={18} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <p className="font-serif text-3xl text-forest">Your bag is empty</p>
                <p className="mt-3 text-sm text-ink-soft">
                  The collection is waiting — five handbags, five charms.
                </p>
                <Link
                  href="/handbags"
                  onClick={closeCart}
                  className="mt-6 bg-forest px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory"
                >
                  Discover handbags
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-5 py-5">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.colorSlug}`}
                      className="flex gap-4 border-b border-gold/20 py-4"
                    >
                      <div className="relative h-24 w-20 shrink-0 bg-ivory-deep">
                        <Image
                          src={item.imageSrc}
                          alt=""
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={closeCart}
                              className="font-serif text-xl text-forest"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-taupe">{item.colorName}</p>
                          </div>
                          <p className="text-sm">
                            {formatDemoPrice(item.unitPriceCents * item.quantity)}
                          </p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-gold/40">
                            <button
                              type="button"
                              className="h-8 w-8 text-forest"
                              aria-label={`Decrease ${item.name}`}
                              onClick={() =>
                                setQuantity(
                                  item.productId,
                                  item.colorSlug,
                                  item.quantity - 1,
                                )
                              }
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="h-8 w-8 text-forest"
                              aria-label={`Increase ${item.name}`}
                              onClick={() =>
                                setQuantity(
                                  item.productId,
                                  item.colorSlug,
                                  item.quantity + 1,
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="text-[11px] uppercase tracking-[0.16em] text-taupe hover:text-burgundy"
                            onClick={() =>
                              removeItem(item.productId, item.colorSlug)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gold/30 px-5 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-taupe">
                      Subtotal
                    </span>
                    <span className="text-lg">{formatDemoPrice(subtotal)}</span>
                  </div>
                  <DemoNote className="mt-2">Demo prices only.</DemoNote>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-4 flex h-12 items-center justify-center bg-forest text-[11px] uppercase tracking-[0.22em] text-ivory"
                  >
                    Demo checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="mt-3 flex h-11 items-center justify-center border border-gold/40 text-[11px] uppercase tracking-[0.2em] text-forest"
                  >
                    View bag
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
