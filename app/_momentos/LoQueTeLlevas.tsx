import { getProductos } from "@/content";
import { Momento } from "../_patrones/Momento";
import { FichaProducto } from "../_patrones/FichaProducto";

/**
 * Momento 2 — Lo que te podés llevar (arquitectura §1, orden Bloque 6.5). El producto
 * (los dos ebooks reales) como CONTINUACIÓN del enseñar, no como tienda.
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
 * Los productos se leen vía `@/content`; el `destino` de cada uno es una URL de la
 * plataforma de venta (agnóstica, Bloque 8): cambiar de plataforma es cambiar la URL.
 */
export function LoQueTeLlevas() {
  const productos = getProductos();

  return (
    <Momento
      id="lo-que-te-llevas"
      kicker="Ebooks y clases"
      titulo="Lo que te podés llevar"
    >
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
