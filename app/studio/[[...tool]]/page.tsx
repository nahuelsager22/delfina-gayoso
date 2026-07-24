import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

/**
 * El Studio, servido desde el propio sitio en `/studio` (Bloque 8 · 14ª ola).
 *
 * Es una ruta aparte y con su propio bundle: NO agrega un solo byte al recorrido que ve
 * el visitante. `dynamic = "force-static"` deja el shell estático; el Studio es una app
 * de cliente que se hidrata sola.
 */
export const dynamic = "force-static";

export const metadata = {
  title: "Contenido — Delfina Gayoso",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
