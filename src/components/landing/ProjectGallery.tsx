"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────────
type GalleryCategory =
  | "Negocios"
  | "Productos"
  | "Packaging"
  | "Motorsport"
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
  "Motorsport",
  "Vehículos",
  "Eventos",
  "Especiales",
];

// ── Gallery data ───────────────────────────────────────────
const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    category: "Negocios",
    gradient: "from-indigo-900 via-purple-900 to-slate-900",
    isFeatured: true,
  },
  {
    id: "g2",
    category: "Packaging",
    gradient: "from-emerald-900 via-teal-900 to-cyan-900",
    isFeatured: false,
  },
  {
    id: "g3",
    category: "Motorsport",
    gradient: "from-orange-900 via-red-900 to-amber-900",
    isFeatured: true,
  },
  {
    id: "g4",
    category: "Vehículos",
    gradient: "from-blue-900 via-indigo-900 to-violet-900",
    isFeatured: false,
  },
  {
    id: "g5",
    category: "Eventos",
    gradient: "from-pink-900 via-rose-900 to-fuchsia-900",
    isFeatured: false,
  },
  {
    id: "g6",
    category: "Productos",
    gradient: "from-cyan-900 via-sky-900 to-blue-900",
    isFeatured: false,
  },
  {
    id: "g7",
    category: "Negocios",
    gradient: "from-slate-800 via-gray-800 to-zinc-800",
    isFeatured: false,
  },
  {
    id: "g8",
    category: "Especiales",
    gradient: "from-amber-900 via-yellow-900 to-orange-900",
    isFeatured: true,
  },
  {
    id: "g9",
    category: "Motorsport",
    gradient: "from-red-900 via-orange-900 to-yellow-900",
    isFeatured: false,
  },
  {
    id: "g10",
    category: "Packaging",
    gradient: "from-green-900 via-lime-900 to-emerald-900",
    isFeatured: false,
  },
  {
    id: "g11",
    category: "Vehículos",
    gradient: "from-violet-900 via-purple-900 to-fuchsia-900",
    isFeatured: false,
  },
  {
    id: "g12",
    category: "Eventos",
    gradient: "from-rose-900 via-pink-900 to-orange-900",
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
            className={`h-10 w-full rounded bg-gradient-to-br ${stage.gradient}`}
            aria-hidden="true"
          />
          <span className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">
            {stage.label}
          </span>
          {i < stages.length - 1 && (
            <span className="hidden text-[10px] text-primary/60 sm:inline">
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
      className="group relative cursor-pointer overflow-hidden rounded-xl"
    >
      {/* Gradient placeholder */}
      <div
        className={`aspect-[3/4] w-full bg-gradient-to-br ${item.gradient}`}
        aria-hidden="true"
      />
      {/* Subtle dot pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="rounded-lg bg-primary/20 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm">
          Ver proyecto
        </span>
        <span className="mt-2 text-xs text-text-secondary">
          {item.category}
        </span>
      </div>
      {/* Category tag */}
      <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {item.category}
      </span>
      {/* Featured comparison strip */}
      {item.isFeatured && <FeaturedComparison item={item} />}
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
      {/* Section header */}
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl font-extrabold uppercase italic tracking-wide text-text-primary sm:text-4xl">
          PROYECTOS QUE HABLAN
          <br />
          POR SÍ SOLOS
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary sm:text-lg">
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
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeFilter === category
                ? "bg-primary text-white"
                : "bg-surface-alt text-text-secondary hover:bg-surface-alt/80 hover:text-text-primary"
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
              className="py-16 text-center text-text-secondary"
            >
              No hay proyectos en esta categoría todavía.{" "}
              <button
                type="button"
                onClick={() => setActiveFilter("Todos")}
                className="font-medium text-primary hover:underline"
              >
                Ver todos
              </button>
            </m.p>
          ) : (
            <m.div
              key={activeFilter}
              className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
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
    </section>
  );
}
