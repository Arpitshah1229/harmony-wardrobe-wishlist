import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Gently fades page sections up as they scroll into view. Sections already on screen are left untouched. */
export function ScrollReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let observer: IntersectionObserver | null = null;
    const frame = window.requestAnimationFrame(() => {
      const targets = Array.from(document.querySelectorAll<HTMLElement>("main section, footer"))
        .filter((el) => !el.parentElement?.closest("main section") && !el.dataset.revealed)
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("nip-reveal-in");
          el.dataset.revealed = "1";
          observer?.unobserve(el);
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      for (const el of targets) { el.classList.add("nip-reveal"); observer.observe(el); }
    });
    return () => { window.cancelAnimationFrame(frame); observer?.disconnect(); };
  }, [pathname]);
  return null;
}
