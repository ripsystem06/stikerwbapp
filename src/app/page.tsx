import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import ProcessSteps from "@/components/landing/ProcessSteps";
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
        <div className="h-px bg-surface-container-high" aria-hidden="true" />
        <section id="como-funciona">
          <ProcessSteps />
        </section>
        <div className="h-px bg-surface-container-high" aria-hidden="true" />
        <section id="proyectos">
          <ProjectGallery />
        </section>
        <div className="h-px bg-surface-container-high" aria-hidden="true" />
        <section id="motorsport">
          <MotorsportSection />
        </section>
        <div className="h-px bg-surface-container-high" aria-hidden="true" />
        <section id="empresas">
          <BusinessSection />
        </section>
        <div className="h-px bg-surface-container-high" aria-hidden="true" />
        <Benefits />
        <div className="h-px bg-surface-container-high" aria-hidden="true" />
        <section id="contacto">
          <FAQ />
        </section>
      </main>
      <Footer />
    </>
  );
}
