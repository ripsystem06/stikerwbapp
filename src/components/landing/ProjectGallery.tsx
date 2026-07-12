"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────────
type GalleryCategory =
  | "Negocios"
  | "Productos"
  | "Packaging"
  | "Alimentos"
  | "Deportes"
  | "Motorsport"
  | "Motocross"
  | "Off-road"
  | "Vehículos"
  | "Eventos"
  | "Especiales";

interface GalleryItem {
  id: string;
  category: GalleryCategory;
  gradient: string;
  isFeatured: boolean;
}

const ALL_CATEGORIES: ("Todos" | GalleryCategory)[] = [
  "Todos",
  "Negocios",
  "Productos",
  "Packaging",
  "Alimentos",
  "Deportes",
  "Motorsport",
  "Motocross",
  "Off-road",
  "Vehículos",
  "Eventos",
  "Especiales",
];

// ── Gallery data ───────────────────────────────────────────
const GALLERY_ITEMS: GalleryItem[] = [
  // ── Negocios (2) ──
  {
    id: "g1",
    category: "Negocios",
    gradient: "from-indigo-900 via-purple-900 to-slate-900",
    isFeatured: true,
  },
  {
    id: "g2",
    category: "Negocios",
    gradient: "from-slate-800 via-gray-800 to-zinc-800",
    isFeatured: false,
  },
  // ── Productos (2) ──
  {
    id: "g3",
    category: "Productos",
    gradient: "from-cyan-900 via-sky-900 to-blue-900",
    isFeatured: false,
  },
  {
    id: "g4",
    category: "Productos",
    gradient: "from-teal-900 via-emerald-900 to-green-900",
    isFeatured: false,
  },
  // ── Packaging (2) ──
  {
    id: "g12",
    category: "Packaging",
    gradient: "from-emerald-900 via-teal-900 to-cyan-900",
    isFeatured: false,
  },
  {
    id: "g6",
    category: "Packaging",
    gradient: "from-green-900 via-lime-900 to-emerald-900",
    isFeatured: false,
  },
  // ── Alimentos (2) ──
  {
    id: "g7",
    category: "Alimentos",
    gradient: "from-amber-900 via-yellow-900 to-orange-900",
    isFeatured: false,
  },
  {
    id: "g8",
    category: "Alimentos",
    gradient: "from-orange-900 via-red-900 to-rose-900",
    isFeatured: false,
  },
  // ── Deportes (2) ──
  {
    id: "g9",
    category: "Deportes",
    gradient: "from-blue-900 via-cyan-900 to-teal-900",
    isFeatured: false,
  },
  {
    id: "g10",
    category: "Deportes",
    gradient: "from-red-900 via-orange-900 to-amber-900",
    isFeatured: false,
  },
  // ── Motorsport (2) ──
  {
    id: "g5",
    category: "Motorsport",
    gradient: "from-orange-900 via-red-900 to-amber-900",
    isFeatured: true,
  },
  {
    id: "g11",
    category: "Motorsport",
    gradient: "from-red-900 via-orange-900 to-yellow-900",
    isFeatured: false,
  },
  // ── Motocross (2) ──
  {
    id: "g13",
    category: "Motocross",
    gradient: "from-lime-900 via-green-900 to-emerald-900",
    isFeatured: false,
  },
  {
    id: "g14",
    category: "Motocross",
    gradient: "from-yellow-900 via-amber-900 to-orange-900",
    isFeatured: false,
  },
  // ── Off-road (2) ──
  {
    id: "g23",
    category: "Off-road",
    gradient: "from-stone-800 via-neutral-800 to-zinc-800",
    isFeatured: false,
  },
  {
    id: "g24",
    category: "Off-road",
    gradient: "from-zinc-900 via-stone-900 to-neutral-900",
    isFeatured: false,
  },
  // ── Vehículos (2) ──
  {
    id: "g17",
    category: "Vehículos",
    gradient: "from-blue-900 via-indigo-900 to-violet-900",
    isFeatured: false,
  },
  {
    id: "g18",
    category: "Vehículos",
    gradient: "from-violet-900 via-purple-900 to-fuchsia-900",
    isFeatured: false,
  },
  // ── Eventos (2) ──
  {
    id: "g19",
    category: "Eventos",
    gradient: "from-pink-900 via-rose-900 to-fuchsia-900",
    isFeatured: false,
  },
  {
    id: "g20",
    category: "Eventos",
    gradient: "from-rose-900 via-pink-900 to-orange-900",
    isFeatured: false,
  },
  // ── Especiales (2) ──
  {
    id: "g15",
    category: "Especiales",
    gradient: "from-violet-900 via-fuchsia-900 to-rose-900",
    isFeatured: true,
  },
  {
    id: "g21",
    category: "Especiales",
    gradient: "from-fuchsia-900 via-purple-900 to-indigo-900",
    isFeatured: false,
  },
];

