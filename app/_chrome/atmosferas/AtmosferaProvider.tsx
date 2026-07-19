/**
 * Proveedor de contexto de salas (Bloque 8 · 7ª ola). Con la composición editorial —fondo
 * CREMA + bloques de color contenidos (ver `Momento`)— el navbar vive siempre sobre el
 * crema: su tinta es fija (Hierro sobre Harina), así que ya no necesita interpolar el
 * color por sección. Este proveedor queda como envoltura neutra (se conserva para no
 * cambiar el `layout`); si en el futuro un bloque llega a pleno ancho bajo el bar, acá
 * volvería a vivir esa lógica.
 */
export function AtmosferaProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
