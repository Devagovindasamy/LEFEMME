import { Star, Play, ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/data/brand";
import { cn } from "@/lib/cn";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface InstagramReel {
  id: string;
  caption: string;
  thumbnail: string;
  tag: string;
  productName: string;
}

const REELS: InstagramReel[] = [
  {
    id: "reel-1",
    caption: "Styling the Adina in Forest Bloom with golden afternoon light. Hand-painted floral botanicals.",
    thumbnail: "/images/editorial/peonies-white.jpg",
    tag: "Styling Reel",
    productName: "Adina Floral Shoulder Bag",
  },
  {
    id: "reel-2",
    caption: "What's in my Lefemme bag? Dual lipstick pockets & built-in key dog hook in action.",
    thumbnail: "/images/editorial/peonies-book.jpg",
    tag: "Unboxing & Details",
    productName: "Thoughtful Pockets",
  },
  {
    id: "reel-3",
    caption: "Behind the design: Why structured silhouettes and soft petals belong together.",
    thumbnail: "/images/editorial/burgundy-blooms.jpg",
    tag: "Atelier Note",
    productName: "The Flora Collection",
  },
];

export function SeenInBloom({
  productName,
  className,
}: {
  productName: string;
  className?: string;
}) {
  const profileUrl = brand.instagramUrl ?? "https://www.instagram.com/lefemme_luxe/";

  return (
    <section
      aria-labelledby="seen-in-bloom-heading"
      className={cn("mt-14 border-t border-gold/30 pt-12", className)}
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-burgundy/20 bg-paper px-2.5 py-0.5 text-[9px] uppercase tracking-[0.24em] text-burgundy font-medium">
            <Sparkles size={10} className="text-gold" />
            <span>Community & Styling</span>
          </div>
          <h2 id="seen-in-bloom-heading" className="font-serif mt-2.5 text-2xl sm:text-3xl text-forest font-light">
            Seen in Bloom ♡
          </h2>
          <p className="mt-1 text-xs text-ink-soft font-light">
            A little inspiration for how your LEFEMME favourite comes to life.
          </p>
        </div>

        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-forest hover:text-burgundy transition-colors underline decoration-gold/60 underline-offset-4"
        >
          <InstagramIcon className="h-3.5 w-3.5 text-burgundy" />
          <span>Follow {brand.instagramHandle ?? "@lefemme_luxe"}</span>
          <ExternalLink size={11} className="text-taupe" />
        </a>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REELS.map((reel) => (
          <a
            key={reel.id}
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[9/16] overflow-hidden rounded-xs border border-gold/40 bg-ivory shadow-sm transition-all duration-500 hover:shadow-xl hover:border-forest/60"
          >
            <Image
              src={reel.thumbnail}
              alt={reel.caption}
              fill
              sizes="(min-width: 1024px) 16vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark gradient overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-black/30 opacity-70 group-hover:opacity-85 transition-opacity" />

            {/* Top Reel Tag & Instagram icon */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between text-ivory">
              <span className="bg-forest/80 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-medium border border-gold/40">
                {reel.tag}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs text-ivory">
                <InstagramIcon className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* Center Play Button indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory/90 text-forest shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play size={18} fill="currentColor" className="ml-0.5" />
              </span>
            </div>

            {/* Bottom Caption & Product */}
            <div className="absolute bottom-4 inset-x-4 text-ivory">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-soft font-serif">
                {reel.productName}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-ivory/90 line-clamp-2 font-light">
                {reel.caption}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[10px] tracking-wider text-ivory/70 uppercase group-hover:text-gold-soft transition-colors">
                <span>Watch on Instagram</span>
                <ExternalLink size={10} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
