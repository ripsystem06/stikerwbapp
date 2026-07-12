import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  open?: boolean;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Pueden crear mi diseño desde cero?",
    answer:
      "Sí, contamos con equipo de diseño que puede crear tu arte desde cero. Solo necesitamos que nos cuentes tu idea, referencias visuales y el estilo que buscás. También trabajamos con tus archivos si ya tenés el diseño listo.",
    open: true,
  },
  {
    question: "¿Cuál es la cantidad mínima?",
    answer:
      "Desde 1 pieza. No tenemos mínimos obligatorios. También manejamos pedidos por volumen con descuentos progresivos según la cantidad.",
  },
  {
    question: "¿Qué archivos debo enviar?",
    answer:
      "Trabajamos con AI, PSD, PDF, PNG o SVG en alta resolución. Si tenés dudas sobre el formato, consultanos y te guiamos sin cargo.",
  },
  {
    question: "¿Los stickers son resistentes al agua?",
    answer:
      "Sí, trabajamos con materiales waterproof y laminados de protección. Tus stickers resisten lluvia, humedad y salpicaduras sin deteriorarse.",
  },
  {
    question: "¿Se pueden usar en exteriores?",
    answer:
      "Sí, tenemos materiales con protección UV específicamente diseñados para exterior. Soportan exposición solar prolongada, cambios de temperatura y condiciones climáticas adversas.",
  },
  {
    question: "¿Qué material recomiendan?",
    answer:
      "Depende del uso que le vayas a dar. Te asesoramos sin costo para elegir el material ideal: vinilo, laminado, transparente, holográfico, reflectivo o el que mejor se adapte a tu proyecto.",
  },
  {
    question: "¿Realizan pedidos por volumen?",
    answer:
      "Sí, manejamos producción a escala empresarial. Contamos con capacidad para grandes tiradas manteniendo la misma calidad y atención al detalle que en pedidos chicos.",
  },
  {
    question: "¿Fabrican kits completos para motos y vehículos?",
    answer:
      "Sí, diseñamos y producimos kits gráficos completos para motos, autos, cuatriciclos y cualquier vehículo. Medimos, diseñamos, producimos e instalamos.",
  },
  {
    question: "¿Puedo pedir stickers de reposición?",
    answer:
      "Sí, guardamos tus archivos y plantillas para que puedas pedir reposiciones en cualquier momento. Mismo diseño, misma calidad, sin empezar de cero.",
  },
  {
    question: "¿Realizan envíos?",
    answer:
      "Sí, enviamos a todo el país. Coordinamos el envío más conveniente según tu ubicación y el volumen del pedido.",
  },
  {
    question: "¿Cuánto tarda la producción?",
    answer:
      "De 3 a 7 días hábiles según el volumen y la complejidad del pedido. Te confirmamos el plazo exacto al momento de cotizar.",
  },
];

export default function FAQ() {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Section header */}
        <h2 className="text-center font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase italic tracking-wide text-on-surface sm:text-4xl">
          PREGUNTAS
          <br />
          FRECUENTES
        </h2>

        {/* FAQ items */}
        <div className="mt-14 border-t border-surface-container-high">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              open={item.open}
              className="group border-b border-surface-container-high"
            >
              <summary className="flex cursor-pointer items-center justify-between py-5 font-[family-name:var(--font-mono)] text-sm font-bold uppercase text-on-surface transition-colors hover:text-primary-container select-none">
                <span className="pr-4">{item.question}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-primary-container transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-5">
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
