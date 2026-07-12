import { z } from "zod";

export const ProductCategory = z.enum([
  "custom",
  "business",
  "motorsport",
  "other",
]);
export type ProductCategory = z.infer<typeof ProductCategory>;

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: ProductCategory,
  description: z.string(),
  image: z.string(),
  applications: z.array(z.string()),
});
export type Product = z.infer<typeof ProductSchema>;

export const DesignStatus = z.enum([
  "print-ready",
  "logo-needs-prep",
  "idea-reference",
  "from-scratch",
]);
export type DesignStatus = z.infer<typeof DesignStatus>;

export const QuoteItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1, "Mínimo 1 unidad"),
  dimensions: z.string().optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  interiorExterior: z.enum(["interior", "exterior"]).optional(),
  colors: z.string().optional(),
  designStatus: DesignStatus.optional(),
  // Motorsport-only fields
  vehicleType: z.string().optional(),
  vehicleBrand: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.number().int().min(1990).max(2030).optional(),
  competitionNumber: z.string().optional(),
  riderName: z.string().optional(),
  sponsors: z.string().optional(),
});
export type QuoteItem = z.infer<typeof QuoteItemSchema>;

export const QuoteFormDataSchema = z.object({
  name: z.string().min(1, "Este campo es obligatorio"),
  company: z.string().optional(),
  city: z.string().min(1, "Este campo es obligatorio"),
  whatsapp: z.string().min(1, "Este campo es obligatorio"),
  email: z.string().email("Correo inválido").optional().or(z.literal("")),
  items: z.array(QuoteItemSchema).min(1, "Seleccioná al menos un producto"),
  comments: z.string().optional(),
  requiredDate: z.string().optional(),
});
export type QuoteFormData = z.infer<typeof QuoteFormDataSchema>;
