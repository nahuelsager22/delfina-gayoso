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
import { aprendizaje } from "./data/aprendizaje";
import { serieActual } from "./data/series";
import { productos as semillaProductos } from "./data/productos";
import { servicios as semillaServicios } from "./data/servicios";
import { marcas as semillaMarcas } from "./data/marcas";
import { imagenes as semillaImagenes } from "./data/imagenes";
import { comunidad } from "./data/comunidad";
import { redes as semillaRedes } from "./data/redes";
import { budin as semillaBudin } from "./data/budin";

import type {
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

/* ---- Voz de Delfina (tipo A) ---- */
export async function getVoz(): Promise<readonly VozDelfina[]> {
  return conRespaldo<VozDelfina, VozDelfina>(
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
  familia?: Producto["familia"] | null;
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
        familia: limpio(f.familia),
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

/* ---- Marcas (tipo I) ---- */
interface MarcaSanity {
  id: string;
  nombre: string;
  rubro?: string | null;
  descripcion?: string | null;
  url?: string | null;
  logo?: string | null;
  borrador?: boolean | null;
}

export async function getMarcas(): Promise<readonly Marca[]> {
  return conRespaldo<MarcaSanity, Marca>(
    Q.MARCAS,
    (filas) =>
      filas.map((f) => ({
        id: f.id,
        nombre: f.nombre,
        rubro: limpio(f.rubro),
        logo: limpio(f.logo),
        url: limpio(f.url),
        borrador: f.borrador ?? undefined,
      })),
    semillaMarcas,
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

/* ---- Budín, el compañero del recorrido (tipo J) ---- */
export async function getBudin(): Promise<VozBudin> {
  const doc = await consultar<VozBudin | null>(Q.BUDIN);
  if (!doc?.saludo || !doc.frases?.length) return semillaBudin;
  return { saludo: doc.saludo, frases: doc.frases };
}
