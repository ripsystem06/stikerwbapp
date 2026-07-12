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
  { label: "Productos", value: "business" },
  { label: "Motorsport", value: "motorsport" },
  { label: "Vehículos", value: "motorsport" },
  { label: "Eventos", value: "other" },
  { label: "Otros", value: "other" },
];

export default function CategoryFilter() {
  const {
    state: { activeCategory },
    dispatch,
  } = useQuoteContext();

  return (
    <div
      role="tablist"
      aria-label="Filtrar por categoría"
      className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-2"
    >
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.value;
        return (
          <m.button
            key={cat.label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() =>
              dispatch({ type: "SET_CATEGORY", category: cat.value })
            }
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "bg-surface text-text-secondary hover:text-text-primary"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {cat.label}
          </m.button>
        );
      })}
    </div>
  );
}
