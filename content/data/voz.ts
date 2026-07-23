import type { VozDelfina } from "../types";

/**
 * Fragmentos en primera persona (tipo A). Son las piezas que hacen que Delfina
 * "hable" a lo largo del recorrido; van en serif (`--font-voz`).
 *
 * COPY PENDIENTE DE VALIDACIÓN DE DELFINA. Escrito como la mejor interpretación
 * de su voz a partir de la evidencia real: la descripción de su ebook
 * ("Me gusta mucho compartir lo que he aprendido… espero que te acompañe en cada
 * paso… seguir aprendiendo con errores y aciertos es lo más importante"), cálida y
 * profesional. No son citas literales salvo donde se indica.
 *
 * TONO (Bloque 6.5 — R2): joven, cercano, cálido, natural, con humor, pero SIN
 * apoyarse en la autocrítica constante ("me quemo", "me sale mal"). Un registro un
 * poco más profesional sin perder cercanía. Cada frase con una función clara
 * dentro del recorrido (orientar / mostrar valor / dar confianza / invitar); nada
 * de relleno de clima.
 *
 * NOTA sobre `pertenece: "libre"`: la capa de acceso (getVozDeMomento) devuelve
 * la voz de un momento MÁS toda la voz "libre". Por eso acá la voz está acotada
 * a su momento: una pieza "libre" aparecería en todos.
 */
export const voz: readonly VozDelfina[] = [
  /* ---- M1 · El umbral — entrada con propuesta de valor (Bloque 6.5 · R1) ----
     Ya no es una atmósfera autobiográfica: lo primero que se comunica es QUÉ puede
     aprender y llevarse quien visita, en su voz. La identidad acompaña (es ella,
     es cercana), no precede. */
  {
    id: "umbral-invitacion",
    texto:
      "Aprendé a cocinar conmigo. De lo más simple a eso que siempre quisiste animarte a hacer.",
    registro: "bienvenida",
    pertenece: "umbral",
    // Sin subrayado: la línea ilustrada debajo del titular ya aporta ese énfasis
    // gráfico (Bloque 8, 6ª ola) — se evita la redundancia visual.
  },
  {
    id: "umbral-oferta",
    texto:
      "Tengo recetas, ebooks y clases para acompañarte, empieces por donde empieces.",
    registro: "bienvenida",
    pertenece: "umbral",
  },

  /* ---- Quién soy — bienvenida BREVE arriba de todo (Bloque 8 · 10ª ola) ----
     Delfina pidió "algo más corto, como 'Hola, soy Delfi', arriba de todo". No es una
     biografía: es un saludo cercano que genera confianza en dos frases. MasterChef y el
     IAG asoman de paso, sin volverse currículum. La versión larga (quien-cocina) queda
     archivada por si vuelve. */
  {
    id: "quien-soy-hola",
    texto: "Hola, soy Delfi.",
    registro: "bienvenida",
    pertenece: "quien-soy",
  },
  {
    id: "quien-soy-presentacion",
    texto:
      "Cocino desde que tengo memoria. Pasé por MasterChef Argentina. Estudié y me recibí de Profesional Gastronómico en el IAG y hoy me dedico a esto: cocinar, enseñar y compartir todo lo que voy aprendiendo.",
    registro: "bienvenida",
    pertenece: "quien-soy",
    enfasis: "compartir todo lo que voy aprendiendo",
  },

  /* ---- Quién cocina (ARCHIVADO Bloque 8 · 10ª ola) — la bio larga que ya no se
     monta en el recorrido. Se conserva por si vuelve. ----
     Su voz, no un About. Autoridad deducida del hacer (estudia en el IAG, da
     clases); MasterChef sólo de paso, dentro de una frase que fluye. */
  {
    id: "quien-desde-siempre",
    texto:
      "Cocino desde que tengo memoria. Me apasiona la gastronomía, y hace tiempo decidí dedicarme a esto en serio.",
    registro: "reflexion",
    pertenece: "quien-cocina",
  },
  {
    // Actualizado (Bloque 6.5): ya es profesional, terminó la carrera. MasterChef
    // sigue de paso; hoy la define su presente (recibida, cocina, enseña, colabora).
    id: "quien-recorrido",
    texto:
      "La cocina siempre estuvo conmigo. En 2023 pasé por MasterChef Argentina, una experiencia que me abrió nuevas puertas para seguir creciendo. Estudié y me recibí de Profesional Gastronómico en el IAG. Hoy cocino, enseño y sigo formándome todos los días.",
    registro: "reflexion",
    pertenece: "quien-cocina",
  },
  {
    // Frase-columna del proyecto, casi literal del ebook "Masas Quebradas".
    id: "quien-comparto",
    texto:
      "Lo que más me gusta es compartir lo que voy aprendiendo. Con errores y aciertos: para mí, eso es lo más importante.",
    registro: "reflexion",
    pertenece: "quien-cocina",
  },

  /* ---- M6 · La cocina compartida — la frase que abre la comunidad ----
     Devuelve el foco a lo humano antes del racimo de vida real. */
  {
    id: "cocina-no-sola",
    texto:
      "Nada de esto lo hago sola. Siempre hay alguien dando vueltas por la cocina.",
    registro: "reflexion",
    pertenece: "cocina-compartida",
  },

  /* ---- M7 · La clase no termina — la salida en su voz, sin cierre de venta ----
     El arco cierra en pertenencia (B1): la clase abierta no se cierra, se continúa.
     Su calidez lleva el final, sin CTA agresivo ni footer corporativo. */
  {
    id: "cierre-no-termina",
    texto:
      "Esto no termina acá. Siempre hay algo nuevo para aprender, y me encanta que sea así.",
    registro: "cierre",
    pertenece: "la-clase-no-termina",
  },
  {
    id: "cierre-quedate",
    texto: "Así que quedate. La clase sigue abierta, y yo sigo cocinando.",
    registro: "cierre",
    pertenece: "la-clase-no-termina",
  },
  {
    // Lead-in a las redes: integra Instagram y TikTok de forma natural (R5),
    // diciendo dónde seguir. La renderiza el momento arriba de los enlaces.
    id: "cierre-seguir",
    texto: "Y si te quedaste con ganas, subo todo lo que cocino en Instagram y TikTok.",
    registro: "cierre",
    pertenece: "la-clase-no-termina",
  },
];
