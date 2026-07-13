"use client";

import { m } from "framer-motion";
import { Check } from "lucide-react";
import { useQuoteContext } from "@/hooks/useQuoteConfigurator";
import type { Product } from "@/lib/schemas";

// ── Category label map ────────────────────────────────────
const CATEGORY_LABEL: Record<string, string> = {
  custom: "Personalizados",
  business: "Empresas",
  motorsport: "Motorsport",
  other: "Otros",
};

// ── Animation variants ────────────────────────────────────
const cardVariants = {
  selected: {
    borderColor: "#fe5825",
    scale: 1.02,
  },
  unselected: {
    borderColor: "#5b4039",
    scale: 1,
  },
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
      animate={selected ? "selected" : "unselected"}
      variants={cardVariants}
      whileHover={selected ? {} : { y: -2 }}
      className={`group relative cursor-pointer overflow-hidden border-2 bg-surface transition-colors rounded-none ${
        selected
          ? "border-primary-container"
          : "border-surface-container-high hover:border-surface-variant"
      }`}
    >
      {/* Dog-ear corner */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 z-10 size-8 rotate-45 translate-x-4 -translate-y-4 border-b-2 border-surface-container-high bg-surface-container-lowest"
      />

      {/* Selection indicator */}
      {selected && (
        <div className="absolute left-3 top-3 z-20 flex size-7 items-center justify-center bg-primary-container">
          <Check className="size-4 text-black" aria-hidden="true" />
        </div>
      )}

      {/* Image container */}
      <div className="relative h-56 overflow-hidden bg-surface-container-lowest">
        {/* Radial gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(254,88,37,0.12) 0%, rgba(14,14,14,0.8) 70%, transparent 100%)",
          }}
        />

        {/* Image / gradient placeholder */}
        <div
          className="h-full w-full bg-gradient-to-br from-surface-container-low to-surface object-contain transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        />

        {/* Category badge — top-left, over image */}
        <span className="absolute left-3 top-3 z-[2] border border-surface-variant/50 bg-surface-container-high/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-on-surface font-[family-name:var(--font-jetbrains-mono)]">
          {CATEGORY_LABEL[product.category] ?? product.category}
        </span>
      </div>

      {/* Content area */}
      <div className="flex flex-col bg-gradient-to-b from-surface to-surface-container-low p-5">
        {/* Product name */}
        <h3 className="font-[family-name:var(--font-anybody)] text-lg font-bold uppercase italic leading-tight tracking-tight text-on-surface">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-on-surface-variant">
          {product.description}
        </p>

        {/* Action area */}
        <div className="mt-auto pt-4">
          <div className="border-t border-surface-container-high pt-4">
            <span
              className={`flex w-full items-center justify-center border px-4 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors rounded-none font-[family-name:var(--font-jetbrains-mono)] ${
                selected
                  ? "border-primary-container bg-primary-container/10 text-primary-container"
                  : "border-surface-variant text-on-surface-variant group-hover:border-primary-container/60 group-hover:text-primary-container"
              }`}
            >
              {selected ? "SELECCIONADO" : "AGREGAR A COTIZACIÓN"}
            </span>
          </div>
        </div>
      </div>
    </m.div>
  );
}
