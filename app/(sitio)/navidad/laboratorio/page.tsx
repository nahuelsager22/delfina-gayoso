import { notFound } from "next/navigation";

/**
 * Laboratorio de librerías (Bloque 12). Sirve para medir sobre el build: se retira junto con
 * las dependencias descartadas al cerrar el bloque. El `import()` va adentro de la condición
 * por la misma razón que en `/navidad`.
 */
export default async function Laboratorio({
  searchParams,
}: {
  searchParams: Promise<{ efecto?: string }>;
}) {
  if (process.env.EDICION_NAVIDAD === "1") {
    const { efecto } = await searchParams;
    const { LaboratorioEfectos } = await import(
      "../../../_edicion/navidad/laboratorio/LaboratorioEfectos"
    );
    return <LaboratorioEfectos efecto={efecto ?? "ninguno"} />;
  }
  notFound();
}
