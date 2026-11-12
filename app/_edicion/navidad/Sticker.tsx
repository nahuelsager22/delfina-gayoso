import type { CSSProperties, ReactNode } from "react";

/**
 * STICKERS (Bloque 12): "stickers!!! eso sí va". Primer set, dibujado acá: no hay material
 * ajeno ni banco de imágenes. Todos son cosas de cocina o de su Navidad —lo que entra en una
 * Box Kids, lo que se hornea— y todos comparten tres reglas para leerse como una misma
 * planilla: trazo de tinta del mismo grosor, colores planos de una sola gama, y el borde de
 * troquel blanco, que es lo que los hace stickers y no íconos.
 *
 * El troquel no es un filtro: el dibujo se repite debajo con trazo blanco grueso (`.corte`).
 * Así no hay costo de rasterizado de filtro por cada sticker.
 */
const R = "#C4202F";
const RH = "#971524";
const V = "#1F6B45";
const VH = "#154D32";
const O = "#F2B632";
const OC = "#FFD978";
const G = "#C98345";
const GH = "#A9652E";
const B = "#FFFDF6";
const T = "#3A1A12";
const trazo = { stroke: T, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" } as const;

const ARTE = {
  estrella: (
    <>
      <path d="M60 14 L72.9 44.2 L105.6 47.2 L80.9 68.8 L88.2 100.8 L60 84 L31.8 100.8 L39.1 68.8 L14.4 47.2 L47.1 44.2 Z" fill={O} {...trazo} />
      <circle cx="51.5" cy="58" r="3.2" fill={T} />
      <circle cx="68.5" cy="58" r="3.2" fill={T} />
      <path d="M52 66 Q60 74 68 66" fill="none" {...trazo} strokeWidth={2.6} />
      <circle cx="44" cy="65" r="3.6" fill="#EE8A5E" opacity=".8" />
      <circle cx="76" cy="65" r="3.6" fill="#EE8A5E" opacity=".8" />
    </>
  ),
  baston: (
    <>
      <path className="sin-relleno" d="M38 108 L38 46 C38 16 88 16 88 46 L88 58" fill="none" stroke={T} strokeWidth="25" strokeLinecap="round" />
      <path className="sin-relleno" d="M38 108 L38 46 C38 16 88 16 88 46 L88 58" fill="none" stroke={B} strokeWidth="19" strokeLinecap="round" />
      <path className="sin-relleno" d="M38 108 L38 46 C38 16 88 16 88 46 L88 58" fill="none" stroke={R} strokeWidth="19" strokeDasharray="13 13" />
    </>
  ),
  casita: (
    <>
      <path d="M26 58 H94 V108 H26 Z" fill={G} {...trazo} />
      <path d="M14 64 L60 18 L106 64 Z" fill={GH} {...trazo} />
      <path d="M17 64 q7 8 14 0 q7 8 14 0 q7 8 15 0 q7 8 14 0 q7 8 14 0 q7 8 14 0" fill="none" stroke={B} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M49 108 V84 a11 11 0 0 1 22 0 V108 Z" fill={R} {...trazo} />
      <circle cx="66" cy="94" r="1.9" fill={OC} />
      <rect className="ventanita" x="31" y="73" width="13" height="13" rx="2" fill={OC} {...trazo} strokeWidth={2.4} />
      <rect className="ventanita" x="76" y="73" width="13" height="13" rx="2" fill={OC} {...trazo} strokeWidth={2.4} />
      <circle cx="60" cy="40" r="5" fill={R} {...trazo} strokeWidth={2.4} />
      <circle cx="44" cy="52" r="3.4" fill="#2C9A68" />
      <circle cx="76" cy="52" r="3.4" fill={O} />
    </>
  ),
  arbolito: (
    <>
      <path d="M52 100 H68 V112 H52 Z" fill={GH} {...trazo} />
      <path d="M60 52 L106 102 H14 Z" fill={V} {...trazo} />
      <path d="M60 32 L96 74 H24 Z" fill={V} {...trazo} />
      <path d="M60 14 L84 46 H36 Z" fill={V} {...trazo} />
      <path d="M26 96 q11 -9 22 -2 q11 8 24 0 q11 -7 22 2" fill="none" stroke={B} strokeWidth="4.4" strokeLinecap="round" />
      <path d="M36 68 q12 -7 24 -1 q12 6 24 1" fill="none" stroke={B} strokeWidth="4" strokeLinecap="round" />
      <circle className="bolita" cx="46" cy="84" r="4.6" fill={R} {...trazo} strokeWidth={2} />
      <circle className="bolita" cx="74" cy="82" r="4.6" fill={O} {...trazo} strokeWidth={2} />
      <circle className="bolita" cx="58" cy="56" r="4.2" fill={O} {...trazo} strokeWidth={2} />
      <path className="punta" d="M60 3 L63.4 10.4 L71.4 11.2 L65.4 16.6 L67.2 24.4 L60 20.4 L52.8 24.4 L54.6 16.6 L48.6 11.2 L56.6 10.4 Z" fill={O} {...trazo} strokeWidth={2.4} />
    </>
  ),
  galleta: (
    <>
      <path d="M31 63 H89 M60 58 V86 M50 88 L39 108 M70 88 L81 108" fill="none" stroke={T} strokeWidth="23" strokeLinecap="round" />
      <path d="M60 58 V86" fill="none" stroke={T} strokeWidth="37" strokeLinecap="round" />
      <circle cx="60" cy="33" r="22.5" fill={T} />
      <path d="M31 63 H89 M50 88 L39 108 M70 88 L81 108" fill="none" stroke={G} strokeWidth="17" strokeLinecap="round" />
      <path d="M60 58 V86" fill="none" stroke={G} strokeWidth="31" strokeLinecap="round" />
      <circle cx="60" cy="33" r="19.5" fill={G} />
      <circle cx="53" cy="30" r="2.8" fill={T} />
      <circle cx="67" cy="30" r="2.8" fill={T} />
      <path d="M52 38 Q60 46 68 38" fill="none" stroke={B} strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="60" cy="61" r="3.6" fill={R} />
      <circle cx="60" cy="74" r="3.6" fill={V} />
      <path d="M27 58 q3 5 0 10 M93 58 q-3 5 0 10 M34 104 q6 1 9 7 M86 104 q-6 1 -9 7" fill="none" stroke={B} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  acebo: (
    <>
      <path d="M60 64 C50 40 28 40 10 28 C13 36 9 42 15 47 C10 53 13 60 22 60 C21 68 30 72 37 67 C43 74 55 72 60 64 Z" fill={V} {...trazo} />
      <path d="M60 64 C70 40 92 40 110 28 C107 36 111 42 105 47 C110 53 107 60 98 60 C99 68 90 72 83 67 C77 74 65 72 60 64 Z" fill={VH} {...trazo} />
      <path d="M58 62 C46 52 34 46 22 38 M62 62 C74 52 86 46 98 38" fill="none" stroke="#7FC9A0" strokeWidth="2" strokeLinecap="round" />
      <circle className="baya" cx="50" cy="72" r="10" fill={R} {...trazo} />
      <circle className="baya" cx="70" cy="72" r="10" fill={R} {...trazo} />
      <circle className="baya" cx="60" cy="87" r="10" fill={R} {...trazo} />
      <circle cx="47" cy="69" r="2.4" fill={B} opacity=".85" />
      <circle cx="67" cy="69" r="2.4" fill={B} opacity=".85" />
      <circle cx="57" cy="84" r="2.4" fill={B} opacity=".85" />
    </>
  ),
  regalo: (
    <>
      <rect x="24" y="52" width="72" height="56" rx="3" fill={R} {...trazo} />
      <rect x="51" y="52" width="18" height="56" fill={OC} {...trazo} strokeWidth={2.4} />
      <g className="tapa">
        <rect x="17" y="38" width="86" height="19" rx="3" fill={RH} {...trazo} />
        <rect x="51" y="38" width="18" height="19" fill={O} {...trazo} strokeWidth={2.4} />
        <path d="M60 37 C42 12 22 16 28 28 C32 37 50 38 60 37 Z" fill={O} {...trazo} />
        <path d="M60 37 C78 12 98 16 92 28 C88 37 70 38 60 37 Z" fill={O} {...trazo} />
      </g>
    </>
  ),
  manga: (
    <g transform="rotate(32 60 60)">
      <path d="M38 16 H82 L66 86 H54 Z" fill="#FBF1E2" {...trazo} />
      <path d="M46 36 H74 L66 84 H54 Z" fill={R} />
      <path d="M38 16 H82 L66 86 H54 Z" fill="none" {...trazo} />
      <path d="M38 16 C48 8 72 8 82 16" fill="none" {...trazo} />
      <path d="M53 86 H67 L63 103 H57 Z" fill={O} {...trazo} />
      <path d="M57 103 q3 8 6 0" fill={R} {...trazo} strokeWidth={2.4} />
      <circle className="gota" cx="60" cy="118" r="5.5" fill={R} {...trazo} strokeWidth={2.2} />
    </g>
  ),
  masita: (
    <>
      <circle cx="60" cy="60" r="44" fill={G} {...trazo} />
      <path d="M60 25 C74 22 94 36 92 56 C96 72 80 94 60 90 C42 96 24 78 28 58 C24 40 42 22 60 25 Z" fill={B} {...trazo} strokeWidth={2.4} />
      <g className="chispas">
      <path d="M46 44 l6 -5 M72 40 l5 5 M78 62 l-1 7 M56 56 l7 2 M42 66 l5 5 M62 76 l7 -2" fill="none" stroke={R} strokeWidth="4.6" strokeLinecap="round" />
      <path d="M60 37 l-1 7 M44 56 l-1 -6 M70 54 l6 -2 M52 74 l-6 3" fill="none" stroke={V} strokeWidth="4.6" strokeLinecap="round" />
      <path d="M64 66 l5 3 M36 54 l2 -6 M82 50 l-3 -6" fill="none" stroke={O} strokeWidth="4.6" strokeLinecap="round" />
      </g>
    </>
  ),
  /* Quinta pasada, para la Box Empresarial ("cookie box + confituras + pan dulce o budín
     inglés"): las dos cosas que la caja suma. Misma planilla: tinta, gama plana y troquel. */
  frasco: (
    <>
      <path d="M30 46 C30 40 34 37 40 37 H80 C86 37 90 40 90 46 V100 C90 107 85 111 78 111 H42 C35 111 30 107 30 100 Z" fill={R} {...trazo} />
      <path d="M38 50 V98" fill="none" stroke="#E4606A" strokeWidth="5" strokeLinecap="round" opacity=".8" />
      <rect x="40" y="62" width="40" height="28" rx="4" fill={B} {...trazo} strokeWidth={2.4} />
      <path d="M48 76 q6 -7 12 0 q6 7 12 0" fill="none" stroke={R} strokeWidth="3" strokeLinecap="round" />
      <rect x="34" y="22" width="52" height="16" rx="3" fill={OC} {...trazo} />
      <path d="M30 24 C40 12 80 12 90 24 L86 30 C74 22 46 22 34 30 Z" fill={B} {...trazo} strokeWidth={2.4} />
      <path d="M42 18 l-2 6 M54 15 l-1 7 M66 15 l1 7 M78 18 l2 6" fill="none" stroke={R} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  pandulce: (
    <>
      <path d="M22 70 C20 38 40 22 60 22 C80 22 100 38 98 70 Z" fill={G} {...trazo} />
      <path d="M30 46 C42 38 52 44 60 38 C70 44 80 38 90 46" fill="none" stroke={GH} strokeWidth="4" strokeLinecap="round" />
      <circle cx="44" cy="58" r="4" fill={R} {...trazo} strokeWidth={2} />
      <circle cx="62" cy="52" r="3.6" fill={V} {...trazo} strokeWidth={2} />
      <circle cx="78" cy="60" r="4" fill={O} {...trazo} strokeWidth={2} />
      <circle cx="54" cy="64" r="3.2" fill={R} {...trazo} strokeWidth={2} />
      <path d="M20 68 H100 L95 108 H25 Z" fill={B} {...trazo} />
      <path d="M33 70 L36 106 M47 70 L49 106 M60 70 V106 M73 70 L71 106 M87 70 L84 106" fill="none" stroke={R} strokeWidth="3.4" strokeLinecap="round" />
    </>
  ),
} as const satisfies Record<string, ReactNode>;

export type NombreSticker = keyof typeof ARTE;
export const STICKERS = Object.keys(ARTE) as NombreSticker[];

export function Sticker({
  nombre,
  className,
  style,
}: {
  nombre: NombreSticker;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={["sticker", className].filter(Boolean).join(" ")}
      data-sticker={nombre}
      style={style}
      viewBox="-6 -6 132 132"
      aria-hidden
      focusable="false"
    >
      <g className="corte">{ARTE[nombre]}</g>
      {ARTE[nombre]}
    </svg>
  );
}

/**
 * Budín con su gorro: el mismo dibujo de siempre (A8), con una prenda encima. La prenda se
 * dibujó sobre el lienzo común de sus dos caras, que están alineadas por los ojos: por eso el
 * mismo gorro le queda bien a las dos. Decorativo: no habla ni vende nada (A12).
 */
export function BudinGorro({
  cara = "alegre",
  className,
  style,
}: {
  cara?: "alegre" | "ladeado";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={["budin-gorro-sticker", className].filter(Boolean).join(" ")}
      style={style}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/ilustraciones/budin-${cara}.png`} alt="" width={473} height={512} loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/edicion/gorro-budin.svg" alt="" width={473} height={512} loading="lazy" />
    </span>
  );
}

/** El sello: "mi fecha favorita del año" alrededor de una estrella. Copy a validar por ella. */
export function SelloNavidad({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      className={["sticker sello-navidad sticker-vivo", className].filter(Boolean).join(" ")}
      data-sticker="sello"
      style={style}
      viewBox="0 0 160 160"
      aria-hidden
      focusable="false"
    >
      <circle cx="80" cy="80" r="77" fill={B} />
      <circle cx="80" cy="80" r="70" fill={R} />
      <defs>
        <path id="sello-curva" d="M80 80 m-54 0 a54 54 0 1 1 108 0 a54 54 0 1 1 -108 0" />
      </defs>
      <g className="sello-giro">
        <text className="sello-texto" fill="#FFF6E6">
          <textPath href="#sello-curva" textLength="330">
            MI FECHA FAVORITA DEL AÑO ✶
          </textPath>
        </text>
      </g>
      <g transform="translate(36 37) scale(.74)">{ARTE.estrella}</g>
    </svg>
  );
}
