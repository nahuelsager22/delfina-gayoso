import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
