import gulraazLook1 from "@/assets/gulraaz-look-1.jpg.asset.json";
import gulraazLook2 from "@/assets/gulraaz-look-2.jpg.asset.json";
import gulraazLook3 from "@/assets/gulraaz-look-3.jpg.asset.json";
import gulraaz from "@/assets/gulraaz_shirt.jpeg.asset.json";
import bahaar from "@/assets/bahaar_shirt.jpeg.asset.json";
import kinara from "@/assets/kinara_shirt.jpeg.asset.json";
import kinaraLook1 from "@/assets/kinara-look-pic_1-white.png";
import kinaraLook2 from "@/assets/kinara-look-pic2.png.asset.json";
import kinaraLook3 from "@/assets/kinara-look-pic3.png.asset.json";
import mohar1 from "@/assets/mohar_image_one.png.asset.json";
import mohar2 from "@/assets/mohar_image_two.png.asset.json";
import mohar3 from "@/assets/mohar_image_3.png.asset.json";
import mohar4 from "@/assets/mohar_image_4.png.asset.json";
import mohar5 from "@/assets/mohar_image_5.png.asset.json";
import mohar6 from "@/assets/mohar_image_6_styling.png.asset.json";
import mohar7 from "@/assets/mohar_image_7_styling.png.asset.json";
import mohar8 from "@/assets/mohar_image_8_styling.png.asset.json";
import raah from "@/assets/raah_shirt.jpeg.asset.json";
import sukoon from "@/assets/sukoon_shirt.jpeg.asset.json";
import zameen from "@/assets/zameen_shirt.jpeg.asset.json";
import stitchesStrip from "@/assets/stitches_strip_v2.jpeg.asset.json";

export const PRODUCT_SUBTITLE =
  "Hand embroidered relaxed fit men's chikankari shirt";

export type Product = {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  price: string;
  images: string[];
  stylingImages?: { src: string; label: string; tall?: boolean }[];
  colorName: string;
  colorHex: string;
  detailImg: string;
  description: string[];
  details: [string, string][];
  handmadeNote: string;
  altText: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  badge?: string;
};

const DYED_NOTE =
  "Each piece is one of a kind. Slight variation in colour is natural to hand-dyed, hand-embroidered products, and colour may bleed slightly in the first wash. Dry cleaning is always recommended; if washing at home, wash separately with like colours in the first few washes.";

export const CARE_INSTRUCTIONS = [
  "Cold hand wash or dry clean recommended",
  "Wash separately, especially in the first few washes",
  "Do not bleach",
  "Dry in shade, avoid direct sunlight",
  "Iron on medium heat, inside out",
];

export const SIZING_NOTE =
  "Our sizing runs slightly bigger — we recommend sizing down. The model is wearing a size Small, which corresponds to a size Medium on the NIP measurement chart.";

export const SHIPPING_NOTE =
  "Orders are prepared and dispatched within 2–4 working days from our studio. Estimated delivery: 6–7 working days for metro cities, 7–10 working days for non-metro locations. Prepaid orders are prioritized in processing and dispatch, and receive a discount of ₹100. Cash on delivery is available at an additional charge of ₹100. Our team will reach out to confirm order details prior to dispatch.";

export const SIZE_CHART: { measurement: string; s: string; m: string; l: string; xl: string; tolerance: string }[] = [
  { measurement: "Length", s: "27", m: "28", l: "30", xl: "31.5", tolerance: "± 3/4" },
  { measurement: "Chest", s: "46", m: "48", l: "50", xl: "52", tolerance: "± 1/2" },
  { measurement: "Shoulder", s: "19", m: "21", l: "22", xl: "23", tolerance: "± 1/2" },
  { measurement: "Sleeve", s: "9.5", m: "10", l: "10.5", xl: "11", tolerance: "± 1/2" },
  { measurement: "Sleeve Round", s: "15", m: "17", l: "17.5", xl: "18", tolerance: "± 1/2" },
  { measurement: "Armhole", s: "22", m: "23", l: "24", xl: "25", tolerance: "± 3/4" },
  { measurement: "Collar", s: "15.5", m: "16", l: "16.2", xl: "19.5", tolerance: "± 1/2" },
  { measurement: "Side Slit", s: "2", m: "2", l: "2", xl: "2", tolerance: "± 0" },
];

