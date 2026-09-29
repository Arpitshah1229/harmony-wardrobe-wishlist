import { ArrowDown, ArrowRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnnouncementBar, Footer, Header } from "@/components/site-chrome";
import hero from "@/assets/homepage-clone-hero.jpeg.asset.json";
import philosophy from "@/assets/homepage-clone-philosophy.jpeg.asset.json";
import bahaar from "@/assets/homepage-clone-bahaar.jpeg.asset.json";
import gulraaz from "@/assets/homepage-clone-gulraaz.jpg.asset.json";
import kinara from "@/assets/homepage-clone-kinara.jpg.asset.json";
import sepia from "@/assets/homepage-clone-sepia.png.asset.json";
import motif from "@/assets/homepage-clone-icon.png.asset.json";
import processVideo from "@/assets/homepage-clone-process.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Notions in Pattern — Craft, Thought & Evolving Patterns" },
      {
        name: "description",
        content:
          "Discover Notions in Pattern, a thinking label exploring textiles, handicrafts and evolving patterns through small-batch clothing.",
      },
      { property: "og:title", content: "Notions in Pattern — Craft, Thought & Evolving Patterns" },
      {
        property: "og:description",
        content: "A thinking label using craft as expression, reimagining patterns one piece at a time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const featured = [
  {
    name: "Bahaar",
    copy: "Where nature moves and growth is constant.",
    image: bahaar.url,
    slug: "bahaar-shirt",
  },
  {
    name: "Gulraaz",
    copy: "A secret blooming inward.",
    image: gulraaz.url,
    slug: "gulraaz-shirt",
  },
  {
    name: "Kinara",
    copy: "A coastal memory at the edge of light and water.",
    image: kinara.url,
    slug: "kinara-shirt",
  },
];

function HomePage() {
  return (
    <main className="m-[5px] min-h-screen overflow-hidden bg-home-linen text-foreground">
      <Header overlay subtleOverlay solidAfter={0.08} />

      <section className="relative flex min-h-[100svh] w-full bg-cream">
        <img
          src={hero.url}
          alt="Man wearing a pink embroidered shirt beside a sunlit arched window"
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
        <div className="home-hero-content relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-between gap-8 px-5 pb-7 pt-24 sm:px-[6vw] sm:pb-10 sm:pt-[14vh]">
          <div className="w-full max-w-[450px]">
            <h1 className="home-hero-title font-serif text-[38px] font-medium leading-[1.05] text-accent sm:text-[48px] lg:text-[58px]">
              Understanding life begins with understanding of patterns
            </h1>
            <div className="home-hero-copy my-6 max-w-[440px] space-y-2 text-[13px] leading-[1.9] text-home-light sm:my-8 sm:text-sm">
              <p>A thinking label using craft as expression.</p>
              <p>Exploring textiles and handicrafts as a way of understanding life — through evolving collections.</p>
              <p>Reimagining patterns, reshaping them, and creating one piece at a time.</p>
            </div>
            <Link
              to="/collections"
              className="home-hero-link mt-10 inline-flex items-center gap-4 border-b-2 border-foreground pb-1.5 text-[12px] font-extrabold uppercase tracking-[0.18em] text-foreground transition-opacity hover:opacity-60"
            >
              Explore Naqsh-E-Nigah <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex w-full flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div className="mb-4 flex flex-col items-start gap-1 text-accent sm:mb-6">
              <span className="text-[12px] font-bold uppercase tracking-[0.16em]">Scroll</span>
              <ArrowDown className="h-4 w-4" />
            </div>
            <div className="relative z-20 -mr-4 mb-14 self-end text-right text-[11px] uppercase leading-[1.8] tracking-[0.12em] text-accent sm:-mr-[4.5vw] sm:mb-20">
              <p>Inaugural Collection</p>
              <p className="my-2 font-serif text-[30px] normal-case leading-none sm:text-[35px]">Naqsh-E-Nigāh</p>
              <p>Patterns of the vision</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-2.5 flex min-h-[700px] items-center justify-center overflow-hidden bg-home-linen">
        <img
          src={philosophy.url}
          alt="Embroidered textiles illustrating evolving patterns"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 px-6 text-center">
          <h2 className="home-philosophy-line-1 font-serif text-[31px] font-medium italic leading-[1.6] sm:text-[38px]">
            Where making remains<br />but patterns evolve,
          </h2>
          <span className="mx-auto my-7 block h-0.5 w-9 bg-home-espresso" />
          <h2 className="home-philosophy-line-2 font-serif text-[31px] font-medium italic leading-[1.6] sm:text-[38px]">
            Where process<br />becomes perception,
          </h2>
          <span className="mx-auto my-7 block h-0.5 w-9 bg-home-espresso" />
          <h2 className="home-philosophy-line-3 font-serif text-[31px] font-medium italic leading-[1.6] sm:text-[38px]">
            Where nothing is fixed,<br />not even us.
          </h2>
        </div>
      </section>

      <section className="bg-home-linen p-3 sm:p-5">
        <div className="grid min-h-[280px] grid-cols-1 gap-1 md:h-[50vh] md:grid-cols-3">
          {featured.map((item) => (
            <Link
              key={item.slug}
              to="/product/$slug"
              params={{ slug: item.slug }}
              className="group relative grid min-h-[420px] overflow-hidden bg-cream md:min-h-0"
            >
              <img
                src={item.image}
                alt={`${item.name} shirt`}
                loading="lazy"
                className="col-start-1 row-start-1 h-full w-full object-cover object-[center_5%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="col-start-1 row-start-1 z-10 flex items-end justify-center bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent px-4 pb-8 text-center text-home-light">
                <div>
                  <h2 className="font-serif text-2xl uppercase tracking-wide">{item.name}</h2>
                  <span className="mx-auto my-2 block h-px w-2/3 bg-home-light" />
                  <p className="mb-4 text-xs font-light leading-relaxed tracking-wide">{item.copy}</p>
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.12em]">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link
          to="/collections"
          className="mx-auto mt-7 flex w-fit items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-accent"
        >
          <span className="h-px w-8 bg-accent" /> View collection <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      <section aria-label="Crafted by hand" className="relative min-h-[760px] overflow-hidden md:min-h-[110vh]">
        <img src={sepia.url} alt="Sepia-toned studio setting" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative flex min-h-[760px] flex-col items-center justify-center gap-10 p-6 md:min-h-[110vh] md:flex-row md:gap-[16vw] md:p-10">
          <Link
            to="/collections"
            aria-label="Explore the collection"
            className="relative aspect-[4/4.7] w-full max-w-[460px] shrink-0 overflow-hidden border-[16px] border-home-frame shadow-sm md:border-[25px]"
          >
            <video className="h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata" poster={sepia.url}>
              <source src={processVideo.url} type="video/mp4" />
            </video>
          </Link>
          <div className="aspect-[4/4.7] w-full max-w-[460px] shrink-0 overflow-hidden border-[16px] border-home-frame bg-home-panel md:border-[25px]">
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center md:p-12">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-wide text-accent">
                Crafted by hand<br />Honest in every detail
              </h2>
              <span className="mx-auto my-7 block h-0.5 w-9 bg-home-espresso" />
              <p className="font-serif uppercase tracking-wide text-foreground">
                Perfect was never the point<br />We learn. We evolve. We return.<br />Always.
              </p>
              <img src={motif.url} alt="Notions in Pattern motif" loading="lazy" className="mt-6 h-[130px] w-[130px] object-contain" />
            </div>
          </div>
        </div>
      </section>

      <AnnouncementBar />
      <Footer />
    </main>
  );
}