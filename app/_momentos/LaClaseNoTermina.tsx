import { getRedes, getVozDeMomento, type VozDelfina } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";

/**
 * Momento 7 — La clase no termina (arquitectura §1). La salida, en su voz. Cierra
 * el arco en pertenencia, NO en transacción.
 *
 *  · Sin cierre de venta, sin CTA comercial, sin footer corporativo genérico, sin
 *    newsletter/popup: la clase abierta que nunca termina no se cierra, se continúa
 *    (concepto 2). Su voz (registro "cierre") lleva el final; la calidez deja
 *    "quiero seguir esto / quiero cocinar".
 *  · Ritmo "silencio": la última detención respira. Aparición "vapor".
 *  · Redes integradas (Bloque 6.5 · R5): en vez de un único "Seguime cocinando",
 *    una invitación en su voz + enlaces a Instagram y TikTok (los canales reales,
 *    leídos de `getRedes()`). "Volver al principio" mantiene el bucle literal de la
 *    clase. Todo son enlaces de texto de igual peso, sin botón `Yema` (ese acento
 *    es de la compra) y sin jerarquía de embudo.
 *
 * El primer beat es la detención grande (voz-xl); el segundo, más contenido (voz-l).
 * `cierre-seguir` es el lead-in a las redes (se ubica arriba de los enlaces).
 */

const NOMBRE_RED: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
};

export function LaClaseNoTermina() {
  const voces = getVozDeMomento("la-clase-no-termina");
  const cierre = voces.filter((v) => v.id !== "cierre-seguir");
  const seguir = voces.find((v) => v.id === "cierre-seguir");
  const redes = getRedes();

  return (
    <Momento id="la-clase-no-termina">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2xl)",
          maxInlineSize: "var(--measure-voz)",
        }}
      >
        {cierre.map((v: VozDelfina, i) => (
          <Aparicion key={v.id} orden={i}>
            <Voz texto={v.texto} escala={i === 0 ? "xl" : "l"} />
          </Aparicion>
        ))}

        {/* Formas de seguir, sin jerarquía de embudo: la invitación en su voz y
            luego enlaces de texto de igual peso (redes + volver al principio). */}
        <Aparicion style={{ marginBlockStart: "var(--space-md)" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-sm)",
            }}
          >
            {seguir && <Voz texto={seguir.texto} escala="l" />}
            <nav
              aria-label="Seguir la clase"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-lg)",
              }}
            >
              {redes.map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-titulo"
                  style={{
                    fontFamily: "var(--font-mundo)",
                    color: "var(--color-hierro)",
                  }}
                  aria-label={`${NOMBRE_RED[r.plataforma] ?? r.plataforma} de Delfina (${r.usuario})`}
                >
                  {NOMBRE_RED[r.plataforma] ?? r.plataforma}
                </a>
              ))}
              <a
                href="#seccion-umbral"
                className="text-titulo"
                style={{
                  fontFamily: "var(--font-mundo)",
                  color: "var(--color-hierro)",
                }}
              >
                Volver al principio
              </a>
            </nav>
          </div>
        </Aparicion>
      </div>
    </Momento>
  );
}
