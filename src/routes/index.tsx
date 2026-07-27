import { createFileRoute } from "@tanstack/react-router";
import { Search, User, ShoppingBag } from "lucide-react";
import aboutus1 from "@/assets/aboutus1_v2.jpeg.asset.json";
import aboutus2 from "@/assets/aboutus2_v2.jpeg.asset.json";
import aboutus3 from "@/assets/aboutus3_v2.jpeg.asset.json";

import nipLogo from "@/assets/nip_logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: AboutPage,
});

const navLinks = ["COLLECTION", "ABOUT", "FOUNDER", "CONTACT"];

const BROWN = "#4B3528";
const DARK = "#2C2119";

function Header() {
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
          <a key={l} href="#" className="hover:opacity-70 transition-opacity">{l}</a>
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

function Footer() {
  const cols = [
    { title: "SHOP", items: ["Collection", "New In", "Gift Cards"] },
    { title: "HELP", items: ["Orders", "Shipping", "Returns"] },
    { title: "ABOUT", items: ["Our Story", "Craft", "Founder"] },
    { title: "CONNECT", items: ["Instagram", "Email"] },
  ];
  return (
    <footer className="px-8 md:px-16 py-8 border-t border-border/60" style={{ color: BROWN }}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-start">
        <div className="self-start">
          <img src={nipLogo.url} alt="Notions in Pattern" className="w-24 h-auto" />
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-[12px] font-bold tracking-[0.22em] mb-3" style={{ color: BROWN }}>{c.title}</h4>
            <ul className="space-y-1.5 text-[13px] font-bold" style={{ color: BROWN }}>
              {c.items.map((i) => <li key={i}><a href="#" className="hover:opacity-70">{i}</a></li>)}
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

function Icon({ type }: { type: string }) {
  const stroke = "currentColor";
  const s = 32;
  if (type === "craft")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
        <path d="M12 11V4a1.5 1.5 0 0 1 3 0v7" />
        <path d="M15 11V5.5a1.5 1.5 0 0 1 3 0V13" />
        <path d="M9 11V8a1.5 1.5 0 0 0-3 0v6.5c0 3.5 2.5 6.5 6 6.5h1.5c3 0 4.5-2 5.5-4.5L20.5 13" />
      </svg>
    );
  if (type === "thought")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  if (type === "process")
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
        <path d="M3 15c2-2.5 4-2.5 6 0s4 2.5 6 0 4-2.5 6 0" />
      </svg>
    );
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function AboutPage() {
  const titleClass = "font-serif font-black text-[22px] md:text-[26px] tracking-[0.25em] mb-8";
  return (
    <div className="min-h-[calc(100vh-10px)] m-[5px]" style={{ color: DARK }}>
      <Header />

      {/* Hero */}
      <section className="px-8 md:px-16 pt-8 pb-20 grid md:grid-cols-2 gap-2 md:gap-4 items-stretch">
        <div className="pt-6 flex flex-col justify-center" style={{ color: BROWN }}>
          <h1 className="font-serif text-7xl md:text-8xl leading-[1.05] tracking-tight">
            A thinking label<br />using craft as<br />expression.
          </h1>
          <div className="w-16 h-px my-6" style={{ backgroundColor: `${BROWN}66` }} />
          <p className="text-[17px] md:text-[18px] leading-[1.85] max-w-md">
            Exploring textiles and handicrafts as a way of understanding life — through evolving collections. Reimagining patterns, reshaping them, and creating one piece at a time.
          </p>
        </div>
        <div className="h-full">
          <img src={aboutus1.url} alt="Artisans working on textile" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Our Story */}
      <section className="px-8 md:px-16 pb-24">
        <h3 className={titleClass} style={{ color: BROWN }}>OUR STORY</h3>
        <div className="grid md:grid-cols-4 gap-8 text-[13px] leading-[1.9] relative" style={{ color: DARK }}>
          <div className="md:pr-6 md:border-r space-y-4" style={{ borderColor: `${DARK}33` }}>
            <p>Notions in Pattern began at home.<br />With my mother.</p>
            <p>It did not begin as a brand,<br />but as something quieter — repetition.</p>
          </div>
          <div className="md:pr-6 md:border-r space-y-4" style={{ borderColor: `${DARK}33` }}>
            <p>The same sentences. The same advice. The same words heard so often, they fade into the background.</p>
            <p>Over time, they begin to structure how you think, respond, and move through the world.</p>
          </div>
          <div className="md:pr-6 md:border-r space-y-4" style={{ borderColor: `${DARK}33` }}>
            <p>They were patterns.</p>
            <p>Notions in Pattern comes from that realisation.</p>
            <p>That nothing in us is fixed.<br />Not thought. Not behaviour.<br />Not meaning.</p>
          </div>
          <div className="space-y-4">
            <p>Everything is formed through repetition.</p>
            <p>And anything formed can be re-formed.</p>
            <p>We are choosing craft as the language to show that shift.</p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="grid md:grid-cols-2 gap-12 md:gap-16 items-center pb-24">
        <div className="px-8 md:pl-16 md:pr-0">
          <img src={aboutus2.url} alt="Hand embroidering fabric" className="w-full max-h-[420px] h-auto object-cover" />
        </div>
        <div className="px-8 md:pr-16 md:pl-0">
          <h3 className={titleClass} style={{ color: BROWN }}>WHAT WE DO</h3>
          <div className="space-y-4 text-[13px] leading-[1.9] max-w-lg" style={{ color: DARK }}>
            <p>At Notions in Patterns, we want to work with traditional crafts across various forms — stitching, dyeing, printing, weaving, and handwork.</p>
            <p>We do not approach craft as something to preserve unchanged.</p>
            <p>We see it as a living system — open to reinterpretation.</p>
            <p>It begins with observation and moves into making.</p>
            <p>Because what changes the outcome is not only what we make, but how we are taught to see it.</p>
            <p>What we shift is not the technique, but the way it is seen.</p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-8 md:px-16 pb-24" style={{ color: DARK }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "craft", title: "CRAFT", l1: "Traditional techniques.", l2: "New directions." },
            { icon: "thought", title: "THOUGHT", l1: "Understanding life begins", l2: "with understanding patterns." },
            { icon: "process", title: "PROCESS", l1: "Nothing here", l2: "is ever rushed." },
            { icon: "pattern", title: "PATTERN", l1: "Nothing is fixed.", l2: "Not even us." },
          ].map((p, i) => (
            <div key={p.title} className={`flex flex-col items-center text-center px-4 ${i < 3 ? "md:border-r" : ""}`} style={{ borderColor: `${DARK}33` }}>
              <span style={{ color: BROWN }}><Icon type={p.icon} /></span>
              <h4 className="font-serif font-bold text-[15px] tracking-[0.25em] mt-4 mb-3" style={{ color: BROWN }}>{p.title}</h4>
              <p className="text-[12px] leading-[1.8]">{p.l1}<br />{p.l2}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gratitude */}
      <section
        className="relative w-full px-8 md:px-16 py-24 bg-no-repeat bg-cover bg-right"
        style={{ backgroundImage: `url(${aboutus3.url})`, minHeight: "480px" }}
      >
        <div className="max-w-6xl relative z-10">
          <div className="max-w-md" style={{ color: DARK }}>
            <h2 className="font-serif font-bold text-4xl md:text-5xl mb-6" style={{ color: BROWN }}>With Gratitude.</h2>
            <div className="space-y-2 text-[14px] leading-[1.9]">
              <p>Notions in Pattern began with our family.</p>
              <p>It continues through every artisan, every collaborator, and everyone who becomes part of the story.</p>
              <p>Thank you for being here.</p>
              <p className="pt-2">— Neha &amp; Anita</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
