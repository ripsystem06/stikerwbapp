import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "#productos" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-20 bg-background/80 backdrop-blur-md border-b border-surface-container-high">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-8">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-[family-name:var(--font-anybody)] text-lg font-bold italic text-on-surface">
            STIKERS
          </span>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] uppercase tracking-widest text-primary-container mt-0.5 not-italic">
            Stickers Custom
          </span>
        </Link>

        {/* Navigation — desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/";
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "text-primary-container border-b-2 border-primary-container pb-1"
                    : "text-on-surface-variant hover:text-primary-container"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* CTA — desktop */}
        <a
          href="#productos"
          className="hidden md:inline-flex px-6 py-2 font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium uppercase tracking-wide bg-primary-container text-on-primary-container rounded-none border-r-4 border-b-4 border-on-primary-container hover:-translate-y-0.5 hover:translate-x-0.5 active:translate-y-0 active:translate-x-0 active:border-r-0 active:border-b-0 transition-all duration-150"
        >
          Cotizar
        </a>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden text-on-surface"
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
