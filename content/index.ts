/**
 * Capa de acceso al contenido — el límite de desacople interfaz ↔ contenido.
 * -----------------------------------------------------------------------------
 * La interfaz (`app/`) importa SIEMPRE desde aquí, nunca desde `content/data/*` ni desde
 * `sanity/*`. Esa regla, sostenida desde el Bloque 5, es la que permitió que el Bloque 8
 * · 14ª ola conectara un CMS **sin tocar la interfaz**: cambió el origen del contenido,
 * no la web.
 *
 * CÓMO FUNCIONA AHORA
 *  1. Cada accessor consulta Sanity (ver `sanity/lib/queries.ts`).
 *  2. Si Sanity no responde, o todavía no tiene ese contenido, se devuelve la SEMILLA
 *     local de `content/data/*` — exactamente lo que el sitio mostraba antes.
 *
 * Ese respaldo es deliberado y es lo que vuelve la migración transparente: mientras el
 * dataset esté vacío el sitio se ve idéntico, y si Sanity llegara a fallar, la web sigue
 * publicada igual. La semilla también es el origen del script de carga inicial
 * (`scripts/seed-sanity.mjs`), que sube todo esto al CMS para que Delfi lo edite.
 *
 * Los accessors son ASÍNCRONOS porque la fuente ahora es remota. Los momentos son
 * server components, así que sólo agregan un `await`. Las dos piezas de cliente
 * (`Navbar`, `Budin`) reciben el contenido por props desde el layout.
 *
 * EXCEPCIÓN: `getAprendizaje`, `getSerie` y `getComunidad` siguen siendo locales y
 * síncronos. Alimentan secciones ARCHIVADAS (fuera del recorrido); si volvieran, se les
 * agrega su esquema y su consulta como al resto.
 */

import { consultar } from "@/sanity/lib/client";
import { aImagenReal, type ImagenSanity } from "@/sanity/lib/imagen";
import * as Q from "@/sanity/lib/queries";

import { momentos as semillaMomentos } from "./data/momentos";
import { voz as semillaVoz } from "./data/voz";
import { experiencias as semillaExperiencias } from "./data/experiencias";
import { aprendizaje } from "./data/aprendizaje";
import { serieActual } from "./data/series";
import { productos as semillaProductos } from "./data/productos";
import { servicios as semillaServicios } from "./data/servicios";
import { contacto as semillaContacto } from "./data/contacto";
import { marcas as semillaMarcas } from "./data/marcas";
import { imagenes as semillaImagenes } from "./data/imagenes";
import { comunidad } from "./data/comunidad";
import { redes as semillaRedes } from "./data/redes";
import { budin as semillaBudin } from "./data/budin";

import { esFutura } from "./estados";

import type {
  ContactoProfesional,
  Experiencia,
  ImagenReal,
  ImagenRealRef,
  Marca,
  Momento,
  MomentoComunidad,
  MomentoId,
  PiezaAprendizaje,
  Producto,
  PropuestaServicio,
  FraseBudin,
  GestoBudin,
  RedSocial,
  SerieAprendizaje,
  TipoGesto,
  VozBudin,
  VozDelfina,
} from "./types";

export type * from "./types";

/** Cómo se le pide a la CDN del CMS un asset en el tamaño en que se muestra. */
export { srcServido } from "./assets";

/** Reglas de estado de las experiencias: son del contenido, se leen desde `@/content`. */
export {
  admiteCalendario,
  admiteReserva,
  esFutura,
  estadoDeExperiencia,
  ETIQUETA_ESTADO,
  finDe,
} from "./estados";

