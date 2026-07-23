import type { PropuestaServicio } from "../types";

/**
 * Propuestas de servicio (tipo E): la invitación profesional de Delfina para empresas
 * y organizaciones (B3 §3.2, §4-E). No es tarifario: es invitación.
 *
 * Bloque 8 · 10ª ola (decisión de Delfina): "Trabajemos juntos" pasa a ser EXCLUSIVAMENTE
 * servicios profesionales para empresas/organizaciones. Toda la parte educativa (clases,
 * talleres) se mudó a "Lo que te podés llevar". Acá quedan: colaboraciones con marcas,
 * asesorías gastronómicas, creación de contenido, presencia en eventos y acciones
 * comerciales. La sección funciona como una invitación clara para futuros clientes.
 *
 * Contacto MULTICANAL (Bloque 6.5 · R8): Instagram + email (`gayosodelfina@gmail.com`),
 * accesos directos, no captación de leads. El usuario de Instagram sigue PENDIENTE de
 * confirmar; el email ya es el definitivo.
 */
const CANALES = [
  { medio: "instagram", destino: "https://instagram.com/delfinagayoso" },
  { medio: "email", destino: "mailto:gayosodelfina@gmail.com" },
] as const;

export const servicios: readonly PropuestaServicio[] = [
  {
    id: "colaboraciones-marcas",
    tipo: "Colaboraciones y contenido",
    aQuienLeSirve:
      "Marcas que quieran cocinar algo conmigo: colaboraciones, creación de contenido y acciones para comunicar un producto.",
    comoEsTrabajar:
      "Me gusta trabajar como cocino: ponniendo las manos, sin vueltas, cuidando cada detalle y contándote todo el proceso.",
    contacto: {
      invitacion: "Si tenés una marca o una idea, escribime y la cocinamos juntas.",
      canales: CANALES,
    },
  },
  {
    id: "asesorias-eventos",
    tipo: "Asesorías y eventos",
    aQuienLeSirve:
      "Espacios gastronómicos, equipos y empresas que necesiten una asesoría, o un evento con una cocina pensada al detalle.",
    comoEsTrabajar:
      "Armamos juntos la propuesta según lo que necesites, del menú a la puesta en escena.",
    contacto: {
      invitacion: "Contame qué tenés en mente y lo diseñamos a tu medida.",
      canales: CANALES,
    },
  },
];
