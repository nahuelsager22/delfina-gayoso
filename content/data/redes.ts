import type { RedSocial } from "../types";

/**
 * Redes sociales (tipo H) — sus canales reales (Bloque 6.5 · R5). Instagram y
 * TikTok, integrados como contenido: los usa el navbar de orientación y el cierre
 * del recorrido. Un solo origen para el dato: cambiar un handle es cambiarlo acá.
 *
 * VALIDADOS por Delfina los dos. No se cambian salvo que ella lo pida.
 *
 * El usuario de TikTok se mostraba como @gayosodelfi mientras su URL apuntaba a
 * @delfinagayos0. Ella confirmó que el correcto es @delfinagayos0, así que ahora los dos
 * campos dicen lo mismo.
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
    usuario: "@delfinagayos0",
    url: "https://www.tiktok.com/@delfinagayos0",
  },
];
