import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getHandbags } from "@/data/catalog";
import { ensureCatalogSeeded } from "@/lib/seed";

export const metadata = {
  title: "Handbags",
  description: "Adina, Ariel, Noa, Liora, and Hadar — the Lefemme handbag collection.",
};

export const dynamic = "force-dynamic";

export default async function HandbagsPage() {
  await ensureCatalogSeeded();
  const handbags = getHandbags();

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        align="left"
        eyebrow="Handbags"
        title="Carry a little bloom."
        body="Five structured floral handbags. Colourways shown only where an asset exists; additional photography will appear when supplied."
      />
      <div className="mt-12">
        <ProductGrid products={handbags} />
      </div>
    </main>
  );
}
