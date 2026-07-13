"use client";

import { m } from "framer-motion";
import { useQuoteContext } from "@/hooks/useQuoteConfigurator";
import type { ProductCategory } from "@/lib/schemas";

interface CategoryPill {
  label: string;
  value: ProductCategory | "all";
}

const CATEGORIES: CategoryPill[] = [
  { label: "Todos", value: "all" },
  { label: "Personalizados", value: "custom" },
  { label: "Empresas", value: "business" },
  { label: "Motorsport", value: "motorsport" },
  { label: "Eventos", value: "other" },
  { label: "Otros", value: "other" },
];

export default function CategoryFilter() {
  const {
    state: { activeCategory },
    dispatch,
  } = useQuoteContext();

  return (
    <div className="sticky top-20 z-40 border-b border-surface-container-high bg-background/95 py-4 backdrop-blur-md">
      {/* Subtle accent line */}
      <div
        aria-hidden="true"
        className="mb-3 h-px w-12 bg-primary-container"
      />

      {/* Pills row */}
      <div
        role="tablist"
        aria-label="Filtrar por categoría"
        className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <m.button
              key={`${cat.value}-${cat.label}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() =>
                dispatch({ type: "SET_CATEGORY", category: cat.value })
              }
              whileTap={{ scale: 0.97 }}
              className={`shrink-0 border px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors rounded-none font-[family-name:var(--font-jetbrains-mono)] ${
                isActive
                  ? "border-primary-container bg-primary-container text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                  : "border-surface-container-high bg-transparent text-on-surface hover:border-primary-container/60 hover:text-primary-container"
              }`}
            >
              {cat.label}
            </m.button>
          );
        })}
      </div>
    </div>
  );
}
