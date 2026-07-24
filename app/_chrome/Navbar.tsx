"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Momento, RedSocial, VozBudin } from "@/content";
import { Budin } from "./Budin";

/**
 * Navbar de orientación (Bloque 6.5 · R6). Facilita el recorrido sin volverse un
 * sitio corporativo: permite saltar a los momentos clave y ubica dónde se está,
 * pero NO instala lógica comercial (nada de "Shop"/"Comprar"/carrito). El acento
 * `Yema` de la compra sigue viviendo sólo en la ficha de producto.
 *
 *  · Marca: su nombre en serif (su voz) que lleva al inicio del recorrido.
 *  · Desktop: enlaces cortos a los momentos con `navLabel` + Instagram/TikTok. El
 *    momento activo se resalta (se deduce por IntersectionObserver; no dicta el
 *    ritmo, orienta).
 *  · Mobile: botón hamburguesa = dos utensilios (cuchara + tenedor) que, al abrir,
 *    se cruzan en X (Motion). Con `prefers-reduced-motion` el cambio es instantáneo.
 *  · Fondo `Harina` sólido (sin glass ni traslúcidos, §6.2). El scroll suave y los
 *    saltos los maneja Lenis con offset por la altura del navbar.
 */

type ItemNav = { id: string; label: string };

const NOMBRE_RED: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
};

/** Los dos utensilios; cerrados quedan paralelos, abiertos se cruzan en X. */
function Utensilios({ abierto }: { abierto: boolean }) {
  const sinMotion = useReducedMotion();
  const t = sinMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 26 };

  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 28 28"
      fill="none"
      stroke="rgb(var(--nav-ink, 42 36 30))"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Cuchara */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={false}
        animate={{ x: abierto ? 0 : -4, rotate: abierto ? -45 : 0 }}
        transition={t}
      >
        <ellipse cx="14" cy="6.6" rx="2.7" ry="3.7" />
        <line x1="14" y1="10.2" x2="14" y2="24" />
      </motion.g>
      {/* Tenedor */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={false}
        animate={{ x: abierto ? 0 : 4, rotate: abierto ? 45 : 0 }}
        transition={t}
      >
        <line x1="11" y1="4" x2="11" y2="12" />
        <line x1="14" y1="4" x2="14" y2="12" />
        <line x1="17" y1="4" x2="17" y2="12" />
        <line x1="14" y1="12" x2="14" y2="24" />
      </motion.g>
    </svg>
  );
}

