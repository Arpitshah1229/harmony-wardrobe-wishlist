import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import { products, PRODUCT_SUBTITLE, type Product } from "@/lib/products";
import heroImg from "@/assets/collection_hero_v2.jpeg.asset.json";
import stitchesStrip from "@/assets/stitches_strip_v2.jpeg.asset.json";


function ProductCard({ product }: { product: Product }) {
  const [imgIdx, setImgIdx] = useState(0);
  const hasMultiple = product.images.length > 1;
  const move = (d: number) =>
    setImgIdx((c) => (c + d + product.images.length) % product.images.length);

  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden bg-cream/60">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="block relative">
          <img
            src={product.images[imgIdx]}
            alt={product.name}
            loading="lazy"
            className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold tracking-[0.18em]"
            style={{ backgroundColor: "#F7F4EE", color: BROWN }}
          >
            {product.badge || "HANDMADE"}
          </span>
          <span
            className="absolute bottom-0 left-0 right-0 py-3.5 text-center text-[11px] font-bold tracking-[0.22em] opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
          >
            VIEW DETAILS
          </span>
        </Link>

        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                move(-1);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full grid place-items-center shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: "#F7F4EE", color: BROWN }}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                move(1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full grid place-items-center shadow-sm opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: "#F7F4EE", color: BROWN }}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-serif text-[19px] font-bold leading-snug truncate" style={{ color: BROWN }}>
            <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:opacity-70">
              {product.name}
            </Link>
          </h3>
          <p className="text-[11px] mt-1 leading-snug" style={{ color: DARK }}>
            {PRODUCT_SUBTITLE}
          </p>
        </div>
        <p className="shrink-0 text-[15px] font-bold" style={{ color: DARK }}>
          {product.price}
        </p>
      </div>

      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="mt-3 block w-full py-3 text-center text-[11px] font-bold tracking-[0.22em] transition-opacity hover:opacity-85"
        style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
      >
        ADD TO CART
      </Link>
    </article>
  );
}



export const Route = createFileRoute("/collections")({
  component: CollectionsPage,
  head: () => ({
    meta: [
      { title: "Naqsh-e-Nigāh Collection | Notions in Pattern" },
      {
        name: "description",
        content:
          "Naqsh-e-Nigāh, Patterns of the Vision. The inaugural chikankari shirt collection from Notions in Pattern, hand-embroidered in Lucknow.",
      },
      { property: "og:title", content: "Naqsh-e-Nigāh Collection | Notions in Pattern" },
      {
        property: "og:description",
        content: "A collection that begins with how we see, and how that vision takes form.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});


function CollectionsPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header overlay />

      {/* Hero */}
      <section
        className="relative w-full bg-cover bg-center min-h-[620px] md:min-h-[780px] flex items-center"
        style={{ backgroundImage: `url(${heroImg.url})` }}
      >
        <div className="absolute inset-0 bg-background/10" />
        <div className="relative ml-auto px-8 md:px-16 py-24 max-w-xl text-left">
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
            A collection that begins with how we see,
            <br />
            and how that vision takes form.
          </p>
        </div>
      </section>

      <AnnouncementBar bg="#C43D32" color="#F7F4EE" />

      {/* Trust strip */}
      <div className="px-8 md:px-16 py-6 flex flex-wrap items-center justify-center gap-x-16 gap-y-4 border-b border-border/60">
        {["HAND-EMBROIDERED IN LUCKNOW", "HAND-DYED, SMALL BATCH"].map((t) => (
          <p key={t} className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-center" style={{ color: BROWN }}>
            {t}
          </p>
        ))}
      </div>

      {/* Filters */}
      <div id="shop" className="px-8 md:px-16 pt-12 pb-8 flex flex-wrap items-end justify-between gap-8">
        <div className="flex flex-wrap items-end gap-10">
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
      </div>

      {/* Product grid */}
      <section className="px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </section>




      {/* Collection story */}
      <section className="mt-24 px-8 md:px-16 py-20" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-serif text-4xl md:text-5xl font-bold tracking-[0.04em] text-center"
            style={{ color: BROWN }}
          >
            Collection Story
          </h2>
          <span className="block w-16 border-t-2 mx-auto mt-5 mb-14" style={{ borderColor: BROWN }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 text-[15px] leading-[1.9]" style={{ color: DARK }}>
            <div className="space-y-5 md:border-r md:pr-10 border-border/70">
              <p className="font-serif italic text-2xl leading-snug" style={{ color: BROWN }}>
                Rooted in Lucknow.
              </p>
              <p>
                It brings chikankari into a modern, everyday sensibility. Each block is hand-carved with a new twist on
                tradition, then embroidered by artisans who understand the craft deeply.
              </p>
              <p>Every fabric is hand-dyed; every batch, small.</p>
            </div>
            <div className="space-y-5 md:border-r md:pr-10 border-border/70">
              <p className="font-serif italic text-2xl leading-snug" style={{ color: BROWN }}>
                Precision and patience.
              </p>
              <p>
                They are not ideas here, they are the process itself. Nothing here is rushed. Nothing here is
                incidental.
              </p>
              <p>
                Crafted in breathable fabrics, each piece is designed for ease, not reserved for occasion, but meant to
                be lived in.
              </p>
            </div>
            <div className="space-y-5">
              <p className="font-serif italic text-2xl leading-snug" style={{ color: BROWN }}>
                Eleven of thirty-two.
              </p>
              <p>The hand does not decorate what the eye imagines, it interprets it.</p>
              <p>
                Traditional Lucknow chikankari holds 32 principal stitches. Across this collection, we've worked with
                eleven, Tepchi, Bakhiya (Ulti &amp; Sidhi), Phanda, Keel Kangan, Ghas Patti, Hool, Jaali, Orma,
                Hathkati, Chana Patti, and Zanzeera, each chosen for the character it brings to breathable, everyday
                fabric.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Language of stitches */}
      <section className="px-8 md:px-16 pt-24 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-serif text-4xl md:text-5xl font-bold tracking-[0.04em] text-center"
            style={{ color: BROWN }}
          >
            The Language of Stitches
          </h2>
          <span className="block w-16 border-t-2 mx-auto mt-5 mb-10" style={{ borderColor: BROWN }} />
          <div className="max-w-2xl mx-auto text-center space-y-5 text-[15px] leading-[1.9]" style={{ color: DARK }}>
            <p>
              Together, they form a language, subtle, intentional. Detail doesn't demand attention; it reveals itself
              over time.
            </p>
            <p className="font-serif italic text-2xl md:text-[28px] leading-snug" style={{ color: BROWN }}>
              Naqsh-e-Nigāh is not about being seen loudly. It is about being understood, slowly.
            </p>
          </div>
        </div>
        <figure className="mt-14 overflow-hidden">
          <img
            src={stitchesStrip.url}
            alt="Chikankari stitch details on hand-dyed fabric"
            loading="lazy"
            className="w-full object-cover"
          />
          <figcaption
            className="mt-4 text-center text-[11px] font-bold tracking-[0.24em] uppercase"
            style={{ color: BROWN }}
          >
            Eleven stitches, one Notion
          </figcaption>
        </figure>
      </section>


      <Footer />
    </div>
  );
}
