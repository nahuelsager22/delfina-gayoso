/**
 * LAS PALETAS DE LA EDICIÓN (Bloque 12 · exploración).
 * -----------------------------------------------------------------------------
 * Cada paleta recolorea las salas por su clave, sin que el contenido se entere: el mismo
 * punto único que `PIGMENTOS`, pero para la temporada. Sin importaciones en tiempo de
 * ejecución, para que el control de desarrollo y el script de contraste la lean igual.
 *
 * Quedan dos paletas (segunda exploración): Cereza y pino, y Borgoña y oro. "Los colores de
 * la casa" y "Caramelo y menta" se retiraron después del primer corte (ver `docs/navidad.md`).
 *
 * Y tres INTENSIDADES por paleta, las tres con el mismo grado de desarrollo:
 *  · `detalles`: la casa de siempre, vestida. Sus fondos no cambian; cambian los acentos (los
 *    rótulos pasan al rojo o al oro de la paleta) y llegan las luces, los stickers y la banda.
 *  · `salas`: salas que alternan, como la casa habitual pero de fiesta.
 *  · `anochecer`: el color baja de la tarde a la noche, una sola vez, de arriba a abajo.
 *
 * Todo número de contraste de este archivo lo comprueba `medir-contraste` (ver
 * `docs/navidad.md`), no se estima.
 */

export type Hex = `#${string}`;

export interface Tintas {
  readonly ink: Hex;
  readonly inkSoft: Hex;
  readonly accent: Hex;
}

export interface SalaEdicion extends Tintas {
  readonly bg: Hex;
  readonly oscura: boolean;
}

export const CLAVES_SALA = [
  "quien-soy",
  "navidad",
  "bienvenida",
  "marcas",
  "fresca",
  "calida",
  "despedida",
  "colaboraciones",
  "mesa",
  "compartir",
  // `/navidad` (quinta pasada): sus cuatro salas tienen clave propia, así cada variante las
  // compone como un recorrido y no como copias de la banda de la home.
  "navidad-entrada",
  "navidad-llevar",
  "navidad-juntos",
  "navidad-cierre",
] as const;
export type ClaveSala = (typeof CLAVES_SALA)[number];

type Def = readonly [Hex, "claro" | "hondo", Tintas?];

export interface Paleta {
  readonly nombre: string;
  /** La idea, en una línea: para qué se probaría esta y no otra. */
  readonly idea: string;
  /** Tintas sobre fondo claro y sobre fondo hondo. Cada sala elige por tono. */
  readonly claro: Tintas;
  readonly hondo: Tintas;
  readonly detalles: Record<ClaveSala, Def>;
  readonly fiesta: Record<ClaveSala, Def>;
  readonly anochecer: Record<ClaveSala, Def>;
}

/* La casa habitual, con sus propias tintas: `detalles` sólo les cambia el acento. Son los
   valores de `SALAS` en `atmosferas/config.ts`, escritos en hex. */
const CASA = {
  salvia: { bg: "#B1BFAA", ink: "#262C22", inkSoft: "#404A3A" },
  crema: { bg: "#F3EEE4", ink: "#2A241E", inkSoft: "#3F372D" },
  piedra: { bg: "#D8D0C5", ink: "#2A241E", inkSoft: "#463E35" },
  verde: { bg: "#2C4027", ink: "#F4F0E4", inkSoft: "#CED6C4" },
  arena: { bg: "#DBC9A0", ink: "#2A241E", inkSoft: "#483E2E" },
  marron: { bg: "#413223", ink: "#F6EFE4", inkSoft: "#D6CDBE" },
} as const;

/** La casa de siempre con el acento de la paleta: rojo sobre lo claro, oro sobre lo hondo. */
function casaVestida(acentoClaro: Hex, acentoHondo: Hex, banda: Def): Record<ClaveSala, Def> {
  const claro = (c: (typeof CASA)[keyof typeof CASA]): Def => [
    c.bg as Hex,
    "claro",
    { ink: c.ink as Hex, inkSoft: c.inkSoft as Hex, accent: acentoClaro },
  ];
  const hondo = (c: (typeof CASA)[keyof typeof CASA]): Def => [
    c.bg as Hex,
    "hondo",
    { ink: c.ink as Hex, inkSoft: c.inkSoft as Hex, accent: acentoHondo },
  ];
  return {
    "quien-soy": claro(CASA.salvia),
    navidad: banda,
    bienvenida: claro(CASA.crema),
    marcas: claro(CASA.piedra),
    fresca: hondo(CASA.verde),
    calida: claro(CASA.arena),
    despedida: hondo(CASA.marron),
    colaboraciones: claro(CASA.crema),
    mesa: claro(CASA.crema),
    compartir: claro(CASA.salvia),
    // `/navidad` con los colores de siempre: la entrada es la banda de temporada, y el resto
    // son salas de la casa —crema, verde, marrón— con el acento de la paleta.
    "navidad-entrada": banda,
    "navidad-llevar": claro(CASA.crema),
    "navidad-juntos": hondo(CASA.verde),
    "navidad-cierre": hondo(CASA.marron),
  };
}

