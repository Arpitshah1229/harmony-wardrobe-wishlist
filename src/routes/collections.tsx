import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import { products, PRODUCT_SUBTITLE } from "@/lib/products";
import heroImg from "@/assets/collection_hero_v2.jpeg.asset.json";
import stitchesStrip from "@/assets/stitches_strip_v2.jpeg.asset.json";

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
        {products.map((p, i) => (
          <ProductCard key={p.slug} startIndex={i} />
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
            Eleven stitches, one &ldquo;Notion&rdquo;
          </figcaption>
        </figure>
      </section>


      <AnnouncementBar />
      <Footer />
    </div>
  );
}
