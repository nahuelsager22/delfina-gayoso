import type { Producto } from "../types";

/**
 * Productos (tipo D). Sin campos de catálogo (B3 §4-D); la web no monta carrito
 * (B3 §7). Se muestran en "Lo que te podés llevar", temprano en el recorrido
 * (Bloque 6.5 · R1) y con presencia: cada ficha lleva su portada real como ancla.
 *
 * DATOS REALES — los dos ebooks: títulos, precios ($15.000 / $10.000), colaboración
 * con Florencia Depaoli, `destino` reales. Descripciones en su voz, PENDIENTES DE
 * VALIDACIÓN.
 *
 * PLATAFORMA AGNÓSTICA (Bloque 8): `destino` es sólo una URL. Hoy apunta a donde están
 * alojados los productos; si Delfina migra de plataforma (Tienda Nube u otra), se
 * reemplaza la URL sin tocar la arquitectura del sitio.
 *
 * CONTENIDO DE EJEMPLO (Bloque 6.5 · `borrador: true`): para que Delfina vea el
 * ecosistema completo (clases, tickets), se suma una clase ficticia claramente
 * marcada y fácil de reemplazar. No es un dato real: es un placeholder de la web.
 */
export const productos: readonly Producto[] = [
  {
    id: "masas-quebradas",
    titulo: "Masas Quebradas",
    descripcion:
      "Me gusta compartir lo que fui aprendiendo en la cocina, y esta es mi manera de acompañarte si estás empezando o si, como yo, siempre querés saber un poco más. Junté todo lo que sé sobre masas quebradas para que lo tengas ordenado y a mano.",
    queTeLlevas: [
      "Las técnicas de masa quebrada, paso a paso",
      "Mis tips para que no se te rompa ni se te encoja",
      "Recetas dulces y saladas para practicar",
    ],
    formato: "ebook en PDF",
    precio: "$15.000",
    destino:
      "https://hotmart.com/es/marketplace/productos/ebook-masas-quebradas-by-delfina-gayoso/T92555721V",
    imagen: "cover-masas-quebradas",
  },
  {
    id: "desayunos-meriendas-saludables",
    titulo: "Desayunos y Meriendas Saludables",
    descripcion:
      "Este lo hicimos con Florencia, que es nutricionista. Quisimos armar un recetario de desayunos y meriendas más completos y variados, porque son las comidas que arrancan el día y te dan energía. Hay opciones rápidas y otras más elaboradas, todas pensadas para que las disfrutes en tu casa.",
    queTeLlevas: [
      "Recetas de desayunos y meriendas nutritivas y ricas",
      "Opciones rápidas para todos los días y otras para cuando tenés tiempo",
      "La mirada de una nutricionista en cada receta",
    ],
    formato: "ebook en PDF",
    colaboradores: ["Florencia Depaoli, nutricionista"],
    precio: "$10.000",
    destino:
      "https://hotmart.com/es/marketplace/productos/recetario-desayunos-y-meriendas/C91567976W?sck=HOTMART_PRODUCT_PAGE",
    imagen: "cover-desayunos-meriendas",
  },
  {
    // EJEMPLO (borrador): representa "clases + tickets" del ecosistema. Ficticio,
    // marcado visiblemente y reemplazable por una clase/precio/enlace reales.
    id: "clase-en-vivo-pastas",
    titulo: "Clase en vivo: pastas caseras",
    descripcion:
      "Nos juntamos un rato a cocinar pastas desde cero, en vivo. Cocinás conmigo, me preguntás lo que quieras y te llevás la receta para repetirla las veces que quieras.",
    queTeLlevas: [
      "Una clase en vivo, en grupo chico",
      "La receta y la lista de materiales antes de empezar",
      "La grabación, por si te la querés volver a ver",
    ],
    formato: "clase en vivo por videollamada",
    precio: "$12.000",
    ctaLabel: "Reservar lugar",
    destino: "https://ejemplo.delfinagayoso.com/clase-pastas",
    borrador: true,
  },
];
