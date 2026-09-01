/**
 * Sincroniza el dataset con el estado actual del proyecto (Bloque 8 · 21ª → 28ª ola).
 * -----------------------------------------------------------------------------
 * A diferencia de `pnpm sembrar`, que sube TODO y pisa lo editado en el Studio, este
 * script toca únicamente lo que quedó desalineado. Es el mismo archivo que se viene
 * usando desde la 21ª ola: cada vez que el proyecto cambia de forma, se actualiza acá qué
 * hay que alinear. Lo que hace hoy:
 *
 *   1. BORRA los productos que eran clases (hoy viven como Experiencias) y los marcadores
 *      de marca de ejemplo de la 14ª ola.
 *   2. BORRA las marcas que ya NO están en la semilla. Antes la lista de borrados era
 *      fija; ahora se deduce comparando el dataset contra `content/data/marcas.ts`, así
 *      que retirar una colaboración es borrarla de la semilla y correr esto. (27ª ola:
 *      así se fue Buffalo, que Delfina confirmó que ya no es una colaboración activa.)
 *   3. CREA/REEMPLAZA las marcas de la semilla, con sus logotipos a color. Re-sube el
 *      archivo siempre: es el paso por el que el logotipo REPARADO de Don Yeyo llega al
 *      sitio, porque el CMS manda sobre la semilla y el asset viejo seguiría sirviéndose.
 *   4. CREA las fotografías que falten (27ª: las de clase; 28ª: las 23 de la mesa) y
 *      RE-SUBE las que cambiaron en `public/`, detectándolo por el peso del archivo. Ese
 *      último detalle importa: sin él, reemplazar una foto en el repo no cambiaba nada en
 *      el sitio, porque el CMS manda y `createIfNotExists` dejaba la vieja para siempre.
 *   5. CREA las Experiencias que falten (sin pisar las que ya estén cargadas).
 *   6. CREA los textos que falten (sin pisar los que Delfi haya editado).
 *   7. REORDENA las secciones del recorrido (22ª ola: el orden nuevo).
   8. REEMPLAZA los servicios (30ª ola: la ficha cambió de forma —título, descripción,
      texto— y el contacto salió del documento), borra los que ya no estén en la semilla
      y CREA el documento de contacto profesional si falta.
   9. DEJA AL DÍA las frases de Budín, sin tocar sus textos: las convierte a
      {texto, gesto} si venían sueltas (31ª ola) y reasigna las que quedaron con una cara
      retirada (33ª: se fue `curioso`). Y actualiza su SALUDO (32ª) sólo si nadie lo
      editó en el Studio.
  10. CORRIGE un handle de red mal cargado, con la misma cautela: sólo si el documento
      todavía tiene el valor equivocado.
 *
 * Los pasos 4, 5 y 6 usan `createIfNotExists`: lo que ya está en el Studio manda. Los
 * pasos 1 y 2 sí borran, porque ese contenido ya no representa nada del sitio. El 7 toca
 * sólo el campo `orden` (no el nombre del menú).
 *
 * BUDÍN NO SE PISA (27ª ola, sigue vigente). Hasta la 26ª este script reemplazaba su
 * documento entero para empujar el repertorio nuevo. Ya está cargado y Delfina editó
 * frases a mano en el Studio: volver a pisarlo sería perder su trabajo. Lo único que se
 * hace sobre él es la MIGRACIÓN de forma del paso 9, que conserva sus textos.
 *
 * CÓMO CORRERLO
 *   1. Tener `SANITY_API_WRITE_TOKEN` en `.env.local`.
 *   2. pnpm sincronizar
 */
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
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
const { momentos } = await import("../content/data/momentos.ts");
const { servicios } = await import("../content/data/servicios.ts");
const { contacto } = await import("../content/data/contacto.ts");
const { budin } = await import("../content/data/budin.ts");
const { redes } = await import("../content/data/redes.ts");

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

/* 1 y 2 · Lo que ya no representa nada del sitio. --------------------------
   Los marcadores de ejemplo son una lista fija (existieron una sola vez). Las marcas
   RETIRADAS se deducen: cualquier marca del dataset que ya no esté en la semilla dejó de
   ser una colaboración activa, y la sección dice "hoy cocino con". */
