import type { MomentoComunidad } from "../types";

/**
 * Comunidad / vida real (tipo G): lo humano alrededor de la cocina. Habita el
 * Momento "La cocina compartida".
 *
 * DATOS REALES de su universo (Discovery / concepto §3d–e): el perro Budín, el
 * mate, los talleres con chicos, las mesas compartidas, los trends con su mamá.
 *
 * Bloque 6.5: cada viñeta lleva una pequeña ILUSTRACIÓN de su día a día
 * (`ilustracion`) que cuenta quién es sin explicarlo todo con palabras; y las tres
 * últimas frases se reformularon para que se sientan suyas, no de relleno. Copy
 * PENDIENTE DE VALIDACIÓN DE DELFINA.
 */
export const comunidad: readonly MomentoComunidad[] = [
  {
    id: "budin",
    que: "Budín, mi perro, siempre en la cocina esperando que se caiga algo.",
    personas: ["Budín"],
    registro: "humor",
    ilustracion: "huellas",
  },
  {
    id: "mate",
    que: "El mate al lado de la mesada, que nunca falta mientras cocino.",
    registro: "cotidiano",
    ilustracion: "mate",
  },
  {
    id: "talleres-chicos",
    que: "Los talleres con chicos son un quilombo hermoso, y de lo que más disfruto enseñar.",
    personas: ["chicos"],
    registro: "comunidad",
    ilustracion: "olla",
  },
  {
    id: "mesas-compartidas",
    que: "Las mesas largas en casa, donde lo que cociné es la excusa para quedarnos horas.",
    registro: "calidez",
    ilustracion: "plato",
  },
  {
    id: "trends-mama",
    que: "Mi mamá, que se prende a cualquier idea rara que se me ocurre grabar.",
    personas: ["mi mamá"],
    registro: "humor",
    ilustracion: "pantalla",
  },
];
