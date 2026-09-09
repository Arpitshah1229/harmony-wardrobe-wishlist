import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag, Truck, RotateCcw, Lock, TicketPercent } from "lucide-react";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import { PRODUCT_SUBTITLE } from "@/lib/products";
import { useCart, formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your Cart | Notions in Pattern" },
      {
        name: "description",
        content:
          "Review the hand-embroidered chikankari pieces in your cart and continue to checkout. Free shipping pan India on orders above ₹1,000.",
      },
      { property: "og:title", content: "Your Cart | Notions in Pattern" },
      {
        property: "og:description",
        content: "Review your selection of hand-dyed, hand-embroidered chikankari shirts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const COUPONS: Record<string, { type: "percent" | "flat"; value: number; label: string }> = {
  NIP10: { type: "percent", value: 10, label: "10% off" },
  WELCOME500: { type: "flat", value: 500, label: "₹500 off" },
  FREESHIP: { type: "flat", value: 0, label: "Free shipping" },
};

const GST_RATE = 0.12;

function CartPage() {
  const { items, count, subtotal, setQty, removeItem } = useCart();

  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<{ code: string; label: string; amount: number; freeShip: boolean } | null>(null);
  const [error, setError] = useState("");

  const applyCoupon = () => {
    const key = code.trim().toUpperCase();
    const coupon = COUPONS[key];
    if (!coupon) {
      setApplied(null);
      setError("This coupon code isn't valid.");
      return;
    }
    const amount =
      coupon.type === "percent" ? Math.round((subtotal * coupon.value) / 100) : Math.min(coupon.value, subtotal);
    setApplied({ code: key, label: coupon.label, amount, freeShip: key === "FREESHIP" });
    setError("");
  };

  const discount = applied ? Math.min(applied.amount, subtotal) : 0;
  const taxable = subtotal - discount;
  const shipping = applied?.freeShip || taxable > 1000 || subtotal === 0 ? 0 : 120;
  const gst = Math.round(taxable * GST_RATE);
  const total = taxable + gst + shipping;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <AnnouncementBar bg="#7B1113" color="#F7F4EE" />

      <main className="flex-1 px-8 md:px-16 py-12">
        <nav className="text-[11px] font-bold tracking-[0.2em] mb-8" style={{ color: DARK }}>
          <Link to="/" className="hover:opacity-70">HOME</Link>
          <span className="px-2">/</span>
          <Link to="/collections" className="hover:opacity-70">COLLECTION</Link>
          <span className="px-2">/</span>
          <span style={{ color: BROWN }}>CART</span>
        </nav>

        <h1 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: BROWN }}>
          Your Cart
        </h1>
        <span className="block w-16 border-t-2 mt-5 mb-10" style={{ borderColor: BROWN }} />

        {count === 0 ? (
          <div className="max-w-md mx-auto text-center py-16">
            <ShoppingBag size={40} strokeWidth={1.2} color={BROWN} className="mx-auto" />
            <p className="font-serif text-2xl mt-6" style={{ color: BROWN }}>
              Your cart is empty
            </p>
            <p className="text-[14px] mt-3 leading-relaxed" style={{ color: DARK }}>
              Explore Naqsh-e-Nigāh, our inaugural collection of hand-dyed, hand-embroidered shirts.
            </p>
            <Link
              to="/collections"
              className="inline-block mt-8 px-10 py-4 text-[11px] font-bold tracking-[0.24em]"
              style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
            >
              SHOP THE COLLECTION
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-12">
            <section>
              <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-6 pb-3 border-b text-[11px] font-bold tracking-[0.2em]" style={{ borderColor: BROWN, color: BROWN }}>
                <span>PRODUCT</span>
                <span>QUANTITY</span>
                <span className="text-right">TOTAL</span>
              </div>

              <ul>
                {items.map((item) => (
                  <li
                    key={`${item.slug}-${item.size}`}
                    className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_auto] gap-6 py-6 border-b border-border/60 items-start"
                  >
                    <div className="flex gap-4 min-w-0 col-span-2 md:col-span-1">
                      <Link to="/product/$slug" params={{ slug: item.slug }} className="shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-32 object-cover"
                          loading="lazy"
                        />
                      </Link>
                      <div className="min-w-0">
                        <h2 className="font-serif text-[19px] font-bold leading-snug" style={{ color: BROWN }}>
                          <Link to="/product/$slug" params={{ slug: item.slug }} className="hover:opacity-70">
                            {item.name}
                          </Link>
                        </h2>
                        <p className="text-[11px] mt-1 leading-snug" style={{ color: DARK }}>
                          {PRODUCT_SUBTITLE}
                        </p>
                        <p className="text-[11px] font-bold tracking-[0.18em] mt-2" style={{ color: BROWN }}>
                          SIZE: {item.size}
                        </p>
                        <p className="text-[14px] font-bold mt-2" style={{ color: DARK }}>
                          {formatPrice(item.price)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug, item.size)}
                          className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold tracking-[0.18em] hover:opacity-70"
                          style={{ color: DARK }}
                        >
                          <X size={12} /> REMOVE
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center border h-11 w-fit" style={{ borderColor: BROWN }}>
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="px-3 py-2"
                        onClick={() => setQty(item.slug, item.size, item.qty - 1)}
                      >
                        <Minus size={14} color={BROWN} />
                      </button>
                      <span className="px-4 text-[14px] font-bold" style={{ color: DARK }}>
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.name}`}
                        className="px-3 py-2"
                        onClick={() => setQty(item.slug, item.size, item.qty + 1)}
                      >
                        <Plus size={14} color={BROWN} />
                      </button>
                    </div>

                    <p className="text-[15px] font-bold md:text-right" style={{ color: DARK }}>
                      {formatPrice(item.price * item.qty)}
                    </p>
                  </li>
                ))}
              </ul>

              <Link
                to="/collections"
                className="inline-block mt-8 text-[11px] font-bold tracking-[0.22em] border-b pb-1 hover:opacity-70"
                style={{ color: BROWN, borderColor: BROWN }}
              >
                CONTINUE SHOPPING
              </Link>
            </section>

            <aside className="h-fit p-8" style={{ backgroundColor: "var(--cream)" }}>
              <h2 className="font-serif text-2xl font-bold" style={{ color: BROWN }}>
                Order Summary
              </h2>
              <span className="block w-10 border-t mt-4 mb-6" style={{ borderColor: BROWN }} />

              <dl className="space-y-3 text-[14px]" style={{ color: DARK }}>
                <div className="flex justify-between">
                  <dt>Subtotal ({count} {count === 1 ? "item" : "items"})</dt>
                  <dd className="font-bold">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="font-bold">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                </div>
              </dl>

              <div
                className="flex justify-between mt-6 pt-4 border-t text-[16px] font-bold"
                style={{ borderColor: BROWN, color: BROWN }}
              >
                <span>Total</span>
                <span>{formatPrice(subtotal + shipping)}</span>
              </div>

              <button
                type="button"
                className="mt-8 w-full py-4 text-[12px] font-bold tracking-[0.24em]"
                style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
              >
                PROCEED TO CHECKOUT
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-[0.18em]" style={{ color: DARK }}>
                <Lock size={12} /> SECURE CHECKOUT
              </p>

              <ul className="mt-8 space-y-3 text-[11px] font-bold tracking-[0.16em]" style={{ color: BROWN }}>
                <li className="flex items-center gap-2"><Truck size={14} /> WE SHIP PAN INDIA</li>
                <li className="flex items-center gap-2"><RotateCcw size={14} /> EASY 15 DAY RETURNS</li>
              </ul>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
