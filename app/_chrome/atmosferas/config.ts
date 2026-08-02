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

/**
 * LOS SEIS PIGMENTOS DEL MANUAL — punto ÚNICO donde vive cada color (22ª ola).
 * -----------------------------------------------------------------------------
 * Antes cada sala repetía su color tres veces a mano (`bg` en hex, `solido` en hex y
 * `navBg` en RGB): cambiar un color obligaba a acertar en los tres. Ahora se declara
 * una sola vez acá y las salas lo referencian. Cambiar la arena de todo el sitio =
 * cambiar una línea de este objeto.
 *
 * El crema también existe en `app/globals.css` como `--color-harina` (fondo de página);
 * son el mismo color y se mantienen en sincronía a mano —son los dos únicos lugares—.
 */
export const PIGMENTOS = {
  crema: { hex: "#F3EEE4", rgb: [243, 238, 228] as RGB },
  salvia: { hex: "#B1BFAA", rgb: [177, 191, 170] as RGB },
  arena: { hex: "#DBC9A0", rgb: [219, 201, 160] as RGB },
  verde: { hex: "#2C4027", rgb: [44, 64, 39] as RGB },
  marron: { hex: "#413223", rgb: [65, 50, 35] as RGB },
  /**
   * ACENTO del sistema (líneas, sellos, nodos, subrayados). NUNCA fondo de sección.
   * La 24ª ola probó llevarlo a fondo —un ladrillo hondo para Marcas— y Delfina lo
   * descartó al verlo montado: como color protagonista de una banda entera se lee
   * clásico, y el sitio no lo es. La regla vuelve a su forma original y queda cerrada:
   * el terracota aporta personalidad en el detalle, no domina la composición.
   */
  terracota: { hex: "#9D301D", rgb: [157, 48, 29] as RGB },
  /**
   * PIEDRA CÁLIDA (24ª ola, dirección de Delfina) — el fondo de Marcas.
   * No es un color traído de afuera: es exactamente CREMA + 16% MARRÓN, los dos
   * extremos del recorrido mezclados. Por eso pertenece sin esfuerzo —es el papel de la
   * casa con algo de la madera del cierre— y por eso funciona donde el manual no tenía
   * nada: un tono natural y contemporáneo que no es ni el crema del Umbral ni el
   * dorado de la arena, y sobre el que el acento terracota vuelve a leerse (4.8:1).
   */
  piedra: { hex: "#D8D0C5", rgb: [216, 208, 197] as RGB },
} as const;

