import { BASE } from "./variantes";

/**
 * LAS ONDAS SE DECORAN (Bloque 12). Es la capa que más lejos llega con menos: el corte vive
 * en `Banda`, así que decorarlo una vez lo lleva a todas las páginas.
 *
 * CÓMO ESTÁ DIBUJADA, Y POR QUÉ. La primera versión tenía cada lamparita como un elemento con
 * dos pseudoelementos: 140 por página, y el perfil en mobile mostró que era lo que más costaba
 * (de 32 a 22 fps con la CPU estrangulada; el cable y las animaciones casi no pesaban). Ahora
 * todas las lamparitas de una onda son UN solo SVG, con un trazado fusionado por color: se ven
 * iguales y son menos de 30 elementos.
 *
 * Para no deformarlas, el SVG no se estira como el de la onda: la edición le da a la onda una
 * altura proporcional al ancho (ver `.onda-sup` en `navidad.css`), una por formato, y la
 * geometría se calcula para esa misma proporción. Cero JavaScript en el navegador: esto es
 * HTML y CSS, y `CapasEdicion` sólo avisa cuándo prender.
 */
type P = readonly [number, number];
const TRAMOS: readonly (readonly [P, P, P, P])[] = [
  [[0, 58], [170, 18], [360, 18], [600, 52]],
  [[600, 52], [840, 86], [1030, 86], [1200, 48]],
];

const bez = (a: number, b: number, c: number, d: number, t: number) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};

/** La altura de la curva en una `x` dada (0–100). Es monótona en x: alcanza con bisección. */
function yEn(x: number): number {
  const [p0, p1, p2, p3] = x <= 600 ? TRAMOS[0]! : TRAMOS[1]!;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const t = (lo + hi) / 2;
    if (bez(p0[0], p1[0], p2[0], p3[0], t) < x) lo = t;
    else hi = t;
  }
  const t = (lo + hi) / 2;
  return bez(p0[1], p1[1], p2[1], p3[1], t);
}

const n = (v: number) => Math.round(v * 10) / 10;

/** Un foco: la ampolla, en un solo subtrazado, colgando de (x, y). */
const ampolla = (x: number, y: number, r: number) =>
  `M${n(x - r)} ${n(y + r)}a${n(r)} ${n(r)} 0 0 1 ${n(2 * r)} 0c0 ${n(r * 1.15)}-${n(r * 0.55)} ${n(r * 1.75)}-${n(r)} ${n(r * 1.75)}s-${n(r)}-${n(r * 0.6)}-${n(r)}-${n(r * 1.75)}z`;
const casquillo = (x: number, y: number, r: number) =>
  `M${n(x - r * 0.5)} ${n(y - r * 0.15)}h${n(r)}v${n(r * 0.5)}h-${n(r)}z`;
const halo = (x: number, y: number, r: number) =>
  `M${n(x - r)} ${n(y)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0-${n(2 * r)} 0z`;

interface Geometria {
  alto: number;
  cable: string;
  apagadas: string;
  casquillos: string;
  /** Una por color de foco. */
  color: readonly string[];
  halos: readonly string[];
}

function armar(
  alto: number,
  cable: string,
  focos: readonly (readonly [number, number])[],
  r: number,
): Geometria {
  const color = ["", "", "", ""];
  const halos = ["", "", "", ""];
  let apagadas = "";
  let casquillos = "";
  focos.forEach(([x, y], i) => {
    const a = ampolla(x, y, r);
    color[i % 4] += a;
    halos[i % 4] += halo(x, y + r * 1.4, r * 1.7);
    apagadas += a;
    casquillos += casquillo(x, y, r);
  });
  return { alto, cable, apagadas, casquillos, color, halos };
}

/**
 * Proporción alto/ancho de la onda en cada formato. Tienen que coincidir con `.onda-sup` en
 * `navidad.css`: 5,5vw en pantalla ancha, 9,7vw en un celular.
 */
const ALTO_ANCHO = 66;
const ALTO_MOVIL = 116.4;

function geometriaOnda(alto: number, spanes: number, r: number): Geometria {
  const esc = alto / 100;
  // Tercera pasada: la comba bajó a la mitad. Con 15 el cable colgaba muy por debajo del filo y
  // la guirnalda se volvía una franja propia; con 7 acompaña la onda.
  const comba = 7 * esc;
  let cable = "";
  const focos: [number, number][] = [];
  for (let i = 0; i < spanes; i++) {
    const x0 = (i * 1200) / spanes;
    const x1 = ((i + 1) * 1200) / spanes;
    const y0 = yEn(x0) * esc;
    const y1 = yEn(x1) * esc;
    const xm = (x0 + x1) / 2;
    const ym = (y0 + y1) / 2;
    cable += `${i === 0 ? `M${x0} ${n(y0)}` : ""}Q${xm} ${n(ym + comba * 2)} ${x1} ${n(y1)}`;
    focos.push([xm, ym + comba]);
  }
  return armar(alto, cable, focos, r);
}

