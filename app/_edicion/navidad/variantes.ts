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

/**
 * LA SELECCIÓN DE DELFINA (2026-11-14, chat 013: "yo dejaría así"). Es la configuración que ve
 * cualquiera que entre al sitio: el servidor la dibuja, y en esta rama no hay panel ni se leen
 * elecciones guardadas en el navegador, así que no depende de lo que alguien haya tocado.
 *
 *  · Versión B · Navidad en su sección
 *  · Tonos: Borgoña y dorado
 *  · Efecto animado: Solo destellos
 *  · Adorno entre secciones: Lamparitas
 *  · Comienzo de la home: Hola, soy Delfi
 *  · Al tocar un sticker: Solo un brillo
 *
 * "Colores de las secciones" no existe en la versión B (la casa conserva sus colores): queda
 * en "salas" sólo porque el tipo lo pide, y no cambia nada en pantalla.
 *
 * La exploración completa —la base anterior (A · Cereza y pino · Colores navideños · Combinados
 * · Lamparitas · Hola · Destellos alrededor) y todas las alternativas— vive en la rama
 * `delfina-merry-christmas`.
 */
export const BASE: Variantes = {
  version: "b",
  paleta: "borgona",
  intensidad: "salas",
  luz: "destellos",
  onda: "luces",
  apertura: "hola",
  toque: "aura",
};

interface Opcion<K extends keyof Variantes> {
  rotulo: string;
  valores: readonly (readonly [Variantes[K], string])[];
  /** Si sólo tiene sentido en una versión: en la otra, el panel no la muestra. */
  soloEn?: Version;
  /** Si sólo cambia algo en una página: en las demás, el panel no la muestra. */
  soloEnRuta?: string;
}

/**
 * LOS NOMBRES DEL PANEL (quinta pasada). El panel lo usa Delfina para elegir, así que cada
 * nombre dice QUÉ CAMBIA EN PANTALLA, no cómo se pensó adentro. Antes había nombres de taller
 * —"Intensidad", "Salas de fiesta", "Anochecer", "Mezcla por sala", "Apertura"—: describían
 * la decisión de diseño, no lo que se ve. Las claves internas no cambian: los nombres son
 * presentación, y las propuestas visuales siguen siendo exactamente las mismas.
 *
 *  · "Intensidad" no cambiaba la cantidad de decoración sino los COLORES de las secciones:
 *    ahora se llama así. Y no puede ser "Paleta" porque sus tres opciones se dibujan con la
 *    paleta elegida arriba; por eso la paleta pasa a llamarse "Tonos de Navidad".
 */
export const OPCIONES: { [K in keyof Variantes]: Opcion<K> } = {
  version: {
    rotulo: "Versión",
    valores: [
      ["a", "A · Navidad en toda la web"],
      ["b", "B · Navidad en su sección"],
    ],
  },
  paleta: {
    rotulo: "Tonos de Navidad",
    valores: [
      ["cereza", "Rojo cereza y verde pino"],
      ["borgona", "Borgoña y dorado"],
    ],
  },
  intensidad: {
    rotulo: "Colores de las secciones",
    // En B la casa es la de siempre: no hay colores de sección que elegir.
    soloEn: "a",
    valores: [
      // La casa de siempre: sus fondos no cambian, sólo los acentos.
      ["detalles", "Colores originales"],
      // Las secciones se pintan con los tonos de Navidad elegidos.
      ["salas", "Colores navideños"],
      // De claro a oscuro, bajando: la web anochece.
      ["anochecer", "Del día a la noche"],
    ],
  },
  luz: {
    rotulo: "Efecto animado",
    valores: [
      ["mezcla", "Combinados por sección"],
      ["nieve", "Solo nieve"],
      ["destellos", "Solo destellos"],
      ["luces", "Solo lucecitas"],
      ["calma", "Sin efecto"],
    ],
  },
  onda: {
    rotulo: "Adorno entre secciones",
    valores: [
      ["luces", "Lamparitas"],
      ["pino", "Guirnalda de pino"],
      ["cinta", "Cinta de regalo"],
    ],
  },
  apertura: {
    rotulo: "Comienzo de la home",
    soloEnRuta: "/",
    valores: [
      ["hola", "Hola, soy Delfi"],
      ["navidad", "La sección de Navidad"],
    ],
  },
  toque: {
    rotulo: "Al tocar un sticker",
    // Nombres de lo que se ve, no de cómo está hecho: la segunda era `canvas-confetti`, el nombre
    // de la librería.
    valores: [
      ["estrellas", "Destellos alrededor"],
      ["confetti", "Estrellitas que saltan"],
      ["aura", "Solo un brillo"],
    ],
  },
};
