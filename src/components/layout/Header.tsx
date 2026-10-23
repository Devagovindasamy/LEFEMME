"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { brand, navigation } from "@/data/brand";
import { products } from "@/data/catalog";
import { cartCount, useCartStore } from "@/store/cart";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const items = useCartStore((s) => s.items);
  const hasHydrated = useCartStore((s) => s.hasHydrated);
  const openCart = useCartStore((s) => s.openCart);
  const count = hasHydrated ? cartCount(items) : 0;

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMenuOpen(false);
      setSearchOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.category.includes(q))
      .slice(0, 6);
  }, [query]);

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-gold/25 bg-ivory/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-forest lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link
          href="/"
          className="font-serif text-[1.65rem] tracking-[0.18em] text-forest sm:text-[1.85rem]"
        >
          {brand.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[12px] uppercase tracking-[0.22em] text-ink-soft transition-colors hover:text-forest",
                pathname === item.href && "text-forest",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-forest"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center text-forest"
            aria-label={`Shopping bag, ${count} items`}
            onClick={openCart}
          >
            <ShoppingBag size={18} />
            {count > 0 ? (
              <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] text-ivory">
                {count}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen ? (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-gold/20 bg-paper"
          >
            <form
              onSubmit={submitSearch}
              className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6"
            >
              <Search size={16} className="text-taupe" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search handbags and charms"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-taupe"
                aria-label="Search the collection"
              />
              <button
                type="submit"
                className="text-[11px] uppercase tracking-[0.2em] text-forest"
              >
                Search
              </button>
            </form>
            {suggestions.length > 0 ? (
              <ul className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center justify-between py-2 text-sm text-ink-soft hover:text-forest"
                    >
                      <span>{product.name}</span>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-taupe">
                        {product.category}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[6.25rem] z-40 bg-ivory lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-8" aria-label="Mobile">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-gold/20 py-4 font-serif text-3xl text-forest"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/cart"
                className="border-b border-gold/20 py-4 font-serif text-3xl text-forest"
              >
                Shopping bag
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
