"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { bloomQuotes } from "@/data/quotes";

export function FlowerSticker() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  function reveal() {
    setIndex((current) => {
      if (!open) return current;
      return (current + 1) % bloomQuotes.length;
    });
    setOpen(true);
  }

  const quote = bloomQuotes[index];

  return (
    <div className="pointer-events-none fixed bottom-5 left-4 z-30 sm:bottom-8 sm:left-6">
      <div className="pointer-events-auto">
        <AnimatePresence>
          {open ? (
            <motion.div
              role="dialog"
              aria-label="Bloom quote"
              className="mb-3 max-w-[16.5rem] border border-gold/40 bg-paper p-4 shadow-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-serif text-lg leading-6 text-forest">
                  {quote.text}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-taupe"
                  aria-label="Close quote"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-taupe font-medium">
                Atelier Note · The Bloom Club
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <button
          type="button"
          onClick={reveal}
          aria-label={open ? "Show another bloom quote" : "Open a bloom quote"}
          className="grid h-14 w-14 place-items-center rounded-full bg-burgundy text-ivory shadow-md transition-transform hover:scale-105 focus-visible:scale-105"
        >
          <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
            <g transform="translate(16 17)">
              <circle cx="0" cy="-7" r="5" fill="#EAD7D2" />
              <circle cx="6.6" cy="-2.2" r="5" fill="#F7F1E8" />
              <circle cx="4.1" cy="5.8" r="5" fill="#EAD7D2" />
              <circle cx="-4.1" cy="5.8" r="5" fill="#F7F1E8" />
              <circle cx="-6.6" cy="-2.2" r="5" fill="#EAD7D2" />
              <circle cx="0" cy="0" r="3.2" fill="#C4A574" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
