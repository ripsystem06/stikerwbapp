import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stickers Profesionales Personalizados | Stikers",
  description:
    "Diseñamos y producimos stickers personalizados para empresas, marcas, productos, equipos deportivos, vehículos, motocross, off-road, eventos y cualquier proyecto. Cotizá por WhatsApp.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Stickers Profesionales Personalizados | Stikers",
    description:
      "Diseñamos y producimos stickers personalizados para empresas, marcas, productos, equipos deportivos, vehículos, motocross, off-road, eventos y cualquier proyecto. Cotizá por WhatsApp.",
    type: "website",
    locale: "es_MX",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark scroll-smooth ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-text-primary font-sans antialiased min-h-screen flex flex-col">
        {/* Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:outline-none"
        >
          Saltar al contenido principal
        </a>

        {children}
      </body>
    </html>
  );
}
