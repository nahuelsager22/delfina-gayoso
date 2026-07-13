import type { PropuestaServicio } from "../types";

/**
 * Propuestas de servicio (tipo E): la segunda función que pidió Delfina
 * —publicitar su servicio— como invitación, no tarifario (B3 §3.2, §4-E).
 *
 * Bloque 6.5:
 *  · Contacto MULTICANAL (R8): Instagram + email (`gayosodelfina@gmail.com`),
 *    accesos directos claros, no captación de leads. La invitación se reformuló
 *    para no repetir el párrafo anterior.
 *  · Ecosistema completo: además de la propuesta real (colaboraciones y asesorías),
 *    se suman propuestas de EJEMPLO (`borrador: true`) para que Delfina visualice
 *    el potencial de la web. Son ficticias, claramente marcadas y fáciles de
 *    reemplazar por información real.
 *
 * PENDIENTE DE CONFIRMAR: el usuario de Instagram real. El email ya es el definitivo.
 */
const CONTACTO = {
  invitacion: "Contame qué tenés en mente y lo vemos.",
  canales: [
    { medio: "instagram", destino: "https://instagram.com/delfinagayoso" },
    { medio: "email", destino: "mailto:gayosodelfina@gmail.com" },
  ],
} as const;

export const servicios: readonly PropuestaServicio[] = [
  {
    id: "colaboraciones-asesorias",
    tipo: "Colaboraciones y asesorías",
    aQuienLeSirve:
      "Marcas que quieran cocinar algo conmigo, y gente que necesite una asesoría gastronómica o tenga una idea para proponerme.",
    comoEsTrabajar:
      "Me gusta trabajar como cocino: sin vueltas, poniendo las manos y contándote todo el proceso.",
    contacto: CONTACTO,
  },
  {
    // EJEMPLO (borrador): propuesta educativa a medida. Reemplazable por datos reales.
    id: "propuestas-educativas",
    tipo: "Propuestas educativas a medida",
    aQuienLeSirve:
      "Escuelas, espacios gastronómicos o equipos que quieran un taller o una clase pensada para ellos.",
    comoEsTrabajar:
      "Armamos juntos el temario según el nivel del grupo, y yo llevo todo listo para cocinar.",
    contacto: CONTACTO,
    borrador: true,
  },
];
