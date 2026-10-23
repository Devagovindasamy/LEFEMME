export type ProductCategory = "handbag" | "charm";

export type ProductColor = {
  name: string;
  slug: string;
  hex: string;
  available: boolean;
  imageSrc?: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  copyStatus: "demo";
  priceCents: number;
  priceIsDemo: true;
  colors: ProductColor[];
  images: ProductImage[];
  sortOrder: number;
  charmNote?: string;
};

export const brandFeatures = [
  {
    id: "lipstick",
    title: "Lipstick pocket",
    body: "A dedicated place for colour — so the little things stay found. Brand feature to be verified per bag.",
  },
  {
    id: "key-leash",
    title: "Key hook",
    body: "A key leash designed to keep keys close, not lost at the bottom of the day. Brand feature to be verified per bag.",
  },
  {
    id: "structure",
    title: "Structured silhouette",
    body: "Clean lines that hold their shape — made to be carried, not collapsed. Brand feature to be verified per bag.",
  },
  {
    id: "organisation",
    title: "Quiet organisation",
    body: "Thoughtful pockets and everyday function, without visual noise. Brand feature to be verified per bag.",
  },
] as const;

export const products: Product[] = [
  {
    id: "adina",
    slug: "adina",
    name: "Adina",
    category: "handbag",
    tagline: "A wine-red bloom, carried close.",
    description:
      "Demo description — replace with client-approved copy. Adina is a structured floral handbag from the Lefemme collection, photographed here in burgundy with gold-toned hardware.",
    copyStatus: "demo",
    priceCents: 24800,
    priceIsDemo: true,
    sortOrder: 1,
    colors: [
      {
        name: "Burgundy",
        slug: "burgundy",
        hex: "#6E2C3A",
        available: true,
        imageSrc: "/images/products/adina.jpg",
      },
      { name: "Beige", slug: "beige", hex: "#D4C4B0", available: true },
    ],
    images: [
      {
        src: "/images/products/adina.jpg",
        alt: "Adina structured floral handbag in burgundy with gold hardware on an ivory background",
      },
    ],
  },
  {
    id: "ariel",
    slug: "ariel",
    name: "Ariel",
    category: "handbag",
    tagline: "Forest quiet, cream petals.",
    description:
      "Demo description — replace with client-approved copy. Ariel is a structured floral handbag from the Lefemme collection, photographed here in forest green with cream botanical detailing.",
    copyStatus: "demo",
    priceCents: 24800,
    priceIsDemo: true,
    sortOrder: 2,
    colors: [
      {
        name: "Forest Green",
        slug: "forest-green",
        hex: "#1E3A2F",
        available: true,
        imageSrc: "/images/products/ariel.jpg",
      },
      { name: "Black", slug: "black", hex: "#1A1A1A", available: false },
    ],
    images: [
      {
        src: "/images/products/ariel.jpg",
        alt: "Ariel structured floral handbag in forest green with cream botanicals on an ivory background",
      },
    ],
  },
  {
    id: "noa",
    slug: "noa",
    name: "Noa",
    category: "handbag",
    tagline: "Evening black, a hint of bloom.",
    description:
      "Demo description — replace with client-approved copy. Noa is a structured floral handbag from the Lefemme collection, photographed here in black with tonal floral stitching.",
    copyStatus: "demo",
    priceCents: 26800,
    priceIsDemo: true,
    sortOrder: 3,
    colors: [
      {
        name: "Black",
        slug: "black",
        hex: "#1A1A1A",
        available: true,
        imageSrc: "/images/products/noa.jpg",
      },
      {
        name: "Navy Blue",
        slug: "navy-blue",
        hex: "#1C2E4A",
        available: true,
      },
    ],
    images: [
      {
        src: "/images/products/noa.jpg",
        alt: "Noa structured floral handbag in black with gold hardware on an ivory background",
      },
    ],
  },
  {
    id: "liora",
    slug: "liora",
    name: "Liora",
    category: "handbag",
    tagline: "Warm taupe, a dusty-rose garden.",
    description:
      "Demo description — replace with client-approved copy. Liora is a structured floral handbag from the Lefemme collection, photographed here in taupe with dusty rose florals.",
    copyStatus: "demo",
    priceCents: 24800,
    priceIsDemo: true,
    sortOrder: 4,
    colors: [
      {
        name: "Taupe",
        slug: "taupe",
        hex: "#A89480",
        available: true,
        imageSrc: "/images/products/liora.jpg",
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#D4C4B0",
        available: true,
      },
    ],
    images: [
      {
        src: "/images/products/liora.jpg",
        alt: "Liora structured floral handbag in taupe with dusty rose florals on an ivory background",
      },
    ],
  },
  {
    id: "hadar",
    slug: "hadar",
    name: "Hadar",
    category: "handbag",
    tagline: "Navy depth, ivory blossom.",
    description:
      "Demo description — replace with client-approved copy. Hadar is a structured floral handbag from the Lefemme collection, photographed here in navy with ivory blossoms.",
    copyStatus: "demo",
    priceCents: 26800,
    priceIsDemo: true,
    sortOrder: 5,
    colors: [
      {
        name: "Navy Blue",
        slug: "navy-blue",
        hex: "#1C2E4A",
        available: true,
        imageSrc: "/images/products/hadar.jpg",
      },
      {
        name: "Forest Green",
        slug: "forest-green",
        hex: "#1E3A2F",
        available: true,
      },
    ],
    images: [
      {
        src: "/images/products/hadar.jpg",
        alt: "Hadar structured floral handbag in navy blue with ivory florals on an ivory background",
      },
    ],
  },
  {
    id: "heart-charm",
    slug: "heart-leather-charm",
    name: "Heart Leather Charm",
    category: "charm",
    tagline: "A small heart, stitched by hand.",
    description:
      "Demo description — replace with client-approved copy. A stitched leather heart charm with a gold-toned clip. Compatibility with individual handbags is to be confirmed.",
    copyStatus: "demo",
    priceCents: 2800,
    priceIsDemo: true,
    sortOrder: 6,
    charmNote:
      "Charm compatibility with each handbag has not been confirmed for this demo.",
    colors: [
      {
        name: "Burgundy",
        slug: "burgundy",
        hex: "#6E2C3A",
        available: true,
        imageSrc: "/images/charms/heart.jpg",
      },
    ],
    images: [
      {
        src: "/images/charms/heart.jpg",
        alt: "Heart leather bag charm in burgundy with a gold-toned clip",
      },
    ],
  },
  {
    id: "butterfly-charm",
    slug: "butterfly-leather-charm",
    name: "Butterfly Leather Charm",
    category: "charm",
    tagline: "A winged green aside.",
    description:
      "Demo description — replace with client-approved copy. A stitched leather butterfly charm with cream wing details and a gold-toned clip. Compatibility with individual handbags is to be confirmed.",
    copyStatus: "demo",
    priceCents: 2800,
    priceIsDemo: true,
    sortOrder: 7,
    charmNote:
      "Charm compatibility with each handbag has not been confirmed for this demo.",
    colors: [
      {
        name: "Forest Green",
        slug: "forest-green",
        hex: "#1E3A2F",
        available: true,
        imageSrc: "/images/charms/butterfly.jpg",
      },
    ],
    images: [
      {
        src: "/images/charms/butterfly.jpg",
        alt: "Butterfly leather bag charm in forest green with cream details and a gold-toned clip",
      },
    ],
  },
  {
    id: "bow-charm",
    slug: "bow-leather-charm",
    name: "Bow Leather Charm",
    category: "charm",
    tagline: "A tied, champagne bow.",
    description:
      "Demo description — replace with client-approved copy. A stitched leather bow charm in taupe and champagne with a gold-toned clip. Compatibility with individual handbags is to be confirmed.",
    copyStatus: "demo",
    priceCents: 2800,
    priceIsDemo: true,
    sortOrder: 8,
    charmNote:
      "Charm compatibility with each handbag has not been confirmed for this demo.",
    colors: [
      {
        name: "Taupe",
        slug: "taupe",
        hex: "#A89480",
        available: true,
        imageSrc: "/images/charms/bow.jpg",
      },
    ],
    images: [
      {
        src: "/images/charms/bow.jpg",
        alt: "Bow leather bag charm in taupe and champagne with a gold-toned clip",
      },
    ],
  },
  {
    id: "blueberry-charm",
    slug: "blueberry-leather-charm",
    name: "Blueberry Leather Charm",
    category: "charm",
    tagline: "A playful navy berry.",
    description:
      "Demo description — replace with client-approved copy. A stitched leather blueberry charm with tiny green leaves and a gold-toned clip. Compatibility with individual handbags is to be confirmed.",
    copyStatus: "demo",
    priceCents: 2800,
    priceIsDemo: true,
    sortOrder: 9,
    charmNote:
      "Charm compatibility with each handbag has not been confirmed for this demo.",
    colors: [
      {
        name: "Navy Blue",
        slug: "navy-blue",
        hex: "#1C2E4A",
        available: true,
        imageSrc: "/images/charms/blueberry.jpg",
      },
    ],
    images: [
      {
        src: "/images/charms/blueberry.jpg",
        alt: "Blueberry leather bag charm in navy with green leaves and a gold-toned clip",
      },
    ],
  },
  {
    id: "cherry-charm",
    slug: "cherry-leather-charm",
    name: "Cherry Leather Charm",
    category: "charm",
    tagline: "A pair of wine-red cherries.",
    description:
      "Demo description — replace with client-approved copy. A stitched leather cherry charm with green stems and a gold-toned clip. Compatibility with individual handbags is to be confirmed.",
    copyStatus: "demo",
    priceCents: 2800,
    priceIsDemo: true,
    sortOrder: 10,
    charmNote:
      "Charm compatibility with each handbag has not been confirmed for this demo.",
    colors: [
      {
        name: "Burgundy",
        slug: "burgundy",
        hex: "#6E2C3A",
        available: true,
        imageSrc: "/images/charms/cherry.jpg",
      },
    ],
    images: [
      {
        src: "/images/charms/cherry.jpg",
        alt: "Cherry leather bag charm in wine red with green stems and a gold-toned clip",
      },
    ],
  },
];

export function getHandbags() {
  return products.filter((p) => p.category === "handbag");
}

export function getCharms() {
  return products.filter((p) => p.category === "charm");
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => {
    const hay = `${p.name} ${p.tagline} ${p.category} ${p.colors.map((c) => c.name).join(" ")}`.toLowerCase();
    return hay.includes(q);
  });
}

export function formatDemoPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
