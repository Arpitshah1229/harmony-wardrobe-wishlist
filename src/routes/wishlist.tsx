import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Header, Footer, BROWN, DARK } from "@/components/site-chrome";
import { products, PRODUCT_SUBTITLE } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";
import { AddToCartDialog } from "@/components/add-to-cart-dialog";

function BrokenHeart({ className, color }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 55.5S9.5 40.5 9.5 23.75C9.5 15.06 16.56 8 25.25 8c4.56 0 8.65 2.03 11.44 5.23C39.42 10.03 43.52 8 47.75 8 56.44 8 63.5 15.06 63.5 23.75c0 16.75-22.5 31.75-31.5 31.75Z"
        stroke={color || "currentColor"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 14L28 24L36 30L32 38"
        stroke={color || "currentColor"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({
    meta: [
      { title: "Your Wishlist | Notions in Pattern" },
      {
        name: "description",
        content:
          "Saved chikankari shirts from the Naqsh-e-Nigāh collection by Notions in Pattern. Keep your favourite hand-embroidered pieces in one place.",
      },
      { property: "og:title", content: "Your Wishlist | Notions in Pattern" },
      { property: "og:description", content: "Your saved hand-embroidered chikankari pieces." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function WishlistPage() {
  const { slugs, remove } = useWishlist();
  const saved = products.filter((p) => slugs.includes(p.slug));
  const [dialogProduct, setDialogProduct] = useState<typeof products[number] | null>(null);

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="px-8 md:px-16 py-14">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-center flex items-center justify-center gap-3" style={{ color: BROWN }}>
          Your Wishlist
          <svg viewBox="0 0 24 24" fill="#7B1113" className="h-6 w-6 md:h-8 md:w-8 mt-1" aria-hidden="true">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </h1>
        <span className="block w-16 border-t-2 mx-auto mt-5 mb-12" style={{ borderColor: BROWN }} />

        {saved.length === 0 ? (
          <div className="text-center py-16">
            <BrokenHeart className="mx-auto mb-6 h-20 w-20" color="#7B1113" />
            <p className="text-[15px] mb-8" style={{ color: DARK }}>
              You haven't saved any pieces yet.
            </p>
            <Link
              to="/collections"
              className="inline-block px-8 py-3.5 text-[11px] font-bold tracking-[0.22em]"
              style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
            >
              EXPLORE THE COLLECTION
            </Link>
          </div>
        ) : (
          <section className="flex flex-wrap justify-center gap-x-6 gap-y-12">
            {saved.map((p) => (
              <article key={p.slug} className="group flex flex-col w-[calc(50%-12px)] md:w-[calc(25%-18px)]">
                <div className="relative overflow-hidden bg-cream/60">
                  <Link to="/product/$slug" params={{ slug: p.slug }} className="block">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </Link>
                  <button
                    type="button"
                    aria-label={`Remove ${p.name} from wishlist`}
                    onClick={() => remove(p.slug)}
                    className="absolute top-3 right-3 h-9 w-9 rounded-full grid place-items-center shadow-sm transition-transform hover:scale-110"
                    style={{ backgroundColor: "#F7F4EE", color: BROWN }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-serif text-[19px] font-bold leading-snug truncate" style={{ color: BROWN }}>
                      <Link to="/product/$slug" params={{ slug: p.slug }} className="hover:opacity-70">
                        {p.name}
                      </Link>
                    </h3>
                    <p className="text-[11px] mt-1 leading-snug" style={{ color: DARK }}>
                      {PRODUCT_SUBTITLE}
                    </p>
                  </div>
                  <p className="shrink-0 text-[15px] font-bold" style={{ color: DARK }}>
                    {p.price}
                  </p>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setDialogProduct(p)}
                    className="w-full py-3.5 text-[11px] font-bold tracking-[0.22em]"
                    style={{ backgroundColor: BROWN, color: "#F7F4EE" }}
                  >
                    ADD TO CART
                  </button>
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    className="w-full py-3.5 text-center text-[11px] font-bold tracking-[0.22em] border"
                    style={{ borderColor: BROWN, color: BROWN }}
                  >
                    VIEW PRODUCT
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      {dialogProduct && (
        <AddToCartDialog
          product={dialogProduct}
          open={!!dialogProduct}
          onClose={() => setDialogProduct(null)}
        />
      )}

      <Footer />
    </div>
  );
}
