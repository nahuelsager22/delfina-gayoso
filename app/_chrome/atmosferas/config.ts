/**
 * Sistema de SALAS — configuración centralizada (Bloque 8, 3ª ola: modelo editorial).
 * -----------------------------------------------------------------------------
 * Evolución del sistema de atmósferas: se abandona el CAMPO CONTINUO (una capa fija
 * que interpolaba el color al hacer scroll y "encendía" la atmósfera al llegar a cada
 * sección —una sensación incómoda—). Ahora cada momento es una HABITACIÓN de la misma
 * casa: su color YA existe en su espacio; el usuario entra y simplemente está dentro
 * de ese universo. Cada sala es una pequeña pieza editorial —el color puede ser el
 * protagonista, ocupar todo el ancho— dentro del mismo universo gastronómico.
 *
 * TODA la definición vive acá. El contenido sólo declara `momento.atmosfera` (la clave
 * de la sala); `Momento` pinta el fondo y fija la tinta local como variables scopeadas
 * (`--atm-ink` / `--atm-ink-soft` / `--atm-accent`), que el texto, los acentos y los
 * detalles heredan. El navbar (fijo, fuera del flujo) lee la sala de arriba vía el
 * proveedor. Reutilizable en otro proyecto cambiando sólo este archivo.
 *
 * LEGIBILIDAD: cada sala declara su tinta pensada para SU fondo (oscura en las claras,
 * clara en las profundas). Contraste medido del texto principal ≥AA (varias AAA); el
 * secundario ≥AA; el acento es para detalle. Islas claras (hoja de recetario) reasignan
 * tinta oscura localmente.
 */

export type RGB = readonly [number, number, number];

export interface Sala {
  /** Fondo de la habitación (string CSS: color o gradiente con profundidad editorial). */
  readonly bg: string;
  /** Texto principal legible sobre este fondo. */
  readonly ink: RGB;
  /** Texto secundario / meta. */
  readonly inkSoft: RGB;
  /** Acento que resalta sobre este fondo (detalles, curvas, sellos, numerales). */
  readonly accent: RGB;
  /** Color sólido representativo de la sala (para el navbar y el menú opaco). */
  readonly navBg: RGB;
  /** ¿La habitación es de tono oscuro? (para el navbar y micro-decisiones). */
  readonly oscura: boolean;
  /**
   * Bloque 8 · 10ª ola — BANDA de color a pleno ancho. Reemplaza al modelo anterior
   * (bloque contenido `panel` de la 7ª ola / campo que se disuelve de la 9ª ola). Las
   * secciones con color propio (`banda: true`) ocupan el ancho completo con su color
   * SÓLIDO y CORTES CLAROS: el borde entre un color y el siguiente es una ONDA nítida
   * (ver `Momento` + `.onda-sup`), no un degradado. Cada atmósfera conserva su identidad
   * y las curvas son las que conectan el recorrido. Las secciones de descanso viven
   * sobre crema (`banda: false`).
   */
  readonly banda: boolean;
  /** Color sólido de la banda / de la onda de corte (hex). En crema = el propio crema. */
  readonly solido: string;
  /** Compatibilidad con componentes archivados (ya no se usa en el recorrido vivo). */
  readonly panel?: boolean;
}

/* PALETA (Bloque 8 · 10ª ola): NUEVA paleta compartida por Delfina (images/paleta.jpg).
   verde bosque #2C4027 · salvia #B1BFAA · marrón #413223 · crema #F3EEE4 · arena #DBC9A0
   · terracota #9D301D. La terracota REEMPLAZA al bordó/vino del cierre —se integra mejor
   con el resto de la identidad y recupera el rojo cálido del universo (MasterChef)—.
   El recorrido son BANDAS de color a pleno ancho con cortes claros (ondas), sobre una
   base crema. Alternan claras (salvia, arena, crema · tinta oscura) y profundas (verde,
   terracota · tinta crema). */
