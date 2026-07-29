"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { FlechaDiagonal } from "./EnlaceEditorial";
import type { EnlacesCalendario } from "./calendario";

/**
 * "Guardá la fecha ↘" (Bloque 8 · 17ª ola; 20ª ola — SIN elegir plataforma).
 * -----------------------------------------------------------------------------
 * Antes desplegaba tres opciones y obligaba a decidir. Ahora la acción es UNA: el sitio
 * infiere el calendario del dispositivo y guarda la fecha. Elegir entre Google, Apple y
 * Outlook es un problema del sitio, no del visitante — y en una invitación, cada paso de
 * más es una oportunidad de abandonar.
 *
 * Cómo se infiere:
 *  · iPhone, iPad o Mac → el archivo `.ics`, que Apple Calendar abre de forma nativa.
 *  · Android → Google Calendar, que es la app de calendario del sistema.
 *  · Todo lo demás (Windows, Linux, desconocido) → Google Calendar: es el denominador
 *    común, y en desktop abre en el navegador sin instalar nada. Outlook queda como
 *    alternativa a un toque de distancia, no como decisión obligatoria.
 *
 * La detección corre en el cliente, así que el primer render usa Google. Es el fallback
 * correcto —funciona en cualquier lado— y evita una diferencia entre servidor y
 * navegador. Quien use otro calendario tiene "¿Usás otro?" debajo, en chico.
 */

type Plataforma = "apple" | "google" | "outlook";

const NOMBRE: Record<Plataforma, string> = {
  apple: "Apple Calendar",
  google: "Google Calendar",
  outlook: "Outlook",
};

/** El dispositivo no cambia mientras la página está abierta: no hay a qué suscribirse. */
const sinCambios = () => () => {};

/** Qué calendario tiene más a mano quien está mirando. */
function detectar(): Plataforma {
  if (typeof navigator === "undefined") return "google";
  // El iPad moderno se presenta como "Macintosh"; da igual, también es Apple.
  return /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent) ? "apple" : "google";
}

export function GuardarFecha({
  enlaces,
  etiqueta = "Guardá la fecha",
}: {
  enlaces: EnlacesCalendario;
  etiqueta?: string;
}) {
  // El dispositivo es un dato del navegador, no un estado del componente: se lee como lo
  // que es. En el servidor (y en el primer render) vale "google", el fallback universal.
  const plataforma = useSyncExternalStore(sinCambios, detectar, () => "google" as const);
  const [abierto, setAbierto] = useState(false);
  const id = useId();

  const destino = (p: Plataforma) =>
    p === "apple" ? enlaces.apple : p === "outlook" ? enlaces.outlook : enlaces.google;

  // Las otras dos, para quien use un calendario distinto al de su dispositivo.
  const alternativas = (["apple", "google", "outlook"] as const).filter(
    (p) => p !== plataforma,
  );

  return (
    <div className="guardar-fecha">
      <a
        href={destino(plataforma)}
        className="enlace-editorial"
        {...(plataforma === "apple"
          ? { download: true }
          : { target: "_blank", rel: "noopener noreferrer" })}
        aria-label={`${etiqueta} en ${NOMBRE[plataforma]}`}
      >
        <span className="enlace-editorial-texto">{etiqueta}</span>
        <FlechaDiagonal className="enlace-editorial-flecha" size={20} />
      </a>

      <p className="guardar-fecha-pie">
        <span>{NOMBRE[plataforma]}</span>
        <button
          type="button"
          className="guardar-fecha-otro"
          aria-expanded={abierto}
          aria-controls={id}
          onClick={() => setAbierto((v) => !v)}
        >
          ¿Usás otro?
        </button>
      </p>

      <div
        id={id}
        className="guardar-fecha-opciones"
        data-abierto={abierto}
        hidden={!abierto}
      >
        {alternativas.map((p, i) => (
          <span key={p} className="guardar-fecha-alt">
            {i > 0 && (
              <span aria-hidden className="guardar-fecha-sep">
                ·
              </span>
            )}
            <a
              href={destino(p)}
              {...(p === "apple"
                ? { download: true }
                : { target: "_blank", rel: "noopener noreferrer" })}
            >
              {NOMBRE[p]}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}