/* ============================================================================
   Consultar el CMS, con la semilla local detrás.

   DOS RESPUESTAS QUE NO SIGNIFICAN LO MISMO (Bloque 10 · E3). Hasta acá las dos caían
   en la semilla:

     · `null`  — el CMS no respondió. Es una falla, y la semilla es la red de seguridad
                 que mantiene la web en pie. Se conserva tal cual.
     · `[]`    — el CMS respondió, y lo que dijo es que no hay ninguno. Es una respuesta
                 legítima, y tratarla como falla tenía una consecuencia grande:
                 **borrar desde el Studio no borraba**. Si Delfina eliminaba las tres
                 marcas, la home volvía a mostrar las tres de la semilla, y ella no tenía
                 forma de vaciar una sección sin pedirlo al estudio.

   El costo, dicho: mientras el dataset estuvo vacío, el sitio se veía idéntico al de la
   semilla. Esa propiedad fue deliberada y acá se reformula, porque el dataset ya está
   cargado y es el que manda (`docs/contenido.md`). Se comprobó antes de aplicarlo que
   ningún tipo estuviera vacío en el dataset, para no hacer desaparecer nada que hoy se ve.
   ========================================================================= */

/**
 * Contenido que Delfina administra: el CMS manda, incluso cuando dice que no hay nada.
 * Vaciar una colección desde el Studio es una operación legítima y el sitio la obedece.
 */
async function conRespaldo<Crudo, Salida>(
  query: string,
  mapear: (filas: Crudo[]) => Salida[],
  semilla: readonly Salida[],
): Promise<readonly Salida[]> {
  const filas = await consultar<Crudo[]>(query);
  if (!filas) return semilla;
  if (filas.length === 0) return [];
  try {
    return mapear(filas);
  } catch {
    return semilla;
  }
}

/**
 * Estructura del recorrido: la define la semilla y el CMS sólo la ajusta (orden, nombre
 * de menú). Un dataset sin secciones no significa "un sitio sin secciones" —significa que
 * todavía no se cargaron—, así que acá la lista vacía sí cae en la semilla. Es la
 * diferencia entre contenido que se administra y estructura que se configura.
 */
async function conRespaldoDeEstructura<Crudo, Salida>(
  query: string,
  mapear: (filas: Crudo[]) => Salida[],
  semilla: readonly Salida[],
): Promise<readonly Salida[]> {
  const filas = await consultar<Crudo[]>(query);
  if (!filas || filas.length === 0) return semilla;
  try {
    const mapeadas = mapear(filas);
    return mapeadas.length > 0 ? mapeadas : semilla;
  } catch {
    return semilla;
  }
}

/** Quita nulos que llegan del CMS, para no ensuciar el modelo con `null`. */
const limpio = <T>(v: T | null | undefined): T | undefined => v ?? undefined;
const lista = (v: readonly string[] | null | undefined): readonly string[] =>
  v ?? [];

/* ----------------------------------------------------------------------------
   Los valores de lista que llegan del CMS se COMPRUEBAN acá (Bloque 10 · E3).

   El tipo de TypeScript afirma que `estado` es un `EstadoExperiencia`, pero nadie lo
   verificaba: lo que dijera el dataset entraba y se propagaba. Y contenido y código se
   despliegan por separado, así que un valor que el esquema ya tiene y el código todavía
   no —o uno que se retiró y quedó cargado— es una situación normal, no un accidente.

   Lo que estaba en juego no era cosmético: un estado desconocido hacía que
   `admiteReserva` diera `false` y **desaparecía el botón de reservar**, sin ninguna
   señal. Alguien que quería anotarse a una clase abierta no encontraba cómo.

   El patrón ya existía en el proyecto —`aFrase`, para los gestos de Budín, con el mismo
   razonamiento escrito al lado—; acá se aplica al resto de los bordes.
   ---------------------------------------------------------------------------- */

/** Acepta el valor del CMS sólo si el código lo conoce; si no, el que se pase por defecto. */
function deLista<T extends string>(
  conocidos: readonly T[],
  valor: unknown,
): T | undefined;
function deLista<T extends string>(
  conocidos: readonly T[],
  valor: unknown,
  porDefecto: T,
): T;
function deLista<T extends string>(
  conocidos: readonly T[],
  valor: unknown,
  porDefecto?: T,
): T | undefined {
  return conocidos.find((c) => c === valor) ?? porDefecto;
}

