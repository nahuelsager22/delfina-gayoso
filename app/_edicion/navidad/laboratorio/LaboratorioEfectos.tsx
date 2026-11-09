"use client";

import Link from "next/link";
import { Ambiente } from "../Ambiente";
import { BudinGorro, SelloNavidad, Sticker, STICKERS } from "../Sticker";

export const EFECTOS = [
  ["ninguno", "Sin efecto (referencia)"],
  ["propio", "Canvas propio"],
  ["propio-destellos", "Canvas propio · destellos"],
  ["propio-luces", "Canvas propio · luces"],
  ["oro-css", "Oro con CSS"],
  ["stickers", "Planilla de stickers"],
] as const;

export function LaboratorioEfectos({ efecto }: { efecto: string }) {
  return (
    <main data-oscura="true" className="lab">
      <nav className="lab-nav" aria-label="Efectos">
        {EFECTOS.map(([id, nombre]) => (
          <Link key={id} href={`/navidad/laboratorio?efecto=${id}`} data-activo={id === efecto ? "" : undefined}>
            {nombre}
          </Link>
        ))}
      </nav>
      {efecto === "propio" && <Ambiente modo="nieve" paleta="cereza" />}
      {efecto === "propio-destellos" && <Ambiente modo="destellos" paleta="cereza" />}
      {efecto === "propio-luces" && <Ambiente modo="luces" paleta="cereza" />}
      <h1 className={efecto === "oro-css" ? "voz-display lab-titulo lab-oro" : "voz-display lab-titulo"}>
        Navidad, mi fecha más favorita del mundo
      </h1>

      {efecto === "stickers" && (
        <div className="lab-planilla">
          {STICKERS.map((n) => (
            <Sticker key={n} nombre={n} />
          ))}
          <SelloNavidad />
          <BudinGorro cara="alegre" />
          <BudinGorro cara="ladeado" />
        </div>
      )}

      {Array.from({ length: 12 }, (_, i) => (
        <p key={i} className="lab-relleno">
          Texto de relleno para poder hacer scroll y medir el efecto mientras la página se mueve.
        </p>
      ))}
    </main>
  );
}
