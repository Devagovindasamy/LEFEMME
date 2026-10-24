/**
 * Bloomie's Little Discoveries
 * Official scripture love notes from Jesus provided in the client brief.
 * "A Little Love Note for You ♡ - Pick a flower. Maybe there's something your heart needs to hear today."
 */

export interface BloomDiscoveryQuote {
  id: string;
  category: "entrance" | "hero" | "handbag" | "botanical" | "charm" | "community" | "atelier";
  text: string;
  authorNote: string;
  signoff?: string;
}

export const bloomQuotes: BloomDiscoveryQuote[] = [
  {
    id: "entrance-welcome",
    category: "entrance",
    text: "She is more precious than rubies; nothing you desire can compare with her.",
    authorNote: "A Little Love Note · 01",
    signoff: "With love, Jesus ♡",
  },
  {
    id: "hero-annotation",
    category: "hero",
    text: "You are altogether beautiful, my darling; there is no flaw in you.",
    authorNote: "A Little Love Note · 02",
    signoff: "With love, Jesus ♡",
  },
  {
    id: "adina-detail",
    category: "handbag",
    text: "You are fearfully and wonderfully made.",
    authorNote: "A Little Love Note · 03",
    signoff: "With love, Jesus ♡",
  },
  {
    id: "hadar-detail",
    category: "handbag",
    text: "She is clothed with strength and dignity, and she laughs without fear of the future.",
    authorNote: "A Little Love Note · 04",
    signoff: "With love, Jesus ♡",
  },
  {
    id: "botanical-whisper",
    category: "botanical",
    text: "You are God’s masterpiece, created for a beautiful purpose.",
    authorNote: "A Little Love Note · 05",
    signoff: "With love, Jesus ♡",
  },
  {
    id: "community-note",
    category: "community",
    text: "She is more precious than rubies; nothing you desire can compare with her.",
    authorNote: "A Little Love Note · 01",
    signoff: "With love, Jesus ♡",
  },
  {
    id: "footer-signoff",
    category: "atelier",
    text: "You are altogether beautiful, my darling; there is no flaw in you.",
    authorNote: "A Little Love Note · 02",
    signoff: "With love, Jesus ♡",
  },
  {
    id: "charm-play",
    category: "charm",
    text: "You are fearfully and wonderfully made.",
    authorNote: "A Little Love Note · 03",
    signoff: "With love, Jesus ♡",
  },
  {
    id: "craft-creed",
    category: "handbag",
    text: "She is clothed with strength and dignity, and she laughs without fear of the future.",
    authorNote: "A Little Love Note · 04",
    signoff: "With love, Jesus ♡",
  },
  {
    id: "garden-memory",
    category: "botanical",
    text: "You are God’s masterpiece, created for a beautiful purpose.",
    authorNote: "A Little Love Note · 05",
    signoff: "With love, Jesus ♡",
  },
];

export function getQuoteById(id: string): BloomDiscoveryQuote {
  return bloomQuotes.find((q) => q.id === id) ?? bloomQuotes[0];
}
