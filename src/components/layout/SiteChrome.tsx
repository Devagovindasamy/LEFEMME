"use client";

import { MotionConfig } from "motion/react";
import { BloomClubPopup } from "@/components/bloom/BloomClubPopup";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CustomCursor } from "@/components/interactive/CustomCursor";
import { FloatingVideo } from "@/components/interactive/FloatingVideo";
import { FlowerSticker } from "@/components/interactive/FlowerSticker";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      {children}
      <Footer />
      <CartDrawer />
      <BloomClubPopup />
      <FlowerSticker />
      <FloatingVideo />
      <CustomCursor />
    </MotionConfig>
  );
}
