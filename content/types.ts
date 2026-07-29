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

/**
 * Identificador estable de cada momento.
 *
 * Bloque 8 · 10ª ola — REESTRUCTURA del recorrido (decisión de Delfina). El recorrido
 * se acorta a 6 secciones: umbral → quien-soy → lo-que-te-llevas → marcas →
 * trabajemos-juntos → la-clase-no-termina. `quien-soy` reemplaza a `quien-cocina` como
 * una bienvenida BREVE arriba de todo ("Hola, soy Delfi"). `columna-aprendizaje` y
 * `cocina-compartida` salen del recorrido pero se CONSERVAN en el tipo y en el código
 * (sus componentes ya no se montan) por si vuelven. `marcas` es la sección nueva.
 */
export type MomentoId =
  | "umbral"
  | "quien-soy"
  | "quien-cocina"
  | "columna-aprendizaje"
  | "lo-que-te-llevas"
  | "marcas"
  | "cocina-compartida"
  | "trabajemos-juntos"
  | "la-clase-no-termina"
  /**
   * Bloque 8 · 18ª ola — la página `/experiencias`. No es una parada del recorrido de la
   * home (no tiene entrada en `momentos.ts` ni aparece en el navbar): es otra habitación
   * de la misma casa. Existe como identificador para que su copy viva en el CMS, como el
   * del resto del sitio, y no fijo en el código.
   */
  | "experiencias"
  /** Bloque 8 · 19ª ola — la página `/colaboraciones`. Misma lógica que `experiencias`. */
  | "colaboraciones";

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
   D · Producto — lo que te llevás a casa: los EBOOKS.
   Bloque 8 · 21ª ola: se retiró `familia`. Existía para separar ebooks de clases dentro
   de este mismo tipo; desde que las clases son `Experiencia` (17ª ola), todos los
   productos son ebooks y el campo no distinguía nada.
   Sin campos de catálogo (SKU/stock/categorías/filtros): B3 §4-D.
   El precio es un dato de presentación (se muestra, no se opera): no hay
   carrito ni checkout, la compra ocurre en la plataforma de venta externa (B3 §7).
   Bloque 8: la web es AGNÓSTICA de plataforma —el destino es una URL cualquiera
   (Hotmart, Tienda Nube u otra); cambiar de plataforma es sólo cambiar la URL.
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
  /**
   * Precio listo para mostrar (ej. "$X", "Gratis"). Dato, no protagonista. Opcional
   * (Bloque 8 · 10ª ola): una clase presencial se coordina por contacto y una clase
   * online por lanzarse no tiene precio todavía.
   */
  readonly precio?: string;
  /** Texto del CTA; por defecto "Llevátelo". Ej. "Reservar lugar" para una clase. */
  readonly ctaLabel?: string;
  /**
   * Destino de compra/reserva: URL de la plataforma de venta (agnóstica — Bloque 8).
   * La web no cobra; sólo enlaza a donde estén alojados los productos. Migrar de
   * plataforma (p. ej. Hotmart → Tienda Nube) es reemplazar esta URL, nada más.
   */
  readonly destino?: string;
  /**
   * Imagen real opcional; sin ella la ficha se sostiene con voz + aire (§8). Llega YA
   * RESUELTA desde la capa de acceso (Bloque 8 · 14ª ola): con archivos locales se
   * resuelve la referencia, y con el CMS se arma desde el asset subido. La interfaz
   * recibe siempre lo mismo y no sabe de dónde vino.
   */
  readonly imagen?: ImagenReal;
  /**
   * Contenido de EJEMPLO (Bloque 6.5): representa el ecosistema completo que la
   * web puede ofrecer (clases, tickets, propuestas), con datos ficticios claramente
   * identificables y fáciles de reemplazar. La UI lo marca visiblemente como ejemplo.
   */
  readonly borrador?: boolean;
  /**
   * Disponibilidad (Bloque 8 · 10ª ola). "proximamente" comunica una propuesta que
   * todavía no se lanzó (las clases en vivo online): se muestra como algo que viene,
   * sin CTA de compra ni precio obligatorio.
   */
  readonly disponibilidad?: "disponible" | "proximamente";
}

