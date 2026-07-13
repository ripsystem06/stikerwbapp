import { Flag, Car, HardHat, Hash, Users, Gauge } from "lucide-react";

interface MotorsportCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const MOTORSPORT_CARDS: MotorsportCard[] = [
  {
    icon: Flag,
    title: "Motocross",
    description:
      "Kits gráficos completos para motos de cross y enduro. Diseños que resisten barro, rocas y velocidad.",
  },
  {
    icon: Car,
    title: "UTV / Off-road",
    description:
      "Gráficos para UTV, RZR, Can-Am y vehículos todo terreno. Protección y estilo para la ruta más exigente.",
  },
  {
    icon: HardHat,
    title: "Cascos",
    description:
      "Diseño y personalización de cascos. Identidad visual que te distingue en la pista.",
  },
  {
    icon: Hash,
    title: "Números y pilotos",
    description:
      "Números de competencia, nombres y patrocinadores con materiales de alta resistencia.",
  },
  {
    icon: Users,
    title: "Equipos completos",
    description:
      "Identidad visual para equipos de carreras. Consistencia gráfica en todos los vehículos y pilotos.",
  },
  {
    icon: Gauge,
    title: "Vehículos de competencia",
    description:
      "Gráficos integrales para autos de carreras. Vinilos de alto rendimiento para máxima velocidad.",
  },
];

export default function MotorsportSection() {
  return (
    <section
      id="motorsport"
      className="relative overflow-hidden border-y border-surface-container-high bg-background py-24"
    >
      {/* Speed lines overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-speed-lines"
      />

      {/* Tech grid with orange-tinted lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(254,88,37,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(254,88,37,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase italic text-on-surface sm:text-4xl md:text-5xl">
            BUILT FOR{" "}
            <span className="text-primary-container">SPEED</span>.
            <br />
            DESIGNED TO STAND OUT.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
            Diseño y producción de gráficos personalizados para pilotos,
            equipos, motos, UTV, off-road y vehículos de competencia.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MOTORSPORT_CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-none border border-surface-container-high border-l-4 border-l-primary-container bg-surface-container p-6 transition-colors hover:border-primary-container/50"
            >
              {/* Icon */}
              <div className="mb-4 flex h-8 w-8 items-center justify-center text-primary-container">
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
            href="https://wa.me/526463077208?text=Hola%2C%20quiero%20cotizar%20un%20proyecto%20motorsport"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-none bg-primary-container px-8 py-4 font-[family-name:var(--font-mono)] text-base font-bold uppercase text-black border-r-4 border-b-4 border-on-primary-container transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Flag className="h-5 w-5" aria-hidden="true" />
            COTIZAR PROYECTO MOTORSPORT
          </a>
        </div>
      </div>
    </section>
  );
}
