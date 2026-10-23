import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Great_Vibes, Outfit } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { brand } from "@/data/brand";
import { ensureCatalogSeeded } from "@/lib/seed";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | ${brand.community}`,
    template: `%s | ${brand.name}`,
  },
  description:
    "Lefemme is a feminine floral handbag house. Carry a little bloom — structured handbags and leather charms, with The Bloom Club as its community.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: `${brand.name} | ${brand.community}`,
    description: brand.supportingLine,
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  await ensureCatalogSeeded();

  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${script.variable}`}>
      <body className="bg-ivory font-sans text-ink antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
