/**
 * Marca de contenido de EJEMPLO (Bloque 6.5). Señala, de forma clara pero
 * discreta, que una ficha o propuesta es un placeholder ficticio y reemplazable:
 * así, cuando Delfina vea la v1, distingue enseguida el potencial de la web del
 * contenido real. Sans micro, en Piedra, con un borde hairline; sin gritar.
 */
export function MarcaEjemplo() {
  return (
    <span
      className="text-micro"
      title="Contenido de ejemplo, para reemplazar por información real."
      style={{
        display: "inline-flex",
        alignItems: "center",
        alignSelf: "flex-start",
        fontFamily: "var(--font-mundo)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "rgb(var(--atm-ink-soft, 62 54 45))",
        border: "1px solid rgb(var(--atm-ink-soft, 62 54 45) / 0.4)",
        borderRadius: "var(--radius-min)",
        padding: "2px var(--space-2xs)",
      }}
    >
      Ejemplo
    </span>
  );
}
