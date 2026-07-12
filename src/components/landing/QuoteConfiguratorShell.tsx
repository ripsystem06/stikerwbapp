"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { QuoteProvider } from "@/hooks/useQuoteConfigurator";
import type { ReactNode } from "react";

interface QuoteConfiguratorShellProps {
  children: ReactNode;
}

export default function QuoteConfiguratorShell({
  children,
}: QuoteConfiguratorShellProps) {
  return (
    <LazyMotion features={domAnimation}>
      <QuoteProvider>
        <section id="productos" className="bg-surface py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold uppercase italic tracking-wide text-text-primary sm:text-4xl">
                ¿QUÉ TIPO DE STICKER NECESITAS?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary sm:text-lg">
                Seleccioná uno o varios productos para tu cotización
              </p>
            </div>

            {children}
          </div>
        </section>
      </QuoteProvider>
    </LazyMotion>
  );
}
