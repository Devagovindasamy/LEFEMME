"use client";

import { Minimize2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/data/brand";

export function FloatingVideo() {
  const [visible, setVisible] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (minimized || reduced || hasError) {
      video.pause();
    }
  }, [minimized, reduced, hasError]);

  if (!brand.video.enabled || !visible || hasError) return null;

  return (
    <div className="fixed bottom-5 right-4 z-30 w-[148px] sm:bottom-8 sm:right-6 sm:w-[180px]">
      <div className="overflow-hidden border border-gold/40 bg-forest-deep shadow-xl">
        <div className="flex items-center justify-between px-2 py-1.5 text-ivory">
          <p className="text-[10px] uppercase tracking-[0.16em]">Bloom film</p>
          <div className="flex">
            <button
              type="button"
              className="grid h-7 w-7 place-items-center"
              aria-label={minimized ? "Expand video" : "Minimise video"}
              onClick={() => setMinimized((value) => !value)}
            >
              <Minimize2 size={12} />
            </button>
            <button
              type="button"
              className="grid h-7 w-7 place-items-center"
              aria-label="Dismiss video"
              onClick={() => setVisible(false)}
            >
              <X size={12} />
            </button>
          </div>
        </div>
        {!minimized ? (
          <div>
            {reduced ? (
              <div className="bg-forest px-3 py-6 text-center text-[11px] leading-5 text-ivory/80">
                Video paused for reduced motion. Replace with Lefemme footage when
                ready.
              </div>
            ) : (
              <video
                ref={videoRef}
                className="aspect-[9/16] w-full object-cover"
                poster={brand.video.poster}
                muted
                loop
                playsInline
                controls
                preload="metadata"
                onError={() => setHasError(true)}
              >
                <source src={brand.video.src} type="video/mp4" onError={() => setHasError(true)} />
              </video>
            )}
            <p className="px-2 py-2 text-[10px] leading-4 text-ivory/65">
              {brand.video.caption}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
