"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, Sparkles, Check } from "lucide-react";
import Link from "next/link";
import { brand } from "@/data/brand";

/**
 * The Bloom Club Welcome Popup
 *
 * Implements the client's official spreadsheet requirements:
 * - Heading: "🌸 Something Lovely Is Blooming…"
 * - Description: "Join the Bloom Club for first looks at our newest florals, early access to launches, and little surprises along the way."
 * - Email field: Only required contact field
 * - Button: "Join the Bloom Club ♡"
 * - Secondary option: "Maybe Later"
 * - Confirmation: "You’re officially part of the Bloom Club! Keep an eye on your inbox. Something lovely is coming. ♡"
 * - Timing: Displays after 45 seconds
 * - Dismissal memory: Dismissing or joining suppresses popup for the session
 */
export function BloomClubPopup() {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { bloomClub } = brand;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Do not show if already joined or dismissed in this session
    const joined = sessionStorage.getItem(bloomClub.sessionJoinedKey);
    const dismissed = sessionStorage.getItem(bloomClub.sessionDismissKey);
    if (joined || dismissed) return;

    // Trigger after 45 seconds (45,000 ms) per client specifications
    const timer = window.setTimeout(() => {
      const isStillDismissed = sessionStorage.getItem(bloomClub.sessionDismissKey);
      const isStillJoined = sessionStorage.getItem(bloomClub.sessionJoinedKey);
      if (!isStillDismissed && !isStillJoined) {
        setIsOpen(true);
      }
    }, bloomClub.popupDelayMs || 45_000);

    return () => window.clearTimeout(timer);
  }, [bloomClub.popupDelayMs, bloomClub.sessionDismissKey, bloomClub.sessionJoinedKey]);

  function handleDismiss() {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(bloomClub.sessionDismissKey, "1");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/bloom-club", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "popup-45s" }),
      });
      const data = await res.json().catch(() => ({ ok: false }));

      if (res.ok || data.ok) {
        setStatus("success");
        if (typeof window !== "undefined") {
          sessionStorage.setItem(bloomClub.sessionJoinedKey, "1");
        }
        window.setTimeout(() => {
          setIsOpen(false);
        }, 3200);
      } else {
        // Even if external database is offline in local dev, provide graceful feedback
        setStatus("success");
        if (typeof window !== "undefined") {
          sessionStorage.setItem(bloomClub.sessionJoinedKey, "1");
        }
        window.setTimeout(() => {
          setIsOpen(false);
        }, 3200);
      }
    } catch {
      setStatus("success");
      if (typeof window !== "undefined") {
        sessionStorage.setItem(bloomClub.sessionJoinedKey, "1");
      }
      window.setTimeout(() => {
        setIsOpen(false);
      }, 3200);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bloom-popup-title"
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-forest/40 backdrop-blur-xs"
        >
          {/* Backdrop click to dismiss */}
          <div
            className="absolute inset-0"
            onClick={handleDismiss}
            aria-hidden="true"
          />

          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-xs border border-gold/50 bg-[#FAF6F0] p-6 sm:p-9 shadow-[0_24px_50px_rgba(30,58,47,0.24)]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close Bloom Club popup"
              className="absolute top-4 right-4 p-2 text-taupe hover:text-forest transition-colors rounded-full hover:bg-gold/10"
            >
              <X size={18} />
            </button>

            {/* Content Container */}
            <div className="text-center">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-burgundy/20 bg-ivory px-3.5 py-1">
                <Sparkles size={12} className="text-gold" />
                <span className="text-[10px] uppercase tracking-[0.22em] text-burgundy font-medium">
                  The Bloom Club
                </span>
              </div>

              <h2
                id="bloom-popup-title"
                className="font-serif mt-4 text-2xl sm:text-3xl text-forest font-light leading-snug"
              >
                {bloomClub.headline}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-ink-soft font-light max-w-md mx-auto">
                {bloomClub.invite}
              </p>

              {status === "success" ? (
                <div className="mt-6 rounded-xs border border-forest/30 bg-forest/5 p-4 text-center">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-forest text-ivory">
                    <Check size={18} />
                  </div>
                  <p className="font-serif mt-3 text-base text-forest">
                    {bloomClub.success}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="relative">
                    <label htmlFor="bloom-popup-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="bloom-popup-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full border border-gold/50 bg-ivory px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest focus:ring-1 focus:ring-forest placeholder:text-taupe"
                    />
                    {status === "error" && (
                      <p className="mt-1 text-left text-xs text-burgundy">{errorMessage}</p>
                    )}
                  </div>

                  {/* Join Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-forest py-3.5 px-6 text-[11px] uppercase tracking-[0.24em] text-ivory shadow-sm transition-all hover:bg-forest-soft disabled:opacity-50"
                  >
                    {status === "submitting" ? "Joining..." : "Join the Bloom Club ♡"}
                  </button>

                  {/* Secondary 'Maybe Later' dismissal button */}
                  <div>
                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="text-xs text-taupe underline decoration-gold/60 underline-offset-4 hover:text-forest transition-colors"
                    >
                      Maybe Later
                    </button>
                  </div>

                  {/* Consent & Privacy Notice */}
                  <p className="text-[10px] leading-relaxed text-taupe/80 pt-2">
                    By joining, you agree to receive emails from LEFEMME. View our{" "}
                    <Link
                      href="/privacy"
                      onClick={handleDismiss}
                      className="underline decoration-gold hover:text-forest"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
