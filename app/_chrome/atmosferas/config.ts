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

/* Paleta ampliada del universo gastronómico (Bloque 6.5): a los siete tonos base
   se suman tonos de luz y profundidad que dan a cada momento su TEMPERATURA propia
   —manteca, café, oliva, hierro, rescoldo—, para que el recorrido deje de vivir en
   un único crema. Se usa el color con más decisión donde construye emoción. */
const MASA: RGB = [237, 229, 216];
const PIEDRA: RGB = [107, 97, 86];
const YEMA: RGB = [232, 161, 58];
const CORTEZA: RGB = [180, 97, 31];
const PEREJIL: RGB = [78, 106, 60];
const MANTECA: RGB = [242, 214, 138]; // amarillo manteca, cálido y suave
const CHOCOLATE: RGB = [78, 48, 40]; // chocolate profundo (el horno / lo hondo)
const CAFE: RGB = [92, 62, 44]; // marrón café/madera, profundidad honda
const MADERA: RGB = [150, 108, 72]; // madera / tabla
const ESPECIA: RGB = [190, 98, 60]; // terracota / especias (páprika, canela)
const VINO: RGB = [122, 54, 60]; // atardecer, vino tinto tenue
const EMBER: RGB = [138, 60, 26]; // rescoldo del horno
const OLIVA: RGB = [120, 128, 78]; // verde oliva
const MUSGO: RGB = [48, 74, 52]; // verde hondo
const HIERRO_ATM: RGB = [74, 66, 58]; // gris cálido oscuro (piedra/hierro)
const LUZ_CALIDA: RGB = [255, 246, 228];
const LUZ_HORNO: RGB = [255, 224, 176];
const LUZ_FRESCA: RGB = [244, 249, 236];
const LUZ_NEUTRA: RGB = [247, 245, 242];

/**
 * Las atmósferas del recorrido, nombradas por su EMOCIÓN (no por la sección). Cada
 * una tiene una TEMPERATURA claramente distinta —manteca, oro, el horno de café,
 * lo íntimo en piedra fría, lo fresco en verde, la mesa dorada, el atardecer— y la
 * continuidad la garantiza la interpolación entre momentos. Intensidades con más
 * presencia (el contenido sigue de protagonista; `Hierro` legible).
 */
export const ATMOSFERAS: Record<string, Atmosfera> = {
  // Entrada: amanecer amantecado. Luz alta, aire suave que recibe.
  bienvenida: {
    luz: { rgb: LUZ_CALIDA, intensidad: 0.14, x: 50, y: 0, radio: 56 },
    color: { rgb: MANTECA, intensidad: 0.26, x: 52, y: 12, radio: 80 },
    profundidad: { rgb: MASA, intensidad: 0.14, x: 50, y: 100, radio: 70 },
  },
  // La oferta (ebooks/clases): apetito, ORO brillante que abraza el ancho.
  calida: {
    luz: { rgb: LUZ_CALIDA, intensidad: 0.12, x: 72, y: 8, radio: 50 },
    color: { rgb: YEMA, intensidad: 0.4, x: 66, y: 24, radio: 92 },
    profundidad: { rgb: CORTEZA, intensidad: 0.16, x: 14, y: 82, radio: 66 },
  },
  // El corazón (aprendizaje): el horno, CHOCOLATE y café. Lo más hondo; envuelve.
  corazon: {
    luz: { rgb: LUZ_HORNO, intensidad: 0.18, x: 32, y: 24, radio: 48 },
    color: { rgb: CHOCOLATE, intensidad: 0.36, x: 36, y: 48, radio: 88 },
    profundidad: { rgb: CAFE, intensidad: 0.22, x: 82, y: 92, radio: 78 },
  },
  // La persona: íntima y serena, PIEDRA fría. Más sutil, un respiro entre dos calores.
  intima: {
    luz: { rgb: LUZ_NEUTRA, intensidad: 0.13, x: 50, y: 34, radio: 64 },
    color: { rgb: PIEDRA, intensidad: 0.26, x: 50, y: 56, radio: 72 },
    profundidad: { rgb: HIERRO_ATM, intensidad: 0.14, x: 76, y: 96, radio: 68 },
  },
  // El servicio: fresco, VERDE de hierbas y oliva, con presencia ancha.
  fresca: {
    luz: { rgb: LUZ_FRESCA, intensidad: 0.12, x: 72, y: 14, radio: 56 },
    color: { rgb: PEREJIL, intensidad: 0.36, x: 68, y: 32, radio: 90 },
    profundidad: { rgb: MUSGO, intensidad: 0.2, x: 18, y: 88, radio: 72 },
  },
  // La comunidad: mesa compartida, TERRACOTA / especias. Cálida pero distinta del oro.
  compartir: {
    luz: { rgb: LUZ_CALIDA, intensidad: 0.13, x: 30, y: 52, radio: 56 },
    color: { rgb: ESPECIA, intensidad: 0.34, x: 30, y: 62, radio: 96 },
    profundidad: { rgb: MADERA, intensidad: 0.18, x: 82, y: 34, radio: 66 },
  },
  // La despedida: atardecer, VINO tenue y rescoldo. Hondo, distinto del chocolate.
  despedida: {
    luz: { rgb: LUZ_HORNO, intensidad: 0.12, x: 50, y: 22, radio: 52 },
    color: { rgb: VINO, intensidad: 0.3, x: 50, y: 80, radio: 90 },
    profundidad: { rgb: EMBER, intensidad: 0.2, x: 50, y: 100, radio: 76 },
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
