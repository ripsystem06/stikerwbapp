"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-20 z-40 border-b border-surface-container-high bg-background/95 py-4 backdrop-blur-md">
      {/* Subtle accent line */}
      <div aria-hidden="true" className="mb-3 h-px w-12 bg-primary-container" />

      {/* Pills row with arrows */}
      <div className="flex items-center gap-1">
        {/* Left arrow */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="hidden shrink-0 p-1 text-on-surface-variant transition-colors hover:text-primary-container sm:block"
          aria-label="Desplazar categorías a la izquierda"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Scrollable pills */}
        <div
          ref={scrollRef}
          role="tablist"
          aria-label="Filtrar por categoría"
          className="flex flex-nowrap items-center gap-2 overflow-x-auto scroll-smooth pb-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={`${cat.value}-${cat.label}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() =>
                  dispatch({ type: "SET_CATEGORY", category: cat.value })
                }
                className={`shrink-0 border px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors rounded-none font-[family-name:var(--font-jetbrains-mono)] ${
                  isActive
                    ? "border-primary-container bg-primary-container text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                    : "border-surface-container-high bg-transparent text-on-surface hover:border-primary-container/60 hover:text-primary-container"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="hidden shrink-0 p-1 text-on-surface-variant transition-colors hover:text-primary-container sm:block"
          aria-label="Desplazar categorías a la derecha"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
