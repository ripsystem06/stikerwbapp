import { type Product } from "./schemas";

const products: Product[] = [
  // ── Custom ──────────────────────────────────────────────
  {
    id: "die-cut-stickers",
    name: "Stickers Troquelados",
    category: "custom",
    description:
      "Stickers con corte personalizado a la forma exacta de tu diseño. Ideales para logos, ilustraciones y branding que necesita destacar del fondo.",
    image: "/images/products/die-cut.webp",
    applications: ["Logos", "Ilustraciones", "Branding", "Decoración"],
  },
  {
    id: "transparent-stickers",
    name: "Stickers Transparentes",
    category: "custom",
    description:
      "Vinilo transparente de alta resistencia que deja ver la superficie de aplicación. Perfecto para cristales, notebooks y superficies donde el fondo debe respirar.",
    image: "/images/products/transparent.webp",
    applications: ["Cristales", "Notebooks", "Botellas", "Vidrieras"],
  },
  {
    id: "holographic-stickers",
    name: "Stickers Holográficos",
    category: "custom",
    description:
      "Acabado holográfico que cambia de color según el ángulo de luz. Alto impacto visual para ediciones limitadas, merch y productos premium.",
    image: "/images/products/holographic.webp",
    applications: ["Merchandising", "Ediciones limitadas", "Eventos", "Coleccionables"],
  },
  {
    id: "laptop-stickers",
    name: "Stickers para Laptops",
    category: "custom",
    description:
      "Stickers resistentes al desgaste diario, pensados para decorar notebooks, tablets y dispositivos electrónicos. Fácil aplicación y remoción sin residuos.",
    image: "/images/products/laptop.webp",
    applications: ["Notebooks", "Tablets", "Celulares", "Consolas"],
  },

  // ── Business / Packaging ────────────────────────────────
  {
    id: "logo-stickers",
    name: "Stickers de Logo",
    category: "business",
    description:
      "Stickers profesionales con tu logotipo para empaques, bolsas, envíos o regalos corporativos. Impresión nítida sobre vinilo de grado comercial.",
    image: "/images/products/logo.webp",
    applications: ["Empaques", "Bolsas", "Envíos", "Corporativo"],
  },
  {
    id: "product-labels",
    name: "Etiquetas de Producto",
    category: "business",
    description:
      "Etiquetas personalizadas con información de producto, ingredientes, códigos de barras o diseño de marca. Resistentes a humedad y manipulación.",
    image: "/images/products/product-labels.webp",
    applications: ["Alimentos", "Cosmética", "Bebidas", "Retail"],
  },
  {
    id: "packaging-stickers",
    name: "Stickers para Packaging",
    category: "business",
    description:
      "Cierres, sellos y decoración para cajas, bolsas y envoltorios. Convertí tu empaque en una experiencia de marca desde el primer contacto.",
    image: "/images/products/packaging.webp",
    applications: ["Cajas", "Bolsas", "Envoltorios", "Unboxing"],
  },
  {
    id: "qr-labels",
    name: "Etiquetas QR",
    category: "business",
    description:
      "Etiquetas con códigos QR impresos de alta precisión para trazabilidad, menús digitales, fichas técnicas o campañas interactivas.",
    image: "/images/products/qr-labels.webp",
    applications: ["Trazabilidad", "Menús digitales", "Catálogos", "Marketing"],
  },
  {
    id: "promotional-stickers",
    name: "Stickers Promocionales",
    category: "business",
    description:
      "Stickers económicos en grandes volúmenes para campañas, eventos, ferias y regalos publicitarios. Varios tamaños y formas disponibles.",
    image: "/images/products/promotional.webp",
    applications: ["Ferias", "Eventos", "Campañas", "Publicidad"],
  },

  // ── Motorsport ──────────────────────────────────────────
  {
    id: "motocross-graphic-kits",
    name: "Kits Gráficos Motocross",
    category: "motorsport",
    description:
      "Kits completos de gráficos para motos de cross y enduro. Diseño personalizado con los colores, número y sponsors de tu equipo. Vinilo de alto rendimiento.",
    image: "/images/products/motocross-kits.webp",
    applications: ["Motocross", "Enduro", "Competición", "Equipos"],
  },
  {
    id: "helmet-kits",
    name: "Kits para Cascos",
    category: "motorsport",
    description:
      "Vinilo de precisión diseñado para adaptarse a la curvatura de cascos de moto y auto. Protegé y personalizá tu casco con diseño exclusivo.",
    image: "/images/products/helmet-kits.webp",
    applications: ["Cascos moto", "Cascos auto", "Decoración", "Protección"],
  },
  {
    id: "utv-stickers",
    name: "Stickers para UTV",
    category: "motorsport",
    description:
      "Stickers de gran formato para UTVs, side-by-side y vehículos off-road. Material extra-resistente a barro, piedras, lavados a presión y exposición UV.",
    image: "/images/products/utv.webp",
    applications: ["UTV", "Side-by-side", "Off-road", "Racing"],
  },
  {
    id: "off-road-stickers",
    name: "Stickers Off-Road",
    category: "motorsport",
    description:
      "Stickers reforzados para camionetas 4x4, buggies y vehículos todoterreno. Resistencia extrema a condiciones de rally, raid y trail.",
    image: "/images/products/off-road.webp",
    applications: ["4x4", "Rally", "Raid", "Trail"],
  },
  {
    id: "competition-numbers",
    name: "Números de Competición",
    category: "motorsport",
    description:
      "Números, dorsales y placas para competición en cualquier disciplina del motorsport. Tipografía personalizada, colores reglamentarios y alta visibilidad.",
    image: "/images/products/competition-numbers.webp",
    applications: ["Motocross", "Rally", "Karting", "Automovilismo"],
  },

  // ── Other ───────────────────────────────────────────────
  {
    id: "custom-projects",
    name: "Proyectos a Medida",
    category: "other",
    description:
      "¿No encontraste lo que buscabas? Contanos tu proyecto y diseñamos una solución a medida. Stickers para cualquier superficie, tamaño o aplicación especial.",
    image: "/images/products/custom-projects.webp",
    applications: ["Proyectos especiales", "Gran formato", "Señalética", "A medida"],
  },
];

export default products;
