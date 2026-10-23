import { ProductGrid } from "@/components/product/ProductGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCharms } from "@/data/catalog";
import { ensureCatalogSeeded } from "@/lib/seed";

export const metadata = {
  title: "Bag Charms",
  description: "Heart, butterfly, bow, blueberry, and cherry leather charms from Lefemme.",
};

export const dynamic = "force-dynamic";

export default async function CharmsPage() {
  await ensureCatalogSeeded();
  const charms = getCharms();

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        align="left"
        eyebrow="Bag charms"
        title="A personal finishing touch."
        body="Five leather charms. Compatibility with individual handbags has not been confirmed for this demo."
      />
      <div className="mt-12">
        <ProductGrid products={charms} />
      </div>
    </main>
  );
}
