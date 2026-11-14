import "./pagina-navidad.css";
import Image from "next/image";
import Link from "next/link";
import { getContactoProfesional } from "@/content";
import { Banda } from "../../_patrones/Banda";
import { Voz } from "../../_patrones/Voz";
import { Aparicion } from "../../_patrones/Aparicion";
import { EspacioFoto } from "../../_chrome/adornos/EspacioFoto";
import { Flecha } from "../../_chrome/adornos/Flecha";
import { Sticker, type NombreSticker } from "./Sticker";
import { CajaQueCrece } from "./CajaQueCrece";
import { BANDA, PAGINA } from "./contenido";

/**
 * `/navidad` (Bloque 12 · quinta pasada): la primera versión completa.
 * -----------------------------------------------------------------------------
 * Responde, en orden, las preguntas de quien llega por curiosidad desde la home o desde una
 * historia:
 *
 *   ENTRADA            ¿Hay algo para mí?        La carta: todo, partido en dos.
 *   PARA LLEVARTE      ¿Qué puedo comprar?       Cookie Box y Box Kids.
 *   LO ARMAMOS JUNTOS  ¿Qué puedo personalizar?  Empresas, despedidas y marcas.
 *   CIERRE             ¿Cómo la contacto?        Un solo contacto, con los canales reales.
 *
 * La diferencia entre COMPRAR y CONSULTAR se ve antes de leerla: lo que se lleva vive en
 * fichas de papel con su botón de pedido; lo que se arma vive sobre la sala, como las
 * propuestas de "Trabajemos juntos", y termina en "Escribime". Los canales aparecen UNA vez,
 * al final (D8): repetidos en cada propuesta se leen como formulario.
 *
 * Cada sala es una `Banda` con clave propia (\`navidad-entrada\`, \`-llevar\`, \`-juntos\`,
 * \`-cierre\`): por eso las ondas, los colores de cada variante, la versión A o B, el ambiente
 * y los stickers llegan acá igual que al resto de la casa, sin un caso especial.
 *
 * Material provisional (prompt del bloque): nada provisional pasa por la caja real. La Cookie
 * Box y la Box Empresarial se cuentan con stickers dibujados —se leen como ilustración, no
 * como producto—; la foto de Kids y la de las despedidas son fotos reales del proyecto y la de
 * Kids lleva su rótulo de referencia.
 */
/** Cómo se nombra cada canal: el mismo criterio que `ContactoProfesional`. */
const CANAL: Record<string, string> = { instagram: "Instagram", whatsapp: "WhatsApp", email: "Mail" };

