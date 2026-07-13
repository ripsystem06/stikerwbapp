"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Building2,
  ShoppingBag,
  Package,
  UtensilsCrossed,
  Trophy,
  Flag,
  Car,
  Bike,
  Truck,
  CalendarDays,
  Star,
  type LucideIcon,
} from "lucide-react";

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
  client: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  icon: LucideIcon;
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
    client: "Bufete Jurídico LexCorp",
    title: "Branding Corporativo Completo",
    description:
      "Identidad visual unificada para oficinas, papelería, vehículos y señalética corporativa en 3 sucursales.",
    tags: ["Vinilo Premium", "Corte de Precisión", "Interior/Exterior"],
    gradient: "from-indigo-900 via-purple-900 to-slate-900",
    icon: Building2,
    isFeatured: true,
  },
  {
    id: "g2",
    category: "Negocios",
    client: "Coworking Nido CDMX",
    title: "Señalética y Ambientación",
    description:
      "Stickers decorativos para muros, cristales y mobiliario. Diseño minimalista que refuerza la identidad del espacio.",
    tags: ["Vinilo Transparente", "Corte Plotter", "Alto Tráfico"],
    gradient: "from-slate-800 via-gray-800 to-zinc-800",
    icon: Building2,
    isFeatured: false,
  },
  // ── Productos (2) ──
  {
    id: "g3",
    category: "Productos",
    client: "Miel Artesanal Monteverde",
    title: "Etiquetas para Línea Gourmet",
    description:
      "Etiquetas troqueladas con acabado mate y detalles dorados para frascos de miel premium. 5 variantes de producto.",
    tags: ["Papel Mate", "Hot Stamp Dorado", "Resistente a Humedad"],
    gradient: "from-amber-900 via-yellow-900 to-orange-900",
    icon: ShoppingBag,
    isFeatured: false,
  },
  {
    id: "g4",
    category: "Productos",
    client: "Vinos Tierra Antigua",
    title: "Etiquetas para Botellas Premium",
    description:
      "Etiquetas frontales y contraetiquetas con microtexto y detalles UV. Serie limitada de 3 cepas con diseño minimalista.",
    tags: ["Papel Texturizado", "Barniz UV Selectivo", "Resistente a Frío"],
    gradient: "from-red-950 via-burgundy-950 to-zinc-900",
    icon: ShoppingBag,
    isFeatured: false,
  },
  // ── Packaging (2) ──
  {
    id: "g5",
    category: "Packaging",
    client: "Café Tueste Lento",
    title: "Packaging Completo E-commerce",
    description:
      "Cajas, bolsas y stickers de seguridad para envíos. Diseño coherente desde el unboxing hasta el producto final.",
    tags: ["Kraft Adhesivo", "Corte Suaje", "Sellos de Seguridad"],
    gradient: "from-emerald-900 via-teal-900 to-cyan-900",
    icon: Package,
    isFeatured: true,
  },
  {
    id: "g6",
    category: "Packaging",
    client: "Velas Botánica",
    title: "Packaging Sensorial",
    description:
      "Stickers holográficos y etiquetas envolventes para línea de velas artesanales. Experiencia táctil y visual.",
    tags: ["Holográfico", "Barniz Suave al Tacto", "Corte Especial"],
    gradient: "from-fuchsia-900 via-purple-900 to-indigo-900",
    icon: Package,
    isFeatured: false,
  },
  // ── Alimentos (2) ──
  {
    id: "g7",
    category: "Alimentos",
    client: "Salsas Don Pedro",
    title: "Etiquetas Resistentes para Salsas",
    description:
      "Etiquetas waterproof para botellas de salsa picante. Resisten refrigeración, calor y manipulación constante.",
    tags: ["Vinilo Waterproof", "Laminado Brillante", "Resistente a Aceites"],
    gradient: "from-orange-900 via-red-900 to-rose-900",
    icon: UtensilsCrossed,
    isFeatured: false,
  },
  {
    id: "g8",
    category: "Alimentos",
    client: "Yogurtería La Nueva",
    title: "Etiquetas para Envases Retornables",
    description:
      "Sistema de etiquetado removible para envases de vidrio. Fácil de quitar sin residuos para reutilización.",
    tags: ["Adhesivo Removible", "Resistente a Lavados", "Ecológico"],
    gradient: "from-sky-900 via-cyan-900 to-teal-900",
    icon: UtensilsCrossed,
    isFeatured: false,
  },
  // ── Deportes (2) ──
  {
    id: "g9",
    category: "Deportes",
    client: "Club de Rugby Titanes",
    title: "Identidad para Equipo Completo",
    description:
      "Stickers para cascos, botellines, taquillas y utilería. Diseño agresivo que refleja la identidad del equipo.",
    tags: ["Laminado Heavy Duty", "Resistente a Impactos", "Alta Adherencia"],
    gradient: "from-blue-900 via-cyan-900 to-teal-900",
    icon: Trophy,
    isFeatured: false,
  },
  {
    id: "g10",
    category: "Deportes",
    client: "Academia de Fútbol Halcones",
    title: "Merchandising y Equipación",
    description:
      "Stickers para botellas, termos, mochilas y accesorios. Diseño dinámico para categorías infantiles y juveniles.",
    tags: ["Vinilo Brillante", "Corte Múltiple", "Exterior"],
    gradient: "from-red-900 via-orange-900 to-amber-900",
    icon: Trophy,
    isFeatured: false,
  },
  // ── Motorsport (2) ──
  {
    id: "g11",
    category: "Motorsport",
    client: "Team MX 23 Racing",
    title: "Kit Gráfico Campeonato Nacional",
    description:
      "Gráficos completos para 4 motos de competición. Diseño agresivo con patrocinadores integrados y números de carrera.",
    tags: ["Laminado 21mil", "Corte CNC", "Alta Resistencia UV"],
    gradient: "from-orange-900 via-red-900 to-amber-900",
    icon: Flag,
    isFeatured: true,
  },
  {
    id: "g12",
    category: "Motorsport",
    client: "Escudería Veloz GT",
    title: "Branding para Auto de Carreras",
    description:
      "Gráficos integrales para auto de turismo. Diseño aerodinámico que fluye con las líneas del vehículo.",
    tags: ["Vinilo Fundido", "Impresión Alta Definición", "Exterior Extremo"],
    gradient: "from-red-900 via-orange-900 to-yellow-900",
    icon: Car,
    isFeatured: false,
  },
  // ── Motocross (2) ──
  {
    id: "g13",
    category: "Motocross",
    client: "Piloto Álvarez #47",
    title: "Kit Personalizado KTM 450",
    description:
      "Gráficos para KTM 450 SX-F temporada 2025. Diseño con colores del piloto, patrocinadores y número integrado.",
    tags: ["Laminado Grueso 21mil", "Resistente a Barro", "Plantillas Exactas"],
    gradient: "from-lime-900 via-green-900 to-emerald-900",
    icon: Bike,
    isFeatured: false,
  },
  {
    id: "g14",
    category: "Motocross",
    client: "Equipo Enduro Norte",
    title: "Gráficos para Equipo de Enduro",
    description:
      "Kits para 6 motos del equipo. Diseño unificado con variaciones por piloto. Materiales ultra resistentes.",
    tags: ["Antiderrapante", "Corte Láser", "Protección UV"],
    gradient: "from-yellow-900 via-amber-900 to-orange-900",
    icon: Bike,
    isFeatured: false,
  },
  // ── Off-road (2) ──
  {
    id: "g15",
    category: "Off-road",
    client: "Aventura 4x4 Expediciones",
    title: "Kit Gráfico para Flotilla UTV",
    description:
      "Gráficos para 8 vehículos UTV Can-Am de uso turístico. Branding consistente con mapa de ruta integrado.",
    tags: ["Vinilo Fundido Premium", "Impresión Latex", "Exterior Permanente"],
    gradient: "from-stone-800 via-neutral-800 to-zinc-800",
    icon: Truck,
    isFeatured: false,
  },
  {
    id: "g16",
    category: "Off-road",
    client: "Rally Baja Aventura",
    title: "Números y Patrocinadores Rally",
    description:
      "Juego completo de números, nombres de piloto y patrocinadores para vehículo de rally cross-country.",
    tags: ["Reflectivo 3M", "Resistente a Piedras", "Fácil Aplicación"],
    gradient: "from-zinc-900 via-stone-900 to-neutral-900",
    icon: Truck,
    isFeatured: false,
  },
  // ── Vehículos (2) ──
  {
    id: "g17",
    category: "Vehículos",
    client: "Transportes Rápidos del Norte",
    title: "Branding para Flotilla Comercial",
    description:
      "Rotulación parcial para 15 furgonetas de reparto. Diseño corporativo con datos de contacto y QR integrado.",
    tags: ["Vinilo Fundido", "Alta Durabilidad", "Corte Computarizado"],
    gradient: "from-blue-900 via-indigo-900 to-violet-900",
    icon: Truck,
    isFeatured: false,
  },
  {
    id: "g18",
    category: "Vehículos",
    client: "Auto Detailing Premium",
    title: "Stickers para Vehículos de Lujo",
    description:
      "Calcomanías discretas para cristales de autos de alta gama. Diseño elegante con detalles metalizados.",
    tags: ["Efecto Metalizado", "Corte Láser Precisión", "Interior/Exterior"],
    gradient: "from-violet-900 via-purple-900 to-fuchsia-900",
    icon: Car,
    isFeatured: false,
  },
  // ── Eventos (2) ──
  {
    id: "g19",
    category: "Eventos",
    client: "Festival Sonidos del Desierto",
    title: "Identidad para Festival Musical",
    description:
      "Stickers promocionales, pulseras, señalización y backdrop. Diseño inmersivo para experiencia de 3 días.",
    tags: ["Producción Masiva", "Acabados Varios", "Aplicación Rápida"],
    gradient: "from-pink-900 via-rose-900 to-fuchsia-900",
    icon: CalendarDays,
    isFeatured: false,
  },
  {
    id: "g20",
    category: "Eventos",
    client: "Congreso Tech Norte 2025",
    title: "Material para Congreso Tecnológico",
    description:
      "Stickers para laptops, gafetes, stands y regalos corporativos. 5,000 piezas con diseño geométrico.",
    tags: ["Holográfico", "Troquelado Preciso", "Producción Rápida"],
    gradient: "from-cyan-900 via-sky-900 to-blue-900",
    icon: CalendarDays,
    isFeatured: false,
  },
  // ── Especiales (2) ──
  {
    id: "g21",
    category: "Especiales",
    client: "Estudio Creativo Polaris",
    title: "Colección de Arte en Stickers",
    description:
      "Serie limitada de stickers artísticos con tintas metálicas y barniz texturizado. Piezas de colección.",
    tags: ["Tintas Metálicas", "Barniz Texturizado", "Edición Limitada"],
    gradient: "from-violet-900 via-fuchsia-900 to-rose-900",
    icon: Star,
    isFeatured: false,
  },
  {
    id: "g22",
    category: "Especiales",
    client: "MakerLab Industrial",
    title: "Señalización Técnica para Maquinaria",
    description:
      "Stickers de seguridad, advertencia e instrucción para equipo industrial. Normas OSHA, altamente duraderos.",
    tags: ["Industrial Grado", "Resistencia Química", "Normas Cumplidas"],
    gradient: "from-yellow-900 via-amber-900 to-orange-900",
    icon: Star,
    isFeatured: false,
  },
];

