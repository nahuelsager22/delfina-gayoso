/**
 * Sistema de Atmósferas — configuración centralizada (Bloque 6.5).
 * -----------------------------------------------------------------------------
 * La atmósfera no es un fondo: es el aire del proyecto. Un campo continuo de luz
 * que acompaña la emoción de cada momento y se interpola de uno a otro sin cortes.
 *
 * TODA la definición vive acá. El contenido sólo declara `momento.atmosfera`; los
 * componentes no hardcodean colores. Para reutilizar el sistema en otro proyecto de
 * North-Studio se cambia SÓLO este archivo (y las declaraciones por sección).
 *
 * MODELO DE TRES CAPAS (profundizado en la cuarta ola, inspirado en la FILOSOFÍA
 * atmosférica de proyectos anteriores —riqueza cromática, profundidad, sensación de
 * luz—, NO en su estética):
 *   · `luz`         — un foco claro y cálido: la fuente de luz (da luminosidad).
 *   · `color`       — el color emocional del momento (da identidad y carácter).
 *   · `profundidad` — un tono más hondo hacia un borde (da volumen y profundidad).
 * Las tres se interpolan de forma continua entre secciones. Los colores nacen del
 * universo gastronómico de Delfina; se usa color con más decisión donde ayuda a la
 * emoción, siempre sobre `Harina` y sin bajar la legibilidad del texto (`Hierro`).
 */

/** Un RGB como triplete (para interpolar por canal). */
export type RGB = readonly [number, number, number];

/** Una capa de luz: un foco radial (color + intensidad + posición + radio). */
export interface CapaAtmosfera {
  readonly rgb: RGB;
  /** Opacidad del tinte sobre Harina (0–1). */
  readonly intensidad: number;
  /** Posición del foco, en % del viewport. */
  readonly x: number;
  readonly y: number;
  /** Radio de influencia, en % (dónde se desvanece a transparente). */
  readonly radio: number;
}

export interface Atmosfera {
  readonly luz: CapaAtmosfera;
  readonly color: CapaAtmosfera;
  readonly profundidad: CapaAtmosfera;
}

/* Paleta base (sistema-visual §1) + tonos de luz/profundidad derivados de ella. */
const MASA: RGB = [237, 229, 216];
const PIEDRA: RGB = [107, 97, 86];
const YEMA: RGB = [232, 161, 58];
const CORTEZA: RGB = [180, 97, 31];
const PEREJIL: RGB = [78, 106, 60];
const CREMA: RGB = [255, 248, 233]; // luz cálida alta (amanecer / horno)
const EMBER: RGB = [128, 58, 26]; // profundidad cálida (rescoldo)
const MUSGO: RGB = [52, 80, 55]; // profundidad fresca (verde hondo)
const MALVA: RGB = [122, 92, 108]; // profundidad neutra con algo de chroma

/**
 * Las atmósferas del recorrido, nombradas por su EMOCIÓN (no por la sección). Cada
 * una construye una sensación claramente distinta —amanecer, apetito, el horno, lo
 * íntimo, lo fresco, la mesa compartida, el atardecer— y la continuidad la garantiza
 * la interpolación entre momentos.
 */
