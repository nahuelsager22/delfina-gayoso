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
import { marcas as semillaMarcas } from "./data/marcas";
import { imagenes as semillaImagenes } from "./data/imagenes";
import { comunidad } from "./data/comunidad";
import { redes as semillaRedes } from "./data/redes";
import { budin as semillaBudin } from "./data/budin";

import { esFutura } from "./estados";

import type {
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
  RedSocial,
  SerieAprendizaje,
  VozBudin,
  VozDelfina,
} from "./types";

export type * from "./types";
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
   Utilidad: consultar el CMS y, si no hay nada, devolver la semilla local.
   ========================================================================= */
async function conRespaldo<Crudo, Salida>(
  query: string,
  mapear: (filas: Crudo[]) => Salida[],
  semilla: readonly Salida[],
): Promise<readonly Salida[]> {
  const filas = await consultar<Crudo[]>(query);
  if (!filas || filas.length === 0) return semilla;
  try {
    return mapear(filas);
  } catch {
    return semilla;
  }
}

/** Quita nulos que llegan del CMS, para no ensuciar el modelo con `null`. */
const limpio = <T>(v: T | null | undefined): T | undefined => v ?? undefined;
const lista = (v: readonly string[] | null | undefined): readonly string[] =>
  v ?? [];

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
  const momentos = await conRespaldo<MomentoSanity, Momento>(
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
   completa los que aún no subieron. */
export async function getVoz(): Promise<readonly VozDelfina[]> {
  const delCms = await conRespaldo<VozDelfina, VozDelfina>(
    Q.VOCES,
    (filas) =>
      filas.map((f) => ({
        id: f.id,
        texto: f.texto,
        registro: f.registro,
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
}

export async function getImagenes(): Promise<readonly ImagenReal[]> {
  return conRespaldo<ImagenDoc, ImagenReal>(
    Q.IMAGENES,
    (filas) =>
      filas
        .map((f) =>
          aImagenReal(f, {
            id: f.id,
            altPorDefecto: f.alt ?? "",
            tipoGesto: limpio(f.tipoGesto),
          }),
        )
        .filter((i): i is ImagenReal => i !== undefined),
    semillaImagenes,
  );
}

export async function getImagen(
  ref: ImagenRealRef,
): Promise<ImagenReal | undefined> {
  return (await getImagenes()).find((img) => img.id === ref);
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
        disponibilidad: limpio(f.disponibilidad),
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
        modalidad: f.modalidad,
        inicio: limpio(f.inicio),
        fin: limpio(f.fin),
        lugar: limpio(f.lugar),
        direccion: limpio(f.direccion),
        descripcion: f.descripcion,
        queTeLlevas: lista(f.queTeLlevas),
        precio: limpio(f.precio),
        ctaLabel: limpio(f.ctaLabel),
        destino: limpio(f.destino),
        estado: limpio(f.estado),
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
  aQuienLeSirve: string;
  comoEsTrabajar: string;
  invitacion?: string | null;
  canales?: { medio: PropuestaServicio["contacto"]["canales"][number]["medio"]; destino: string }[] | null;
  borrador?: boolean | null;
}

export async function getServicios(): Promise<readonly PropuestaServicio[]> {
  return conRespaldo<ServicioSanity, PropuestaServicio>(
    Q.SERVICIOS,
    (filas) =>
      filas.map((f) => ({
        id: f.id,
        tipo: f.tipo,
        aQuienLeSirve: f.aQuienLeSirve,
        comoEsTrabajar: f.comoEsTrabajar,
        contacto: {
          invitacion: f.invitacion ?? "",
          canales: f.canales ?? [],
        },
        borrador: f.borrador ?? undefined,
      })),
    semillaServicios,
  );
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
export async function getBudin(): Promise<VozBudin> {
  const doc = await consultar<Partial<VozBudin> | null>(Q.BUDIN);
  if (!doc?.saludo || !doc.frases?.length) return semillaBudin;
  return {
    saludo: doc.saludo,
    frases: doc.frases,
    secretas: doc.secretas?.length ? doc.secretas : semillaBudin.secretas,
    amistad: limpio(doc.amistad) ?? semillaBudin.amistad,
  };
}
