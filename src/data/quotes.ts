/**
 * Bloomie's Little Discoveries
 * Curated brand reflections, atelier notes, and playful styling whispers.
 */

export interface BloomDiscoveryQuote {
  id: string;
  category: "entrance" | "hero" | "handbag" | "botanical" | "charm" | "community" | "atelier";
  text: string;
  authorNote: string;
}

export const bloomQuotes: BloomDiscoveryQuote[] = [
  {
    id: "entrance-welcome",
    category: "entrance",
    text: "Keep a little room for wonder.",
    authorNote: "Atelier Note · Paris",
  },
  {
    id: "hero-annotation",
    category: "hero",
    text: "A little bloom goes a long way.",
    authorNote: "The Bloom Club Motto",
  },
  {
    id: "adina-detail",
    category: "handbag",
    text: "Soft strength. Structured beauty.",
    authorNote: "On the Adina Silhouette",
  },
  {
    id: "hadar-detail",
    category: "handbag",
    text: "Details are a quiet love language.",
    authorNote: "Atelier Leathercraft",
  },
  {
    id: "botanical-whisper",
    category: "botanical",
    text: "Beauty lives in the little things.",
    authorNote: "Floral Philosophy",
  },
  {
    id: "charm-play",
    category: "charm",
    text: "Take the scenic route, Bloomie.",
    authorNote: "Bag Charm Styling",
  },
  {
    id: "community-note",
    category: "community",
    text: "Some days call for a little extra lovely.",
    authorNote: "The Bloom Club Invitation",
  },
  {
    id: "footer-signoff",
    category: "atelier",
    text: "Your kind of lovely is always in style.",
    authorNote: "Lefemme House Note",
  },
  {
    id: "craft-creed",
    category: "handbag",
    text: "Crafted slowly, carried joyfully.",
    authorNote: "Vegetable-Tanned Heritage",
  },
  {
    id: "garden-memory",
    category: "botanical",
    text: "Carry the garden with you, wherever you wander.",
    authorNote: "Seasonal Keepsake",
  },
];

export function getQuoteById(id: string): BloomDiscoveryQuote {
  return bloomQuotes.find((q) => q.id === id) ?? bloomQuotes[0];
}
