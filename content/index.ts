/**
 * Capa de acceso al contenido — el límite de desacople interfaz ↔ contenido.
 * -----------------------------------------------------------------------------
 * La interfaz (`app/`) importa SIEMPRE desde aquí, nunca desde `content/data/*`.
 * Hoy la fuente son archivos tipados locales; si mañana se cambia a un headless
 * CMS, se reescribe este módulo y la interfaz no se entera. Ese es el objetivo:
 * agregar contenido no rediseña, y cambiar la fuente no reescribe la interfaz.
 *
 * Los accessors son síncronos porque la fuente es local. Se devuelven copias de
 * solo-lectura (`readonly`) para que la interfaz no mute el contenido.
 */

import { momentos } from "./data/momentos";
import { voz } from "./data/voz";
import { aprendizaje } from "./data/aprendizaje";
import { serieActual } from "./data/series";
import { productos } from "./data/productos";
import { servicios } from "./data/servicios";
import { imagenes } from "./data/imagenes";
import { comunidad } from "./data/comunidad";
import { redes } from "./data/redes";

import type {
  ImagenReal,
  ImagenRealRef,
  Momento,
  MomentoComunidad,
  MomentoId,
  PiezaAprendizaje,
  Producto,
  PropuestaServicio,
  RedSocial,
  SerieAprendizaje,
  VozDelfina,
} from "./types";

export type * from "./types";

/* ---- Momentos (tipo B) ---- */
export function getMomentos(): readonly Momento[] {
  return [...momentos].sort((a, b) => a.orden - b.orden);
}

export function getMomento(id: MomentoId): Momento | undefined {
  return momentos.find((m) => m.id === id);
}

/* ---- Voz de Delfina (tipo A) ---- */
export function getVoz(): readonly VozDelfina[] {
  return voz;
}

export function getVozDeMomento(id: MomentoId): readonly VozDelfina[] {
  return voz.filter((v) => v.pertenece === id || v.pertenece === "libre");
}

/* ---- Aprendizaje / capítulos (tipo C) ---- */
export function getAprendizaje(): readonly PiezaAprendizaje[] {
  return [...aprendizaje].sort(
    (a, b) => (a.orden ?? Infinity) - (b.orden ?? Infinity),
  );
}

/* ---- Serie de aprendizaje (tipo C.bis) ---- */
export function getSerie(): SerieAprendizaje {
  return serieActual;
}

/* ---- Productos (tipo D) ---- */
export function getProductos(): readonly Producto[] {
  return productos;
}

export function getProducto(id: string): Producto | undefined {
  return productos.find((p) => p.id === id);
}

/* ---- Servicios (tipo E) ---- */
export function getServicios(): readonly PropuestaServicio[] {
  return servicios;
}

/* ---- Imágenes reales (tipo F) ---- */
export function getImagen(ref: ImagenRealRef): ImagenReal | undefined {
  return imagenes.find((img) => img.id === ref);
}

/* ---- Comunidad / vida real (tipo G) ---- */
export function getComunidad(): readonly MomentoComunidad[] {
  return comunidad;
}

/* ---- Redes sociales (tipo H) ---- */
export function getRedes(): readonly RedSocial[] {
  return redes;
}
