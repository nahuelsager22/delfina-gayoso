import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Webhook de revalidación (Bloque 8 · 15ª ola).
 * -----------------------------------------------------------------------------
 * Elimina la espera de hasta 1 minuto (`revalidate: 60`) para reflejar cambios del
 * Studio: cuando Delfi PUBLICA en Sanity, Sanity llama a esta ruta y el sitio se
 * regenera al instante.
 *
 * CÓMO FUNCIONA — la pieza clave ya existía: TODA consulta a Sanity está etiquetada con
 * el tag `"contenido"` (ver `sanity/lib/client.ts` → `consultar()`). Así, un único
 * `revalidateTag("contenido")` invalida el caché de datos de todo el contenido y la
 * próxima visita reconstruye la página con lo recién publicado. No hace falta enumerar
 * rutas ni tipos: una sola etiqueta cubre el sitio entero. Simple y robusto.
 *
 * SEGURIDAD — el cuerpo viene FIRMADO por Sanity (HMAC con un secreto compartido). Sin
 * una firma válida contra `SANITY_REVALIDATE_SECRET`, la petición se rechaza con 401:
 * nadie puede forzar revalidaciones desde afuera. El `revalidate: 60` sigue como red de
 * seguridad si el webhook no llegara.
 *
 * Runtime Node.js: la verificación de firma y `revalidateTag` corren en el servidor.
 */
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Firma inválida", { status: 401 });
    }

    // Una sola etiqueta invalida todo el contenido leído de Sanity. En Next 16 el segundo
    // argumento es obligatorio: "max" purga la etiqueta por completo (equivale a la
    // revalidación bajo demanda clásica).
    revalidateTag("contenido", "max");

    return NextResponse.json({
      revalidado: true,
      tipo: body?._type ?? null,
      momento: Date.now(),
    });
  } catch (error) {
    console.error("[revalidar] fallo al procesar el webhook:", error);
    return new NextResponse("Error al revalidar", { status: 500 });
  }
}
