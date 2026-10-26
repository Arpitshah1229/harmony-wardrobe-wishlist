import { optimizedImages } from "./optimized-images";

export function imageDelivery(src: string | undefined, fullDetail = false) {
  const image = src ? optimizedImages[src] : undefined;
  if (!image || fullDetail) return { src };
  const fallback = image.variants.find((variant) => variant.width >= 960) ?? image.variants.at(-1);
  return {
    src: fallback?.url ?? src,
    srcSet: image.variants.map((variant) => `${variant.url} ${variant.width}w`).join(", "),
    width: image.width,
    height: image.height,
  };
}