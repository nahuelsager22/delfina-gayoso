"use client";

import { useId, useState } from "react";
import type { PiezaAprendizaje } from "@/content";
import { Numeral } from "./Numeral";
import { Voz } from "./Voz";
import { TextoConMenciones } from "./TextoConMenciones";

/**
 * Capítulo de la serie (sistema-visual §7.4 + Bloque 6.5 · R7, Opción C).
 *
 *  · Numeral grande y solo + título (sans) + descripción breve (serif).
 *  · "Leer más" despliega el `caption` real del reel (su voz completa, en la web);
 *    "Ver el reel" lleva al Reel de Instagram (enlace de texto, sin embed pesado).
 *
 * Estabilidad del despliegue (fix Bloque 6.5): el capítulo tiene un ANCHO fijo
 * (`--measure-cuerpo`), así el numeral, el título, la descripción y el caption
 * viven en la misma columna y expandir NO cambia las dimensiones ni corre la
 * composición (pasaba en el #02, de caption largo). El despliegue usa la técnica
 * CSS de `grid-template-rows: 0fr → 1fr`: anima la altura de forma estable para
 * cualquier largo de texto, sin medir en JS. Con `prefers-reduced-motion` la
 * transición se anula globalmente (aparece al instante).
 */
export function CapituloSerie({ pieza }: { pieza: PiezaAprendizaje }) {
  const { numeral, titulo, queEnsena, caption, enlaceReel } = pieza;
  const [abierto, setAbierto] = useState(false);
  const captionId = useId();

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-xs)",
        // Ancho fijo para que expandir el caption no cambie las dimensiones, pero
        // capado al viewport (menos el padding del <main>) para no desbordar en
        // mobile (fix Bloque 6.5): el 64ch no fuerza scroll horizontal.
        inlineSize: "min(var(--measure-cuerpo), calc(100vw - 2 * var(--space-lg)))",
      }}
    >
      <Numeral valor={numeral} />
      <h3
        className="text-titulo"
        style={{
          fontFamily: "var(--font-mundo)",
          fontWeight: "var(--font-weight-medium)",
        }}
      >
        {titulo}
      </h3>
      <Voz texto={queEnsena} escala="cuerpo" />

      {(caption || enlaceReel) && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--space-md)",
            marginBlockStart: "var(--space-2xs)",
          }}
        >
          {caption && (
            <button
              type="button"
              className="enlace-serie"
              aria-expanded={abierto}
              aria-controls={captionId}
              onClick={() => setAbierto((v) => !v)}
            >
              {abierto ? "Leer menos" : "Leer más"}
            </button>
          )}
          {enlaceReel && (
            <a
              href={enlaceReel}
              target="_blank"
              rel="noopener noreferrer"
              className="enlace-serie"
              aria-label={`Ver el reel de ${titulo} en Instagram`}
            >
              Ver el reel
            </a>
          )}
        </div>
      )}

      {caption && (
        <div
          id={captionId}
          className="cap-caption"
          data-abierto={abierto ? "true" : "false"}
          aria-hidden={!abierto}
        >
          <div style={{ overflow: "hidden", minBlockSize: 0 }}>
            <p
              className="voz voz-texto text-cuerpo"
              style={{
                color: "var(--color-hierro)",
                whiteSpace: "pre-line",
                paddingBlockStart: "var(--space-sm)",
              }}
            >
              <TextoConMenciones texto={caption} />
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
