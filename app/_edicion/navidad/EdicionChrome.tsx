import "./navidad.css";
import { CapasEdicion } from "./CapasEdicion";

/** Punto de entrada de la edición en el layout. Se importa con `import()` detrás de la
 *  bandera: con la bandera apagada, ni este CSS ni este JS entran al build. */
export function EdicionChrome() {
  return <CapasEdicion />;
}
