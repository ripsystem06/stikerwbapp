import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Productos", href: "#productos" },
  { label: "Empresas", href: "#empresas" },
  { label: "Motorsport", href: "#motorsport" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-surface-alt">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-bold tracking-tight text-text-primary"
        >
          <span>STIKERS</span>
          <span className="inline-block h-1.5 w-1.5 rounded-sm bg-primary" />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#productos"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Cotizar
        </a>
      </div>
    </header>
  );
}
