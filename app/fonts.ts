import { Fraunces, Karla } from "next/font/google";

/**
 * Dos familias, dos funciones semánticas (sistema-visual.md §2.1):
 *   - Fraunces  → `--font-voz`   = la voz de Delfina en primera persona (serif).
 *   - Karla     → `--font-mundo` = el mundo alrededor / lo funcional (sans).
 *
 * `next/font` autohospeda las fuentes (sin request a Google en runtime),
 * inyecta `size-adjust` para el fallback y aplica `display: "swap"`:
 * ese es el control de FOUT y la garantía de render consistente en Android
 * que pide B3 §6. El stack de fallback completo se compone en globals.css,
 * encadenando estas variables con las alternativas de sistema-visual.md.
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

export const fontVariables = `${fraunces.variable} ${karla.variable}`;
