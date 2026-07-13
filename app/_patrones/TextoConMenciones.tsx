import { Fragment } from "react";

/**
 * Convierte las menciones `@usuario` que aparecen dentro del contenido (por ejemplo
 * en los captions de la serie, como `@zarehmi`) en enlaces a su perfil de Instagram
 * (Bloque 6.5). Un pequeño detalle que hace el contenido más natural y vivo.
 *
 * Preserva el resto del texto tal cual (el contenedor puede usar `white-space:
 * pre-line` para respetar los saltos de línea originales).
 */
export function TextoConMenciones({ texto }: { texto: string }) {
  // Al partir con el grupo capturado, los tramos de mención quedan como `@usuario`
  // (empiezan con "@"); el resto es texto plano.
  const partes = texto.split(/(@[a-zA-Z0-9._]+)/g);

  return (
    <>
      {partes.map((parte, i) => {
        if (parte.startsWith("@")) {
          const usuario = parte.slice(1).replace(/[.]+$/, "");
          return (
            <a
              key={i}
              href={`https://instagram.com/${usuario}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mencion-ig"
            >
              {parte}
            </a>
          );
        }
        return <Fragment key={i}>{parte}</Fragment>;
      })}
    </>
  );
}
