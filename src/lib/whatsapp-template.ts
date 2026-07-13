import { type QuoteFormData, type QuoteItem } from "./schemas";

export const BUSINESS_PHONE = "526463077208";

function formatItem(item: QuoteItem): string {
  const lines: string[] = [];

  lines.push(`📦 *${item.productId}*`);
  lines.push(`   Cantidad: ${item.quantity}`);

  if (item.dimensions) {
    lines.push(`   Medidas: ${item.dimensions}`);
  }
  if (item.material) {
    lines.push(`   Material: ${item.material}`);
  }
  if (item.finish) {
    lines.push(`   Acabado: ${item.finish}`);
  }
  if (item.interiorExterior) {
    lines.push(`   Uso: ${item.interiorExterior}`);
  }

  // Motorsport-specific details
  if (item.vehicleBrand || item.vehicleModel || item.vehicleYear) {
    const vehicleParts: string[] = [];
    if (item.vehicleBrand) vehicleParts.push(item.vehicleBrand);
    if (item.vehicleModel) vehicleParts.push(item.vehicleModel);
    if (item.vehicleYear) vehicleParts.push(String(item.vehicleYear));
    lines.push(`   Vehículo: ${vehicleParts.join(" ")}`);
  }
  if (item.competitionNumber) {
    lines.push(`   N° Competición: ${item.competitionNumber}`);
  }
  if (item.riderName) {
    lines.push(`   Piloto: ${item.riderName}`);
  }

  if (item.designStatus) {
    lines.push(`   Estado del diseño: ${item.designStatus}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppMessage(data: QuoteFormData): string {
  const lines: string[] = [];

  // Greeting
  lines.push("👋 *Solicitud de Cotización — Stikers*");
  lines.push("");

  // Contact info
  lines.push("📋 *Datos de contacto*");
  lines.push(`   Nombre: ${data.name}`);
  if (data.company) {
    lines.push(`   Empresa: ${data.company}`);
  }
  lines.push(`   Ciudad: ${data.city}`);
  lines.push(`   WhatsApp: ${data.whatsapp}`);
  if (data.email) {
    lines.push(`   Email: ${data.email}`);
  }
  if (data.requiredDate) {
    lines.push(`   Fecha requerida: ${data.requiredDate}`);
  }
  lines.push("");

  // Products
  lines.push("📋 *Productos solicitados*");
  lines.push("");

  data.items.forEach((item, index) => {
    lines.push(formatItem(item));
    if (index < data.items.length - 1) {
      lines.push("");
      lines.push("--------");
      lines.push("");
    }
  });

  // Comments
  if (data.comments) {
    lines.push("");
    lines.push("💬 *Comentarios adicionales*");
    lines.push(data.comments);
  }

  return lines.join("\n");
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
