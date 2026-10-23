import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function ProductGrid({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
        className,
      )}
    >
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % 5) * 0.07}>
          <ProductCard product={product} priority={index < 2} />
        </Reveal>
      ))}
    </div>
  );
}
