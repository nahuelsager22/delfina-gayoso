"use client";

import { useState } from "react";
import { fijarVariantes, useVariantes } from "./estado";
import { OPCIONES, BASE, type Variantes } from "./variantes";

/**
 * Comparar en vivo (sólo desarrollo). No es interfaz del sitio: no lleva la voz de nadie ni
 * pretende ser linda, tiene que ser rápida de usar y fácil de ignorar en las capturas.
 */
export function ControlVariantes() {
  const v = useVariantes();
  const [abierto, setAbierto] = useState(true);

  return (
    <aside className="control-variantes" aria-label="Variantes de la edición (desarrollo)">
      <button type="button" aria-expanded={abierto} onClick={() => setAbierto((a) => !a)}>
        {abierto ? "Ocultar variantes" : "Variantes"}
      </button>
      {abierto && (
        <form onSubmit={(e) => e.preventDefault()}>
          {(Object.keys(OPCIONES) as (keyof Variantes)[]).map((dim) => (
            <label key={dim}>
              <span>{OPCIONES[dim].rotulo}</span>
              <select
                value={v[dim]}
                onChange={(e) => fijarVariantes({ [dim]: e.target.value } as Partial<Variantes>)}
              >
                {OPCIONES[dim].valores.map(([valor, nombre]) => (
                  <option key={valor} value={valor}>
                    {nombre}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <button type="button" onClick={() => fijarVariantes(BASE)}>
            Volver a la base
          </button>
        </form>
      )}
    </aside>
  );
}
