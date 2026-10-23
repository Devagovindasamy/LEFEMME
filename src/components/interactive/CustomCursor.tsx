"use client";

import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;
    document.documentElement.classList.add("has-floral-cursor");
    return () => {
      document.documentElement.classList.remove("has-floral-cursor");
    };
  }, []);

  return null;
}
