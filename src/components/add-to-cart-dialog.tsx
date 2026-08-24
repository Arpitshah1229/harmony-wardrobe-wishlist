import { useEffect, useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { BROWN, DARK } from "@/components/site-chrome";
import { SIZES, type Product } from "@/lib/products";
import { useCart, parsePrice, formatPrice } from "@/lib/cart";

type Props = {
  product: Product;
  open: boolean;
  onClose: () => void;
  onAdded?: () => void;
  initialSize?: string | null;
  initialQty?: number;
};

export function AddToCartDialog({
  product,
  open,
  onClose,
  onAdded,
  initialSize = null,
  initialQty = 1,
}: Props) {
  const { items, addItem, setQty: setCartQty } = useCart();
  const [size, setSize] = useState<string | null>(initialSize);
  const [qty, setQty] = useState(initialQty);
  const [error, setError] = useState<string | null>(null);
  const [dupe, setDupe] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSize(initialSize);
      setQty(initialQty);
      setError(null);
      setDupe(null);
    }
  }, [open, initialSize, initialQty]);

  if (!open) return null;

  const existing = (s: string) => items.find((i) => i.slug === product.slug && i.size === s);

  const commit = (s: string, q: number, mode: "add" | "replace") => {
    const inCart = existing(s);
    if (inCart && mode === "replace") setCartQty(product.slug, s, q);
    else
      addItem({
        slug: product.slug,
        name: product.name,
        price: parsePrice(product.price),
        image: product.images[0],
        size: s,
        qty: q,
      });
    onClose();
    onAdded?.();
  };

  const handleAdd = () => {
    if (!size) {
      setError("Please select a size.");
      return;
    }
    if (existing(size)) {
      setDupe(size);
      return;
    }
    commit(size, qty, "add");
  };

  const dupeItem = dupe ? existing(dupe) : undefined;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />
      <div
        className="relative w-full max-w-md p-7"
        style={{ backgroundColor: "#F7F4EE" }}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <X size={18} color={BROWN} />
        </button>

        <div className="flex items-center gap-4">
          <img src={product.images[0]} alt={product.name} className="h-20 w-16 object-cover" />
          <div>
            <h2 className="font-serif text-[22px] font-bold leading-snug" style={{ color: BROWN }}>
              {product.name}
            </h2>
            <p className="text-[13px] font-bold" style={{ color: DARK }}>
              {product.price}
            </p>
          </div>
        </div>

        {dupeItem ? (
          <div className="mt-6">
            <p className="text-[14px] leading-[1.8]" style={{ color: DARK }}>
              This shirt is already in your cart in size <strong>{dupe}</strong> (qty{" "}
              {dupeItem.qty}). Would you like to add to that size, or choose a different size?
            </p>
            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={() => commit(dupe!, dupeItem.qty + qty, "replace")}
                className="w-full py-3.5 text-[11px] font-bold tracking-[0.22em]"
                style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
              >
                ADD {qty} MORE IN SIZE {dupe}
              </button>
              <button
                type="button"
                onClick={() => setDupe(null)}
                className="w-full border py-3.5 text-[11px] font-bold tracking-[0.22em]"
                style={{ borderColor: BROWN, color: BROWN }}
              >
                CHOOSE A DIFFERENT SIZE
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6">
              <p className="text-[12px] font-bold tracking-[0.18em]" style={{ color: BROWN }}>
                SELECT SIZE
              </p>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {SIZES.map((s) => {
                  const inCart = existing(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setSize(s);
                        setError(null);
                      }}
                      className="relative py-3 text-[13px] font-bold border transition-colors"
                      style={
                        size === s
                          ? { backgroundColor: BROWN, color: "#F7F4EE", borderColor: BROWN }
                          : { color: DARK, borderColor: "rgba(75,53,40,0.35)" }
                      }
                    >
                      {s}
                      {inCart && (
                        <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full text-[9px] font-bold grid place-items-center" style={{ backgroundColor: "#C43D32", color: "#F7F4EE" }}>
                          {inCart.qty}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {error && (
                <p className="mt-2 text-[12px] font-bold" style={{ color: "#C43D32" }}>
                  {error}
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <p className="text-[12px] font-bold tracking-[0.18em]" style={{ color: BROWN }}>
                QUANTITY
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
              <span className="ml-auto text-[13px] font-bold" style={{ color: DARK }}>
                {formatPrice(parsePrice(product.price) * qty)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="mt-7 w-full py-4 text-[11px] font-bold tracking-[0.24em]"
              style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
            >
              ADD TO CART
            </button>
          </>
        )}
      </div>
    </div>
  );
}
