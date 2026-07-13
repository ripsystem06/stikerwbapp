"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { BUSINESS_PHONE } from "@/lib/whatsapp-template";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

const TRUST_BADGES = [
  "Diseño 100% personalizado",
  "Producción profesional",
  "Desde pequeñas cantidades",
  "Materiales interior y exterior",
] as const;

export default function Hero() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Base background */}
        <div className="absolute inset-0 bg-background" />

        {/* Tech grid overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-tech-grid"
        />

        {/* Gradient overlay from left */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"
        />

        {/* Diagonal speed line accents */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(25deg, transparent, transparent 40px, #fe5825 40px, #fe5825 41px), repeating-linear-gradient(-55deg, transparent, transparent 100px, #fe5825 100px, #fe5825 101px)",
          }}
        />

        {/* Dark abstract geometric area on the right */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 h-full w-[45%] opacity-20 bg-speed-lines"
        />

        {/* Diagonal cut at bottom */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-16 bg-background"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />

        {/* Content */}
        <m.div
          className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left content — md:col-span-8 */}
          <div className="flex flex-col justify-center md:col-span-8">
            {/* Headline block — slanted */}
            <m.div className="transform skewX(-5deg)" variants={fadeUp}>
              <h1 className="font-[family-name:var(--font-anybody)] text-4xl font-extrabold uppercase italic leading-[1.05] md:text-7xl">
                <span className="block text-on-surface">STICKERS QUE</span>
                <span className="block text-primary-container">
                  HACEN DESTACAR
                </span>
                <span className="block text-on-surface">TU MARCA</span>
              </h1>
            </m.div>

            {/* Subtitle */}
            <m.p
              className="mt-8 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl"
              variants={fadeUp}
            >
              Diseñamos y producimos stickers personalizados para empresas,
              marcas, productos, equipos deportivos, vehículos, eventos y
              cualquier proyecto que necesite destacar.
            </m.p>

            {/* CTAs */}
            <m.div
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5"
              variants={fadeUp}
            >
              <a
                href="#productos"
                className="group/cot inline-flex slanted"
              >
                <span className="unslanted inline-flex items-center justify-center bg-primary-container px-8 py-3.5 text-sm font-bold uppercase text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] transition-colors hover:brightness-110 font-[family-name:var(--font-jetbrains-mono)] tracking-wide">
                  CREAR MI COTIZACIÓN
                </span>
              </a>
              <a
                href={`https://wa.me/${BUSINESS_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/wa inline-flex slanted"
              >
                <span className="unslanted inline-flex items-center justify-center gap-2 border border-surface-container-high bg-surface-container px-8 py-3.5 text-sm font-bold uppercase text-on-surface transition-colors hover:border-primary-container hover:text-primary-container font-[family-name:var(--font-jetbrains-mono)] tracking-wide">
                  <MessageCircle className="size-4" />
                  COTIZAR POR WHATSAPP
                </span>
              </a>
            </m.div>

            {/* Trust indicators */}
            <m.div
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
              variants={fadeUp}
            >
              {TRUST_BADGES.map((text) => (
                <span
                  key={text}
                  className="text-xs uppercase tracking-wider text-on-surface-variant/70 font-[family-name:var(--font-jetbrains-mono)]"
                >
                  {text}
                </span>
              ))}
            </m.div>
          </div>

          {/* Right column — empty on desktop for the abstract visual */}
          <div className="hidden md:col-span-4 md:block" aria-hidden="true" />
        </m.div>
      </section>
    </LazyMotion>
  );
}
