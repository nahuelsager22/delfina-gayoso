import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import { Navbar } from "./_chrome/Navbar";
import { LenisProvider } from "./_chrome/LenisProvider";
import { AtmosferaProvider } from "./_chrome/atmosferas/AtmosferaProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://delfina-gayoso.vercel.app"),
  title: "Delfina Gayoso",
  description: "Aprender cocina junto a Delfina.",
  openGraph: {
    type: "website",
    url: "https://delfina-gayoso.vercel.app",
    title: "Delfina Gayoso",
    description: "Aprender cocina junto a Delfina.",
    siteName: "Delfina Gayoso",
    // Logotipo oficial del Manual de Marca (badge verde), para identidad consistente
    // al compartir en redes/mensajería (Bloque 8, 6ª ola).
    images: [{ url: "/logotipo/logotipo-3.png", width: 1080, height: 1080, alt: "Delfina Gayoso" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F2EA", // Harina: el universo es luminoso (sin modo oscuro, B3 §7)
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // lang rioplatense: su voz, humor y registro son en español (B3 §7).
    <html lang="es" className={fontVariables}>
      <body>
        {/* Pantalla de carga (Bloque 8 · 6ª ola): el logotipo oficial con una respiración
            suave sobre `Harina`, que se disuelve sola (animación CSS, en el HTML inicial
            → sin flash de hidratación). No es un spinner genérico: es una extensión breve
            del universo. Con `prefers-reduced-motion` se retira de inmediato. */}
        <div className="pantalla-carga" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pantalla-carga-logo"
            src="/logotipo/logotipo-1.png"
            alt=""
            width={180}
            height={180}
          />
        </div>
        <AtmosferaProvider>
          <LenisProvider>
            <Navbar />
            {children}
          </LenisProvider>
        </AtmosferaProvider>
      </body>
    </html>
  );
}
