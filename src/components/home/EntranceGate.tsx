"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { brand } from "@/data/brand";
import { BloomDiscovery } from "@/components/interactive/BloomDiscovery";

type Stage = "idle" | "opening" | "exiting";

/* Tiny Lefemme botanical sparkles & corner garden vignettes (line-art, brand palette) */
function Sparkle({ className = "", fill = "#C6A15B", delay = "0ms" }: { className?: string; fill?: string; delay?: string }) {
  return (
    <svg viewBox="-5 -5 10 10" className={`gate-blink absolute ${className}`} style={{ animationDelay: delay }} aria-hidden="true">
      <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z" fill={fill} />
    </svg>
  );
}

function CornerGarden({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 ${side === "left" ? "left-0" : "right-0"} hidden md:block`}
      style={side === "right" ? { transform: "scaleX(-1)" } : undefined}
    >
      <svg viewBox="0 0 190 170" className="h-36 w-44 lg:h-44 lg:w-52 opacity-80">
        {/* Tall wandering stem with two blush buds */}
        <g className="botanical-sway" style={{ transformOrigin: "46px 158px", animationDuration: "7s" }}>
          <path d="M46 158 C42 124 53 100 46 66 C44 52 47 42 44 28" fill="none" stroke="#A89B8A" strokeWidth="1" strokeOpacity=".75" />
          <ellipse cx="45" cy="33" rx="4.6" ry="7.4" fill="#D9C6C9" fillOpacity=".85" transform="rotate(-8 45 33)" />
          <ellipse cx="50" cy="72" rx="4" ry="6.6" fill="#C6A15B" fillOpacity=".5" transform="rotate(12 50 72)" />
        </g>
        {/* Small flowering sprig */}
        <g className="botanical-sway" style={{ transformOrigin: "16px 158px", animationDuration: "5.5s", animationDelay: "-2s" }}>
          <path d="M16 158 C15 132 18 116 14 96" fill="none" stroke="#A89B8A" strokeWidth="1" strokeOpacity=".6" />
          <g transform="translate(13.5 90)">
            {[0, 72, 144, 216, 288].map((d) => (
              <circle key={d} cx="0" cy="-3.4" r="1.7" fill="#D9B8BC" transform={`rotate(${d})`} />
            ))}
            <circle cx="0" cy="0" r="1.3" fill="#C6A15B" />
          </g>
        </g>
        {/* Picket fence with tiny flowers */}
        <g stroke="#B4A48C" strokeOpacity=".8" strokeWidth="1.1" fill="none">
          <path d="M112 158 L112 116 L117 108 L122 116 L122 158" />
          <path d="M131 158 L131 116 L136 108 L141 116 L141 158" />
          <path d="M150 158 L150 116 L155 108 L160 116 L160 158" />
          <path d="M169 158 L169 116 L174 108 L179 116 L179 158" />
          <path d="M108 128 H183" strokeOpacity=".55" />
          <path d="M108 144 H183" strokeOpacity=".55" />
        </g>
        <g transform="translate(138 124)">
          {[0, 72, 144, 216, 288].map((d) => (
            <circle key={d} cx="0" cy="-3" r="1.5" fill="#C6A15B" fillOpacity=".8" transform={`rotate(${d})`} />
          ))}
        </g>
        <g transform="translate(172 122)">
          {[0, 72, 144, 216, 288].map((d) => (
            <circle key={d} cx="0" cy="-3" r="1.5" fill="#D9B8BC" fillOpacity=".9" transform={`rotate(${d})`} />
          ))}
        </g>
        {/* Grass tufts */}
        {[24, 88, 152].map((gx) => (
          <g key={gx} transform={`translate(${gx} 158)`} stroke="#A89B8A" strokeOpacity=".55" strokeWidth="1" fill="none">
            <path d="M0 0 C0 -6 2 -10 5 -12" />
            <path d="M4 0 C4 -7 7 -11 10 -13" />
            <path d="M8 0 C9 -6 12 -9 15 -11" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* One arched door leaf — left or right */
function DoorLeaf({ side }: { side: "left" | "right" }) {
  const knobX = side === "left" ? 96 : 14;
  const wreath = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 110 248" className="h-full w-full" aria-hidden="true">
      <path d="M4 246 V68 Q4 6 55 6 Q106 6 106 68 V246 Z" fill="#F3EBDD" stroke="#C9B394" strokeWidth="1.4" />
      <path d="M10 240 V70 Q10 13 55 13 Q100 13 100 70 V240 Z" fill="none" stroke="#DACBAF" strokeWidth="0.8" strokeOpacity=".7" />
      {/* Floral wreath */}
      <g transform="translate(55 76)">
        {wreath.map((d, i) => (
          <ellipse key={d} cx="0" cy="-20.5" rx="4.5" ry="2.5" transform={`rotate(${d})`} fill={i % 3 === 0 ? "#C6A15B" : i % 3 === 1 ? "#D9B8BC" : "#A89B8A"} fillOpacity=".78" />
        ))}
        <circle cx="0" cy="0" r="8.5" fill="none" stroke="#C9B394" strokeWidth="0.9" strokeOpacity=".8" />
        <circle cx="0" cy="0" r="1.7" fill="#6B1F2E" fillOpacity=".7" />
      </g>
      {/* Lower panel */}
      <rect x="24" y="152" width="62" height="62" fill="none" stroke="#C9B394" strokeWidth="1" strokeOpacity=".85" />
      <rect x="30" y="158" width="50" height="50" fill="none" stroke="#C9B394" strokeWidth="0.7" strokeOpacity=".4" />
      {/* Champagne knob near the meeting edge */}
      <circle cx={knobX} cy="208" r="2.6" fill="#C6A15B" />
    </svg>
  );
}

const BURST_PETALS = [
  { dx: "-26px", dy: "-64px", rot: "-38deg", delay: "80ms", fill: "#F3EBDD", stroke: "#C6A15B" },
  { dx: "24px", dy: "-72px", rot: "40deg", delay: "140ms", fill: "#EBCFD2", stroke: "#C6A15B" },
  { dx: "-4px", dy: "-88px", rot: "16deg", delay: "220ms", fill: "#E5C687", stroke: "#FAF6EF" },
  { dx: "36px", dy: "-48px", rot: "52deg", delay: "280ms", fill: "#6B1F2E", stroke: "#C6A15B" },
  { dx: "-38px", dy: "-50px", rot: "-55deg", delay: "350ms", fill: "#D9C6C9", stroke: "#C6A15B" },
  { dx: "-18px", dy: "-76px", rot: "-22deg", delay: "180ms", fill: "#FAF6EF", stroke: "#C6A15B" },
  { dx: "44px", dy: "-60px", rot: "48deg", delay: "310ms", fill: "#EBCFD2", stroke: "#6B1F2E" },
  { dx: "-46px", dy: "-38px", rot: "-64deg", delay: "400ms", fill: "#E5C687", stroke: "#C6A15B" },
];

export function EntranceGate({ onEnter }: { onEnter?: () => void }) {
  const [active, setActive] = useState(true);
  const [stage, setStage] = useState<Stage>("idle");
  const [reducedFade, setReducedFade] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearAll = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const dismissEntrance = useCallback(() => {
    clearAll();
    setActive(false);
    onEnter?.();
  }, [clearAll, onEnter]);

  // Handle URL query parameters (e.g. ?entrance=off or ?entrance=replay) and debug hook
  useEffect(() => {
    (window as unknown as { __lefemmeReplayEntrance?: () => void }).__lefemmeReplayEntrance = () => {
      setStage("idle");
      setActive(true);
    };

    const params = new URLSearchParams(window.location.search);
    const mode = params.get(brand.entrance.replayParam);

    if (mode === "off") {
      queueMicrotask(() => setActive(false));
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissEntrance();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearAll();
    };
  }, [clearAll, dismissEntrance]);

  const openTheGate = useCallback(() => {
    if (stage !== "idle") return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedFade(true);
      const t = window.setTimeout(() => dismissEntrance(), 280);
      timersRef.current.push(t);
      return;
    }

    // Stage 2 — the two arched doors swing open toward the visitor (~1.25s)
    setStage("opening");

    // Stage 3 — the whole garden scene breathes out & fades to reveal the boutique
    const tExit = window.setTimeout(() => setStage("exiting"), 1400);
    const tDone = window.setTimeout(() => dismissEntrance(), 2050);
    timersRef.current.push(tExit, tDone);
  }, [dismissEntrance, stage]);

  if (!active) return null;

  const isOpen = stage === "opening" || stage === "exiting";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Lefemme garden gate entrance"
      className={`fixed inset-0 z-[100] select-none overflow-hidden bg-[#FAF6EF] transition-all duration-[650ms] ease-out ${
        stage === "exiting" || reducedFade ? "pointer-events-none scale-[1.03] opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(ellipse 70% 62% at 50% 44%, #FCF8F1 0%, #FAF6EF 55%, #F6EFE4 100%)",
      }}
    >
      {/* Warm ground band at the very bottom */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-9 bg-[#F1E7D7]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-9 h-px bg-[#C9B394]/25" />

      {/* Corners of the little garden */}
      <CornerGarden side="left" />
      <CornerGarden side="right" />

      {/* Falling petals drifting in breeze & scattered sparkles */}
      <svg viewBox="-8 -8 16 16" className="floaty absolute left-7 top-8 h-4 w-4 opacity-70 md:left-12 md:top-10" aria-hidden="true">
        <path d="M0 4.6 C-3.8 1.2, -3.4 -4, 0 -5.6 C3.4 -4, 3.8 1.2, 0 4.6 Z" fill="#D9B8BC" transform="rotate(-28)" />
      </svg>
      <svg viewBox="-8 -8 16 16" className="floaty absolute right-8 top-16 h-3.5 w-3.5 opacity-60 md:right-20 md:top-20" style={{ animationDelay: "-2.2s", animationDuration: "6.2s" }} aria-hidden="true">
        <path d="M0 4.6 C-3.8 1.2, -3.4 -4, 0 -5.6 C3.4 -4, 3.8 1.2, 0 4.6 Z" fill="#EBCFD2" transform="rotate(34)" />
      </svg>
      <svg viewBox="-8 -8 16 16" className="floaty absolute left-[18%] bottom-28 h-3 w-3 opacity-55 hidden sm:block" style={{ animationDelay: "-3.8s", animationDuration: "5.8s" }} aria-hidden="true">
        <path d="M0 4.6 C-3.8 1.2, -3.4 -4, 0 -5.6 C3.4 -4, 3.8 1.2, 0 4.6 Z" fill="#E5C687" transform="rotate(-15)" />
      </svg>
      <Sparkle className="right-[16%] top-[14%] h-3 w-3" delay="300ms" />
      <Sparkle className="left-[20%] top-[30%] h-2.5 w-2.5" fill="#D9B8BC" delay="900ms" />
      <Sparkle className="right-[26%] top-[52%] h-2.5 w-2.5" delay="1500ms" />
      <span className="absolute left-[13%] top-[58%] h-1.5 w-1.5 rounded-full bg-[#6B1F2E]/40" aria-hidden="true" />
      <span className="absolute right-[11%] top-[36%] h-1 w-1 rounded-full bg-[#C6A15B]/60" aria-hidden="true" />

      {/* Top-right skip */}
      <button
        type="button"
        onClick={dismissEntrance}
        className="absolute right-6 top-6 text-[11px] uppercase tracking-[0.34em] text-[#A89B8A] transition hover:text-[#6B1F2E] md:right-10 md:top-8"
      >
        Skip Entrance
      </button>

      {/* Bottom-left Bloomie note */}
      <div className="absolute bottom-10 left-6 md:bottom-14 md:left-12">
        <BloomDiscovery quoteId="entrance-welcome" variant="whisper" align="left" label="psst… open the gate" />
      </div>

      {/* Center stage */}
      <div className="flex h-full flex-col items-center justify-center px-4">
        <p className="mb-5 text-center font-serif text-xl italic text-[#6B1F2E]/90 md:text-2xl">
          A little boutique for a world of blooms.
        </p>

        {/* The gate */}
        <div
          onClick={openTheGate}
          role="button"
          tabIndex={0}
          aria-label="Open the gate"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openTheGate();
            }
          }}
          className="relative cursor-pointer focus:outline-none"
          style={{
            width: "min(74vw, 320px)",
            aspectRatio: "330 / 340",
            perspective: "1000px",
          }}
        >
          {/* Static arch, halo circle, garland & ground line */}
          <svg viewBox="0 0 330 340" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <path d="M48 302 V122 Q48 42 165 42 Q282 42 282 122 V302" fill="none" stroke="#C6A15B" strokeOpacity=".5" strokeWidth="1.3" />
            <path d="M58 302 V128 Q58 58 165 58 Q272 58 272 128 V302" fill="none" stroke="#A89B8A" strokeOpacity=".28" strokeWidth="1" />
            <circle cx="165" cy="82" r="26" fill="none" stroke="#A89B8A" strokeOpacity=".5" strokeWidth="1.1" strokeDasharray="1.6 6.5" strokeLinecap="round" />
            <path d="M148 30 Q165 18 182 30" fill="none" stroke="#C6A15B" strokeWidth="1.2" strokeOpacity=".85" />
            <circle cx="165" cy="25" r="2.6" fill="#6B1F2E" fillOpacity=".8" />
            {/* Petal garland across the arch */}
            {[
              { x: 92, y: 100, r: -32, f: "#C6A15B" },
              { x: 107, y: 82, r: -20, f: "#A89B8A" },
              { x: 125, y: 69, r: -10, f: "#D9B8BC" },
              { x: 145, y: 60, r: -3, f: "#C6A15B" },
              { x: 165, y: 57, r: 0, f: "#6B1F2E" },
              { x: 185, y: 60, r: 3, f: "#A89B8A" },
              { x: 205, y: 69, r: 10, f: "#C6A15B" },
              { x: 223, y: 82, r: 20, f: "#D9B8BC" },
              { x: 238, y: 100, r: 32, f: "#A89B8A" },
            ].map((p, i) => (
              <ellipse key={i} cx={p.x} cy={p.y} rx="4.8" ry="2.5" fill={p.f} fillOpacity=".8" transform={`rotate(${p.r} ${p.x} ${p.y})`} />
            ))}
            <path d="M34 302 H296" stroke="#A89B8A" strokeOpacity=".5" strokeWidth="1.2" strokeLinecap="round" />
          </svg>

          {/* LEFT door leaf (hinged on its left edge) */}
          <div
            className="absolute"
            style={{
              left: `${(55 / 330) * 100}%`,
              top: `${(52 / 340) * 100}%`,
              width: `${(110 / 330) * 100}%`,
              height: `${(248 / 340) * 100}%`,
              transformOrigin: "0% 50%",
              transformStyle: "preserve-3d",
              transform: isOpen ? "rotateY(98deg)" : "rotateY(0deg)",
              transition: "transform 1250ms cubic-bezier(.32,.02,.2,1)",
            }}
          >
            <div className="gate-sway h-full w-full">{<DoorLeaf side="left" />}</div>
          </div>

          {/* RIGHT door leaf (hinged on its right edge) */}
          <div
            className="absolute"
            style={{
              left: `${(165 / 330) * 100}%`,
              top: `${(52 / 340) * 100}%`,
              width: `${(110 / 330) * 100}%`,
              height: `${(248 / 340) * 100}%`,
              transformOrigin: "100% 50%",
              transformStyle: "preserve-3d",
              transform: isOpen ? "rotateY(-98deg)" : "rotateY(0deg)",
              transition: "transform 1250ms cubic-bezier(.32,.02,.2,1)",
            }}
          >
            <div className="gate-sway h-full w-full" style={{ animationDelay: "-2.75s", transformOrigin: "50% 100%" }}>
              <DoorLeaf side="right" />
            </div>
          </div>

          {/* Soft champagne glow + petals spilling from the gap as the doors part */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[58%]"
            style={{ zIndex: 5 }}
          >
            {isOpen && (
              <>
                <span className="gate-glow absolute -left-12 -top-12 block h-24 w-24 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,249,232,0.95) 0%, rgba(235,207,161,0.55) 48%, rgba(250,246,239,0) 78%)" }} />
                {BURST_PETALS.map((p, i) => (
                  <span
                    key={i}
                    className="petal-drift absolute -ml-1.5 -mt-1.5 block h-3 w-3"
                    style={{ "--pdx": p.dx, "--pdy": p.dy, "--prot": p.rot, "--pdelay": p.delay } as React.CSSProperties}
                  >
                    <svg viewBox="0 0 16 16" className="h-full w-full">
                      <path d="M8 1 C11.5 4.5, 12.5 9.5, 8 15 C3.5 9.5, 4.5 4.5, 8 1 Z" fill={p.fill} stroke={p.stroke} strokeWidth="1" />
                    </svg>
                  </span>
                ))}
              </>
            )}
          </div>
        </div>

        {/* OPEN THE GATE trigger */}
        <button
          type="button"
          onClick={openTheGate}
          className="mt-3 text-[11px] uppercase tracking-[0.4em] text-[#A89B8A] transition hover:text-[#6B1F2E] md:mt-4"
        >
          {stage === "idle" ? "Open the Gate" : "…"}
        </button>

        {/* Tiny three-petal sprig */}
        <svg viewBox="0 0 24 16" className="mt-2.5 h-4 w-6 text-[#6B1F2E]/70" aria-hidden="true">
          <path d="M12 15 V9" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="12" cy="6.5" rx="2.4" ry="3.4" fill="#D9B8BC" />
          <ellipse cx="7.6" cy="9" rx="2.2" ry="3" fill="#C6A15B" fillOpacity=".8" transform="rotate(-28 7.6 9)" />
          <ellipse cx="16.4" cy="9" rx="2.2" ry="3" fill="#C6A15B" fillOpacity=".8" transform="rotate(28 16.4 9)" />
        </svg>

        {/* Hand-lettered welcome */}
        <p className="mt-3 flex items-center gap-2 font-script text-[26px] leading-none text-[#6B1F2E] md:text-3xl">
          Welcome to the Lefemme garden
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            {[0, 72, 144, 216, 288].map((d) => (
              <ellipse key={d} cx="10" cy="5.2" rx="2.6" ry="4" fill="none" stroke="#6B1F2E" strokeWidth="1" transform={`rotate(${d} 10 10)`} />
            ))}
            <circle cx="10" cy="10" r="1.4" fill="#C6A15B" />
          </svg>
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.42em] text-[#A89B8A]">Lefemme · The Bloom Club</p>
      </div>
    </div>
  );
}
