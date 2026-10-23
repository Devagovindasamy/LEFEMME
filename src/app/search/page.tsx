import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { searchProducts } from "@/data/catalog";

export const metadata = {
  title: "Search",
  description: "Search the Lefemme demo collection.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchProducts(q);

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-[11px] uppercase tracking-[0.28em] text-burgundy">Search</p>
      <h1 className="font-serif mt-3 text-5xl text-forest">
        {q ? `Results for “${q}”` : "Search the collection"}
      </h1>
      <p className="mt-4 text-ink-soft">
        {results.length} {results.length === 1 ? "piece" : "pieces"}
      </p>
      {results.length > 0 ? (
        <div className="mt-12">
          <ProductGrid products={results} className="xl:grid-cols-4" />
        </div>
      ) : (
        <div className="mt-12">
          <p className="text-ink-soft">No matching pieces. Try Adina, charm, or navy.</p>
          <Link href="/shop" className="mt-4 inline-block text-sm text-forest underline">
            Browse all
          </Link>
        </div>
      )}
    </main>
  );
}
