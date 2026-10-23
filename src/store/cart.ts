"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  category: "handbag" | "charm";
  imageSrc: string;
  colorName: string;
  colorSlug: string;
  unitPriceCents: number;
  priceIsDemo: true;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, colorSlug: string) => void;
  setQuantity: (productId: string, colorSlug: string, quantity: number) => void;
  clear: () => void;
  setHasHydrated: (value: boolean) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
      addItem: (item, quantity = 1) => {
        const qty = Math.max(1, Math.min(12, Math.floor(quantity)));
        const existing = get().items.find(
          (row) => row.productId === item.productId && row.colorSlug === item.colorSlug,
        );
        if (existing) {
          set({
            items: get().items.map((row) =>
              row.productId === item.productId && row.colorSlug === item.colorSlug
                ? { ...row, quantity: Math.min(12, row.quantity + qty) }
                : row,
            ),
            isOpen: true,
          });
          return;
        }
        set({
          items: [...get().items, { ...item, quantity: qty }],
          isOpen: true,
        });
      },
      removeItem: (productId, colorSlug) => {
        set({
          items: get().items.filter(
            (row) => !(row.productId === productId && row.colorSlug === colorSlug),
          ),
        });
      },
      setQuantity: (productId, colorSlug, quantity) => {
        const next = Math.floor(quantity);
        if (next < 1) {
          get().removeItem(productId, colorSlug);
          return;
        }
        set({
          items: get().items.map((row) =>
            row.productId === productId && row.colorSlug === colorSlug
              ? { ...row, quantity: Math.min(12, next) }
              : row,
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    {
      name: "lefemme-cart",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
}
