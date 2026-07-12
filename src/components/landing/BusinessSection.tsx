import {
  Building2,
  Package,
  ShoppingBag,
  QrCode,
  Layers,
  RefreshCw,
} from "lucide-react";

interface BusinessCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const BUSINESS_CARDS: BusinessCard[] = [
  {
    icon: Building2,
    title: "Etiquetas de producto",
    description:
      "Etiquetas profesionales para cualquier industria. Diseños que comunican calidad y refuerzan tu identidad de marca.",
  },
  {
    icon: Package,
    title: "Packaging personalizado",
    description:
      "Diseño que hace destacar tu producto en el anaquel. Cajas, bolsas y envoltorios con acabados precisos.",
  },
  {
    icon: ShoppingBag,
    title: "Stickers promocionales",
    description:
      "Publicidad efectiva para tu marca. Stickers de alto impacto que tus clientes van a querer usar y compartir.",
  },
  {
    icon: QrCode,
    title: "Códigos QR",
    description:
      "Etiquetas interactivas con QR. Conectá tus productos físicos con tu presencia digital en un solo paso.",
  },
  {
    icon: Layers,
    title: "Pedidos por volumen",
    description:
      "Producción a escala con precios competitivos. Misma calidad premium, optimizada para grandes cantidades.",
  },
  {
    icon: RefreshCw,
    title: "Reposición recurrente",
    description:
      "Guardamos tus archivos y plantillas para pedidos periódicos. Tu diseño listo cuando lo necesites, sin empezar de cero.",
  },
];

export default function BusinessSection() {
  return (
    <section id="empresas" className="relative overflow-hidden bg-background py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase italic text-on-surface sm:text-4xl">
            STICKERS QUE{" "}
            <span className="text-secondary-container">TRABAJAN</span>
            <br />
            PARA TU MARCA
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-on-surface-variant sm:text-lg">
            Soluciones profesionales para empresas, productos y negocios.
            Diseño, producción y entrega con estándares empresariales.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-none border border-surface-container-high border-l-4 border-l-secondary-container bg-surface-container p-6 transition-colors hover:border-secondary-container/50"
            >
              {/* Icon */}
              <div className="mb-4 flex h-8 w-8 items-center justify-center text-secondary-container">
                <card.icon className="h-8 w-8" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="mb-2 font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-on-surface">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#cotizar"
            className="inline-flex items-center gap-2 rounded-none bg-secondary-container px-8 py-4 font-[family-name:var(--font-mono)] text-base font-bold uppercase text-on-secondary-container border-r-4 border-b-4 border-on-secondary-container transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Building2 className="h-5 w-5" aria-hidden="true" />
            SOLICITAR COTIZACIÓN EMPRESARIAL
          </a>
        </div>
      </div>
    </section>
  );
}
