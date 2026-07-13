import type { Momento } from "../types";

/**
 * Los 7 momentos del recorrido (B3 §1, reordenados en el Bloque 6.5 · R1).
 *
 * CAMBIO DE ORDEN (Bloque 6.5): la propuesta de valor pasa al frente y la historia
 * la acompaña, no la precede. El recorrido ya no abre con dos momentos
 * autobiográficos: abre invitando a aprender (M1) y muestra enseguida qué se lleva
 * el visitante —ebooks (M2) y la serie de aprendizaje (M3)— antes de contar la
 * historia (M4). "Enseñar > vender" ya no se sostiene por posición (retrasar el
 * comercio), sino por peso, ausencia de dominio comercial persistente y tono/encuadre
 * (todo lo comercial hereda la voz de la enseñanza). Ver arquitectura §1 y §Integración
 * del negocio, reformuladas en este bloque.
 *
 * El `orden` gobierna el descenso (page.tsx encadena los momentos en este orden) y
 * el navbar de orientación (deriva sus destinos de `getMomentos()`). El `ritmoPrevisto`
 * alterna densidad y aire a lo largo del arco (S · D · D · S · D · S · S).
 */
export const momentos: readonly Momento[] = [
  {
    id: "umbral",
    nombre: "El umbral",
    intencionEmocional:
      'propuesta de valor con calidez. "Entré y enseguida entendí qué puedo aprender y llevarme acá."',
    fase: "reconocimiento",
    orden: 1,
    ritmoPrevisto: "silencio",
    atmosfera: "bienvenida",
  },
  {
    id: "lo-que-te-llevas",
    nombre: "Lo que te podés llevar",
    intencionEmocional:
      'deseo tranquilo y temprano, no presión. "Esto es lo que me puedo llevar para cocinar mejor."',
    fase: "descubrimiento",
    orden: 2,
    ritmoPrevisto: "denso",
    navLabel: "Ebooks",
    atmosfera: "calida",
  },
  {
    id: "columna-aprendizaje",
    nombre: "La columna del aprendizaje",
    intencionEmocional:
      'descubrimiento acompañado. "Así enseña, paso a paso, y da ganas de seguir."',
    fase: "descubrimiento",
    orden: 3,
    ritmoPrevisto: "denso",
    navLabel: "Aprender",
    atmosfera: "corazon",
  },
  {
    id: "quien-cocina",
    nombre: "Quién está cocinando",
    intencionEmocional:
      'la confianza se afirma. "Sé quién me enseña, me habla de igual a igual y sabe de lo que habla."',
    fase: "descubrimiento",
    orden: 4,
    // "silencio": un respiro que cambia el registro —de la oferta a la persona—
    // antes de la historia. El aire lo da el contenedor de momento (§7.5).
    ritmoPrevisto: "silencio",
    navLabel: "Quién soy",
    atmosfera: "intima",
  },
  {
    id: "trabajemos-juntos",
    nombre: "Trabajemos juntos",
    intencionEmocional:
      'solidez profesional sin giro corporativo. "Esto también se puede hacer con ella."',
    fase: "pertenencia",
    orden: 5,
    ritmoPrevisto: "denso",
    navLabel: "Trabajemos",
    atmosfera: "fresca",
  },
  {
    id: "cocina-compartida",
    nombre: "La cocina compartida",
    intencionEmocional:
      'calidez, humor, pertenencia incipiente. "Hay una persona joven acá, y da ganas de ser parte."',
    fase: "pertenencia",
    orden: 6,
    ritmoPrevisto: "silencio",
    atmosfera: "compartir",
  },
  {
    id: "la-clase-no-termina",
    nombre: "La clase no termina",
    intencionEmocional:
      'pertenencia plena, sin cierre de venta. "Quiero cocinar algo / quiero seguir esto."',
    fase: "pertenencia",
    orden: 7,
    ritmoPrevisto: "silencio",
    atmosfera: "despedida",
  },
];
