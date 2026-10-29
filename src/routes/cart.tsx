import { StoreImage } from "@/components/store-image";
import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, X, Truck, RotateCcw, Lock, TicketPercent } from "lucide-react";
import { BagIcon } from "@/components/bag-icon";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import { PRODUCT_SUBTITLE } from "@/lib/products";
import { useCart, formatPrice } from "@/lib/cart";
import { createCheckout } from "@/lib/shopify";

import visaLogo from "@/assets/pay-visa.svg.asset.json";
import mastercardLogo from "@/assets/pay-mastercard.svg.asset.json";
import rupayLogo from "@/assets/pay-rupay-trim.png.asset.json";
import upiLogo from "@/assets/pay-upi.svg.asset.json";
import gpayLogo from "@/assets/pay-gpay.svg.asset.json";
import phonepeLogo from "@/assets/pay-phonepe.svg.asset.json";
import paytmLogo from "@/assets/pay-paytm.svg.asset.json";

const PAYMENT_LOGOS = [
  { id: "visa", name: "Visa", src: visaLogo.url, h: "h-4" },
  { id: "mastercard", name: "Mastercard", src: mastercardLogo.url, h: "h-6" },
  { id: "rupay", name: "RuPay", src: rupayLogo.url, h: "h-5" },
  { id: "upi", name: "UPI", src: upiLogo.url, h: "h-5" },
  { id: "gpay", name: "Google Pay", src: gpayLogo.url, h: "h-5" },
  { id: "phonepe", name: "PhonePe", src: phonepeLogo.url, h: "h-5" },
  { id: "paytm", name: "Paytm", src: paytmLogo.url, h: "h-4" },
];

function PaymentIcons() {
  return (
    <div className="mt-6 pt-5 border-t" style={{ borderColor: BROWN }}>
      <p className="text-[10px] font-bold tracking-[0.18em] mb-3" style={{ color: BROWN }}>WE ACCEPT</p>
      <div className="flex flex-wrap items-center gap-3">
        {PAYMENT_LOGOS.map(({ id, name, src, h }) => (
          <div key={id} className="flex h-10 w-[84px] items-center justify-center rounded border border-border/60 bg-background px-2">
            <StoreImage src={src} alt={name} title={name} loading="lazy" className={`${h} w-auto max-w-full object-contain`} />
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
          "Review the hand-embroidered chikankari pieces in your cart and continue to checkout. Prices include all taxes; we ship pan India.",
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
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const goToCheckout = async () => {
    setCheckoutError("");
    setCheckingOut(true);
    const win = window.open("", "_blank");
    try {
      const url = await createCheckout(items, applied ? [applied.code] : []);
      if (win) win.location.href = url;
      else window.location.href = url;
    } catch (e) {
      win?.close();
      setCheckoutError(e instanceof Error ? e.message : "Checkout is unavailable right now. Please try again.");
    } finally {
      setCheckingOut(false);
    }
  };

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

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-8 md:px-16 py-12">
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
            <div className="flex justify-center"><BagIcon size={64} color={BROWN} detail="fine" /></div>
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
                        <StoreImage
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
                  <dt>Taxes</dt>
                  <dd className="font-bold">Included</dd>
                </div>
                <div className="flex items-start justify-between gap-3 max-md:flex-col max-md:items-stretch max-md:gap-1">
                  <dt className="min-w-0">Shipping charges</dt>
                  <dd className="font-bold max-md:text-right" style={{ color: DARK }}>
                    Calculated at Checkout
                  </dd>
                </div>
              </dl>

              <div
                className="flex justify-between mt-6 pt-4 border-t text-[16px] font-bold"
                style={{ borderColor: BROWN, color: BROWN }}
              >
                <span>Estimated Total</span>
                <span>{formatPrice(taxable)}</span>
              </div>
              <p className="mt-2 text-[11px]" style={{ color: DARK }}>
                Inclusive of all taxes. Shipping calculated at checkout.
              </p>

              <button
                type="button"
                onClick={goToCheckout}
                disabled={checkingOut || items.length === 0}
                className="mt-8 w-full py-4 text-[12px] font-bold tracking-[0.24em] disabled:opacity-60"
                style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
              >
                {checkingOut ? "OPENING CHECKOUT…" : "PROCEED TO CHECKOUT"}
              </button>
              {checkoutError && (
                <p className="mt-2 text-[12px] font-bold" style={{ color: "#C43D32" }}>{checkoutError}</p>
              )}
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-[0.18em]" style={{ color: DARK }}>
                <Lock size={12} /> SECURE CHECKOUT
              </p>

              <ul className="mt-8 space-y-3 text-[11px] font-bold tracking-[0.16em]" style={{ color: BROWN }}>
                <li className="flex items-center gap-2"><Truck size={14} /> WE SHIP PAN INDIA</li>
                <li className="flex items-center gap-2"><RotateCcw size={14} /> EASY 15-DAY EXCHANGE / STORE CREDITS</li>
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
