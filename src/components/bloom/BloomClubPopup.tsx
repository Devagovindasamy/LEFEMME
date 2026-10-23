"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { brand } from "@/data/brand";
import { NewsletterForm } from "@/components/bloom/NewsletterForm";

const { sessionDismissKey, sessionJoinedKey, sessionStartKey, popupDelayMs } = brand.bloomClub;

function getSessionItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function setSessionItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* storage unavailable (e.g. private mode) */
  }
}

export function BloomClubPopup() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (getSessionItem(sessionDismissKey)) return;
    if (getSessionItem(sessionJoinedKey)) return;

    // Track session entrance time across internal route changes
    let startTime: number;
    const storedStart = getSessionItem(sessionStartKey);

    if (storedStart) {
      const parsed = parseInt(storedStart, 10);
      if (!Number.isNaN(parsed) && parsed > 0) {
        startTime = parsed;
      } else {
        startTime = Date.now();
        setSessionItem(sessionStartKey, String(startTime));
      }
    } else {
      startTime = Date.now();
      setSessionItem(sessionStartKey, String(startTime));
    }

    const elapsed = Date.now() - startTime;
    const remainingMs = Math.max(0, popupDelayMs - elapsed);

    const timer = window.setTimeout(() => {
      if (
        !getSessionItem(sessionDismissKey) &&
        !getSessionItem(sessionJoinedKey)
      ) {
        setOpen(true);
      }
    }, remainingMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    setSessionItem(sessionDismissKey, "1");
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Dismiss Bloom Club invitation"
            onClick={dismiss}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bloom-popup-title"
            className="relative w-full max-w-md border border-gold/40 bg-ivory p-8 shadow-2xl"
            initial={reduceMotion ? false : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: 16, opacity: 0 }}
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center text-forest"
              aria-label="Close invitation"
            >
              <X size={18} />
            </button>
            <p className="font-script text-3xl text-burgundy">The Bloom Club</p>
            <h2
              id="bloom-popup-title"
              className="font-serif mt-2 text-3xl text-forest"
            >
              {brand.bloomClub.headline}
            </h2>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              {brand.bloomClub.invite}
            </p>
            <p className="mt-2 text-sm text-burgundy">{brand.bloomClub.whisper}</p>
            <NewsletterForm
              source="popup"
              onSuccess={() => {
                setSessionItem(sessionDismissKey, "1");
                setOpen(false);
              }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
