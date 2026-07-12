import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ProcessSteps from "@/components/landing/ProcessSteps";
import QuoteConfiguratorShell from "@/components/landing/QuoteConfiguratorShell";
import CategoryFilter from "@/components/landing/CategoryFilter";
import ProductSelector from "@/components/landing/ProductSelector";
import DynamicQuoteForm from "@/components/landing/DynamicQuoteForm";
import QuoteSummary from "@/components/landing/QuoteSummary";
import ProjectGallery from "@/components/landing/ProjectGallery";
import MotorsportSection from "@/components/landing/MotorsportSection";
import BusinessSection from "@/components/landing/BusinessSection";
import Benefits from "@/components/landing/Benefits";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <ProcessSteps />
        <QuoteConfiguratorShell>
          <CategoryFilter />
          <ProductSelector />
          <div id="cotizar">
            <DynamicQuoteForm />
          </div>
          <QuoteSummary />
        </QuoteConfiguratorShell>
        <ProjectGallery />
        <MotorsportSection />
        <BusinessSection />
        <Benefits />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
