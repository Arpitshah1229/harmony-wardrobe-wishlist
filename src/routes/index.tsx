import { ArrowDown, ArrowRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnnouncementBar, Footer, Header } from "@/components/site-chrome";
import hero from "@/assets/homepage-hero-window.jpeg.asset.json";
import philosophy from "@/assets/homepage-philosophy.jpeg.asset.json";
import bahaar from "@/assets/bahaar-collection.jpeg.asset.json";
import gulraaz from "@/assets/gulraaz-collection.jpeg.asset.json";
import kinara from "@/assets/kinara-collection.jpeg.asset.json";
import sepia from "@/assets/homepage-sepia.png.asset.json";
import motif from "@/assets/homepage-icon.png.asset.json";
import processVideo from "@/assets/homepage-process.mp4.asset.json";
import processVideoWebm from "@/assets/homepage-process.webm.asset.json";

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
        content:
          "A thinking label using craft as expression, reimagining patterns one piece at a time.",
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
    <main className="m-[5px] min-h-screen overflow-hidden bg-background text-foreground">
      <Header solid />
      <section className="relative w-full">
        <img
          src={hero.url}
          alt="Man wearing a pink embroidered shirt beside a sunlit arched window"
          className="block h-auto w-full"
        />
        <div className="absolute inset-0 bg-background/10" />

        <div className="absolute inset-0 z-10 mx-auto flex max-w-[1536px] items-start px-7 pt-10 md:px-[4.2%] md:pt-[9%]">

          <div className="max-w-[430px] text-espresso md:max-w-[470px]">
            <h1 className="font-serif text-[40px] font-medium leading-[1.12] md:text-[57px]">
              Understanding life<br className="hidden md:block" /> begins with<br className="hidden md:block" /> understanding of<br className="hidden md:block" /> patterns
            </h1>
            <div className="my-7 max-w-[440px] space-y-3 text-[13px] leading-[1.75] text-muted-foreground md:text-[16px]">
              <p>A thinking label using craft as expression.</p>
              <p>Exploring textiles and handicrafts as a way of understanding life — through evolving collections.</p>
              <p>Reimagining patterns, reshaping them, and creating one piece at a time.</p>
            </div>
            <Link
              to="/collections"
              className="inline-flex items-center gap-4 border-b border-espresso pb-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-espresso transition-opacity hover:opacity-65"
            >
              Explore Naqsh-E-Nigah <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-7 left-7 z-10 flex flex-col items-center gap-1 text-foreground md:left-[4.2%]">
          <span className="text-[12px] font-bold uppercase tracking-[0.16em]">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </div>
        <div className="absolute bottom-8 right-7 z-10 text-right text-foreground md:right-[4.2%]">
          <p className="text-[11px] uppercase tracking-[0.12em]">Inaugural Collection</p>
          <p className="my-2 font-serif text-[35px] leading-none">Naqsh-E-Nigāh</p>
          <p className="text-[11px] uppercase tracking-[0.12em]">Patterns of the vision</p>
        </div>
      </section>

      <section className="relative flex min-h-[700px] items-center justify-center overflow-hidden">
        <img
          src={philosophy.url}
          alt="Embroidered textile representing evolving patterns"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 px-6 text-center">
          {[
            <>Where making remains<br />but patterns evolve,</>,
            <>Where process<br />becomes perception,</>,
            <>Where nothing is fixed,<br />not even us.</>,
          ].map((line, index) => (
            <div key={index}>
              <h2 className="home-philosophy-text font-serif text-[32px] italic leading-[1.6] md:text-[38px]">{line}</h2>
              {index < 2 && <span className="mx-auto my-6 block h-px w-9 bg-background" />}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background p-3 md:p-5">
        <div className="grid min-h-[280px] grid-cols-1 gap-1 md:grid-cols-3">
          {featured.map((item) => (
            <Link
              key={item.slug}
              to="/product/$slug"
              params={{ slug: item.slug }}
              className="group relative flex min-h-[420px] items-center justify-center overflow-hidden bg-cream md:h-[50vh] md:min-h-0"
            >
              <img
                src={item.image}
                alt={`${item.name} shirt`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-foreground/75 via-foreground/20 to-transparent px-4 pb-8 text-center text-background">
                <div>
                  <h2 className="font-serif text-2xl uppercase">{item.name}</h2>
                  <span className="mx-auto my-2 block h-px w-2/3 bg-background" />
                  <p className="mb-4 text-xs font-light leading-relaxed">{item.copy}</p>
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

      <section aria-label="Visit our store" className="relative min-h-[680px] overflow-hidden md:min-h-0">
        <img src={sepia.url} alt="Warm sepia view of the store" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative flex min-h-[680px] flex-col items-stretch justify-center gap-6 p-6 md:flex-row md:gap-10 md:p-10">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden border-[10px] border-background md:mx-0 md:aspect-auto">
            <video className="h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata" poster={sepia.url}>
              <source src={processVideoWebm.url} type="video/webm" />
              <source src={processVideo.url} type="video/mp4" />
            </video>
          </div>
          <div className="mx-auto flex w-full max-w-[420px] items-center justify-center border-[10px] border-background bg-cream px-8 py-10 text-center md:mx-0 md:px-12 md:py-12">
            <div className="flex flex-col items-center gap-5">
              <h2 className="text-2xl font-bold uppercase leading-tight md:text-[26px]">Walk in and<br />wander a little</h2>
              <img src={motif.url} alt="Notions in Pattern motif" loading="lazy" className="h-7 w-7 object-contain" />
              <p className="max-w-[38ch] text-sm leading-relaxed md:text-[15px]">
                The doors open and some things stay with you. A scent that lingers long after you've left. A shaft of sunlight catching a shelf just right. A feeling you can't quite put your finger on. Experience it in person, only at the Nicobar store.
              </p>
              <Link to="/about-us" className="border-b border-foreground pb-1 text-xs font-semibold uppercase tracking-[0.14em] transition-opacity hover:opacity-70 md:text-sm">
                Find your nearest store
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AnnouncementBar />
      <Footer />
    </main>
  );
}
