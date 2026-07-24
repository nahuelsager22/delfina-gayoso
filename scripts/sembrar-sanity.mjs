/**
 * Carga inicial del CMS (Bloque 8 · 14ª ola).
 * -----------------------------------------------------------------------------
 * Sube a Sanity TODO el contenido que hoy vive en `content/data/*` —textos, ebooks y
 * clases, marcas, servicios, redes, secciones, la voz de Budín— junto con las imágenes
 * de `public/`. Después de correrlo, Delfi abre `/studio` y encuentra el sitio entero
 * cargado y editable; el respaldo local queda como red de seguridad.
 *
 * CÓMO CORRERLO
 *   1. Crear un token con permiso de ESCRITURA en sanity.io/manage
 *      (proyecto → API → Tokens → "Editor").
 *   2. Guardarlo en `.env.local`:  SANITY_API_WRITE_TOKEN=sk...
 *   3. pnpm sembrar
 *
 * Es IDEMPOTENTE: usa `createOrReplace` con ids estables, así que se puede correr más de
 * una vez sin duplicar nada. Ojo: al re-correrlo PISA lo editado en el Studio con la
 * semilla local — está pensado para la carga inicial, no para uso cotidiano.
 */
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Cargar .env.local a mano (el script corre fuera de Next).
const envPath = path.join(raiz, ".env.local");
if (existsSync(envPath)) {
  const texto = await readFile(envPath, "utf8");
  for (const linea of texto.split("\n")) {
    const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error(
    "\nFalta SANITY_API_WRITE_TOKEN.\n" +
      "Creá un token de escritura en https://sanity.io/manage y ponelo en .env.local\n",
  );
  process.exit(1);
}

const cliente = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "a7nwe5rn",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-07-01",
  token,
  useCdn: false,
});

// El contenido se lee del propio proyecto (una sola fuente de verdad).
const { momentos } = await import("../content/data/momentos.ts");
const { voz } = await import("../content/data/voz.ts");
const { productos } = await import("../content/data/productos.ts");
const { servicios } = await import("../content/data/servicios.ts");
const { marcas } = await import("../content/data/marcas.ts");
const { imagenes } = await import("../content/data/imagenes.ts");
const { redes } = await import("../content/data/redes.ts");
const { budin } = await import("../content/data/budin.ts");

/** Sube un archivo de /public y devuelve la referencia al asset. */
const subidas = new Map();
async function subirImagen(src) {
  if (!src) return undefined;
  if (subidas.has(src)) return subidas.get(src);
  const archivo = path.join(raiz, "public", src.replace(/^\//, ""));
  if (!existsSync(archivo)) {
    console.warn("  · no encontrada, se omite:", src);
    return undefined;
  }
  const buffer = await readFile(archivo);
  const asset = await cliente.assets.upload("image", buffer, {
    filename: path.basename(archivo),
  });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  subidas.set(src, ref);
  console.log("  · imagen subida:", src);
  return ref;
}

const slug = (v) => ({ _type: "slug", current: v });
const docs = [];

console.log("\nPreparando contenido…\n");

// Fotografías del sitio (las que el código busca por identificador).
for (const img of imagenes) {
  const archivo = await subirImagen(img.src);
  if (!archivo) continue;
  docs.push({
    _id: `imagen-${img.id}`,
    _type: "imagen",
    identificador: slug(img.id),
    archivo,
    descripcion: img.alt,
    tipoGesto: img.tipoGesto,
  });
}

// Ebooks y clases (la imagen de cada uno se resuelve desde las fotos del sitio).
for (const [i, p] of productos.entries()) {
  const fuente = p.imagen ? imagenes.find((im) => im.id === p.imagen) : undefined;
  const imagen = fuente ? await subirImagen(fuente.src) : undefined;
  docs.push({
    _id: `producto-${p.id}`,
    _type: "producto",
    identificador: slug(p.id),
    titulo: p.titulo,
    descripcion: p.descripcion,
    queTeLlevas: [...(p.queTeLlevas ?? [])],
    formato: p.formato,
    colaboradores: p.colaboradores ? [...p.colaboradores] : undefined,
    precio: p.precio,
    ctaLabel: p.ctaLabel,
    destino: p.destino,
    familia: p.familia,
    disponibilidad: p.disponibilidad ?? "disponible",
    borrador: p.borrador ?? false,
    orden: (i + 1) * 10,
    ...(imagen ? { imagen: { ...imagen, alt: fuente?.alt } } : {}),
  });
}

for (const [i, m] of marcas.entries()) {
  docs.push({
    _id: `marca-${m.id}`,
    _type: "marca",
    identificador: slug(m.id),
    nombre: m.nombre,
    rubro: m.rubro,
    url: m.url,
    borrador: m.borrador ?? false,
    orden: (i + 1) * 10,
  });
}

for (const [i, v] of voz.entries()) {
  docs.push({
    _id: `voz-${v.id}`,
    _type: "voz",
    identificador: slug(v.id),
    texto: v.texto,
    pertenece: v.pertenece,
    registro: v.registro,
    enfasis: v.enfasis,
    orden: (i + 1) * 10,
  });
}

for (const [i, s] of servicios.entries()) {
  docs.push({
    _id: `servicio-${s.id}`,
    _type: "servicio",
    identificador: slug(s.id),
    tipo: s.tipo,
    aQuienLeSirve: s.aQuienLeSirve,
    comoEsTrabajar: s.comoEsTrabajar,
    invitacion: s.contacto.invitacion,
    canales: s.contacto.canales.map((c, j) => ({
      _key: `canal-${j}`,
      medio: c.medio,
      destino: c.destino,
    })),
    borrador: s.borrador ?? false,
    orden: (i + 1) * 10,
  });
}

for (const [i, r] of redes.entries()) {
  docs.push({
    _id: `red-${r.id}`,
    _type: "red",
    plataforma: r.plataforma,
    usuario: r.usuario,
    url: r.url,
    orden: (i + 1) * 10,
  });
}

for (const m of momentos) {
  docs.push({
    _id: `momento-${m.id}`,
    _type: "momento",
    identificador: m.id,
    nombre: m.nombre,
    orden: m.orden,
    navLabel: m.navLabel,
    ritmoPrevisto: m.ritmoPrevisto,
  });
}

docs.push({
  _id: "budin",
  _type: "budin",
  saludo: budin.saludo,
  frases: [...budin.frases],
});

console.log(`\nSubiendo ${docs.length} documentos…`);
let tx = cliente.transaction();
for (const doc of docs) tx = tx.createOrReplace(doc);
await tx.commit();

console.log("\n✓ Listo. Abrí /studio para ver y editar todo el contenido.\n");