export function Navbar({
  momentos,
  redes,
  vozBudin,
}: {
  /** Contenido inyectado desde el layout (server): puede venir del CMS o de la semilla. */
  momentos: readonly Momento[];
  redes: readonly RedSocial[];
  vozBudin: VozBudin;
}) {
  const items: ItemNav[] = momentos
    .filter((m) => m.navLabel)
    .map((m) => ({ id: `seccion-${m.id}`, label: m.navLabel as string }));

  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState<string | null>(null);
  const sinMotion = useReducedMotion();

  // Presentación del nombre (Opción B) — controlada por `data-nombre` en el
  // monograma (DOM vía ref, no estado React). Se reduce a "DG" tras el intro, y el
  // menú vuelve a presentar el nombre completo: al abrir expande, al cerrar reduce.
  const monoRef = useRef<HTMLSpanElement>(null);
  const abiertoRef = useRef(abierto);

  // El menú manda: abierto → nombre completo; cerrado → "DG" (misma transición).
  // 9ª ola: además avisa al motor del navbar para que CONGELE el color heredado
  // mientras el menú está abierto (la hoja conserva el color de la sección en la que
  // estaba el usuario, en vez de saltar a un color fijo).
  useEffect(() => {
    abiertoRef.current = abierto;
    const el = monoRef.current;
    if (el) el.dataset.nombre = abierto ? "expandido" : "reducido";
    if (abierto) document.documentElement.dataset.menu = "abierto";
    else delete document.documentElement.dataset.menu;
  }, [abierto]);

  // Intro al cargar: "Delfina Gayoso" y, tras una pausa, se reduce a "DG" (una vez).
  // Corre después del efecto del menú, así en el montaje gana el intro (expandido).
  useEffect(() => {
    const el = monoRef.current;
    if (!el) return;
    if (sinMotion) {
      el.dataset.nombre = abiertoRef.current ? "expandido" : "reducido";
      return;
    }
    el.dataset.nombre = "expandido";
    const t = setTimeout(() => {
      if (!abiertoRef.current && monoRef.current)
        monoRef.current.dataset.nombre = "reducido";
    }, 1600);
    return () => clearTimeout(t);
  }, [sinMotion]);

  // Momento activo: el que cruza el centro del viewport (orienta, no navega).
  useEffect(() => {
    const secciones = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-momento]"),
    );
    if (secciones.length === 0) return;
    const visibles = new Set<string>();
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const mom = e.target.getAttribute("data-momento");
          if (!mom) continue;
          const id = `seccion-${mom}`;
          if (e.isIntersecting) visibles.add(id);
          else visibles.delete(id);
        }
        setActivo([...visibles].pop() ?? null);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const s of secciones) io.observe(s);
    return () => io.disconnect();
  }, []);

  // Cerrar el menú al presionar Escape.
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto]);

  return (
    <header className="navbar" data-abierto={abierto ? "true" : undefined}>
      <div className="navbar-inner">
        <a
          // 13ª ola: el inicio del recorrido es "Quién soy" (la bienvenida), no el umbral.
          href="#seccion-quien-soy"
          className="navbar-marca"
          aria-label="Delfina Gayoso — volver al inicio"
          onClick={() => setAbierto(false)}
        >
          {/* Presentación (Opción B): "Delfina Gayoso" ↔ "DG". El estado lo maneja
              el navbar (data-nombre); el menú vuelve a presentar el nombre completo. */}
          <span
            ref={monoRef}
            className="navbar-monograma voz-display"
            aria-hidden="true"
          >
            <span>D</span>
            <span className="np-resto">elfina&nbsp;</span>
            <span className="navbar-monograma-g">G</span>
            <span className="np-resto">ayoso</span>
          </span>
        </a>

        {/* Desktop: enlaces de orientación + redes. */}
        <nav className="navbar-desktop" aria-label="Secciones del recorrido">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="navbar-link"
              data-activo={activo === it.id ? "true" : undefined}
            >
              {it.label}
            </a>
          ))}
          <span className="navbar-sep" aria-hidden="true" />
          {redes.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-link"
              aria-label={`${NOMBRE_RED[r.plataforma] ?? r.plataforma} de Delfina (${r.usuario})`}
            >
              {NOMBRE_RED[r.plataforma] ?? r.plataforma}
            </a>
          ))}
        </nav>

        {/* Mobile: botón de utensilios. */}
        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={abierto}
          aria-controls="navbar-menu"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((v) => !v)}
        >
          <Utensilios abierto={abierto} />
        </button>
      </div>

      {/* Panel mobile. */}
      <AnimatePresence>
        {abierto && (
          <motion.nav
            id="navbar-menu"
            className="navbar-panel"
            aria-label="Secciones del recorrido"
            initial={sinMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={sinMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: sinMotion ? 0 : 0.22 }}
          >
            {items.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="navbar-panel-link"
                data-activo={activo === it.id ? "true" : undefined}
                onClick={() => setAbierto(false)}
              >
                {it.label}
              </a>
            ))}
            <span className="navbar-panel-sep" aria-hidden="true" />
            {redes.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-panel-link"
                onClick={() => setAbierto(false)}
              >
                {NOMBRE_RED[r.plataforma] ?? r.plataforma}
              </a>
            ))}

            {/* Budín, en la esquina del menú (13ª ola): en mobile no flota sobre el
                contenido; aparece acá y responde igual al tocarlo. */}
            <Budin voz={vozBudin} variante="menu" />
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
