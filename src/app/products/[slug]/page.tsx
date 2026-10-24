import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/product/ProductCard";
import { getProductBySlug, products } from "@/data/catalog";
import { ensureCatalogSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await ensureCatalogSeeded();
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <main id="main" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-[11px] uppercase tracking-[0.18em] text-taupe">
        <Link href="/" className="hover:text-forest">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={product.category === "handbag" ? "/handbags" : "/charms"}
          className="hover:text-forest"
        >
          {product.category === "handbag" ? "Handbags" : "Bag charms"}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-forest">{product.name}</span>
      </nav>

      <div className="mt-8">
        <ProductDetail product={product} />
      </div>

      {related.length > 0 ? (
        <section className="mt-24 border-t border-gold/20 pt-16">
          <h2 className="font-serif text-3xl text-forest">You may also like</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
