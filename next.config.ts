import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Las fotos que Delfi suba al CMS se sirven desde la CDN de Sanity y siguen pasando
    // por el optimizador de Next: mismo formato y mismo peso servido que hoy con los
    // archivos locales (Bloque 8 · 14ª ola).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
