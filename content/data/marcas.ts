import type { Marca } from "../types";

/**
 * Marcas con las que colabora (tipo I) — Bloque 8 · 10ª ola (nueva sección).
 *
 * Muestra las empresas con las que Delfina trabaja habitualmente: genera confianza y
 * abre la puerta a futuras colaboraciones. NO es un portfolio corporativo: se integra al
 * universo visual del sitio (nombres compuestos en su tipografía, dentro de un bloque
 * editorial), no una grilla fría de logos.
 *
 * DATOS REALES PENDIENTES: Delfina dará las marcas reales (nombres, logos, links). Hoy
 * hay MARCADORES DE EJEMPLO (`borrador: true`), claramente identificables y fáciles de
 * reemplazar: cuando lleguen los logos reales se agrega `logo: "/marcas/…"` y se quita
 * `borrador`, sin tocar el componente.
 */
export const marcas: readonly Marca[] = [
  { id: "marca-1", nombre: "Marca uno", rubro: "cafetería de especialidad", borrador: true },
  { id: "marca-2", nombre: "Marca dos", rubro: "escuela de cocina", borrador: true },
  { id: "marca-3", nombre: "Marca tres", rubro: "productos gourmet", borrador: true },
  { id: "marca-4", nombre: "Marca cuatro", rubro: "espacio gastronómico", borrador: true },
];
