export type ProductCategory = "handbag" | "charm";

export type ProductColor = {
  name: string;
  slug: string;
  hex: string;
  available: boolean;
  imageSrc?: string;
  variantName?: string;
  description?: string;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductFeature = {
  feature: string;
  description: string;
};

export type ProductDimensions = {
  length?: string;
  height?: string;
  depth?: string;
  topWidth?: string;
  bottomWidth?: string;
  handleDrop?: string;
  strapAdjustment?: string;
  sizeCategory?: string;
  carryingStyle?: string;
  laptopCompatibility?: string;
  hangingLength?: string;
};

export type ProductMaterials = {
  exterior?: string;
  interior?: string;
  hardware?: string;
  closure?: string;
  decoration?: string;
  branding?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  fullName?: string;
  category: ProductCategory;
  subcategory?: string;
  style?: string;
  collection?: string;
  tagline: string;
  description: string;
  copyStatus: "client" | "demo";
  priceCents: number;
  priceIsDemo: boolean;
  tentativePriceNote?: string;
  colors: ProductColor[];
  images: ProductImage[];
  sortOrder: number;
  charmNote?: string;
  features?: ProductFeature[];
  dimensions?: ProductDimensions;
  materials?: ProductMaterials;
};

export const brandFeatures = [
  {
    id: "lipstick",
    title: "Dedicated Makeup Pockets",
    body: "Two deep interior pockets thoughtfully sized for lipsticks, lip glosses, and beauty touch-ups so small essentials never get lost.",
  },
  {
    id: "key-leash",
    title: "Built-in Key Holder",
    body: "An interior dog hook keeps your keys or favourite charm secure, upright, and instantly within reach without rummaging.",
  },
  {
    id: "structure",
    title: "Distinctive Silhouettes",
    body: "Expertly structured vegan PU leather that holds its sculpted form through daily use, coffee runs, and evening plans.",
  },
  {
    id: "organisation",
    title: "Extended Pockets & Tech Storage",
    body: "Generous slip and zippered pockets tailored for smartphones, plus padded laptop/tablet compartments on work totes.",
  },
] as const;

export const products: Product[] = [
  {
    id: "adina",
    slug: "adina",
    name: "Adina",
    fullName: "Adina Floral Shoulder Bag",
    category: "handbag",
    subcategory: "Structured Shoulder Bag / Everyday Handbag",
    style: "Contemporary, Feminine & Casual Chic",
    tagline: "Your new favourite grab-and-go bag.",
    description:
      "Coffee dates, spontaneous outings, shopping trips, or a day out with your girls — Adina is made for all the little moments that turn into your favourite memories. With her softly structured silhouette, signature floral detailing, and timeless colours, Adina brings together effortless style and everyday functionality. Inside, you’ll find two deep pockets dedicated to your lipsticks and lip glosses, an extended slip pocket for easy access, a spacious zipper pocket that comfortably fits your phone, and a built-in key holder with a dog hook. Finished with a buckle-adjustable shoulder handle (20–25 cm drop) so looking put-together never takes too much effort.",
    copyStatus: "client",
    priceCents: 75000,
    priceIsDemo: true,
    tentativePriceNote: "₹750 — Tentative Launch Price",
    sortOrder: 1,
    dimensions: {
      length: "28 cm",
      height: "18 cm",
      depth: "9 cm",
      handleDrop: "Adjustable: 20–25 cm",
      strapAdjustment: "Buckle Adjuster",
      sizeCategory: "Medium Shoulder Bag",
      carryingStyle: "Shoulder Bag",
    },
    materials: {
      exterior: "Premium PU Leather (Vegan Leather)",
      interior: "Soft Fabric Lining",
      hardware: "Gold-Tone Metal",
      closure: "Top Zipper",
      decoration: "Signature LEFEMME Floral Print",
      branding: "LEFEMME Metal Logo Plate",
    },
    features: [
      { feature: "Structured Silhouette", description: "Softly curved, structured design that maintains its shape while offering a chic, contemporary appearance." },
      { feature: "Two Deep Makeup Pockets", description: "Dedicated interior pockets designed to hold lipsticks, lip glosses, and other small beauty essentials." },
      { feature: "Extended Slip Pocket", description: "Spacious interior pocket for easy access to everyday essentials." },
      { feature: "Extended Zipper Pocket", description: "Secure, generously sized compartment designed to comfortably accommodate a smartphone." },
      { feature: "Built-in Key Holder", description: "Interior dog hook ensures keys are always right where you need them." },
      { feature: "Adjustable Shoulder Handle", description: "Buckle-adjustable handle with 20–25 cm drop for customised carrying comfort." },
    ],
    colors: [
      {
        name: "Forest Green",
        slug: "forest-green",
        hex: "#1E3A2F",
        available: true,
        variantName: "Adina – Forest Bloom",
        description: "Deep forest green with burgundy floral detailing.",
        imageSrc: "/images/client_products/Adina/forest-green.png",
      },
      {
        name: "Beige",
        slug: "beige",
        hex: "#D4C4B0",
        available: true,
        variantName: "Adina – Ivory Bloom",
        description: "Soft, warm beige with burgundy floral accents.",
        imageSrc: "/images/client_products/Adina/beige.png",
      },
      {
        name: "Taupe",
        slug: "taupe",
        hex: "#A89480",
        available: true,
        variantName: "Adina – Mocha Bloom",
        description: "Sophisticated neutral taupe with rich botanical detailing.",
        imageSrc: "/images/client_products/Adina/taupe.png",
      },
      {
        name: "Classic Black",
        slug: "black",
        hex: "#1A1A1A",
        available: true,
        variantName: "Adina – Midnight Bloom",
        description: "Timeless black with contrasting burgundy florals.",
        imageSrc: "/images/client_products/Adina/Black.png",
      },
      {
        name: "Navy Blue",
        slug: "navy-blue",
        hex: "#1C2E4A",
        available: true,
        variantName: "Adina – Midnight Botanica",
        description: "Deep navy blue with elegant botanical accents.",
        imageSrc: "/images/client_products/Adina/navy-blue.png",
      },
    ],
    images: [
      {
        src: "/images/client_products/Adina/forest-green.png",
        alt: "Adina Floral Shoulder Bag in Forest Green with burgundy floral print and gold hardware",
      },
      {
        src: "/images/client_products/Adina/beige.png",
        alt: "Adina Floral Shoulder Bag in Beige Ivory Bloom with burgundy florals",
      },
      {
        src: "/images/client_products/Adina/Black.png",
        alt: "Adina Floral Shoulder Bag in Classic Black Midnight Bloom",
      },
      {
        src: "/images/client_products/Adina/taupe.png",
        alt: "Adina Floral Shoulder Bag in Taupe Mocha Bloom",
      },
      {
        src: "/images/client_products/Adina/navy-blue.png",
        alt: "Adina Floral Shoulder Bag in Navy Blue Midnight Botanica",
      },
    ],
  },
  {
    id: "ariel",
    slug: "ariel",
    name: "Ariel",
    fullName: "Ariel Floral Medium Handbag",
    category: "handbag",
    subcategory: "Medium Handbag",
    style: "Feminine, Contemporary & Everyday Chic",
    collection: "LEFEMME Floral Collection",
    tagline: "A little more room. A little more personality.",
    description:
      "Meet Ariel, your new everyday favourite. With her beautifully curved silhouette, leaf-inspired side detailing, and signature orange and peach botanical artwork, Ariel brings a little colour and femininity to your wardrobe. Designed with thoughtful interiors, she comes with dedicated lipstick pockets, an extended slip pocket, a spacious zipper compartment for your phone, and a built-in key holder with a dog hook. Whether you’re heading out for brunch, shopping, or making spontaneous plans, Ariel is ready to come along.",
    copyStatus: "client",
    priceCents: 89900,
    priceIsDemo: true,
    tentativePriceNote: "₹899 — Tentative Launch Price",
    sortOrder: 2,
    dimensions: {
      length: "28 cm",
      height: "28 cm",
      depth: "10 cm",
      handleDrop: "23 cm",
      sizeCategory: "Medium Handbag",
      carryingStyle: "Handbag / Shoulder Bag",
    },
    materials: {
      exterior: "Premium PU Leather",
      interior: "Fabric Lining",
      hardware: "Gold-Tone Metal",
      closure: "Top Zipper",
      decoration: "Printed Botanical Artwork & Leaf-Inspired Finish",
      branding: "LEFEMME Metal Logo Plate",
    },
    features: [
      { feature: "Signature Floral Detailing", description: "Beautiful orange and peach botanical artwork adds a romantic, feminine touch." },
      { feature: "Leaf-Inspired Side Detailing", description: "Distinctive leaf-shaped finishing along upper sides gives Ariel a unique silhouette." },
      { feature: "Medium-Sized Silhouette", description: "Spacious, softly structured handbag designed to carry more than just basic essentials." },
      { feature: "Two Deep Makeup Pockets", description: "Dedicated compartments for your favourite lipsticks and beauty essentials." },
      { feature: "Extended Slip & Zipper Pockets", description: "Spacious compartments including a smartphone-friendly zipper pocket." },
      { feature: "Built-in Key Holder", description: "Interior dog hook keeps your keys or favourite keychain secure and easy to find." },
    ],
    colors: [
      {
        name: "Beige",
        slug: "beige",
        hex: "#D4C4B0",
        available: true,
        variantName: "Ariel – Ivory Bloom",
        description: "A soft, warm beige with delicate orange and peach florals.",
        imageSrc: "/images/client_products/Ariel/Beige.png",
      },
      {
        name: "Black",
        slug: "black",
        hex: "#1A1A1A",
        available: true,
        variantName: "Ariel – Midnight Bloom",
        description: "Classic black with striking floral detailing.",
        imageSrc: "/images/client_products/Ariel/Black.png",
      },
      {
        name: "Navy Blue",
        slug: "navy-blue",
        hex: "#1C2E4A",
        available: true,
        variantName: "Ariel – Midnight Botanica",
        description: "Rich navy with beautifully contrasting peach florals.",
        imageSrc: "/images/client_products/Ariel/navy-blue.png",
      },
      {
        name: "Forest Green",
        slug: "forest-green",
        hex: "#1E3A2F",
        available: true,
        variantName: "Ariel – Forest Bloom",
        description: "Deep forest green complemented by warm botanical artwork.",
        imageSrc: "/images/client_products/Ariel/forest-green.png",
      },
      {
        name: "Taupe",
        slug: "taupe",
        hex: "#A89480",
        available: true,
        variantName: "Ariel – Mocha Bloom",
        description: "An elegant earthy neutral with soft orange floral accents.",
        imageSrc: "/images/client_products/Ariel/Taupe.png",
      },
    ],
    images: [
      {
        src: "/images/client_products/Ariel/Beige.png",
        alt: "Ariel Floral Medium Handbag in Beige Ivory Bloom with peach florals",
      },
      {
        src: "/images/client_products/Ariel/Black.png",
        alt: "Ariel Floral Medium Handbag in Black Midnight Bloom",
      },
      {
        src: "/images/client_products/Ariel/forest-green.png",
        alt: "Ariel Floral Medium Handbag in Forest Green Forest Bloom",
      },
      {
        src: "/images/client_products/Ariel/navy-blue.png",
        alt: "Ariel Floral Medium Handbag in Navy Blue Midnight Botanica",
      },
      {
        src: "/images/client_products/Ariel/Taupe.png",
        alt: "Ariel Floral Medium Handbag in Taupe Mocha Bloom",
      },
    ],
  },
  {
    id: "noa",
    slug: "noa",
    name: "Noa",
    fullName: "Noa Structured Floral Shoulder Bag",
    category: "handbag",
    subcategory: "Structured Shoulder Bag",
    style: "Feminine, Contemporary & Chic",
    collection: "LEFEMME Floral Collection",
    tagline: "A little structure. A lot of personality.",
    description:
      "Meet Noa, where beautifully sculpted silhouettes meet soft, feminine florals. With her distinctive curved shape, delicate cream and champagne botanical artwork, and elegant gold-tone detailing, Noa is designed to make your everyday outfits feel a little more special. Inside, you’ll find dedicated pockets for your lipsticks and lip glosses, an extended slip pocket, a spacious zipper compartment for your phone, and an interior dog hook key holder. Finished with a comfortable shoulder handle and signature gold metal zipper.",
    copyStatus: "client",
    priceCents: 79900,
    priceIsDemo: true,
    tentativePriceNote: "₹799 Tentative / ₹999 Suggested Launch Price",
    sortOrder: 3,
    dimensions: {
      length: "29 cm",
      height: "25 cm",
      depth: "9 cm",
      handleDrop: "23 cm",
      sizeCategory: "Medium Shoulder Bag",
      carryingStyle: "Shoulder Bag",
    },
    materials: {
      exterior: "Premium PU Leather",
      interior: "Fabric Lining",
      hardware: "Gold-Tone Metal",
      closure: "Gold-Tone Metal Zipper",
      decoration: "Printed Botanical Artwork",
      branding: "LEFEMME Metal Logo",
    },
    features: [
      { feature: "Signature Structured Silhouette", description: "Sculpted body with defined edges and curved upper profile designed to maintain shape." },
      { feature: "Elegant Floral Artwork", description: "Delicate cream and champagne-coloured flowers with soft botanical detailing." },
      { feature: "Comfortable Shoulder Handle", description: "Curved shoulder handle designed for comfortable everyday carrying." },
      { feature: "Two Deep Makeup Pockets", description: "Interior pockets for lipsticks, lip glosses, and beauty essentials." },
      { feature: "Extended Slip & Zipper Pocket", description: "Generously sized compartments accommodating smartphones and essentials." },
      { feature: "Built-in Key Holder", description: "Interior dog hook keeps keys secure and easy to find." },
    ],
    colors: [
      {
        name: "Beige",
        slug: "beige",
        hex: "#D4C4B0",
        available: true,
        variantName: "Nova – Ivory Bloom",
        description: "A warm beige base complemented by soft champagne flowers and delicate botanical detailing.",
        imageSrc: "/images/client_products/Noa/beige.png",
      },
      {
        name: "Black",
        slug: "black",
        hex: "#1A1A1A",
        available: true,
        variantName: "Nova – Midnight Bloom",
        description: "Classic black with contrasting ivory and champagne floral artwork.",
        imageSrc: "/images/client_products/Noa/Black.png",
      },
      {
        name: "Navy Blue",
        slug: "navy-blue",
        hex: "#1C2E4A",
        available: true,
        variantName: "Nova – Midnight Botanica",
        description: "Rich navy blue with elegant neutral-toned florals.",
        imageSrc: "/images/client_products/Noa/navy-blue.png",
      },
      {
        name: "Forest Green",
        slug: "forest-green",
        hex: "#1E3A2F",
        available: true,
        variantName: "Nova – Forest Bloom",
        description: "Deep forest green with soft ivory flowers and muted botanical accents.",
        imageSrc: "/images/client_products/Noa/forest-green.png",
      },
      {
        name: "Taupe",
        slug: "taupe",
        hex: "#A89480",
        available: true,
        variantName: "Nova – Mocha Bloom",
        description: "Sophisticated taupe with warm floral detailing.",
        imageSrc: "/images/client_products/Noa/taupe.png",
      },
    ],
    images: [
      {
        src: "/images/client_products/Noa/beige.png",
        alt: "Noa Structured Floral Shoulder Bag in Beige Ivory Bloom",
      },
      {
        src: "/images/client_products/Noa/Black.png",
        alt: "Noa Structured Floral Shoulder Bag in Black Midnight Bloom",
      },
      {
        src: "/images/client_products/Noa/forest-green.png",
        alt: "Noa Structured Floral Shoulder Bag in Forest Green Forest Bloom",
      },
      {
        src: "/images/client_products/Noa/navy-blue.png",
        alt: "Noa Structured Floral Shoulder Bag in Navy Blue Midnight Botanica",
      },
      {
        src: "/images/client_products/Noa/taupe.png",
        alt: "Noa Structured Floral Shoulder Bag in Taupe Mocha Bloom",
      },
    ],
  },
  {
    id: "liora",
    slug: "liora",
    name: "Liora",
    fullName: "Liora Structured Floral Shoulder Bag",
    category: "handbag",
    subcategory: "Structured Shoulder Bag",
    style: "Feminine, Contemporary & Chic",
    collection: "LEFEMME Floral Collection",
    tagline: "Beautifully structured. Unapologetically feminine.",
    description:
      "A beautifully defined shape with soft curves and a gently scooped opening, Liora is designed for the girl who loves her florals with a little extra personality. Her vibrant pink botanical artwork positioned along both sides of the bag creates an elegant yet playful appearance. Featuring an adjustable buckle shoulder handle (20–25 cm drop), secure zip closure, two deep makeup pockets, an extended slip pocket, a phone-ready zipper pocket, and an interior dog hook key holder, Liora is a comfortable companion for coffee dates, brunch plans, and everything in between.",
    copyStatus: "client",
    priceCents: 79900,
    priceIsDemo: true,
    tentativePriceNote: "₹799 — Tentative Launch Price",
    sortOrder: 4,
    dimensions: {
      length: "30 cm",
      height: "22 cm",
      depth: "10 cm",
      handleDrop: "Adjustable: 20–25 cm",
      strapAdjustment: "Buckle Adjuster",
      sizeCategory: "Small-to-Medium",
      carryingStyle: "Shoulder Bag",
    },
    materials: {
      exterior: "Premium PU Leather",
      interior: "Fabric Lining",
      hardware: "Gold-Tone Metal",
      closure: "Top Zipper",
      decoration: "Printed Botanical Artwork",
      branding: "LEFEMME Gold-Tone Logo",
    },
    features: [
      { feature: "Signature Structured Silhouette", description: "Soft curves and gently scooped opening designed to maintain its distinctive form." },
      { feature: "Vibrant Floral Artwork", description: "Romantic pink botanical prints along both sides for a playful yet elegant look." },
      { feature: "Adjustable Shoulder Handle", description: "Buckle-adjustable handle (20–25 cm drop) for tailored shoulder fit." },
      { feature: "Two Deep Makeup Pockets", description: "Dedicated interior compartments for lipsticks and small beauty essentials." },
      { feature: "Extended Slip & Zipper Pocket", description: "Generously sized compartments for smartphone and daily essentials." },
      { feature: "Built-in Key Holder", description: "Interior dog hook keeps keys safe and accessible." },
    ],
    colors: [
      {
        name: "Beige",
        slug: "beige",
        hex: "#D4C4B0",
        available: true,
        variantName: "Leora – Blush Bloom",
        description: "Soft beige with vibrant pink floral detailing.",
        imageSrc: "/images/client_products/Liora/beige.png",
      },
      {
        name: "Black",
        slug: "black",
        hex: "#1A1A1A",
        available: true,
        variantName: "Leora – Midnight Rose",
        description: "Classic black with contrasting pink blossoms.",
        imageSrc: "/images/client_products/Liora/Black.png",
      },
      {
        name: "Navy Blue",
        slug: "navy-blue",
        hex: "#1C2E4A",
        available: true,
        variantName: "Leora – Midnight Botanica",
        description: "Deep navy blue complemented by vibrant pink florals.",
        imageSrc: "/images/client_products/Liora/navy-blue.png",
      },
      {
        name: "Forest Green",
        slug: "forest-green",
        hex: "#1E3A2F",
        available: true,
        variantName: "Leora – Forest Blossom",
        description: "Rich forest green with romantic pink botanical artwork.",
        imageSrc: "/images/client_products/Liora/forest-green.png",
      },
      {
        name: "Taupe",
        slug: "taupe",
        hex: "#A89480",
        available: true,
        variantName: "Leora – Mocha Rose",
        description: "Sophisticated taupe with soft pink floral accents.",
        imageSrc: "/images/client_products/Liora/taupe.png",
      },
    ],
    images: [
      {
        src: "/images/client_products/Liora/beige.png",
        alt: "Liora Structured Floral Shoulder Bag in Beige Blush Bloom with pink florals",
      },
      {
        src: "/images/client_products/Liora/Black.png",
        alt: "Liora Structured Floral Shoulder Bag in Black Midnight Rose",
      },
      {
        src: "/images/client_products/Liora/forest-green.png",
        alt: "Liora Structured Floral Shoulder Bag in Forest Green Forest Blossom",
      },
      {
        src: "/images/client_products/Liora/navy-blue.png",
        alt: "Liora Structured Floral Shoulder Bag in Navy Blue Midnight Botanica",
      },
      {
        src: "/images/client_products/Liora/taupe.png",
        alt: "Liora Structured Floral Shoulder Bag in Taupe Mocha Rose",
      },
    ],
  },
  {
    id: "hadar",
    slug: "hadar",
    name: "Hadar",
    fullName: "Hadar Structured Floral Work Tote",
    category: "handbag",
    subcategory: "Large Work Tote / Laptop Tote",
    tagline: "Beautifully feminine. Seriously functional.",
    description:
      "Meet Hadar — your new favourite 9-to-5 companion. For the girl who’s got meetings to attend, dreams to chase, and a hundred little things to carry. With her beautifully structured silhouette, delicate botanical outer panels, and spacious interior, Hadar brings together femininity and everyday functionality. Thoughtfully engineered with a dedicated 13-inch padded laptop compartment, iPad slip pocket, breathable mesh charger holder, interior water bottle securing strap, extended zipper pocket, and dedicated makeup organizers. Finished with comfortable shoulder handles and a secure top zipper closure, Hadar carries you effortlessly from morning commute to after-work plans. Because being ambitious doesn’t mean leaving your feminine side behind. ♡",
    copyStatus: "client",
    priceCents: 119900,
    priceIsDemo: true,
    tentativePriceNote: "₹1,199 — Tentative Launch Price",
    sortOrder: 5,
    dimensions: {
      topWidth: "42 cm",
      bottomWidth: "35 cm",
      height: "30 cm",
      depth: "14 cm",
      handleDrop: "25 cm",
      laptopCompatibility: "Designed for laptops up to 13 inches",
      sizeCategory: "Large Work Tote",
      carryingStyle: "Shoulder Tote",
    },
    materials: {
      exterior: "Premium PU Leather",
      interior: "Durable Fabric Lining with Internal Reinforcement",
      hardware: "Gold-Tone Metal",
      closure: "Full-Length Top Zipper",
      decoration: "Printed Botanical Artwork",
      branding: "LEFEMME Metal Logo Plate",
    },
    features: [
      { feature: "Large Structured Silhouette", description: "Spacious, structured body designed to hold its shape while carrying full workday essentials." },
      { feature: "13-Inch Laptop Compartment", description: "Dedicated padded interior compartment designed to hold a 13-inch laptop securely." },
      { feature: "Dedicated iPad Slip Pocket", description: "Additional padded slip pocket positioned alongside the laptop compartment for tablets." },
      { feature: "Mesh Charger Pocket", description: "Breathable mesh compartment designed to organize laptop charger, cables, or accessories." },
      { feature: "Water Bottle Holder Strap", description: "Interior securing strap designed to keep water bottles upright and spill-free." },
      { feature: "Makeup Organisers & Slip Pockets", description: "Two deep makeup pockets plus an extended slip pocket for compact mirror and cosmetics." },
    ],
    colors: [
      {
        name: "Beige",
        slug: "beige",
        hex: "#D4C4B0",
        available: true,
        variantName: "Ivory Garden",
        description: "Soft beige with delicate green vines and subtle pink floral detailing.",
        imageSrc: "/images/client_products/Hadar/beige.png",
      },
      {
        name: "Black",
        slug: "black",
        hex: "#1A1A1A",
        available: true,
        variantName: "Midnight Garden",
        description: "Classic black complemented by elegant botanical artwork.",
        imageSrc: "/images/client_products/Hadar/black.png",
      },
      {
        name: "Navy Blue",
        slug: "navy-blue",
        hex: "#1C2E4A",
        available: true,
        variantName: "Midnight Botanica",
        description: "Rich navy blue with delicate floral vines.",
        imageSrc: "/images/client_products/Hadar/navy-blue.png",
      },
      {
        name: "Forest Green",
        slug: "forest-green",
        hex: "#1E3A2F",
        available: true,
        variantName: "Forest Poetry",
        description: "Deep forest green with soft botanical detailing.",
        imageSrc: "/images/client_products/Hadar/forest-green.png",
      },
      {
        name: "Taupe",
        slug: "taupe",
        hex: "#A89480",
        available: true,
        variantName: "Mocha Garden",
        description: "A sophisticated earthy neutral with delicate floral accents.",
        imageSrc: "/images/client_products/Hadar/Taupe.png",
      },
    ],
    images: [
      {
        src: "/images/client_products/Hadar/beige.png",
        alt: "Hadar Structured Floral Work Tote in Beige Ivory Garden",
      },
      {
        src: "/images/client_products/Hadar/black.png",
        alt: "Hadar Structured Floral Work Tote in Black Midnight Garden",
      },
      {
        src: "/images/client_products/Hadar/forest-green.png",
        alt: "Hadar Structured Floral Work Tote in Forest Green Forest Poetry",
      },
      {
        src: "/images/client_products/Hadar/navy-blue.png",
        alt: "Hadar Structured Floral Work Tote in Navy Blue Midnight Botanica",
      },
      {
        src: "/images/client_products/Hadar/Taupe.png",
        alt: "Hadar Structured Floral Work Tote in Taupe Mocha Garden",
      },
    ],
  },
  {
    id: "butterfly-charm",
    slug: "butterfly-charm",
    name: "Butterfly Charm",
    fullName: "LEFEMME Butterfly Charm 🦋",
    category: "charm",
    subcategory: "Bag Charms & Accessories",
    tagline: "A little butterfly, a little extra personality!",
    description:
      "Add a charming touch to your favourite handbag with our LEFEMME Butterfly Charm. Crafted from PU leather with delicate stitched detailing and elegant gold-tone hardware, it’s the perfect little accessory to make your bag feel more you. Small detail. Big personality. ♡",
    copyStatus: "client",
    priceCents: 14900,
    priceIsDemo: true,
    tentativePriceNote: "₹149 — Suggested Retail Price",
    sortOrder: 6,
    dimensions: {
      length: "7 cm",
      height: "5.5 cm",
      hangingLength: "11–13 cm total hanging length",
    },
    materials: {
      exterior: "PU Leather with delicate decorative stitching",
      hardware: "Gold-Tone Chain & Clip-on Hook",
    },
    features: [
      { feature: "Butterfly-Shaped Design", description: "Butterfly-shaped PU leather charm with delicate decorative stitching." },
      { feature: "Gold-Tone Clip Hook", description: "Easy-to-attach clip hook suited for handbags, totes, keys, and accessories." },
      { feature: "Lightweight", description: "Compact and featherlight to add personality without weighing down your bag." },
    ],
    colors: [
      {
        name: "Forest Green",
        slug: "forest-green",
        hex: "#1E3A2F",
        available: true,
        imageSrc: "/images/client_products/Charms/butterfly.png",
      },
      { name: "Black", slug: "black", hex: "#1A1A1A", available: true },
      { name: "Navy Blue", slug: "navy-blue", hex: "#1C2E4A", available: true },
      { name: "Taupe", slug: "taupe", hex: "#A89480", available: true },
      { name: "Beige", slug: "beige", hex: "#D4C4B0", available: true },
      { name: "Burgundy", slug: "burgundy", hex: "#6E2C3A", available: true },
    ],
    images: [
      {
        src: "/images/client_products/Charms/butterfly.png",
        alt: "LEFEMME Butterfly Charm in PU leather with decorative stitching and gold-tone clip",
      },
    ],
  },
  {
    id: "cherry-charm",
    slug: "cherry-charm",
    name: "Cherry Charm",
    fullName: "LEFEMME Cherry Charm 🍒",
    category: "charm",
    subcategory: "Bag Charms & Accessories",
    tagline: "A little sweetness, wherever you go!",
    description:
      "Add a playful touch to your favourite handbag with our LEFEMME Cherry Charm. Featuring two adorable burgundy cherries, delicate green leaves, and elegant gold-tone hardware, this little charm is the perfect finishing touch to your everyday bag. Clip it onto your favourite LEFEMME handbag or use it as a cute keychain accessory. Two little cherries. A whole lot of charm. ♡",
    copyStatus: "client",
    priceCents: 14900,
    priceIsDemo: true,
    tentativePriceNote: "₹149 — Suggested Retail Price",
    sortOrder: 7,
    dimensions: {
      length: "7 cm",
      height: "8 cm",
      hangingLength: "12–14 cm total hanging length",
    },
    materials: {
      exterior: "Soft, layered PU Leather with stitched detailing",
      hardware: "Gold-Tone Chain & Clip-on Hook",
    },
    features: [
      { feature: "Double-Cherry Design", description: "Two heart-shaped burgundy cherries with forest green leaves." },
      { feature: "Layered PU Construction", description: "Soft, tactile multi-layered leathercraft." },
      { feature: "Gold-Tone Clip Hook", description: "Easy-to-attach clip hook suited for handbags, totes, and keychains." },
    ],
    colors: [
      {
        name: "Burgundy & Forest Green",
        slug: "burgundy-green",
        hex: "#6E2C3A",
        available: true,
        imageSrc: "/images/client_products/Charms/cherry.png",
      },
    ],
    images: [
      {
        src: "/images/client_products/Charms/cherry.png",
        alt: "LEFEMME Cherry Charm in burgundy PU leather with forest green leaves and gold-tone clip",
      },
    ],
  },
  {
    id: "blueberry-charm",
    slug: "blueberry-charm",
    name: "Blueberry Charm",
    fullName: "LEFEMME Blueberry Charm 🫐",
    category: "charm",
    subcategory: "Bag Charms & Accessories",
    tagline: "A little berry, a whole lot of sweetness!",
    description:
      "Add a sweet, playful touch to your favourite handbag with our LEFEMME Blueberry Charm. Featuring two adorable navy blue blueberries, delicate forest green leaves, and elegant gold-tone hardware, this little charm is the perfect accessory to make your everyday bag feel a little more special. Two little blueberries. A whole lot of charm. ♡",
    copyStatus: "client",
    priceCents: 14900,
    priceIsDemo: true,
    tentativePriceNote: "₹149 — Suggested Retail Price",
    sortOrder: 8,
    dimensions: {
      length: "7 cm",
      height: "8 cm",
      hangingLength: "12–14 cm total hanging length",
    },
    materials: {
      exterior: "Soft, layered PU Leather with stitched detailing",
      hardware: "Gold-Tone Chain & Clip-on Hook",
    },
    features: [
      { feature: "Double-Blueberry Design", description: "Rounded navy blueberries with forest green leaves." },
      { feature: "Layered PU Construction", description: "Soft, tactile multi-layered leathercraft." },
      { feature: "Gold-Tone Clip Hook", description: "Easy-to-attach clip hook suited for handbags, totes, and keychains." },
    ],
    colors: [
      {
        name: "Navy Blue & Forest Green",
        slug: "navy-green",
        hex: "#1C2E4A",
        available: true,
        imageSrc: "/images/client_products/Charms/blueberry.png",
      },
    ],
    images: [
      {
        src: "/images/client_products/Charms/blueberry.png",
        alt: "LEFEMME Blueberry Charm in navy blue PU leather with forest green leaves and gold-tone clip",
      },
    ],
  },
  {
    id: "bow-charm",
    slug: "bow-charm",
    name: "Bow Charm",
    fullName: "LEFEMME Bow Charm 🎀",
    category: "charm",
    subcategory: "Bag Charms & Accessories",
    tagline: "A little bow, a little extra elegance!",
    description:
      "Add a sweet, feminine touch to your favourite handbag with our LEFEMME Bow Charm. Featuring a beautifully shaped bow, delicate stitched detailing, and elegant gold-tone hardware, this charming accessory adds the perfect finishing touch to your everyday bag. Little bows make everything prettier. ♡",
    copyStatus: "client",
    priceCents: 14900,
    priceIsDemo: true,
    tentativePriceNote: "₹149 — Suggested Retail Price",
    sortOrder: 9,
    dimensions: {
      length: "8 cm",
      height: "6 cm",
      hangingLength: "12–14 cm total hanging length",
    },
    materials: {
      exterior: "Soft, layered PU Leather with decorative stitching",
      hardware: "Gold-Tone Chain & Clip-on Hook",
    },
    features: [
      { feature: "Elegant Bow Design", description: "Feminine bow-shaped PU leather with delicate ribbon detailing." },
      { feature: "Gold-Tone Clip Hook", description: "Easy-to-attach clip hook suited for handbags, totes, and keychains." },
      { feature: "Layered PU Construction", description: "Durable yet soft and supple." },
    ],
    colors: [
      {
        name: "Taupe",
        slug: "taupe",
        hex: "#A89480",
        available: true,
        imageSrc: "/images/client_products/Charms/bow.png",
      },
      { name: "Black", slug: "black", hex: "#1A1A1A", available: true },
      { name: "Navy Blue", slug: "navy-blue", hex: "#1C2E4A", available: true },
      { name: "Beige", slug: "beige", hex: "#D4C4B0", available: true },
      { name: "Forest Green", slug: "forest-green", hex: "#1E3A2F", available: true },
      { name: "Burgundy", slug: "burgundy", hex: "#6E2C3A", available: true },
    ],
    images: [
      {
        src: "/images/client_products/Charms/bow.png",
        alt: "LEFEMME Bow Charm in PU leather with gold-tone hardware",
      },
    ],
  },
  {
    id: "heart-charm",
    slug: "heart-charm",
    name: "Heart Charm",
    fullName: "LEFEMME Heart Charm ❤️",
    category: "charm",
    subcategory: "Bag Charms & Accessories",
    tagline: "A little heart, a whole lot of love!",
    description:
      "Add a touch of love to your favourite handbag with our LEFEMME Heart Charm. Featuring a beautifully shaped heart, delicate stitched detailing, and elegant gold-tone hardware, this charming accessory is the perfect little addition to make your everyday bag feel more special. A little love goes a long way. ♡",
    copyStatus: "client",
    priceCents: 14900,
    priceIsDemo: true,
    tentativePriceNote: "₹149 — Suggested Retail Price",
    sortOrder: 10,
    dimensions: {
      length: "6 cm",
      height: "6 cm",
      hangingLength: "11–13 cm total hanging length",
    },
    materials: {
      exterior: "Soft, layered PU Leather with decorative stitching",
      hardware: "Gold-Tone Chain & Clip-on Hook",
    },
    features: [
      { feature: "Classic Heart Design", description: "Softly padded heart silhouette with delicate perimeter stitching." },
      { feature: "Gold-Tone Clip Hook", description: "Easy-to-attach clip hook suited for handbags, totes, and keychains." },
      { feature: "Layered PU Construction", description: "Durable yet soft and lightweight." },
    ],
    colors: [
      {
        name: "Burgundy",
        slug: "burgundy",
        hex: "#6E2C3A",
        available: true,
        imageSrc: "/images/client_products/Charms/heart.png",
      },
      { name: "Black", slug: "black", hex: "#1A1A1A", available: true },
      { name: "Navy Blue", slug: "navy-blue", hex: "#1C2E4A", available: true },
      { name: "Taupe", slug: "taupe", hex: "#A89480", available: true },
      { name: "Beige", slug: "beige", hex: "#D4C4B0", available: true },
      { name: "Forest Green", slug: "forest-green", hex: "#1E3A2F", available: true },
    ],
    images: [
      {
        src: "/images/client_products/Charms/heart.png",
        alt: "LEFEMME Heart Charm in burgundy PU leather with gold-tone clip",
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
  // Support both new slugs (e.g. 'heart-charm') and legacy slugs ('heart-leather-charm')
  return products.find(
    (p) => p.slug === slug || p.slug.replace("-charm", "-leather-charm") === slug,
  );
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => {
    const hay = `${p.name} ${p.tagline} ${p.category} ${p.colors.map((c) => c.name).join(" ")}`.toLowerCase();
    return hay.includes(q);
  });
}

/**
 * Formats price in Indian Rupees (INR, ₹) per the client workbook.
 */
export function formatDemoPrice(cents: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
