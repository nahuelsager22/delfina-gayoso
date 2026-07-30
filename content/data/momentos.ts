import type { Momento } from "../types";

/**
 * Los momentos del recorrido (B3 §1).
 *
 * Bloque 8 · 10ª ola — RECORRIDO REESTRUCTURADO (decisión de Delfina). Se acorta a
 * SEIS secciones para una experiencia más breve y directa, con menos texto y más foco
 * en lo que hoy representa su actividad.
 *
 * Bloque 8 · 22ª ola — NUEVO ORDEN (decisión de Delfina, tras ver el sitio). El costado
 * PROFESIONAL sube: una marca que entra tiene que encontrar las colaboraciones y la
 * invitación a trabajar juntos sin atravesar antes toda la propuesta educativa.
 *
 *   1. Quién soy            — bienvenida BREVE y cercana ("Hola, soy Delfi"), arriba de
 *                             todo. Ya no es una bio: reemplaza a "Quién cocina".
 *   2. Umbral               — la propuesta de valor, con el plato que apetece.
 *   3. Marcas con las que colaboro — la confianza que ya existe (SUBE: antes iba 4ª).
 *   4. Trabajemos juntos    — servicios profesionales para empresas/organizaciones
 *                             (SUBE: antes iba 5ª). Es la consecuencia directa de las
 *                             marcas: primero quién confía, después cómo sumarse.
 *   5. Lo que te llevás     — toda la propuesta educativa: ebooks + clases (BAJA: antes
 *                             iba 3ª). Sigue siendo el corazón del sitio para la persona
 *                             que viene a cocinar; ahora llega después del giro pro.
 *   6. La clase no termina  — el cierre, en su voz.
 *
 * El arco se lee en dos mitades con una bisagra: reconocimiento (1–2) → trabajo (3–4) →
 * aprendizaje (5) → pertenencia (6). El pivote de "para tu marca" a "para vos" ocurre
 * entre 4 y 5, y lo dice el propio texto que abre "Lo que te llevás".
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
    id: "marcas",
    nombre: "Marcas con las que colaboro",
    intencionEmocional:
      'confianza. "Trabaja con marcas de verdad; esto es serio y puedo sumarme."',
    fase: "descubrimiento",
    orden: 3,
    ritmoPrevisto: "silencio",
    navLabel: "Marcas",
    atmosfera: "marcas",
  },
  {
    id: "trabajemos-juntos",
    nombre: "Trabajemos juntos",
    intencionEmocional:
      'invitación profesional clara. "Esto también se puede hacer con ella, para mi empresa."',
    fase: "descubrimiento",
    orden: 4,
    ritmoPrevisto: "denso",
    navLabel: "Trabajemos",
    atmosfera: "fresca",
  },
  {
    id: "lo-que-te-llevas",
    nombre: "Lo que te podés llevar",
    intencionEmocional:
      'toda la propuesta educativa junta. "Esto es lo que puedo aprender con ella: ebooks y clases."',
    fase: "pertenencia",
    orden: 5,
    ritmoPrevisto: "denso",
    navLabel: "Aprender",
    atmosfera: "calida",
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