export const SALAS: Record<string, Sala> = {
  // El umbral (propuesta de valor): CREMA, sin banda. El aire de la casa: el fondo se
  // corre para que el plato sea lo único que tiene color.
  bienvenida: {
    bg: PIGMENTOS.crema.hex,
    solido: PIGMENTOS.crema.hex,
    ink: [42, 36, 30],
    inkSoft: [63, 55, 45],
    accent: [107, 74, 31],
    navBg: PIGMENTOS.crema.rgb,
    oscura: false,
    banda: false,
  },
  // Quién soy (bienvenida breve): SALVIA clara del manual. Banda cálida, tinta oscura.
  "quien-soy": {
    bg: PIGMENTOS.salvia.hex,
    solido: PIGMENTOS.salvia.hex,
    ink: [38, 44, 34],
    inkSoft: [64, 74, 58],
    accent: [44, 64, 39],
    navBg: PIGMENTOS.salvia.rgb,
    oscura: false,
    banda: true,
  },
  // Lo que te llevás (ebooks + clases): ARENA cálida. Banda clara, tinta oscura.
  calida: {
    bg: PIGMENTOS.arena.hex,
    solido: PIGMENTOS.arena.hex,
    ink: [42, 36, 30],
    inkSoft: [72, 62, 46],
    accent: [107, 74, 31],
    navBg: PIGMENTOS.arena.rgb,
    oscura: false,
    banda: true,
  },
  /* Marcas con las que colaboro: PIEDRA CÁLIDA (24ª ola, dirección de Delfina).
     -------------------------------------------------------------------------------
     Esta sala buscó su color durante cuatro olas —crema, arena, marrón, ladrillo—
     porque su ROL cambió: dejó de ser una sección de respiro y pasó a ser la BISAGRA
     del recorrido, donde el sitio deja de hablar de Delfina y empieza a hablar de su
     trabajo. Las tres primeras chocaban con una vecina (el crema del Umbral arriba, la
     arena de "Lo que te llevás", el marrón del cierre); el ladrillo no chocaba con
     ninguna, pero como protagonista de una banda entera se leía clásico.
     La piedra resuelve las dos cosas a la vez y por una razón simple: es el ÚNICO tono
     de la familia que no está tomado por nadie, porque no estaba en el manual —está
     ENTRE dos de sus tintas—. Corta contra el crema de arriba (1.32:1 más un cambio de
     temperatura), es luminosa, y devuelve la sección a tinta oscura, que es como se lee
     un espacio de trabajo.
     El acento vuelve a ser TERRACOTA, que es donde debía estar: sobre la piedra lee a
     4.8:1 y aporta personalidad sin dominar nada. */
  marcas: {
    bg: PIGMENTOS.piedra.hex,
    solido: PIGMENTOS.piedra.hex,
    ink: [42, 36, 30],
    inkSoft: [70, 62, 53],
    accent: PIGMENTOS.terracota.rgb,
    navBg: PIGMENTOS.piedra.rgb,
    oscura: false,
    banda: true,
  },
  /* Página /colaboraciones: CREMA con acento terracota — lo que era la sala `marcas`
     antes de la 23ª ola. Se separó cuando Marcas pasó a marrón, y no por prolijidad: en
     la página los logotipos van SUELTOS dentro de cada ficha, no sobre la cinta salvia,
     y sobre un fondo hondo el de 3 Claveles (tipografía negra) desaparecería. Además es
     la superficie de lectura larga del sitio —cuatro historias con foto y resultados—,
     que pide papel claro. La sección es un capítulo del recorrido; la página, un lugar
     donde uno se queda a leer. */
  colaboraciones: {
    bg: PIGMENTOS.crema.hex,
    solido: PIGMENTOS.crema.hex,
    ink: [42, 36, 30],
    inkSoft: [63, 55, 45],
    accent: PIGMENTOS.terracota.rgb,
    navBg: PIGMENTOS.crema.rgb,
    oscura: false,
    banda: false,
  },
  // Trabajemos juntos (servicios): VERDE BOSQUE del manual (#2C4027). Banda profunda.
  fresca: {
    bg: PIGMENTOS.verde.hex,
    solido: PIGMENTOS.verde.hex,
    ink: [244, 240, 228],
    inkSoft: [206, 214, 196],
    accent: [201, 168, 106],
    navBg: PIGMENTOS.verde.rgb,
    oscura: true,
    banda: true,
  },
  // La clase no termina (cierre): MARRÓN profundo del manual (#413223). 10ª ola: se
  // retira el terracota como fondo (queda para acentos); el marrón cierra cálido y hondo
  // sin repetir el verde de servicios. Acento ARENA para los detalles (lee sobre marrón).
  despedida: {
    bg: PIGMENTOS.marron.hex,
    solido: PIGMENTOS.marron.hex,
    ink: [246, 239, 228],
    inkSoft: [214, 205, 190],
    accent: PIGMENTOS.arena.rgb,
    navBg: PIGMENTOS.marron.rgb,
    oscura: true,
    banda: true,
  },

  /* Página /la-mesa: CREMA, el papel de la casa (28ª ola).
     -------------------------------------------------------------------------------
     Es la única sala elegida por SUSTRACCIÓN: acá el contenido son 23 fotografías con
     sus propios colores —violeta de la masa, verde del invernadero, dorado de las
     medialunas—, y cualquier fondo con carácter competiría con todas a la vez. El crema
     es el papel sobre el que se apoyan; que no se note es exactamente su trabajo.
     El acento va en TERRACOTA porque los recursos gráficos de la mesa (la espiga, el
     hilo del repasador, la escritura de fondo) tienen que leerse sin pelearle a la
     fotografía: una línea de acento cálido a baja opacidad hace justo eso. */
  mesa: {
    bg: PIGMENTOS.crema.hex,
    solido: PIGMENTOS.crema.hex,
    ink: [42, 36, 30],
    inkSoft: [63, 55, 45],
    accent: PIGMENTOS.terracota.rgb,
    navBg: PIGMENTOS.crema.rgb,
    oscura: false,
    banda: false,
  },

  /* Banda "Por dentro" de /experiencias: SALVIA del manual. Es la misma salvia de
     "Quién soy" y no es casualidad: las dos hablan de ella entre gente. Sobre este verde
     apagado las fotos de clase —mucha madera, mucho glasé de color— se leen cálidas sin
     competir. (27ª ola: la sala existía desde la 18ª pero había quedado dentro del bloque
     de archivadas y con el hex escrito a mano; ahora referencia el pigmento, como el
     resto.) */
  compartir: {
    bg: PIGMENTOS.salvia.hex,
    solido: PIGMENTOS.salvia.hex,
    ink: [38, 44, 34],
    inkSoft: [64, 74, 58],
    accent: [44, 64, 39],
    navBg: PIGMENTOS.salvia.rgb,
    oscura: false,
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

/** Variables de tinta de una sala, para fijar en el `<section>` (las hereda el contenido).
 *
 *  `--atm-papel` (27ª ola) es el color SÓLIDO de la sala expuesto como variable. Existe
 *  para lo que necesita pintar el papel de la habitación en vez de heredarlo: un
 *  paspartú, o el borde de una pieza que se monta sobre otra y tiene que recortarse
 *  contra ella. Es `solido` y no `bg` a propósito —`bg` puede ser una expresión CSS—. */
export function estiloSala(sala: Sala): Record<string, string> {
  return {
    background: sala.bg,
    color: `rgb(${rgbStr(sala.ink)})`,
    "--atm-ink": rgbStr(sala.ink),
    "--atm-ink-soft": rgbStr(sala.inkSoft),
    "--atm-accent": rgbStr(sala.accent),
    "--atm-papel": sala.solido,
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