/* ============================================================================
   K · Experiencia — una FECHA concreta de cocinar con Delfina (Bloque 8 · 17ª ola).
   ----------------------------------------------------------------------------
   Antes las clases vivían como `Producto` y su fecha era una frase escrita a mano
   dentro de `formato` ("Martes 28/7 | 16:00hs | 9 de Julio"). Ese texto no se puede
   ordenar, no vence solo, no sabe si ya pasó y no puede generar un archivo de
   calendario. Por eso se separan:

     · `Producto`    → lo que te llevás a casa (ebooks).
     · `Experiencia` → una fecha concreta con ella: presencial u online.

   Con la fecha como DATO, el sitio sabe cuál es la próxima, cuáles ya pasaron y qué
   estado le corresponde a cada una, sin que nadie lo mantenga a mano.
   ========================================================================= */
export type ModalidadExperiencia = "presencial" | "online";

/**
 * Lo que sólo Delfina sabe y el sitio no puede deducir. Todo lo demás se deriva de la
 * fecha (ver `content/estados.ts`): por eso el valor por defecto es `"automatico"`.
 */
export type EstadoDeclarado =
  | "automatico"
  | "proximamente"
  | "ultimos-lugares"
  | "completa";

/** Estado efectivo que la interfaz muestra: lo declarado + lo derivado de la fecha. */
export type EstadoExperiencia =
  | "nueva"
  | "proximamente"
  | "ultimos-lugares"
  | "completa"
  | "abierta"
  | "finalizada";

export interface Experiencia {
  readonly id: string;
  /** Cómo la nombra ella (ej. "Clase de cocina · team salado"). */
  readonly nombre: string;
  readonly modalidad: ModalidadExperiencia;
  /**
   * Comienzo, en ISO 8601 CON zona horaria (ej. "2026-07-28T16:00:00-03:00"). Sin
   * fecha, la experiencia se comunica como algo que viene ("Próximamente") y queda
   * fuera del módulo de invitación: no hay fecha que invitar todavía.
   */
  readonly inicio?: string;
  /** Fin, mismo formato. Sin él se asume una duración de dos horas. */
  readonly fin?: string;
  /** Lugar en su lenguaje (ej. "9 de Julio, Pcia. Bs. As.", "Por videollamada"). */
  readonly lugar?: string;
  /** Dirección exacta, si la hay: es lo que viaja al calendario del visitante. */
  readonly direccion?: string;
  /** En su voz, breve: la gente no lee, así que acá se sugiere, no se explica. */
  readonly descripcion: string;
  readonly queTeLlevas: readonly string[];
  readonly precio?: string;
  /** Texto de la acción; por defecto "Reservar tu lugar". */
  readonly ctaLabel?: string;
  /** Dónde se reserva: link de pago, WhatsApp o mailto. */
  readonly destino?: string;
  readonly estado?: EstadoDeclarado;
  /** Foto de la experiencia. Llega YA RESUELTA desde la capa de acceso. */
  readonly imagen?: ImagenReal;
  /**
   * Información ampliada (Bloque 8 · 18ª ola): cómo es realmente estar ahí. Vive en la
   * página de experiencias, no en el recorrido —en la home la fecha invita, acá se
   * cuenta—. Opcional: sin ella la ficha se sostiene con la descripción breve.
   */
  readonly historia?: string;
  /**
   * Fotos de la experiencia (18ª ola). Se llenan DESPUÉS de que sucede: son la prueba de
   * cómo fue. Vacía, la composición se dibuja igual (ver `EspacioFoto`).
   */
  readonly galeria?: readonly ImagenReal[];
  /**
   * Loop corto de la experiencia (18ª ola). MEJORA PROGRESIVA sobre `imagen`, que sigue
   * siendo el poster y el respaldo: se integra con `VideoMarco`, respeta
   * `prefers-reduced-motion` y carga al entrar en viewport. Loops livianos y sin audio;
   * un video largo no va acá.
   */
  readonly video?: string;
  /**
   * Cuándo se publicó (ISO). Sirve para el estado "Nueva"; en el CMS lo aporta la
   * fecha de creación del documento, así que nadie tiene que cargarlo.
   */
  readonly publicada?: string;
}

