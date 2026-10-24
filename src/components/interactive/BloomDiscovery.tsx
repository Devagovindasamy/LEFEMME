"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { getQuoteById, BloomDiscoveryQuote } from "@/data/quotes";
import { cn } from "@/lib/cn";

interface BloomDiscoveryProps {
  quoteId: string;
  variant?: "seal" | "tag" | "petal" | "ribbon" | "whisper";
  className?: string;
  label?: string;
  align?: "left" | "right" | "center";
  placement?: "top" | "bottom" | "inline";
}

export function BloomDiscovery({
  quoteId,
  variant = "petal",
  className = "",
  label,
  align = "right",
  placement = "top",
}: BloomDiscoveryProps) {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const quote: BloomDiscoveryQuote = getQuoteById(quoteId);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const isInline = placement === "inline";
  const alignmentClass =
    align === "left"
      ? "left-0 sm:left-2"
      : align === "center"
      ? "left-1/2 -translate-x-1/2"
      : "right-0 sm:right-2";

  const positionClass =
    placement === "inline"
      ? "mt-3 w-full max-w-sm"
      : placement === "bottom"
      ? `absolute z-50 top-full mt-2 w-[min(280px,calc(100vw-2rem))] sm:w-72 ${alignmentClass}`
      : `absolute z-50 bottom-full mb-3 w-[min(280px,calc(100vw-2rem))] sm:w-72 ${alignmentClass}`;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative",
        isInline ? "w-full flex flex-col items-center" : "inline-block",
        className
      )}
    >
      {/* Trigger Variants */}
      {variant === "seal" && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={label ?? "Discover an atelier whisper"}
          className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-gold/70 bg-[#162B22]/90 shadow-md backdrop-blur transition-all duration-300 hover:scale-110 hover:border-gold hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gold"
        >
          <span className="h-2 w-2 rotate-45 bg-gold group-hover:rotate-90 transition-transform duration-300" />
          <span className="sr-only">{label ?? "Open note"}</span>
        </button>
      )}

      {variant === "whisper" && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="group inline-flex items-center gap-1.5 rounded-full border border-burgundy/20 bg-ivory/90 px-3.5 py-1 text-left shadow-xs transition hover:border-burgundy/45 hover:bg-white"
        >
          <Sparkles className="h-3 w-3 text-gold" />
          <span className="font-script text-lg leading-none text-burgundy">
            {label ?? "psst… open the gate"}
          </span>
        </button>
      )}

      {variant === "tag" && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={label ?? "Read silhouette note"}
          className="group inline-flex items-center gap-1.5 border border-gold/40 bg-ivory/90 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-forest shadow-xs backdrop-blur transition-all hover:border-forest hover:bg-ivory"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-burgundy/80 group-hover:scale-125 transition-transform" />
          <span>{label ?? "Note"}</span>
        </button>
      )}

      {variant === "petal" && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={label ?? "Reveal botanical whisper"}
          className={cn(
            "group relative flex items-center justify-center rounded-full border border-gold/50 bg-[#FAF6F0] text-burgundy shadow-xs transition-all duration-300 hover:scale-105 hover:border-burgundy hover:bg-ivory focus-visible:ring-2 focus-visible:ring-burgundy",
            label ? "gap-2 px-3.5 py-1.5" : "h-7 w-7"
          )}
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current transition-transform duration-300 group-hover:rotate-45" aria-hidden="true">
            <path d="M10 2 C 10 2, 13 6, 13 10 C 13 14, 10 18, 10 18 C 10 18, 7 14, 7 10 C 7 6, 10 2, 10 2 Z" />
            <path d="M2 10 C 2 10, 6 7, 10 7 C 14 7, 18 10, 18 10 C 18 10, 14 13, 10 13 C 6 13, 2 10, 2 10 Z" />
          </svg>
          {label ? (
            <span className="text-[10px] uppercase tracking-[0.18em] text-forest font-medium">
              {label}
            </span>
          ) : (
            <span className="sr-only">Botanical note</span>
          )}
        </button>
      )}

      {variant === "ribbon" && (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={label ?? "Read Bloomie styling note"}
          className="group inline-flex items-center gap-2 border-b border-gold/70 pb-0.5 text-[10px] uppercase tracking-[0.22em] text-burgundy transition-colors hover:text-forest hover:border-forest"
        >
          <Sparkles size={11} className="text-gold group-hover:rotate-12 transition-transform" />
          <span>{label ?? "Styling Whisper"}</span>
        </button>
      )}

      {/* Discovery Note Card (Pop-over or Inline Reveal) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label={quote.authorNote}
            initial={
              reduceMotion
                ? false
                : isInline
                ? { opacity: 0, y: -6 }
                : { opacity: 0, y: placement === "bottom" ? -8 : 8, scale: 0.95 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : isInline
                ? { opacity: 0, y: -4 }
                : { opacity: 0, y: placement === "bottom" ? -6 : 6, scale: 0.96 }
            }
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "rounded-xs border border-gold/60 bg-[#FBF8F3] p-4 sm:p-5 shadow-[0_16px_36px_rgba(30,58,47,0.18)] text-left",
              positionClass
            )}
          >
            {/* Header with category and dismiss */}
            <div className="flex items-center justify-between border-b border-gold/25 pb-2">
              <span className="text-[9px] uppercase tracking-[0.24em] text-gold-soft font-semibold">
                {quote.authorNote}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-taupe hover:text-forest transition-colors p-0.5"
                aria-label="Dismiss note"
              >
                <X size={13} />
              </button>
            </div>

            {/* Poetic quote body */}
            <p className="font-serif mt-3 text-base sm:text-lg italic leading-relaxed text-forest font-light">
              “{quote.text}”
            </p>

            {/* Sub-signature */}
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-gold/15">
              <span className="font-script text-lg text-burgundy">
                {quote.signoff ?? "With love, Jesus ♡"}
              </span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-taupe font-medium">
                The Bloom Club
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