/* Tercera pasada: focos de un 60 % del tamaño anterior y más juntos. Una guirnalda fina de
   lamparitas chicas se lee como parte de la onda; diez focos grandes se leían como un adorno
   puesto encima. En 1440 cada foco mide unos 9px de ancho; en 390, unos 6px. */
const ONDAS = {
  ancho: geometriaOnda(ALTO_ANCHO, 28, 3.7),
  movil: geometriaOnda(ALTO_MOVIL, 13, 8.6),
};

/** Las capas de una guirnalda, ya en SVG. El barrido de encendido y el titilar son CSS. */
function Capas({ g, clase }: { g: Geometria; clase: string }) {
  const caja = `0 0 1200 ${g.alto}`;
  const atributos = {
    viewBox: caja,
    preserveAspectRatio: "none",
    "aria-hidden": true,
    focusable: false,
  } as const;
  return (
    <div className={`guirnalda-capas ${clase}`}>
      <svg {...atributos} className="g-base">
        <path className="cable" d={g.cable} vectorEffect="non-scaling-stroke" />
        <path className="foco-apagado" d={g.apagadas} />
      </svg>
      {/* Dos grupos de halos a contratiempo: titilan por grupo, no por lamparita. */}
      <svg {...atributos} className="g-halos g-halos-a">
        <path className="c0" d={g.halos[0]} />
        <path className="c2" d={g.halos[2]} />
      </svg>
      <svg {...atributos} className="g-halos g-halos-b">
        <path className="c1" d={g.halos[1]} />
        <path className="c3" d={g.halos[3]} />
      </svg>
      <svg {...atributos} className="g-prendidas">
        <path className="c0" d={g.color[0]} />
        <path className="c1" d={g.color[1]} />
        <path className="c2" d={g.color[2]} />
        <path className="c3" d={g.color[3]} />
        <path className="casquillo" d={g.casquillos} />
      </svg>
    </div>
  );
}

/* Las alternativas de onda. En desarrollo y en el deployment de exploración se dibujan las tres
   para compararlas en vivo; en cualquier otro build sólo la de `BASE`: no se paga por lo que no
   se ve. */
const COMPARAR =
  process.env.NODE_ENV === "development" || process.env.EDICION_NAVIDAD_EXPLORAR === "1";
const CON_PINO = COMPARAR || BASE.onda === "pino";
const CON_CINTA = COMPARAR || BASE.onda === "cinta";

/** Azar con semilla: el servidor tiene que dibujar siempre la misma guirnalda. */
const semilla = (i: number) => {
  const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
};

/**
 * LA GUIRNALDA DE PINO. Agujas en dos verdes que salen hacia los dos lados del tallo, bayas
 * rojas en racimos y lucecitas cálidas entre las ramas. Todo en tres o cuatro trazados por onda.
 */
interface Pino {
  alto: number;
  tallo: string;
  oscuras: string;
  claras: string;
  bayas: string;
  luz: string;
  halo: string;
  grosor: number;
}

