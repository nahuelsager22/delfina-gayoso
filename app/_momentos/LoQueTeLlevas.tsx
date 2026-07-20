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
  // 8ª ola: los EBOOKS y las CLASES EN VIVO son dos propuestas distintas y se separan.
  // Los ebooks abren el bloque; la clase en vivo cierra con identidad propia (su propia
  // superficie, rótulo y aire), para que se identifique rápido sin competir con ellos.
  const esClase = (formato: string) => formato.toLowerCase().includes("clase");
  const ebooks = productos.filter((p) => !esClase(p.formato));
  const clases = productos.filter((p) => esClase(p.formato));

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
        {ebooks.map((p, i) => (
          <FichaProducto
            key={p.id}
            producto={p}
            ancla={i % 2 === 1 ? "der" : "izq"}
          />
        ))}
      </div>

      {/* La clase en vivo: su propia superficie dentro del bloque, con rótulo propio.
          Se diferencia de los ebooks (otra cosa: sucede en vivo, con ella).
          9ª ola: la ficha NO repite su categoría —el rótulo del bloque ya dice "En
          vivo, conmigo" y el título ya dice "Clase en vivo: …"—; queda un solo nivel. */}
      {clases.length > 0 && (
        <div className="bloque-clases">
          <p className="momento-kicker bloque-clases-rotulo">En vivo, conmigo</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2xl)",
            }}
          >
            {clases.map((p) => (
              <FichaProducto
                key={p.id}
                producto={p}
                ancla="izq"
                mostrarCategoria={false}
              />
            ))}
          </div>
        </div>
      )}
    </Momento>
  );
}
