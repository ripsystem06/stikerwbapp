import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const NAVEGACION_LINKS: FooterLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "#productos" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Cómo funciona", href: "#como-funciona" },
];

const EMPRESA_LINKS: FooterLink[] = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Aviso de privacidad", href: "#privacidad" },
  { label: "Términos y condiciones", href: "#terminos" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant">
      <div className="mx-auto max-w-[1600px] px-8 py-16">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Column 1 — Logo */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-[family-name:var(--font-anybody)] text-lg font-bold italic text-on-surface">
                STIKERS
              </span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-widest text-primary-container mt-1 not-italic">
                Stickers Custom
              </span>
            </Link>
          </div>

          {/* Column 2 — Navegación */}
          <div className="flex flex-col gap-2">
            <h4 className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-widest text-on-surface mb-2">
              Navegación
            </h4>
            {NAVEGACION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-on-surface-variant transition-colors hover:text-primary-container"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 3 — Empresa */}
          <div className="flex flex-col gap-2">
            <h4 className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-widest text-on-surface mb-2">
              Empresa
            </h4>
            {EMPRESA_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-on-surface-variant transition-colors hover:text-primary-container"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 4 — Legal */}
          <div className="flex flex-col gap-2">
            <h4 className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-medium uppercase tracking-widest text-on-surface mb-2">
              Legal
            </h4>
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-jetbrains-mono)] text-sm text-on-surface-variant transition-colors hover:text-primary-container"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-outline-variant">
        <div className="mx-auto max-w-[1600px] px-8 py-5">
          <p className="text-center text-sm text-on-surface-variant">
            &copy; {currentYear} Stikers. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
