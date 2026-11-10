import type { CSSProperties } from "react";
import { BudinGorro, Sticker, type NombreSticker } from "./Sticker";
import { GuirnaldaColgada } from "./OndaNavidad";

/**
 * LAS CAPAS DE TEMPORADA DE CADA SALA (Bloque 12). Se montan desde `Banda`, igual que la
 * onda, así que ninguna sección tiene que saber que es Navidad. Cada sala declara qué tiene
 * pegado y dónde: como en La mesa, el lugar viene de una partitura y no del azar, para que el
 * servidor y el cliente dibujen lo mismo.
 *
 * DÓNDE SE PEGAN (cuarta pasada). Un sticker se ve entero o no se pega: nunca cortado por el
 * borde de la pantalla. Medido, en un celular los márgenes laterales son de 31px y el texto
 * ocupa todo el ancho; lo que toda sala sí tiene es AIRE arriba y abajo (de 98 a 160px en 390,
 * de 107 a 430px en desktop). Por eso cada sticker vive en una ESQUINA de ese aire —arriba o
 * abajo, izquierda o derecha—, nunca en el costado, y la regla es la misma en todos los anchos:
 *  · `arriba`: a unos 14–36px del filo de la sala, encima del rótulo.
 *  · `abajo`: justo por encima de la onda de la sala siguiente, que no lo tapa.
 *  · Siempre a 12–32px del borde de la pantalla, así que ni su reacción ni los destellos de
 *    un toque se salen del cuadro.
 *  · En un celular todos miden 62px: entran en el aire más chico con margen.
 * La primera sala de una página (La mesa, Experiencias, Colaboraciones) tiene el navbar encima
 * de su aire superior, así que ahí van abajo.
 */
type Borde = "arriba" | "abajo";
interface Pegado {
  s: NombreSticker;
  borde: Borde;
  lado: "izq" | "der";
  /** Tamaño fluido en tablet y desktop; en un celular, 62px. */
  t: string;
  /** Inclinación, en grados. */
  g: number;
  /** Sólo desde 761px: donde en un celular no queda lugar entero para él. */
  soloAncho?: boolean;
  /** Distancia propia desde el filo (sólo `arriba`), si la general no sirve. */
  y?: string;
  /** Desde 1100px, un lugar propio fuera del aire: donde la sala tiene una zona libre al lado
   *  del texto (la banda navideña, a la derecha del título). `x` se mide desde `lado`. */
  ancho?: { y: string; x: string; lado: "izq" | "der" };
}

const ESCENAS: Record<string, readonly Pegado[]> = {
  // "Hola" ocupa toda la pantalla y su aire de arriba es el del navbar y la guirnalda: el acebo
  // va debajo de los dos, y en un celular no entra (ahí el sticker de "Hola" es el sello).
  "quien-soy": [
    { s: "acebo", borde: "arriba", lado: "der", t: "clamp(84px, 8vw, 116px)", g: 14, soloAncho: true, y: "calc(var(--navbar-h) + 2vw)" },
  ],
  navidad: [
    // En pantalla ancha la mitad derecha de la banda, al lado del título, está vacía: ahí van
    // los dos, y no en el aire de arriba, que al leer queda bajo el navbar.
    { s: "estrella", borde: "arriba", lado: "der", t: "clamp(64px, 7vw, 116px)", g: 12, ancho: { y: "8vw", x: "9%", lado: "der" } },
    { s: "baston", borde: "arriba", lado: "izq", t: "clamp(64px, 6vw, 92px)", g: -18, ancho: { y: "25vw", x: "30%", lado: "der" } },
  ],
  umbral: [
    { s: "masita", borde: "abajo", lado: "izq", t: "clamp(64px, 8vw, 120px)", g: -12 },
    { s: "manga", borde: "abajo", lado: "der", t: "clamp(64px, 8vw, 120px)", g: 8 },
  ],
  marcas: [{ s: "regalo", borde: "arriba", lado: "der", t: "clamp(62px, 7vw, 110px)", g: 10 }],
  "trabajemos-juntos": [
    { s: "acebo", borde: "arriba", lado: "der", t: "clamp(62px, 7.5vw, 118px)", g: -8 },
    { s: "galleta", borde: "abajo", lado: "der", t: "clamp(62px, 8vw, 116px)", g: 12 },
  ],
  "lo-que-te-llevas": [
    { s: "casita", borde: "arriba", lado: "der", t: "clamp(62px, 7.5vw, 120px)", g: 7 },
    { s: "arbolito", borde: "arriba", lado: "izq", t: "clamp(62px, 6.5vw, 104px)", g: -9 },
  ],
  "la-clase-no-termina": [],
  // Páginas internas: la edición las atraviesa con menos, para no tapar lo que se lee.
  "la-mesa": [
    { s: "estrella", borde: "abajo", lado: "der", t: "clamp(62px, 7vw, 104px)", g: 10 },
    { s: "galleta", borde: "abajo", lado: "izq", t: "clamp(62px, 7vw, 104px)", g: -14 },
  ],
  experiencias: [{ s: "manga", borde: "abajo", lado: "der", t: "clamp(62px, 7vw, 104px)", g: 8 }],
  colaboraciones: [{ s: "regalo", borde: "abajo", lado: "der", t: "clamp(62px, 7vw, 104px)", g: 8 }],
};

