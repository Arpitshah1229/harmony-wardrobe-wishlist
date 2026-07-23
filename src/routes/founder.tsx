import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, BROWN, DARK } from "@/components/site-chrome";
import founder1 from "@/assets/founder_1.png.asset.json";
import founder2 from "@/assets/founder_2.png.asset.json";
import founder3 from "@/assets/founder_3.png.asset.json";
import founder4 from "@/assets/founder_4.png.asset.json";
import founder5 from "@/assets/founder_5.png.asset.json";
import founder6 from "@/assets/founder_6.png.asset.json";
import founder7 from "@/assets/founder_7.png.asset.json";
import founder8 from "@/assets/founder_8.png.asset.json";

export const Route = createFileRoute("/founder")({
  component: FounderPage,
  head: () => ({
    meta: [
      { title: "Founder — Notions in Pattern" },
      { name: "description", content: "Meet Neha Prasad, founder & designer of Notions in Pattern — her journey from Army postings to craft." },
      { property: "og:title", content: "Founder — Notions in Pattern" },
      { property: "og:description", content: "Meet Neha Prasad, founder & designer of Notions in Pattern." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function TextBlock({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="p-8 md:p-10 h-full flex flex-col justify-start">
      <h3 className="font-serif text-[22px] md:text-[26px] mb-4" style={{ color: BROWN }}>
        <span className="mr-2">Ch {num} —</span>{title}
      </h3>
      <div className="text-[13px] leading-[1.9] space-y-3" style={{ color: DARK }}>
        {children}
      </div>
    </div>
  );
}

function ImgBlock({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
}

function FounderPage() {
  return (
    <div className="min-h-[calc(100vh-10px)] m-[5px]" style={{ color: DARK }}>
      <Header />

      {/* Hero */}
      <section className="px-8 md:px-16 pt-4 pb-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <img src={founder1.url} alt="Neha Prasad" className="w-full h-auto object-cover" />
        </div>
        <div style={{ color: BROWN }}>
          <p className="text-[12px] font-bold tracking-[0.28em] mb-4">FOUNDER &amp; DESIGNER</p>
          <div className="w-16 h-px mb-6" style={{ backgroundColor: `${BROWN}66` }} />
          <h1 className="font-serif text-6xl md:text-7xl leading-[1.05] tracking-tight mb-3">Neha Prasad</h1>
          <p className="text-[18px] md:text-[20px]" style={{ color: DARK }}>Founder &amp; Designer</p>
          <div className="w-16 h-px mt-6" style={{ backgroundColor: `${BROWN}66` }} />
        </div>
      </section>

      {/* Story grid */}
      <section className="px-8 md:px-16 pb-20">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Row 1 : two stacked text blocks | one tall image */}
          <div className="flex flex-col gap-6 md:gap-8">
            <TextBlock num="1" title="I grew up moving.">
              <p>Army family.</p>
              <p>Sometimes the most metropolitan cities. Sometimes the most remote postings — places most people never reach.</p>
              <p>It was in those places that I discovered craft that the world simply didn't know existed.</p>
            </TextBlock>
            <TextBlock num="2" title="Beautiful things in unexpected places.">
              <p>My father was posted in Assam. I was young, but it was my mother who first noticed — she always did. She would see something beautiful and immediately ask how she could make it her own. These discoveries came from the most unexpected sources — a word of mouth from a fellow Army wife, something spotted at a gathering, something my father came across unexpectedly. No one was really looking. But they always had it coming to them.</p>
            </TextBlock>
          </div>
          <ImgBlock src={founder2.url} alt="River valley at sunset" />

          {/* Row 2 : image | text */}
          <ImgBlock src={founder3.url} alt="Two women embroidering" />
          <TextBlock num="3" title="Those pieces became my personality.">
            <p>I wouldn't say it was something that was mindfully happening for me. How and when it became a part of me — I still don't know. And you know how parents are. If they made something for themselves, they would sometimes go out of their way to make an exquisite piece for us too. That is how it always happened — beautiful things in unexpected places. People whose craft had no audience but their own love for it.</p>
            <p>I loved it. I enjoyed it. But I didn't always know what I was collecting.</p>
          </TextBlock>

          {/* Row 3 : text | image */}
          <TextBlock num="4" title="The path that shaped me.">
            <p>It is only now, in my thirties, that I realise — those people, those places, those pieces have become the most treasured things in me. The happiest parts of myself.</p>
            <p>I studied fashion and apparel design in Bangalore. Then spent years on-screen (film), and eventually working independently as a costume stylist. That world taught me how aesthetics work. How a garment carries a story. How deeply people attach to what they wear — how a particular piece can belong so completely to a particular person, a particular moment.</p>
          </TextBlock>
          <ImgBlock src={founder4.url} alt="Sketchbook and motifs" />

          {/* Row 4 : image | text */}
          <ImgBlock src={founder5.url} alt="Bara Imambara, Lucknow" />
          <TextBlock num="5" title="Coming back home.">
            <p>Post COVID, I came back to Lucknow. Where my family finally settled after my father's retirement. The city where I did my schooling. The place I have always called my base. My city. My people.</p>
            <p>I came back because I wanted to spend real time here. And because I had always seen traditional chikankari — the blocks, the stitches, the craft — worn so closely, so quietly. And I wanted to see what happened when the notions shifted. When the patterns evolved. But the effort stayed. The purity of the stitch stayed. And something new emerged.</p>
          </TextBlock>

          {/* Row 5 : text | image */}
          <TextBlock num="6" title="Naqsh-e-Nigāh.">
            <p>That is why Naqsh-e-Nigāh — Patterns of the Vision — became my first collection. Built from this city. Made with the beautiful people here.</p>
            <p>I wanted to create pieces that weren't really there. The same blocks had been rotating for years — I wanted to ask: what if they changed? What if new notions could be formed? What if something rooted in real craft could also feel completely of today? I could be wrong. But what is wrong? That is my notion.</p>
            <p>And if such pieces existed at all, they were either exported or priced entirely out of reach. That is the space Notions in Pattern steps into.</p>
          </TextBlock>
          <ImgBlock src={founder6.url} alt="Chikankari embroidery close-up" />

          {/* Row 6 : image | two stacked text */}
          <ImgBlock src={founder7.url} alt="Threads, swatches and tools" />
          <div className="flex flex-col gap-6 md:gap-8">
            <TextBlock num="7" title="A day at Notions in Pattern.">
              <p>My typical day looks like swatches. Colours for dyes. Thread combinations. Sitting with my team, figuring things out together. The path is not always clear — but the destination always is. There are too many swatches in my bag. Too many threads. Random things everywhere.</p>
              <p>But a very clear vision.</p>
            </TextBlock>
            <TextBlock num="8" title="My people.">
              <p>My mother is a starist, a traveller, a doctor of Hindi literature. My father — a retired Army officer, art enthusiast, someone who writes beautifully, plays guitar, and loves to read. Craft and creativity have always run quietly through my family.</p>
              <p>I am what I am because of them.</p>
              <p>And I love to dance. That too.</p>
            </TextBlock>
          </div>

          {/* Row 7 : text | image */}
          <TextBlock num="9" title="With Gratitude.">
            <p>The concepts, the designs, the vision — those are mine. But the patterns that came to life, the craft that gave them form — that could only have come from people who truly know what they were doing.</p>
            <p>My artisans. My team.</p>
            <p>I do not take that lightly. I never will.</p>
            <p>If there is one thing this journey has given me, it is the privilege of sitting beside the people who know. Learning from them. Moving with them. Creating, together, of something that didn't exist before.</p>
            <p>That, more than anything, is where Notions in Pattern lives.</p>
          </TextBlock>
          <ImgBlock src={founder8.url} alt="Team gathered around a table" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
