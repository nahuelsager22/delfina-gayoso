import { Fraunces, Karla, Newsreader } from "next/font/google";

/**
 * Tres familias, tres funciones semánticas (docs/sistema-visual.md):
 *   - Fraunces   → `--font-voz`     = la voz de Delfina en primera persona (serif).
 *   - Karla      → `--font-mundo`   = el mundo alrededor / lo funcional (sans).
 *   - Newsreader → `--font-estudio` = la tipografía de North Studio (Bloque 11).
 *
 * `next/font` autohospeda las fuentes (sin request a Google en runtime),
 * inyecta `size-adjust` para el fallback y aplica `display: "swap"`:
 * ese es el control de FOUT y la garantía de render consistente en Android
 * que pide B3 §6. El stack de fallback completo se compone en globals.css,
 * encadenando estas variables con las alternativas de docs/sistema-visual.md.
 */

// Fraunces es variable: exponemos sus ejes (opsz, SOFT, WONK) para poder
// configurarlos vía `font-variation-settings` con los tokens del sistema (§2.3).
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
  // Sin `weight`: se conserva el rango variable completo del eje `wght`.
});

export const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

/**
 * NEWSREADER — la tipografía de North Studio (Bloque 11), y la tercera familia del
 * sitio. No entra a competir con las otras dos: aparece **una sola vez por página**,
 * en la firma del estudio al pie de la última sala, a cuerpo micro.
 *
 * Por qué una familia propia y no la del sitio: Fraunces es la voz de Delfina —firmar
 * con ella sería hablar por ella— y Karla es el mundo funcional de su casa. La firma
 * es de otro; que esté escrita en la tipografía del estudio es justamente lo que la
 * vuelve legible como una marca ajena dentro de su casa, y no como una línea más del
 * cierre. Es la misma familia que usa `north-studio-web`. El stack (`--font-estudio`)
 * se compone en globals.css, como el de las otras dos.
 *
 * `weight: "400"` y los dos estilos, que es exactamente lo que usa la firma
 * ("Desarrollado por" redonda + "North Studio" itálica) y lo único que se descarga.
 * `preload: false` a propósito: es una línea de 14px al final del scroll y no tiene
 * por qué disputarle prioridad de red a lo que se ve al entrar.
 */
export const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
  preload: false,
});

export const fontVariables = `${fraunces.variable} ${karla.variable} ${newsreader.variable}`;
