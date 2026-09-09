import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { Header, Footer, BROWN, DARK } from "@/components/site-chrome";
import { products, PRODUCT_SUBTITLE } from "@/lib/products";
import { useWishlist } from "@/lib/wishlist";
import { AddToCartDialog } from "@/components/add-to-cart-dialog";

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

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="px-8 md:px-16 py-14">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-center" style={{ color: BROWN }}>
          Your Wishlist
        </h1>
        <span className="block w-16 border-t-2 mx-auto mt-5 mb-12" style={{ borderColor: BROWN }} />

        {saved.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={40} className="mx-auto mb-6" style={{ color: "#7B1113" }} />
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
              </article>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
