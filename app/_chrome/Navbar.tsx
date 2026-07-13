"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { getMomentos, getRedes } from "@/content";

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
      stroke="var(--color-hierro)"
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

export function Navbar() {
  const items: ItemNav[] = getMomentos()
    .filter((m) => m.navLabel)
    .map((m) => ({ id: `seccion-${m.id}`, label: m.navLabel as string }));
  const redes = getRedes();

  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState<string | null>(null);
  const sinMotion = useReducedMotion();

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
    <header className="navbar">
      <div className="navbar-inner">
        <a
          href="#seccion-umbral"
          className="navbar-marca"
          aria-label="Delfina Gayoso — volver al inicio"
          onClick={() => setAbierto(false)}
        >
          <span className="navbar-monograma voz-display" aria-hidden="true">
            <span>D</span>
            <span className="navbar-monograma-g">G</span>
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
