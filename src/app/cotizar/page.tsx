import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import QuoteConfiguratorShell from "@/components/landing/QuoteConfiguratorShell";
import CategoryFilter from "@/components/landing/CategoryFilter";
import ProductSelector from "@/components/landing/ProductSelector";
import DynamicQuoteForm from "@/components/landing/DynamicQuoteForm";
import QuoteSummary from "@/components/landing/QuoteSummary";

export const metadata = {
  title: "Cotizá tus Stickers | Stikers",
  description:
    "Seleccioná tus stickers personalizados, indicá cantidades, dimensiones y materiales. Enviá tu cotización por WhatsApp sin compromiso.",
};

export default function CotizarPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-background pt-20">
        <div className="relative bg-tech-grid">
          <QuoteConfiguratorShell>
            <CategoryFilter />
            <ProductSelector />
            <div id="cotizar">
              <DynamicQuoteForm />
            </div>
            <QuoteSummary />
          </QuoteConfiguratorShell>
        </div>
      </main>
      <Footer />
    </>
  );
}