export const products: Product[] = [
  {
    slug: "gulraaz-shirt",
    name: "GulRaaz Shirt",
    title: "GulRaaz | Hand Embroidered Relaxed Fit Men's Chikankari Shirt",
    tagline: "A Secret Blooming Inward",
    price: "₹6,300",
    images: [gulraaz.url],
    stylingImages: [
      { src: gulraazLook1.url, label: "The On-The-Go", tall: true },
      { src: gulraazLook2.url, label: "Unwinding at Home", tall: true },
      { src: gulraazLook3.url, label: "Dinner Plans", tall: true },
    ],
    colorName: "Natural (undyed)",
    colorHex: "#EDE6D6",
    detailImg: stitchesStrip.url,
    description: [
      "Like a flower quietly unfolding from within, shaping the soul as it blooms, and leaving its traces along the way. GulRaaz shirt is crafted in breathable cotton with a relaxed fit. The designs are thoughtfully developed by the designer and brought to life with her team, exploring hand-dyeing and hand embroidery beyond traditional chikankari blocks, bringing the timeless into today in a way that feels distinctly our own, made in small batches.",
      "Because feeling good in what we wear shouldn't need an occasion. Isn't living one enough?",
    ],
    details: [
      ["Fabric", "100% Natural Cotton Flex"],
      ["Handwork", "Orma, Tepchi, Ghaspatti"],
      ["Buttons", "Natural Wood"],
      ["Fit", "Relaxed"],
      ["Colour", "Natural (undyed)"],
    ],
    handmadeNote: DYED_NOTE,
    altText: "GulRaaz hand embroidered relaxed fit men's chikankari shirt in cotton flex with wooden buttons.",
    metaTitle: "Men's Chikankari Shirt | Hand Embroidered | GulRaaz by NIP",
    metaDescription:
      "Shop hand embroidered men's chikankari shirts online — relaxed fit, breathable cotton, wooden buttons. Handcrafted in Lucknow. GulRaaz by NIP.",
    tags: ["chikankari", "men's shirt", "hand embroidered", "cotton shirt", "ethnic wear men", "Lucknow craft", "handmade shirt", "natural colour shirt"],
  },
  {
    slug: "bahaar-shirt",
    name: "Bahaar Shirt",
    title: "Bahaar | Hand Embroidered Relaxed Fit Men's Chikankari Shirt",
    tagline: "Where Nature Moves, and Growth Remains Constant",
    price: "₹6,300",
    images: [bahaar.url],
    stylingImages: [
      { src: bahaar.url, label: "After Hours" },
      { src: bahaar.url, label: "Festive Gatherings" },
      { src: bahaar.url, label: "Day Out" },
      { src: bahaar.url, label: "Evening Edit" },
    ],
    colorName: "Green",
    colorHex: "#7A8063",
    detailImg: stitchesStrip.url,
    description: [
      "Inspired by the quiet rhythm of nature, Bahaar is about growth that keeps unfolding, even with a little uncertainty, we keep moving forward. Bahaar shirt is crafted in a breathable cotton with a relaxed fit. The designs are thoughtfully developed by the designer and brought to life with her team, exploring hand-dyeing and hand embroidery beyond traditional chikankari blocks, bringing the timeless into today in a way that feels distinctly our own, made in small batches.",
      "Because feeling good in what we wear shouldn't need an occasion. Isn't living one enough?",
    ],
    details: [
      ["Fabric", "100% Hand-Dyed Cotton Flex"],
      ["Handwork", "Ulta Bakhiya, Ghaspatti, Olma"],
      ["Thread", "Contrast Beige"],
      ["Buttons", "Natural Wood"],
      ["Fit", "Relaxed"],
      ["Colour", "Green"],
    ],
    handmadeNote: DYED_NOTE,
    badge: "Hand Dyed & Embroidered",
    altText: "Bahaar hand embroidered green men's chikankari shirt in cotton flex with wooden buttons.",
    metaTitle: "Men's Green Chikankari Shirt | Hand Embroidered | Bahaar",
    metaDescription:
      "Shop Bahaar — a hand embroidered green chikankari shirt for men in breathable cotton flex with wooden buttons. Handcrafted in Lucknow. Bahaar by NIP.",
    tags: ["chikankari", "men's shirt", "hand embroidered", "green shirt", "cotton shirt", "ethnic wear men", "Lucknow craft", "handmade shirt", "hand-dyed shirt"],
  },
  {
    slug: "kinara-shirt",
    name: "Kinara Shirt",
    title: "Kinara | Hand Embroidered Relaxed Fit Men's Chikankari Shirt",
    tagline: "A Coastal Memory at the Edge of Light and Water",
    price: "₹6,300",
    images: [kinara.url],
    stylingImages: [
      { src: kinaraLook1, label: "Cocktail Catch-Up", tall: true },
      { src: kinaraLook2.url, label: "Vacation Mode", tall: true },
      { src: kinaraLook3.url, label: "Slow Days", tall: true },
    ],
    colorName: "Hand-Dyed Summer Yellow",
    colorHex: "#D9B24C",
    detailImg: stitchesStrip.url,
    description: [
      "Kinara captures the quiet joy of sunset skies, slow afternoons, and memories that linger long after the journey ends. Inspired by the simple happiness of coastal escapes, it is made to bring a feeling of ease, warmth, and lightness. Kinara shirt is crafted in a breathable cotton with a relaxed fit. The designs are thoughtfully developed by the designer and brought to life with her team, exploring hand-dyeing and hand embroidery beyond traditional chikankari blocks, bringing the timeless into today in a way that feels distinctly our own, made in small batches.",
      "Because feeling at ease shouldn't need an occasion. Isn't living one enough?",
    ],
    details: [
      ["Fabric", "100% Hand-Dyed Cotton Flex"],
      ["Handwork", "Phool, Orma, Tepchi, Phanda, Bakhiya, Keel Kangan, Hool"],
      ["Buttons", "Natural Wood"],
      ["Fit", "Relaxed"],
      ["Colour", "Hand-Dyed Summer Yellow"],
    ],
    handmadeNote: DYED_NOTE,
    altText: "Kinara hand embroidered yellow men's chikankari shirt in cotton flex with wooden buttons.",
    metaTitle: "Men's Yellow Chikankari Shirt | Hand Embroidered | Kinara",
    metaDescription:
      "Shop Kinara — a hand embroidered yellow chikankari shirt for men in breathable cotton flex with wooden buttons. Handcrafted in Lucknow.",
    tags: ["chikankari", "men's shirt", "hand embroidered", "yellow shirt", "cotton shirt", "ethnic wear men", "Lucknow craft", "handmade shirt", "hand-dyed shirt", "summer shirt"],
  },
  {
    slug: "mohar-shirt",
    name: "Mohar Shirt",
    title: "Mohar | Hand Embroidered Relaxed Fit Men's Chikankari Shirt",
    tagline: "A Mark That Holds Memory",
    price: "₹6,300",
    images: [mohar1.url, mohar2.url, mohar3.url, mohar4.url, mohar5.url, mohar6.url, mohar7.url, mohar8.url],
    stylingImages: [
      { src: mohar6.url, label: "After Hours" },
      { src: mohar7.url, label: "Festive Gatherings" },
      { src: mohar8.url, label: "Day Out" },
      { src: mohar1.url, label: "Evening Edit" },
    ],
    colorName: "Hand-Dyed Onion Pink",
    colorHex: "#E3B6B4",
    detailImg: stitchesStrip.url,
    description: [
      "Some marks are made to be seen immediately, but felt more deeply over time. Like the stamp on a letter, they quietly carry a story from one hand to another. A mark of identity, belonging, and the beauty of something made to be received and cherished. Mohar shirt is crafted in a breathable cotton with a relaxed fit. The designs are thoughtfully developed by the designer and brought to life with her team, exploring hand-dyeing and hand embroidery beyond traditional chikankari blocks, bringing the timeless into today in a way that feels distinctly our own, made in small batches.",
      "Because feeling at ease shouldn't need an occasion. Isn't living one enough?",
    ],
    details: [
      ["Fabric", "100% Hand-Dyed Cotton Slub"],
      ["Handwork", "Bakhiya (Shadow Work) with appliqué detailing"],
      ["Buttons", "Natural Wood"],
      ["Fit", "Relaxed"],
      ["Colour", "Hand-Dyed Onion Pink"],
    ],
    handmadeNote:
      "Each piece is one of a kind. Slight variation in colour is natural to hand-dyed, hand-embroidered products, and colour may bleed slightly in the first wash. Dry cleaning is always recommended; if washing at home, wash separately with like colours in the first few washes.",
    altText: "Mohar hand embroidered onion pink men's chikankari shirt in cotton slub with wooden buttons.",
    metaTitle: "Men's Pink Chikankari Shirt | Hand Embroidered | Mohar",
    metaDescription:
      "Shop Mohar — a hand embroidered onion pink chikankari shirt for men in cotton slub with wooden buttons. Handcrafted in Lucknow.",
    tags: ["chikankari", "men's shirt", "hand embroidered", "pink shirt", "cotton slub shirt", "shadow work shirt", "ethnic wear men", "Lucknow craft", "handmade shirt", "hand-dyed shirt"],
  },
  {
    slug: "raah-shirt",
    name: "Raah Shirt",
    title: "Raah | Hand Embroidered Relaxed Fit Men's Shirt",
    tagline: "A Path That Moves Without Direction, Yet Always Arrives",
    price: "₹6,300",
    images: [raah.url],
    stylingImages: [
      { src: raah.url, label: "After Hours" },
      { src: raah.url, label: "Festive Gatherings" },
      { src: raah.url, label: "Day Out" },
      { src: raah.url, label: "Evening Edit" },
    ],
    colorName: "Hand-Dyed Sky Greyish-Blue",
    colorHex: "#B9CBD8",
    detailImg: stitchesStrip.url,
    description: [
      "It doesn't matter which path you take. Every path leads somewhere. It is the journey that is meant to be lived, the stories, the moments, and everything we become along the way. There is no particular destination, and no urgency to get there. Enjoy the ride, and let it take you where you're meant to be. Raah shirt is crafted in a breathable cotton with a relaxed fit. The designs are thoughtfully developed by the designer and brought to life with her team, exploring hand-dyeing and hand embroidery beyond traditional chikankari blocks, bringing the timeless into today in a way that feels distinctly our own, made in small batches.",
      "Because feeling at ease shouldn't need an occasion. Isn't living one enough?",
    ],
    details: [
      ["Fabric", "100% Hand-Dyed Cotton Slub"],
      ["Handwork", "Chain Stitch & Hathkatti"],
      ["Buttons", "Natural Wood"],
      ["Fit", "Relaxed"],
      ["Colour", "Hand-Dyed Sky Greyish-Blue with Contrast Tonal Blue"],
    ],
    handmadeNote: DYED_NOTE,
    altText: "Raah hand embroidered men's shirt in sky blue cotton slub with chain stitch and wooden buttons.",
    metaTitle: "Men's Hand Embroidered Shirt | Chain Stitch | Raah",
    metaDescription:
      "Shop Raah — a relaxed fit men's shirt in hand-dyed cotton slub with chain stitch and Hathkatti embroidery, handcrafted by skilled artisans.",
    tags: ["hand embroidered shirt", "men's shirt", "chain stitch", "hathkatti", "cotton slub shirt", "blue shirt", "handmade shirt", "hand-dyed shirt", "artisan made"],
  },
  {
    slug: "sukoon-shirt",
    name: "Sukoon Shirt",
    title: "Sukoon | Hand Embroidered Relaxed Fit Men's Chikankari Shirt",
    tagline: "Stillness Shaped Through Self Calm",
    price: "₹6,300",
    images: [sukoon.url],
    stylingImages: [
      { src: sukoon.url, label: "After Hours" },
      { src: sukoon.url, label: "Festive Gatherings" },
      { src: sukoon.url, label: "Day Out" },
      { src: sukoon.url, label: "Evening Edit" },
    ],
    colorName: "White",
    colorHex: "#F4F1EA",
    detailImg: stitchesStrip.url,
    description: [
      "It doesn't matter what the outside holds. One should be at ease with the lightest thing they reach for most. Mulmul, in its finest form, asks nothing of the body. Sukoon honours a tradition that has long carried this legacy, with a quiet touch of our own on, WHITE ON WHITE.",
      "Because feeling at ease with your traditional roots shouldn't need an occasion. Isn't living one enough?",
    ],
    details: [
      ["Fabric", "100% Natural Mul Mul (Undyed)"],
      ["Handwork", "Jaali, Orma, Channa Patti, Hathkatti (White-on-White Chikankari)"],
      ["Buttons", "Natural Shell"],
      ["Fit", "Relaxed"],
      ["Colour", "White"],
    ],
    handmadeNote:
      "Each piece is one of a kind. As this fabric is undyed and left in its natural white, slight variation in shade or texture between pieces is part of its handmade character. Dry cleaning is always recommended for the embroidery's longevity; if washing at home, wash separately from other colours.",
    altText: "Sukoon white-on-white hand embroidered chikankari shirt in mul mul cotton with shell buttons.",
    metaTitle: "White Chikankari Shirt | Hand Embroidered | Sukoon",
    metaDescription:
      "Shop Sukoon — a white-on-white hand embroidered chikankari shirt for men in natural mul mul cotton with shell buttons.",
    tags: ["chikankari", "white on white chikankari", "men's shirt", "hand embroidered", "mul mul shirt", "ethnic wear men", "Lucknow craft", "handmade shirt", "undyed cotton shirt"],
  },
  {
    slug: "zameen-shirt",
    name: "Zameen Shirt",
    title: "Zameen | Hand Embroidered Relaxed Fit Men's Chikankari Shirt",
    tagline: "Grounded in Presence",
    price: "₹6,300",
    images: [zameen.url],
    stylingImages: [
      { src: zameen.url, label: "After Hours" },
      { src: zameen.url, label: "Festive Gatherings" },
      { src: zameen.url, label: "Day Out" },
      { src: zameen.url, label: "Evening Edit" },
    ],
    colorName: "Hand-Dyed Taupe",
    colorHex: "#A8968F",
    detailImg: stitchesStrip.url,
    description: [
      "Zameen is grounded in where it comes from, soft, earthy, and always close to its roots. Tonal yet with a personality. It doesn't ask to be noticed, but holds a quiet presence effortlessly. Mulmul, in its finest form. Bringing the timeless into today in a way that feels distinctly our own, made in small batches.",
      "Because feeling at ease shouldn't need an occasion. Isn't living one enough?",
    ],
    details: [
      ["Fabric", "100% Hand-Dyed Cotton Mul Mul"],
      ["Handwork", "Jaali, Hathkatti, Channa Patti, Orma"],
      ["Buttons", "Dark Wood"],
      ["Fit", "Relaxed"],
      ["Colour", "Hand-Dyed Taupe with Grounded Grey Tonal Detailing"],
    ],
    handmadeNote: DYED_NOTE,
    altText: "Zameen hand embroidered taupe men's chikankari shirt in mul mul cotton with dark wooden buttons.",
    metaTitle: "Taupe Chikankari Shirt | Hand Embroidered | Zameen",
    metaDescription:
      "Shop Zameen — a taupe hand embroidered chikankari shirt for men in mul mul cotton with dark wooden buttons.",
    tags: ["chikankari", "men's shirt", "hand embroidered", "taupe shirt", "mul mul shirt", "ethnic wear men", "Lucknow craft", "handmade shirt", "hand-dyed shirt"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const SIZES = ["S", "M", "L", "XL"];