// ── Animation variants ─────────────────────────────────────
const gridStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

// ── Featured comparison strip ──────────────────────────────
function FeaturedComparison({ item }: { item: GalleryItem }) {
  const stages = [
    { label: "ANTES", gradient: "from-zinc-700 via-zinc-600 to-zinc-700" },
    { label: "DISEÑO", gradient: item.gradient },
    {
      label: "RESULTADO",
      gradient: "from-primary-container/60 via-primary-container/40 to-primary-container/20",
    },
  ];

  return (
    <div className="mt-4 flex items-center gap-1.5 border-t border-surface-container-high pt-4">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex flex-1 flex-col items-center gap-1">
          <div
            className={`h-10 w-full rounded-none bg-gradient-to-br ${stage.gradient}`}
            aria-hidden="true"
          />
          <span className="font-[family-name:var(--font-mono)] text-[9px] font-bold uppercase tracking-wider text-on-surface-variant">
            {stage.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Gallery card ───────────────────────────────────────────
function GalleryCard({ item }: { item: GalleryItem }) {
  const Icon = item.icon;

  return (
    <m.div
      layout
      variants={itemFadeUp}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-none border border-surface-bright bg-surface-container transition-colors hover:border-primary-container hover:-translate-y-0.5"
    >
      {/* Dog-ear corner */}
      <div
        className="absolute right-0 top-0 z-10 h-12 w-12 translate-x-6 -translate-y-6 rotate-45 border-b border-l border-surface-bright bg-surface-container-lowest"
        aria-hidden="true"
      />

      {/* Image / visual area */}
      <div className="relative h-56 overflow-hidden bg-surface-container-low">
        <div
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br transition-transform duration-700 group-hover:scale-105 ${item.gradient}`}
          aria-hidden="true"
        >
          <Icon
            className="h-16 w-16 text-white/20 transition-transform duration-500 group-hover:scale-110"
            strokeWidth={1.5}
          />
        </div>
        {/* Category tag */}
        <span className="absolute left-3 top-3 rounded-none border border-surface-bright bg-surface-container-highest/90 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-on-surface backdrop-blur-sm">
          {item.category}
        </span>
        {/* Featured badge */}
        {item.isFeatured && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-none bg-primary-container px-2 py-0.5 font-[family-name:var(--font-mono)] text-[9px] font-bold uppercase text-black">
            <Star className="h-2.5 w-2.5 fill-black" />
            Destacado
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Client */}
        <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-primary-container">
          {item.client}
        </p>

        {/* Title */}
        <h3 className="mt-1 font-[family-name:var(--font-display)] text-base uppercase italic leading-tight text-on-surface">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-on-surface-variant">
          {item.description}
        </p>

        {/* Tech chips */}
        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-surface-container-high pt-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-none border border-surface-variant bg-surface-container-high px-2 py-0.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-on-surface-variant"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Featured comparison */}
        {item.isFeatured && <FeaturedComparison item={item} />}
      </div>
    </m.div>
  );
}

// ── Main component ─────────────────────────────────────────
export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState<"Todos" | GalleryCategory>("Todos");

  const filteredItems =
    activeFilter === "Todos"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* Tech grid overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-tech-grid" />

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
            De la pista a la estantería: precisión gráfica en cada aplicación. Exploramos los límites del diseño y la materialidad para hacer destacar tu marca.
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
