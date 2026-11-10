import type { ClavePaleta, Intensidad } from "./paletas";

/**
 * Las dimensiones que se comparan en vivo (Bloque 12). `BASE` es lo que sirve el HTML; el
 * panel de exploración mueve el resto sobre la página ya cargada. Nada está elegido.
 *
 * Tercera exploración: la primera dimensión es la VERSIÓN, que no es un ajuste más sino dos
 * propuestas completas de cómo vive la Navidad en la web.
 *  · A — Navidad en toda la casa: cada sala participa, con su color, su ambiente y sus
 *    stickers.
 *  · B — Navidad en su sección: la casa de siempre, y una sala de Navidad que concentra toda
 *    la fiesta. El resto queda unido por pocos detalles: la agenda abierta, el gorro de Budín,
 *    el acceso del navbar y las luces que enmarcan la entrada y la salida de la sala.
 */
export type Version = "a" | "b";
export type Luz = "mezcla" | "nieve" | "destellos" | "luces" | "calma";
export type Onda = "luces" | "pino" | "cinta";
export type Apertura = "hola" | "navidad";
export type Toque = "estrellas" | "confetti" | "aura";

export interface Variantes {
  version: Version;
  paleta: ClavePaleta;
  intensidad: Intensidad;
  luz: Luz;
  onda: Onda;
  apertura: Apertura;
  toque: Toque;
}

export const BASE: Variantes = {
  version: "a",
  paleta: "cereza",
  intensidad: "salas",
  luz: "mezcla",
  onda: "luces",
  apertura: "hola",
  toque: "estrellas",
};

interface Opcion<K extends keyof Variantes> {
  rotulo: string;
  valores: readonly (readonly [Variantes[K], string])[];
  /** Si sólo tiene sentido en una versión: en la otra, el panel no la muestra. */
  soloEn?: Version;
}

export const OPCIONES: { [K in keyof Variantes]: Opcion<K> } = {
  version: {
    rotulo: "Versión",
    valores: [
      ["a", "A · Navidad en toda la web"],
      ["b", "B · Navidad en su sección"],
    ],
  },
  paleta: {
    rotulo: "Paleta",
    valores: [
      ["cereza", "Cereza y pino"],
      ["borgona", "Borgoña y oro"],
    ],
  },
  intensidad: {
    rotulo: "Intensidad",
    // En B la casa es la de siempre: no hay intensidad que elegir.
    soloEn: "a",
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
    // Nombres de lo que se ve, no de cómo está hecho: la segunda era `canvas-confetti`, el nombre
    // de la librería.
    valores: [
      ["estrellas", "Destellos alrededor"],
      ["confetti", "Estrellitas que saltan"],
      ["aura", "Sólo un brillo"],
    ],
  },
};
