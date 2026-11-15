import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";
import nipMonogram from "@/assets/optimized/nip-monogram.png.480.webp.asset.json";

const SHOW_DELAY_MS = 150;
const MIN_VISIBLE_MS = 250;
const MAX_VISIBLE_MS = 10_000;
const FADE_MS = 200;
const CHECK_MS = 80;

function pendingPageImages() {
  return Array.from(document.querySelectorAll<HTMLImageElement>("img")).filter((image) => {
    if (image.complete || image.closest("[data-page-loader], [role='dialog']")) return false;
    if (!image.getClientRects().length) return false;
    if (image.loading === "eager") return true;
    const rect = image.getBoundingClientRect();
    // Off-screen photos, including the next photo in a horizontal strip, stay lazy.
    return rect.top < window.innerHeight * 1.25 && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;
  });
}

/** First-visit nP loader that waits for the arriving screen, its visible photos, fonts and catalog. */
export function PageTransitionLoader() {
  const pending = useRouterState({ select: (s) => s.status === "pending" });
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const queryClient = useQueryClient();
  const pendingRef = useRef(pending);
  pendingRef.current = pending;
  const visited = useRef<Set<string>>(new Set());
  const firstPage = useRef(true);
  // SSR renders the cover immediately, so a slow first download never exposes a blank page.
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (visited.current.has(pathname)) return;

    const initial = firstPage.current;
    firstPage.current = false;
    const startedAt = Date.now();
    let shownAt = initial ? startedAt : 0;
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
      const catalogRequired = Boolean(document.querySelector("[data-catalog-required]"));
      const catalogStatus = queryClient.getQueryState(["shopify-catalog"])?.status;
      const catalogReady = !catalogRequired || (catalogStatus !== undefined && catalogStatus !== "pending");
      return !pendingRef.current
        && catalogReady
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
        if (!shownAt && elapsed >= SHOW_DELAY_MS) {
          shownAt = Date.now();
          setMounted(true);
          requestAnimationFrame(() => setVisible(true));
        }
        return;
      }
      if (!shownAt || initial) {
        finish();
      } else if (!timers.length) {
        timers.push(setTimeout(finish, Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt))));
      }
    }

    const interval = window.setInterval(check, CHECK_MS);
    check();

    return () => {
      finished = true;
      observer.disconnect();
      window.clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [pathname, queryClient]);

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
