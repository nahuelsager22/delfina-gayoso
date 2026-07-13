import { getProductos } from "@/content";
import { Momento } from "../_patrones/Momento";
import { FichaProducto } from "../_patrones/FichaProducto";

/**
 * Momento 4 — Lo que te podés llevar (arquitectura §1). El producto (los dos
 * ebooks reales de Hotmart) como CONTINUACIÓN del enseñar, no como tienda.
 *
 *  · Transición 3→4 sin quiebre (§3.3): este momento es "denso", igual que el
 *    aprendizaje, así que el contenedor le da el mismo ritmo vertical. No hay
 *    título de sección visible ni cambio de registro: lo primero que se lee es su
 *    voz en serif (la descripción), de modo que "acá empieza lo comercial" no se
 *    delata. Hereda la temperatura del pasillo.
 *  · Sin grilla, sin aspect ratios uniformes, sin precio protagonista: cada ebook
 *    es una HABITACIÓN (§7.1) que se apoya en su propio espacio, separada de la
 *    otra por `--space-3xl` (son cuartos, no celdas de una fila). Alternan lado.
 *  · El peso sigue en enseñar: dos fichas, tarde en el descenso, sin dominio
 *    comercial persistente (no hay nav "Shop" ni carrito, §3.3).
 *
 * Los productos se leen vía `@/content`; los `destinoHotmart` son placeholders
 * hasta que lleguen los enlaces reales (el CTA ya queda listo para funcionar).
 */
export function LoQueTeLlevas() {
  const productos = getProductos();

  return (
    <Momento id="lo-que-te-llevas">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-3xl)",
        }}
      >
        {productos.map((p, i) => (
          <FichaProducto
            key={p.id}
            producto={p}
            ancla={i % 2 === 1 ? "der" : "izq"}
          />
        ))}
      </div>
    </Momento>
  );
}
