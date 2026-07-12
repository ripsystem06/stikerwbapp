"use client";

import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ShoppingCart, ChevronUp, X } from "lucide-react";
import { useQuoteContext } from "@/hooks/useQuoteConfigurator";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// ── Animation variants ────────────────────────────────────
const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: { x: "100%", transition: { duration: 0.2 } },
};

const drawerVariants = {
  collapsed: { y: "calc(100% - 3.5rem)" },
  expanded: { y: 0 },
};

const itemVariants = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12, transition: { duration: 0.15 } },
};

// ── Helpers ───────────────────────────────────────────────

/** Returns a human-readable summary of a quote item's key specs. */
function specsSummary(
  item: ReturnType<typeof useQuoteContext>["state"]["quoteItems"] extends Map<
    string,
    infer T
  >
    ? T
    : never,
): string {
  const parts: string[] = [];
  if (item.dimensions) parts.push(item.dimensions);
  if (item.material) parts.push(item.material);
  if (item.interiorExterior) parts.push(item.interiorExterior);
  return parts.join(" · ") || "Sin especificaciones";
}

// ── Shared content ────────────────────────────────────────
interface QuoteSummaryContentProps {
  onContinue: () => void;
  onSend: () => void;
}

function QuoteSummaryContent({ onContinue, onSend }: QuoteSummaryContentProps) {
  const { state, selectedProducts, selectedCount } = useQuoteContext();
  const { quoteItems } = state;

  if (selectedCount === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-8 text-center">
        <ShoppingCart
          className="mb-3 h-10 w-10 text-text-secondary/40"
          aria-hidden="true"
        />
        <p className="text-sm text-text-secondary">
          Seleccioná productos para comenzar tu cotización
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Product list */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <AnimatePresence mode="popLayout">
          {selectedProducts.map((product) => {
            const item = quoteItems.get(product.id);
            if (!item) return null;

            return (
              <m.div
                key={product.id}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
                className="border-b border-surface-alt py-3 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-text-primary truncate">
                      {product.name}
                    </p>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {specsSummary(item)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                    ×{item.quantity}
                  </span>
                </div>

                {item.designStatus && (
                  <p className="mt-1 text-xs text-text-secondary/80">
                    Diseño:{" "}
                    <span className="text-text-secondary">
                      {
                        {
                          "print-ready": "Listo para imprimir",
                          "logo-needs-prep": "Logo necesita preparación",
                          "idea-reference": "Tengo idea/referencia",
                          "from-scratch": "Desde cero",
                        }[item.designStatus]
                      }
                    </span>
                  </p>
                )}
              </m.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-surface-alt px-4 py-3 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Total de productos</span>
          <span className="font-bold text-text-primary">{selectedCount}</span>
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-lg border border-primary/40 px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary transition-colors hover:border-primary hover:bg-primary/10"
        >
          CONTINUAR COTIZACIÓN
        </button>

        <button
          type="button"
          onClick={onSend}
          className="w-full rounded-lg bg-[#25D366] px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#20bd5a] active:scale-[0.98]"
        >
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
    <AnimatePresence>
      {isOpen && (
        <m.aside
          key="desktop-panel"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed right-0 top-20 hidden h-[calc(100vh-5rem)] w-[360px] flex-col border-l border-surface-alt bg-surface md:flex"
          aria-label="Resumen de cotización"
        >
          {/* Header */}
          <div className="shrink-0 border-b border-surface-alt px-4 py-4">
            <div className="flex items-center gap-2">
              <ShoppingCart
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
              <h3 className="flex-1 text-base font-bold uppercase tracking-wide text-text-primary">
                TU COTIZACIÓN
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-surface-alt hover:text-text-primary"
                aria-label="Cerrar panel de cotización"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <QuoteSummaryContent onContinue={onContinue} onSend={onSend} />
        </m.aside>
      )}
    </AnimatePresence>
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

  // Hide drawer entirely when no products selected
  if (selectedCount === 0) return null;

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const handleContinue = useCallback(() => {
    onContinue();
    setIsOpen(false);
  }, [onContinue]);

  const handleSend = useCallback(() => {
    onSend();
    setIsOpen(false);
  }, [onSend]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <m.aside
        className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl bg-surface shadow-[0_-4px_20px_rgba(0,0,0,0.5)] md:hidden"
        style={{ maxHeight: "80vh" }}
        variants={drawerVariants}
        initial="collapsed"
        animate={isOpen ? "expanded" : "collapsed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        aria-label="Resumen de cotización"
      >
        {/* Pull handle / collapsed bar */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="shrink-0 flex flex-col items-center py-3 focus:outline-none"
          aria-label={isOpen ? "Cerrar cotización" : "Ver cotización"}
          aria-expanded={isOpen}
        >
          <span className="mb-1 h-1 w-10 rounded-full bg-surface-alt" />
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-bold uppercase tracking-wide text-text-primary">
              {selectedCount > 0
                ? `${selectedCount} producto${selectedCount > 1 ? "s" : ""}`
                : "TU COTIZACIÓN"}
            </span>
            {selectedCount > 0 && (
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                {selectedCount}
              </span>
            )}
            <ChevronUp
              className={`h-4 w-4 text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </div>
        </button>

        {/* Content (visible when expanded) */}
        <div className="flex-1 overflow-hidden">
          <QuoteSummaryContent onContinue={handleContinue} onSend={handleSend} />
        </div>
      </m.aside>
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
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleSend = useCallback(() => {
    // Scroll to form and let the WhatsApp button there handle submission
    const formEl = document.getElementById("cotizar");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      {/* Floating cart button — desktop only, visible when products selected */}
      {isDesktop && selectedCount > 0 && !isOpen && (
        <m.button
          key="floating-cart"
          type="button"
          onClick={handleToggle}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform hover:scale-110 active:scale-95"
          aria-label={`Ver cotización (${selectedCount} producto${selectedCount > 1 ? "s" : ""})`}
        >
          <ShoppingCart className="h-6 w-6" aria-hidden="true" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white ring-2 ring-surface">
            {selectedCount}
          </span>
        </m.button>
      )}

      {isDesktop ? (
        <DesktopPanel
          isOpen={isOpen}
          onClose={handleClose}
          onContinue={handleContinue}
          onSend={handleSend}
        />
      ) : (
        <MobileDrawer onContinue={handleContinue} onSend={handleSend} />
      )}
    </>
  );
}
