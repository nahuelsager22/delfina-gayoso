import type { SerieAprendizaje } from "../types";

/**
 * Serie de aprendizaje (tipo C.bis, Bloque 6.5 · R7). Aprendizaje se percibe como
 * una SERIE, no una lista: en v1 la serie disponible es "Cocina Nivel 0". La
 * premisa está en su voz real (caption del capítulo #01). Agregar más series en el
 * futuro es sumar objetos acá, sin rediseñar.
 */
export const serieActual: SerieAprendizaje = {
  id: "cocina-nivel-0",
  titulo: "Cocina Nivel 0",
  premisa:
    "La creé para romper prejuicios: que por fin exista la explicación de lo básico, sin vueltas.",
};
