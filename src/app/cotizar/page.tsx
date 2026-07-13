"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import products from "@/lib/products";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const ContactSchema = z.object({
  name: z.string().min(1, "Este campo es obligatorio"),
  company: z.string().optional(),
  city: z.string().min(1, "Este campo es obligatorio"),
  whatsapp: z.string().min(1, "Este campo es obligatorio"),
  email: z.string().email("Correo inválido").optional().or(z.literal("")),
  comments: z.string().optional(),
});

type ContactForm = z.infer<typeof ContactSchema>;

const BUSINESS_PHONE = "526463077208";

function buildMessage(data: ContactForm, selectedNames: string[]): string {
  const header = "👋 *Solicitud de Cotización — Stikers*";
  const contact = [
    `*Nombre:* ${data.name}`,
    data.company ? `*Empresa:* ${data.company}` : null,
    `*Ciudad:* ${data.city}`,
    `*WhatsApp:* ${data.whatsapp}`,
    data.email ? `*Email:* ${data.email}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const productsList =
    selectedNames.length > 0
      ? `\n\n📦 *Productos solicitados:*\n${selectedNames.map((n) => `• ${n}`).join("\n")}`
      : "";

  const notes = data.comments ? `\n\n📝 *Comentarios:*\n${data.comments}` : "";

  return `${header}\n\n${contact}${productsList}${notes}\n\n_Solicitud enviada desde stikers.app_`;
}

function CotizarForm() {
  const searchParams = useSearchParams();
  const itemsParam = searchParams.get("items") ?? "";
  const selectedIds = itemsParam ? itemsParam.split(",") : [];
  const selectedProducts = products.filter((p) => selectedIds.includes(p.id));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    const names = selectedProducts.map((p) => p.name);
    const message = buildMessage(data, names);
    window.open(
      `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-6">
      {/* Back link */}
      <Link
        href="/#productos"
        className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary-container mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a productos
      </Link>

      {/* Title */}
      <h1 className="font-[family-name:var(--font-anybody)] text-3xl font-extrabold uppercase italic text-on-surface sm:text-4xl">
        COMPLETÁ TU <span className="text-primary-container">COTIZACIÓN</span>
      </h1>
      <p className="mt-3 text-on-surface-variant">
        Dejanos tus datos y te respondemos por WhatsApp con una cotización personalizada sin compromiso.
      </p>

      {/* Selected products summary */}
      {selectedProducts.length > 0 && (
        <div className="mt-8 border border-surface-container-high bg-surface-container p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-4 w-4 text-primary-container" />
            <h2 className="font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wider text-on-surface">
              Productos seleccionados ({selectedProducts.length})
            </h2>
          </div>
          <div className="space-y-2">
            {selectedProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b border-surface-container-high pb-2 last:border-b-0 last:pb-0">
                <span className="font-[family-name:var(--font-anybody)] text-sm uppercase italic text-on-surface">
                  {p.name}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase text-on-surface-variant">
                  {p.category === "motorsport" ? "Motorsport" : p.category === "business" ? "Empresas" : p.category === "custom" ? "Personalizado" : "Otros"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedProducts.length === 0 && (
        <div className="mt-8 border border-surface-container-high bg-surface-container p-8 text-center">
          <p className="text-on-surface-variant">
            No seleccionaste productos.{" "}
            <Link href="/#productos" className="text-primary-container hover:underline font-medium">
              Volvé a la página principal
            </Link>{" "}
            y elegí los stickers que necesitás.
          </p>
        </div>
      )}

      {/* Contact form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-6">
        <div>
          <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-on-surface-variant">
            Nombre *
          </label>
          <input
            {...register("name")}
            placeholder="Tu nombre completo"
            className="w-full border-b-2 border-surface-container-high bg-transparent py-3 text-on-surface outline-none transition-colors focus:border-primary-container placeholder:text-on-surface-variant/40"
          />
          {errors.name && (
            <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-error">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-on-surface-variant">
            Empresa o equipo
          </label>
          <input
            {...register("company")}
            placeholder="Opcional"
            className="w-full border-b-2 border-surface-container-high bg-transparent py-3 text-on-surface outline-none transition-colors focus:border-primary-container placeholder:text-on-surface-variant/40"
          />
        </div>

        <div>
          <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-on-surface-variant">
            Ciudad *
          </label>
          <input
            {...register("city")}
            placeholder="Ej: Ensenada, B.C."
            className="w-full border-b-2 border-surface-container-high bg-transparent py-3 text-on-surface outline-none transition-colors focus:border-primary-container placeholder:text-on-surface-variant/40"
          />
          {errors.city && (
            <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-error">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-on-surface-variant">
            WhatsApp *
          </label>
          <input
            {...register("whatsapp")}
            placeholder="+52 1 646 123 4567"
            className="w-full border-b-2 border-surface-container-high bg-transparent py-3 text-on-surface outline-none transition-colors focus:border-primary-container placeholder:text-on-surface-variant/40"
          />
          {errors.whatsapp && (
            <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-error">{errors.whatsapp.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-on-surface-variant">
            Correo electrónico
          </label>
          <input
            {...register("email")}
            placeholder="Opcional"
            className="w-full border-b-2 border-surface-container-high bg-transparent py-3 text-on-surface outline-none transition-colors focus:border-primary-container placeholder:text-on-surface-variant/40"
          />
          {errors.email && (
            <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-error">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-on-surface-variant">
            Comentarios
          </label>
          <textarea
            {...register("comments")}
            rows={3}
            placeholder="Contanos sobre tu proyecto, ideas, referencias…"
            className="w-full border-b-2 border-surface-container-high bg-transparent py-3 text-on-surface outline-none transition-colors focus:border-primary-container placeholder:text-on-surface-variant/40 resize-none"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-3 bg-[#25D366] px-8 py-4 font-[family-name:var(--font-mono)] text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-[#20bd5a] active:scale-[0.98]"
        >
          <MessageCircle className="h-5 w-5" />
          ENVIAR COTIZACIÓN POR WHATSAPP
        </button>
      </form>
    </div>
  );
}

export default function CotizarPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-24">
        <Suspense fallback={<div className="mx-auto max-w-2xl px-6 py-24 text-center text-on-surface-variant">Cargando...</div>}>
          <CotizarForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
