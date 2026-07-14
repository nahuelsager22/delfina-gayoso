import type { RedSocial } from "../types";

/**
 * Redes sociales (tipo H) — sus canales reales (Bloque 6.5 · R5). Instagram y
 * TikTok, integrados como contenido: los usa el navbar de orientación y el cierre
 * del recorrido. Un solo origen para el dato: cambiar un handle es cambiarlo acá.
 *
 * PENDIENTE DE CONFIRMAR: los usuarios/URLs surgen de la evidencia de Discovery
 * (Instagram @delfinagayoso; TikTok @gayosodelfi, journal §3). Confirmar con Delfina.
 */
export const redes: readonly RedSocial[] = [
  {
    id: "instagram",
    plataforma: "instagram",
    usuario: "@delfinagayoso",
    url: "https://instagram.com/delfinagayoso",
  },
  {
    id: "tiktok",
    plataforma: "tiktok",
    usuario: "@gayosodelfi",
    url: "https://www.tiktok.com/@delfinagayos0",
  },
];
