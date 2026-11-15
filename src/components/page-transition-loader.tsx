import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";
import nipMonogram from "@/assets/optimized/nip-monogram.png.480.webp.asset.json";

const SHOW_DELAY_MS = 150;
const MIN_VISIBLE_MS = 250;
const MAX_VISIBLE_MS = 10_000;
const FADE_MS = 200;
const CHECK_MS = 80;
const QUIET_PERIOD_MS = 600;

function pendingPageImages() {
  return Array.from(document.querySelectorAll<HTMLImageElement>("img")).filter((image) => {
    if (image.complete || image.closest("[data-page-loader], [role='dialog']")) return false;
    if (!image.getClientRects().length) return false;
    const rect = image.getBoundingClientRect();
    // Off-screen photos stay lazy; only the arriving screen should hold the loader open.
    return image.loading === "eager" || (rect.top < window.innerHeight * 1.25 && rect.bottom > 0);
  });
}

/** First-visit nP loader that waits for the arriving screen, its visible photos, fonts and catalog. */
export function PageTransitionLoader() {
  const pending = useRouterState({ select: (s) => s.status === "pending" });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const catalogFetching = useIsFetching({ queryKey: ["shopify-catalog"] }) > 0;
  const pendingRef = useRef(pending);
  const catalogFetchingRef = useRef(catalogFetching);
  pendingRef.current = pending;
  catalogFetchingRef.current = catalogFetching;
  const visited = useRef<Set<string>>(new Set());
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visited.current.has(pathname)) return;

    const startedAt = Date.now();
    let shownAt = 0;
    let finished = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new MutationObserver(check);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["src", "srcset"],
    });

    function ready() {
      return !pendingRef.current
        && !catalogFetchingRef.current
        && document.fonts.status !== "loading"
        && pendingPageImages().length === 0;
    }

    function finish() {
      if (finished) return;
      finished = true;
      observer.disconnect();
      window.clearInterval(interval);
      visited.current.add(pathname);
      setVisible(false);
      timers.push(setTimeout(() => setMounted(false), FADE_MS));
    }

    function check() {
      if (finished) return;
      const elapsed = Date.now() - startedAt;
      if (elapsed >= MAX_VISIBLE_MS) {
        finish();
        return;
      }
      if (!ready()) {
        // A query or photo can start just after the route renders. Keep watching through
        // the quiet period so an early empty DOM cannot dismiss the loader prematurely.
        if (!shownAt && elapsed >= SHOW_DELAY_MS) {
          shownAt = Date.now();
          setMounted(true);
          requestAnimationFrame(() => setVisible(true));
        }
        return;
      }
      if (elapsed < QUIET_PERIOD_MS) return;
      if (!shownAt) {
        finish();
      } else if (!timers.length) {
        timers.push(setTimeout(finish, Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt))));
      }
    }

    const interval = window.setInterval(check, CHECK_MS);

    return () => {
      finished = true;
      observer.disconnect();
      window.clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  // The small logo stays preloaded (hidden) so it is ready the instant the loader appears.
  if (!mounted)
    return <img data-page-loader src={nipMonogram.url} alt="" aria-hidden className="pointer-events-none fixed h-px w-px opacity-0" />;
  return (
    <div
      data-page-loader
      role="status"
      aria-label="Loading page"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity ease-out"
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${FADE_MS}ms`, pointerEvents: visible ? "auto" : "none" }}
    >
      <img src={nipMonogram.url} alt="" decoding="sync" className="nip-loader-pulse h-auto w-[140px] md:w-[180px]" />
    </div>
  );
}
