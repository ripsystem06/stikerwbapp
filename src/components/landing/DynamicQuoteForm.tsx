"use client";

import { type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Package } from "lucide-react";
import { useQuoteContext } from "@/hooks/useQuoteConfigurator";
import { getVisibleFields, type FieldConfig } from "@/lib/field-config";
import {
  type QuoteItem,
  type QuoteFormData,
  type DesignStatus,
} from "@/lib/schemas";
import { openWhatsApp } from "./WhatsAppQuoteGenerator";
import WhatsAppQuoteGenerator from "./WhatsAppQuoteGenerator";
import FileUploader from "./FileUploader";

// ── Contact form schema (subset of QuoteFormData without items) ─
const ContactFormSchema = z.object({
  name: z.string().min(1, "Este campo es obligatorio"),
  company: z.string().optional(),
  city: z.string().min(1, "Este campo es obligatorio"),
  whatsapp: z.string().min(1, "Este campo es obligatorio"),
  email: z.string().email("Correo inválido").optional().or(z.literal("")),
  comments: z.string().optional(),
  requiredDate: z.string().optional(),
});
type ContactFormData = z.infer<typeof ContactFormSchema>;

// ── Select options ────────────────────────────────────────
const SELECT_OPTIONS: Record<string, { value: string; label: string }[]> = {
  material: [
    { value: "vinilo", label: "Vinilo" },
    { value: "vinilo-premium", label: "Vinilo Premium" },
    { value: "holografico", label: "Holográfico" },
    { value: "transparente", label: "Transparente" },
    { value: "otro", label: "Otro / No sé" },
  ],
  interiorExterior: [
    { value: "interior", label: "Interior" },
    { value: "exterior", label: "Exterior" },
    { value: "ambos", label: "Ambos" },
  ],
  vehicleType: [
    { value: "moto", label: "Moto" },
    { value: "auto", label: "Auto" },
    { value: "utv", label: "UTV / Side-by-side" },
    { value: "camioneta", label: "Camioneta 4x4" },
    { value: "karting", label: "Karting" },
    { value: "otro", label: "Otro" },
  ],
};

const DESIGN_STATUS_LABELS: Record<DesignStatus, string> = {
  "print-ready": "Listo para imprimir",
  "logo-needs-prep": "Logo necesita preparación",
  "idea-reference": "Tengo idea / referencia",
  "from-scratch": "Desde cero",
};

const DESIGN_STATUS_ORDER: DesignStatus[] = [
  "print-ready",
  "logo-needs-prep",
  "idea-reference",
  "from-scratch",
];

// Fields to skip in the generic field loop (handled separately)
const SKIP_FIELDS = new Set(["designStatus", "comments"]);

// ── Helpers ───────────────────────────────────────────────

/** Safe typed read of a QuoteItem field by name. */
function getItemField(item: QuoteItem, fieldName: string): string | number {
  const val = (item as Record<string, unknown>)[fieldName];
  if (val === undefined || val === null) return "";
  return val as string | number;
}

/** Build a Partial<QuoteItem> update for the given field name and raw value. */
function buildFieldUpdate(
  field: FieldConfig,
  raw: string,
): Partial<QuoteItem> {
  const key = field.name as keyof QuoteItem;

  if (raw === "") {
    // Clear optional fields; keep quantity at its current value
    if (field.name === "quantity") return {} as Partial<QuoteItem>;
    return { [key]: undefined } as Partial<QuoteItem>;
  }

  if (field.type === "number") {
    return { [key]: Number(raw) } as Partial<QuoteItem>;
  }

  return { [key]: raw } as Partial<QuoteItem>;
}

// ── Sub-components ────────────────────────────────────────

