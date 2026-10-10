import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, X, ShoppingBag, Truck, RotateCcw, Lock, TicketPercent } from "lucide-react";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import { PRODUCT_SUBTITLE } from "@/lib/products";
import { useCart, formatPrice } from "@/lib/cart";

function VisaIcon() {
  return (
    <svg viewBox="0 0 48 16" className="h-4 w-auto" aria-label="Visa">
      <path fill="#1A1F71" d="M17.8 1.4l-3.6 9.8h1.9l.7-2h3.5l.7 2h2L19.2 1.4h-1.4zm.9 1.8l1.2 3.3h-2.4l1.2-3.3zM8.5 1.4L6 11.2h2.1l1.7-7.3 2.1 7.3h2.1l2.7-9.8h-2.1l-1.7 7.3-2-7.3H10l-1.5 7.3L6.8 1.4H8.5zM1.8 1.4L0 11.2h2.1l1.8-9.8H1.8zM42.5 1.4l-1.8 9.8h2.1l1.8-9.8h-2.1zM36.8 1.4c-1.2 0-2 .5-2.4 1.2l3.5 5.5c.1-.7.3-1.4.5-2.1.4-1.3.8-2.5 1.1-3.4-.7-.8-1.6-1.2-2.7-1.2zm-4.1 1.4c-.5-.2-1.2-.4-2-.4-2.3 0-3.9 1.3-3.9 3.1 0 1.3 1.1 2 2 2.4.9.4 1.2.7 1.2 1 0 .6-.7.8-1.4.8-1 0-2-.3-2.6-.6l-.4-.2-.5 1.6c.6.3 1.7.5 2.8.5 2.5 0 4.1-1.2 4.1-3.1 0-1.1-.7-1.8-1.9-2.3-.8-.4-1.3-.6-1.3-1.1 0-.4.4-.7 1.3-.7.8 0 1.5.2 2 .4l.3.1.5-1.5-.2-.1z" />
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 32 20" className="h-5 w-auto" aria-label="Mastercard">
      <circle cx="11" cy="10" r="8" fill="#EB001B" />
      <circle cx="21" cy="10" r="8" fill="#F79E1B" />
      <path d="M16 3.5a8 8 0 0 1 0 13 8 8 0 0 1 0-13z" fill="#FF5F00" />
    </svg>
  );
}

function RuPayIcon() {
  return (
    <svg viewBox="0 0 60 20" className="h-4 w-auto" aria-label="RuPay">
      <text x="0" y="15" fontSize="13" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#1A1F71">RuPay</text>
      <circle cx="52" cy="10" r="5" fill="#F79E1B" />
    </svg>
  );
}

function UpiIcon() {
  return (
    <svg viewBox="0 0 42 20" className="h-4 w-auto" aria-label="UPI">
      <text x="0" y="15" fontSize="13" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#1A1F71">UPI</text>
    </svg>
  );
}

function GPayIcon() {
  return (
    <svg viewBox="0 0 48 20" className="h-4 w-auto" aria-label="Google Pay">
      <text x="16" y="15" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="500" fill="#5F6368">Pay</text>
      <path d="M4.6 10c0-.8.1-1.6.3-2.3h4.6v2.2H7.3c.1.5.4 1 .8 1.3v1.8H6.2C5.2 11.9 4.6 11 4.6 10z" fill="#4285F4" />
      <path d="M9.5 10c0 1.4-.7 2.6-1.8 3.3V11.5c.4-.3.7-.8.8-1.3H6.9V7.7h4.6c.2.7.3 1.5.3 2.3z" fill="#34A853" />
      <path d="M4.9 13.1c-1.1-.7-1.8-1.9-1.8-3.1 0-1.2.7-2.4 1.8-3.1v1.8c-.4.3-.6.8-.6 1.3s.2 1 .6 1.3v1.8z" fill="#FBBC05" />
      <path d="M6.2 4.9c1.2 0 2.3.6 2.9 1.5l1.5-1.5C9.6 3.3 8 2.5 6.2 2.5c-2.2 0-4.1 1.2-5.1 3l1.8 1.4c.5-1.4 1.8-2.4 3.3-2.4z" fill="#EA4335" />
    </svg>
  );
}