const aBorrar = [
  "producto-clases-presenciales",
  "producto-clases-online",
  "marca-marca-1",
  "marca-marca-2",
  "marca-marca-3",
  "marca-marca-4",
  // 29ª ola: el pivote de "Lo que te llevás" se retiró del recorrido (el corte de color
  // ya hace esa transición). Se borra del dataset para que no quede un texto huérfano en
  // el Studio, editable pero sin lugar donde salir.
  "voz-llevas-pivote",
];

const vigentes = new Set(marcas.map((m) => `marca-${m.id}`));
const enDataset = await cliente.fetch(`*[_type == "marca"]._id`);
const retiradas = enDataset.filter((id) => !vigentes.has(id));
for (const id of [...aBorrar, ...retiradas]) tx = tx.delete(id);
resumen.push(
  `${aBorrar.length} documentos obsoletos borrados` +
    (retiradas.length ? ` + marcas retiradas: ${retiradas.join(", ")}` : ""),
);

/* 3 · Las marcas reales, con sus logotipos y su foto. ----------------------
   28ª ola: se suma `imagen`. Es lo que hace que la primera colaboración con material
   real (Don Yeyo) llegue al sitio, y el hueco donde entran las otras dos cuando lleguen.
   Ojo con el `createOrReplace`: pisa lo que haya en el Studio. Hoy se puede porque las
   marcas todavía no tienen texto cargado ahí; el día que Delfi escriba las historias,
   este paso tiene que pasar a `patch` de los campos que vienen de la semilla. */
console.log("\nSubiendo logotipos y fotos de marca…\n");
for (const [i, m] of marcas.entries()) {
  const logo = await subir(m.logo?.src);
  const fuenteFoto = m.imagen
    ? imagenes.find((im) => im.id === m.imagen)
    : undefined;
  const foto = await subir(fuenteFoto?.src);
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
    ...(foto ? { imagen: { ...foto, alt: fuenteFoto?.alt } } : {}),
  });
}
resumen.push(`${marcas.length} marcas reales cargadas`);

/* 4 · Las fotografías que falten (27ª: las de clase; 28ª: las de la mesa). ------
   `createIfNotExists` y además se saltea las que ya existen: si Delfi reemplazó una foto
   desde el Studio, manda la suya. El `orden` sí se empuja SIEMPRE en las de la mesa,
   porque ahí el orden es la composición y la semilla es la versión compuesta a mano;
   apenas Delfi lo toque en el Studio, conviene sacar esta línea. */
console.log("\nSubiendo fotografías nuevas…\n");

/* Qué hay hoy en el dataset, con el PESO de cada archivo. El peso es lo que permite
   detectar que una foto fue reemplazada en `public/` sin llevar una lista a mano: si el
   archivo local ya no pesa lo mismo que el que sirve la CDN, es otro archivo y hay que
   volver a subirlo. Sin esto, `createIfNotExists` deja el viejo para siempre —que es
   exactamente lo que pasó cuando llegaron las fotos tratadas de la 28ª ola—. */
const yaCargadas = new Map(
  (
    await cliente.fetch(
      `*[_type == "imagen"]{ _id, "peso": archivo.asset->size }`,
    )
  ).map((d) => [d._id, d.peso]),
);
let reemplazadas = 0;

