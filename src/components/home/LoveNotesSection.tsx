"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Sparkles, X, Heart } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

interface LoveNote {
  id: number;
  name: string;
  color: string;
  accent: string;
  verse: string;
  signoff: string;
}

const LOVE_NOTES: LoveNote[] = [
  {
    id: 1,
    name: "Rose",
    color: "#6E2C3A",
    accent: "#F6EFE4",
    verse: "She is more precious than rubies; nothing you desire can compare with her.",
    signoff: "With love, Jesus ♡",
  },
  {
    id: 2,
    name: "Peony",
    color: "#D9B8BC",
    accent: "#1E3A2F",
    verse: "You are altogether beautiful, my darling; there is no flaw in you.",
    signoff: "With love, Jesus ♡",
  },
  {
    id: 3,
    name: "Camellia",
    color: "#C6A15B",
    accent: "#FAF6EF",
    verse: "You are fearfully and wonderfully made.",
    signoff: "With love, Jesus ♡",
  },
  {
    id: 4,
    name: "Magnolia",
    color: "#2C4035",
    accent: "#F3EBDD",
    verse: "She is clothed with strength and dignity, and she laughs without fear of the future.",
    signoff: "With love, Jesus ♡",
  },
  {
    id: 5,
    name: "Lotus",
    color: "#1C2E4A",
    accent: "#FBF8F3",
    verse: "You are God’s masterpiece, created for a beautiful purpose.",
    signoff: "With love, Jesus ♡",
  },
];

export function LoveNotesSection() {
  const reduceMotion = useReducedMotion();
  const [selectedNote, setSelectedNote] = useState<LoveNote | null>(null);

  return (
    <section className="relative overflow-hidden bg-[#FAF6EF] py-20 sm:py-28 border-b border-gold/30">
      {/* Decorative background aura */}
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blush/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-burgundy/25 bg-ivory/80 px-4 py-1.5 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-[10px] uppercase tracking-[0.24em] text-burgundy font-medium">
              A Gentle Whisper
            </span>
          </div>

          <h2 className="font-serif mt-5 text-[clamp(2.2rem,4.5vw,3.6rem)] text-forest font-light leading-tight">
            A Little Love Note for You ♡
          </h2>
          <p className="mt-3 text-base sm:text-lg text-ink-soft max-w-lg mx-auto font-light leading-relaxed">
            Pick a flower. Maybe there’s something your heart needs to hear today.
          </p>
        </Reveal>

        {/* 5 Interactive Flowers */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8" role="radiogroup" aria-label="Pick a flower to reveal your love note">
            {LOVE_NOTES.map((note) => {
              const isSelected = selectedNote?.id === note.id;
              return (
                <button
                  key={note.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Pick ${note.name} flower to read a love note`}
                  onClick={() => setSelectedNote(isSelected ? null : note)}
                  className={`group relative flex flex-col items-center gap-2.5 rounded-full p-3 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy ${
                    isSelected ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${
                      isSelected
                        ? "border-burgundy ring-4 ring-burgundy/20"
                        : "border-gold/40 hover:border-gold hover:shadow-md"
                    }`}
                    style={{ backgroundColor: isSelected ? note.color : "#FFFFFF" }}
                  >
                    {/* Stylized Botanical Flower SVG */}
                    <svg
                      viewBox="0 0 40 40"
                      className={`h-9 w-9 sm:h-11 sm:w-11 transition-transform duration-500 ${
                        isSelected ? "rotate-45" : "group-hover:rotate-12"
                      }`}
                      aria-hidden="true"
                    >
                      <g fill={isSelected ? note.accent : note.color} opacity={isSelected ? 1 : 0.85}>
                        {[0, 72, 144, 216, 288].map((deg) => (
                          <ellipse
                            key={deg}
                            cx="20"
                            cy="12"
                            rx="5"
                            ry="9"
                            transform={`rotate(${deg} 20 20)`}
                          />
                        ))}
                        <circle cx="20" cy="20" r="4.5" fill="#C6A15B" />
                      </g>
                    </svg>

                    {isSelected && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-burgundy text-ivory">
                        <Heart size={11} fill="currentColor" />
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-xs tracking-wider transition-colors font-serif ${
                      isSelected ? "text-burgundy font-medium" : "text-taupe group-hover:text-forest"
                    }`}
                  >
                    {note.name}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Revealed Handwritten-Style Card */}
        <div className="relative mt-10 min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedNote ? (
              <motion.div
                key={selectedNote.id}
                role="region"
                aria-live="polite"
                aria-label={`Love note for ${selectedNote.name}`}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full max-w-lg rounded-sm border border-gold/50 bg-[#FBF8F3] p-6 sm:p-8 shadow-[0_16px_36px_rgba(30,58,47,0.12)] text-left"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedNote(null)}
                  className="absolute top-4 right-4 text-taupe hover:text-forest p-1 transition-colors"
                  aria-label="Close note"
                >
                  <X size={16} />
                </button>

                <div className="flex items-center gap-2 border-b border-gold/25 pb-3">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: selectedNote.color }} />
                  <p className="text-[10px] uppercase tracking-[0.24em] text-taupe font-medium">
                    {selectedNote.name} · A Note for Your Heart
                  </p>
                </div>

                {/* Scripture Verse */}
                <blockquote className="mt-5">
                  <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-forest font-light">
                    “{selectedNote.verse}”
                  </p>
                </blockquote>

                {/* Sub-signature: With love, Jesus ♡ */}
                <div className="mt-6 flex items-center justify-between border-t border-gold/20 pt-4">
                  <p className="font-script text-2xl sm:text-3xl text-burgundy">
                    {selectedNote.signoff}
                  </p>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-taupe font-medium">
                    LEFEMME
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs uppercase tracking-[0.2em] text-taupe/80 italic font-light"
              >
                Tap any flower above to reveal your message
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
