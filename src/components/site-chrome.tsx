import { StoreImage } from "@/components/store-image";
import { useEffect, useState, type ComponentType } from "react";
import { User, Heart, Menu, X } from "lucide-react";
import { GmailIcon } from "@/components/gmail-icon";
import { InstagramIcon } from "@/components/instagram-icon";
import { PhoneIcon } from "@/components/phone-icon";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { BagIcon } from "@/components/bag-icon";
import { Link } from "@tanstack/react-router";
import nipLogo from "@/assets/nip_logo.png.asset.json";
import nipMonogram from "@/assets/nip-monogram.png.asset.json";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useAuth } from "@/lib/auth";

export const BROWN = "#4B3528";
export const DARK = "#2C2119";

const navLinks = [
  { label: "COLLECTION", to: "/collections" },
  { label: "ABOUT", to: "/about-us" },
  { label: "FOUNDER", to: "/founder" },
];

export function Wordmark({ ink = BROWN, className = "" }: { ink?: string; className?: string } = {}) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-1.5 sm:gap-2 font-serif font-bold text-[11px] sm:text-sm lg:text-base xl:text-xl tracking-[0.14em] sm:tracking-[0.18em] whitespace-nowrap leading-none hover:opacity-80 transition-opacity ${className}`}
      style={{ color: ink }}
    >
      <span className="flex flex-col items-stretch gap-1 lg:gap-1.5">
        <span className="h-px w-[calc(100%+8px)] -mx-1" style={{ backgroundColor: ink }} />
        <span className="px-0.5">NOTIONS</span>
        <span className="h-px w-[calc(100%+8px)] -mx-1" style={{ backgroundColor: ink }} />
      </span>
      <span className="flex flex-col items-stretch gap-1 lg:gap-1.5">
        <span className="h-px w-[calc(100%+8px)] -mx-1 opacity-0" style={{ backgroundColor: ink }} />
        <span className="px-0.5">IN</span>
        <span className="h-px w-[calc(100%+8px)] -mx-1 opacity-0" style={{ backgroundColor: ink }} />
      </span>
      <span className="flex flex-col items-stretch gap-1 lg:gap-1.5">
        <span className="h-px w-[calc(100%+8px)] -mx-1" style={{ backgroundColor: ink }} />
        <span className="px-0.5">PATTERN</span>
        <span className="h-px w-[calc(100%+8px)] -mx-1" style={{ backgroundColor: ink }} />
      </span>
    </Link>
  );
}

export function Header({
  overlay = false,
  subtleOverlay = false,
  solid = false,
  solidAfter = 0.5,
  hideLogo = true,
  scrolledBrown = false,
  solidInk = "#E5D9C5",
}: { overlay?: boolean; subtleOverlay?: boolean; solid?: boolean; solidAfter?: number; hideLogo?: boolean; scrolledBrown?: boolean; solidInk?: string } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * solidAfter);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay, solidAfter]);

  const solidBg = solid || (scrolled && scrolledBrown);
  const ink = solidBg ? solidInk : BROWN;

  return (
      <header
        className={`${
          overlay
            ? "fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5 flex items-center justify-between transition-all duration-500"
            : "relative z-50 w-full px-8 md:px-12 py-5 flex items-center justify-between"
        } ${
          solidBg
            ? "shadow-sm"
            : scrolled
              ? "bg-background/95 backdrop-blur-md shadow-sm"
              : subtleOverlay
                ? "bg-gradient-to-b from-background/25 via-background/10 to-transparent"
                : "bg-gradient-to-b from-background/85 via-background/50 to-transparent backdrop-blur-[2px]"
        }`}
        style={{ color: ink, ...(solidBg ? { backgroundColor: "#4B3528" } : null) }}
      >
        <div className="flex min-w-0 items-center gap-3 xl:gap-4">
          {!hideLogo && (
            <StoreImage src={nipMonogram.url} loading="eager" sizes="80px" alt="Notions in Pattern" className="h-[19px] w-auto shrink-0 sm:h-[24px] lg:h-[27px] xl:h-[34px]" />
          )}
          {hideLogo && (
            <span className="relative inline-flex shrink-0 md:hidden">
              <StoreImage src={nipMonogram.url} loading="eager" sizes="40px" alt="Notions in Pattern monogram" className="h-[19px] w-auto" style={solidBg ? { opacity: 0 } : undefined} />
              {solidBg && (
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{ backgroundColor: ink, WebkitMaskImage: `url(${nipMonogram.url})`, maskImage: `url(${nipMonogram.url})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }}
                />
              )}
            </span>
          )}
          <Wordmark ink={ink} />
        </div>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-8 text-[10px] xl:text-[11px] font-bold tracking-[0.2em]">
          {navLinks.map((l) => (
            <Link key={l.label} to={l.to} className="hover:opacity-70 transition-opacity">{l.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 xl:gap-5 text-[11px] font-bold tracking-[0.18em]">
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden hover:opacity-70 transition-opacity"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={logout}
              className="hidden lg:flex items-center gap-1.5 hover:opacity-70 transition-opacity uppercase"
            >
              <User size={16} /> <span className="hidden 2xl:inline">{(user?.name || "Account").split(" ")[0]} · LOGOUT</span>
            </button>
          ) : (
            <Link to="/login" search={{ redirect: "/cart" }} className="hidden lg:flex items-center gap-1.5 hover:opacity-70 transition-opacity">
              <User size={16} /> <span className="hidden 2xl:inline">ACCOUNT</span>
            </Link>
          )}
          <Link to="/wishlist" className="hidden lg:flex items-center gap-1.5 hover:opacity-70 transition-opacity">
            <Heart size={16} color="#7B1113" fill={wishCount > 0 ? "#7B1113" : "none"} /> <span className="hidden 2xl:inline">WISHLIST </span>({wishCount})
          </Link>
          <Link to="/cart" className="hidden lg:flex items-center gap-1.5 hover:opacity-70 transition-opacity">
            <BagIcon size={16} /> <span className="hidden 2xl:inline">CART </span>({cartCount})
          </Link>
        </div>
      {menuOpen && (
        <nav
          aria-label="Main navigation"
          className="absolute top-full left-0 right-0 border-t border-border/40 shadow-md lg:hidden"
          style={{ backgroundColor: solidBg ? "#4B3528" : "#F7F4EE" }}
        >
          <div className="flex flex-col px-6 py-3">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/40 py-3.5 text-[11px] font-bold tracking-[0.2em] last:border-b-0 hover:opacity-70 transition-opacity"
                style={{ color: ink }}
              >
                {l.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button type="button" onClick={() => { setMenuOpen(false); logout(); }} className="flex items-center gap-2 border-t border-border/40 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ink }}>
                <User size={15} /> {(user?.name || "Account").split(" ")[0]} · LOGOUT
              </button>
            ) : (
              <Link to="/login" search={{ redirect: "/cart" }} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 border-t border-border/40 py-3.5 text-[11px] font-bold tracking-[0.2em]" style={{ color: ink }}>
                <User size={15} /> ACCOUNT
              </Link>
            )}
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 border-t border-border/40 py-3.5 text-[11px] font-bold tracking-[0.2em]" style={{ color: ink }}>
              <Heart size={15} color="#7B1113" fill={wishCount > 0 ? "#7B1113" : "none"} /> WISHLIST ({wishCount})
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 border-t border-border/40 py-3.5 text-[11px] font-bold tracking-[0.2em]" style={{ color: ink }}>
              <BagIcon size={15} /> CART ({cartCount})
            </Link>
          </div>
        </nav>
      )}
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

      <div className="announcement-marquee-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {strip.map((t, i) => (
              <span
                key={`${k}-${i}`}
                className="px-3 text-[10px] font-bold tracking-[0.16em] whitespace-nowrap sm:px-6 sm:text-[11px] sm:tracking-[0.24em]"
                style={{ color }}
              >

                {t} <span className="px-2 sm:px-3">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const INSTAGRAM_URL =
  "https://instagram.com/notionsinpattern.nipstories?utm_source=qr&cplk=OG1hNDlpNThjYWl4";
const CONTACT_EMAIL = "hello@notionsinpattern.com";
// Opens the Gmail app on phones, and the Gmail web compose window on a desktop browser.
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`;
const PHONE_DISPLAY = "+91 75218 02791";

const PHONE_TEL = "tel:+917521802791";
const WHATSAPP_CHAT_URL =
  "https://wa.me/917521802791?text=Hi%20NIP%2C%20I%27d%20like%20to%20know%20more%20about%20this%20shirt.";

type FooterItem =
  | string
  | { label: string; to?: string; href?: string; icon?: ComponentType<{ size?: number; className?: string }> };

export function Footer() {
  const cols: { title: string; items: FooterItem[]; wide?: boolean }[] = [
    { title: "SHOP", items: [{ label: "Home", to: "/" }, { label: "Collection", to: "/collections" }, { label: "Cart", to: "/cart" }, { label: "Wishlist", to: "/wishlist" }] },
    { title: "HELP", items: [{ label: "Orders", to: "/orders" }, "Shipping", { label: "Exchange & Store Credit", to: "/exchange-policy" }, { label: "Privacy Policy", to: "/privacy" }] },
    { title: "ABOUT", items: [{ label: "Our Story", to: "/about-us" }, { label: "Founder", to: "/founder" }] },
    { title: "CONNECT", wide: true, items: [{ label: PHONE_DISPLAY, href: PHONE_TEL, icon: PhoneIcon }, { label: "WhatsApp", href: WHATSAPP_CHAT_URL, icon: WhatsAppIcon }, { label: "Instagram", href: INSTAGRAM_URL, icon: InstagramIcon }, { label: "hello@notionsinpattern.com", href: GMAIL_COMPOSE_URL, icon: GmailIcon }] },

  ];
  type Col = { title: string; items: FooterItem[]; wide?: boolean };
  // Desktop keeps SHOP, HELP, ABOUT, CONNECT; mobile shows the 2×2 grid below.
  const desktopOrder: Record<string, string> = {
    SHOP: "lg:order-1",
    HELP: "lg:order-2",
    ABOUT: "lg:order-3",
    CONNECT: "lg:order-4",
  };
  // Mobile-only column order: HELP, SHOP on the first row; CONNECT, ABOUT on the second.
  const mobileOrder: Record<string, string> = {
    SHOP: "max-lg:order-2",
    HELP: "max-lg:order-1",
    CONNECT: "max-lg:order-3",
    ABOUT: "max-lg:order-4",
  };
  const renderCol = (c: Col) => (
    <div key={c.title} className={[c.wide ? "min-w-0" : "", mobileOrder[c.title] ?? "", desktopOrder[c.title] ?? ""].filter(Boolean).join(" ")}>

      <h4 className="text-[12px] font-bold tracking-[0.22em] mb-2" style={{ color: BROWN }}>{c.title}</h4>
      <ul className="space-y-1 text-[13px] font-bold" style={{ color: BROWN }}>
        {c.items.map((i) => {
          const label = typeof i === "string" ? i : i.label;
          const to = typeof i === "string" ? undefined : i.to;
          const href = typeof i === "string" ? undefined : i.href;
          const ItemIcon = typeof i === "string" ? undefined : i.icon;
          return (
            <li key={label}>
              {to ? (
                <Link to={to} className="hover:opacity-70">{label}</Link>
              ) : href ? (
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="inline-flex items-start gap-2 whitespace-nowrap hover:opacity-70"
                >
                  {ItemIcon && <ItemIcon size={14} className="mt-[3px] shrink-0" />}
                  {label}
                </a>
              ) : (
                <a href="#" className="hover:opacity-70">{label}</a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
  return (
    <footer className="px-5 md:px-10 py-4 border-t border-border/60" style={{ color: BROWN }}>
      <div className="grid grid-cols-[auto_auto] justify-center gap-x-6 gap-y-4 items-start lg:grid-cols-5 lg:justify-normal lg:gap-4">
        <div className="col-span-2 flex justify-center lg:col-span-1 lg:block lg:self-start">
          <StoreImage src={nipLogo.url} sizes="144px" alt="Notions in Pattern" className="w-24 lg:w-36 h-auto" />
        </div>
        {cols.map((c) => renderCol(c))}
      </div>

      <div className="mt-3 pt-2 border-t border-border/60 text-center text-[12px] font-bold" style={{ color: BROWN }}>
        © Notions in Pattern. All rights reserved.
      </div>
    </footer>
  );
}
