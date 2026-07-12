import type { Metadata } from "next";
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
    "Fabricamos stickers personalizados de alta calidad para negocios, motorsport, packaging y proyectos especiales. Solicitá tu cotización sin compromiso y recibí asesoramiento personalizado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-background text-text-primary font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
