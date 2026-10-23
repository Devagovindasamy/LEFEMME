import { products } from "@/data/catalog";
import { db, pool } from "@/db";
import { productsTable } from "@/db/schema";

let seedPromise: Promise<void> | null = null;
let isSeeded = false;
let lastAttemptTime = 0;
const RETRY_COOLDOWN_MS = 60_000;

async function checkDatabaseReady(): Promise<boolean> {
  let client;
  try {
    client = await pool.connect();
  } catch {
    // Database is offline or connection refused.
    return false;
  }

  try {
    const res = await client.query(
      "SELECT 1 FROM information_schema.tables WHERE table_name = 'lefemme_products' LIMIT 1"
    );
    return (res.rowCount ?? 0) > 0;
  } catch {
    return false;
  } finally {
    client.release();
  }
}

async function seedCatalog() {
  if (isSeeded) return;

  const now = Date.now();
  if (now - lastAttemptTime < RETRY_COOLDOWN_MS) {
    return;
  }
  lastAttemptTime = now;

  const isReady = await checkDatabaseReady();
  if (!isReady) {
    // Database is offline or tables have not been created yet.
    // The storefront renders normally using local static data from @/data/catalog.
    return;
  }

  for (const product of products) {
    await db
      .insert(productsTable)
      .values({
        id: product.id,
        slug: product.slug,
        name: product.name,
        category: product.category,
        tagline: product.tagline,
        description: product.description,
        copyStatus: product.copyStatus,
        priceCents: product.priceCents,
        priceIsDemo: product.priceIsDemo,
        colors: product.colors,
        images: product.images,
        sortOrder: product.sortOrder,
        charmNote: product.charmNote ?? null,
      })
      .onConflictDoUpdate({
        target: productsTable.id,
        set: {
          slug: product.slug,
          name: product.name,
          category: product.category,
          tagline: product.tagline,
          description: product.description,
          copyStatus: product.copyStatus,
          priceCents: product.priceCents,
          priceIsDemo: product.priceIsDemo,
          colors: product.colors,
          images: product.images,
          sortOrder: product.sortOrder,
          charmNote: product.charmNote ?? null,
        },
      });
  }

  isSeeded = true;
}

export function ensureCatalogSeeded() {
  if (!seedPromise) {
    seedPromise = seedCatalog()
      .catch((error) => {
        console.warn("[seed] Catalog seed skipped:", (error as Error)?.message || error);
      })
      .finally(() => {
        seedPromise = null;
      });
  }
  return seedPromise;
}
