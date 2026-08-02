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
 *
 * ICONO DE PESTAÑA (27ª ola). No se declara acá: son archivos, y Next arma los `<link>`
 * solo — `app/icon.png` (32px, el tamaño real de una pestaña), `app/icon1.png` (512px,
 * para bookmarks y PWA) y `app/apple-icon.png` (180px, pantalla de inicio de iOS).
 *
 * Es el MISMO monograma del navbar —la D en tinta, la G en terracota, compuestas en
 * Fraunces con su kerning natural— dentro de la insignia circular del manual: círculo
 * crema con filo verde bosque, como el logotipo oficial. Dos decisiones que importan:
 *  · La insignia, y no las letras sueltas. Un "DG" a 16px sobre transparencia se pierde
 *    contra cualquier barra de pestañas; el círculo le da borde y lo vuelve un objeto.
 *  · El `apple-icon` lleva el crema HORNEADO en un cuadrado, porque iOS no respeta la
 *    transparencia y compondría el círculo sobre negro.
 * Se generaron con la Fraunces real (no una aproximación) y se verificaron a 180, 64 y
 * 32px, que es donde una identidad tipográfica se rompe o sobrevive.
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
