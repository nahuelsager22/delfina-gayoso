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
}

/* Las 7 habitaciones, por clave de `momento.atmosfera`. Cada una con un color dominante
   y su tinta. El recorrido es una secuencia de piezas editoriales: crema → oro → EL
   HORNO (chocolate) → piedra → EL VERDE (servicios) → la mesa (terracota) → EL ATARDECER
   (vino). Algunas claras (tinta oscura), otras profundas (tinta clara). */
export const SALAS: Record<string, Sala> = {
  // Entrada: crema amantecada, cálida y luminosa. Recibe.
  bienvenida: {
    bg: "radial-gradient(135% 100% at 50% 0%, #f7ecce 0%, #efdfb6 58%, #e9d6a8 100%)",
    ink: [42, 36, 30],
    inkSoft: [91, 82, 68],
    accent: [180, 97, 31],
    navBg: [239, 223, 182],
    oscura: false,
  },
  // La oferta (ebooks/clases): ORO pleno, apetito. El color como protagonista.
  calida: {
    bg: "radial-gradient(125% 105% at 70% 8%, #eeb64f 0%, #e7a63a 52%, #d9922b 100%)",
    ink: [42, 36, 30],
    inkSoft: [74, 49, 19],
    accent: [110, 47, 14],
    navBg: [231, 166, 58],
    oscura: false,
  },
  // El corazón (aprendizaje): EL HORNO. Chocolate profundo, inmersivo, tinta crema.
  corazon: {
    bg: "radial-gradient(125% 95% at 30% 12%, #4d352a 0%, #3d2a21 60%, #2f2019 100%)",
    ink: [245, 238, 223],
    inkSoft: [216, 198, 173],
    accent: [240, 178, 78],
    navBg: [61, 42, 33],
    oscura: true,
  },
  // La persona: PIEDRA cálida, íntima. Acá vive el rescoldo rojo de MasterChef.
  intima: {
    bg: "radial-gradient(125% 105% at 50% 16%, #ccbdad 0%, #c1b2a2 58%, #b1a191 100%)",
    ink: [36, 31, 25],
    inkSoft: [70, 61, 49],
    accent: [143, 47, 36],
    navBg: [193, 178, 162],
    oscura: false,
  },
  // El servicio: EL VERDE de marca (#39532A), forestal, pleno, tinta crema.
  fresca: {
    bg: "radial-gradient(125% 95% at 68% 14%, #3a6a34 0%, #2f5a2c 58%, #24491f 100%)",
    ink: [243, 240, 226],
    inkSoft: [205, 214, 182],
    accent: [242, 200, 110],
    navBg: [47, 90, 44],
    oscura: true,
  },
  // La comunidad: la MESA, terracota / especias. Cálida y saturada, tinta crema.
  compartir: {
    bg: "radial-gradient(125% 105% at 28% 16%, #b85631 0%, #a6482a 58%, #8f3c22 100%)",
    ink: [251, 238, 224],
    inkSoft: [247, 222, 201],
    accent: [255, 216, 154],
    navBg: [166, 72, 42],
    oscura: true,
  },
  // La despedida: EL ATARDECER, vino y rescoldo. Profundo, cierra, tinta crema.
  despedida: {
    bg: "radial-gradient(125% 105% at 50% 10%, #7a2637 0%, #5f1e2c 56%, #471620 100%)",
    ink: [246, 233, 224],
    inkSoft: [224, 185, 179],
    accent: [240, 176, 84],
    navBg: [95, 30, 44],
    oscura: true,
  },
};

export const SALA_DEFECTO = "bienvenida";

export function getSala(id: string | undefined): Sala {
  return (id && SALAS[id]) || SALAS[SALA_DEFECTO]!;
}

const rgbStr = (c: RGB) => `${c[0]} ${c[1]} ${c[2]}`;

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