function FieldInput({
  field,
  value,
  onChange,
  error,
}: {
  field: FieldConfig;
  value: string | number;
  onChange: (raw: string) => void;
  error?: string;
}) {
  const baseClasses =
    "w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors";
  const borderClass = error ? "border-red-500" : "border-surface-alt";

  if (field.type === "select") {
    const options = SELECT_OPTIONS[field.name] ?? [];
    return (
      <div>
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} ${borderClass} appearance-none`}
          aria-label={field.label}
          aria-invalid={!!error}
        >
          <option value="">Seleccionar…</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <textarea
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={`${baseClasses} ${borderClass} resize-y`}
          placeholder={field.label}
          aria-label={field.label}
          aria-invalid={!!error}
        />
        {error && (
          <p className="mt-1 text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <input
        type={field.type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.label}
        className={`${baseClasses} ${borderClass}`}
        aria-label={field.label}
        aria-invalid={!!error}
        min={field.type === "number" ? 1 : undefined}
        step={field.type === "number" ? 1 : undefined}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────

export default function DynamicQuoteForm() {
  const { state, dispatch, selectedProducts, selectedCount } =
    useQuoteContext();
  const { quoteItems } = state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      city: "",
      whatsapp: "",
      email: "",
      comments: "",
      requiredDate: "",
    },
  });

  const onSubmit = (contactData: ContactFormData) => {
    const items = Array.from(quoteItems.values());
    const fullData: QuoteFormData = { ...contactData, items };
    openWhatsApp(fullData);
  };

  // Prevent form submission on Enter key in non-submit inputs
  const handleFormKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (
      e.key === "Enter" &&
      (e.target as HTMLElement)?.tagName !== "BUTTON"
    ) {
      e.preventDefault();
    }
  };

  // ── Empty state ─────────────────────────────────────────
  if (selectedCount === 0) {
    return (
      <section id="cotizar" className="mt-16 scroll-mt-24">
        <div className="text-center">
          <Package
            className="mx-auto h-12 w-12 text-text-secondary/30"
            aria-hidden="true"
          />
          <p className="mt-4 text-base text-text-secondary">
            Seleccioná productos para comenzar tu cotización
          </p>
        </div>
      </section>
    );
  }

  // ── Form ────────────────────────────────────────────────
  return (
    <section id="cotizar" className="mt-16 scroll-mt-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-8 text-center text-2xl font-extrabold uppercase italic tracking-wide text-text-primary sm:text-3xl">
          COMPLETÁ TU COTIZACIÓN
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleFormKeyDown}
          noValidate
          className="space-y-10"
        >
          {/* ── Contact fields ────────────────────────────── */}
          <fieldset className="space-y-4">
            <legend className="mb-4 text-lg font-bold uppercase tracking-wide text-text-primary">
              Datos de contacto
            </legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="cf-name"
                  className="mb-1 block text-sm font-medium text-text-secondary"
                >
                  Nombre *
                </label>
                <input
                  id="cf-name"
                  type="text"
                  {...register("name")}
                  placeholder="Tu nombre completo"
                  className={`w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors ${
                    errors.name ? "border-red-500" : "border-surface-alt"
                  }`}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cf-company"
                  className="mb-1 block text-sm font-medium text-text-secondary"
                >
                  Empresa
                </label>
                <input
                  id="cf-company"
                  type="text"
                  {...register("company")}
                  placeholder="Nombre de tu empresa (opcional)"
                  className="w-full rounded-lg border border-surface-alt bg-surface px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="cf-city"
                  className="mb-1 block text-sm font-medium text-text-secondary"
                >
                  Ciudad *
                </label>
                <input
                  id="cf-city"
                  type="text"
                  {...register("city")}
                  placeholder="Ciudad"
                  className={`w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors ${
                    errors.city ? "border-red-500" : "border-surface-alt"
                  }`}
                  aria-invalid={!!errors.city}
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-red-400" role="alert">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cf-whatsapp"
                  className="mb-1 block text-sm font-medium text-text-secondary"
                >
                  WhatsApp *
                </label>
                <input
                  id="cf-whatsapp"
                  type="tel"
                  {...register("whatsapp")}
                  placeholder="+54 9 11 2345-6789"
                  className={`w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors ${
                    errors.whatsapp ? "border-red-500" : "border-surface-alt"
                  }`}
                  aria-invalid={!!errors.whatsapp}
                />
                {errors.whatsapp && (
                  <p className="mt-1 text-xs text-red-400" role="alert">
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cf-email"
                  className="mb-1 block text-sm font-medium text-text-secondary"
                >
                  Correo electrónico
                </label>
                <input
                  id="cf-email"
                  type="email"
                  {...register("email")}
                  placeholder="tu@correo.com"
                  className={`w-full rounded-lg border bg-surface px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors ${
                    errors.email ? "border-red-500" : "border-surface-alt"
                  }`}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cf-requiredDate"
                  className="mb-1 block text-sm font-medium text-text-secondary"
                >
                  Fecha requerida
                </label>
                <input
                  id="cf-requiredDate"
                  type="date"
                  {...register("requiredDate")}
                  className="w-full rounded-lg border border-surface-alt bg-surface px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>
          </fieldset>

          {/* ── Product-specific fields ───────────────────── */}
          {selectedProducts.map((product) => {
            const item = quoteItems.get(product.id);
            if (!item) return null;

            const visibleFields = getVisibleFields([product.category]).filter(
              (f) => !SKIP_FIELDS.has(f.name),
            );

            return (
              <fieldset
                key={product.id}
                className="rounded-xl border border-surface-alt bg-surface p-6"
              >
                <legend className="mb-4 flex items-center gap-2 text-base font-bold text-text-primary">
                  <Package className="h-5 w-5 text-primary" aria-hidden="true" />
                  {product.name}
                </legend>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {visibleFields.map((field) => (
                    <div
                      key={field.name}
                      className={
                        field.type === "textarea" ? "sm:col-span-2" : ""
                      }
                    >
                      <label className="mb-1 block text-sm font-medium text-text-secondary">
                        {field.label}
                        {field.required ? " *" : ""}
                      </label>
                      <FieldInput
                        field={field}
                        value={getItemField(item, field.name)}
                        onChange={(raw) => {
                          const updates = buildFieldUpdate(field, raw);
                          if (Object.keys(updates).length > 0) {
                            dispatch({
                              type: "UPDATE_ITEM",
                              productId: product.id,
                              updates,
                            });
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Design status radios */}
                <div className="mt-5">
                  <p className="mb-2 text-sm font-medium text-text-secondary">
                    Estado del Diseño
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {DESIGN_STATUS_ORDER.map((status) => (
                      <label
                        key={status}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                          item.designStatus === status
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-surface-alt text-text-secondary hover:border-text-secondary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`designStatus-${product.id}`}
                          value={status}
                          checked={item.designStatus === status}
                          onChange={() =>
                            dispatch({
                              type: "UPDATE_ITEM",
                              productId: product.id,
                              updates: { designStatus: status },
                            })
                          }
                          className="sr-only"
                        />
                        {DESIGN_STATUS_LABELS[status]}
                      </label>
                    ))}
                  </div>
                </div>
              </fieldset>
            );
          })}

          {/* ── File upload ───────────────────────────────── */}
          <FileUploader
            label="Archivos adjuntos"
            onFilesSelected={() => {
              // Files are collected client-side only; referenced in WhatsApp message
            }}
          />

          {/* ── Comments ──────────────────────────────────── */}
          <div>
            <label
              htmlFor="cf-comments"
              className="mb-1 block text-sm font-medium text-text-secondary"
            >
              Comentarios adicionales
            </label>
            <textarea
              id="cf-comments"
              {...register("comments")}
              rows={4}
              placeholder="Contanos más sobre tu proyecto, ideas, referencias…"
              className="w-full rounded-lg border border-surface-alt bg-surface px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors resize-y"
            />
          </div>

          {/* ── Submit ────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-2 pt-4">
            <WhatsAppQuoteGenerator className="w-full sm:w-auto" />
          </div>
        </form>
      </div>
    </section>
  );
}
