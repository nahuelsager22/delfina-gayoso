import type { ExperienciaSemilla } from "../types";

/**
 * Experiencias — las fechas concretas de cocinar con Delfina (tipo K, Bloque 8 · 17ª ola).
 *
 * MIGRACIÓN: las dos clases que vivían en `productos.ts` (`clases-presenciales` y
 * `clases-online`) se mudaron acá con su contenido intacto. Lo único que cambia es que
 * la fecha dejó de ser una frase dentro de `formato` y pasó a ser un dato con zona
 * horaria: de ahí salen el orden, el estado y el archivo de calendario.
 *
 * DATOS REALES PENDIENTES DE DELFINA: nombre definitivo, fechas siguientes, dirección
 * exacta, cupo, precio y a dónde va "Reservar" (WhatsApp, mail o link de pago). Cuando
 * los cargue en el Studio, esta semilla queda sólo como respaldo.
 */
export const experiencias: readonly ExperienciaSemilla[] = [
  {
    /**
     * CONTENIDO DE EJEMPLO (Bloque 8 · 20ª ola). Delfina todavía no dio su próxima fecha
     * y sin ninguna experiencia futura el módulo de invitación no se muestra —es su
     * comportamiento correcto, pero deja sin evaluar la pieza—. Esta clase es ficticia y
     * está para poder mirar jerarquía, composición, ritmo y responsive. Se reemplaza
     * cargando la fecha real en el Studio, o se borra de acá.
     *
     * Lleva `estado: "ultimos-lugares"` a propósito: es el único estado que empuja, y
     * conviene verlo funcionando.
     */
    id: "pastas-frescas",
    nombre: "Pastas frescas, de cero",
    modalidad: "presencial",
    inicio: "2026-08-15T11:00:00-03:00",
    fin: "2026-08-15T14:00:00-03:00",
    lugar: "9 de Julio, Pcia. Bs. As.",
    descripcion:
      "Amasamos, estiramos y comemos lo que hicimos. Se sale con harina hasta en los codos.",
    queTeLlevas: [
      "Masa base, sorrentinos y ñoquis de papa",
      "Dos salsas simples para tener siempre a mano",
      "Te llevás a casa la pasta que amasaste",
    ],
    precio: "$38.000",
    estado: "ultimos-lugares",
    ctaLabel: "Reservar tu lugar",
    destino: "mailto:gayosodelfina@gmail.com",
    imagen: "manos-masa",
    historia:
      "Empezamos con la masa en la mesa y las manos limpias, y de ahí en más ya no hay vuelta atrás. Amasamos, dejamos descansar, y mientras tanto armamos las salsas. Cuando la pasta está lista la cocinamos y nos sentamos a comerla juntos, que para mí es la mejor parte de la clase.",
    publicada: "2026-07-29T10:00:00-03:00",
  },
  {
    id: "clase-team-salado",
    nombre: "Clase de cocina",
    modalidad: "presencial",
    // Zona horaria explícita: el sitio se lee desde cualquier lado y el calendario del
    // visitante tiene que recibir la hora correcta, no la suya.
    //
    // Es la clase REAL de Delfina. Cuando su fecha pase, la experiencia se marca
    // "finalizada" sola: sale del módulo de invitación, entra en el archivo de
    // `/experiencias`, y la siguiente en agenda toma su lugar. Nadie tiene que tocar nada.
    inicio: "2026-07-28T16:00:00-03:00",
    fin: "2026-07-28T18:00:00-03:00",
    lugar: "9 de Julio, Pcia. Bs. As.",
    descripcion: "Esta vez, team salado!",
    queTeLlevas: [
      "Para niños y niñas a partir de 6 años",
      "Elaborás y te llevás a casa: Pizza, salchichitas envueltas y quesitas!",
      "Incluye material y recetario impreso",
    ],
    ctaLabel: "Escribime para coordinar",
    destino: "mailto:gayosodelfina@gmail.com",
    imagen: "manos-masa",
    publicada: "2026-07-24T12:00:00-03:00",
  },
  {
    id: "clases-en-vivo-online",
    nombre: "Clases en vivo, online",
    modalidad: "online",
    // Sin fecha todavía: se comunica como algo que viene, no como una cita.
    lugar: "Por videollamada, desde donde estés",
    descripcion:
      "Estoy preparando este espacio para cocinar juntos desde donde estés, sin importar la distancia. Muy pronto voy a abrir los primeros cupos.",
    queTeLlevas: [
      "Una clase en vivo, en grupo",
      "La receta antes de empezar y la grabación después",
      "Tus preguntas respondidas en el momento",
    ],
    estado: "proximamente",
    imagen: "cocina-al-fuego",
  },
];
