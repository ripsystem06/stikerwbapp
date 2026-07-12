import {
  MousePointerClick,
  SlidersHorizontal,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

interface Step {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "SELECCIONA",
    description:
      "Explorá nuestro catálogo de productos y elegí el tipo de sticker que mejor se adapta a tu proyecto. Desde troquelados hasta material holográfico.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "PERSONALIZA",
    description:
      "Definí medidas, materiales, colores y acabados. Subí tu diseño o contanos tu idea para que nuestro equipo la prepare.",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "COTIZA",
    description:
      "Revisá tu pedido, completá tus datos y envialo por WhatsApp. Te respondemos con la cotización y coordinamos la producción.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="relative overflow-hidden bg-surface py-24">
      {/* Subtle grid pattern background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Diagonal accent */}
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-64 w-64 rotate-12 rounded"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,107,0,0.08), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold uppercase italic tracking-wide text-text-primary sm:text-4xl">
            DE TU IDEA AL STICKER
            <br />
            EN 3 PASOS
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary sm:text-lg">
            Un proceso simple y directo: elegí tu producto, personalizalo a tu
            medida y recibí tu cotización sin compromiso.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 flex flex-col items-start gap-0 md:flex-row md:items-stretch">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex flex-1 flex-col md:flex-row">
              {/* Step card */}
              <div className="relative flex flex-1 flex-col items-center px-4 text-center">
                {/* Large outline number */}
                <span
                  aria-hidden="true"
                  className="select-none text-8xl font-black italic tracking-tighter text-primary/15 md:text-9xl"
                >
                  {step.number}
                </span>

                {/* Icon overlay on number */}
                <div className="-mt-8 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-lg font-bold tracking-wide text-text-primary">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>

              {/* Connector between steps (desktop) */}
              {index < STEPS.length - 1 && (
                <div className="my-6 flex items-center justify-center md:my-0">
                  {/* Horizontal on desktop, vertical on mobile */}
                  <span className="hidden items-center md:flex">
                    <span className="h-px w-12 bg-surface-alt" />
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-surface-alt text-text-secondary">
                      <ChevronRight className="h-3 w-3" />
                    </span>
                    <span className="h-px w-12 bg-surface-alt" />
                  </span>
                  <span className="flex flex-col items-center md:hidden">
                    <span className="h-8 w-px bg-surface-alt" />
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-surface-alt text-text-secondary">
                      <ChevronRight className="h-3 w-3 rotate-90" />
                    </span>
                    <span className="h-8 w-px bg-surface-alt" />
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
