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
// Los canales de contacto son los mismos; la invitación es propia de cada sección
// (cada CTA con su intención, para que no se sienta duplicada — Bloque 6.5).
const CANALES = [
  { medio: "instagram", destino: "https://instagram.com/delfinagayoso" },
  { medio: "email", destino: "mailto:gayosodelfina@gmail.com" },
] as const;

export const servicios: readonly PropuestaServicio[] = [
  {
    id: "colaboraciones-asesorias",
    tipo: "Colaboraciones y asesorías",
    aQuienLeSirve:
      "Marcas que quieran cocinar algo conmigo, y gente que necesite una asesoría gastronómica o tenga una idea para proponerme.",
    comoEsTrabajar:
      "Me gusta trabajar como cocino: sin vueltas, poniendo las manos y contándote todo el proceso.",
    contacto: {
      invitacion: "Si tenés una marca o una idea, escribime y la cocinamos juntas.",
      canales: CANALES,
    },
  },
  {
    // EJEMPLO (borrador): propuesta educativa a medida. Reemplazable por datos reales.
    id: "propuestas-educativas",
    tipo: "Propuestas educativas a medida",
    aQuienLeSirve:
      "Escuelas, espacios gastronómicos o equipos que quieran un taller o una clase pensada para ellos.",
    comoEsTrabajar:
      "Armamos juntos el temario según el nivel del grupo.",
    contacto: {
      invitacion: "Contame de tu grupo o tu espacio y la diseñamos a medida.",
      canales: CANALES,
    },
    borrador: true,
  },
];