/**
 * Los únicos estados que Delfina declara a mano. El resto —nueva, abierta, finalizada—
 * los deduce el sitio de la fecha, y "automatico" es justamente la ausencia de
 * declaración: entra como `undefined`, que es lo que significa.
 */
const ESTADOS_DECLARABLES = [
  "proximamente",
  "ultimos-lugares",
  "completa",
] as const satisfies readonly Experiencia["estado"][];

const MODALIDADES = ["presencial", "online"] as const;
const DISPONIBILIDADES = ["disponible", "proximamente"] as const;
const REGISTROS = ["bienvenida", "reflexion", "humor", "cierre"] as const;
const TIPOS_DE_GESTO = [
  "mano",
  "proceso",
  "comunidad",
  "vida-real",
  "retrato",
  "plato",
  "portada",
  "clase",
  "mesa",
] as const satisfies readonly TipoGesto[];

/* ---- Momentos (tipo B) ----------------------------------------------------
   El CMS gobierna el ORDEN y el nombre del menú; la ATMÓSFERA (color, ritmo visual)
   sigue viviendo en el código: es diseño, no contenido, y no debe poder romperse desde
   el panel. Se combinan por identificador. */
interface MomentoSanity {
  id: MomentoId;
  nombre?: string | null;
  orden?: number | null;
  navLabel?: string | null;
  ritmoPrevisto?: Momento["ritmoPrevisto"] | null;
}

export async function getMomentos(): Promise<readonly Momento[]> {
  const momentos = await conRespaldoDeEstructura<MomentoSanity, Momento>(
    Q.MOMENTOS,
    (filas) =>
      filas.flatMap((f): Momento[] => {
        const base = semillaMomentos.find((m) => m.id === f.id);
        if (!base) return [];
        return [
          {
            ...base,
            nombre: f.nombre ?? base.nombre,
            orden: f.orden ?? base.orden,
            navLabel: limpio(f.navLabel) ?? base.navLabel,
            ritmoPrevisto: f.ritmoPrevisto ?? base.ritmoPrevisto,
          },
        ];
      }),
    semillaMomentos,
  );
  return [...momentos].sort((a, b) => a.orden - b.orden);
}

export async function getMomento(id: MomentoId): Promise<Momento | undefined> {
  return (await getMomentos()).find((m) => m.id === id);
}

/* ---- Voz de Delfina (tipo A) ----------------------------------------------
   Único accessor con respaldo POR IDENTIFICADOR, no por colección (18ª ola). El resto
   del contenido son listas —las marcas del CMS son *todas* las marcas—, pero los textos
   los pide el sitio por id: cuando una sección nueva estrena su copy, ese texto todavía
   no existe en Sanity y la sección quedaría muda hasta re-sembrar (y re-sembrar pisa lo
   editado). Así, el CMS manda siempre sobre el texto que ya tiene, y la semilla sólo
   completa los que aún no subieron.

   POR ESO LA VOZ NO OBEDECE EL VACIADO, y es la única excepción (Bloque 10 · E3). Borrar
   un texto en el Studio no lo saca del sitio: la semilla lo repone, porque no hay forma
   de distinguir "Delfina lo borró" de "el código estrena un texto que el CMS todavía no
   tiene", y la segunda es la que rompe una página. Para quitar un texto del sitio se
   quita del componente, que es donde vive la decisión de que exista.

   Lo que sí tiene que valer, y vale, es que la ausencia de un texto NUNCA rompa la
   composición: cada consumidor lo trata como opcional. */
