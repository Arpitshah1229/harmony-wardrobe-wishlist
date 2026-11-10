import { StoreImage } from "@/components/store-image";
import { useLiveProduct, useLivePrices } from "@/lib/shopify";
import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, Truck, RotateCcw, Store, X, Ruler, Banknote, Expand } from "lucide-react";
import { PhoneIcon } from "@/components/phone-icon";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { GmailIcon } from "@/components/gmail-icon";
import { InstagramIcon } from "@/components/instagram-icon";
import { Header, Footer, AnnouncementBar, BROWN, DARK, GMAIL_COMPOSE_URL } from "@/components/site-chrome";
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
import { AddToCartDialog } from "@/components/add-to-cart-dialog";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/wishlist";
import { SIZE_CHART_MODELS } from "@/lib/size-chart-models";
import { MobileProductViewer } from "@/components/mobile-product-viewer";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
  validateSearch: (s: Record<string, unknown>): { img?: number } => {
    const n = Number(s.img);
    return Number.isInteger(n) && n > 0 ? { img: n } : {};
  },
  head: ({ params }) => {
    const p = getProduct(params.slug);
    const title = p ? p.metaTitle : "Product | Notions in Pattern";
    const description = p ? p.metaDescription : "Hand embroidered chikankari shirts from Notions in Pattern.";
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

const PHONE_DISPLAY = "+91 75218 02791";
const PHONE_TEL = "tel:+917521802791";
const WHATSAPP_CHAT_URL =
  "https://wa.me/917521802791?text=Hi%20NIP%2C%20I%27d%20like%20to%20know%20more%20about%20this%20shirt.";
const INSTAGRAM_URL = "https://instagram.com/notionsinpattern.nipstories?utm_source=qr&cplk=OG1hNDlpNThjYWl4";

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
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Close size chart"
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X size={20} color={BROWN} />
        </Button>
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
        <section className="mt-8 text-center text-foreground" aria-label="Model sizing reference">
          <p className="mb-4 text-lg font-bold text-primary">N I P</p>
          <div className="grid grid-cols-2 items-start gap-3 md:gap-4">
            {SIZE_CHART_MODELS.map((model) => (
              <figure key={model.size} className="min-w-0">
                <div className="aspect-[3/4] w-full">
                  <StoreImage src={model.image} alt={model.alt} className="h-full w-full object-contain" />
                </div>
                <figcaption className="mt-3 text-sm leading-relaxed text-primary md:text-base">
                  <p>Wearing size {model.size}</p>
                  <p>Height : {model.height}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed md:text-base">
            Our models are shown for fit and sizing reference. Please refer to the garment measurements above to choose
            the size that best suits you and your preferred fit.
          </p>
        </section>
      </div>
    </div>
  );
}

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
  // Fixed framing (no zoom): the photo is slightly larger than the screen and follows the cursor in 2D.
  const [pan, setPan] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const step = (dir: number) => onIndex((index + dir + images.length) % images.length);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Block the browser/trackpad from zooming the page while the viewer is open.
    const onWheel = (e: WheelEvent) => {
      // Keep ordinary scrolling available inside the thumbnail column.
      // Trackpad pinch must still never zoom the page.
      if (!e.ctrlKey && e.target instanceof Element && e.target.closest('[data-viewer-thumbnails]')) return;
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

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
      ref={containerRef}
      className="fixed inset-0 z-[110] bg-viewer-surface"
      role="dialog"
      aria-modal="true"
      aria-label="Product image viewer"
      onPointerMove={(e) => {
        const x = clamp(e.clientX / window.innerWidth, 0, 1);
        const y = clamp(e.clientY / window.innerHeight, 0, 1);
        setPan({ x, y });
      }}
    >
      <div className="absolute inset-0 overflow-hidden touch-none select-none cursor-default">
        <StoreImage
          fullDetail
          loading="eager"
          src={images[index]}
          alt={alt}
          draggable={false}
          className="absolute left-0 top-0 h-[115%] w-[140%] max-w-none object-cover"
          style={{
            transform: `translate(${(-pan.x * 40) / 1.4}%, ${(-pan.y * 15) / 1.15}%)`,
            objectPosition: `${pan.x * 100}% ${pan.y * 100}%`,
          }}
        />
      </div>

      {/* Close */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Close viewer"
        onClick={onClose}
        className="absolute top-3 right-[15px] z-20 h-16 w-[100px] rounded-none bg-transparent text-foreground hover:bg-transparent [&_svg]:size-14"
      >
        <X className="size-14" strokeWidth={1} />
      </Button>

      {/* Thumbnail filmstrip floating over the photo along the right edge */}
      {images.length > 1 && (
        <div data-viewer-thumbnails className="absolute right-0 top-[88px] bottom-0 z-10 flex w-[130px] flex-col items-center gap-3 overflow-y-auto overscroll-contain no-scrollbar pt-1 pb-4">
          {images.map((src, i) => (
            <Button
              key={i}
              type="button"
              variant="ghost"
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === index}
              onClick={() => onIndex(i)}
              className={`h-[125px] w-[100px] shrink-0 rounded-none p-0 outline-offset-2 ${i === index ? "outline outline-foreground opacity-100" : "opacity-70"}`}
            >
              <StoreImage src={src} alt="" className="h-[125px] w-[100px] object-cover" />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductPage() {
  const { slug } = Route.useParams();
  const { img: startImg } = Route.useSearch();
  const [galleryIdx, setGalleryIdx] = useState(startImg ?? 0);
  useEffect(() => {
    if (!startImg || window.innerWidth >= 768) return;
    const jump = () => {
      const strip = document.querySelector<HTMLElement>("[data-gallery-strip]");
      if (strip) strip.scrollTo({ left: strip.clientWidth * startImg });
    };
    const timers = [50, 400, 900].map((ms) => window.setTimeout(jump, ms));
    return () => timers.forEach(clearTimeout);
  }, [slug, startImg]);
  const product = getProduct(slug);
  const { priceText, isSoldOut } = useLiveProduct(product);
  const livePrice = useLivePrices();
  const [size, setSize] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("FABRIC & DETAILS");
  const [chartOpen, setChartOpen] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { has, toggle } = useWishlist();
  const isWished = product ? has(product.slug) : false;

  if (!product) {
    return (
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <AnnouncementBar bg="#7B1113" color="#F7F4EE" />
        <div className="flex-1 px-8 py-32 text-center">
          <h1 className="font-serif text-4xl font-bold" style={{ color: BROWN }}>
            Piece not found
          </h1>
          <Link
            to="/collections"
            className="mt-6 inline-block text-[12px] font-bold tracking-[0.22em]"
            style={{ color: BROWN }}
          >
            BACK TO COLLECTION
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const gallery = Array.from(new Set([...product.images, product.detailImg].filter(Boolean)));
  const others = products.filter((p) => p.slug !== product.slug).slice(0, 3);

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
          <Link
            to="/exchange-policy"
            className="inline-block font-bold transition-opacity hover:opacity-70"
            style={{ color: BROWN }}
          >
            Read our full Exchange &amp; Store Credit Policy →
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <AnnouncementBar bg="#7B1113" color="#F7F4EE" />
      <div className="product-page mx-auto w-full max-w-[1440px] min-[1501px]:max-w-[1720px]">
        <nav className="px-8 md:px-16 py-4 text-[11px] font-bold tracking-[0.2em]" style={{ color: BROWN }}>
          <Link to="/collections" className="hover:opacity-70">
            NAQSH-E-NIGĀH
          </Link>
          <span className="px-2">/</span>
          <span style={{ color: DARK }}>{product.name.toUpperCase()}</span>
        </nav>

        <section className="px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-14">
          {/* Gallery */}
          <div className="relative min-w-0">
            <div
              data-gallery-strip
              onScroll={(e) => {
                const el = e.currentTarget;
                const i = Math.round(el.scrollLeft / el.clientWidth);
                if (i !== galleryIdx) setGalleryIdx(i);
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-md:flex max-md:gap-0 max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory no-scrollbar"
            >
              {gallery.map((src, i) => (
                <button
                  key={i}
                  data-gallery-index={i}
                  type="button"
                  aria-label={`Open image ${i + 1} in viewer`}
                  onClick={() => setLightbox(i)}
                  className="group relative block w-full overflow-hidden bg-cream/60 cursor-zoom-in max-md:shrink-0 max-md:snap-center"
                >
                  <StoreImage
                    src={src}
                    alt={product.altText}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
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
            {gallery.length > 1 && (
              <div className="md:hidden pointer-events-none absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                {gallery.map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: i === galleryIdx ? BROWN : "#F7F4EE",
                      opacity: i === galleryIdx ? 1 : 0.85,
                    }}
                  />
                ))}
              </div>
            )}
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
              MRP {priceText}{" "}
              <span className="text-[12px] font-normal" style={{ color: DARK }}>
                inclusive of all taxes
              </span>
            </p>

            <p className="mt-6 font-serif text-[19px] font-bold leading-snug" style={{ color: BROWN }}>
              {product.tagline}
            </p>
            <div className="mt-3 space-y-4 text-[14px] leading-[1.9]" style={{ color: DARK }}>
              {product.description.map((para, i) => {
                const firstCollapsed = i === 0 && !descExpanded;
                const firstName = product.name.split(" ")[0];
                const lower = para.toLowerCase();
                let nameIdx = lower.indexOf(`${firstName.toLowerCase()} shirt is`);
                if (nameIdx < 0) nameIdx = lower.indexOf(`${firstName.toLowerCase()} honours`);
                if (nameIdx < 0 && firstName === "Zameen") nameIdx = para.indexOf("Mulmul,");
                if (firstName === "Sukoon") nameIdx = para.indexOf("WHITE ON WHITE");
                const cut =
                  nameIdx > 0
                    ? para.slice(0, nameIdx).trimEnd()
                    : para.length > 150
                      ? para.slice(0, para.slice(0, 150).lastIndexOf(" ")).trimEnd()
                      : para;
                return (
                  <p key={i} className={i > 0 && !descExpanded ? "max-md:hidden" : undefined}>
                    <span className={firstCollapsed ? "max-md:hidden" : undefined}>{para}</span>
                    {firstCollapsed && (
                      <>
                        <span className="hidden max-md:inline">
                          {cut}{" "}
                          <button
                            type="button"
                            onClick={() => setDescExpanded(true)}
                            className="inline font-bold"
                            style={{ color: BROWN }}
                          >
                            ... more
                          </button>
                        </span>
                      </>
                    )}
                  </p>
                );
              })}
            </div>
            {descExpanded && (
              <button
                type="button"
                onClick={() => setDescExpanded(false)}
                className="mt-1 hidden max-md:block text-[13px] font-bold tracking-wide"
                style={{ color: BROWN }}
              >
                less
              </button>
            )}

            <div className="mt-5 space-y-1.5 text-[14px] leading-[1.7]" style={{ color: DARK }}>
              <p>
                <span className="font-bold">Fabric Colour :</span> {product.fabricColour}
              </p>
              <p>
                <span className="font-bold">Embroidery colour :</span> {product.embroideryColour}
              </p>
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
                    disabled={isSoldOut(s)}
                    title={isSoldOut(s) ? "Sold out" : undefined}
                    onClick={() => setSize(s)}
                    className="py-3 text-[13px] font-bold border transition-colors disabled:opacity-35 disabled:line-through disabled:cursor-not-allowed"
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
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="px-3 py-2"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus size={14} color={BROWN} />
                </button>
                <span className="px-4 text-[14px] font-bold" style={{ color: DARK }}>
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="px-3 py-2"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus size={14} color={BROWN} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-stretch gap-3">
              <button
                type="button"
                aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => toggle(product.slug)}
                className="w-14 flex items-center justify-center border"
                style={{ borderColor: BROWN }}
              >
                <Heart size={18} color={isWished ? "#7B1113" : BROWN} fill={isWished ? "#7B1113" : "none"} />
              </button>
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="flex-1 py-4 text-[12px] font-bold tracking-[0.24em]"
                style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
              >
                ADD TO BAG
              </button>
              <AddToCartDialog
                product={product}
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                onAdded={() => navigate({ to: "/cart" })}
                initialSize={size}
                initialQty={qty}
              />
            </div>

            <div
              className="mt-6 grid grid-cols-3 gap-3 text-[10px] font-bold tracking-[0.14em] text-center"
              style={{ color: BROWN }}
            >
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
                    {open === a.title ? (
                      <Minus size={14} className="shrink-0" />
                    ) : (
                      <Plus size={14} className="shrink-0" />
                    )}
                  </button>
                  {open === a.title && (
                    <div className="pb-5" style={{ color: DARK }}>
                      {a.body}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Shop the Look */}
            <div className="mt-12">
              <p className="text-[12px] font-bold tracking-[0.22em] text-center" style={{ color: BROWN }}>
                ONE SHIRT MANY NOTION
              </p>
              <p className="mt-1 font-serif text-xl md:text-2xl text-center" style={{ color: BROWN }}>
                Wear it your way
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {(product.stylingImages || product.images.slice(0, 3).map((src) => ({ src, label: "", tall: false })))
                  .slice(0, 3)
                  .map((item, i) => (
                    <figure key={i} className="flex flex-col">
                      <StoreImage
                        src={item.src}
                        alt={`${product.name} styled ${item.label || "look"}`}
                        loading="lazy"
                        className={`w-full object-cover object-top bg-cream/60 ${item.tall ? "aspect-[2/3]" : "h-[150px] md:h-[190px]"}`}
                      />
                      {item.label && (
                        <figcaption
                          className="mt-2 text-center text-[12px] font-bold tracking-[0.14em]"
                          style={{ color: BROWN }}
                        >
                          {item.label}
                        </figcaption>
                      )}
                    </figure>
                  ))}
              </div>
            </div>

            {/* Help */}
            <div className="mt-6 p-4 border border-dashed" style={{ borderColor: BROWN }}>
              <p className="font-serif text-xl font-bold" style={{ color: BROWN }}>
                Need any help?
              </p>
              <p className="mt-1 text-[13px]" style={{ color: DARK }}>
                Get in touch. Mon to Sat, 10:00 AM to 6:00 PM IST.
              </p>
              <div
                className="mt-3 flex flex-wrap gap-5 text-[12px] font-bold tracking-[0.16em] max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-5 max-sm:gap-y-4"
                style={{ color: BROWN }}
              >
                <a href={PHONE_TEL} className="flex items-center gap-1.5 hover:opacity-70">
                  <PhoneIcon size={16} /> {PHONE_DISPLAY}
                </a>
                <a
                  href={WHATSAPP_CHAT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:opacity-70"
                >
                  <WhatsAppIcon size={16} /> WHATSAPP
                </a>
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:opacity-70"
                >
                  <GmailIcon size={16} /> E-MAIL
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:opacity-70"
                >
                  <InstagramIcon size={16} /> INSTAGRAM
                </a>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:-mx-8 max-md:px-8 max-md:pb-4 max-md:[scroll-padding-inline:2rem] max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="group relative flex flex-col max-md:w-[72%] max-md:shrink-0 max-md:snap-start"
              >
                <StoreImage
                  src={p.images[0]}
                  alt={p.altText}
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span
                  className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-bold tracking-[0.18em]"
                  style={{ backgroundColor: "#F7F4EE", color: BROWN }}
                >
                  {p.badge || "Hand Dyed & Embroidered"}
                </span>
                <h3 className="mt-4 font-serif text-[18px] font-bold" style={{ color: BROWN }}>
                  {p.name}
                </h3>
                <p className="text-[12px] mt-1 leading-snug" style={{ color: DARK }}>
                  {PRODUCT_SUBTITLE}
                </p>
                <p className="mt-1.5 text-[14px] font-bold" style={{ color: DARK }}>
                  {livePrice(p)}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Looking for a little help? */}
        <section className="px-8 md:px-16 py-10 bg-background border-t" style={{ borderColor: "rgba(75,53,40,0.15)" }}>
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold" style={{ color: BROWN }}>
              Looking for a little help?
            </h2>
            <p className="mt-2 text-[14px]" style={{ color: DARK }}>
              We&rsquo;re here.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center gap-1.5">
                <PhoneIcon size={24} />
                <h3 className="text-[12px] font-bold tracking-[0.14em]" style={{ color: BROWN }}>
                  CALL
                </h3>
                <a href={PHONE_TEL} className="text-[13px] hover:opacity-70" style={{ color: DARK }}>
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <WhatsAppIcon size={24} />
                <h3 className="text-[12px] font-bold tracking-[0.14em]" style={{ color: BROWN }}>
                  WHATSAPP CHAT
                </h3>
                <a
                  href={WHATSAPP_CHAT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] hover:opacity-70"
                  style={{ color: DARK }}
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <GmailIcon size={24} />
                <h3 className="text-[12px] font-bold tracking-[0.14em]" style={{ color: BROWN }}>
                  E-MAIL
                </h3>
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] hover:opacity-70"
                  style={{ color: DARK }}
                >
                  hello@notionsinpattern.com
                </a>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <InstagramIcon size={24} />
                <h3 className="text-[12px] font-bold tracking-[0.14em]" style={{ color: BROWN }}>
                  INSTAGRAM
                </h3>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] hover:opacity-70"
                  style={{ color: DARK }}
                >
                  @notionsinpattern.nipstories
                </a>
              </div>
            </div>

            <p className="mt-5 text-[12px] font-bold tracking-[0.14em]" style={{ color: BROWN }}>
              MON&ndash;SAT · 10:00 AM&ndash;6:00 PM (IST)
            </p>
          </div>

          <div
            className="mt-8 max-w-5xl mx-auto border bg-cream p-6 md:p-8 text-center"
            style={{ borderColor: "rgba(75,53,40,0.2)" }}
          >
            <h3 className="font-serif text-[18px] md:text-[20px] font-bold" style={{ color: BROWN }}>
              A note from founder
            </h3>
            <p className="mt-3 text-[13px] leading-[1.9] max-w-2xl mx-auto" style={{ color: DARK }}>
              We are here to personally help you with everything from orders, sizing, exchanges and returns to
              collaborations, creative partnerships and corporate enquiries.
            </p>
            <p className="mt-3 text-[13px] leading-[1.9] max-w-2xl mx-auto" style={{ color: DARK }}>
              We&rsquo;d love to hear from you and help in any way we can.
            </p>
            <p className="mt-4 font-serif text-[15px] font-bold" style={{ color: BROWN }}>
              &mdash; Notions in Pattern
            </p>
          </div>
        </section>

        {/* Newsletter + Trust */}

        <section className="px-6 py-12 sm:px-8 md:px-16 md:py-16 bg-background border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl leading-[1.15] font-bold text-accent">Get on the list</h2>
            <p className="mt-5 text-[15px] sm:text-base leading-[1.8] text-foreground">
              Be the first to know about new collections,sales, and much more!
            </p>
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-3 max-w-2xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address here"
                className="min-w-0 h-14 px-4 bg-background border border-accent/35 text-[15px] text-foreground outline-none focus:border-accent"
              />
              <Button
                type="button"
                className="h-14 rounded-none px-8 text-[13px] font-bold tracking-normal bg-accent text-background hover:bg-accent/90"
              >
                SIGN ME UP
              </Button>
            </div>
          </div>

          <div className="mt-12 mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-16">
            {[
              {
                icon: <RotateCcw size={40} strokeWidth={1.5} />,
                title: "Easy Exchange / Store Credits",
                text: "Exchange within 7 days of order delivery.",
                terms: "*Terms and condition apply.",
              },
              {
                icon: <Truck size={40} strokeWidth={1.5} />,
                title: "We ship pan India",
                text: "Delivery across India.",
                terms: "",
              },
              {
                icon: <Banknote size={40} strokeWidth={1.5} />,
                title: "Cash on delivery",
                text: "COD available.",
                terms: "",
              },
            ].map((item) => (
              <div key={item.title} className="min-w-0 flex flex-col items-center text-center">
                <div className="h-10 w-10 shrink-0 text-accent">{item.icon}</div>
                <div className="mt-4 w-full min-w-0">
                  <h3 className="font-serif text-[24px] leading-[1.2] font-bold text-accent sm:min-h-[58px] sm:flex sm:items-center sm:justify-center">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.7] text-foreground">
                    {item.text}
                    {item.terms && (
                      <Link
                        to="/exchange-policy"
                        className="mt-1 block text-[12px] leading-[1.6] transition-opacity hover:opacity-70"
                      >
                        {item.terms}
                      </Link>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />

      {chartOpen && <SizeChartModal onClose={() => setChartOpen(false)} />}
      {lightbox !== null &&
        (isMobile ? (
          <MobileProductViewer
            images={gallery}
            index={lightbox}
            alt={product.altText}
            onClose={() => setLightbox(null)}
            onIndex={setLightbox}
          />
        ) : (
          <Lightbox
            images={gallery}
            index={lightbox}
            alt={product.altText}
            onClose={() => setLightbox(null)}
            onIndex={setLightbox}
          />
        ))}
    </div>
  );
}
