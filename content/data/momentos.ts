import type { Momento } from "../types";

/**
 * Los momentos del recorrido (B3 §1).
 *
 * Bloque 8 · 10ª ola — RECORRIDO REESTRUCTURADO (decisión de Delfina). Se acorta a
 * SEIS secciones para una experiencia más breve y directa, con menos texto y más foco
 * en lo que hoy representa su actividad:
 *
 *   1. Umbral               — la entrada.
 *   2. Quién soy            — bienvenida BREVE y cercana ("Hola, soy Delfi"), arriba de
 *                             todo. Ya no es una bio: reemplaza a "Quién cocina" y sube.
 *   3. Lo que te llevás     — toda la propuesta educativa: ebooks + clases (presenciales
 *                             y, próximamente, en vivo online).
 *   4. Marcas con las que colaboro — confianza a través de sus colaboraciones (nueva).
 *   5. Trabajemos juntos    — servicios profesionales para empresas/organizaciones
 *                             (ya NO propuestas educativas: eso vive en "Lo que te llevás").
 *   6. La clase no termina  — el cierre, en su voz.
 *
 * Salen del recorrido (se conservan en el código, no se montan): "La columna del
 * aprendizaje" (con la serie Cocina Nivel 0) y "La cocina compartida". Delfina considera
 * que hoy no son prioridad. Sus componentes y datos siguen existiendo por si vuelven.
 *
 * El `orden` gobierna el descenso y el navbar (deriva sus destinos de `getMomentos()`).
 */
export const momentos: readonly Momento[] = [
  {
    // 11ª ola: la BIENVENIDA de Delfina abre el sitio (primer contacto humano) y el
    // umbral —la propuesta de valor— la sigue. Introducción más cálida y natural.
    id: "quien-soy",
    nombre: "Quién soy",
    intencionEmocional:
      'primer contacto cálido. "Hola, soy Delfi" — una presentación simple, sin bio.',
    fase: "reconocimiento",
    orden: 1,
    ritmoPrevisto: "silencio",
    navLabel: "Quién soy",
    atmosfera: "quien-soy",
  },
  {
    id: "umbral",
    nombre: "El umbral",
    intencionEmocional:
      'propuesta de valor con calidez. "Entré y enseguida entendí qué puedo aprender y llevarme acá."',
    fase: "reconocimiento",
    orden: 2,
    ritmoPrevisto: "silencio",
    atmosfera: "bienvenida",
  },
  {
    id: "lo-que-te-llevas",
    nombre: "Lo que te podés llevar",
    intencionEmocional:
      'toda la propuesta educativa junta. "Esto es lo que puedo aprender con ella: ebooks y clases."',
    fase: "descubrimiento",
    orden: 3,
    ritmoPrevisto: "denso",
    navLabel: "Aprender",
    atmosfera: "calida",
  },
  {
    id: "marcas",
    nombre: "Marcas con las que colaboro",
    intencionEmocional:
      'confianza. "Trabaja con marcas de verdad; esto es serio y puedo sumarme."',
    fase: "descubrimiento",
    orden: 4,
    ritmoPrevisto: "silencio",
    navLabel: "Marcas",
    atmosfera: "marcas",
  },
  {
    id: "trabajemos-juntos",
    nombre: "Trabajemos juntos",
    intencionEmocional:
      'invitación profesional clara. "Esto también se puede hacer con ella, para mi empresa."',
    fase: "pertenencia",
    orden: 5,
    ritmoPrevisto: "denso",
    navLabel: "Trabajemos",
    atmosfera: "fresca",
  },
  {
    id: "la-clase-no-termina",
    nombre: "La clase no termina",
    intencionEmocional:
      'pertenencia plena, sin cierre de venta. "Quiero cocinar algo / quiero seguir esto."',
    fase: "pertenencia",
    orden: 6,
    ritmoPrevisto: "silencio",
    atmosfera: "despedida",
  },
];