function PhonePeIcon() {
  return (
    <svg viewBox="0 0 80 20" className="h-4 w-auto" aria-label="PhonePe">
      <circle cx="10" cy="10" r="8" fill="#5F259F" />
      <path d="M10 4l4 4-4 4-4-4 4-4z" fill="#fff" />
      <text x="22" y="14" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#5F259F">PhonePe</text>
    </svg>
  );
}

function PaytmIcon() {
  return (
    <svg viewBox="0 0 56 20" className="h-4 w-auto" aria-label="Paytm">
      <text x="0" y="15" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#002970">pay</text>
      <text x="26" y="15" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#00BAF2">tm</text>
    </svg>
  );
}

function PaymentIcons() {
  const icons = [
    { id: "visa", Icon: VisaIcon },
    { id: "mastercard", Icon: MastercardIcon },
    { id: "rupay", Icon: RuPayIcon },
    { id: "upi", Icon: UpiIcon },
    { id: "gpay", Icon: GPayIcon },
    { id: "phonepe", Icon: PhonePeIcon },
    { id: "paytm", Icon: PaytmIcon },
  ];
  return (
    <div className="mt-6 pt-5 border-t" style={{ borderColor: BROWN }}>
      <p className="text-[10px] font-bold tracking-[0.18em] mb-3" style={{ color: BROWN }}>WE ACCEPT</p>
      <div className="flex flex-wrap items-center gap-4">
        {icons.map(({ id, Icon }) => (
          <div key={id} className="flex items-center justify-center h-8 px-2 rounded bg-background/80 border border-border/60">
            <Icon />
          </div>
        ))}
      </div>
    </div>
  );
}

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
  const navigate = useNavigate();

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
      <Header solid solidInk="#E5D9C5" />
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

              <div className="mb-6">
                <label
                  htmlFor="coupon"
                  className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em]"
                  style={{ color: BROWN }}
                >
                  <TicketPercent size={14} /> DISCOUNT COUPON
                </label>
                <div className="mt-3 flex">
                  <input
                    id="coupon"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 h-11 px-3 bg-background border text-[13px] outline-none"
                    style={{ borderColor: BROWN, color: DARK }}
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="h-11 px-5 text-[11px] font-bold tracking-[0.18em]"
                    style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
                  >
                    APPLY
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-[11px]" style={{ color: "#7B1113" }}>
                    {error}
                  </p>
                )}
                {applied && (
                  <p className="mt-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.14em]" style={{ color: BROWN }}>
                    {applied.code} APPLIED · {applied.label}
                    <button
                      type="button"
                      onClick={() => setApplied(null)}
                      className="inline-flex items-center gap-1 hover:opacity-70"
                      style={{ color: DARK }}
                    >
                      <X size={11} /> REMOVE
                    </button>
                  </p>
                )}
              </div>

              <dl className="space-y-3 text-[14px]" style={{ color: DARK }}>
                <div className="flex justify-between">
                  <dt>Subtotal ({count} {count === 1 ? "item" : "items"})</dt>
                  <dd className="font-bold">{formatPrice(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <dt>Discount ({applied?.code})</dt>
                    <dd className="font-bold">&minus;{formatPrice(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt>GST (12%)</dt>
                  <dd className="font-bold">{formatPrice(gst)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping charges</dt>
                  <dd className="font-bold" style={{ color: DARK }}>Calculated at Checkout</dd>
                </div>
              </dl>

              <div
                className="flex justify-between mt-6 pt-4 border-t text-[16px] font-bold"
                style={{ borderColor: BROWN, color: BROWN }}
              >
                <span>Estimated Total</span>
                <span>{formatPrice(taxable + gst)}</span>
              </div>
              <p className="mt-2 text-[11px]" style={{ color: DARK }}>
                Shipping will be calculated at checkout. Free shipping pan India on orders above ₹1,000.
              </p>

              <button
                type="button"
                onClick={() => navigate({ to: "/orders" })}
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

              <PaymentIcons />
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
