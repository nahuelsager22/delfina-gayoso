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
   * Bloque 8 · 7ª ola (dirección de referencias): el fondo del sitio es CREMA. Cuando
   * `panel` es true, el momento se muestra dentro de una SUPERFICIE de color contenida
   * (un bloque editorial que destaca ese tramo); cuando es false, vive directo sobre el
   * crema (sección de descanso). El color/tinta de la sala se usan para el panel.
   */
  readonly panel: boolean;
  /**
   * Bloque 8 · 9ª ola — CAMPO. Las secciones principales (La Serie, Trabajemos juntos)
   * dejan el bloque contenido y ocupan el ancho completo, pero no empiezan ni terminan
   * con un corte: su color nace del crema y vuelve al crema a través de zonas de
   * disolución amplias (`--campo-fade`), de modo que no hay un punto identificable
   * donde termina un color y empieza el siguiente. Como el borde de la sección ES
   * crema, la unión con las secciones vecinas es invisible sin superponer capas.
   *
   * Regla de legibilidad: dentro de la zona de disolución NUNCA vive texto —sólo
   * adornos—; el contenido empieza cuando el color ya es sólido. Así el color puede
   * ser intenso sin negociar el contraste (R14).
   */
  readonly campo?: boolean;
}

/* Las 7 habitaciones, por clave de `momento.atmosfera`. Cada una con un color dominante
   y su tinta. El recorrido es una secuencia de piezas editoriales: crema → oro → EL
   HORNO (chocolate) → piedra → EL VERDE (servicios) → la mesa (terracota) → EL ATARDECER
   (vino). Algunas claras (tinta oscura), otras profundas (tinta clara). */
/* PALETA (Bloque 8 · 8ª ola): se reencuadra sobre el MANUAL DE MARCA —verde bosque
   #39532A, taupe #AEA391, marrón #573C23, crema— buscando una identidad editorial
   sofisticada y atemporal. Se retira el naranja/oro saturado (leía "lúdico/ilustrativo"
   más que editorial) y en su lugar entra una ARENA cálida y apagada. Los bloques
   alternan claros (arena, taupe) y profundos (marrón, verde, vino) sobre el crema. */
export const SALAS: Record<string, Sala> = {
  // Entrada: crema (sin bloque). El aire de la casa.
  bienvenida: {
    bg: "var(--color-harina)",
    ink: [42, 36, 30],
    inkSoft: [63, 55, 45],
    accent: [107, 74, 31],
    navBg: [247, 242, 234],
    oscura: false,
    panel: false,
  },
  // La oferta (ebooks): ARENA cálida y apagada — presencia sin estridencia.
  calida: {
    bg: "linear-gradient(180deg, #dccba6 0%, #dccba6 24%, #d3c099 100%)",
    ink: [42, 36, 30],
    inkSoft: [63, 55, 45],
    accent: [107, 74, 31],
    navBg: [220, 203, 166],
    oscura: false,
    panel: true,
  },
  // El corazón (aprendizaje): MARRÓN profundo del manual. Inmersivo, tinta crema.
  corazon: {
    bg: "linear-gradient(180deg, #4a3527 0%, #4a3527 24%, #3b2a1e 100%)",
    ink: [245, 239, 227],
    inkSoft: [220, 210, 192],
    accent: [201, 168, 106],
    navBg: [74, 53, 39],
    oscura: true,
    panel: false,
    campo: true, // 9ª ola: sección principal → campo a pleno ancho que se disuelve
  },
  // La persona: crema (sin bloque) — el respiro. Acá vive el rescoldo de MasterChef.
  intima: {
    bg: "var(--color-harina)",
    ink: [42, 36, 30],
    inkSoft: [63, 55, 45],
    accent: [138, 58, 45],
    navBg: [247, 242, 234],
    oscura: false,
    panel: false,
  },
  // El servicio: VERDE BOSQUE del manual (#39532A). Bloque profundo, tinta crema.
  fresca: {
    bg: "linear-gradient(180deg, #39532a 0%, #39532a 24%, #2e4522 100%)",
    ink: [245, 239, 227],
    inkSoft: [220, 210, 192],
    accent: [201, 187, 132],
    navBg: [57, 83, 42],
    oscura: true,
    panel: false,
    campo: true, // 9ª ola: sección principal → campo a pleno ancho que se disuelve
  },
  // La comunidad: TAUPE del manual (#AEA391). Bloque claro y sereno, tinta oscura.
  compartir: {
    bg: "linear-gradient(180deg, #aea391 0%, #aea391 24%, #a2967f 100%)",
    ink: [42, 36, 30],
    inkSoft: [63, 55, 45],
    accent: [90, 58, 32],
    navBg: [174, 163, 145],
    oscura: false,
    panel: true,
  },
  // La despedida: VINO profundo y apagado. Cierra con hondura, tinta crema.
  despedida: {
    bg: "linear-gradient(180deg, #4e2630 0%, #4e2630 24%, #3f1e27 100%)",
    ink: [245, 239, 227],
    inkSoft: [220, 210, 192],
    accent: [201, 168, 106],
    navBg: [78, 38, 48],
    oscura: true,
    panel: true,
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
 *  frame (9ª ola). Cada superficie de color —panel o campo— se declara a sí misma. */
export function datosNavbar(
  sala: Sala,
  tipo: "panel" | "campo",
): Record<string, string> {
  return {
    "data-nav-color": rgbStr(sala.navBg),
    "data-nav-ink": rgbStr(sala.ink),
    "data-nav-ink-soft": rgbStr(sala.inkSoft),
    "data-nav-accent": rgbStr(sala.accent),
    "data-nav-tipo": tipo,
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
