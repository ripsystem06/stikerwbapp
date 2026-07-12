import { type ProductCategory } from "./schemas";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "file" | "textarea";
  appliesTo: ProductCategory[];
  required: boolean;
}

const ALL_CATEGORIES: ProductCategory[] = [
  "custom",
  "business",
  "motorsport",
  "other",
];
const MOTORSPORT_ONLY: ProductCategory[] = ["motorsport"];

export const FIELD_MAP: FieldConfig[] = [
  // ── Common fields (all categories) ──────────────────────
  {
    name: "quantity",
    label: "Cantidad",
    type: "number",
    appliesTo: ALL_CATEGORIES,
    required: true,
  },
  {
    name: "dimensions",
    label: "Medidas",
    type: "text",
    appliesTo: ALL_CATEGORIES,
    required: false,
  },
  {
    name: "material",
    label: "Material",
    type: "select",
    appliesTo: ALL_CATEGORIES,
    required: false,
  },
  {
    name: "interiorExterior",
    label: "Uso Interior / Exterior",
    type: "select",
    appliesTo: ALL_CATEGORIES,
    required: false,
  },
  {
    name: "colors",
    label: "Colores",
    type: "text",
    appliesTo: ALL_CATEGORIES,
    required: false,
  },
  {
    name: "designStatus",
    label: "Estado del Diseño",
    type: "select",
    appliesTo: ALL_CATEGORIES,
    required: false,
  },
  {
    name: "comments",
    label: "Comentarios",
    type: "textarea",
    appliesTo: ALL_CATEGORIES,
    required: false,
  },

  // ── Motorsport-only fields ──────────────────────────────
  {
    name: "vehicleType",
    label: "Tipo de Vehículo",
    type: "select",
    appliesTo: MOTORSPORT_ONLY,
    required: false,
  },
  {
    name: "vehicleBrand",
    label: "Marca del Vehículo",
    type: "text",
    appliesTo: MOTORSPORT_ONLY,
    required: false,
  },
  {
    name: "vehicleModel",
    label: "Modelo del Vehículo",
    type: "text",
    appliesTo: MOTORSPORT_ONLY,
    required: false,
  },
  {
    name: "vehicleYear",
    label: "Año del Vehículo",
    type: "number",
    appliesTo: MOTORSPORT_ONLY,
    required: false,
  },
  {
    name: "competitionNumber",
    label: "Número de Competición",
    type: "text",
    appliesTo: MOTORSPORT_ONLY,
    required: false,
  },
  {
    name: "riderName",
    label: "Nombre del Piloto",
    type: "text",
    appliesTo: MOTORSPORT_ONLY,
    required: false,
  },
  {
    name: "sponsors",
    label: "Sponsors",
    type: "textarea",
    appliesTo: MOTORSPORT_ONLY,
    required: false,
  },
];

/**
 * Returns only the fields that apply to at least one of the given categories.
 * Motorsport fields appear ONLY when "motorsport" is present in the categories array.
 */
export function getVisibleFields(categories: ProductCategory[]): FieldConfig[] {
  const catSet = new Set(categories);
  return FIELD_MAP.filter((field) =>
    field.appliesTo.some((cat) => catSet.has(cat)),
  );
}
