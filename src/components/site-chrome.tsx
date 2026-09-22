import { useEffect, useState } from "react";
import { Search, User, ShoppingBag, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import nipLogo from "@/assets/nip_logo.png.asset.json";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useAuth } from "@/lib/auth";

export const BROWN = "#4B3528";
export const DARK = "#2C2119";

const navLinks = [
  { label: "COLLECTION", to: "/collections" },
  { label: "ABOUT", to: "/about-us" },
  { label: "FOUNDER", to: "/founder" },
  { label: "CONTACT", to: "/" },
];

export function Header({
  overlay = false,
  subtleOverlay = false,
}: { overlay?: boolean; subtleOverlay?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  return (
    <header
      className={
        overlay
          ? `fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? "bg-background/95 backdrop-blur-md shadow-sm"
                : subtleOverlay
                  ? "bg-gradient-to-b from-background/25 via-background/10 to-transparent"
                  : "bg-gradient-to-b from-background/85 via-background/50 to-transparent backdrop-blur-[2px]"
            }`
          : "w-full px-4 md:px-8 xl:px-12 py-4 md:py-5 flex items-center justify-between"
      }
      style={{ color: BROWN }}
    >
      <div className="flex min-w-0 items-center gap-3 xl:gap-4">
        <img src={nipLogo.url} alt="Notions in Pattern" className="h-10 w-auto shrink-0 md:h-12 xl:h-14" />
        <div className="hidden lg:flex items-center font-serif font-bold text-base xl:text-xl tracking-[0.18em] leading-none" style={{ color: BROWN }}>
          <span className="border-t-2 border-b-2 py-2.5 px-1" style={{ borderColor: BROWN }}>NOTIONS</span>
          <span className="px-1">IN</span>
          <span className="border-t-2 border-b-2 py-2.5 px-1" style={{ borderColor: BROWN }}>PATTERN</span>
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-[10px] xl:text-[11px] font-bold tracking-[0.2em]">
        {navLinks.map((l) => (
          <Link key={l.label} to={l.to} className="hover:opacity-70 transition-opacity">{l.label}</Link>
        ))}
      </nav>
      <div className="flex items-center gap-4 xl:gap-5 text-[11px] font-bold tracking-[0.18em]">
        <a href="#" aria-label="Search" className="flex items-center gap-1.5"><Search size={16} /> <span className="hidden 2xl:inline">SEARCH</span></a>
        {isLoggedIn ? (
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity uppercase"
          >
            <User size={16} /> <span className="hidden 2xl:inline">{(user?.name || "Account").split(" ")[0]} · LOGOUT</span>
          </button>
        ) : (
          <Link to="/login" search={{ redirect: "/cart" }} className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
            <User size={16} /> <span className="hidden 2xl:inline">ACCOUNT</span>
          </Link>
        )}
        <Link to="/wishlist" className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
          <Heart size={16} color="#7B1113" fill={wishCount > 0 ? "#7B1113" : "none"} /> <span className="hidden 2xl:inline">WISHLIST </span>({wishCount})
        </Link>
        <Link to="/cart" className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
          <ShoppingBag size={16} /> <span className="hidden 2xl:inline">CART </span>({cartCount})
        </Link>
      </div>
    </header>
  );
}

export function AnnouncementBar({ bg = "#7B1113", color = "#F7F4EE" }: { bg?: string; color?: string } = {}) {
  const items = [
    "Handcrafted in India · Made in limited quantities",
    "Naqsh-e-Nigāh · Patterns of the Vision · The inaugural collection by NIP",
    "Naqsh-e-Nigāh · The inaugural collection by NIP is now live · Shop now",
    "Made for the art of slow living",
  ];
  const strip = [...items, ...items];
  return (
    <div className="w-full overflow-hidden border-t border-b border-border/60 py-2" style={{ backgroundColor: bg }}>

      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {strip.map((t, i) => (
              <span
                key={`${k}-${i}`}
                className="px-6 text-[11px] font-bold tracking-[0.24em] whitespace-nowrap"
                style={{ color }}
              >

                {t} <span className="px-3">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const cols = [
    { title: "SHOP", items: [{ label: "Collection", to: "/collections" }, { label: "Cart", to: "/cart" }, { label: "Wishlist", to: "/wishlist" }] },
    { title: "HELP", items: [{ label: "Orders", to: "/orders" }, "Shipping", "Returns", { label: "Privacy Policy", to: "/privacy" }] },
    { title: "ABOUT", items: [{ label: "Our Story", to: "/about-us" }, { label: "Craft", to: "/about-us" }, { label: "Founder", to: "/founder" }] },
    { title: "CONNECT", items: ["Instagram", "Email"] },

  ];
  return (
    <footer className="px-8 md:px-16 py-8 border-t border-border/60" style={{ color: BROWN }}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-start">
        <div className="self-start">
          <img src={nipLogo.url} alt="Notions in Pattern" className="w-36 h-auto" />
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-[12px] font-bold tracking-[0.22em] mb-3" style={{ color: BROWN }}>{c.title}</h4>
            <ul className="space-y-1.5 text-[13px] font-bold" style={{ color: BROWN }}>
              {c.items.map((i) => {
                const label = typeof i === "string" ? i : i.label;
                const to = typeof i === "string" ? undefined : i.to;
                return (
                  <li key={label}>
                    {to ? (
                      <Link to={to} className="hover:opacity-70">{label}</Link>
                    ) : (
                      <a href="#" className="hover:opacity-70">{label}</a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-4 border-t border-border/60 text-center text-[12px] font-bold" style={{ color: BROWN }}>
        © Notions in Pattern. All rights reserved.
      </div>
    </footer>
  );
}
