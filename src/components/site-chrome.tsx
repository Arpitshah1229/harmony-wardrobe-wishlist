import { useEffect, useState } from "react";
import { Search, User, ShoppingBag, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import nipLogo from "@/assets/nip_logo.png.asset.json";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

export const BROWN = "#4B3528";
export const DARK = "#2C2119";

const navLinks = [
  { label: "COLLECTION", to: "/collections" },
  { label: "ABOUT", to: "/" },
  { label: "FOUNDER", to: "/founder" },
  { label: "CONTACT", to: "/" },
];

export function Header({ overlay = false }: { overlay?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const { count: cartCount } = useCart();

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
                : "bg-gradient-to-b from-background/85 via-background/50 to-transparent backdrop-blur-[2px]"
            }`
          : "w-full px-8 md:px-12 py-5 flex items-center justify-between"
      }
      style={{ color: BROWN }}
    >
      <div className="flex min-w-0 items-center gap-4">
        <img src={nipLogo.url} alt="Notions in Pattern" className="h-14 w-auto shrink-0" />
        <div className="hidden sm:flex items-center font-serif font-bold text-lg md:text-xl tracking-[0.18em] leading-none" style={{ color: BROWN }}>
          <span className="border-t-2 border-b-2 py-2.5 px-1" style={{ borderColor: BROWN }}>NOTIONS</span>
          <span className="px-1">IN</span>
          <span className="border-t-2 border-b-2 py-2.5 px-1" style={{ borderColor: BROWN }}>PATTERN</span>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-10 text-[12px] font-bold tracking-[0.22em]">
        {navLinks.map((l) => (
          <Link key={l.label} to={l.to} className="hover:opacity-70 transition-opacity">{l.label}</Link>
        ))}
      </nav>
      <div className="flex items-center gap-6 text-[12px] font-bold tracking-[0.22em]">
        <a href="#" className="flex items-center gap-1.5"><Search size={14} /> SEARCH</a>
        <a href="#" className="flex items-center gap-1.5"><User size={14} /> ACCOUNT</a>
        <Link to="/cart" className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
          <ShoppingBag size={14} /> CART ({cartCount})
        </Link>
      </div>
    </header>
  );
}

export function AnnouncementBar({ bg = "#7A8063", color = "#F7F4EE" }: { bg?: string; color?: string } = {}) {
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
    { title: "SHOP", items: [{ label: "Collection", to: "/collections" }, { label: "Cart", to: "/cart" }, "New In"] },
    { title: "HELP", items: ["Orders", "Shipping", "Returns"] },
    { title: "ABOUT", items: [{ label: "Our Story", to: "/" }, { label: "Craft", to: "/" }, { label: "Founder", to: "/founder" }] },
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
