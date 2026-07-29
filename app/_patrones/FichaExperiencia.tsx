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
 * Ficha de experiencia (Bloque 8 · 17ª ola). La misma habitación que la ficha de ebook
 * —zigzag con ancla, portada real, voz en serif, aire alrededor— pero para una fecha:
 * suma el cuándo y el dónde, y responde al estado.
 *
 * Es la forma "en reposo": la experiencia destacada usa `ProximaExperiencia`, con más
 * presencia. Acá viven las demás (las que vienen después, y las que todavía no tienen
 * fecha y se comunican como algo que llega).
 */
export function FichaExperiencia({
  experiencia,
  ancla = "izq",
  ampliada = false,
}: {
  experiencia: Experiencia;
  /** Lado en el que se apoya la habitación (zigzag con ancla, §4.2c). */
  ancla?: "izq" | "der";
  /**
   * En la página de Experiencias (18ª ola) la ficha cuenta más: suma el texto ampliado
   * —cómo es realmente estar ahí—. En el recorrido se mantiene breve: ahí la fecha
   * invita, no explica.
   */
  ampliada?: boolean;
}) {
  const e = experiencia;
  const estado = estadoDeExperiencia(e);
  const fecha = fechaLegible(e);
  const enlaces = admiteCalendario(estado) ? enlacesCalendario(e) : undefined;
  const modalidad = e.modalidad === "online" ? "Online, en vivo" : "Presencial";

  return (
    <Aparicion
      style={{
        maxInlineSize: "min(56rem, 100%)",
        alignSelf: ancla === "der" ? "flex-end" : "flex-start",
      }}
    >
      <article className="ficha-exp" data-ancla={ancla}>
        <div className="ficha-exp-foto">
          <EspacioFoto ratio="4 / 5" forma="arco">
            {medioDeExperiencia(e, "(max-width: 640px) 92vw, 340px")}
          </EspacioFoto>
        </div>

        <div className="ficha-exp-cuerpo">
          <p className="momento-kicker ficha-exp-modalidad">{modalidad}</p>

          <h3 className="text-titulo ficha-exp-nombre">{e.nombre}</h3>

          <SelloEstado estado={estado} />

          {/* El cuándo y el dónde, en una línea: dato, no protagonista. */}
          <p className="ficha-exp-meta">
            {fecha ? (
              <time dateTime={fecha.iso}>
                {fecha.diaSemana} {fecha.dia} de {fecha.mes} · {fecha.horario} h
              </time>
            ) : (
              <span>Fecha por confirmar</span>
            )}
            {e.lugar && <span> · {e.lugar}</span>}
            {e.precio && <span> · {e.precio}</span>}
          </p>

          <Voz texto={e.descripcion} escala="cuerpo" />

          {/* Información ampliada: sólo en la página de Experiencias. */}
          {ampliada && e.historia && (
            <Voz texto={e.historia} escala="cuerpo" className="ficha-exp-historia" />
          )}

          {e.queTeLlevas.length > 0 && (
            <ul className="ficha-exp-lista">
              {e.queTeLlevas.map((item) => (
                <li key={item}>
                  <span aria-hidden>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="ficha-exp-acciones">
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
            {enlaces && <GuardarFecha enlaces={enlaces} />}
          </div>
        </div>
      </article>
    </Aparicion>
  );
}