for (const im of imagenes) {
  const id = `imagen-${im.id}`;
  const local = path.join(raiz, "public", im.src.replace(/^\//, ""));
  const peso = existsSync(local) ? statSync(local).size : undefined;

  if (yaCargadas.has(id)) {
    const campos = {};
    if (im.orden !== undefined) campos.orden = im.orden;
    if (peso !== undefined && peso !== yaCargadas.get(id)) {
      const archivo = await subir(im.src);
      if (archivo) {
        campos.archivo = archivo;
        reemplazadas++;
        console.log("  · reemplazada (cambió el archivo):", im.id);
      }
    }
    if (Object.keys(campos).length) tx = tx.patch(id, (p) => p.set(campos));
    continue;
  }

  const archivo = await subir(im.src);
  if (!archivo) continue;
  tx = tx.createIfNotExists({
    _id: id,
    _type: "imagen",
    identificador: slug(im.id),
    archivo,
    descripcion: im.alt,
    tipoGesto: im.tipoGesto,
    orden: im.orden,
  });
  console.log("  · nueva:", im.id);
}
resumen.push(
  `${imagenes.length} fotografías aseguradas` +
    (reemplazadas ? ` (${reemplazadas} reemplazadas por versión nueva)` : ""),
);

/* 5 · Las experiencias que falten. ----------------------------------------- */
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

/* 6 · Los textos que falten (los editados en el Studio no se tocan). ------- */
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

/* 7 · El ORDEN del recorrido (22ª ola). ------------------------------------
   El CMS gobierna el orden de las secciones, así que reordenar el sitio en el código no
   alcanza: si el dataset conserva el orden viejo, el MENÚ queda desincronizado con la
   página. Se hace un `patch` sólo del campo `orden` (y del ritmo, que va de la mano),
   para no pisar el nombre que Delfi le haya puesto a cada ítem del menú. */
for (const m of momentos) {
  tx = tx.patch(`momento-${m.id}`, (p) =>
    p.set({ orden: m.orden, ritmoPrevisto: m.ritmoPrevisto }),
  );
}
resumen.push(`${momentos.length} secciones reordenadas`);

/* 8 · SERVICIOS y CONTACTO (30ª ola). ---------------------------------------
   Único paso del script que REEMPLAZA contenido editable, y conviene entender por qué es
   la excepción y no el criterio nuevo. La ficha de servicio cambió de forma: los campos
   `aQuienLeSirve`/`comoEsTrabajar` pasaron a `descripcion`/`texto`, y `invitacion`/
   `canales` salieron del documento. Con la forma cambiada no hay merge posible —los
   valores viejos quedarían en campos que el sitio ya no lee— y además el copy de esta ola
   es una decisión de Delfina, no una semilla provisoria. Por eso se reemplaza.

   Se borran, además, los servicios que ya no están en la semilla, deduciéndolos del
   dataset igual que con las marcas: así "Asesorías y eventos" se retira solo al haber
   sido reemplazado por "Asesorías gastronómicas". */
const serviciosVigentes = new Set(servicios.map((s) => `servicio-${s.id}`));
const serviciosEnDataset = await cliente.fetch(`*[_type == "servicio"]._id`);
for (const id of serviciosEnDataset.filter((id) => !serviciosVigentes.has(id))) {
  tx = tx.delete(id);
}
for (const [i, s] of servicios.entries()) {
  tx = tx.createOrReplace({
    _id: `servicio-${s.id}`,
    _type: "servicio",
    identificador: slug(s.id),
    tipo: s.tipo,
    descripcion: s.descripcion,
    texto: s.texto,
    borrador: s.borrador ?? false,
    orden: (i + 1) * 10,
  });
}
resumen.push(`${servicios.length} servicios actualizados`);

// El contacto sí es `createIfNotExists`: es contenido nuevo, no una migración de forma.
tx = tx.createIfNotExists({
  _id: "contacto-profesional",
  _type: "contacto",
  invitacion: contacto.invitacion,
  canales: contacto.canales.map((c, j) => ({
    _key: `canal-${j}`,
    medio: c.medio,
    destino: c.destino,
  })),
});
resumen.push("contacto profesional asegurado");

/* 9 · BUDÍN — MIGRACIÓN de forma, no reemplazo (31ª ola). -------------------
   Desde la 27ª ola el documento de Budín estaba deliberadamente fuera de este script:
   Delfina editó frases a mano en el Studio y pisarlo sería perder su trabajo. Ese
   criterio SIGUE valiendo y por eso lo que sigue no reemplaza nada.

   Lo que cambió es la forma: cada frase pasó de ser un texto suelto a ser {texto, gesto},
   porque ahora la cara con la que Budín dice algo la elige la frase. Así que hay que
   convertir lo que ya está cargado, conservando SUS textos:

     · si la frase ya es un objeto, no se toca (la migración ya corrió, o la escribió
       ella con su cara elegida);
     · si es un texto suelto, se busca ese texto exacto en la semilla para recuperar el
       gesto que le corresponde;
     · y si no aparece —porque la escribió ella— entra con la cara seria, que es el
       registro de la mayoría de su humor y el default del Studio.

   El documento se toca con un `patch` de los dos campos, no con un `createOrReplace`:
   el saludo y la frase de la amistad quedan como estén. */
const GESTO_POR_DEFECTO = "ladeado";
/** Las caras que existen hoy. Cualquier otra que quede en el dataset hay que reasignarla. */
const GESTOS_VIGENTES = new Set(["alegre", "ladeado"]);
const gestoDeSemilla = new Map(
  [...budin.frases, ...(budin.secretas ?? [])].map((f) => [f.texto, f.gesto]),
);

/**
 * Deja cada frase en la forma vigente. Dos conversiones, y ninguna toca el texto:
 *   · TEXTO SUELTO → {texto, gesto} (31ª ola), con el gesto que le corresponde en la
 *     semilla; si la escribió ella y no está, entra con la cara seria.
 *   · GESTO RETIRADO → el que le corresponde hoy (33ª ola: se fue `curioso`). Se busca
 *     por texto en la semilla para respetar la recategorización que se hizo a mano, y si
 *     no aparece, cae en la cara seria, que es el default del Studio.
 */
const migrarFrases = (lista, prefijo) =>
  (lista ?? []).map((f, i) => {
    if (typeof f === "string") {
      return {
        _key: `${prefijo}-${i}`,
        texto: f,
        gesto: gestoDeSemilla.get(f) ?? GESTO_POR_DEFECTO,
      };
    }
    if (!GESTOS_VIGENTES.has(f.gesto)) {
      return { ...f, gesto: gestoDeSemilla.get(f.texto) ?? GESTO_POR_DEFECTO };
    }
    return f;
  });

/* EL SALUDO (32ª ola). Cambió de texto por indicación del usuario, y como Budín está
   fuera de la sincronización hay que empujarlo a mano — pero sólo si nadie lo tocó. Se
   compara contra el valor que tenía la semilla anterior: si coincide, el documento nunca
   se editó y se puede actualizar sin perder nada; si no coincide, alguien lo escribió en
   el Studio y ese texto manda. Es la misma lógica que protege a las frases. */
const SALUDO_ANTERIOR = "Hola, soy Budín!";

const budinDoc = await cliente.fetch(
  `*[_type == "budin"][0]{ _id, saludo, frases, secretas }`,
);
if (budinDoc) {
  const cambios = {};

  const todas = [...(budinDoc.frases ?? []), ...(budinDoc.secretas ?? [])];
  const sueltas = todas.filter((f) => typeof f === "string").length;
  const conGestoViejo = todas.filter(
    (f) => typeof f === "object" && f && !GESTOS_VIGENTES.has(f.gesto),
  ).length;

  if (sueltas > 0 || conGestoViejo > 0) {
    cambios.frases = migrarFrases(budinDoc.frases, "frase");
    cambios.secretas = migrarFrases(budinDoc.secretas, "secreta");
    if (sueltas > 0) resumen.push(`${sueltas} frases de Budín migradas a {texto, gesto}`);
    if (conGestoViejo > 0) {
      resumen.push(`${conGestoViejo} frases de Budín con una cara retirada, reasignadas`);
    }
  } else {
    resumen.push("frases de Budín ya al día (no se tocan)");
  }

  if (budinDoc.saludo === SALUDO_ANTERIOR && budin.saludo !== budinDoc.saludo) {
    cambios.saludo = budin.saludo;
    resumen.push("saludo de Budín actualizado");
  } else if (budinDoc.saludo !== budin.saludo) {
    resumen.push(`saludo de Budín NO se toca (editado en el Studio: "${budinDoc.saludo}")`);
  }

  if (Object.keys(cambios).length > 0) {
    tx = tx.patch(budinDoc._id, (p) => p.set(cambios));
  }
}

/* 10 · REDES — corrección puntual, con la misma cautela que el saludo de Budín.
   El handle de TikTok que se mostraba no coincidía con el de su propia URL; Delfina
   confirmó cuál es el correcto. Se corrige comparando contra el valor equivocado: si el
   documento todavía lo tiene, nadie lo editó y se puede actualizar; si dice otra cosa,
   alguien lo escribió en el Studio y ese texto manda. */
const HANDLES_A_CORREGIR = { "red-tiktok": "@gayosodelfi" };

const redesEnDataset = await cliente.fetch(`*[_type == "red"]{ _id, usuario }`);
for (const doc of redesEnDataset) {
  const equivocado = HANDLES_A_CORREGIR[doc._id];
  if (!equivocado || doc.usuario !== equivocado) continue;
  const correcto = redes.find((r) => `red-${r.id}` === doc._id)?.usuario;
  if (!correcto || correcto === doc.usuario) continue;
  tx = tx.patch(doc._id, (p) => p.set({ usuario: correcto }));
  resumen.push(`handle de ${doc._id.replace("red-", "")} corregido`);
}

await tx.commit();

console.log("\n✓ Dataset sincronizado:");
for (const linea of resumen) console.log("  ·", linea);
console.log(
  "\n  Abrí /studio para completar lo que falta: rubro, historia, resultados y\n" +
    "  fotos de cada marca; y la próxima fecha real de las experiencias.\n",
);
