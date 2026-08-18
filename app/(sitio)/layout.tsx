import { Navbar } from "../_chrome/Navbar";
import { LenisProvider } from "../_chrome/LenisProvider";
import { AtmosferaProvider } from "../_chrome/atmosferas/AtmosferaProvider";
import { Budin } from "../_chrome/Budin";
import { getBudin, getMomentos, getRedes } from "@/content";

/**
 * El "chrome" del recorrido (Bloque 8 · 14ª ola): pantalla de carga, motor de atmósfera
 * del navbar, scroll suave, navbar y Budín. Vive en el grupo `(sitio)` —que no aparece
 * en la URL— para que el Studio de `/studio` quede limpio, sin la navegación de la web
 * encima.
 *
 * Es un server component: acá se resuelve el contenido que necesitan las dos piezas de
 * cliente (navbar y Budín) y se les pasa por props. El CMS nunca se consulta desde el
 * navegador.
 */
export default async function SitioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [momentos, redes, vozBudin] = await Promise.all([
    getMomentos(),
    getRedes(),
    getBudin(),
  ]);

  return (
    <>
      {/* PANTALLA DE CARGA (Bloque 8 · 6ª ola; EL INTERCAMBIO en la 31ª).
          Animación CSS en el HTML inicial → sin flash de hidratación, sin JS, y con
          `prefers-reduced-motion` se retira enseguida. No es un spinner: es una extensión
          breve del universo.

          31ª ola — UN INTERCAMBIO, no un asomo. La versión anterior sacaba a Budín por
          detrás del disco del logotipo; leía como un truco de escondite y no como la
          identidad presentándose. Ahora los dos ocupan EL MISMO LUGAR y se turnan: el
          logotipo entra, se sostiene, y le deja el sitio a Budín. Es el gesto más simple
          que existe para decir "estos dos son lo mismo", y por eso funciona mejor que
          cualquier coreografía.

          Decisiones que lo sostienen:
           · UNA sola vuelta. Alcanza con que el relevo se perciba una vez; repetirlo
             necesita segundos que retrasan el hero y convierte la pantalla en el spinner
             que justamente evita. Total: 2,2s, menos que las versiones anteriores.
           · TERMINA EN BUDÍN, no vuelve al logotipo. Lo último que se ve antes del sitio
             es la cara que después vive en la esquina: la pantalla se lo entrega al
             recorrido en vez de cerrarse sobre sí misma.
           · MISMA CASILLA, mismo centro óptico. No se cruzan ni se corren: uno se apaga
             mientras el otro se enciende, con un solapamiento corto que es lo que hace
             que se lea como relevo y no como dos apariciones sueltas.
           · EL BUDÍN DE LA CARGA ES EL RETRATO ORIGINAL (33ª ola, decisión de Delfina),
             no una de las expresiones del recorrido. El motivo es editorial: ese dibujo
             conserva mejor la ternura del personaje, y el primer contacto tiene que ser
             con su versión más cálida. Es el mismo retrato que la 31ª ola sacó de la
             interacción por no pertenecer a la serie de los stickers — acá no compite con
             nadie, así que esa objeción no aplica y su calidez sí.
           · ARCHIVOS LIVIANOS. Van en el HTML inicial, así que no pasan por el
             optimizador de Next: WebP a la medida real (27 y 44 KB, contra los 947 KB del
             PNG del logotipo que se usaba antes). Una pantalla de carga que tarda en
             cargar es exactamente el problema que viene a evitar. */}
      <div className="pantalla-carga" aria-hidden="true">
        <div className="pantalla-carga-escena">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pantalla-carga-logo"
            src="/logotipo/logotipo-carga.webp"
            alt=""
            width={400}
            height={397}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pantalla-carga-budin"
            src="/ilustraciones/budin-carga.webp"
            alt=""
            width={380}
            height={390}
          />
        </div>
      </div>
      <AtmosferaProvider>
        <LenisProvider>
          <Navbar momentos={momentos} redes={redes} vozBudin={vozBudin} />
          {children}
          {/* Budín acompaña todo el recorrido (13ª ola). Sólo en desktop: en mobile
              aparece dentro del menú, para no tapar contenido en pantallas chicas. */}
          <Budin voz={vozBudin} />
        </LenisProvider>
      </AtmosferaProvider>
    </>
  );
}
