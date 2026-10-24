/**
 * Lefemme brand configuration.
 * Updated with official client information from the verified client workbook.
 */
export const brand = {
  name: "Lefemme",
  community: "The Bloom Club",
  communityNickname: "Bloomie",
  tagline: "Carry a Little Bloom.",
  supportingLine: "Thoughtfully designed. Beautifully carried.",
  announcement:
    "🌸 Something Lovely Is Blooming… Welcome to LEFEMME.",
  description:
    "Lefemme is a feminine floral handbag house. The Bloom Club is its community — an invitation to belong, not a campaign to convert.",
  founder: {
    name: "Cecilia ♡",
    title: "Founder, LEFEMME",
    noteTitle: "A Little Note From Me ♡",
    noteContent: [
      "I’ve always loved flowers. And I’ve always loved the idea of carrying a little bit of that beauty with me.",
      "But whenever I looked for a floral handbag, I could never quite find what I was looking for. Something colourful, something feminine, something beautiful without being too expensive.",
      "And I thought, surely I can’t be the only girl who feels this way?",
      "That’s how LEFEMME began.",
      "Not because the world needed another handbag brand, but because I wanted to create something I would genuinely love, and hoped that somewhere out there, another girl would love it too.",
      "I wanted to make something that celebrates the little things we love about being women. The colours, the flowers, the joy of finding something pretty and making it our own.",
      "I’m still figuring things out, learning, trying and putting a little piece of myself into everything we create.",
      "And if one of my bags makes you smile, makes you feel a little more like yourself, or simply becomes something you love reaching for every day, then this little dream of mine has already become something so much bigger.",
      "Thank you for being here. It means more than you know.",
    ],
  },
  whyLefemme: [
    {
      numeral: "01",
      heading: "Feminine, Always.",
      supporting: "Florals that feel like you.",
      body: "Who said everyday bags have to be plain and serious? We love flowers, a little romance, and everything that makes a bag feel feminine. LEFEMME brings florals into everyday fashion without compromising on elegance.",
    },
    {
      numeral: "02",
      heading: "Pretty, Not Pricey.",
      supporting: "Beautiful bags without the big price tag.",
      body: "We believe falling in love with a handbag shouldn’t mean spending a fortune. Beautiful floral designs, thoughtful details, and everyday practicality — all at a price that feels just as good as the bag looks.",
    },
    {
      numeral: "03",
      heading: "Made With Intention.",
      supporting: "Every little detail matters.",
      body: "We’re a little particular about the little things. From thoughtfully placed pockets and extended zippers to adjustable shoulder straps and tiny hooks for your keys, nothing is there just for the sake of it. We think about how you’ll actually use your bag, not just how it looks.",
    },
    {
      numeral: "04",
      heading: "Beyond Beige.",
      supporting: "Five colours. Endless personality.",
      body: "Who decided florals should only come in beige? We love our neutrals, but we love a little colour too. With five beautiful shades to choose from, LEFEMME lets you find a floral bag that feels like you.",
    },
    {
      numeral: "05",
      heading: "Beautifully Structured.",
      supporting: "Silhouettes that speak for themselves.",
      body: "A beautiful print deserves an equally beautiful silhouette. We don’t believe in putting flowers on just any bag. From soft curves to bold, structured shapes, every LEFEMME silhouette is carefully chosen to stand out — even without the florals.",
    },
  ],
  instagramUrl: "https://www.instagram.com/lefemme_luxe/",
  instagramHandle: "@lefemme_luxe",
  contactEmail: null as string | null,
  contactPhone: null as string | null,
  address: null as string | null,
  delivery: {
    coverage: "Delivery across India",
    paymentMethods: "Both COD (Cash on Delivery) and online payment",
  },
  video: {
    src: "/videos/bloom-demo.mp4",
    poster: "/images/editorial/peonies-white.jpg",
    caption: "Lefemme floral visual story.",
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
    popupDelayMs: 45_000,
    sessionDismissKey: "lefemme-bloom-popup-dismissed",
    sessionJoinedKey: "lefemme-bloom-joined",
    sessionStartKey: "lefemme-bloom-session-start",
    headline: "🌸 Something Lovely Is Blooming…",
    invite:
      "Join the Bloom Club for first looks at our newest florals, early access to launches, and little surprises along the way.",
    success:
      "You’re officially part of the Bloom Club! Keep an eye on your inbox. Something lovely is coming. ♡",
    whisper: "Psst… Bloomies get first dibs!",
    benefits: [
      {
        icon: "🌸",
        title: "First to Bloom",
        description: "Early access to new collections and colours.",
      },
      {
        icon: "💌",
        title: "Letters From LEFEMME",
        description: "Occasional founder notes and behind-the-scenes updates.",
      },
      {
        icon: "🎀",
        title: "Little Surprises",
        description: "Exclusive offers and special treats from time to time.",
      },
    ],
  },
  demo: {
    priceDisclaimer: "Tentative launch price.",
    copyDisclaimer: "Official client copy.",
    checkoutDisclaimer:
      "Both COD and online payment are accepted. Shipping across India.",
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
