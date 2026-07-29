/**
 * Sincroniza el dataset con el estado actual del proyecto (Bloque 8 · 21ª ola).
 * -----------------------------------------------------------------------------
 * Entre la 17ª y la 20ª ola el modelo cambió bastante —las clases dejaron de ser
 * "productos" y pasaron a ser Experiencias, las marcas de ejemplo se reemplazaron por las
 * reales, y aparecieron los textos de dos páginas nuevas—. El dataset quedó atrás.
 *
 * A diferencia de `pnpm sembrar`, que sube TODO y pisa lo editado en el Studio, este
 * script toca únicamente lo que quedó desalineado:
 *
 *   1. BORRA los dos productos que eran clases (`producto-clases-presenciales` y
 *      `producto-clases-online`): hoy viven como Experiencias.
 *   2. BORRA los cuatro marcadores de marca de ejemplo de la 14ª ola.
 *   3. CREA/REEMPLAZA las cuatro marcas reales, con sus logotipos a color.
 *   4. CREA las Experiencias que falten (sin pisar las que ya estén cargadas).
 *   5. CREA los textos que falten (sin pisar los que Delfi haya editado).
 *
 * Los pasos 4 y 5 usan `createIfNotExists`: lo que ya está en el Studio manda. Los pasos
 * 1 y 2 sí borran, porque ese contenido ya no representa nada del sitio.
 *
 * CÓMO CORRERLO
 *   1. Tener `SANITY_API_WRITE_TOKEN` en `.env.local`.
 *   2. pnpm sincronizar
 */
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

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

const { marcas } = await import("../content/data/marcas.ts");
const { experiencias } = await import("../content/data/experiencias.ts");
const { voz } = await import("../content/data/voz.ts");
const { imagenes } = await import("../content/data/imagenes.ts");

const subidas = new Map();
async function subir(src) {
  if (!src) return undefined;
  if (subidas.has(src)) return subidas.get(src);
  const archivo = path.join(raiz, "public", src.replace(/^\//, ""));
  if (!existsSync(archivo)) {
    console.warn("  · no encontrado, se omite:", src);
    return undefined;
  }
  const asset = await cliente.assets.upload("image", await readFile(archivo), {
    filename: path.basename(archivo),
  });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  subidas.set(src, ref);
  console.log("  · imagen subida:", src);
  return ref;
}

const slug = (v) => ({ _type: "slug", current: v });
let tx = cliente.transaction();
const resumen = [];

/* 1 y 2 · Lo que ya no representa nada del sitio. -------------------------- */
const aBorrar = [
  "producto-clases-presenciales",
  "producto-clases-online",
  "marca-marca-1",
  "marca-marca-2",
  "marca-marca-3",
  "marca-marca-4",
];
for (const id of aBorrar) tx = tx.delete(id);
resumen.push(`${aBorrar.length} documentos obsoletos borrados`);

/* 3 · Las marcas reales, con sus logotipos. -------------------------------- */
console.log("\nSubiendo logotipos…\n");
for (const [i, m] of marcas.entries()) {
  const logo = await subir(m.logo?.src);
  tx = tx.createOrReplace({
    _id: `marca-${m.id}`,
    _type: "marca",
    identificador: slug(m.id),
    nombre: m.nombre,
    rubro: m.rubro,
    handle: m.handle,
    url: m.url,
    descripcion: m.descripcion,
    historia: m.historia,
    resultados: m.resultados ? [...m.resultados] : undefined,
    orden: (i + 1) * 10,
    ...(logo ? { logo: { ...logo, alt: m.nombre } } : {}),
  });
}
resumen.push(`${marcas.length} marcas reales cargadas`);

/* 4 · Las experiencias que falten. ----------------------------------------- */
console.log("\nPreparando experiencias…\n");
for (const e of experiencias) {
  const fuente = e.imagen ? imagenes.find((im) => im.id === e.imagen) : undefined;
  const imagen = await subir(fuente?.src);
  tx = tx.createIfNotExists({
    _id: `experiencia-${e.id}`,
    _type: "experiencia",
    identificador: slug(e.id),
    nombre: e.nombre,
    modalidad: e.modalidad,
    inicio: e.inicio,
    fin: e.fin,
    lugar: e.lugar,
    direccion: e.direccion,
    descripcion: e.descripcion,
    queTeLlevas: [...(e.queTeLlevas ?? [])],
    precio: e.precio,
    ctaLabel: e.ctaLabel,
    destino: e.destino,
    estado: e.estado ?? "automatico",
    historia: e.historia,
    ...(imagen ? { imagen: { ...imagen, alt: fuente?.alt } } : {}),
  });
}
resumen.push(`${experiencias.length} experiencias aseguradas`);

/* 5 · Los textos que falten (los editados en el Studio no se tocan). ------- */
for (const [i, v] of voz.entries()) {
  tx = tx.createIfNotExists({
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
resumen.push(`${voz.length} textos asegurados`);

await tx.commit();

console.log("\n✓ Dataset sincronizado:");
for (const linea of resumen) console.log("  ·", linea);
console.log(
  "\n  Abrí /studio para completar lo que falta: rubro, historia, resultados y\n" +
    "  fotos de cada marca; y la próxima fecha real de las experiencias.\n",
);
