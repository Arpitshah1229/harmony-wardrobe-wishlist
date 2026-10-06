import { ArrowRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Footer, Header } from "@/components/site-chrome";
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
    name: "Kinara",
    copy: "A coastal memory at the edge of light and water.",
    image: kinara.url,
    slug: "kinara-shirt",
  },
  {
    name: "Gulraaz",
    copy: "A secret blooming inward.",
    image: gulraaz.url,
    slug: "gulraaz-shirt",
  },
];

function HomePage() {
  return (
    <main className="m-[5px] min-h-screen overflow-hidden bg-home-linen text-foreground">
      <Header overlay subtleOverlay solidAfter={0.08} hideLogo scrolledBrown />

      <section className="relative flex min-h-[100svh] w-full bg-cream">
        <img
          src={hero.url}
          alt="Man wearing a pink embroidered shirt beside a sunlit arched window"
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
        <div className="home-hero-content relative z-10 flex min-h-[100svh] w-full flex-col justify-between gap-8 px-5 pb-4 pt-[29vh] sm:pb-6 sm:pl-[15.5vw] sm:pr-[6vw] lg:pl-[142px] xl:pl-[165px]">
          <div className="w-full max-w-[450px]">
            <h1 className="home-hero-title font-serif text-[38px] font-medium leading-[1.05] text-accent sm:text-[48px] lg:text-[58px]">
              Understanding life begins with understanding of patterns
            </h1>
            <div className="home-hero-copy mt-16 mb-6 max-w-[440px] space-y-2 text-[15px] leading-[1.9] text-home-light sm:mt-20 sm:mb-8 sm:text-base">
              <p>A thinking label using craft as expression.</p>
              <p>Exploring textiles and handicrafts as a way of understanding life — through evolving collections.</p>
              <p>Reimagining patterns, reshaping them, and creating one piece at a time.</p>
            </div>
          </div>

          <div className="relative z-20 -mr-1 flex w-full flex-col items-start gap-6 pb-2 sm:-mr-[3.5vw] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pb-0">
            <Link
              to="/collections"
              className="home-hero-link inline-flex items-center gap-4 border-b-2 border-accent pb-1.5 text-[12px] font-black uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-60"
            >
              Explore Naqsh-E-Nigah <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="-mr-1 self-end text-right text-[11px] uppercase leading-[1.8] tracking-[0.12em] text-accent sm:-mr-9 sm:translate-x-8 sm:self-auto">
              <p>Inaugural Collection</p>
              <p className="my-2 font-serif text-[30px] font-bold normal-case leading-none sm:text-[35px]">Naqsh-E-Nigāh</p>
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
              <div className="absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent px-4 pb-8 text-center text-home-light">
                <div className="w-full">
                  <h2 className="flex h-8 items-center justify-center font-serif text-2xl uppercase tracking-wide">{item.name}</h2>
                  <span className="mx-auto my-2 block h-px w-2/3 bg-home-light" />
                  <p className="mb-4 flex min-h-[42px] items-start justify-center text-center text-xs font-light leading-relaxed tracking-wide">{item.copy}</p>
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
        <div className="relative flex min-h-[760px] flex-col items-center justify-center gap-10 p-6 md:min-h-[110vh] md:flex-row md:gap-[4vw] md:p-8 lg:gap-[16vw] lg:p-10">
          <Link
            to="/collections"
            aria-label="Explore the collection"
            className="relative aspect-[4/4.7] w-full max-w-[460px] shrink-0 overflow-hidden border-[16px] border-home-frame shadow-sm md:max-w-[320px] md:border-[20px] lg:max-w-[460px] lg:border-[25px]"
          >
            <video className="h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata" poster={sepia.url}>
              <source src={processVideo.url} type="video/mp4" />
            </video>
          </Link>
          <div className="aspect-[4/4.7] w-full max-w-[460px] shrink-0 overflow-hidden border-[16px] border-home-frame bg-home-panel md:max-w-[320px] md:border-[20px] lg:max-w-[460px] lg:border-[25px]">
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center md:p-8 lg:p-12">
              <h2 className="font-serif text-2xl font-bold uppercase tracking-wide text-accent md:text-xl lg:text-2xl">
                Crafted by hand<br />Honest in every detail
              </h2>
              <span className="mx-auto my-4 block h-0.5 w-9 bg-home-espresso lg:my-7" />
              <p className="font-serif uppercase tracking-wide text-foreground">
                Perfect was never the point<br />We learn. We evolve. We return.<br />Always.
              </p>
              <img src={motif.url} alt="Notions in Pattern motif" loading="lazy" className="mt-3 h-[90px] w-[90px] object-contain lg:mt-6 lg:h-[130px] lg:w-[130px]" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}