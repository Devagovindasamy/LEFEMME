/**
 * Lefemme brand configuration.
 * Replace placeholder values (instagram, contact, policies) when the client confirms them.
 */
export const brand = {
  name: "Lefemme",
  community: "The Bloom Club",
  communityNickname: "Bloomie",
  tagline: "Carry a Little Bloom.",
  supportingLine: "Thoughtfully designed. Beautifully carried.",
  announcement:
    "A little something lovely is on its way.",
  description:
    "Lefemme is a feminine floral handbag house. The Bloom Club is its community — an invitation, not a mailing-list funnel.",
  instagramUrl: null as string | null, // Do not invent a profile URL.
  instagramHandle: null as string | null,
  contactEmail: null as string | null,
  contactPhone: null as string | null,
  address: null as string | null,
  video: {
    src: "/videos/bloom-demo.mp4",
    poster: "/images/editorial/peonies-white.jpg",
    caption: "Demo floral film — replace with Lefemme Instagram footage.",
    enabled: true,
  },
  entrance: {
    enabled: true,
    sessionKey: "lefemme-entrance-seen-v1",
    replayParam: "entrance", // ?entrance=replay to preview, ?entrance=off to disable
    tagline: "Unclasp a little floral world",
    openLabel: "Open Your Bloom",
    skipLabel: "Skip Intro",
    welcomeTitle: "Welcome to Lefemme",
    welcomeSubtitle: "Home of The Bloom Club",
    welcomeBody: "A premium floral handbag house. Carry a little bloom.",
  },
  bloomClub: {
    popupDelayMs: 30_000,
    sessionDismissKey: "lefemme-bloom-popup-dismissed",
    sessionJoinedKey: "lefemme-bloom-joined",
    sessionStartKey: "lefemme-bloom-session-start",
    headline: "Hey, Bloomie! Welcome to Lefemme.",
    invite: "A little something for our Bloomies.",
    success: "You’re officially part of the Bloom Club.",
    whisper: "Psst… Bloomies get first dibs!",
  },
  demo: {
    priceDisclaimer: "Demo price — not a confirmed retail price.",
    copyDisclaimer: "Placeholder copy — replace with client-approved text.",
    checkoutDisclaimer:
      "This is a demonstration checkout. No payment is collected and no order will be fulfilled.",
  },
} as const;

export const navigation = [
  { href: "/shop", label: "Shop" },
  { href: "/handbags", label: "Handbags" },
  { href: "/charms", label: "Bag Charms" },
  { href: "/our-story", label: "Our Story" },
  { href: "/bloom-club", label: "The Bloom Club" },
] as const;

export const footerNav = {
  shop: [
    { href: "/handbags", label: "Handbags" },
    { href: "/charms", label: "Bag Charms" },
    { href: "/shop", label: "All pieces" },
  ],
  house: [
    { href: "/our-story", label: "Our Story" },
    { href: "/bloom-club", label: "The Bloom Club" },
    { href: "/contact", label: "Contact" },
  ],
  care: [
    { href: "/shipping", label: "Shipping" },
    { href: "/returns", label: "Returns" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
