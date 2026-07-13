/**
 * Mancha de harina (Bloque 6.5 · enriquecimiento — CSS Mask). Un espolvoreo de
 * harina sobre la mesada: una textura muy tenue que aporta profundidad artesanal
 * SIN imágenes pesadas. Se resuelve con un patrón de puntos generado por CSS y una
 * máscara radial que lo desvanece en los bordes (parece dusting, no un recuadro).
 * Decorativa (`aria-hidden`). El detalle fino de la máscara vive en `.mancha-harina`.
 */
export function ManchaHarina() {
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        justifyContent: "center",
        marginBlock: "var(--space-md)",
      }}
    >
      <div className="mancha-harina" />
    </div>
  );
}
