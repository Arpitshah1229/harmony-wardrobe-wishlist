import { type CSSProperties } from "react";
import bagIcon from "@/assets/nip-bag-icon.png.asset.json";

/**
 * The NIP pouch mark, used wherever a cart/bag icon is needed.
 * The artwork is masked rather than rendered, so it takes whatever
 * colour the surrounding text uses (brown on ivory, beige on brown).
 */
export function BagIcon({
  size = 16,
  color,
  className = "",
  style,
}: {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color ?? "currentColor",
        WebkitMaskImage: `url("${bagIcon.url}")`,
        maskImage: `url("${bagIcon.url}")`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        ...style,
      }}
    />
  );
}
