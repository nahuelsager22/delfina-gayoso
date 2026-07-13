/**
 * Modelo de contenido desacoplado — esquema técnico de los 7 tipos de B3 §4.
 * -----------------------------------------------------------------------------
 * El contenido representa a Delfina; la interfaz representa la manera de
 * mostrarlo (Playbook IV). Viven separados: agregar un ebook, una clase, un
 * capítulo o una frase es agregar un objeto tipado acá, sin tocar `app/`.
 *
 * Decisión de enfoque (Bloque 5): archivos tipados locales, NO headless CMS.
 * Ver `content/README.md` para la justificación. La interfaz nunca importa
 * estos módulos de datos directamente: los consume a través de la capa de
 * acceso (`content/index.ts`), que es el límite de desacople. Cambiar la fuente
 * (local → CMS) mañana sería reescribir esa capa, no la interfaz.
 *
 * Ausencia deliberada de campos de catálogo (SKU, stock, categorías, filtros):
 * esos campos *fabrican* la lógica de tienda que el proyecto evita (B3 §4-D).
 * Su ausencia es una decisión de identidad, no un olvido.
 */

/** Fase del arco reconocimiento → descubrimiento → pertenencia (B1, B3 §1). */
export type FaseArco = "reconocimiento" | "descubrimiento" | "pertenencia";

/** Identificador estable de cada uno de los 7 momentos del descenso. */
export type MomentoId =
  | "umbral"
  | "quien-cocina"
  | "columna-aprendizaje"
  | "lo-que-te-llevas"
  | "cocina-compartida"
  | "trabajemos-juntos"
  | "la-clase-no-termina";

/* ============================================================================
   A · Voz de Delfina — fragmentos en primera persona (los que van en serif).
   ========================================================================= */
export type RegistroVoz = "reflexion" | "humor" | "bienvenida" | "cierre";

export interface VozDelfina {
  readonly id: string;
  /** El texto, tal como ella lo diría. Sin comillas decorativas. */
  readonly texto: string;
  readonly registro: RegistroVoz;
  /** A qué momento pertenece, o `"libre"` si puede aparecer en cualquiera. */
  readonly pertenece: MomentoId | "libre";
  /**
   * Fragmento del `texto` a resaltar con un subrayado a mano (Bloque 6.5). Debe
   * ser una subcadena literal del texto; si no aparece, no se resalta nada.
   */
  readonly enfasis?: string;
}

/* ============================================================================
   B · Momento del recorrido — cada parada del descenso.
   ========================================================================= */
export type RitmoMomento = "denso" | "silencio";

export interface Momento {
  readonly id: MomentoId;
  /** Nombre interno (ej. "El umbral"). No necesariamente visible. */
  readonly nombre: string;
  readonly intencionEmocional: string;
  readonly fase: FaseArco;
  /** Orden en el descenso (1–7). */
  readonly orden: number;
  readonly ritmoPrevisto: RitmoMomento;
  /**
   * Etiqueta corta para el navbar de orientación (ej. "Ebooks", "Aprender").
   * Sólo los momentos con `navLabel` aparecen en el navbar; el resto se alcanza
   * descendiendo (Bloque 6.5 · R6). Es navegación, no el nombre poético del momento.
   */
  readonly navLabel?: string;
  /**
   * Qué ATMÓSFERA usa la sección (Bloque 6.5 · Sistema de Atmósferas). Es sólo una
   * declaración: la definición (colores, intensidad, radio…) vive centralizada en
   * `app/_chrome/atmosferas/config.ts`. El contenido no conoce colores.
   */
  readonly atmosfera?: string;
}

/* ============================================================================
   C · Pieza de aprendizaje / capítulo — la unidad de enseñanza.
   ========================================================================= */
export type MedioAprendizaje = "video-propio" | "foto" | "texto";

export interface PiezaAprendizaje {
  readonly id: string;
  /** El hito tal como ella lo escribe: "#01", "NIVEL 0". */
  readonly numeral: string;
  readonly titulo: string;
  /** Descripción breve (teaser en su voz). Se ve siempre. */
  readonly queEnsena: string;
  /**
   * Caption completo del reel, tal como lo escribió en Instagram (su voz real).
   * Se despliega con "Leer más" (Bloque 6.5 · R7, Opción C). Opcional: sin él,
   * el capítulo se sostiene con la descripción breve.
   */
  readonly caption?: string;
  /** Enlace al Reel de Instagram, para continuar la serie en la plataforma. */
  readonly enlaceReel?: string;
  /** Nivel o dificultad en su propio lenguaje (ej. "nivel 0", "básico"). */
  readonly nivel?: string;
  readonly medio: MedioAprendizaje;
  /** Orden o relación con otras piezas; menor = antes en la serie. */
  readonly orden?: number;
}

/* ============================================================================
   C.bis · Serie de aprendizaje — agrupa las piezas en una serie con identidad
   (Bloque 6.5 · R7): Aprendizaje deja de ser una lista y se percibe como serie.
   ========================================================================= */
export interface SerieAprendizaje {
  readonly id: string;
  /** Nombre de la serie tal como ella lo usa (ej. "Cocina Nivel 0"). */
  readonly titulo: string;
  /** Premisa de la serie, en su voz (por qué existe). */
  readonly premisa: string;
}

/* ============================================================================
   D · Producto — ebook, ticket de clase.
   Sin campos de catálogo (SKU/stock/categorías/filtros): B3 §4-D.
   El precio es un dato de presentación (se muestra, no se opera): no hay
   carrito ni checkout, la compra ocurre en Hotmart (B3 §7).
   ========================================================================= */
