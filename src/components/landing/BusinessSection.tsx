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
    <section id="empresas" className="relative overflow-hidden bg-surface py-24">
      {/* Subtle blue accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[300px] w-[300px] rounded-full opacity-[0.07]"
        style={{
          background:
            "radial-gradient(ellipse at center, #0088FF 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold uppercase italic tracking-wide text-text-primary sm:text-4xl">
            STICKERS QUE TRABAJAN
            <br />
            PARA TU MARCA
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary sm:text-lg">
            Soluciones profesionales para empresas, productos y negocios.
            Diseño, producción y entrega con estándares empresariales.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-xl border border-surface-alt bg-background p-6 transition-all hover:border-accent-blue/30 hover:shadow-[0_0_20px_rgba(0,136,255,0.05)]"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                <card.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-base font-bold text-text-primary">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#cotizar"
            className="inline-flex items-center gap-2 rounded-lg border border-accent-blue/40 px-8 py-3.5 text-base font-bold uppercase tracking-wide text-accent-blue transition-all hover:border-accent-blue hover:bg-accent-blue/10 active:scale-[0.98]"
          >
            <Building2 className="h-5 w-5" aria-hidden="true" />
            SOLICITAR COTIZACIÓN EMPRESARIAL
          </a>
        </div>
      </div>
    </section>
  );
}
