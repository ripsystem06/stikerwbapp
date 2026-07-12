import {
  Palette,
  Factory,
  Scissors,
  Droplets,
  Shield,
  Sun,
  Package,
  MessageCircle,
} from "lucide-react";

interface BenefitCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const BENEFITS: BenefitCard[] = [
  {
    icon: Palette,
    title: "Diseño personalizado",
    description:
      "Creamos tu diseño desde cero o trabajamos con tus archivos. Cada sticker es único, adaptado a tu marca y tu visión.",
  },
  {
    icon: Factory,
    title: "Producción profesional",
    description:
      "Equipos de impresión de alta calidad con acabados precisos. Producción seria, sin improvisaciones.",
  },
  {
    icon: Scissors,
    title: "Corte de precisión",
    description:
      "Cortamos cada sticker con precisión milimétrica. Contornos limpios, formas complejas y acabados impecables.",
  },
  {
    icon: Palette,
    title: "Colores intensos",
    description:
      "Tintas de alto rendimiento que mantienen la intensidad y fidelidad cromática. Tus colores, exactamente como los imaginaste.",
  },
  {
    icon: Droplets,
    title: "Materiales resistentes al agua",
    description:
      "Laminados impermeables y materiales waterproof que protegen tus stickers de la humedad, lluvia y salpicaduras.",
  },
  {
    icon: Sun,
    title: "Interior y exterior",
    description:
      "Materiales preparados para cada entorno. Vinilos de larga duración tanto en interiores como en exteriores.",
  },
  {
    icon: Shield,
    title: "Protección UV y clima",
    description:
      "Laminado UV que protege del sol, la decoloración y las condiciones climáticas más exigentes. Tus stickers duran.",
  },
  {
    icon: Package,
    title: "Pedidos individuales y por volumen",
    description:
      "Desde una sola pieza hasta producción a escala. Sin mínimos obligatorios y con descuentos por volumen.",
  },
  {
    icon: MessageCircle,
    title: "Atención personalizada",
    description:
      "Te acompañamos en cada paso. Asesoramiento real, respuestas rápidas y un equipo que entiende tu proyecto.",
  },
];

export default function Benefits() {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      {/* Speed lines overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-speed-lines"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase italic tracking-wide text-on-surface sm:text-4xl">
            HECHOS PARA DESTACAR.
            <br />
            DISEÑADOS PARA DURAR.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-on-surface-variant sm:text-lg">
            Cada sticker que producimos combina tecnología, materiales premium y
            un equipo que entiende lo que tu marca necesita.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-none border border-surface-container-high bg-surface-container p-6 transition-colors hover:border-primary-container/50"
            >
              {/* Icon */}
              <div className="mb-4 flex h-8 w-8 items-center justify-center text-primary-container">
                <benefit.icon className="h-8 w-8" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="mb-2 font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wider text-on-surface">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-on-surface-variant">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
