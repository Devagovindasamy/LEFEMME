"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { ProductImage } from "@/data/catalog";
import { cn } from "@/lib/cn";

interface ProductGalleryProps {
  productName: string;
  category: "handbag" | "charm";
  images: ProductImage[];
  activeImage: number;
  mainSrc: string;
  mainAlt: string;
  onSelectImage: (index: number) => void;
}

export function ProductGallery({
  productName,
  category,
  images,
  activeImage,
  mainSrc,
  mainAlt,
  onSelectImage,
}: ProductGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(activeImage);

  // Handle pointer movement for hover lens zoom
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Only engage hover zoom on precise pointer devices (mouse/trackpad), not touch taps
    if (e.pointerType === "touch") return;

    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Calculate percentage (0% to 100%) and clamp
    const x = Math.max(0, Math.min(100, (clientX / rect.width) * 100));
    const y = Math.max(0, Math.min(100, (clientY / rect.height) * 100));

    setZoomPos({ x, y });
    setIsHovering(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Lightbox keyboard controls
  useEffect(() => {
    if (!isLightboxOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, images.length]);

  const activeLightboxImage = images[lightboxIndex] ?? images[0];

  return (
    <div>
      {/* Main Image Frame with Amazon/Flipkart-style Zoom Lens & Full-Resolution Detail Inspection */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={() => {
          setLightboxIndex(activeImage);
          setIsLightboxOpen(true);
        }}
        tabIndex={0}
        role="button"
        aria-label={`Inspect ${productName} image in full detail`}
        className={cn(
          "group relative cursor-crosshair overflow-hidden rounded-xs border border-gold/40 bg-[#FBF8F3] shadow-sm select-none focus:outline-none focus:ring-2 focus:ring-forest/40 transition-colors",
          category === "charm" ? "aspect-square" : "aspect-[4/3] sm:aspect-square"
        )}
      >
        {/* Base Product Image with object-contain to prevent handle/side cropping */}
        <div
          className={cn(
            "relative h-full w-full p-4 sm:p-6 transition-opacity duration-200",
            isHovering ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={mainSrc}
            alt={mainAlt}
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-contain object-center drop-shadow-sm transition-transform duration-300"
          />
        </div>

        {/* High-Resolution Magnified Lens View - Activates seamlessly on hover */}
        {isHovering && (
          <div
            className="pointer-events-none absolute inset-0 bg-[#FBF8F3] bg-no-repeat"
            style={{
              backgroundImage: `url(${mainSrc})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: "240%", // 2.4x magnification for exquisite craftsmanship inspection
            }}
            aria-hidden="true"
          />
        )}

        {/* Magnifier / Click Hint Badge */}
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-forest/80 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-ivory opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100 border border-gold/30">
          <ZoomIn size={12} className="text-gold" />
          <span className="hidden sm:inline">Hover to zoom • Click for full screen</span>
          <span className="sm:hidden">Tap for full screen</span>
        </div>

        {/* Top-Right Expand Icon */}
        <div className="pointer-events-none absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-forest backdrop-blur-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100 shadow-xs border border-gold/30">
          <Maximize2 size={14} />
        </div>
      </div>

      {/* Thumbnails Row with Object-Contain, Refined Active Ring & High-Contrast Visual Border */}
      {images.length > 1 ? (
        <ul className="mt-3 flex flex-wrap gap-2.5" aria-label="Product color & view thumbnails">
          {images.map((image, index) => {
            const isActive = activeImage === index;
            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => onSelectImage(index)}
                  aria-label={`View ${image.alt || `image ${index + 1} of ${productName}`}`}
                  aria-pressed={isActive}
                  className={cn(
                    "relative h-20 w-18 sm:h-22 sm:w-20 overflow-hidden rounded-xs border bg-[#FBF8F3] p-1.5 transition-all duration-200",
                    isActive
                      ? "border-forest ring-2 ring-forest/30 shadow-sm opacity-100"
                      : "border-gold/30 hover:border-gold/70 opacity-75 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain p-1"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-3 text-xs text-taupe font-serif">
          Handcrafted luxury in pure full-grain leather.
        </p>
      )}

      {/* Luxury Fullscreen Lightbox / Modal for Immersive Inspection & Mobile Zoom */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} gallery lightbox`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close image viewer"
            className="absolute top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <X size={22} />
          </button>

          {/* Previous image */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Next image */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-ivory hover:bg-white/20 transition-colors border border-white/20 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Centered Image Container */}
          <div
            className="relative flex flex-col items-center justify-center max-w-4xl max-h-[85vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh] sm:h-[75vh]">
              <Image
                src={activeLightboxImage?.src ?? mainSrc}
                alt={activeLightboxImage?.alt ?? productName}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Lightbox Footer & Caption */}
            <div className="mt-4 flex flex-col items-center text-center text-ivory">
              <p className="font-serif text-lg tracking-wide text-gold-soft">
                {productName}
              </p>
              {images.length > 1 && (
                <div className="mt-2 flex items-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`Jump to image ${idx + 1}`}
                      className={cn(
                        "h-2 rounded-full transition-all duration-200",
                        lightboxIndex === idx ? "w-6 bg-gold" : "w-2 bg-white/30 hover:bg-white/60"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
