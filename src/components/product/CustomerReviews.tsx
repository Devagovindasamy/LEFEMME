"use client";

import { useState } from "react";
import { Star, MessageSquare, Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

export function CustomerReviews({
  productName,
  className,
}: {
  productName: string;
  className?: string;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !comment) return;
    setSubmitted(true);
    // In local demo without reviews table in DB, acknowledge review submission
  }

  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className={cn("mt-14 border-t border-gold/30 pt-12", className)}
    >
      <div className="border border-gold/40 bg-[#FBF8F3] p-5 sm:p-7 rounded-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-gold/30">
          <div>
            <h2 id="customer-reviews-heading" className="font-serif text-2xl sm:text-3xl text-forest font-light">
              Customer Reviews
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex text-gold">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} fill="#C6A15B" stroke="#C6A15B" />
                ))}
              </div>
              <span className="text-xs text-taupe font-serif">
                Be the first to write a review
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsFormOpen(!isFormOpen);
              setSubmitted(false);
            }}
            className="inline-flex h-11 items-center justify-center border border-forest bg-transparent px-6 text-[11px] uppercase tracking-[0.2em] text-forest transition-colors hover:bg-forest hover:text-ivory"
          >
            {isFormOpen ? "Close Review Form" : "Write a review"}
          </button>
        </div>

        {/* Write Review Form Drawer / Modal */}
        {isFormOpen && (
          <div className="mt-8 pt-6 border-b border-gold/30 pb-8">
            {submitted ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-forest text-ivory">
                  <Check size={20} />
                </div>
                <h3 className="font-serif mt-3 text-2xl text-forest font-light">
                  Thank you for your love note!
                </h3>
                <p className="mt-2 text-sm text-ink-soft font-light max-w-md mx-auto">
                  Your feedback for the {productName} has been received. Reviews will appear here once verified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 text-left">
                <h3 className="font-serif text-2xl text-forest font-light text-center">
                  Share Your Experience
                </h3>
                <p className="text-xs text-taupe text-center">
                  We&apos;d love to hear how {productName} accompanies your everyday moments.
                </p>

                <div>
                  <label htmlFor="review-rating" className="block text-xs uppercase tracking-wider text-taupe font-medium">
                    Rating
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className="p-1 text-gold hover:scale-110 transition-transform"
                        aria-label={`Rate ${s} out of 5 stars`}
                      >
                        <Star
                          size={22}
                          fill={s <= rating ? "#C6A15B" : "none"}
                          stroke="#C6A15B"
                        />
                      </button>
                    ))}
                    <span className="text-xs text-ink-soft ml-2 font-serif">{rating} / 5</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="review-name" className="block text-xs uppercase tracking-wider text-taupe font-medium">
                    Your Name
                  </label>
                  <input
                    id="review-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya S."
                    className="mt-1 w-full border border-gold/40 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label htmlFor="review-comment" className="block text-xs uppercase tracking-wider text-taupe font-medium">
                    Your Review
                  </label>
                  <textarea
                    id="review-comment"
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="How does it feel, fit, and carry your essentials?"
                    className="mt-1 w-full border border-gold/40 bg-ivory px-3.5 py-2.5 text-sm text-ink outline-none focus:border-forest"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 text-xs text-taupe hover:text-forest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-forest px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-forest-soft transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Polished Empty State per Client Requirements */}
        {!isFormOpen && (
          <div className="py-12 text-center max-w-md mx-auto">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blush/40 text-burgundy">
              <MessageSquare size={20} />
            </div>
            <p className="font-serif mt-4 text-xl sm:text-2xl text-forest font-light italic">
              “Your experience could be the first little love note for this bag ♡”
            </p>
            <p className="mt-2 text-xs text-taupe leading-relaxed font-light">
              We take pride in every stitch and pocket. Let other Bloomies know how you carry your {productName}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
