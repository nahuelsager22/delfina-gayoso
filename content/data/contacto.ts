import type { ContactoProfesional } from "../types";

/**
 * El contacto de "Trabajemos juntos" (Bloque 8 · 30ª ola).
 *
 * Vivía repetido dentro de cada propuesta. Con dos servicios ya era discutible; al sumar
 * el tercero, los mismos dos enlaces iban a aparecer SEIS veces en una sección: eso deja
 * de leerse como invitación y se lee como formulario. Ahora la sección invita una vez, al
 * final, después de las tres propuestas — que es donde alguien decide escribir.
 *
 * Sigue siendo lo que era (Bloque 6.5 · R8): accesos directos, no captación de leads. Sin
 * campos de empresa ni presupuesto, sin "tipo de consulta".
 *
 * El mail es el definitivo. El usuario de Instagram sigue PENDIENTE de confirmar.
 */
export const contacto: ContactoProfesional = {
  invitacion: "Contame qué tenés en mente y lo armamos juntos.",
  canales: [
    { medio: "instagram", destino: "https://instagram.com/delfinagayoso" },
    { medio: "email", destino: "mailto:gayosodelfina@gmail.com" },
  ],
};
