import { Search, User, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import nipLogo from "@/assets/nip_logo.png.asset.json";

export const BROWN = "#4B3528";
export const DARK = "#2C2119";

const navLinks = [
  { label: "COLLECTION", to: "/" },
  { label: "ABOUT", to: "/" },
  { label: "FOUNDER", to: "/founder" },
  { label: "CONTACT", to: "/" },
];

export function Header() {
  return (
    <header className="w-full px-8 md:px-12 py-5 flex items-center justify-between" style={{ color: BROWN }}>
      <div className="flex items-center gap-4">
        <img src={nipLogo.url} alt="Notions in Pattern" className="h-10 w-auto" />
        <div className="flex items-center font-serif font-bold text-lg md:text-xl tracking-[0.18em] leading-none" style={{ color: BROWN }}>
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
        <a href="#" className="flex items-center gap-1.5"><ShoppingBag size={14} /> CART (0)</a>
      </div>
    </header>
  );
}

export function Footer() {
  const cols = [
    { title: "SHOP", items: ["Collection", "New In", "Gift Cards"] },
    { title: "HELP", items: ["Orders", "Shipping", "Returns"] },
    { title: "ABOUT", items: [{ label: "Our Story", to: "/" }, { label: "Craft", to: "/" }, { label: "Founder", to: "/founder" }] },
    { title: "CONNECT", items: ["Instagram", "Email"] },
  ];
  return (
    <footer className="px-8 md:px-16 py-12 border-t border-border/60" style={{ color: BROWN }}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-start">
        <div className="self-start -mt-2">
          <img src={nipLogo.url} alt="Notions in Pattern" className="w-40 h-auto" />
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
      <div className="mt-12 pt-6 border-t border-border/60 text-center text-[12px] font-bold" style={{ color: BROWN }}>
        © Notions in Pattern. All rights reserved.
      </div>
    </footer>
  );
}
