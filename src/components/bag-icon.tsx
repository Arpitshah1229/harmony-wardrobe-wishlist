import { type CSSProperties } from "react";
import bagFine from "@/assets/nip-bag-icon.png.asset.json";
import bagBold from "@/assets/nip-bag-icon-bold.png.asset.json";

/**
 * The NIP pouch mark, used wherever a cart/bag icon is needed.
 * The artwork is masked rather than rendered, so it takes whatever
 * colour the surrounding text uses (brown on ivory, beige on brown).
 *
 * detail="bold" thickens the strokes so the pouch still reads at menu-bar
 * sizes; detail="fine" keeps the original linework and NIP monogram for
 * larger placements.
 */
export function BagIcon({
  size = 16,
  color,
  detail = "bold",
  className = "",
  style,
}: {
  size?: number;
  color?: string;
  detail?: "fine" | "bold";
  className?: string;
  style?: CSSProperties;
}) {
  const src = detail === "fine" ? bagFine : bagBold;
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: color ?? "currentColor",
        WebkitMaskImage: `url("${src.url}")`,
        maskImage: `url("${src.url}")`,
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
