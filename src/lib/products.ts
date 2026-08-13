import gulraaz from "@/assets/gulraaz_shirt.jpeg.asset.json";
import bahaar from "@/assets/bahaar_shirt.jpeg.asset.json";
import kinara from "@/assets/kinara_shirt.jpeg.asset.json";
import mohar from "@/assets/mohar_shirt.jpeg.asset.json";
import raah from "@/assets/raah_shirt.jpeg.asset.json";
import sukoon from "@/assets/sukoon_shirt.jpeg.asset.json";
import zameen from "@/assets/zameen_shirt.jpeg.asset.json";
import stitchesStrip from "@/assets/stitches_strip_v2.jpeg.asset.json";

export const PRODUCT_SUBTITLE =
  "Hand embroidered relaxed fit men's chikankari shirt";

export type Product = {
  slug: string;
  name: string;
  price: string;
  images: string[];
  colorName: string;
  colorHex: string;
  detailImg: string;
};

export const products: Product[] = [
  { slug: "gulraaz-shirt", name: "GulRaaz Shirt", price: "₹6,300", images: [gulraaz.url], colorName: "Undyed Cream", colorHex: "#EDE6D6", detailImg: stitchesStrip.url },
  { slug: "bahaar-shirt", name: "Bahaar Shirt", price: "₹6,300", images: [bahaar.url], colorName: "Leaf Green", colorHex: "#7A8063", detailImg: stitchesStrip.url },
  { slug: "kinara-shirt", name: "Kinara Shirt", price: "₹6,300", images: [kinara.url], colorName: "Marigold", colorHex: "#D9B24C", detailImg: stitchesStrip.url },
  { slug: "mohar-shirt", name: "Mohar Shirt", price: "₹6,300", images: [mohar.url], colorName: "Rose Blush", colorHex: "#E3B6B4", detailImg: stitchesStrip.url },
  { slug: "raah-shirt", name: "Raah Shirt", price: "₹6,300", images: [raah.url], colorName: "Sky", colorHex: "#B9CBD8", detailImg: stitchesStrip.url },
  { slug: "sukoon-shirt", name: "Sukoon Shirt", price: "₹6,300", images: [sukoon.url], colorName: "Ivory White", colorHex: "#F4F1EA", detailImg: stitchesStrip.url },
  { slug: "zameen-shirt", name: "Zameen Shirt", price: "₹6,300", images: [zameen.url], colorName: "Clay Mauve", colorHex: "#A8968F", detailImg: stitchesStrip.url },
];


export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];
