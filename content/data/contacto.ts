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
 * VALIDADO por Delfina (33ª ola): **Instagram queda confirmado como canal de contacto**,
 * con este usuario. Deja de ser un pendiente y pasa a ser estado aprobado del proyecto: no
 * se cambia salvo que ella lo pida. El mail ya era el definitivo.
 */
export const contacto: ContactoProfesional = {
  invitacion: "Contame qué tenés en mente y lo armamos juntos.",
  canales: [
    { medio: "instagram", destino: "https://instagram.com/delfinagayoso" },
    { medio: "email", destino: "mailto:gayosodelfina@gmail.com" },
  ],
};
