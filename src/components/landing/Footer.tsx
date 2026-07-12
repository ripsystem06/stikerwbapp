import { Camera, Share2, MessageCircle } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

const PRODUCTOS_LINKS: FooterLink[] = [
  { label: "Stickers personalizados", href: "#productos" },
  { label: "Empresas y marcas", href: "#empresas" },
  { label: "Motorsport", href: "#motorsport" },
  { label: "Etiquetas", href: "#productos" },
  { label: "Packaging", href: "#productos" },
  { label: "Eventos", href: "#productos" },
];

const EMPRESA_LINKS: FooterLink[] = [
  { label: "Sobre nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
  { label: "WhatsApp", href: "https://wa.me/521234567890" },
  { label: "Cotizar", href: "#productos" },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-alt bg-background">
      {/* Main footer content */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Logo + description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-1.5 text-lg font-bold tracking-tight text-text-primary">
              <span>STIKERS</span>
              <span className="inline-block h-1.5 w-1.5 rounded-sm bg-primary" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Diseñamos y producimos stickers personalizados de alta calidad.
              Tu idea, tu marca, tu sticker.
            </p>
          </div>

          {/* Column 2 — Productos */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-text-primary">
              Productos
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCTOS_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Empresa */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-text-primary">
              Empresa
            </h3>
            <ul className="mt-4 space-y-2.5">
              {EMPRESA_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contacto */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-text-primary">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-text-secondary">
              <li>hola@stikers.com</li>
              <li>+52 1 23 4567 8901</li>
              <li>Ciudad de México, México</li>
            </ul>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-text-secondary transition-colors hover:text-primary"
              >
                <Camera className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-text-secondary transition-colors hover:text-primary"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/521234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-text-secondary transition-colors hover:text-primary"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-alt">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <p className="text-center text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Stikers. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
