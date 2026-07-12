"use client";

import { useQuoteContext } from "@/hooks/useQuoteConfigurator";
import products from "@/lib/products";
import CategoryFilter from "./CategoryFilter";
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
    <div className="mt-12">
      <CategoryFilter />

      <p
        className="mt-6 text-sm text-text-secondary"
        aria-live="polite"
        aria-atomic="true"
      >
        {activeCategory === "all"
          ? `Mostrando ${displayCount} productos`
          : `Mostrando ${displayCount} de ${totalCount} productos`}
      </p>

      {filteredProducts.length === 0 ? (
        <p className="mt-12 text-center text-base text-text-secondary">
          No hay productos en esta categoría
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
