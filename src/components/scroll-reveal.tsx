import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/** Gently fades page sections up as they scroll into view. Sections already on screen are left untouched. */
export function ScrollReveal() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    let observer: IntersectionObserver | null = null;
    const enhanced = pathname !== "/" && pathname !== "/collections";
    const animated: HTMLElement[] = [];
    const frame = window.requestAnimationFrame(() => {
      if (enhanced) {
        for (const heading of document.querySelectorAll<HTMLElement>("h1")) {
          if (heading.closest('[role="dialog"], header') || heading.getBoundingClientRect().top >= window.innerHeight) continue;
          heading.classList.add("nip-soft-entry");
          animated.push(heading);
        }
      }
      const sectionSelector = enhanced ? "section, footer" : "main section, footer";
      const targets = Array.from(document.querySelectorAll<HTMLElement>(sectionSelector))
        .filter((el) => !el.closest('[role="dialog"], header') && !el.parentElement?.closest(enhanced ? "section" : "main section") && !el.dataset.revealed)
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("nip-reveal-in");
          el.dataset.revealed = "1";
          observer?.unobserve(el);
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: enhanced ? 0 : 0.08 });
      for (const el of targets) {
        el.classList.add("nip-reveal");
        if (enhanced) { el.classList.add("nip-soft-reveal"); animated.push(el); }
        observer.observe(el);
      }
    });
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      for (const el of animated) {
        el.classList.remove("nip-soft-entry", "nip-soft-reveal", "nip-reveal", "nip-reveal-in");
      }
    };
  }, [pathname]);
  return null;
}