export const ATMOSFERAS: Record<string, Atmosfera> = {
  // Entrada: amanecer en la cocina. Luz alta y cálida, aire que recibe.
  bienvenida: {
    luz: { rgb: CREMA, intensidad: 0.16, x: 50, y: 0, radio: 55 },
    color: { rgb: YEMA, intensidad: 0.12, x: 50, y: 12, radio: 76 },
    profundidad: { rgb: MASA, intensidad: 0.1, x: 50, y: 100, radio: 70 },
  },
  // La oferta: apetito, mediodía dorado. El color con decisión.
  calida: {
    luz: { rgb: CREMA, intensidad: 0.16, x: 72, y: 8, radio: 50 },
    color: { rgb: YEMA, intensidad: 0.19, x: 70, y: 22, radio: 72 },
    profundidad: { rgb: CORTEZA, intensidad: 0.08, x: 14, y: 74, radio: 68 },
  },
  // El corazón (aprendizaje): el horno encendido. El registro más cálido y hondo.
  corazon: {
    luz: { rgb: CREMA, intensidad: 0.16, x: 30, y: 30, radio: 44 },
    color: { rgb: CORTEZA, intensidad: 0.2, x: 34, y: 46, radio: 64 },
    profundidad: { rgb: EMBER, intensidad: 0.1, x: 82, y: 86, radio: 74 },
  },
  // La persona: íntima y serena, más fría que el corazón. Un respiro de otro registro.
  intima: {
    luz: { rgb: [250, 246, 240], intensidad: 0.14, x: 50, y: 38, radio: 60 },
    color: { rgb: PIEDRA, intensidad: 0.12, x: 50, y: 56, radio: 92 },
    profundidad: { rgb: MALVA, intensidad: 0.08, x: 74, y: 92, radio: 70 },
  },
  // El servicio: fresco, claro, profesional. El verde aparece con presencia.
  fresca: {
    luz: { rgb: [248, 250, 240], intensidad: 0.14, x: 72, y: 18, radio: 54 },
    color: { rgb: PEREJIL, intensidad: 0.14, x: 72, y: 30, radio: 72 },
    profundidad: { rgb: MUSGO, intensidad: 0.08, x: 18, y: 82, radio: 68 },
  },
  // La comunidad: calidez ANCHA que se reparte, mesa larga.
  compartir: {
    luz: { rgb: CREMA, intensidad: 0.15, x: 30, y: 54, radio: 55 },
    color: { rgb: YEMA, intensidad: 0.17, x: 28, y: 64, radio: 92 },
    profundidad: { rgb: CORTEZA, intensidad: 0.09, x: 82, y: 40, radio: 64 },
  },
  // La despedida: atardecer, el rescoldo. La luz baja y se posa.
  despedida: {
    luz: { rgb: [255, 242, 222], intensidad: 0.12, x: 50, y: 28, radio: 50 },
    color: { rgb: CORTEZA, intensidad: 0.16, x: 50, y: 82, radio: 88 },
    profundidad: { rgb: EMBER, intensidad: 0.1, x: 50, y: 100, radio: 72 },
  },
};

/** Atmósfera por defecto (sin JS o antes de calcular): la de la entrada. */
export const ATMOSFERA_DEFECTO = "bienvenida";

export function getAtmosfera(id: string | undefined): Atmosfera {
  return (id && ATMOSFERAS[id]) || ATMOSFERAS[ATMOSFERA_DEFECTO]!;
}

/* ------------------------------------------------------------------ */
/* Interpolación — el campo es continuo: todo se mezcla, sin cortes.   */
/* ------------------------------------------------------------------ */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const lerpRGB = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
];

function mezclarCapa(a: CapaAtmosfera, b: CapaAtmosfera, t: number): CapaAtmosfera {
  return {
    rgb: lerpRGB(a.rgb, b.rgb, t),
    intensidad: lerp(a.intensidad, b.intensidad, t),
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    radio: lerp(a.radio, b.radio, t),
  };
}

export function mezclar(a: Atmosfera, b: Atmosfera, t: number): Atmosfera {
  const k = Math.min(1, Math.max(0, t));
  return {
    luz: mezclarCapa(a.luz, b.luz, k),
    color: mezclarCapa(a.color, b.color, k),
    profundidad: mezclarCapa(a.profundidad, b.profundidad, k),
  };
}

const HARINA: RGB = [247, 242, 234];

/** Color del navbar/menú: Harina teñida por la luz y el color del momento (para que
 *  herede la atmósfera y se sienta parte del mismo universo). */
export function colorNavbar(atm: Atmosfera): RGB {
  const conLuz = lerpRGB(HARINA, atm.luz.rgb, atm.luz.intensidad * 0.5);
  return lerpRGB(conLuz, atm.color.rgb, atm.color.intensidad * 0.4);
}

const rgbStr = (c: RGB) => `${c[0]} ${c[1]} ${c[2]}`;

function escribirCapa(el: HTMLElement, nombre: string, c: CapaAtmosfera): void {
  el.style.setProperty(`--atm-${nombre}-rgb`, rgbStr(c.rgb));
  el.style.setProperty(`--atm-${nombre}-int`, c.intensidad.toFixed(3));
  el.style.setProperty(`--atm-${nombre}-x`, `${c.x.toFixed(1)}%`);
  el.style.setProperty(`--atm-${nombre}-y`, `${c.y.toFixed(1)}%`);
  el.style.setProperty(`--atm-${nombre}-radio`, `${c.radio.toFixed(1)}%`);
}

/** Escribe la atmósfera mezclada como variables CSS en un elemento (`:root`). */
export function escribirVars(el: HTMLElement, atm: Atmosfera): void {
  escribirCapa(el, "luz", atm.luz);
  escribirCapa(el, "color", atm.color);
  escribirCapa(el, "prof", atm.profundidad);
  el.style.setProperty("--atm-navbar-rgb", rgbStr(colorNavbar(atm)));
}
