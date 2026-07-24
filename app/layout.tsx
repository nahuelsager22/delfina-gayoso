import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

/**
 * Layout RAÍZ — sólo el documento (Bloque 8 · 14ª ola).
 *
 * Antes acá vivía todo el "chrome" del sitio (pantalla de carga, navbar, Budín). Al
 * embeber el Studio en `/studio`, ese chrome se montaba también sobre el panel de
 * edición. Ahora la raíz es mínima y cada zona trae lo suyo:
 *   · `app/(sitio)/layout.tsx` → el recorrido, con todo su chrome.
 *   · `app/studio/…`           → el Studio, limpio.
 * El grupo `(sitio)` no aparece en la URL: la home sigue siendo `/`.
 */
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
      <body>{children}</body>
    </html>
  );
}
