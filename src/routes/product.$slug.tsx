import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Minus, Plus, Phone, MessageCircle, Truck, RotateCcw, Store } from "lucide-react";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import { products, getProduct, PRODUCT_SUBTITLE, SIZES } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
  head: ({ params }) => {
    const p = getProduct(params.slug);
    const title = p ? `${p.name} | Notions in Pattern` : "Product | Notions in Pattern";
    const description = p
      ? `${p.name} — ${PRODUCT_SUBTITLE}. Hand-dyed, small batch, embroidered in Lucknow.`
      : "Hand embroidered chikankari shirts from Notions in Pattern.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

const accordions = [
  {
    title: "PRODUCT DETAILS & CARE",
    body: (
      <div className="space-y-4 text-[14px] leading-[1.9]">
        <dl className="grid grid-cols-2 gap-y-1.5 max-w-sm">
          {[
            ["Fit", "Relaxed"],
            ["Sleeve", "Short sleeve"],
            ["Collar", "Classic"],
            ["Pattern", "Hand embroidered"],
            ["Lining", "No"],
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-bold">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div>
          <p className="font-bold tracking-[0.12em] uppercase text-[12px] mb-1">Care Instructions</p>
          <p>Gentle hand wash separately in cold water. Do not bleach. Dry in shade. Cool iron on reverse.</p>
        </div>
        <div>
          <p className="font-bold tracking-[0.12em] uppercase text-[12px] mb-1">Note</p>
          <p>
            Slight irregularities in hand-dyeing and embroidery are inherent to the craft and make each piece singular.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "SHIPPING & PAYMENT",
    body: (
      <ul className="space-y-2 text-[14px] leading-[1.9] list-disc pl-5">
        <li>Free shipping across India on all orders.</li>
        <li>Standard delivery timeline is 5 to 7 business days.</li>
        <li>We ship worldwide; duties and conveyance charges may apply.</li>
        <li>Payments accepted via cards, netbanking, UPI, and wallets.</li>
      </ul>
    ),
  },
  {
    title: "RETURN & EXCHANGE",
    body: (
      <ul className="space-y-2 text-[14px] leading-[1.9] list-disc pl-5">
        <li>Easy returns or exchange within 7 days of delivery.</li>
        <li>The piece must be unworn, unwashed, and with the original tags intact.</li>
        <li>Write to us and we will arrange a pickup wherever service is available.</li>
      </ul>
    ),
  },
  {
    title: "FIND IN STORE",
    body: (
      <p className="text-[14px] leading-[1.9]">
        Our pieces are made in small batches in Lucknow. Write to us to book a studio visit or a virtual viewing.
      </p>
    ),
  },
];

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("PRODUCT DETAILS & CARE");

  if (!product) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 px-8 py-32 text-center">
          <h1 className="font-serif text-4xl font-bold" style={{ color: BROWN }}>
            Piece not found
          </h1>
          <Link to="/collections" className="mt-6 inline-block text-[12px] font-bold tracking-[0.22em]" style={{ color: BROWN }}>
            BACK TO COLLECTION
          </Link>
        </div>
        <AnnouncementBar />
        <Footer />
      </div>
    );
  }

  const gallery = [product.img, product.detailImg, product.img, product.detailImg];
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <nav className="px-8 md:px-16 py-4 text-[11px] font-bold tracking-[0.2em]" style={{ color: BROWN }}>
        <Link to="/collections" className="hover:opacity-70">
          NAQSH-E-NIGĀH
        </Link>
        <span className="px-2">/</span>
        <span style={{ color: DARK }}>{product.name.toUpperCase()}</span>
      </nav>

      <section className="px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-14">
        {/* Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${product.name} view ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              className="w-full aspect-[3/4] object-cover bg-cream/60"
            />
          ))}
        </div>

        {/* Detail column */}
        <div className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pb-10 pr-1">
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight" style={{ color: BROWN }}>
            {product.name}
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed" style={{ color: DARK }}>
            {PRODUCT_SUBTITLE}
          </p>

          <p className="mt-5 text-[18px] font-bold" style={{ color: BROWN }}>
            MRP {product.price}{" "}
            <span className="text-[12px] font-normal" style={{ color: DARK }}>
              inclusive of all taxes
            </span>
          </p>

          <p className="mt-6 text-[14px] leading-[1.9]" style={{ color: DARK }}>
            Hand-dyed breathable fabric with all-over chikankari embroidery, worked by artisans in Lucknow. Eleven
            traditional stitches, read slowly across a relaxed silhouette that is made to be lived in.
          </p>

          <p className="mt-5 text-[14px]" style={{ color: DARK }}>
            <span className="font-bold">Material:</span> Hand-dyed cotton
          </p>

          <div className="mt-5">
            <p className="text-[14px]" style={{ color: DARK }}>
              <span className="font-bold">Colour:</span> {product.colorName}
            </p>
            <span
              className="mt-2 inline-block h-9 w-9 border"
              style={{ backgroundColor: product.colorHex, borderColor: BROWN }}
            />
          </div>

          {/* Size */}
          <div className="mt-7">
            <div className="flex items-end justify-between">
              <p className="text-[14px] font-bold" style={{ color: DARK }}>
                Size:
              </p>
              <span className="text-[11px] font-bold tracking-[0.2em]" style={{ color: BROWN }}>
                SIZE GUIDE
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className="py-3 text-[13px] font-bold border transition-colors"
                  style={
                    size === s
                      ? { backgroundColor: BROWN, color: "#F7F4EE", borderColor: BROWN }
                      : { color: DARK, borderColor: "rgba(75,53,40,0.35)" }
                  }
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[12px]" style={{ color: DARK }}>
              The model (height 5&apos;11&quot;) is wearing a size M.
            </p>
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <p className="text-[14px] font-bold" style={{ color: DARK }}>
              Quantity:
            </p>
            <div className="flex items-center border" style={{ borderColor: "rgba(75,53,40,0.35)" }}>
              <button type="button" aria-label="Decrease quantity" className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus size={14} color={BROWN} />
              </button>
              <span className="px-4 text-[14px] font-bold" style={{ color: DARK }}>
                {qty}
              </span>
              <button type="button" aria-label="Increase quantity" className="px-3 py-2" onClick={() => setQty((q) => q + 1)}>
                <Plus size={14} color={BROWN} />
              </button>
            </div>
          </div>

          {/* Why you'll love this */}
          <div className="mt-8">
            <p className="flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] uppercase" style={{ color: BROWN }}>
              <Heart size={14} /> Why you&apos;ll love this
            </p>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-[14px] leading-[1.85]" style={{ color: DARK }}>
              <li>Looks quiet from across the room and detailed up close.</li>
              <li>Hand-dyed, breathable fabric that stays easy through long days.</li>
              <li>Relaxed enough for everyday, considered enough for the occasion.</li>
            </ul>
          </div>

          <div className="mt-8 flex items-stretch gap-3">
            <button
              type="button"
              aria-label="Add to wishlist"
              className="w-14 flex items-center justify-center border"
              style={{ borderColor: BROWN }}
            >
              <Heart size={18} color={BROWN} />
            </button>
            <button
              type="button"
              className="flex-1 py-4 text-[12px] font-bold tracking-[0.24em]"
              style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
            >
              ADD TO BAG
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-[10px] font-bold tracking-[0.14em] text-center" style={{ color: BROWN }}>
            <div className="flex flex-col items-center gap-1.5">
              <Truck size={16} /> FREE SHIPPING
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <RotateCcw size={16} /> 7-DAY RETURNS
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Store size={16} /> MADE IN LUCKNOW
            </div>
          </div>

          {/* Accordions */}
          <div className="mt-9 border-t" style={{ borderColor: "rgba(75,53,40,0.25)" }}>
            {accordions.map((a) => (
              <div key={a.title} className="border-b" style={{ borderColor: "rgba(75,53,40,0.25)" }}>
                <button
                  type="button"
                  onClick={() => setOpen((o) => (o === a.title ? null : a.title))}
                  className="w-full py-4 flex items-center justify-between text-[12px] font-bold tracking-[0.2em]"
                  style={{ color: BROWN }}
                >
                  {a.title}
                  {open === a.title ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                {open === a.title && (
                  <div className="pb-5" style={{ color: DARK }}>
                    {a.body}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Help */}
          <div className="mt-8 p-5 border border-dashed" style={{ borderColor: BROWN }}>
            <p className="font-serif text-xl font-bold" style={{ color: BROWN }}>
              Need any help?
            </p>
            <p className="mt-1 text-[13px]" style={{ color: DARK }}>
              Get in touch. Mon to Sat, 10:00 AM to 6:00 PM IST.
            </p>
            <div className="mt-3 flex flex-wrap gap-5 text-[12px] font-bold tracking-[0.16em]" style={{ color: BROWN }}>
              <span className="flex items-center gap-1.5">
                <Phone size={13} /> +91 00000 00000
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle size={13} /> CHAT
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* More from this collection */}
      <section className="mt-24 px-8 md:px-16 py-16" style={{ backgroundColor: "var(--cream)" }}>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center" style={{ color: BROWN }}>
          More from this Collection
        </h2>
        <span className="block w-16 border-t-2 mx-auto mt-5 mb-12" style={{ borderColor: BROWN }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {others.map((p) => (
            <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} className="group flex flex-col">
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <h3 className="mt-4 font-serif text-[18px] font-bold" style={{ color: BROWN }}>
                {p.name}
              </h3>
              <p className="text-[12px] mt-1 leading-snug" style={{ color: DARK }}>
                {PRODUCT_SUBTITLE}
              </p>
              <p className="mt-1.5 text-[14px] font-bold" style={{ color: DARK }}>
                {p.price}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <AnnouncementBar />
      <Footer />
    </div>
  );
}
