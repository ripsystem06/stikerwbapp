"use client";

import { useState, useEffect, useCallback } from "react";
import { ShoppingCart, ChevronUp, X } from "lucide-react";
import { useQuoteContext } from "@/hooks/useQuoteConfigurator";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// ── Helpers ───────────────────────────────────────────────
function specsSummary(item: { dimensions?: string; material?: string; interiorExterior?: string }): string {
  const parts: string[] = [];
  if (item.dimensions) parts.push(item.dimensions);
  if (item.material) parts.push(item.material);
  if (item.interiorExterior) parts.push(item.interiorExterior);
  return parts.join(" · ") || "Sin especificaciones";
}

const DESIGN_LABELS: Record<string, string> = {
  "print-ready": "Listo para imprimir",
  "logo-needs-prep": "Logo necesita preparación",
  "idea-reference": "Tengo idea/referencia",
  "from-scratch": "Desde cero",
};

// ── Shared content ────────────────────────────────────────
function QuoteSummaryContent({
  onContinue,
  onSend,
}: {
  onContinue: () => void;
  onSend: () => void;
}) {
  const { state, selectedProducts, selectedCount } = useQuoteContext();
  const { quoteItems } = state;

  if (selectedCount === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
        <ShoppingCart className="mb-3 h-10 w-10 text-on-surface-variant/40" aria-hidden="true" />
        <p className="text-sm text-on-surface-variant">Seleccioná productos para comenzar tu cotización</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {selectedProducts.map((product) => {
          const item = quoteItems.get(product.id);
          if (!item) return null;
          return (
            <div
              key={product.id}
              className="mb-2 border border-surface-variant bg-surface-container-lowest p-3 last:mb-0"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-[family-name:var(--font-anybody)] text-sm uppercase italic text-on-surface truncate">
                    {product.name}
                  </p>
                  <p className="mt-0.5 font-[family-name:var(--font-mono)] text-xs text-on-surface-variant">
                    {specsSummary(item as { dimensions?: string; material?: string; interiorExterior?: string })}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-primary-container px-2 py-0.5 font-[family-name:var(--font-mono)] text-xs font-bold text-black">
                  ×{item.quantity}
                </span>
              </div>
              {item.designStatus && (
                <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-on-surface-variant/80">
                  Diseño: <span className="text-on-surface-variant">{DESIGN_LABELS[item.designStatus] ?? item.designStatus}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="shrink-0 border-t border-surface-container-high px-4 py-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-on-surface-variant">Total de productos</span>
          <span className="font-bold text-on-surface">{selectedCount}</span>
        </div>
        <button type="button" onClick={onContinue} className="w-full rounded-none bg-primary-container px-4 py-3 font-[family-name:var(--font-mono)] text-sm font-bold uppercase text-black border-r-4 border-b-4 border-on-primary-container transition-all hover:-translate-y-0.5 active:translate-y-0">
          CONTINUAR COTIZACIÓN
        </button>
        <button type="button" onClick={onSend} className="w-full rounded-none bg-surface-container-high px-4 py-3 font-[family-name:var(--font-mono)] text-sm font-bold uppercase text-on-surface border border-surface-container-highest transition-colors hover:bg-surface-container-highest">
          ENVIAR POR WHATSAPP
        </button>
      </div>
    </div>
  );
}

// ── Desktop Panel ─────────────────────────────────────────
function DesktopPanel({
  isOpen,
  onClose,
  onContinue,
  onSend,
}: {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  onSend: () => void;
}) {
  return (
    <aside
      className={`fixed right-0 top-20 z-40 hidden h-[calc(100vh-5rem)] w-[350px] flex-col border-l border-surface-container-high bg-surface transition-transform duration-300 md:flex ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      aria-label="Resumen de cotización"
      aria-hidden={!isOpen}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-tech-grid opacity-10" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="shrink-0 border-b border-surface-container-high px-4 py-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary-container" aria-hidden="true" />
            <h3 className="flex-1 font-[family-name:var(--font-anybody)] text-base font-bold uppercase italic tracking-wide text-on-surface">
              TU COTIZACIÓN
            </h3>
            <button type="button" onClick={onClose} className="p-1.5 text-on-surface-variant transition-colors hover:text-primary-container" aria-label="Cerrar panel de cotización">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <QuoteSummaryContent onContinue={onContinue} onSend={onSend} />
      </div>
    </aside>
  );
}

// ── Mobile Drawer ─────────────────────────────────────────
function MobileDrawer({
  onContinue,
  onSend,
}: {
  onContinue: () => void;
  onSend: () => void;
}) {
  const { selectedCount } = useQuoteContext();
  const [isOpen, setIsOpen] = useState(false);

  if (selectedCount === 0) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
      <aside
        className={`fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl border-t border-surface-container-high bg-surface transition-transform duration-300 md:hidden ${
          isOpen ? "translate-y-0" : "translate-y-[calc(100%-3.5rem)]"
        }`}
        style={{ maxHeight: "80vh" }}
        aria-label="Resumen de cotización"
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="shrink-0 flex flex-col items-center py-3 focus:outline-none"
          aria-label={isOpen ? "Cerrar cotización" : "Ver cotización"}
          aria-expanded={isOpen}
        >
          <span className="mb-1 h-1 w-10 rounded-full bg-surface-container-high" />
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-primary-container" aria-hidden="true" />
            <span className="font-[family-name:var(--font-mono)] text-sm font-bold uppercase tracking-wide text-on-surface">
              {selectedCount} producto{selectedCount > 1 ? "s" : ""}
            </span>
            <span className="rounded-full bg-primary-container px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-bold text-black">
              {selectedCount}
            </span>
            <ChevronUp className={`h-4 w-4 text-primary-container transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
          </div>
        </button>
        <div className="flex-1 overflow-hidden">
          <QuoteSummaryContent
            onContinue={() => { onContinue(); setIsOpen(false); }}
            onSend={() => { onSend(); setIsOpen(false); }}
          />
        </div>
      </aside>
    </>
  );
}

// ── Main component ────────────────────────────────────────
export default function QuoteSummary() {
  const { selectedCount } = useQuoteContext();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  const handleContinue = useCallback(() => {
    const formEl = document.getElementById("cotizar");
    formEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSend = useCallback(() => {
    const formEl = document.getElementById("cotizar");
    formEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      {/* Floating cart button — desktop only */}
      {isDesktop && selectedCount > 0 && !isOpen && (
        <button
          type="button"
          onClick={handleToggle}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-black transition-all hover:scale-110 active:scale-95"
          aria-label={`Ver cotización (${selectedCount} producto${selectedCount > 1 ? "s" : ""})`}
        >
          <ShoppingCart className="h-6 w-6" aria-hidden="true" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-container font-[family-name:var(--font-mono)] text-[10px] font-bold text-on-secondary-container ring-2 ring-surface">
            {selectedCount}
          </span>
        </button>
      )}

      {isDesktop ? (
        <DesktopPanel isOpen={isOpen} onClose={handleClose} onContinue={handleContinue} onSend={handleSend} />
      ) : (
        <MobileDrawer onContinue={handleContinue} onSend={handleSend} />
      )}
    </>
  );
}
