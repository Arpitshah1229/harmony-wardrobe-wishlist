import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import nipMonogram from "@/assets/nip-monogram.png.asset.json";

const SHOW_DELAY_MS = 150;
const MAX_VISIBLE_MS = 1200;
const FADE_MS = 200;

/** Branded nP loader: only for first visits to a page, only when loading is slow. */
export function PageTransitionLoader() {
  const pending = useRouterState({ select: (s) => s.status === "pending" });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const visited = useRef<Set<string>>(new Set());
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!pending) {
      visited.current.add(pathname);
      setVisible(false);
      const t = setTimeout(() => setMounted(false), FADE_MS);
      return () => clearTimeout(t);
    }
    if (visited.current.has(pathname)) return;
    const show = setTimeout(() => {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    }, SHOW_DELAY_MS);
    const cap = setTimeout(() => setVisible(false), SHOW_DELAY_MS + MAX_VISIBLE_MS);
    return () => {
      clearTimeout(show);
      clearTimeout(cap);
    };
  }, [pending, pathname]);

  if (!mounted) return null;
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F7F4EE] transition-opacity ease-out"
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms`, pointerEvents: visible ? "auto" : "none" }}
    >
      <img src={nipMonogram.url} alt="" className="nip-loader-pulse h-auto w-[140px] md:w-[180px]" />
    </div>
  );
}
