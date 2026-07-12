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

// ── Input style constants ──────────────────────────────────
const INPUT_BASE =
  "w-full border-b-2 border-surface-container-high bg-surface-container-low py-3 px-0 text-on-surface placeholder:text-on-surface-variant/40 transition-colors focus:border-primary-container outline-none font-[family-name:var(--font-sans)]";
const INPUT_ERROR = "border-error";
const LABEL_CLASS =
  "mb-1 block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-on-surface-variant";
const ERROR_MSG =
  "mt-1 font-[family-name:var(--font-mono)] text-xs text-error";

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
  const borderClass = error ? INPUT_ERROR : "";

  if (field.type === "select") {
    const options = SELECT_OPTIONS[field.name] ?? [];
    return (
      <div>
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className={`${INPUT_BASE} ${borderClass}`}
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
          <p className={ERROR_MSG} role="alert">
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
          className={`${INPUT_BASE} ${borderClass} resize-y min-h-[80px]`}
          placeholder={field.label}
          aria-label={field.label}
          aria-invalid={!!error}
        />
        {error && (
          <p className={ERROR_MSG} role="alert">
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
        className={`${INPUT_BASE} ${borderClass}`}
        aria-label={field.label}
        aria-invalid={!!error}
        min={field.type === "number" ? 1 : undefined}
        step={field.type === "number" ? 1 : undefined}
      />
      {error && (
        <p className={ERROR_MSG} role="alert">
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
      <section id="cotizar" className="scroll-mt-24 py-24">
        <div className="text-center">
          <Package
            className="mx-auto h-12 w-12 text-on-surface-variant/30"
            aria-hidden="true"
          />
          <p className="mt-4 text-base text-on-surface-variant">
            Seleccioná productos para comenzar tu cotización
          </p>
        </div>
      </section>
    );
  }

  // ── Contact field input helper ──────────────────────────
  const ContactInput = ({
    id,
    field,
    type = "text",
    placeholder,
    required,
  }: {
    id: keyof ContactFormData;
    field: ReturnType<typeof register>;
    type?: string;
    placeholder: string;
    required?: boolean;
  }) => (
    <div>
      <label htmlFor={`cf-${id}`} className={LABEL_CLASS}>
        {placeholder}
        {required ? " *" : ""}
      </label>
      <input
        id={`cf-${id}`}
        type={type}
        {...field}
        placeholder={placeholder}
        className={`${INPUT_BASE} ${errors[id] ? INPUT_ERROR : ""}`}
        aria-invalid={!!errors[id]}
      />
      {errors[id] && (
        <p className={ERROR_MSG} role="alert">
          {errors[id]?.message as string}
        </p>
      )}
    </div>
  );

  // ── Form ────────────────────────────────────────────────
  return (
    <section id="cotizar" className="scroll-mt-24">
      {/* Tech grid background */}
      <div className="relative bg-background py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-tech-grid"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <h2 className="mb-2 text-center font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase italic text-on-surface sm:text-4xl">
            COMPLETÁ TU COTIZACIÓN
          </h2>
          <p className="mb-10 text-center text-base text-on-surface-variant">
            Completá los datos de cada producto y tus datos de contacto para
            enviar la cotización por WhatsApp.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={handleFormKeyDown}
            noValidate
            className="space-y-10"
          >
            {/* ── Contact fields ────────────────────────────── */}
            <fieldset className="rounded-none border border-surface-container-high bg-surface-container p-6">
              <legend className="mb-4 font-[family-name:var(--font-display)] text-base uppercase italic text-on-surface">
                Datos de contacto
              </legend>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ContactInput
                  id="name"
                  field={register("name")}
                  placeholder="Nombre"
                  required
                />
                <ContactInput
                  id="company"
                  field={register("company")}
                  placeholder="Empresa"
                />
                <ContactInput
                  id="city"
                  field={register("city")}
                  placeholder="Ciudad"
                  required
                />
                <ContactInput
                  id="whatsapp"
                  field={register("whatsapp")}
                  type="tel"
                  placeholder="WhatsApp"
                  required
                />
                <ContactInput
                  id="email"
                  field={register("email")}
                  type="email"
                  placeholder="Correo electrónico"
                />
                <ContactInput
                  id="requiredDate"
                  field={register("requiredDate")}
                  type="date"
                  placeholder="Fecha requerida"
                />
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
                  className="rounded-none border border-surface-container-high bg-surface-container p-6"
                >
                  <legend className="mb-4 flex items-center gap-2 font-[family-name:var(--font-display)] text-base uppercase italic text-on-surface">
                    <Package
                      className="h-5 w-5 text-primary-container"
                      aria-hidden="true"
                    />
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
                        <label className={LABEL_CLASS}>
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
                    <p className="mb-2 font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                      Estado del Diseño
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {DESIGN_STATUS_ORDER.map((status) => (
                        <label
                          key={status}
                          className={`flex cursor-pointer items-center gap-2 rounded-none border px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase transition-colors ${
                            item.designStatus === status
                              ? "border-primary-container bg-primary-container/10 text-primary-container"
                              : "border-surface-container-high text-on-surface-variant hover:border-surface-container-highest"
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
              <label htmlFor="cf-comments" className={LABEL_CLASS}>
                Comentarios adicionales
              </label>
              <textarea
                id="cf-comments"
                {...register("comments")}
                rows={4}
                placeholder="Contanos más sobre tu proyecto, ideas, referencias…"
                className={`${INPUT_BASE} min-h-[100px] resize-y`}
              />
            </div>

            {/* ── Submit ────────────────────────────────────── */}
            <div className="mt-8 flex flex-col items-center gap-2 border-t border-surface-container-high pt-6">
              <WhatsAppQuoteGenerator className="w-full sm:w-auto" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