// ── Animation variants ─────────────────────────────────────
const gridStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.2 },
  },
};

// ── Featured comparison strip ──────────────────────────────
function FeaturedComparison({ item }: { item: GalleryItem }) {
  const stages = [
    { label: "ANTES", gradient: "from-zinc-700 via-zinc-600 to-zinc-700" },
    { label: "DISEÑO", gradient: item.gradient },
    { label: "RESULTADO", gradient: "from-primary/50 via-primary/40 to-primary/50" },
  ];

  return (
    <div className="mt-3 flex items-center gap-1.5">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex flex-1 flex-col items-center gap-1">
          <div
            className={`h-10 w-full rounded-none bg-gradient-to-br ${stage.gradient}`}
            aria-hidden="true"
          />
          <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            {stage.label}
          </span>
          {i < stages.length - 1 && (
            <span className="hidden font-[family-name:var(--font-mono)] text-[10px] text-primary-container sm:inline">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Gallery card ───────────────────────────────────────────
function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <m.div
      layout
      variants={itemFadeUp}
      className="group relative cursor-pointer overflow-hidden rounded-none border border-surface-bright bg-surface-container transition-colors hover:border-primary-container"
    >
      {/* Dog-ear corner */}
      <div
        className="absolute right-0 top-0 z-10 h-12 w-12 translate-x-6 -translate-y-6 rotate-45 border-b border-l border-surface-bright bg-surface-container-lowest"
        aria-hidden="true"
      />

      {/* Gradient placeholder */}
      <div className="relative h-56 overflow-hidden bg-surface-container-low">
        <div
          className={`h-full w-full bg-gradient-to-br transition-transform duration-700 group-hover:scale-105 ${item.gradient}`}
          aria-hidden="true"
        />
        {/* Category tag */}
        <span className="absolute left-3 top-3 rounded-none border border-surface-bright bg-surface-container-highest/90 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase text-on-surface">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="font-[family-name:var(--font-display)] text-sm uppercase italic text-on-surface">
          Proyecto {item.id.replace("g", "")}
        </p>
        <p className="mt-1 text-sm text-on-surface-variant">
          {item.isFeatured ? "Proyecto destacado" : item.category}
        </p>
        {/* Featured comparison strip */}
        {item.isFeatured && <FeaturedComparison item={item} />}
      </div>
    </m.div>
  );
}

// ── Main component ─────────────────────────────────────────
export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState<
    "Todos" | GalleryCategory
  >("Todos");

  const filteredItems =
    activeFilter === "Todos"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* Tech grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-tech-grid"
      />

      <div className="relative z-10">
        {/* Section header */}
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase italic tracking-wide text-on-surface sm:text-4xl">
            PROYECTOS QUE{" "}
            <span className="text-primary-container">HABLAN</span>
            <br />
            POR SÍ SOLOS
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-on-surface-variant sm:text-lg">
            Cada proyecto es único. Mirá algunos de nuestros trabajos y descubrí
            lo que podemos hacer por tu marca.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2 px-6">
          {ALL_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`rounded-none border px-4 py-1.5 font-[family-name:var(--font-mono)] text-xs uppercase transition-colors ${
                activeFilter === category
                  ? "border-primary-container bg-primary-container text-black"
                  : "border-surface-bright bg-surface-container-high text-on-surface-variant hover:border-surface-container-highest hover:text-on-surface"
              }`}
              aria-pressed={activeFilter === category}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="mx-auto mt-12 max-w-6xl px-6">
          <AnimatePresence mode="wait">
            {filteredItems.length === 0 ? (
              <m.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center text-on-surface-variant"
              >
                No hay proyectos en esta categoría todavía.{" "}
                <button
                  type="button"
                  onClick={() => setActiveFilter("Todos")}
                  className="font-medium text-primary-container hover:underline"
                >
                  Ver todos
                </button>
              </m.p>
            ) : (
              <m.div
                key={activeFilter}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                variants={gridStagger}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredItems.map((item) => (
                  <GalleryCard key={item.id} item={item} />
                ))}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
