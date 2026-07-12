"use client";

import { useState, type MouseEvent } from "react";
import { MessageCircle } from "lucide-react";
import { useQuoteContext } from "@/hooks/useQuoteConfigurator";
import {
  buildWhatsAppMessage,
  getWhatsAppUrl,
  BUSINESS_PHONE,
} from "@/lib/whatsapp-template";
import type { QuoteFormData } from "@/lib/schemas";

/**
 * Pure utility: builds the QuoteFormData payload from contact data + context items
 * and opens the WhatsApp deep-link.
 */
export function openWhatsApp(data: QuoteFormData): void {
  const message = buildWhatsAppMessage(data);
  const url = getWhatsAppUrl(BUSINESS_PHONE, message);
  window.open(url, "_blank", "noopener,noreferrer");
}

interface WhatsAppQuoteGeneratorProps {
  className?: string;
}

/**
 * Renders the "Send via WhatsApp" submit button.
 *
 * Acts as the form's submit trigger. On click checks that at least one
 * product is selected — if not, prevents submission and shows an error.
 * Delegates actual validation + WhatsApp generation to the parent form's
 * React Hook Form handleSubmit callback.
 */
export default function WhatsAppQuoteGenerator({
  className = "",
}: WhatsAppQuoteGeneratorProps) {
  const { selectedCount } = useQuoteContext();
  const [error, setError] = useState<string | null>(null);

  const hasProducts = selectedCount > 0;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setError(null);

    if (!hasProducts) {
      e.preventDefault();
      setError("Seleccioná al menos un producto para continuar");
    }
  };

  return (
    <div className={className}>
      <button
        type="submit"
        onClick={handleClick}
        disabled={!hasProducts}
        className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-base font-bold uppercase tracking-wide transition-all sm:w-auto ${
          hasProducts
            ? "bg-[#25D366] text-white hover:bg-[#20bd5a] active:scale-[0.98]"
            : "cursor-not-allowed bg-surface-alt text-text-secondary"
        }`}
        aria-label="Enviar cotización por WhatsApp"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        ENVIAR MI COTIZACIÓN POR WHATSAPP
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