export async function getVoz(): Promise<readonly VozDelfina[]> {
  const delCms = await conRespaldo<VozDelfina, VozDelfina>(
    Q.VOCES,
    (filas) =>
      filas.map((f) => ({
        id: f.id,
        texto: f.texto,
        registro: deLista(REGISTROS, f.registro, "reflexion"),
        pertenece: f.pertenece,
        enfasis: limpio(f.enfasis),
      })),
    semillaVoz,
  );

  const cargados = new Set(delCms.map((v) => v.id));
  const faltantes = semillaVoz.filter((v) => !cargados.has(v.id));
  return faltantes.length === 0 ? delCms : [...delCms, ...faltantes];
}

export async function getVozDeMomento(
  id: MomentoId,
): Promise<readonly VozDelfina[]> {
  const voz = await getVoz();
  return voz.filter((v) => v.pertenece === id || v.pertenece === "libre");
}

/* ---- Aprendizaje y comunidad (ARCHIVADOS: locales y síncronos) ---- */
export function getAprendizaje(): readonly PiezaAprendizaje[] {
  return [...aprendizaje].sort(
    (a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity),
  );
}

export function getSerie(): SerieAprendizaje {
  return serieActual;
}

export function getComunidad(): readonly MomentoComunidad[] {
  return comunidad;
}

/* ---- Imágenes reales (tipo F) ---- */
interface ImagenDoc extends ImagenSanity {
  id: string;
  tipoGesto?: ImagenReal["tipoGesto"] | null;
  orden?: number | null;
}

export async function getImagenes(): Promise<readonly ImagenReal[]> {
  return conRespaldo<ImagenDoc, ImagenReal>(
    Q.IMAGENES,
    (filas) =>
      filas
        .map((f): ImagenReal | undefined => {
          const img = aImagenReal(f, {
            id: f.id,
            altPorDefecto: f.alt ?? "",
            tipoGesto: deLista(TIPOS_DE_GESTO, f.tipoGesto),
          });
          return img && { ...img, orden: limpio(f.orden) };
        })
        .filter((i): i is ImagenReal => i !== undefined),
    semillaImagenes,
  );
}

/**
 * Ordena una tanda de fotos por el `orden` que declaró Delfi, y por identificador las que
 * no lo tienen (para que la composición no cambie de forma entre dos visitas: la consulta
 * a Sanity no trae criterio propio). Una foto sin orden va al final, no al principio: lo
 * recién subido no debería empujar lo ya compuesto.
 */
const porOrden = (a: ImagenReal, b: ImagenReal): number =>
  (a.orden ?? Infinity) - (b.orden ?? Infinity) || a.id.localeCompare(b.id);

export async function getImagen(
  ref: ImagenRealRef,
): Promise<ImagenReal | undefined> {
  return (await getImagenes()).find((img) => img.id === ref);
}

/**
 * Las fotos que cuentan cómo se vive una clase (27ª ola). Alimentan la banda "Por dentro"
 * de `/experiencias`, que antes dependía sólo de la galería de cada experiencia —material
 * que se carga DESPUÉS de que la clase sucede— y por eso se veía dibujada.
 *
 * No están atadas a una fecha a propósito: una clase de pasta de marzo y una de galletitas
 * de agosto cuentan lo mismo, que es cómo es estar ahí. Delfi suma más marcándolas
 * "Cómo se vive una clase" en el Studio.
 */
export async function getFotosDeClase(): Promise<readonly ImagenReal[]> {
  return [...(await getImagenes())]
    .filter((img) => img.tipoGesto === "clase")
    .sort(porOrden);
}

/**
 * Lo que está sobre LA MESA (28ª ola). Es el contenido de `/la-mesa`: no ilustra una
 * sección, la constituye. Va ordenado porque acá el orden ES la composición —la partitura
 * reparte hero, medianas y detalles según la posición—, así que reordenar en el Studio
 * cambia qué foto manda. Sin material, la página no se muestra vacía: la mesa dibuja sus
 * propios huecos, igual que el resto del sistema.
 */
export async function getFotosDeLaMesa(): Promise<readonly ImagenReal[]> {
  return [...(await getImagenes())]
    .filter((img) => img.tipoGesto === "mesa")
    .sort(porOrden);
}

