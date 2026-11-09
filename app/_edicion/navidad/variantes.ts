import type { ClavePaleta, Intensidad } from "./paletas";

/**
 * Las dimensiones que se comparan en vivo (Bloque 12). `BASE` es lo que sirve el HTML; el
 * control de desarrollo mueve el resto sobre la página ya cargada. Segunda exploración: todas
 * siguen abiertas, nada está elegido.
 */
export type Luz = "mezcla" | "nieve" | "destellos" | "luces" | "calma";
export type Onda = "luces" | "pino" | "cinta";
export type Apertura = "hola" | "navidad";
export type Toque = "estrellas" | "confetti" | "aura";

export interface Variantes {
  paleta: ClavePaleta;
  intensidad: Intensidad;
  luz: Luz;
  onda: Onda;
  apertura: Apertura;
  toque: Toque;
}

export const BASE: Variantes = {
  paleta: "cereza",
  intensidad: "salas",
  luz: "mezcla",
  onda: "luces",
  apertura: "hola",
  toque: "estrellas",
};

export const OPCIONES: {
  [K in keyof Variantes]: { rotulo: string; valores: readonly (readonly [Variantes[K], string])[] };
} = {
  paleta: {
    rotulo: "Paleta",
    valores: [
      ["cereza", "Cereza y pino"],
      ["borgona", "Borgoña y oro"],
    ],
  },
  intensidad: {
    rotulo: "Intensidad",
    valores: [
      ["detalles", "Detalles"],
      ["salas", "Salas de fiesta"],
      ["anochecer", "Anochecer"],
    ],
  },
  luz: {
    rotulo: "Ambiente",
    valores: [
      ["mezcla", "Mezcla por sala"],
      ["nieve", "Nieve"],
      ["destellos", "Destellos"],
      ["luces", "Luces flotando"],
      ["calma", "Sin partículas"],
    ],
  },
  onda: {
    rotulo: "Ondas",
    valores: [
      ["luces", "Lamparitas"],
      ["pino", "Guirnalda de pino"],
      ["cinta", "Cinta"],
    ],
  },
  apertura: {
    rotulo: "Apertura",
    valores: [
      ["hola", "Hola, soy Delfi"],
      ["navidad", "Navidad abre"],
    ],
  },
  toque: {
    rotulo: "Al tocar",
    valores: [
      ["estrellas", "Destellos propios"],
      ["confetti", "canvas-confetti"],
      ["aura", "Sólo aura"],
    ],
  },
};
