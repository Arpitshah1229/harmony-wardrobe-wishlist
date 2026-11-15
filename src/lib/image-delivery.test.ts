import { expect, test } from "bun:test";
import { imageDelivery } from "./image-delivery";
import hero from "@/assets/homepage-clone-hero.jpeg.asset.json";

test("page photos offer smaller responsive derivatives", () => {
  const image = imageDelivery(hero.url);
  expect(image.src).not.toBe(hero.url);
  expect(image.srcSet).toContain("480w");
  expect(image.width).toBe(1537);
});

test("full detail viewer retains the original uploaded photo", () => {
  expect(imageDelivery(hero.url, true)).toEqual({ src: hero.url });
});

test("unknown images remain usable without a registered derivative", () => {
  expect(imageDelivery("/custom-photo.jpg")).toEqual({ src: "/custom-photo.jpg" });
});

test("Shopify photos use responsive CDN sizes instead of multi-megabyte originals", () => {
  const original = "https://cdn.shopify.com/s/files/1/0123/files/shirt.jpg?v=42";
  const image = imageDelivery(original);
  expect(new URL(image.src!).searchParams.get("width")).toBe("960");
  expect(new URL(image.src!).searchParams.get("v")).toBe("42");
  expect(image.srcSet).toContain("480w");
  expect(image.srcSet).toContain("1920w");
});

test("full detail viewer retains the original Shopify upload", () => {
  const original = "https://cdn.shopify.com/s/files/1/0123/files/shirt.jpg?v=42";
  expect(imageDelivery(original, true)).toEqual({ src: original });
});