/* ---- Productos: ebooks y clases (tipo D) ---- */
interface ProductoSanity {
  id: string;
  titulo: string;
  descripcion: string;
  queTeLlevas?: string[] | null;
  formato?: string | null;
  colaboradores?: string[] | null;
  precio?: string | null;
  ctaLabel?: string | null;
  destino?: string | null;

  disponibilidad?: Producto["disponibilidad"] | null;
  borrador?: boolean | null;
  imagen?: (ImagenSanity & { alt?: string | null }) | null;
}

export async function getProductos(): Promise<readonly Producto[]> {
  // La semilla guarda la imagen por referencia: se resuelve contra las imágenes locales.
  const semilla: readonly Producto[] = semillaProductos.map((p) => ({
    ...p,
    imagen: p.imagen
      ? semillaImagenes.find((i) => i.id === p.imagen)
      : undefined,
  }));

  return conRespaldo<ProductoSanity, Producto>(
    Q.PRODUCTOS,
    (filas) =>
      filas.map((f) => ({
        id: f.id,
        titulo: f.titulo,
        descripcion: f.descripcion,
        queTeLlevas: lista(f.queTeLlevas),
        formato: f.formato ?? "",
        colaboradores: f.colaboradores ?? undefined,
        precio: limpio(f.precio),
        ctaLabel: limpio(f.ctaLabel),
        destino: limpio(f.destino),
        disponibilidad: deLista(DISPONIBILIDADES, f.disponibilidad),
        borrador: f.borrador ?? undefined,
        imagen: aImagenReal(f.imagen, {
          id: `producto-${f.id}`,
          altPorDefecto: f.titulo,
          tipoGesto: "portada",
        }),
      })),
    semilla,
  );
}

export async function getProducto(id: string): Promise<Producto | undefined> {
  return (await getProductos()).find((p) => p.id === id);
}

/* ---- Experiencias: las fechas de cocinar con ella (tipo K) ----------------
   Se ordenan por FECHA (las que todavía no la tienen, al final): la agenda se ordena
   sola, sin un campo de orden que alguien tenga que mantener. El ESTADO no se guarda:
   se deriva al leer (`content/estados.ts`). */
interface ExperienciaSanity {
  id: string;
  nombre: string;
  modalidad: Experiencia["modalidad"];
  inicio?: string | null;
  fin?: string | null;
  lugar?: string | null;
  direccion?: string | null;
  descripcion: string;
  queTeLlevas?: string[] | null;
  precio?: string | null;
  ctaLabel?: string | null;
  destino?: string | null;
  estado?: Experiencia["estado"] | null;
  publicada?: string | null;
  historia?: string | null;
  imagen?: (ImagenSanity & { alt?: string | null }) | null;
  galeria?: (ImagenSanity & { alt?: string | null })[] | null;
  video?: string | null;
}

const porFecha = (a: Experiencia, b: Experiencia): number => {
  if (!a.inicio) return b.inicio ? 1 : 0;
  if (!b.inicio) return -1;
  return Date.parse(a.inicio) - Date.parse(b.inicio);
};

