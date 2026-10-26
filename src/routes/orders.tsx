import { StoreImage } from "@/components/store-image";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Download,
  Package,
  Star,
  Truck,
} from "lucide-react";
import { Header, Footer, AnnouncementBar, BROWN, DARK, GMAIL_COMPOSE_URL } from "@/components/site-chrome";
import { products, PRODUCT_SUBTITLE } from "@/lib/products";
import { useCart, formatPrice, parsePrice } from "@/lib/cart";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
  head: () => ({
    meta: [
      { title: "Order Details | Notions in Pattern" },
      {
        name: "description",
        content:
          "Track your Notions in Pattern order — delivery status, price breakdown, and payment details for your hand-embroidered chikankari shirts.",
      },
      { property: "og:title", content: "Order Details | Notions in Pattern" },
      {
        property: "og:description",
        content: "View the status and details of your Notions in Pattern order.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const GST_RATE = 0.12;

const DELIVERY_ADDRESS = {
  name: "Neha Prasad",
  phone: "+91 75218 02791",
  address:
    "Rita Sharma, Locksley Hall, near Laxmi Kuti, Mallital, Nainital, Uttarakhand — 263002",
  email: "hello@notionsinpattern.com",
};

function OrdersPage() {
  const { items, count, subtotal } = useCart();

  // Demo order: cart items if present, otherwise a sample of two pieces
  const orderItems =
    items.length > 0
      ? items
      : products.slice(0, 2).map((p) => ({
          slug: p.slug,
          name: p.name,
          size: "M",
          qty: 1,
          price: parsePrice(p.price),
          image: p.images[0],
        }));

  const orderCount = items.length > 0 ? count : orderItems.reduce((s, i) => s + i.qty, 0);
  const orderSubtotal = items.length > 0 ? subtotal : orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const gst = Math.round(orderSubtotal * GST_RATE);
  const shipping = orderSubtotal - 0 > 1000 ? 0 : 120;
  const total = orderSubtotal + gst + shipping;

  const orderId = "# NIP2026 50754825687703";
  const delivered = "8th Jun 2026 · 9:15 PM";

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <AnnouncementBar bg="#7B1113" color="#F7F4EE" />

      <main className="flex-1 px-6 md:px-16 py-12 max-w-4xl mx-auto w-full">
        <nav className="text-[11px] font-bold tracking-[0.2em] mb-8" style={{ color: DARK }}>
          <Link to="/" className="hover:opacity-70">HOME</Link>
          <span className="px-2">/</span>
          <span style={{ color: BROWN }}>ORDER DETAILS</span>
        </nav>

        <h1 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: BROWN }}>
          Order Details
        </h1>
        <span className="block w-16 border-t-2 mt-5 mb-10" style={{ borderColor: BROWN }} />

        {/* Order header card */}
        <section className="border border-border/60 bg-background p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <StoreImage
              src={orderItems[0]?.image}
              alt={orderItems[0]?.name}
              className="w-24 h-32 object-cover rounded-sm"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-serif text-2xl font-bold" style={{ color: BROWN }}>
                {orderItems[0]?.name}
              </h2>
              <p className="text-[13px] mt-1" style={{ color: DARK }}>
                {PRODUCT_SUBTITLE}
              </p>
              <p className="text-[12px] mt-2" style={{ color: DARK }}>
                Size: {orderItems[0]?.size} · Quantity: {orderItems[0]?.qty}
              </p>
              <p className="text-[11px] tracking-[0.14em] mt-1" style={{ color: DARK }}>
                ORDER ID : {orderId}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-border/60 flex flex-wrap items-center gap-3">
            <CheckCircle2 size={22} color="#3E7A44" />
            <div>
              <p className="text-[12px] font-bold tracking-[0.16em]" style={{ color: DARK }}>
                ORDER DELIVERED ON
              </p>
              <p className="font-serif text-lg font-bold" style={{ color: "#3E7A44" }}>
                {delivered}
              </p>
            </div>
            {orderItems.length > 1 && (
              <span
                className="ml-auto text-[11px] font-bold tracking-[0.14em] px-3 py-1.5 border"
                style={{ color: BROWN, borderColor: BROWN }}
              >
                +{orderItems.length - 1} MORE {orderItems.length - 1 === 1 ? "ITEM" : "ITEMS"} IN THIS ORDER
              </span>
            )}
          </div>
        </section>

        {/* Rate product */}
        <section className="mt-6 border border-border/60 bg-background p-6 md:p-8">
          <h3 className="text-[12px] font-bold tracking-[0.18em]" style={{ color: BROWN }}>
            RATE THIS PRODUCT
          </h3>
          <div className="flex gap-1.5 mt-3" aria-label="Rate this product">
            {Array.from({ length: 5 }).map((_, i) => (
              <button key={i} type="button" className="hover:scale-110 transition-transform" aria-label={`${i + 1} star`}>
                <Star size={22} color={BROWN} strokeWidth={1.4} />
              </button>
            ))}
          </div>
        </section>

        {/* Items in this order */}
        <section className="mt-6 border border-border/60 bg-background p-6 md:p-8">
          <h3 className="text-[12px] font-bold tracking-[0.18em] mb-5" style={{ color: BROWN }}>
            ITEMS IN THIS DELIVERY ({orderCount})
          </h3>
          <ul className="space-y-5">
            {orderItems.map((item) => (
              <li key={`${item.slug}-${item.size}`} className="flex items-center gap-4 pb-5 border-b border-border/40 last:border-0 last:pb-0">
                <Link to="/product/$slug" params={{ slug: item.slug }} className="shrink-0">
                  <StoreImage src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-sm" loading="lazy" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-[16px] font-bold" style={{ color: BROWN }}>
                    {item.name}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: DARK }}>
                    Size: {item.size} · Qty: {item.qty}
                  </p>
                </div>
                <p className="text-[14px] font-bold" style={{ color: DARK }}>
                  {formatPrice(item.price * item.qty)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Delivery to */}
        <section className="mt-6 border border-border/60 bg-background p-6 md:p-8">
          <h3 className="text-[12px] font-bold tracking-[0.18em] mb-5 flex items-center gap-2" style={{ color: BROWN }}>
            <Package size={15} /> DELIVERY TO
          </h3>
          <div className="space-y-4 text-[13px] leading-relaxed" style={{ color: DARK }}>
            <p className="font-bold text-[15px]" style={{ color: BROWN }}>
              {DELIVERY_ADDRESS.name}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={14} color={BROWN} /> {DELIVERY_ADDRESS.phone}
            </p>
            <p className="flex items-start gap-2">
              <MapPin size={14} color={BROWN} className="mt-1 shrink-0" />
              {DELIVERY_ADDRESS.address}
            </p>
          </div>
        </section>

        {/* Price breakdown + payment */}
        <section className="mt-6 border border-border/60 bg-background p-6 md:p-8">
          <h3 className="text-[12px] font-bold tracking-[0.18em] mb-5" style={{ color: BROWN }}>
            PRICE BREAKDOWN
          </h3>
          <dl className="space-y-3 text-[14px]" style={{ color: DARK }}>
            <div className="flex justify-between">
              <dt>Item total</dt>
              <dd className="font-bold">{formatPrice(orderSubtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>GST (12%)</dt>
              <dd className="font-bold">{formatPrice(gst)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping charges</dt>
              <dd className="font-bold">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
          </dl>
          <div
            className="flex justify-between mt-5 pt-4 border-t text-[16px] font-bold"
            style={{ borderColor: BROWN, color: BROWN }}
          >
            <span>Total amount</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p className="mt-4 flex items-center gap-2 text-[12px] font-bold" style={{ color: "#3E7A44" }}>
            <Truck size={14} /> Shipping free on orders above ₹1,000
          </p>

          <div className="mt-6 pt-5 border-t border-border/60">
            <h4 className="text-[11px] font-bold tracking-[0.18em] mb-2" style={{ color: BROWN }}>
              PAYMENT STATUS
            </h4>
            <p className="flex items-center gap-2 text-[13px]" style={{ color: DARK }}>
              <CheckCircle2 size={14} color="#3E7A44" /> Paid via UPI
            </p>
            <button
              type="button"
              className="mt-5 w-full py-3.5 text-[11px] font-bold tracking-[0.24em] border flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
              style={{ borderColor: BROWN, color: BROWN }}
            >
              <Download size={14} /> DOWNLOAD INVOICE
            </button>
          </div>
        </section>

        {/* Updates sent to */}
        <section className="mt-6 border border-border/60 bg-background p-6 md:p-8">
          <h3 className="text-[12px] font-bold tracking-[0.18em] mb-4 flex items-center gap-2" style={{ color: BROWN }}>
            <Mail size={15} /> UPDATES SENT TO
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 text-[13px]" style={{ color: DARK }}>
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em]" style={{ color: BROWN }}>CALL</p>
              <p className="mt-1">{DELIVERY_ADDRESS.phone}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em]" style={{ color: BROWN }}>EMAIL</p>
              <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noreferrer" className="mt-1 inline-block hover:opacity-70">{DELIVERY_ADDRESS.email}</a>
            </div>
          </div>
        </section>

        {/* Order meta */}
        <section className="mt-6 border border-border/60 bg-background p-6 md:p-8">
          <h3 className="text-[12px] font-bold tracking-[0.18em] mb-4" style={{ color: BROWN }}>
            ORDER INFORMATION
          </h3>
          <dl className="grid sm:grid-cols-2 gap-4 text-[13px]" style={{ color: DARK }}>
            <div>
              <dt className="text-[10px] font-bold tracking-[0.16em]" style={{ color: BROWN }}>ORDERED ON</dt>
              <dd className="mt-1">02 Jun 2026</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold tracking-[0.16em]" style={{ color: BROWN }}>ORDER ID</dt>
              <dd className="mt-1">{orderId}</dd>
            </div>
          </dl>
        </section>

        <Link
          to="/collections"
          className="inline-block mt-10 text-[11px] font-bold tracking-[0.22em] border-b pb-1 hover:opacity-70"
          style={{ color: BROWN, borderColor: BROWN }}
        >
          CONTINUE SHOPPING
        </Link>
      </main>

      <Footer />
    </div>
  );
}