function Cielo() {
  // Estrellas fijas de la partitura, no del azar. Sólo algunas titilan.
  const puntos: readonly (readonly [number, number, number])[] = [
    [6, 12, 2], [14, 30, 1.4], [22, 8, 1.6], [31, 22, 2.4], [38, 6, 1.4], [46, 18, 1.6],
    [55, 9, 2], [63, 27, 1.4], [71, 7, 1.8], [79, 20, 2.6], [87, 11, 1.4], [94, 28, 1.8],
    [9, 44, 1.4], [27, 52, 1.6], [58, 46, 1.4], [84, 48, 2], [96, 56, 1.4], [42, 40, 1.8],
  ];
  return (
    <div className="cielo" aria-hidden>
      {puntos.map(([x, y, r], i) => (
        <span
          key={i}
          className="cielo-estrella"
          data-titila={i % 3 === 0 ? "" : undefined}
          style={{ left: `${x}%`, top: `${y}%`, width: r * 2, height: r * 2, "--i": i } as CSSProperties}
        />
      ))}
    </div>
  );
}

/** El barrio de noche: casitas de galletita en el piso del cierre, que prenden sus ventanas
 *  cuando se llega. Ocupa la izquierda para dejarle la esquina libre a la firma (D15). */
function Barrio() {
  const casas = [
    { x: 0, a: 92, h: 58 }, { x: 96, a: 74, h: 84 }, { x: 174, a: 104, h: 50 },
    { x: 282, a: 80, h: 72 }, { x: 366, a: 92, h: 44 },
  ];
  return (
    <svg className="barrio" data-luces viewBox="0 0 470 150" preserveAspectRatio="xMidYMax meet" aria-hidden focusable="false">
      {casas.map((c, i) => {
        const base = 150 - c.h;
        return (
          <g key={i}>
            <path
              d={`M${c.x} 150 V${base} L${c.x + c.a / 2} ${base - 34} L${c.x + c.a} ${base} V150 Z`}
              fill="#06121D"
            />
            <path
              d={`M${c.x + 2} ${base} q${c.a / 8} 7 ${c.a / 4} 0 q${c.a / 8} 7 ${c.a / 4} 0 q${c.a / 8} 7 ${c.a / 4} 0 q${c.a / 8} 7 ${c.a / 4 - 4} 0`}
              fill="none"
              stroke="#FFF6E6"
              strokeOpacity=".75"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <rect className="ventana" style={{ "--i": i * 2 } as CSSProperties} x={c.x + c.a * 0.2} y={base + 14} width="13" height="15" rx="2" />
            <rect className="ventana" style={{ "--i": i * 2 + 1 } as CSSProperties} x={c.x + c.a * 0.62} y={base + 14} width="13" height="15" rx="2" />
          </g>
        );
      })}
    </svg>
  );
}

export function DecoracionSala({ ancla, primero = false }: { ancla: string; primero?: boolean }) {
  // El andamio de `/navidad` (primera sala de su página, con la firma de North Studio al pie)
  // no se decora hasta que se componga: la partitura de la banda es para la home, y ahí Budín
  // caía sobre la firma y el bastón sobre la lista.
  const andamio = primero && ancla === "navidad";
  const pegados = andamio ? [] : (ESCENAS[ancla] ?? []);
  const cierre = ancla === "la-clase-no-termina";
  // La primera sala de cualquier página lleva la guirnalda colgada: en la home la disputan
  // Hola y la banda según quién abra (`.apertura`), y en las páginas internas es esa sola.
  const inicio = primero || ancla === "quien-soy" || ancla === "navidad";

  return (
    <>
      {inicio && <GuirnaldaColgada />}
      {/* La sala de Navidad tiene su propio cielo, que sólo se ve en la versión B: ahí es la
          única sala de noche de la casa. */}
      {(cierre || (ancla === "navidad" && !andamio)) && <Cielo />}
      {cierre && <Barrio />}
      {ancla === "navidad" && !andamio && <BudinGorro className="budin-asoma sticker-vivo" />}
      {pegados.map((p, i) => (
        <Sticker
          key={i}
          nombre={p.s}
          className={`pegado pegado--${p.borde} pegado--${p.lado} sticker-vivo${p.soloAncho ? " pegado--ancho" : ""}${p.ancho ? ` pegado--libre pegado--libre-${p.ancho.lado}` : ""}`}
          style={
            {
              "--pt": p.t,
              "--pg": `${p.g}deg`,
              ...(p.y ? { "--py": p.y } : {}),
              ...(p.ancho ? { "--py-a": p.ancho.y, "--px-a": p.ancho.x } : {}),
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}
