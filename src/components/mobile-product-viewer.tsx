import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button";
import { StoreImage } from "@/components/store-image";

export function MobileProductViewer({ images, index, alt, onClose, onIndex }: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scale = useRef(1);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const step = (direction: number) => onIndex((index + direction + images.length) % images.length);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Product image viewer"
      className="fixed inset-0 z-[110] flex flex-col bg-viewer-surface text-foreground"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
        if (event.key === "Tab") {
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
          const first = controls[0];
          const last = controls.at(-1);
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault(); last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault(); first?.focus();
          }
        }
      }}
    >
      <div
        className="mobile-product-viewer relative min-h-0 flex-1 overflow-hidden"
        onTouchStart={(event) => {
          const point = event.touches[0];
          touch.current = event.touches.length === 1 && scale.current === 1 && point
            ? { x: point.clientX, y: point.clientY } : null;
        }}
        onTouchMove={(event) => { if (event.touches.length > 1) touch.current = null; }}
        onTouchEnd={(event) => {
          const start = touch.current;
          const end = event.changedTouches[0];
          touch.current = null;
          if (!start || !end || scale.current > 1 || images.length < 2) return;
          const dx = end.clientX - start.x;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(end.clientY - start.y) * 1.5) step(dx < 0 ? 1 : -1);
        }}
      >
        <TransformWrapper
          key={index}
          minScale={1}
          maxScale={5}
          centerOnInit
          doubleClick={{ mode: "toggle", step: 1.5 }}
          onInit={() => { scale.current = 1; }}
          onTransformed={(_, state) => { scale.current = state.scale; }}
        >
          <TransformComponent wrapperClass="mobile-viewer-frame" contentClass="mobile-viewer-photo">
            <StoreImage fullDetail loading="eager" src={images[index]} alt={alt}
              draggable={false} className="h-full w-full select-none object-contain" />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[max(24px,env(safe-area-inset-bottom))] flex justify-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Previous image" title="Previous image"
          disabled={images.length < 2} onClick={() => step(-1)}
          className="pointer-events-auto h-11 w-11 rounded-full border border-border bg-viewer-surface text-foreground hover:bg-cream">
          <ChevronLeft />
        </Button>
        <Button ref={closeRef} variant="ghost" size="icon" aria-label="Close viewer" title="Close viewer" onClick={onClose}
          className="pointer-events-auto h-11 w-11 rounded-full border border-border bg-viewer-surface text-foreground hover:bg-cream">
          <X />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Next image" title="Next image"
          disabled={images.length < 2} onClick={() => step(1)}
          className="pointer-events-auto h-11 w-11 rounded-full border border-border bg-viewer-surface text-foreground hover:bg-cream">
          <ChevronRight />
        </Button>
      </div>
      <span className="sr-only" aria-live="polite">Image {index + 1} of {images.length}</span>
    </div>
  );
}