function geometriaPino(alto: number, paso: number, largo: number, grosor: number, r: number): Pino {
  const esc = alto / 100;
  let tallo = "";
  let oscuras = "";
  let claras = "";
  let bayas = "";
  let luz = "";
  let halo = "";
  let k = 0;
  for (let x = 0; x <= 1200; x += paso, k++) {
    const y = yEn(x) * esc;
    const tan = Math.atan2((yEn(Math.min(1200, x + 6)) - yEn(Math.max(0, x - 6))) * esc, 12);
    tallo += `${k === 0 ? "M" : "L"}${n(x)} ${n(y)}`;
    for (let j = 0; j < 4; j++) {
      const lado = j % 2 ? 1 : -1;
      const ang = tan + Math.PI + lado * (0.75 + semilla(k * 4 + j) * 0.55);
      const l = largo * (0.7 + semilla(k * 9 + j) * 0.45);
      const x0 = x + Math.cos(tan) * (semilla(k + j) - 0.5) * paso;
      const y0 = y + Math.sin(tan) * (semilla(k + j) - 0.5) * paso;
      const seg = `M${n(x0)} ${n(y0)}l${n(Math.cos(ang) * l)} ${n(Math.sin(ang) * l)}`;
      if (j < 2) oscuras += seg;
      else claras += seg;
    }
    if (k % 9 === 4) {
      for (let b = 0; b < 3; b++) {
        const bx = x + (b - 1) * r * 1.7;
        const by = y + (b === 1 ? r * 1.4 : r * 0.3) + r * 0.6;
        bayas += `M${n(bx - r)} ${n(by)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0-${n(2 * r)} 0z`;
      }
    } else if (k % 9 === 0 || k % 9 === 7) {
      const lx = x;
      const ly = y + r * (semilla(k) > 0.5 ? 1.2 : -0.9);
      const lr = r * 0.62;
      luz += `M${n(lx - lr)} ${n(ly)}a${n(lr)} ${n(lr)} 0 1 0 ${n(2 * lr)} 0a${n(lr)} ${n(lr)} 0 1 0-${n(2 * lr)} 0z`;
      const hr = r * 2.2;
      halo += `M${n(lx - hr)} ${n(ly)}a${n(hr)} ${n(hr)} 0 1 0 ${n(2 * hr)} 0a${n(hr)} ${n(hr)} 0 1 0-${n(2 * hr)} 0z`;
    }
  }
  return { alto, tallo, oscuras, claras, bayas, luz, halo, grosor };
}

function CapasPino({ g, clase }: { g: Pino; clase: string }) {
  const atributos = { viewBox: `0 0 1200 ${g.alto}`, preserveAspectRatio: "none", "aria-hidden": true, focusable: false } as const;
  return (
    <div className={`guirnalda-capas guirnalda-pino ${clase}`}>
      <svg {...atributos} className="g-base">
        <path className="pino-tallo" d={g.tallo} strokeWidth={g.grosor * 1.6} />
        <path className="pino-oscuro" d={g.oscuras} strokeWidth={g.grosor} />
        <path className="pino-claro" d={g.claras} strokeWidth={g.grosor * 0.9} />
        <path className="pino-baya" d={g.bayas} />
      </svg>
      <svg {...atributos} className="g-halos g-halos-a">
        <path className="c0" d={g.halo} />
      </svg>
      <svg {...atributos} className="g-prendidas">
        <path className="pino-luz" d={g.luz} />
      </svg>
    </div>
  );
}

/**
 * LA CINTA. Satén con su brillo y su sombra, una puntada al medio y un moño. El moño cambia de
 * lugar en cada sala —izquierda, centro, derecha, según la sala—: bajando, el recorrido se lee
 * como una caja que se va envolviendo, que es la manera en que la cinta conecta las salas.
 */
interface Cinta {
  alto: number;
  curva: string;
  ancho: number;
  puntada: string;
  escMono: number;
}

function geometriaCinta(alto: number, ancho: number, escMono: number, puntada: string): Cinta {
  const esc = alto / 100;
  let curva = "";
  for (let x = 0, k = 0; x <= 1200; x += 12, k++) curva += `${k === 0 ? "M" : "L"}${x} ${n(yEn(x) * esc)}`;
  return { alto, curva, ancho, puntada, escMono };
}

function CapasCinta({ g, clase, lugar }: { g: Cinta; clase: string; lugar: number }) {
  const atributos = { viewBox: `0 0 1200 ${g.alto}`, preserveAspectRatio: "none", "aria-hidden": true, focusable: false } as const;
  const x = 1200 * lugar;
  const esc = g.alto / 100;
  const y = yEn(x) * esc;
  const giro = (Math.atan2((yEn(Math.min(1200, x + 6)) - yEn(Math.max(0, x - 6))) * esc, 12) * 180) / Math.PI;
  return (
    <div className={`guirnalda-capas guirnalda-cinta ${clase}`}>
      <svg {...atributos} className="g-base">
        <path className="cinta-sombra" d={g.curva} strokeWidth={g.ancho * 1.12} transform={`translate(0 ${n(g.ancho * 0.18)})`} />
        <path className="cinta" d={g.curva} strokeWidth={g.ancho} />
        <path className="cinta-brillo" d={g.curva} strokeWidth={g.ancho * 0.3} transform={`translate(0 ${n(-g.ancho * 0.2)})`} />
        <path className="cinta-puntada" d={g.curva} strokeWidth={g.ancho * 0.1} strokeDasharray={g.puntada} />
        <g transform={`translate(${n(x)} ${n(y)}) rotate(${n(giro)}) scale(${g.escMono})`} className="mono">
          <path className="mono-cola" d="M-4 2 L-17 30 L-10 27 L-7 34 L2 6 Z" />
          <path className="mono-cola" d="M4 2 L17 30 L10 27 L7 34 L-2 6 Z" />
          <path className="mono-lazo" d="M0 0 C-12 -24 -38 -24 -34 -6 C-31 8 -12 7 0 0 Z" />
          <path className="mono-lazo" d="M0 0 C12 -24 38 -24 34 -6 C31 8 12 7 0 0 Z" />
          <path className="mono-pliegue" d="M-6 -3 C-14 -12 -24 -14 -27 -8 M6 -3 C14 -12 24 -14 27 -8" />
          <rect className="mono-nudo" x="-7" y="-7" width="14" height="13" rx="4" />
        </g>
      </svg>
    </div>
  );
}

