import { useEffect, useRef, useState } from "react";
import { imageDelivery } from "@/lib/image-delivery";
import processWebm from "@/assets/homepage-process-optimized.webm.asset.json";

export function DeferredVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const loaded = useRef(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) video.pause();
    }, { rootMargin: "150px" });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible || !ref.current) return;
    if (!loaded.current) {
      ref.current.load();
      loaded.current = true;
    }
    ref.current.play().catch(() => undefined);
  }, [visible]);
  return (
    <video ref={ref} className={className} autoPlay={visible} loop muted playsInline preload="none"
      poster={visible ? imageDelivery(poster).src : undefined}>
      {(visible || loaded.current) && <>
        <source src={processWebm.url} type="video/webm" />
        <source src={src} type="video/mp4" />
      </>}
    </video>
  );
}