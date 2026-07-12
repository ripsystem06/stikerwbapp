"use client";

import { m } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useQuoteContext } from "@/hooks/useQuoteConfigurator";
import type { Product } from "@/lib/schemas";

// ── Animation variants ────────────────────────────────────
const cardSelected = {
  borderColor: "#FF6B00",
  scale: 1.02,
};

const cardUnselected = {
  borderColor: "transparent",
  scale: 1,
};

// ── Category label map ────────────────────────────────────
const CATEGORY_LABEL: Record<string, string> = {
  custom: "Personalizados",
  business: "Empresas",
  motorsport: "Motorsport",
  other: "Otros",
};

// ── Component ─────────────────────────────────────────────
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isSelected, dispatch } = useQuoteContext();
  const selected = isSelected(product.id);

  const handleToggle = () => {
    if (selected) {
      dispatch({ type: "DESELECT_PRODUCT", productId: product.id });
    } else {
      dispatch({ type: "SELECT_PRODUCT", productId: product.id });
    }
  };

  return (
    <m.div
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
      animate={selected ? cardSelected : cardUnselected}
      whileHover={{ y: -2 }}
      className={`relative cursor-pointer overflow-hidden rounded-xl border-2 bg-surface transition-shadow hover:shadow-lg hover:shadow-primary/10 ${
        selected ? "border-primary" : "border-transparent"
      }`}
    >
      {/* Checkmark — top-right corner */}
      {selected && (
        <div className="absolute right-3 top-3 z-10">
          <CheckCircle
            className="h-6 w-6 text-primary"
            fill="currentColor"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-surface-alt">
        <div
          className="h-full w-full bg-gradient-to-br from-surface-alt to-surface"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category badge */}
        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {CATEGORY_LABEL[product.category] ?? product.category}
        </span>

        {/* Name */}
        <h3 className="mt-2 text-base font-bold text-text-primary">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {product.description}
        </p>

        {/* Selected indicator */}
        {selected && (
          <p className="mt-3 text-xs font-medium text-primary">
            Seleccionado
          </p>
        )}
      </div>
    </m.div>
  );
}
