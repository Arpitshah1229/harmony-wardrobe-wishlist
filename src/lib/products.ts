import gulraaz from "@/assets/gulraaz_shirt.jpeg.asset.json";
import bahaar from "@/assets/bahaar_shirt.jpeg.asset.json";
import kinara from "@/assets/kinara_shirt.jpeg.asset.json";
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
    colorName: "Natural (undyed)",
    colorHex: "#EDE6D6",
    detailImg: stitchesStrip.url,
    description: [
      "More like a flower quietly unfolding from within, GulRaaz is a hand embroidered men's chikankari shirt crafted in breathable cotton flex in its natural colour with a relaxed fit. Rooted in the timeless craft of Lucknow chikankari, it brings together present-day ease and thoughtful craftsmanship, with blocks reimagined by our team.",
      "Hand embroidered using Tepchi, Ghaspatti, and Olma, each stitch adds depth, movement, and quiet character. Finished with natural wooden buttons and brought to life by skilled artisans, GulRaaz is designed not simply to be worn, but to be lived in. Why should comfort and looking good be reserved for occasions? It's an everyday thing — made to make us feel good.",
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
    colorName: "Green",
    colorHex: "#7A8063",
    detailImg: stitchesStrip.url,
    description: [
      "Inspired by the quiet rhythm of nature, Bahaar celebrates growth that unfolds with ease. Crafted in hand-dyed breathable cotton flex in a beautiful green with a relaxed fit, this hand embroidered men's chikankari shirt reflects the timeless artistry of Lucknow chikankari through a contemporary lens.",
      "Hand embroidered using Ulta Bakhiya, Ghaspatti, and Olma, each motif is brought to life with contrast beige threads that add depth and movement. Finished with natural wooden buttons and handcrafted by skilled artisans, Bahaar is designed for effortless everyday elegance.",
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
    badge: "Hand dyed & Embroidered",
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
    colorName: "Hand-Dyed Summer Yellow",
    colorHex: "#D9B24C",
    detailImg: stitchesStrip.url,
    description: [
      "Kinara captures the quiet joy of sunlit shores, slow afternoons, and memories that linger long after the journey ends. Inspired by the calm happiness of coastal escapes, it is designed to evoke a feeling of ease, warmth, and lightness.",
      "Fluid in silhouette and unhurried in detail, the hand embroidery moves across the fabric like something remembered rather than designed. Delicate Phool, Orma, Tepchi, Phanda, Bakhiya, Keel Kangan, and Hool stitches come together in a composition that celebrates the artistry of Lucknow's chikankari tradition.",
      "Crafted from 100% hand-dyed cotton flex in a joyful summer yellow, Kinara feels light enough to forget you're wearing it, yet distinctive enough to be remembered. Finished with natural wooden buttons, it carries a quiet charm that feels effortless, relaxed, and uplifting.",
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
    colorName: "Hand-Dyed Onion Pink",
    colorHex: "#E3B6B4",
    detailImg: stitchesStrip.url,
    description: [
      "Some marks are not made to be seen immediately. They are felt more deeply, their arrival quietly awaited before they are received and cherished. Mohar is inspired by those lasting impressions — the ones that stay long after the moment has passed, like the stamp on a letter that quietly carries a story from one hand to another. It speaks of identity, belonging, and the beauty of something made to be received and cherished.",
      "The natural slub of the fabric carries its own character long before a single stitch is placed. Its subtle irregularities give the cloth an effortless depth, allowing the craftsmanship to feel honest and unforced. Hand-dyed in a soft onion pink, the 100% hand-dyed cotton slub becomes the perfect canvas for embroidery that works with the fabric, never against it.",
      "The motif is brought to life through delicate Bakhiya (Shadow Work) and is thoughtfully appliquéd with machine stitching, creating a beautiful balance between traditional handcraft and contemporary construction. Every detail is considered, allowing the craft to remain understated yet deeply expressive.",
      "Finished with natural wooden buttons, Mohar is designed not to demand attention, but to leave a lasting impression.",
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
    colorName: "Hand-Dyed Sky Greyish-Blue",
    colorHex: "#B9CBD8",
    detailImg: stitchesStrip.url,
    description: [
      "It doesn't matter what path you take — it always leads to a destination. It's the journey that's meant to be enjoyed, and the stories created along the way, as it arrives at the destination you intend, manifest for, and choose, eventually. So there's no destination in particular, and no urgency about getting there.",
      "Raah is cut loosely and finished with chain stitch and Hathkatti handwork that moves with the fabric rather than anchoring it. The slub cotton texture adds quiet presence without weight, dyed in a beautiful sky greyish-blue with a contrasting tonal blue that enhances the embroidery even further.",
      "The handwork begins at the front placket and travels all the way around to the back, arriving again — a continuous motif with no start or end, much like the philosophy behind the shirt itself.",
      "There is no occasion this is dressed for. It is simply made for days that belong to you. Wear it like you have nowhere to be, even when you do.",
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
    colorName: "White",
    colorHex: "#F4F1EA",
    detailImg: stitchesStrip.url,
    description: [
      "It doesn't matter what the outside holds — one needs to be at ease with the lightest thing they reach for most. Mul mul, in its finest form, doesn't ask anything of the body.",
      "Jaali work, Orma, Channa Patti, and Hathkatti come together in delicate hand stitches that add depth without adding weight. Detail that exists for those who look closely, not those who need to be impressed. Sukoon is not a statement. It is a preference. It is a choice.",
      "Rendered in white-on-white chikankari, Sukoon honors a tradition that has long carried this legacy — with a quiet touch of our own.",
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
    colorName: "Hand-Dyed Taupe",
    colorHex: "#A8968F",
    detailImg: stitchesStrip.url,
    description: [
      "Zameen begins with colour drawn slowly into mul mul — soft, earthy, and settled in a hand-dyed taupe, light enough for the warmer days. Considered enough for the ones that matter. It creates harmony, always rooted to its roots.",
      "Two tones carry its story: a tonal taupe base where Jaali and Hathkatti take shape, and a harmonious grounded grey where Hathkatti, Channa Patti, and Orma create a beautiful boundary that holds its ground.",
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