export async function PaginaEdicion() {
  const contacto = await getContactoProfesional();
  const { entrada, carta, llevar, juntos, cierre } = PAGINA;

  return (
    <>
      <h1 className="sr-only">{PAGINA.h1}</h1>
      <main className="pagina-navidad">
        {/* ---- ENTRADA: la carta ------------------------------------------------ */}
        <Banda
          atmosfera="navidad-entrada"
          ancla="navidad-entrada"
          kicker={entrada.kicker}
          titulo={entrada.titulo}
          primero
        >
          <Aparicion>
            <Voz texto={entrada.bajada} escala="l" className="pn-bajada" />
          </Aparicion>
          <Aparicion orden={1}>
            <nav className="pn-carta" aria-label="Lo que hay para estas fiestas">
              {carta.map((g) => (
                <div key={g.rotulo} className="pn-carta-grupo">
                  <p className="pn-carta-rotulo">{g.rotulo}</p>
                  <p className="pn-carta-nota">{g.nota}</p>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.href}>
                        <a href={it.href} className="pn-carta-item">
                          <Sticker nombre={it.sticker as NombreSticker} className="pn-carta-sticker" />
                          <span className="pn-carta-texto">
                            <span className="pn-carta-para">{it.para}</span>
                            <span className="pn-carta-que">{it.que}</span>
                          </span>
                          <Flecha className="pn-carta-flecha" size={16} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </Aparicion>
        </Banda>

        {/* ---- PARA LLEVARTE ---------------------------------------------------- */}
        <Banda atmosfera="navidad-llevar" ancla="para-llevarte" kicker={llevar.kicker} titulo={llevar.titulo}>
          <Aparicion>
            <Voz texto={llevar.bajada} escala="l" className="pn-bajada" />
          </Aparicion>

          <div className="pn-fichas">
            {/* Cookie Box: la caja dibujada, con sus masitas. */}
            <Aparicion>
              <article id={llevar.cookie.id} className="pn-ficha pn-ancla" aria-labelledby="pn-cookie">
                <div className="pn-caja" aria-hidden>
                  <svg className="pn-caja-fondo" viewBox="0 0 200 150" focusable="false">
                    <path d="M14 46 L100 20 L186 46 L100 72 Z" fill="#d8b98c" stroke="#3a1a12" strokeWidth="2.4" strokeLinejoin="round" />
                    <path d="M14 46 V112 L100 140 V72 Z" fill="#c59f6d" stroke="#3a1a12" strokeWidth="2.4" strokeLinejoin="round" />
                    <path d="M186 46 V112 L100 140 V72 Z" fill="#b08657" stroke="#3a1a12" strokeWidth="2.4" strokeLinejoin="round" />
                    <path d="M100 72 V140" stroke="#c4202f" strokeWidth="9" />
                  </svg>
                  <Sticker nombre="masita" className="pn-caja-pieza pn-caja-pieza--a sticker-vivo" />
                  <Sticker nombre="galleta" className="pn-caja-pieza pn-caja-pieza--b sticker-vivo" />
                  <Sticker nombre="estrella" className="pn-caja-pieza pn-caja-pieza--c sticker-vivo" />
                </div>
                <div className="pn-ficha-texto">
                  <p className="pn-para">{llevar.cookie.para}</p>
                  <h3 id="pn-cookie" className="pn-nombre">{llevar.cookie.nombre}</h3>
                  <p className="pn-texto">{llevar.cookie.texto}</p>
                  <Pedido />
                </div>
              </article>
            </Aparicion>

            {/* Box Kids: las dos para armar, con lo que trae cada una. */}
            <Aparicion>
              <article id={llevar.kids.id} className="pn-ficha pn-ficha--kids pn-ancla" aria-labelledby="pn-kids">
                <figure className="pn-kids-foto">
                  <EspacioFoto ratio="4 / 5" forma="arco">
                    <Image
                      src="/galeria/glase.jpg"
                      alt="Una mano de chico decorando con royal icing rojo una galletita con forma de bastón, junto a una planilla de stickers navideños."
                      fill
                      sizes="(max-width: 820px) 70vw, 26vw"
                      style={{ objectFit: "cover" }}
                    />
                  </EspacioFoto>
                  <figcaption className="pn-referencia">Foto de referencia</figcaption>
                  <span className="pn-stickers" aria-hidden>
                    {llevar.kids.sello}
                  </span>
                </figure>
                <div className="pn-ficha-texto">
                  <p className="pn-para">{llevar.kids.para}</p>
                  <h3 id="pn-kids" className="pn-nombre">{llevar.kids.nombre}</h3>
                  <p className="pn-texto">{llevar.kids.texto}</p>
                  <div className="pn-variantes">
                    {llevar.kids.variantes.map((v) => (
                      <section key={v.nombre} className="pn-variante" aria-label={v.nombre}>
                        <Sticker nombre={v.sticker as NombreSticker} className="pn-variante-sticker sticker-vivo" />
                        <h4 className="pn-variante-nombre">{v.nombre}</h4>
                        {/* La dificultad: el texto la dice, y tres marcas la muestran. */}
                        <p className="pn-dificultad" data-nivel={v.dificultad.nivel}>
                          <span className="pn-dificultad-marca" aria-hidden>
                            {[1, 2, 3].map((n) => (
                              <span key={n} data-lleno={n <= v.dificultad.nivel ? "" : undefined} />
                            ))}
                          </span>
                          {v.dificultad.texto}
                        </p>
                        <ul className="pn-incluye">
                          {v.incluye.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                  <Pedido />
                </div>
              </article>
            </Aparicion>
          </div>
        </Banda>

        {/* ---- LO ARMAMOS JUNTOS ------------------------------------------------ */}
        <Banda atmosfera="navidad-juntos" ancla="lo-armamos-juntos" kicker={juntos.kicker} titulo={juntos.titulo}>
          <Aparicion>
            <Voz texto={juntos.bajada} escala="l" className="pn-bajada" />
          </Aparicion>

          <div className="pn-propuestas">
            {juntos.propuestas.map((p, i) => (
              <Aparicion key={p.id}>
                <article id={p.id} className="pn-propuesta pn-ancla" data-lado={i % 2 ? "der" : "izq"} aria-labelledby={`pn-${p.id}`}>
                  <div className="pn-propuesta-visual">
                    {p.id === "para-mi-empresa" && <CajaQueCrece leyenda="Cookie Box + confituras + pan dulce o budín inglés" />}
                    {p.id === "una-despedida" && (
                      <EspacioFoto ratio="4 / 5" forma="arco">
                        <Image
                          src="/galeria/emplatando.jpg"
                          alt="Delfina, de chaqueta blanca y gorro, emplatando y riéndose sobre la mesada."
                          fill
                          sizes="(max-width: 820px) 70vw, 26vw"
                          style={{ objectFit: "cover" }}
                        />
                      </EspacioFoto>
                    )}
                    {p.id === "para-mi-marca" && (
                      <div className="pn-marca" aria-hidden>
                        <Sticker nombre="manga" className="pn-marca-sticker sticker-vivo" />
                      </div>
                    )}
                  </div>
                  <div className="pn-propuesta-texto">
                    <p className="pn-para pn-para--sala">{p.para}</p>
                    <h3 id={`pn-${p.id}`} className="pn-nombre pn-nombre--sala">{p.nombre}</h3>
                    <p className="pn-texto pn-texto--sala">{p.texto}</p>
                    <p className="pn-despues">{p.despues}</p>
                    <div className="pn-acciones">
                      <a href="#seccion-navidad-contacto" className="enlace-flecha text-titulo">
                        {juntos.escribime}
                        <Flecha className="enlace-flecha-icono pn-flecha-abajo" size={18} />
                      </a>
                      {p.id === "para-mi-marca" && (
                        <Link href="/colaboraciones" className="enlace-flecha text-titulo">
                          {juntos.colaboraciones}
                          <Flecha className="enlace-flecha-icono" size={18} />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              </Aparicion>
            ))}
          </div>
        </Banda>

        {/* ---- CIERRE: un solo contacto ----------------------------------------- */}
        <Banda
          atmosfera="navidad-cierre"
          ancla="navidad-contacto"
          kicker={cierre.kicker}
          titulo={cierre.titulo}
          cierre
          firma
        >
          <div className="pn-cierre">
            {/* Los canales reales y confirmados de Delfina (Instagram y mail), los mismos de
                "Trabajemos juntos". Alineados con el título, no centrados como allá: acá el
                contacto ES la sala. */}
            <Aparicion>
              <Voz texto={BANDA.invitacion} escala="l" />
            </Aparicion>
            <Aparicion orden={1}>
              <nav className="pn-canales" aria-label="Escribirle a Delfina">
                {contacto.canales.map((c, i) => (
                  <a
                    key={`${c.medio}-${i}`}
                    href={c.destino}
                    {...(c.medio !== "email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="enlace-flecha text-titulo"
                  >
                    {CANAL[c.medio] ?? c.medio}
                    <Flecha className="enlace-flecha-icono" size={18} />
                  </a>
                ))}
              </nav>
            </Aparicion>
            <Aparicion orden={2}>
              <p className="pn-reserva">{cierre.reserva}</p>
            </Aparicion>
            <Aparicion orden={3}>
              <Link href="/" className="enlace-flecha text-titulo pn-volver">
                {cierre.volver}
              </Link>
            </Aparicion>
          </div>
        </Banda>
      </main>
    </>
  );
}

/**
 * El pedido de lo que se lleva (sexta pasada). La compra va a ser desde la página, con Mercado
 * Pago (chats 017-019); hasta que esté probada, la acción dice "Muy pronto": se ve —es la
 * diferencia con "Escribime"— pero no lleva a ningún lado. Al lado, el contacto, sin prometer
 * una reserva que no está confirmada.
 */
function Pedido() {
  const { pedir, pedirNota, escribime } = PAGINA.llevar;
  return (
    <div className="pn-pedido">
      <span className="pill-proximamente pn-pronto">{pedir}</span>
      <span className="pn-pronto-nota">{pedirNota}</span>
      <a href="#seccion-navidad-contacto" className="pn-reservar">
        {escribime}
      </a>
    </div>
  );
}