const PINOS = CON_PINO
  ? { ancho: geometriaPino(ALTO_ANCHO, 9, 15, 2.2, 4.4), movil: geometriaPino(ALTO_MOVIL, 20, 38, 5, 11) }
  : null;
const CINTAS = CON_CINTA
  ? { ancho: geometriaCinta(ALTO_ANCHO, 11, 1, "6 6"), movil: geometriaCinta(ALTO_MOVIL, 30, 2.6, "16 16") }
  : null;

/** Dónde va el moño en cada sala: sale del nombre, así cada sala tiene siempre el mismo. */
const lugarDelMono = (sala: string) => {
  let h = 0;
  for (const c of sala) h = (h * 31 + c.charCodeAt(0)) % 997;
  return [0.2, 0.5, 0.8][h % 3]!;
};

export function OndaNavidad({ color = "var(--atm-papel)", sala = "" }: { color?: string; sala?: string }) {
  const mono = lugarDelMono(sala);
  return (
    <>
      <svg
        className="onda-sup"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        aria-hidden
        focusable="false"
      >
        <path
          d="M0,58 C 170,18 360,18 600,52 C 840,86 1030,86 1200,48 L1200,106 L0,106 Z"
          fill={color}
        />
      </svg>

      <div className="guirnalda" data-luces aria-hidden>
        {(COMPARAR || BASE.onda === "luces") && (
          <div className="onda-luces">
            <Capas g={ONDAS.ancho} clase="solo-ancho" />
            <Capas g={ONDAS.movil} clase="solo-movil" />
          </div>
        )}
        {PINOS && (
          <div className="onda-pino">
            <CapasPino g={PINOS.ancho} clase="solo-ancho" />
            <CapasPino g={PINOS.movil} clase="solo-movil" />
          </div>
        )}
        {CINTAS && (
          <div className="onda-cinta">
            <CapasCinta g={CINTAS.ancho} clase="solo-ancho" lugar={mono} />
            <CapasCinta g={CINTAS.movil} clase="solo-movil" lugar={mono} />
          </div>
        )}
      </div>
    </>
  );
}

/**
 * LA GUIRNALDA COLGADA de la primera pantalla: de borde a borde, en tres combas por debajo del
 * navbar. Su caja también es proporcional al ancho (7,5vw y 13vw), con su propia geometría.
 */
function geometriaColgada(alto: number, combas: number, porComba: number, r: number): Geometria {
  let cable = "";
  const focos: [number, number][] = [];
  // La comba llega a dos tercios de la caja, no a toda: la guirnalda queda arriba, cerca del
  // navbar, y no se mete en el título.
  const hondo = alto * 1.35;
  for (let c = 0; c < combas; c++) {
    const x0 = (c * 1200) / combas;
    const x1 = ((c + 1) * 1200) / combas;
    cable += `${c === 0 ? `M${x0} 0` : ""}Q${(x0 + x1) / 2} ${hondo} ${x1} 0`;
    for (let j = 1; j <= porComba; j++) {
      const t = j / (porComba + 1);
      focos.push([x0 + (x1 - x0) * t, 2 * (1 - t) * t * hondo]);
    }
  }
  return armar(alto, cable, focos, r);
}

const COLGADAS = {
  ancho: geometriaColgada(90, 3, 9, 4),
  movil: geometriaColgada(156, 3, 5, 9),
};

export function GuirnaldaColgada() {
  return (
    <div className="guirnalda guirnalda--colgada" data-luces aria-hidden>
      <Capas g={COLGADAS.ancho} clase="solo-ancho" />
      <Capas g={COLGADAS.movil} clase="solo-movil" />
    </div>
  );
}
