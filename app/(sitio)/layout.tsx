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
      {/* Pantalla de carga (Bloque 8 · 6ª ola): el logotipo oficial con una respiración
          suave sobre `Harina`, que se disuelve sola (animación CSS, en el HTML inicial
          → sin flash de hidratación). No es un spinner genérico: es una extensión breve
          del universo. Con `prefers-reduced-motion` se retira de inmediato. */}
      <div className="pantalla-carga" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="pantalla-carga-logo"
          src="/logotipo/logotipo-1.png"
          alt=""
          width={180}
          height={180}
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
