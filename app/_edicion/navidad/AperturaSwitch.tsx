"use client";

import type { ReactNode } from "react";
import { useVariantes } from "./estado";

/** Quién abre la home. Las dos piezas llegan ya renderizadas desde el servidor: cambiar de
 *  apertura es cambiar el orden, sin volver a pedir nada. */
export function AperturaSwitch({ hola, navidad }: { hola: ReactNode; navidad: ReactNode }) {
  const { apertura } = useVariantes();
  return (
    <div className="apertura" data-abre={apertura}>
      {apertura === "navidad" ? navidad : hola}
      {apertura === "navidad" ? hola : navidad}
    </div>
  );
}