export interface Producto {
  readonly id: string;
  readonly titulo: string;
  /** Descripción en su voz (serif, primera persona). */
  readonly descripcion: string;
  /** Qué te llevás / vas a aprender. */
  readonly queTeLlevas: readonly string[];
  /** Formato en su lenguaje (ej. "ebook PDF", "clase en vivo"). */
  readonly formato: string;
  /** Colaboradores, en primera persona plural cuando corresponda (ej. Florencia). */
  readonly colaboradores?: readonly string[];
  /** Precio listo para mostrar (ej. "$X", "Gratis"). Dato, no protagonista. */
  readonly precio: string;
  /** Texto del CTA; por defecto "Llevátelo". Ej. "Reservar lugar" para una clase. */
  readonly ctaLabel?: string;
  /** Destino de compra/reserva. La web no cobra. */
  readonly destinoHotmart: string;
  /** Imagen real opcional; sin ella la ficha se sostiene con voz + aire (§8). */
  readonly imagen?: ImagenRealRef;
  /**
   * Contenido de EJEMPLO (Bloque 6.5): representa el ecosistema completo que la
   * web puede ofrecer (clases, tickets, propuestas), con datos ficticios claramente
   * identificables y fáciles de reemplazar. La UI lo marca visiblemente como ejemplo.
   */
  readonly borrador?: boolean;
}

/* ============================================================================
   E · Propuesta de servicio — colaboración, asesoría, propuesta abierta.
   Sin tarifas ni paquetes: es invitación, no tarifario (B3 §4-E, §3.2).
   ========================================================================= */
export interface PropuestaServicio {
  readonly id: string;
  /** Tipo (ej. "colaboración en redes", "asesoría gastronómica"). */
  readonly tipo: string;
  readonly aQuienLeSirve: string;
  /** Cómo es trabajar con ella, en su voz. */
  readonly comoEsTrabajar: string;
  /** Cómo iniciar el contacto: invitación abierta, accesos directos claros. */
  readonly contacto: ContactoServicio;
  /** Contenido de EJEMPLO (ver `Producto.borrador`). */
  readonly borrador?: boolean;
}

export type MedioContacto = "email" | "instagram" | "whatsapp";

/** Un acceso de contacto directo (no captación de leads, §7.2). */
export interface CanalContacto {
  readonly medio: MedioContacto;
  /** Destino del medio (mailto:…, URL de Instagram, etc.). */
  readonly destino: string;
}

/**
 * Contacto del servicio: invitación abierta + accesos directos claros (Bloque 6.5
 * · R8 — antes era "un único medio"; ahora admite varios, p. ej. Instagram + email).
 * No es un formulario de captación de leads.
 */
export interface ContactoServicio {
  /** Frase suya que invita. */
  readonly invitacion: string;
  /** Accesos directos (uno o varios). */
  readonly canales: readonly CanalContacto[];
}

/* ============================================================================
   F · Imagen real — cuando exista material propio (autoría: siempre ella).
   El "tipo de gesto" existe porque la composición depende de él: una mano
   manda sobre la pantalla, una galletita es nota al pie (DA 6.2a).
   ========================================================================= */
export type TipoGesto =
  | "mano"
  | "proceso"
  | "comunidad"
  | "vida-real"
  /** Portada de producto (ebook/clase): contenido real, ancla de la ficha (B6.5 · R4). */
  | "portada";
export type OrientacionImagen = "vertical" | "horizontal" | "cuadrada";

export interface ImagenReal {
  readonly id: string;
  /** Ruta del asset dentro de /public. */
  readonly src: string;
  /** Texto alternativo: qué muestra. Obligatorio (accesibilidad). */
  readonly alt: string;
  readonly tipoGesto: TipoGesto;
  /** Define cómo puede desbordar la estructura (DA 6.2b). */
  readonly orientacion: OrientacionImagen;
  /** Dimensiones intrínsecas en px, para reservar espacio (evita layout shift). */
  readonly ancho?: number;
  readonly alto?: number;
}

/** Referencia liviana a una ImagenReal (por id) para no acoplar objetos. */
export type ImagenRealRef = ImagenReal["id"];

/* ============================================================================
   H · Red social — sus canales reales (Bloque 6.5 · R5).
   Instagram y TikTok se integran como contenido: aparecen en el navbar y en el
   cierre como formas naturales de seguir aprendiendo, no como métrica ni como
   mecanismo central de captación (siguen Fuera de v1 como pilar).
   ========================================================================= */
export type Plataforma = "instagram" | "tiktok";

export interface RedSocial {
  readonly id: string;
  readonly plataforma: Plataforma;
  /** Usuario tal como se muestra (ej. "@delfinagayoso"). */
  readonly usuario: string;
  readonly url: string;
}

/* ============================================================================
   G · Momento de comunidad / vida real — lo humano alrededor de la cocina.
   Modela el Momento 5 sin confundirlo con producto ni con enseñanza.
   ========================================================================= */
export interface MomentoComunidad {
  readonly id: string;
  /** Qué es (ej. "taller con chicos", "mate", "Budín", un trend con la mamá). */
  readonly que: string;
  readonly personas?: readonly string[];
  /** Registro: cómo se siente (ej. "humor", "calidez", "cotidiano"). */
  readonly registro: string;
  readonly imagen?: ImagenRealRef;
  /**
   * Pequeña ilustración del día a día que acompaña la viñeta (Bloque 6.5): cuenta
   * quién es sin explicarlo todo con palabras. Identificador de un motivo dibujado
   * (ver `IlustracionComunidad`): "mate", "huellas", "olla", "plato", "pantalla".
   */
  readonly ilustracion?: string;
}
