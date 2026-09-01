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
 *
 * NO HAY NINGUNA FECHA FUTURA, Y ES CORRECTO (Bloque 10 · E4). Acá vivía "Pastas frescas,
 * de cero", una clase FICTICIA que la 20ª ola había puesto para poder mirar la pieza de
 * invitación mientras Delfina no diera su próxima fecha. Se retiró de los dos lados —de
 * esta semilla y del dataset— porque el sitio no puede anunciar una clase que no existe:
 * alguien podía quedarse esperando algo que creyó reservado.
 *
 * Sin experiencia futura, el módulo de próxima experiencia no se muestra, el encabezado
 * de la sección 5 vuelve a "Lo que te podés llevar" y `/experiencias` queda con el
 * archivo y lo que viene. Ese estado está previsto y se ve terminado; no es un hueco.
 * Cuando Delfina dé su fecha real, alcanza con cargarla en el Studio.
 */
export const experiencias: readonly ExperienciaSemilla[] = [
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
