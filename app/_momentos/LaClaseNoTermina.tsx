import { getRedes, getVozDeMomento, type VozDelfina } from "@/content";
import { Momento } from "../_patrones/Momento";
import { Voz } from "../_patrones/Voz";
import { Aparicion } from "../_patrones/Aparicion";
import { Flecha } from "../_chrome/adornos/Flecha";
import { LineaEditorial } from "../_chrome/adornos/LineaEditorial";
import { Adorno } from "../_chrome/adornos/Adorno";

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

export async function LaClaseNoTermina() {
  const voces = await getVozDeMomento("la-clase-no-termina");
  const cierre = voces.filter((v) => v.id !== "cierre-seguir");
  const seguir = voces.find((v) => v.id === "cierre-seguir");
  const redes = await getRedes();

  return (
    <Momento id="la-clase-no-termina" full alto="118svh">
      {/* Cierre editorial (Bloque 8 · 11ª ola): una sola columna, CENTRADA en el viewport
          (ya no anclada al fondo, que cortaba el título arriba). Sobre el MARRÓN del
          manual —el terracota pasó a ser acento—. Tipografía y espaciados calibrados para
          que todo el cierre entre en un solo viewport sin perder impacto. Sin logotipo,
          sin CTA de venta: la despedida la lleva su voz + las formas de seguir. */}
      <div className="cierre-escena">
      <div className="cierre-col">
        <div className="hero-texto" style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          {cierre.map((v: VozDelfina, i) => (
            <Aparicion key={v.id} orden={i}>
              <Voz
                texto={v.texto}
                escala={i === 0 ? "xl" : "l"}
                className={i === 0 ? "voz-hero" : undefined}
              />
              {i === 0 && (
                <LineaEditorial
                  variante="onda"
                  ancho="clamp(140px, 34%, 320px)"
                  style={{ marginBlockStart: "var(--space-md)" }}
                />
              )}
            </Aparicion>
          ))}

          {/* Formas de seguir, sin jerarquía de embudo: enlaces de igual peso con flecha. */}
          <Aparicion style={{ marginBlockStart: "var(--space-sm)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              {seguir && <Voz texto={seguir.texto} escala="l" />}
              <nav
                aria-label="Seguir la clase"
                style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-lg)" }}
              >
                {redes.map((r) => (
                  <a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enlace-flecha text-titulo"
                    aria-label={`${NOMBRE_RED[r.plataforma] ?? r.plataforma} de Delfina (${r.usuario})`}
                  >
                    {NOMBRE_RED[r.plataforma] ?? r.plataforma}
                    <Flecha className="enlace-flecha-icono" size={18} />
                  </a>
                ))}
                <a href="#seccion-quien-soy" className="enlace-flecha text-titulo">
                  Volver al principio
                </a>
              </nav>
            </div>
          </Aparicion>
        </div>

        {/* Las huellitas de Budín cruzando el cierre. 13ª ola: viven FUERA del flujo
            vertical (absolutas, justo debajo del texto) para no empujar la composición;
            el bloque de texto vuelve a respirar y entra en un viewport. */}
        <Adorno variante="huellas" className="adorno-cierre" />
      </div>

      {/* 13ª ola: Budín ya no vive acá como ilustración fija — ahora acompaña TODO el
          recorrido como personaje (ver `Budin`), así que repetirlo en el cierre sería
          redundante. Quedan sus huellitas: el rastro de que pasó. */}
      </div>
    </Momento>
  );
}
