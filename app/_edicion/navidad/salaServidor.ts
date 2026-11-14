import { getSala, type RGB, type Sala } from "../../_chrome/atmosferas/config";
import { salaSegunVersion } from "./paletas";
import { BASE } from "./variantes";

const hexARgb = (h: string): RGB => {
  const n = parseInt(h.slice(1), 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
};

/** La sala con la que sale el HTML: la de la variante base, o la habitual si la base no la
 *  recolorea. Respeta la forma de `Sala` para que `Banda` no tenga que distinguir nada. */
export function salaDeLaEdicion(clave: string | undefined): Sala {
  // Con su versión: en B, sólo las salas de Navidad se visten y el resto sale con su color
  // de siempre, ya desde el HTML.
  const e = salaSegunVersion(clave, BASE.paleta, BASE.intensidad, BASE.version);
  if (!e) return getSala(clave);
  return {
    bg: e.bg,
    solido: e.bg,
    ink: hexARgb(e.ink),
    inkSoft: hexARgb(e.inkSoft),
    accent: hexARgb(e.accent),
    navBg: hexARgb(e.bg),
    oscura: e.oscura,
    banda: true,
  };
}
