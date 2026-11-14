import type { NextConfig } from "next";

/** Los Preview de las ramas de prueba encienden la edición y su panel de exploración sin tocar
 *  el dashboard de Vercel: `VERCEL_ENV` y `VERCEL_GIT_COMMIT_REF` son variables de sistema
 *  que Vercel define en cada build. Producción (`main`) y cualquier otra rama quedan como
 *  siempre. Si una variable se define a mano (en `.env.local` o en Vercel), ese valor manda.
 *
 *  `delfina-merry-christmas` (2026-11-14) guarda la EXPLORACIÓN COMPLETA: todas las
 *  alternativas del panel, tal como las vio Delfina antes de elegir. La rama de la propuesta
 *  elegida es `delfina-preview-01`. */
const RAMAS_DE_PRUEBA = ["delfina-preview-01", "delfina-merry-christmas"];
const RAMA_DE_PRUEBA =
  process.env.VERCEL_ENV === "preview" &&
  RAMAS_DE_PRUEBA.includes(process.env.VERCEL_GIT_COMMIT_REF ?? "");

const nextConfig: NextConfig = {
  // La bandera de la edición se escribe en el código al compilar, y no se lee en ejecución,
  // para que el compilador pueda tirar la rama entera: apagada, nada de `app/_edicion` entra
  // al build. Cambiarla exige volver a compilar (Bloque 12).
  //
  // `EDICION_NAVIDAD_EXPLORAR` suma, sobre la edición encendida, el panel de variantes y las
  // tres ondas para compararlas en un deployment de prueba (Preview de `delfina-preview-01`).
  // En desarrollo ya están siempre. Se retira junto con las variantes al elegir la dirección.
  env: {
    EDICION_NAVIDAD: process.env.EDICION_NAVIDAD ?? (RAMA_DE_PRUEBA ? "1" : ""),
    EDICION_NAVIDAD_EXPLORAR: process.env.EDICION_NAVIDAD_EXPLORAR ?? (RAMA_DE_PRUEBA ? "1" : ""),
  },
  images: {
    // Las fotos que Delfi suba al CMS se sirven desde la CDN de Sanity y siguen pasando
    // por el optimizador de Next: mismo formato y mismo peso servido que hoy con los
    // archivos locales (Bloque 8 · 14ª ola).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],

    // AVIF antes que WebP (Bloque 10 · E1). El default sirve sólo WebP; en fotografía
    // —que es casi todo el peso del sitio— AVIF pesa entre un 20 y un 30 % menos con la
    // misma calidad. La lista es por orden de preferencia y el navegador negocia: el que
    // no lo soporta recibe WebP igual que hoy.
    formats: ["image/avif", "image/webp"],

    // Un mes de caché para la imagen ya transformada (Bloque 10 · E1). El default son
    // 4 horas, así que cada foto se volvía a transformar seis veces por día sin que
    // hubiera cambiado nada. Cuando Delfina cambia una foto no hay que esperar: el
    // webhook de revalidación ya existe y la URL del asset cambia con el archivo.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