export async function getExperiencias(): Promise<readonly Experiencia[]> {
  const semilla: readonly Experiencia[] = semillaExperiencias.map((e) => ({
    ...e,
    imagen: e.imagen
      ? semillaImagenes.find((i) => i.id === e.imagen)
      : undefined,
    galeria: e.galeria
      ?.map((ref) => semillaImagenes.find((i) => i.id === ref))
      .filter((i): i is ImagenReal => i !== undefined),
  }));

  const todas = await conRespaldo<ExperienciaSanity, Experiencia>(
    Q.EXPERIENCIAS,
    (filas) =>
      filas.map((f) => ({
        id: f.id,
        nombre: f.nombre,
        modalidad: deLista(MODALIDADES, f.modalidad, "presencial"),
        inicio: limpio(f.inicio),
        fin: limpio(f.fin),
        lugar: limpio(f.lugar),
        direccion: limpio(f.direccion),
        descripcion: f.descripcion,
        queTeLlevas: lista(f.queTeLlevas),
        precio: limpio(f.precio),
        ctaLabel: limpio(f.ctaLabel),
        destino: limpio(f.destino),
        estado: deLista(ESTADOS_DECLARABLES, f.estado),
        publicada: limpio(f.publicada),
        historia: limpio(f.historia),
        video: limpio(f.video),
        imagen: aImagenReal(f.imagen, {
          id: `experiencia-${f.id}`,
          altPorDefecto: f.nombre,
          tipoGesto: "proceso",
        }),
        galeria: (f.galeria ?? [])
          .map((g, i) =>
            aImagenReal(g, {
              id: `experiencia-${f.id}-foto-${i}`,
              altPorDefecto: f.nombre,
              tipoGesto: "proceso",
            }),
          )
          .filter((g): g is ImagenReal => g !== undefined),
      })),
    semilla,
  );

  return [...todas].sort(porFecha);
}

export async function getExperiencia(
  id: string,
): Promise<Experiencia | undefined> {
  return (await getExperiencias()).find((e) => e.id === id);
}

/**
 * La PRÓXIMA experiencia: la de fecha futura más cercana. Sin ninguna con fecha, no hay
 * próxima —una promesa sin día no es una cita— y el módulo de invitación no se muestra.
 */
export async function getProximaExperiencia(): Promise<Experiencia | undefined> {
  const ahora = Date.now();
  return (await getExperiencias()).find((e) => esFutura(e, ahora));
}

/* ---- Servicios (tipo E) ---- */
interface ServicioSanity {
  id: string;
  tipo: string;
  descripcion: string;
  texto: string;
  borrador?: boolean | null;
}

export async function getServicios(): Promise<readonly PropuestaServicio[]> {
  return conRespaldo<ServicioSanity, PropuestaServicio>(
    Q.SERVICIOS,
    (filas) =>
      filas.map((f) => ({
        id: f.id,
        tipo: f.tipo,
        descripcion: f.descripcion,
        texto: f.texto,
        borrador: f.borrador ?? undefined,
      })),
    semillaServicios,
  );
}

/**
 * El contacto de "Trabajemos juntos" (30ª ola). Es UNO para toda la sección: antes vivía
 * repetido dentro de cada propuesta. Sin canales cargados no hay contacto que mostrar, así
 * que se cae a la semilla en vez de dejar una invitación sin salida.
 */
export async function getContactoProfesional(): Promise<ContactoProfesional> {
  const doc = await consultar<Partial<ContactoProfesional> | null>(Q.CONTACTO);
  if (!doc?.invitacion || !doc.canales?.length) return semillaContacto;
  return { invitacion: doc.invitacion, canales: doc.canales };
}

/* ---- Marcas (tipo I) ----------------------------------------------------
   El LOGO llega con sus dimensiones porque el sitio necesita la proporción de su caja
   para escalarlo (área óptica pareja), no sólo la URL. */
interface MarcaSanity {
  id: string;
  nombre: string;
  rubro?: string | null;
  handle?: string | null;
  descripcion?: string | null;
  historia?: string | null;
  resultados?: string[] | null;
  url?: string | null;
  logo?: { src?: string | null; ancho?: number | null; alto?: number | null } | null;
  imagen?: (ImagenSanity & { alt?: string | null }) | null;
  video?: string | null;
}

