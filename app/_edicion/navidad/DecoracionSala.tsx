import type { CSSProperties } from "react";
import { BudinGorro, Sticker, type NombreSticker } from "./Sticker";
import { GuirnaldaColgada } from "./OndaNavidad";

/**
 * LAS CAPAS DE TEMPORADA DE CADA SALA (Bloque 12). Se montan desde `Banda`, igual que la
 * onda, así que ninguna sección tiene que saber que es Navidad. Cada sala declara qué tiene
 * pegado y dónde: como en La mesa, el lugar viene de una partitura y no del azar, para que el
 * servidor y el cliente dibujen lo mismo.
 *
 * Los stickers viven por detrás del contenido (`z-index: 0`) y sin eventos: si caen cerca de
 * un texto no le pueden restar contraste ni robarle un toque. Se apoyan en los bordes y el
 * corte de la sala los recorta: en un celular asoman, no invaden.
 */
interface Pegado {
  s: NombreSticker;
  /** Distancias en % de la sala; `lado` elige contra qué borde se mide `x`. */
  y: string;
  x: string;
  lado: "izq" | "der";
  /** Tamaño fluido. */
  t: string;
  /** Inclinación, en grados. */
  g: number;
  soloAncho?: boolean;
  /** Pegado en la esquina de arriba, junto al rótulo y el título. En un celular angosto el
   *  título ocupa todo el ancho, así que se corre hasta el borde y asoma; por debajo de 360px
   *  no queda lugar y no se pega. */
  esquina?: boolean;
}

const ESCENAS: Record<string, readonly Pegado[]> = {
  "quien-soy": [
    { s: "acebo", y: "78%", x: "-2.2rem", lado: "der", t: "clamp(84px, 9vw, 132px)", g: 14 },
  ],
  navidad: [
    // Arriba del rótulo: en 390 el aire superior de la banda es lo único que le queda libre.
    // En un celular no hay lugar libre arriba del rótulo que no quede bajo el navbar: ahí no va.
    { s: "estrella", y: "clamp(14px, 5.5vw, 90px)", x: "2%", lado: "der", t: "clamp(68px, 10vw, 148px)", g: 12, soloAncho: true },
    { s: "baston", y: "46%", x: "-1.6rem", lado: "izq", t: "clamp(70px, 8vw, 118px)", g: -18 },
  ],
  umbral: [
    // Abajo y no arriba: arriba quedaba sobre el título, y ahora que se puede tocar lo taparía.
    { s: "masita", y: "84%", x: "-1.6rem", lado: "izq", t: "clamp(72px, 9vw, 130px)", g: -12 },
    { s: "manga", y: "78%", x: "-1.4rem", lado: "der", t: "clamp(76px, 9vw, 130px)", g: 8 },
  ],
  marcas: [
    { s: "regalo", y: "6%", x: "3%", lado: "der", t: "clamp(70px, 8vw, 118px)", g: 10, esquina: true },
  ],
  "trabajemos-juntos": [
    { s: "acebo", y: "5%", x: "2%", lado: "der", t: "clamp(78px, 9vw, 132px)", g: -8, esquina: true },
    { s: "galleta", y: "62%", x: "-1.8rem", lado: "der", t: "clamp(78px, 9vw, 126px)", g: 12, soloAncho: true },
  ],
  "lo-que-te-llevas": [
    { s: "casita", y: "4%", x: "3%", lado: "der", t: "clamp(78px, 9.5vw, 138px)", g: 7, esquina: true },
    { s: "arbolito", y: "58%", x: "-1.8rem", lado: "izq", t: "clamp(80px, 9vw, 128px)", g: -9, soloAncho: true },
  ],
  "la-clase-no-termina": [],
  // Páginas internas: la edición las atraviesa con menos, para no tapar lo que se lee.
  "la-mesa": [
    { s: "estrella", y: "3%", x: "4%", lado: "der", t: "clamp(62px, 7vw, 108px)", g: 10, esquina: true },
    { s: "galleta", y: "22%", x: "-1.4rem", lado: "izq", t: "clamp(66px, 7vw, 108px)", g: -14 },
  ],
  experiencias: [
    { s: "manga", y: "clamp(96px, 11vw, 170px)", x: "3%", lado: "der", t: "clamp(66px, 7vw, 108px)", g: 8 },
  ],
  colaboraciones: [
    { s: "regalo", y: "clamp(96px, 11vw, 170px)", x: "3%", lado: "der", t: "clamp(62px, 7vw, 104px)", g: 8 },
  ],
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
          className={`pegado sticker-vivo${p.soloAncho ? " pegado--ancho" : ""}${p.esquina ? " pegado--esquina" : ""}`}
          style={
            {
              position: "absolute",
              insetBlockStart: p.y,
              "--px": p.x,
              [p.lado === "izq" ? "insetInlineStart" : "insetInlineEnd"]: p.esquina ? "var(--px-angosto, var(--px))" : p.x,
              inlineSize: p.t,
              rotate: `${p.g}deg`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}
