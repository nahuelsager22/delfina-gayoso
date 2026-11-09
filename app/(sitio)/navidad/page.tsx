import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Navidad · Delfina Gayoso" };

/**
 * `/navidad` (Bloque 12). Existe sólo con la bandera encendida: apagada responde 404.
 *
 * El `import()` va ADENTRO de la condición, y no después de un `notFound()`: el compilador no
 * sabe que `notFound()` nunca retorna, así que dejarlo después lo conservaría en el build.
 */
export default async function PaginaNavidad() {
  if (process.env.EDICION_NAVIDAD === "1") {
    const { PaginaEdicion } = await import("../../_edicion/navidad/PaginaEdicion");
    return <PaginaEdicion />;
  }
  notFound();
}