export const SALAS: Record<string, Sala> = {
  // Entrada: crema (sin banda). El aire de la casa.
  bienvenida: {
    bg: "var(--color-harina)",
    solido: "#F3EEE4",
    ink: [42, 36, 30],
    inkSoft: [63, 55, 45],
    accent: [107, 74, 31],
    navBg: [243, 238, 228],
    oscura: false,
    banda: false,
  },
  // Quién soy (bienvenida breve): SALVIA clara del manual. Banda cálida, tinta oscura.
  "quien-soy": {
    bg: "#b1bfaa",
    solido: "#B1BFAA",
    ink: [38, 44, 34],
    inkSoft: [64, 74, 58],
    accent: [44, 64, 39],
    navBg: [177, 191, 170],
    oscura: false,
    banda: true,
  },
  // Lo que te llevás (ebooks + clases): ARENA cálida. Banda clara, tinta oscura.
  calida: {
    bg: "#dbc9a0",
    solido: "#DBC9A0",
    ink: [42, 36, 30],
    inkSoft: [72, 62, 46],
    accent: [107, 74, 31],
    navBg: [219, 201, 160],
    oscura: false,
    banda: true,
  },
  // Marcas con las que colaboro: crema (respiro). Acento TERRACOTA (10ª ola): el rojo del
  // manual pasa a ser un color de APOYO —líneas, detalles— y acá marca el recorrido pro.
  marcas: {
    bg: "var(--color-harina)",
    solido: "#F3EEE4",
    ink: [42, 36, 30],
    inkSoft: [63, 55, 45],
    accent: [157, 48, 29],
    navBg: [243, 238, 228],
    oscura: false,
    banda: false,
  },
  // Trabajemos juntos (servicios): VERDE BOSQUE del manual (#2C4027). Banda profunda.
  fresca: {
    bg: "#2c4027",
    solido: "#2C4027",
    ink: [244, 240, 228],
    inkSoft: [206, 214, 196],
    accent: [201, 168, 106],
    navBg: [44, 64, 39],
    oscura: true,
    banda: true,
  },
  // La clase no termina (cierre): MARRÓN profundo del manual (#413223). 10ª ola: se
  // retira el terracota como fondo (queda para acentos); el marrón cierra cálido y hondo
  // sin repetir el verde de servicios. Acento ARENA para los detalles (lee sobre marrón).
  despedida: {
    bg: "#413223",
    solido: "#413223",
    ink: [246, 239, 228],
    inkSoft: [214, 205, 190],
    accent: [219, 201, 160],
    navBg: [65, 50, 35],
    oscura: true,
    banda: true,
  },

  /* --- Salas ARCHIVADAS (componentes fuera del recorrido, no se montan) --- */
  corazon: {
    bg: "#413223",
    solido: "#413223",
    ink: [245, 239, 227],
    inkSoft: [220, 210, 192],
    accent: [201, 168, 106],
    navBg: [65, 50, 35],
    oscura: true,
    banda: true,
  },
  intima: {
    bg: "var(--color-harina)",
    solido: "#F3EEE4",
    ink: [42, 36, 30],
    inkSoft: [63, 55, 45],
    accent: [138, 58, 45],
    navBg: [243, 238, 228],
    oscura: false,
    banda: false,
  },
  compartir: {
    bg: "#b1bfaa",
    solido: "#B1BFAA",
    ink: [38, 44, 34],
    inkSoft: [64, 74, 58],
    accent: [44, 64, 39],
    navBg: [177, 191, 170],
    oscura: false,
    banda: true,
  },
};

export const SALA_DEFECTO = "bienvenida";

export function getSala(id: string | undefined): Sala {
  return (id && SALAS[id]) || SALAS[SALA_DEFECTO]!;
}

export const rgbStr = (c: RGB) => `${c[0]} ${c[1]} ${c[2]}`;

/** Sólo la tinta de la sala (sin fondo): la usa el CAMPO, que pinta su propio gradiente
 *  de disolución desde CSS y no puede recibir un `background` inline que lo pise. */
export function tintaSala(sala: Sala): Record<string, string> {
  return {
    color: `rgb(${rgbStr(sala.ink)})`,
    "--atm-ink": rgbStr(sala.ink),
    "--atm-ink-soft": rgbStr(sala.inkSoft),
    "--atm-accent": rgbStr(sala.accent),
  };
}

/** Atributos que el navbar lee del DOM para saber qué color tiene debajo, frame por
 *  frame. Cada superficie —banda de color o crema— se declara a sí misma (10ª ola). */
export function datosNavbar(sala: Sala): Record<string, string> {
  return {
    "data-nav-color": rgbStr(sala.navBg),
    "data-nav-ink": rgbStr(sala.ink),
    "data-nav-ink-soft": rgbStr(sala.inkSoft),
    "data-nav-accent": rgbStr(sala.accent),
  };
}

/** Variables de tinta de una sala, para fijar en el `<section>` (las hereda el contenido). */
export function estiloSala(sala: Sala): Record<string, string> {
  return {
    background: sala.bg,
    color: `rgb(${rgbStr(sala.ink)})`,
    "--atm-ink": rgbStr(sala.ink),
    "--atm-ink-soft": rgbStr(sala.inkSoft),
    "--atm-accent": rgbStr(sala.accent),
  };
}

/** Escribe en `:root` la tinta de la sala que está bajo el navbar (para que el bar,
 *  fijo y fuera del flujo, herede la habitación de arriba sin "encender" nada raro:
 *  cambia junto con el borde de la sala al pasar bajo él). */
export function escribirNavbar(el: HTMLElement, sala: Sala): void {
  el.style.setProperty("--nav-ink", rgbStr(sala.ink));
  el.style.setProperty("--nav-ink-soft", rgbStr(sala.inkSoft));
  el.style.setProperty("--nav-accent", rgbStr(sala.accent));
  el.style.setProperty("--nav-bg", rgbStr(sala.navBg));
  el.style.setProperty("--nav-oscura", sala.oscura ? "1" : "0");
}
