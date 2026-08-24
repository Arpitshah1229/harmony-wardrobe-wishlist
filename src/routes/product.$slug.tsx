import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, Phone, MessageCircle, Truck, RotateCcw, Store, X, Ruler, Banknote, Package, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import {
  products,
  getProduct,
  PRODUCT_SUBTITLE,
  SIZES,
  SIZE_CHART,
  CARE_INSTRUCTIONS,
  SIZING_NOTE,
  SHIPPING_NOTE,
} from "@/lib/products";
import { useCart, parsePrice } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
  head: ({ params }) => {
    const p = getProduct(params.slug);
    const title = p ? p.metaTitle : "Product | Notions in Pattern";
    const description = p
      ? p.metaDescription
      : "Hand embroidered chikankari shirts from Notions in Pattern.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: p ? p.tags.join(", ") : "" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

const BORDER = "rgba(75,53,40,0.25)";

function SizeChartModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(44,33,25,0.55)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Size chart"
    >
      <div
        className="bg-background w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close size chart"
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X size={20} color={BROWN} />
        </button>
        <h2 className="font-serif text-2xl md:text-3xl font-bold" style={{ color: BROWN }}>
          Size Chart
        </h2>
        <p className="mt-1 text-[12px] font-bold tracking-[0.18em] uppercase" style={{ color: DARK }}>
          In inches
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-[13px] border-collapse" style={{ color: DARK }}>
            <thead>
              <tr>
                {["Measurement", "S", "M", "L", "XL", "Tolerance"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2.5 px-3 font-bold text-[11px] tracking-[0.14em] uppercase border-b"
                    style={{ color: BROWN, borderColor: BROWN }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZE_CHART.map((r) => (
                <tr key={r.measurement}>
                  <td className="py-2.5 px-3 font-bold border-b" style={{ borderColor: BORDER }}>
                    {r.measurement}
                  </td>
                  {[r.s, r.m, r.l, r.xl, r.tolerance].map((v, i) => (
                    <td key={i} className="py-2.5 px-3 border-b" style={{ borderColor: BORDER }}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 text-[12px] leading-[1.8] italic" style={{ color: DARK }}>
          Note: As pieces are handmade, measurements may vary slightly (see tolerance column) — this is natural to the
          craft.
        </p>
        <div className="mt-5 pt-5 border-t" style={{ borderColor: BORDER }}>
          <p className="text-[12px] font-bold tracking-[0.16em] uppercase" style={{ color: BROWN }}>
            Sizing Note
          </p>
          <p className="mt-1.5 text-[13px] leading-[1.8]" style={{ color: DARK }}>
            {SIZING_NOTE}
          </p>
        </div>
      </div>
    </div>
  );
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

function Lightbox({
  images,
  index,
  alt,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const stateRef = useRef({ zoom, offset });
  stateRef.current = { zoom, offset };

  const reset = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const step = (dir: number) => {
    onIndex((index + dir + images.length) % images.length);
    reset();
  };

  const zoomAt = useCallback((next: number, px: number, py: number) => {
    const { zoom: z, offset: o } = stateRef.current;
    const target = clamp(next, MIN_ZOOM, MAX_ZOOM);
    const k = target / z;
    const nx = px - (px - o.x) * k;
    const ny = py - (py - o.y) * k;
    setZoom(target);
    setOffset(target === 1 ? { x: 0, y: 0 } : { x: nx, y: ny });
  }, []);

  const zoomCenter = (factor: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    zoomAt(stateRef.current.zoom * factor, (rect?.width ?? 0) / 2, (rect?.height ?? 0) / 2);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const rect = el.getBoundingClientRect();
      zoomAt(stateRef.current.zoom * Math.exp(-dy * 0.002), e.clientX - rect.left, e.clientY - rect.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  return (
    <div
      className="fixed inset-0 z-[110] flex flex-col"
      style={{ backgroundColor: "rgba(44,33,25,0.94)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Product image viewer"
    >
      <div className="flex items-center justify-end gap-2 p-4">
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => zoomCenter(1 / 1.4)}
          className="h-10 w-10 grid place-items-center border"
          style={{ borderColor: "rgba(247,244,238,0.5)", color: "#F7F4EE" }}
        >
          <ZoomOut size={18} />
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => zoomCenter(1.4)}
          className="h-10 w-10 grid place-items-center border"
          style={{ borderColor: "rgba(247,244,238,0.5)", color: "#F7F4EE" }}
        >
          <ZoomIn size={18} />
        </button>
        <button
          type="button"
          onClick={reset}
          className="h-10 px-4 text-[11px] font-bold tracking-[0.18em] border"
          style={{ borderColor: "rgba(247,244,238,0.5)", color: "#F7F4EE" }}
        >
          RESET
        </button>
        <button
          type="button"
          aria-label="Close viewer"
          onClick={onClose}
          className="h-10 w-10 grid place-items-center border"
          style={{ borderColor: "rgba(247,244,238,0.5)", color: "#F7F4EE" }}
        >
          <X size={18} />
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden touch-none select-none"
        style={{ cursor: zoom > 1 ? (dragRef.current ? "grabbing" : "grab") : "zoom-in" }}
        onPointerDown={(e) => {
          if (zoom === 1) return;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
        }}
        onPointerMove={(e) => {
          const d = dragRef.current;
          if (!d) return;
          setOffset({ x: d.ox + (e.clientX - d.x), y: d.oy + (e.clientY - d.y) });
        }}
        onPointerUp={() => {
          dragRef.current = null;
        }}
        onDoubleClick={(e) => {
          const rect = containerRef.current!.getBoundingClientRect();
          zoomAt(zoom > 1 ? 1 : 2.5, e.clientX - rect.left, e.clientY - rect.top);
        }}
      >
        <img
          src={images[index]}
          alt={alt}
          draggable={false}
          className="absolute inset-0 m-auto max-h-full max-w-full object-contain"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: dragRef.current ? "none" : "transform 120ms ease-out",
          }}
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 grid place-items-center"
              style={{ backgroundColor: "rgba(247,244,238,0.9)", color: BROWN }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 grid place-items-center"
              style={{ backgroundColor: "rgba(247,244,238,0.9)", color: BROWN }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="p-4 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            aria-label={`View image ${i + 1}`}
            onClick={() => {
              onIndex(i);
              reset();
            }}
            className="shrink-0"
            style={{ outline: i === index ? "2px solid #F7F4EE" : "none" }}
          >
            <img src={src} alt="" className="h-16 w-12 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);
  const [size, setSize] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("FABRIC & DETAILS");
  const [chartOpen, setChartOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { addItem } = useCart();
  const navigate = useNavigate();

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

  const gallery = Array.from(new Set([...product.images, product.detailImg].filter(Boolean)));
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const accordions = [
    {
      title: "FABRIC & DETAILS",
      body: (
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[14px] leading-[1.8]">
          {product.details.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="font-bold">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      title: "A NOTE ON HANDMADE CHARACTER",
      body: <p className="text-[14px] leading-[1.9]">{product.handmadeNote}</p>,
    },
    {
      title: "CARE INSTRUCTIONS",
      body: (
        <ul className="space-y-2 text-[14px] leading-[1.9] list-disc pl-5">
          {CARE_INSTRUCTIONS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "SHIPPING & PROCESSING",
      body: (
        <div className="space-y-3 text-[14px] leading-[1.9]">
          <p>{SHIPPING_NOTE}</p>
          <p className="font-bold" style={{ color: BROWN }}>
            Read our full Exchange &amp; Store Credit Policy →
          </p>
        </div>
      ),
    },
  ];

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
            <button
              key={i}
              type="button"
              aria-label={`Open image ${i + 1} in viewer`}
              onClick={() => setLightbox(i)}
              className="group relative block w-full overflow-hidden bg-cream/60 cursor-zoom-in"
            >
              <img
                src={src}
                alt={product.altText}
                loading={i === 0 ? "eager" : "lazy"}
                className="w-full aspect-[3/4] object-cover"
              />
              <span
                className="absolute bottom-3 right-3 h-9 w-9 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: "#F7F4EE", color: BROWN }}
              >
                <Expand size={15} />
              </span>
            </button>
          ))}
        </div>

        {/* Detail column */}
        <div className="lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto no-scrollbar pb-10 pr-1">
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

          <p className="mt-6 font-serif text-[19px] font-bold leading-snug" style={{ color: BROWN }}>
            {product.tagline}
          </p>
          <div className="mt-3 space-y-4 text-[14px] leading-[1.9]" style={{ color: DARK }}>
            {product.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

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
            <div className="flex items-end justify-between gap-4">
              <p className="text-[14px] font-bold" style={{ color: DARK }}>
                Size:
              </p>
              <button
                type="button"
                onClick={() => setChartOpen(true)}
                className="flex items-center gap-1.5 border px-3 py-2 text-[11px] font-bold tracking-[0.18em] transition-colors hover:bg-[color:var(--cream)]"
                style={{ color: BROWN, borderColor: BROWN }}
              >
                <Ruler size={13} /> SIZE CHART
              </button>
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
            <p className="mt-3 text-[12px] leading-[1.8]" style={{ color: DARK }}>
              {SIZING_NOTE}
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
              onClick={() => setPickerOpen(true)}
              className="flex-1 py-4 text-[12px] font-bold tracking-[0.24em]"
              style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
            >
              ADD TO BAG
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-[10px] font-bold tracking-[0.14em] text-center" style={{ color: BROWN }}>
            <div className="flex flex-col items-center gap-1.5">
              <Truck size={16} /> DISPATCH IN 2-4 DAYS
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <RotateCcw size={16} /> EXCHANGE &amp; STORE CREDIT
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Store size={16} /> MADE IN LUCKNOW
            </div>
          </div>

          {/* Accordions */}
          <div className="mt-9 border-t" style={{ borderColor: BORDER }}>
            {accordions.map((a) => (
              <div key={a.title} className="border-b" style={{ borderColor: BORDER }}>
                <button
                  type="button"
                  onClick={() => setOpen((o) => (o === a.title ? null : a.title))}
                  className="w-full py-4 flex items-center justify-between gap-4 text-left text-[12px] font-bold tracking-[0.2em]"
                  style={{ color: BROWN }}
                >
                  {a.title}
                  {open === a.title ? <Minus size={14} className="shrink-0" /> : <Plus size={14} className="shrink-0" />}
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
                src={p.images[0]}
                alt={p.altText}
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

      {/* Newsletter + Trust */}
      <section className="px-8 md:px-16 py-16 bg-background border-t" style={{ borderColor: "rgba(75,53,40,0.15)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: BROWN }}>
            Get on the list
          </h2>
          <p className="mt-4 text-[14px] leading-[1.8]" style={{ color: DARK }}>
            Perks include 10% off your first online order. Be the first to know about new collections, store launches, sales, and much more!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address here"
              className="flex-1 px-4 py-3 bg-background border text-[13px] outline-none"
              style={{ borderColor: "rgba(75,53,40,0.35)", color: DARK }}
            />
            <button
              type="button"
              className="px-8 py-3 text-[12px] font-bold tracking-[0.18em]"
              style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
            >
              SIGN ME UP
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <RotateCcw size={28} color={BROWN} strokeWidth={1.5} />,
              title: "Easy returns",
              text: "Return within 15 days of order delivery.",
            },
            {
              icon: <Truck size={28} color={BROWN} strokeWidth={1.5} />,
              title: "We ship pan India",
              text: "Delivery across India.",
            },
            {
              icon: <Package size={28} color={BROWN} strokeWidth={1.5} />,
              title: "Free shipping",
              text: "Free shipping on orders above ₹1,000.",
            },
            {
              icon: <Banknote size={28} color={BROWN} strokeWidth={1.5} />,
              title: "Cash on delivery",
              text: "COD available.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-[14px] font-bold" style={{ color: BROWN }}>
                  {item.title}
                </h3>
                <p className="mt-1 text-[13px] leading-[1.7]" style={{ color: DARK }}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnnouncementBar />
      <Footer />

      {chartOpen && <SizeChartModal onClose={() => setChartOpen(false)} />}
      {lightbox !== null && (
        <Lightbox
          images={gallery}
          index={lightbox}
          alt={product.altText}
          onClose={() => setLightbox(null)}
          onIndex={setLightbox}
        />
      )}
    </div>
  );
}