/** Como la semilla local escribe las imágenes por referencia (igual que `Producto`). */
export type ExperienciaSemilla = Omit<Experiencia, "imagen" | "galeria"> & {
  readonly imagen?: ImagenRealRef;
  readonly galeria?: readonly ImagenRealRef[];
};

/* ============================================================================
   J · Budín — el perro de Delfina, compañero del recorrido (Bloque 8 · 13ª ola).
   Deja de ser una ilustración decorativa y pasa a ser un pequeño personaje que
   acompaña la navegación: saluda al pasar el mouse y suelta una frase al azar al
   tocarlo. Su voz vive acá (contenido), no en la interfaz.
   ========================================================================= */
export interface VozBudin {
  /** Lo que dice al pasar el mouse (invita a tocarlo). */
  readonly saludo: string;
  /** Frases que suelta al azar. Sumar una es agregar una línea a este arreglo. */
  readonly frases: readonly string[];
}

/**
 * La semilla local se escribe con la imagen POR REFERENCIA (más cómoda de mantener a
 * mano); la capa de acceso la resuelve antes de entregarla a la interfaz.
 */
export type ProductoSemilla = Omit<Producto, "imagen"> & {
  readonly imagen?: ImagenRealRef;
};

/* ============================================================================
   I · Marca con la que colabora (Bloque 8 · 10ª ola) — confianza, no portfolio.
   Muestra las empresas con las que Delfina trabaja habitualmente. Integrada al
   universo visual (no una grilla corporativa de logos). Datos reales PENDIENTES
   de Delfina; hoy hay marcadores de ejemplo (`borrador`).
   ========================================================================= */
/**
 * Logotipo de una marca (Bloque 8 · 19ª ola). Lleva sus dimensiones porque el sitio lo
 * dibuja como MÁSCARA a tinta única —el color lo pone la paleta, no el archivo—, y para
 * eso necesita saber la proporción de la caja que va a enmascarar.
 */
export interface LogoMarca {
  readonly src: string;
  readonly ancho: number;
  readonly alto: number;
}

export interface Marca {
  readonly id: string;
  /** Nombre de la marca, tal como se escribe. */
  readonly nombre: string;
  /** Rubro breve (ej. "cafetería", "escuela de cocina"), opcional. */
  readonly rubro?: string;
  /** Logo real cuando exista; sin él, se muestra el nombre compuesto. */
  readonly logo?: LogoMarca;
  /** Usuario de Instagram tal como se muestra (ej. "@buffalo.arg"). */
  readonly handle?: string;
  /** Sitio/redes de la marca, opcional. */
  readonly url?: string;
  /* --- La colaboración contada (19ª ola): una relación, no un logo en una grilla. --- */
  /** Qué hacen juntos, en una línea. */
  readonly descripcion?: string;
  /** Cómo empezó y cómo sigue, en su voz. */
  readonly historia?: string;
  /** Qué salió de eso: piezas, recetas, eventos. Uno por línea, concreto. */
  readonly resultados?: readonly string[];
  /** Fotografía de la colaboración. Sin ella, la composición se dibuja igual. */
  readonly imagen?: ImagenReal;
  /** Loop corto, como en las experiencias: mejora progresiva sobre la fotografía. */
  readonly video?: string;
}

/** La semilla local escribe la fotografía por referencia (igual que `Producto`). */
export type MarcaSemilla = Omit<Marca, "imagen"> & {
  readonly imagen?: ImagenRealRef;
};

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
  /** Retrato de Delfina (Bloque 8 · 10ª ola): protagonista, para el hero / bienvenida. */
  | "retrato"
  /** Plato terminado (Bloque 8 · 10ª ola): apetece, ancla la propuesta. */
  | "plato"
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
