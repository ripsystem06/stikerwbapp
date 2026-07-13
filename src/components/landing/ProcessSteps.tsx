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
    <section className="relative overflow-hidden bg-background py-24">
      {/* Tech grid background */}
      <div aria-hidden="true" className="absolute inset-0 bg-tech-grid" />

      {/* Speed lines overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-speed-lines opacity-60" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-anybody)] text-3xl font-extrabold uppercase italic leading-tight text-on-surface md:text-4xl">
            DE TU IDEA AL STICKER
            <br />
            EN 3 PASOS
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg">
            Un proceso simple y directo: elegí tu producto, personalizalo a tu
            medida y recibí tu cotización sin compromiso.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 flex flex-col items-start gap-0 md:flex-row md:items-stretch">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex flex-1 flex-col md:flex-row">
              {/* Step card */}
              <div className="relative flex flex-1 flex-col items-center border border-surface-container-high bg-surface-container px-6 py-10 text-center rounded-none">
                {/* Large background number */}
                <span
                  aria-hidden="true"
                  className="select-none font-[family-name:var(--font-anybody)] text-7xl font-black italic tracking-tighter text-primary-container/10 md:text-8xl"
                >
                  {step.number}
                </span>

                {/* Icon overlay on number */}
                <div className="-mt-10 flex size-16 items-center justify-center">
                  <step.icon className="size-8 text-primary-container" />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-base font-bold uppercase tracking-wider text-on-surface font-[family-name:var(--font-jetbrains-mono)]">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-surface-variant">
                  {step.description}
                </p>
              </div>

              {/* Connector between steps */}
              {index < STEPS.length - 1 && (
                <div className="my-6 flex items-center justify-center md:my-0">
                  {/* Horizontal on desktop */}
                  <span className="hidden items-center md:flex">
                    <span className="h-px w-10 bg-surface-container-high" />
                    <span className="flex size-6 items-center justify-center border border-surface-container-high text-on-surface-variant rounded-none">
                      <ChevronRight className="size-3.5" />
                    </span>
                    <span className="h-px w-10 bg-surface-container-high" />
                  </span>
                  {/* Vertical on mobile */}
                  <span className="flex flex-col items-center md:hidden">
                    <span className="h-8 w-px bg-surface-container-high" />
                    <span className="flex size-6 items-center justify-center border border-surface-container-high text-on-surface-variant rounded-none">
                      <ChevronRight className="size-3.5 rotate-90" />
                    </span>
                    <span className="h-8 w-px bg-surface-container-high" />
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
