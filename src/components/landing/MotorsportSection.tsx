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
      className="relative overflow-hidden border-t-2 border-primary/30 bg-background py-24"
    >
      {/* Diagonal stripe pattern background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #FF6B00, #FF6B00 1px, transparent 1px, transparent 12px)",
        }}
      />

      {/* Aggressive diagonal accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rotate-12 rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(ellipse at center, #FF6B00 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold italic tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            BUILT FOR SPEED.
            <br />
            DESIGNED TO STAND OUT.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Diseño y producción de gráficos personalizados para pilotos,
            equipos, motos, UTV, off-road y vehículos de competencia.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MOTORSPORT_CARDS.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-xl border-l-4 border-primary bg-surface-alt/80 p-6 transition-colors hover:bg-surface-alt"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <card.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-base font-bold uppercase tracking-wide text-text-primary">
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
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-all hover:bg-primary-hover hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] active:scale-[0.98]"
          >
            <Flag className="h-5 w-5" aria-hidden="true" />
            COTIZAR PROYECTO MOTORSPORT
          </a>
        </div>
      </div>
    </section>
  );
}
