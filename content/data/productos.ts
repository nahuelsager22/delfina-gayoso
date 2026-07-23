import type { Producto } from "../types";

/**
 * Propuesta educativa (tipo D). Sin campos de catálogo (B3 §4-D); la web no monta
 * carrito (B3 §7). Se muestra en "Lo que te podés llevar", que en el Bloque 8 · 10ª ola
 * concentra TODA la forma de aprender con Delfina: ebooks + clases.
 *
 * Bloque 8 · 10ª ola (decisión de Delfina):
 *  · EBOOKS — se quita el ebook hecho con Florencia. Queda "Masas Quebradas" como
 *    ebook real; la sección se reorganiza para la nueva cantidad y cierra con un
 *    aviso de que el catálogo sigue creciendo (lo renderiza el momento, no es un
 *    producto). `familia: "ebook"`.
 *  · CLASES — dos propuestas: PRESENCIALES (reales: hoy la contratan y dicta en
 *    distintos espacios) y, PRÓXIMAMENTE, clases en vivo ONLINE (se comunican como
 *    algo que viene, sin precio ni CTA de compra). `familia: "clase-presencial"` /
 *    `"clase-online"`, con `disponibilidad`.
 *
 * PLATAFORMA AGNÓSTICA (Bloque 8): `destino` es sólo una URL (o un contacto directo).
 * Cambiar de plataforma es cambiar la URL, sin tocar la arquitectura.
 */
export const productos: readonly Producto[] = [
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
    familia: "ebook",
    disponibilidad: "disponible",
  },
  {
    id: "clases-presenciales",
    titulo: "Clase de cocina",
    descripcion:
      "Esta vez, team salado!",
    queTeLlevas: [
      "Para niños y niñas a partir de 6 años",
      "Elaborás y te llevás a casa: Pizza, salchichitas envueltas y quesitas!",
      "Incluye material y recetario impreso",
    ],
    formato: "Martes 28/7 | 16:00hs | 9 de Julio Pcia. Bs. As.",
    ctaLabel: "Escribime para coordinar",
    destino: "mailto:gayosodelfina@gmail.com",
    imagen: "manos-masa",
    familia: "clase-presencial",
    disponibilidad: "disponible",
  },
  {
    id: "clases-online",
    titulo: "Muy pronto",
    descripcion:
      "Estoy preparando este espacio para cocinar juntos desde donde estés, sin importar la distancia. Muy pronto voy a abrir los primeros cupos. Una experiencia linda, simple y cercana. Muy pronto vas a poder sumarte a las primeras clases.",
    queTeLlevas: [
      "Una clase en vivo, en grupo",
      "La receta antes de empezar y la grabación después",
      "Tus preguntas respondidas en el momento",
    ],
    formato: "clase en vivo por videollamada",
    precio: "Muy pronto",
    imagen: "cocina-al-fuego",
    familia: "clase-online",
    disponibilidad: "proximamente",
  },
];