export const PALETAS = {
  /* Cereza y pino son el rojo y el verde de siempre pero con cuerpo de comida —una cereza en
     almíbar, una rama de verdad—; el rosa glasé y la manteca son lo que le saca el aire de
     tarjeta corporativa y lo acerca a una mesa dulce. */
  cereza: {
    nombre: "Cereza y pino",
    idea: "La casa decorada: rojo de comida, verde de rama, glasé y manteca.",
    claro: { ink: "#34130E", inkSoft: "#5A2A20", accent: "#9C1226" },
    hondo: { ink: "#FFF6E6", inkSoft: "#FFE9D6", accent: "#F8D88A" },
    detalles: casaVestida("#8E0F22", "#F8D88A", [
      "#AE1529",
      "hondo",
      { ink: "#FFF8EA", inkSoft: "#FFEEDD", accent: "#FBE09C" },
    ]),
    fiesta: {
      "quien-soy": ["#AE1529", "hondo", { ink: "#FFF8EA", inkSoft: "#FFEEDD", accent: "#FBE09C" }],
      navidad: ["#123F2C", "hondo"],
      bienvenida: ["#FFF3D9", "claro"],
      marcas: ["#F9DAD3", "claro", { ink: "#34130E", inkSoft: "#5A2A20", accent: "#8E0F22" }],
      fresca: ["#6A0F21", "hondo"],
      calida: ["#F3CF74", "claro", { ink: "#2E110C", inkSoft: "#4C2219", accent: "#7E0D1E" }],
      despedida: ["#0E2233", "hondo"],
      colaboraciones: ["#FFF3D9", "claro"],
      mesa: ["#FFF3D9", "claro"],
      compartir: ["#F9DAD3", "claro", { ink: "#34130E", inkSoft: "#5A2A20", accent: "#8E0F22" }],
      // `/navidad`: pino a la entrada, manteca para lo que se lleva, cereza para lo que se
      // arma, y la noche al final.
      "navidad-entrada": ["#123F2C", "hondo"],
      "navidad-llevar": ["#FFF3D9", "claro"],
      "navidad-juntos": ["#AE1529", "hondo", { ink: "#FFF8EA", inkSoft: "#FFEEDD", accent: "#FBE09C" }],
      "navidad-cierre": ["#0E2233", "hondo"],
    },
    anochecer: {
      "quien-soy": ["#FFEFCF", "claro"],
      navidad: ["#AE1529", "hondo", { ink: "#FFF8EA", inkSoft: "#FFEEDD", accent: "#FBE09C" }],
      bienvenida: ["#FBDDD2", "claro", { ink: "#34130E", inkSoft: "#5A2A20", accent: "#8E0F22" }],
      marcas: ["#EFA992", "claro", { ink: "#2E110C", inkSoft: "#431D15", accent: "#6B0B1A" }],
      fresca: ["#7E1226", "hondo"],
      calida: ["#3F0E22", "hondo"],
      despedida: ["#0C1A2B", "hondo"],
      colaboraciones: ["#FFEFCF", "claro"],
      mesa: ["#FFEFCF", "claro"],
      compartir: ["#FBDDD2", "claro", { ink: "#34130E", inkSoft: "#5A2A20", accent: "#8E0F22" }],
      // `/navidad` también anochece: de la tarde a la noche, bajando.
      "navidad-entrada": ["#FFEFCF", "claro"],
      "navidad-llevar": ["#FBDDD2", "claro", { ink: "#34130E", inkSoft: "#5A2A20", accent: "#8E0F22" }],
      "navidad-juntos": ["#AE1529", "hondo", { ink: "#FFF8EA", inkSoft: "#FFEEDD", accent: "#FBE09C" }],
      "navidad-cierre": ["#0C1A2B", "hondo"],
    },
  },

  /* Nochebuena: más vino que fruta. Es la que corre el riesgo de leerse como lujo —lo que el
     proyecto evita en general y acá sólo se compara—, así que el oro es de masita, no de
     joyería. */
  borgona: {
    nombre: "Borgoña y oro",
    idea: "Nochebuena: vino, oro de horno y verde muy hondo.",
    claro: { ink: "#2F1016", inkSoft: "#53262E", accent: "#7A1830" },
    hondo: { ink: "#FBF0DF", inkSoft: "#F0DDC6", accent: "#EFCB7C" },
    detalles: casaVestida("#6A1228", "#EFCB7C", ["#5C0F1F", "hondo"]),
    fiesta: {
      "quien-soy": ["#5C0F1F", "hondo"],
      navidad: ["#0F3327", "hondo"],
      bienvenida: ["#FBF1DC", "claro"],
      marcas: ["#EADBC0", "claro"],
      fresca: ["#7A1830", "hondo"],
      calida: ["#DDBA63", "claro", { ink: "#2A0E13", inkSoft: "#431D24", accent: "#5E0F20" }],
      despedida: ["#1C0A13", "hondo"],
      colaboraciones: ["#FBF1DC", "claro"],
      mesa: ["#FBF1DC", "claro"],
      compartir: ["#EADBC0", "claro"],
      "navidad-entrada": ["#0F3327", "hondo"],
      "navidad-llevar": ["#FBF1DC", "claro"],
      "navidad-juntos": ["#5C0F1F", "hondo"],
      "navidad-cierre": ["#1C0A13", "hondo"],
    },
    anochecer: {
      "quien-soy": ["#F7E7CB", "claro"],
      navidad: ["#7A1830", "hondo"],
      bienvenida: ["#EAD3B2", "claro", { ink: "#2A0E13", inkSoft: "#47212A", accent: "#6A1228" }],
      marcas: ["#C99B6B", "claro", { ink: "#240B10", inkSoft: "#34141B", accent: "#4F0C1B" }],
      fresca: ["#5C0F1F", "hondo"],
      calida: ["#2E0D1E", "hondo"],
      despedida: ["#140910", "hondo"],
      colaboraciones: ["#F7E7CB", "claro"],
      mesa: ["#F7E7CB", "claro"],
      compartir: ["#EAD3B2", "claro", { ink: "#2A0E13", inkSoft: "#47212A", accent: "#6A1228" }],
      "navidad-entrada": ["#F7E7CB", "claro"],
      "navidad-llevar": ["#EAD3B2", "claro", { ink: "#2A0E13", inkSoft: "#47212A", accent: "#6A1228" }],
      "navidad-juntos": ["#7A1830", "hondo"],
      "navidad-cierre": ["#140910", "hondo"],
    },
  },
} as const satisfies Record<string, Paleta>;

