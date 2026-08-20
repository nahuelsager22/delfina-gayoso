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
      {/* PANTALLA DE CARGA (Bloque 8 · 6ª ola; simplificada en la 35ª).
          Animación CSS en el HTML inicial → sin flash de hidratación, sin JS, y con
          `prefers-reduced-motion` se retira enseguida. No es un spinner: es una extensión
          breve del universo.

          35ª ola — SÓLO EL LOGOTIPO (indicación del usuario). Entre la 30ª y la 34ª la
          pantalla probó dos formas de sumar a Budín: primero asomándose por detrás del
          disco y después turnándose con él en la misma casilla. Las dos funcionaban, y
          ninguna quedó: la entrada al sitio es donde la marca se presenta SOLA, y el
          personaje ya tiene todo el recorrido para aparecer. Queda anotado para no volver
          a proponerlo.

          El archivo va liviano porque está en el HTML inicial y no pasa por el optimizador
          de Next: WebP a la medida real (27 KB, contra los 947 KB del PNG que se usaba
          hasta la 30ª). Una pantalla de carga que tarda en cargar es exactamente el
          problema que viene a evitar. */}
      <div className="pantalla-carga" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="pantalla-carga-logo"
          src="/logotipo/logotipo-carga.webp"
          alt=""
          width={400}
          height={397}
        />
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
