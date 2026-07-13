"use client";

import { useQuoteContext } from "@/hooks/useQuoteConfigurator";
import products from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductSelector() {
  const {
    state: { activeCategory },
  } = useQuoteContext();

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const displayCount = filteredProducts.length;
  const totalCount = products.length;

  return (
    <div className="pt-6">
      {/* Product count */}
      <p
        className="text-xs font-bold uppercase tracking-wider text-on-surface-variant font-[family-name:var(--font-jetbrains-mono)]"
        aria-live="polite"
        aria-atomic="true"
      >
        {activeCategory === "all"
          ? `Mostrando ${displayCount} productos`
          : `Mostrando ${displayCount} de ${totalCount} productos`}
      </p>

      {filteredProducts.length === 0 ? (
        <p className="mt-12 text-center text-base leading-relaxed text-on-surface-variant">
          No hay productos en esta categoría
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
