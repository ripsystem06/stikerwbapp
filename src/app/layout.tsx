import type { Metadata, Viewport } from "next";
import { Anybody, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anybody = Anybody({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-anybody",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-hanken-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
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
  themeColor: "#131313",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark scroll-smooth ${anybody.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background text-on-background font-sans antialiased min-h-screen flex flex-col">
        {/* Skip to content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary-container focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-on-primary-container focus:outline-none"
        >
          Saltar al contenido principal
        </a>

        {children}
      </body>
    </html>
  );
}
