import type { ComponentProps } from "react";
import { imageDelivery } from "@/lib/image-delivery";

type Props = ComponentProps<"img"> & { fullDetail?: boolean };

/** Preserve the existing layout while choosing a smaller derivative for its display size. */
export function StoreImage({ src, fullDetail = false, loading = "lazy", sizes, ...props }: Props) {
  const delivery = imageDelivery(src, fullDetail);
  return (
    <img
      {...delivery}
      decoding="async"
      loading={loading}
      sizes={delivery.srcSet ? sizes ?? (loading === "lazy" ? "auto, 100vw" : "100vw") : undefined}
      {...props}
    />
  );
}