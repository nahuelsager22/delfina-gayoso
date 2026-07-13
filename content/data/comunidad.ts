import type { MomentoComunidad } from "../types";

/**
 * Comunidad / vida real (tipo G): lo humano alrededor de la cocina. Habita el
 * Momento 5, que se construye en el Bloque 6c; en 6a queda disponible vía la
 * capa de acceso.
 *
 * DATOS REALES de su universo (Discovery / concepto §3d–e): el perro Budín, el
 * mate, los talleres con chicos, las mesas compartidas, los trends con su mamá.
 * La redacción en su voz queda PENDIENTE DE VALIDACIÓN DE DELFINA.
 */
export const comunidad: readonly MomentoComunidad[] = [
  {
    id: "budin",
    que: "Budín, mi perro, siempre en la cocina esperando que se caiga algo.",
    personas: ["Budín"],
    registro: "humor",
  },
  {
    id: "mate",
    que: "El mate al lado de la mesada, que nunca falta mientras cocino.",
    registro: "cotidiano",
  },
  {
    id: "talleres-chicos",
    que: "Talleres de cocina con chicos, que son los que más se copan.",
    personas: ["chicos"],
    registro: "comunidad",
  },
  {
    id: "mesas-compartidas",
    que: "Mesas largas, donde lo que cociné termina siendo una excusa para juntarnos.",
    registro: "calidez",
  },
  {
    id: "trends-mama",
    que: "Trends en la cocina con mi mamá, que siempre se prende.",
    personas: ["mi mamá"],
    registro: "humor",
  },
];
