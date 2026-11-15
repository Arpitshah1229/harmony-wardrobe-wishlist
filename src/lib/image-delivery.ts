import { optimizedImages } from "./optimized-images";

const SHOPIFY_WIDTHS = [480, 768, 960, 1280, 1600, 1920];

/** Shopify's CDN serves a correctly sized WebP/AVIF instead of the original 4000px upload. */
function shopifyDelivery(src: string) {
  try {
    const url = new URL(src);
    if (url.hostname !== "cdn.shopify.com") return undefined;
    const sized = (width: number) => {
      const variant = new URL(url);
      variant.searchParams.set("width", String(width));
      return variant.toString();
    };
    return {
      src: sized(960),
      srcSet: SHOPIFY_WIDTHS.map((width) => `${sized(width)} ${width}w`).join(", "),
    };
  } catch {
    return undefined;
  }
}

export function imageDelivery(src: string | undefined, fullDetail = false) {
  if (fullDetail) return { src };
  const image = src ? optimizedImages[src] : undefined;
  if (!image) return src ? (shopifyDelivery(src) ?? { src }) : { src };
  const fallback = image.variants.find((variant) => variant.width >= 960) ?? image.variants.at(-1);
  return {
    src: fallback?.url ?? src,
    srcSet: image.variants.map((variant) => `${variant.url} ${variant.width}w`).join(", "),
    width: image.width,
    height: image.height,
  };
}
