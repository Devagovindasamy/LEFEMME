import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/catalog";
import { ensureCatalogSeeded } from "@/lib/seed";

export const metadata = {
  title: "Shop",
  description: "Shop Lefemme handbags and leather bag charms. Demo catalogue.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  await ensureCatalogSeeded();

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        align="left"
        eyebrow="Shop"
        title="The full collection."
        body="Handbags and charms, together. Prices and copy are demo placeholders until Lefemme confirms them."
      />
      <div className="mt-12">
        <ProductGrid products={products} className="xl:grid-cols-4" />
      </div>
    </main>
  );
}