export type ClavePaleta = keyof typeof PALETAS;
export type Intensidad = "detalles" | "salas" | "anochecer";

/** La sala de la edición para esa paleta e intensidad. */
export function salaEdicion(
  clave: string | undefined,
  paleta: ClavePaleta,
  intensidad: Intensidad,
): SalaEdicion | null {
  const p: Paleta = PALETAS[paleta];
  const mapa = intensidad === "anochecer" ? p.anochecer : intensidad === "detalles" ? p.detalles : p.fiesta;
  const def = mapa[clave as ClaveSala];
  if (!def) return null;
  const [bg, tono, propias] = def;
  return { bg, oscura: tono === "hondo", ...(propias ?? p[tono]) };
}

/**
 * La sala según la VERSIÓN (tercera exploración). En A, la de la paleta y la intensidad. En B la
 * casa es la de siempre (`null`: cada sala conserva su color habitual) y sólo la sala de Navidad
 * se viste, con el rojo de la paleta: en una casa de salvia, crema, piedra y verde, es el único
 * color que no existe en ninguna otra sala, y por eso la sala se reconoce de lejos.
 */
export function salaSegunVersion(
  clave: string | undefined,
  paleta: ClavePaleta,
  intensidad: Intensidad,
  version: "a" | "b",
): SalaEdicion | null {
  if (version === "a") return salaEdicion(clave, paleta, intensidad);
  if (!esSalaNavidad(clave)) return null;
  // `/navidad` en B es la sala de Navidad entera: entra por el mismo rojo de la banda de la
  // home —quien llega desde ahí sigue en la misma sala—, pasa por manteca para lo que se
  // lleva, por pino para lo que se arma y termina de noche.
  const sala: Partial<Record<ClaveSala, [ClaveSala, Intensidad]>> = {
    navidad: ["navidad", "anochecer"],
    "navidad-entrada": ["navidad", "anochecer"],
    "navidad-llevar": ["navidad-llevar", "salas"],
    "navidad-juntos": ["navidad", "salas"],
    "navidad-cierre": ["despedida", "salas"],
  };
  const [de, en] = sala[clave as ClaveSala] ?? ["navidad", "anochecer"];
  return salaEdicion(de, paleta, en);
}

/** Las salas que son de Navidad: la banda de la home y las cuatro de `/navidad`. En B, son
 *  las únicas que se visten. */
export function esSalaNavidad(clave: string | undefined): boolean {
  return clave === "navidad" || !!clave?.startsWith("navidad-");
}
