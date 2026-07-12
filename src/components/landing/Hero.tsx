"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Check, Layers, Shield, Zap } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

interface TrustBadge {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

const TRUST_BADGES: TrustBadge[] = [
  { icon: Check, text: "Diseño 100% personalizado" },
  { icon: Shield, text: "Producción profesional" },
  { icon: Zap, text: "Desde pequeñas cantidades" },
  { icon: Layers, text: "Materiales interior y exterior" },
];

export default function Hero() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background layer — dark with subtle carbon-fibre geometric overlay */}
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Subtle diagonal accent lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #ffffff 1px, transparent 1px), linear-gradient(225deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Diagonal cut at the bottom */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-16 bg-background"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />

        {/* Content */}
        <m.div
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <m.h1
            className="text-4xl font-extrabold italic leading-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
            variants={fadeUp}
          >
            STICKERS QUE HACEN
            <br />
            DESTACAR TU MARCA
          </m.h1>

          {/* Subheadline */}
          <m.p
            className="mt-6 text-lg font-medium text-text-secondary sm:text-xl"
            variants={fadeUp}
          >
            Tu idea. Tu marca. Tu sticker.
          </m.p>

          {/* Description */}
          <m.p
            className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
            variants={fadeUp}
          >
            Diseñamos y producimos stickers personalizados para empresas, marcas,
            productos, equipos deportivos, vehículos, eventos y cualquier proyecto
            que necesite destacar.
          </m.p>

          {/* CTAs */}
          <m.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            variants={fadeUp}
          >
            <a
              href="#productos"
              className="rounded-lg bg-primary px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-primary-hover sm:text-lg"
            >
              CREAR MI COTIZACIÓN
            </a>
            <a
              href="https://wa.me/521234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-primary/40 px-8 py-3.5 text-base font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10 sm:text-lg"
            >
              COTIZAR POR WHATSAPP
            </a>
          </m.div>

          {/* Trust indicators */}
          <m.div
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
            variants={fadeUp}
          >
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 text-sm text-text-secondary"
              >
                <badge.icon className="h-4 w-4 text-primary" />
                <span>{badge.text}</span>
              </div>
            ))}
          </m.div>
        </m.div>
      </section>
    </LazyMotion>
  );
}
