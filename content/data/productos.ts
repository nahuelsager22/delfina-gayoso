import type { ProductoSemilla } from "../types";

/**
 * Lo que te llevás a casa (tipo D). Sin campos de catálogo (B3 §4-D); la web no monta
 * carrito (B3 §7). Se muestra en "Lo que te podés llevar".
 *
 * Bloque 8 · 17ª ola: **las CLASES se fueron de acá.** Pasaron a ser `Experiencia`
 * (`content/data/experiencias.ts`), porque una clase es una fecha concreta —con lugar,
 * cupo y estado— y un ebook no. `Producto` queda para lo que se descarga y queda: los
 * ebooks. La familia `clase-*` se conserva en el tipo por si un documento viejo del CMS
 * todavía la usa, pero el recorrido ya no la lee.
 *
 * Bloque 8 · 10ª ola (decisión de Delfina): se quitó el ebook hecho con Florencia. Queda
 * "Masas Quebradas" como ebook real; el grupo cierra con un aviso de que el catálogo
 * sigue creciendo (lo renderiza el momento, no es un producto).
 *
 * PLATAFORMA AGNÓSTICA (Bloque 8): `destino` es sólo una URL (o un contacto directo).
 * Cambiar de plataforma es cambiar la URL, sin tocar la arquitectura.
 */
export const productos: readonly ProductoSemilla[] = [
  {
    id: "masas-quebradas",
    titulo: "Masas Quebradas",
    descripcion:
      "Me gusta compartir lo que fui aprendiendo en la cocina, y esta es mi manera de acompañarte si estás empezando o si, como yo, siempre querés saber un poco más. Junté todo lo que sé sobre masas quebradas para que lo tengas ordenado y a mano.",
    queTeLlevas: [
      "Tipos de masas quebradas",
      "Métodos de preparación, fonzado y cocción ",
      "Tips y recomendaciones ",
      "Recetas básicas y apenas avanzadas para seguir practicando",
    ],
    formato: "ebook en PDF",
    precio: "$15.000",
    destino:
      "https://hotmart.com/es/marketplace/productos/ebook-masas-quebradas-by-delfina-gayoso/T92555721V",
    imagen: "cover-masas-quebradas",
    disponibilidad: "disponible",
  },
];
