/**
 * Consultas GROQ (Bloque 8 · 14ª ola).
 *
 * Cada consulta PROYECTA exactamente la forma que ya usaba el proyecto con archivos
 * locales (`content/types.ts`): mismo nombre de campos, mismo orden. Así la capa de
 * acceso traduce casi sin trabajo y la interfaz nunca se entera de que hubo un CMS.
 *
 * Las imágenes se proyectan con URL de la CDN y sus dimensiones reales (para reservar
 * espacio y no producir saltos de layout).
 */

const IMAGEN = `{
  "url": asset->url,
  "ancho": asset->metadata.dimensions.width,
  "alto": asset->metadata.dimensions.height
}`;

export const PRODUCTOS = `*[_type == "producto"] | order(orden asc, titulo asc) {
  "id": identificador.current,
  titulo,
  descripcion,
  queTeLlevas,
  formato,
  colaboradores,
  precio,
  ctaLabel,
  destino,
  disponibilidad,
  borrador,
  "imagen": imagen${IMAGEN} + { "alt": imagen.alt }
}`;

/**
 * Experiencias (17ª ola). Se ordenan por FECHA, no por un campo de orden manual: la
 * agenda se ordena sola. Las que todavía no tienen fecha quedan al final. `publicada`
 * sale de la fecha de creación del documento, así que Delfi no tiene que cargarla.
 */
export const EXPERIENCIAS = `*[_type == "experiencia"] | order(inicio asc) {
  "id": identificador.current,
  nombre,
  modalidad,
  inicio,
  fin,
  lugar,
  direccion,
  descripcion,
  queTeLlevas,
  precio,
  ctaLabel,
  destino,
  estado,
  historia,
  "publicada": _createdAt,
  "imagen": imagen${IMAGEN} + { "alt": imagen.alt },
  "galeria": galeria[]{
    "url": asset->url,
    "ancho": asset->metadata.dimensions.width,
    "alto": asset->metadata.dimensions.height,
    alt
  },
  "video": video.asset->url
}`;

export const MARCAS = `*[_type == "marca"] | order(orden asc, nombre asc) {
  "id": identificador.current,
  nombre,
  rubro,
  handle,
  descripcion,
  historia,
  resultados,
  url,
  "logo": {
    "src": logo.asset->url,
    "ancho": logo.asset->metadata.dimensions.width,
    "alto": logo.asset->metadata.dimensions.height
  },
  "imagen": imagen${IMAGEN} + { "alt": imagen.alt },
  "video": video.asset->url
}`;

export const VOCES = `*[_type == "voz"] | order(orden asc) {
  "id": identificador.current,
  texto,
  registro,
  pertenece,
  enfasis
}`;

export const IMAGENES = `*[_type == "imagen"] {
  "id": identificador.current,
  "alt": descripcion,
  tipoGesto,
  orden,
  "url": archivo.asset->url,
  "ancho": archivo.asset->metadata.dimensions.width,
  "alto": archivo.asset->metadata.dimensions.height
}`;

export const SERVICIOS = `*[_type == "servicio"] | order(orden asc) {
  "id": identificador.current,
  tipo,
  aQuienLeSirve,
  comoEsTrabajar,
  invitacion,
  "canales": canales[]{ medio, destino },
  borrador
}`;

export const REDES = `*[_type == "red"] | order(orden asc) {
  "id": coalesce(identificador.current, _id),
  plataforma,
  usuario,
  url
}`;

export const MOMENTOS = `*[_type == "momento"] | order(orden asc) {
  "id": identificador,
  nombre,
  orden,
  navLabel,
  ritmoPrevisto
}`;

export const BUDIN = `*[_type == "budin"][0] { saludo, frases, secretas, amistad }`;
