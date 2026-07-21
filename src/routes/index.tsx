import { createFileRoute } from "@tanstack/react-router";
import { Search, User, ShoppingBag } from "lucide-react";
import aboutus1 from "@/assets/aboutus1.png.asset.json";
import aboutus2 from "@/assets/aboutus2.png.asset.json";
import gratitudeBg from "@/assets/gratitude_bg.png.asset.json";

import nipLogo from "@/assets/nip_logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: AboutPage,
});

const navLinks = ["COLLECTION", "CRAFT", "ABOUT", "FOUNDER", "CONTACT"];

const BROWN = "#4B3528";
const DARK = "#2C2119";

function Header() {
  return (
    <header className="w-full px-8 md:px-12 py-5 flex items-center justify-between" style={{ color: BROWN }}>
      <div className="flex items-center gap-4">
        <img src={nipLogo.url} alt="Notions in Pattern" className="h-10 w-auto" />
        <div className="font-serif font-bold text-lg md:text-xl tracking-[0.18em] border-t-2 border-b-2 py-2.5 px-3 leading-none" style={{ borderColor: BROWN }}>
          NOTIONS IN PATTERN
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
    <footer className="px-8 md:px-16 py-12 border-t border-border/60" style={{ color: BROWN }}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-start">
        <div className="flex items-start">
          <img src={nipLogo.url} alt="Notions in Pattern" className="w-40 h-auto" />
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
      <div className="mt-12 pt-6 border-t border-border/60 text-center text-[12px] font-bold" style={{ color: BROWN }}>
        © Notions in Pattern. All rights reserved.
      </div>
    </footer>
  );
}

function Icon({ type }: { type: string }) {
  const stroke = "currentColor";
  const s = 28;
  if (type === "craft") return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1"><path d="M8 21V10c0-1 .5-2 2-2s2 1 2 2v4M12 14V6c0-1 .5-2 2-2s2 1 2 2v8M16 14V8c0-1 .5-2 2-2s2 1 2 2v9c0 2-2 4-5 4H10c-3 0-6-2-6-6v-3c0-1 .5-2 2-2s2 1 2 2v2" /></svg>;
  if (type === "thought") return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1"><ellipse cx="12" cy="12" rx="10" ry="6" /><circle cx="12" cy="12" r="2.5" /></svg>;
  if (type === "process") return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1"><path d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" /></svg>;
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1"><circle cx="12" cy="12" r="9" /></svg>;
}

function AboutPage() {
  const titleClass = "font-serif font-bold text-[18px] md:text-[20px] tracking-[0.25em] mb-8";
  return (
    <div className="min-h-[calc(100vh-10px)] m-[5px]" style={{ color: DARK }}>
      <Header />

      {/* Hero */}
      <section className="px-8 md:px-16 pt-8 pb-20 grid md:grid-cols-2 gap-12 items-start">
        <div className="pt-10" style={{ color: BROWN }}>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.1] tracking-tight">
            A thinking label<br />using craft as<br />expression.
          </h1>
          <div className="w-16 h-px my-6" style={{ backgroundColor: `${BROWN}66` }} />
          <p className="text-[13px] leading-[1.9] max-w-md">
            Exploring textiles and handicrafts as a way of understanding life — through evolving collections. Reimagining patterns, reshaping them, and creating one piece at a time.
          </p>
        </div>
        <div>
          <img src={aboutus1.url} alt="Artisans working on textile" className="w-full h-auto object-cover" />
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
      <section className="w-full bg-[var(--cream)] px-8 md:px-16 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div style={{ color: DARK }}>
            <h2 className="font-serif font-bold text-4xl md:text-5xl mb-6" style={{ color: BROWN }}>With Gratitude.</h2>
            <div className="space-y-4 text-[14px] leading-[1.9]">
              <p>Notions in Pattern began with our family.</p>
              <p>It continues through every artisan, every collaborator, and everyone who becomes part of the story.</p>
              <p>Thank you for being here.</p>
              <p className="pt-2">— Neha &amp; Anita</p>
            </div>
          </div>
          <div>
            <img src={aboutus3.url} alt="With gratitude" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
