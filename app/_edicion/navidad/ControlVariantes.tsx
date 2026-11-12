"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { fijarVariantes, useVariantes } from "./estado";
import { OPCIONES, BASE, type Variantes } from "./variantes";

/**
 * Comparar en vivo (desarrollo y deployment de exploración). No es interfaz del sitio: no
 * lleva la voz de nadie ni pretende ser linda, tiene que ser rápida de usar y fácil de ignorar
 * en las capturas. En el celular arranca cerrado, para que lo primero que se vea sea la home.
 */
export function ControlVariantes() {
  const v = useVariantes();
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(() => matchMedia("(min-width: 720px)").matches);

  return (
    <aside className="control-variantes" aria-label="Opciones de diseño de la edición navideña">
      <button type="button" aria-expanded={abierto} onClick={() => setAbierto((a) => !a)}>
        {abierto ? "Ocultar opciones" : "Opciones de diseño"}
      </button>
      {abierto && (
        <form onSubmit={(e) => e.preventDefault()}>
          {(Object.keys(OPCIONES) as (keyof Variantes)[])
            .filter((dim) => !OPCIONES[dim].soloEn || OPCIONES[dim].soloEn === v.version)
            .filter((dim) => !OPCIONES[dim].soloEnRuta || OPCIONES[dim].soloEnRuta === ruta)
            .map((dim) => (
            <label key={dim} className={dim === "version" ? "control-version" : undefined}>
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
          {/* Vuelve a la base sin cambiar de versión: comparar A y B es la pregunta principal. */}
          <button type="button" onClick={() => fijarVariantes({ ...BASE, version: v.version })}>
            Restablecer
          </button>
        </form>
      )}
    </aside>
  );
}
