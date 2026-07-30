import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import gulraaz from "@/assets/gulraaz_shirt.jpeg.asset.json";
import bahaar from "@/assets/bahaar_shirt.jpeg.asset.json";
import kinara from "@/assets/kinara_shirt.jpeg.asset.json";
import mohar from "@/assets/mohar_shirt.jpeg.asset.json";
import raah from "@/assets/raah_shirt.jpeg.asset.json";
import sukoon from "@/assets/sukoon_shirt.jpeg.asset.json";
import zameen from "@/assets/zameen_shirt.jpeg.asset.json";
import heroImg from "@/assets/collection_hero.png.asset.json";
import stitchesStrip from "@/assets/stitches_strip.png.asset.json";

export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
  head: () => ({
    meta: [
      { title: "Naqsh-e-Nigāh Collection | Notions in Pattern" },
      {
        name: "description",
        content:
          "Naqsh-e-Nigāh — Patterns of the Vision. The inaugural chikankari shirt collection from Notions in Pattern, hand-embroidered in Lucknow.",
      },
      { property: "og:title", content: "Naqsh-e-Nigāh Collection | Notions in Pattern" },
      {
        property: "og:description",
        content: "A collection that begins with how we see—and how that vision takes form.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const products = [
  { name: "GulRaaz Shirt", price: "₹6,300", img: gulraaz.url },
  { name: "Bahaar Shirt", price: "₹6,300", img: bahaar.url },
  { name: "Kinara Shirt", price: "₹6,300", img: kinara.url },
  { name: "Mohar Shirt", price: "₹6,300", img: mohar.url },
  { name: "Raah Shirt", price: "₹6,300", img: raah.url },
  { name: "Sukoon Shirt", price: "₹6,300", img: sukoon.url },
  { name: "Zameen Shirt", price: "₹6,300", img: zameen.url },
];

function CollectionsPage() {
  return (
    <div className="m-[5px] bg-background min-h-screen">
      <Header />

      {/* Hero */}
      <section
        className="relative w-full bg-cover bg-center min-h-[420px] md:min-h-[560px] flex items-center"
        style={{ backgroundImage: `url(${heroImg.url})` }}
      >
        <div className="absolute inset-0 bg-background/35" />
        <div className="relative px-8 md:px-16 py-16 max-w-xl">
          <p className="text-[12px] font-bold tracking-[0.28em] mb-4" style={{ color: BROWN }}>
            INAUGURAL COLLECTION
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight" style={{ color: BROWN }}>
            Naqsh-e-Nigāh
          </h1>
          <p className="font-serif italic text-2xl md:text-3xl mt-2" style={{ color: BROWN }}>
            Patterns of the Vision
          </p>
          <span className="block w-10 border-t mt-6 mb-6" style={{ borderColor: BROWN }} />
          <p className="text-[15px] leading-relaxed max-w-md" style={{ color: DARK }}>
            A collection that begins with how we see—
            <br />
            and how that vision takes form.
          </p>
        </div>
      </section>


      {/* Filters */}
      <div className="px-8 md:px-16 py-8 flex flex-wrap items-end gap-10">
        <span className="text-[12px] font-bold tracking-[0.22em]" style={{ color: BROWN }}>
          FILTER:
        </span>
        <div>
          <p className="text-[11px] font-bold tracking-[0.22em] mb-1" style={{ color: BROWN }}>
            CATEGORY
          </p>
          <select
            className="bg-transparent border-b pb-1 text-[14px] outline-none min-w-[140px]"
            style={{ color: DARK, borderColor: BROWN }}
          >
            <option>Shirts</option>
          </select>
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-[0.22em] mb-1" style={{ color: BROWN }}>
            SORT BY
          </p>
          <select
            className="bg-transparent border-b pb-1 text-[14px] outline-none min-w-[140px]"
            style={{ color: DARK, borderColor: BROWN }}
          >
            <option>Featured</option>
          </select>
        </div>
      </div>

      {/* Product grid */}
      <section className="px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
        {products.map((p) => (
          <article key={p.name}>
            <img src={p.img} alt={p.name} className="w-full aspect-[3/4] object-cover" />
            <h3 className="font-serif text-[17px] mt-4" style={{ color: BROWN }}>
              {p.name}
            </h3>
            <p className="text-[14px] mt-1" style={{ color: DARK }}>
              {p.price}
            </p>
          </article>
        ))}
      </section>

      {/* Collection story */}
      <section className="px-8 md:px-16 pt-20">
        <h2 className="text-[15px] font-bold tracking-[0.24em]" style={{ color: BROWN }}>
          COLLECTION STORY
        </h2>
        <span className="block w-8 border-t mt-3 mb-8" style={{ borderColor: BROWN }} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-[14px] leading-relaxed" style={{ color: DARK }}>
          <div className="space-y-5">
            <p>
              Rooted in Lucknow, it brings chikankari into a modern, everyday sensibility. Each block is hand-carved
              with a new twist on tradition, then embroidered by artisans who understand the craft deeply.
            </p>
            <p>Every fabric is hand-dyed; every batch, small.</p>
          </div>
          <div className="space-y-5">
            <p>
              Precision and patience are not ideas here—they are the process itself. Nothing here is rushed. Nothing
              here is incidental.
            </p>
            <p>
              Crafted in breathable fabrics, each piece is designed for ease— not reserved for occasion, but meant to
              be lived in.
            </p>
          </div>
          <div className="space-y-5">
            <p>The hand does not decorate what the eye imagines— it interprets it.</p>
            <p>
              Traditional Lucknow chikankari holds 32 principal stitches. Across this collection, we've worked with
              eleven— Tepchi, Bakhiya (Ulti &amp; Sidhi), Phanda, Keel Kangan, Ghas Patti, Hool, Jaali, Orma, Hathkati,
              Chana Patti, and Zanzeera—each chosen for the character it brings to breathable, everyday fabric.
            </p>
            <p>Among them:</p>
          </div>
        </div>
      </section>

      {/* Language of stitches */}
      <section className="px-8 md:px-16 pt-20 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-[15px] font-bold tracking-[0.24em]" style={{ color: BROWN }}>
            THE LANGUAGE OF STITCHES
          </h2>
          <span className="block w-8 border-t mt-3 mb-8" style={{ borderColor: BROWN }} />
          <div className="space-y-5 text-[14px] leading-relaxed max-w-md" style={{ color: DARK }}>
            <p>Together, they form a language—subtle, intentional. Detail doesn't demand attention; it reveals itself over time.</p>
            <p>Naqsh-e-Nigāh is not about being seen loudly. It is about being understood—slowly.</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-0">
          {[bahaar.url, mohar.url, kinara.url, zameen.url].map((src) => (
            <img key={src} src={src} alt="Chikankari stitch detail" className="w-full h-40 md:h-48 object-cover" />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
