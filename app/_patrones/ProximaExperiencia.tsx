import {
  admiteCalendario,
  admiteReserva,
  estadoDeExperiencia,
  type Experiencia,
} from "@/content";
import { Aparicion } from "./Aparicion";
import { Voz } from "./Voz";
import { SelloEstado } from "./SelloEstado";
import { GuardarFecha } from "./GuardarFecha";
import { enlacesCalendario, fechaLegible } from "./calendario";
import { EspacioFoto } from "../_chrome/adornos/EspacioFoto";
import { Flecha } from "../_chrome/adornos/Flecha";
import { medioDeExperiencia } from "./medioExperiencia";

/**
 * La próxima experiencia (Bloque 8 · 17ª ola) — una INVITACIÓN, no una agenda.
 * -----------------------------------------------------------------------------
 * Muestra UNA sola: la de fecha más cercana. Una lista de fechas obliga a comparar y a
 * leer; una invitación se acepta o no. Y "por experiencia, la gente no lee nada": por eso
 * lo primero que llega es la foto, después el día como pieza gráfica —un número grande,
 * no una tabla— y recién entonces el nombre. El texto viene después, y es corto.
 *
 *  · Dos acciones, distintas en peso: reservar (el gesto de compromiso, con el CTA del
 *    universo) y guardar la fecha (editorial, para quien todavía lo está pensando).
 *  · La interfaz responde al ESTADO: completa o ya sucedida no ofrece reservar.
 *  · Sin foto todavía, el hueco es una composición terminada (`EspacioFoto`), nunca un
 *    rectángulo gris: cuando llegue la imagen ocupa exactamente ese lugar.
 *
 * Si no hay ninguna experiencia con fecha futura, el momento directamente no lo monta:
 * el sitio no muestra un módulo vacío ni un "no hay clases por ahora".
 */
export function ProximaExperiencia({ experiencia }: { experiencia: Experiencia }) {
  const e = experiencia;
  const estado = estadoDeExperiencia(e);
  const fecha = fechaLegible(e);
  const enlaces = admiteCalendario(estado) ? enlacesCalendario(e) : undefined;
  const modalidad = e.modalidad === "online" ? "Online, en vivo" : "Presencial";

  return (
    <Aparicion className="proxima">
      <p className="momento-kicker proxima-rotulo">La próxima experiencia</p>

      <div className="proxima-cuerpo">
        {/* La foto primero: se muestra antes de explicar. El marco en arco del sistema
            es el mismo con foto y sin foto — cuando llegue la imagen, ocupa el hueco. */}
        <div className="proxima-foto">
          <EspacioFoto ratio="4 / 5" forma="arco">
            {medioDeExperiencia(e, "(max-width: 900px) 92vw, 420px")}
          </EspacioFoto>
        </div>

        <div className="proxima-contenido">
          <SelloEstado estado={estado} />

          {/* El día, como pieza gráfica. */}
          {fecha && (
            <p className="proxima-fecha">
              <time dateTime={fecha.iso} className="proxima-fecha-bloque">
                <span className="proxima-dia voz-display">{fecha.dia}</span>
                <span className="proxima-mes">{fecha.mes}</span>
              </time>
              <span className="proxima-cuando">
                {fecha.diaSemana} · {fecha.horario} h
              </span>
              <span className="sr-only">{fecha.completa}</span>
            </p>
          )}

          <h3 className="proxima-nombre voz-display">{e.nombre}</h3>

          <p className="proxima-donde">
            {modalidad}
            {e.lugar && ` · ${e.lugar}`}
            {e.precio && ` · ${e.precio}`}
          </p>

          <Voz texto={e.descripcion} escala="cuerpo" className="proxima-voz" />

          {e.queTeLlevas.length > 0 && (
            <ul className="proxima-detalle">
              {e.queTeLlevas.map((item) => (
                <li key={item}>
                  <span aria-hidden>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="proxima-acciones">
            {admiteReserva(estado) && e.destino && (
              <a
                href={e.destino}
                {...(e.destino.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="cta-producto"
                aria-label={`${e.ctaLabel ?? "Reservar tu lugar"}: ${e.nombre}`}
              >
                <span>{e.ctaLabel ?? "Reservar tu lugar"}</span>
                <Flecha className="cta-flecha" size={18} />
              </a>
            )}

            {estado === "completa" && (
              <p className="proxima-nota">
                Esta se llenó. Escribime y te aviso de la próxima.
              </p>
            )}

            {enlaces && <GuardarFecha enlaces={enlaces} />}
          </div>
        </div>
      </div>
    </Aparicion>
  );
}
