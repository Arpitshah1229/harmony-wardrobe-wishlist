import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import nipMonogram from "@/assets/optimized/nip-monogram.png.480.webp.asset.json";

const SHOW_DELAY_MS = 150;
const MAX_VISIBLE_MS = 1200;
const FADE_MS = 200;

/** Branded nP loader: only for first visits to a page, only when loading is slow. */
export function PageTransitionLoader() {
  const pending = useRouterState({ select: (s) => s.status === "pending" });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pathRef = useRef(pathname);
  pathRef.current = pathname;
  const visited = useRef<Set<string>>(new Set());
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Timers keyed only on the start/end of a navigation, so location updates
  // mid-navigation never restart the 150ms delay or the 1.2s ceiling.
  useEffect(() => {
    if (!pending) {
      visited.current.add(pathRef.current);
      setVisible(false);
      const t = setTimeout(() => setMounted(false), FADE_MS);
      return () => clearTimeout(t);
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(
      setTimeout(() => {
        if (visited.current.has(pathRef.current)) return;
        setMounted(true);
        requestAnimationFrame(() => setVisible(true));
        timers.push(setTimeout(() => setVisible(false), MAX_VISIBLE_MS));
        timers.push(setTimeout(() => setMounted(false), MAX_VISIBLE_MS + FADE_MS));
      }, SHOW_DELAY_MS),
    );
    return () => timers.forEach(clearTimeout);
  }, [pending]);

  // The small logo stays preloaded (hidden) so it is ready the instant the loader appears.
  if (!mounted)
    return <img src={nipMonogram.url} alt="" aria-hidden className="pointer-events-none fixed h-px w-px opacity-0" />;
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity ease-out"
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms`, pointerEvents: visible ? "auto" : "none" }}
    >
      <img src={nipMonogram.url} alt="" decoding="sync" className="nip-loader-pulse h-auto w-[140px] md:w-[180px]" />
    </div>
  );
}