export async function getMarcas(): Promise<readonly Marca[]> {
  const semilla: readonly Marca[] = semillaMarcas.map((m) => ({
    ...m,
    imagen: m.imagen
      ? semillaImagenes.find((i) => i.id === m.imagen)
      : undefined,
  }));

  return conRespaldo<MarcaSanity, Marca>(
    Q.MARCAS,
    (filas) =>
      filas.map((f) => ({
        id: f.id,
        nombre: f.nombre,
        rubro: limpio(f.rubro),
        handle: limpio(f.handle),
        logo:
          f.logo?.src && f.logo.ancho && f.logo.alto
            ? { src: f.logo.src, ancho: f.logo.ancho, alto: f.logo.alto }
            : undefined,
        url: limpio(f.url),
        descripcion: limpio(f.descripcion),
        historia: limpio(f.historia),
        resultados: f.resultados ?? undefined,
        video: limpio(f.video),
        imagen: aImagenReal(f.imagen, {
          id: `marca-${f.id}`,
          altPorDefecto: f.nombre,
          tipoGesto: "proceso",
        }),
      })),
    semilla,
  );
}

/* ---- Redes sociales (tipo H) ---- */
export async function getRedes(): Promise<readonly RedSocial[]> {
  return conRespaldo<RedSocial, RedSocial>(
    Q.REDES,
    (filas) =>
      filas.map((f) => ({
        id: f.id,
        plataforma: f.plataforma,
        usuario: f.usuario,
        url: f.url,
      })),
    semillaRedes,
  );
}

/* ---- Budín, el compañero del recorrido (tipo J) ----
   Budín es un documento ÚNICO, no una colección: se combina CAMPO A CAMPO con la semilla,
   como los momentos. Importa a partir de la 22ª ola, que le sumó dos niveles nuevos
   (`secretas` y `amistad`): si el documento del CMS mandara entero, esos niveles
   quedarían vacíos hasta volver a sembrar. Así, lo que Delfi ya editó manda, y lo que
   todavía no existe en el Studio lo completa la semilla. */
/**
 * Normaliza una frase de Budín (31ª ola). Acepta las DOS formas a propósito: el campo
 * pasó de una lista de textos a una lista de {texto, gesto}, y entre que esto se publica
 * y que corre `pnpm sincronizar` el dataset todavía tiene la forma vieja. Un texto suelto
 * entra con el gesto de reposo en vez de romper la página.
 *
 * Lo mismo vale para un gesto que ya no existe: `curioso` se retiró en la 33ª ola y
 * cualquier frase del CMS que lo conserve entra con el de reposo hasta que se sincronice.
 * No es una tolerancia genérica: es que el contenido y el código se despliegan por
 * separado, y en la ventana entre uno y otro la página tiene que seguir en pie.
 */
const GESTOS: readonly GestoBudin[] = ["alegre", "ladeado"];
const GESTO_POR_DEFECTO: GestoBudin = "ladeado";

function aFrase(v: unknown): FraseBudin | null {
  if (typeof v === "string") {
    return v.trim() ? { texto: v, gesto: GESTO_POR_DEFECTO } : null;
  }
  if (v && typeof v === "object") {
    const { texto, gesto } = v as { texto?: unknown; gesto?: unknown };
    if (typeof texto !== "string" || !texto.trim()) return null;
    return {
      texto,
      gesto: GESTOS.find((g) => g === gesto) ?? GESTO_POR_DEFECTO,
    };
  }
  return null;
}

const aFrases = (v: unknown): FraseBudin[] =>
  Array.isArray(v) ? v.map(aFrase).filter((f): f is FraseBudin => f !== null) : [];

export async function getBudin(): Promise<VozBudin> {
  const doc = await consultar<{
    saludo?: string | null;
    frases?: unknown;
    secretas?: unknown;
    amistad?: string | null;
  } | null>(Q.BUDIN);
  const frases = aFrases(doc?.frases);
  if (!doc?.saludo || frases.length === 0) return semillaBudin;
  const secretas = aFrases(doc.secretas);
  return {
    saludo: doc.saludo,
    frases,
    secretas: secretas.length ? secretas : semillaBudin.secretas,
    amistad: limpio(doc.amistad) ?? semillaBudin.amistad,
  };
}
