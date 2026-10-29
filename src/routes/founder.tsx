import { StoreImage } from "@/components/store-image";
import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import logo from "@/assets/nip-monogram.png.asset.json";
import founder1 from "@/assets/founder_new_1.jpg.asset.json";
import founder2 from "@/assets/founder_new_2.png.asset.json";
import founder3 from "@/assets/founder_new_3.jpg.asset.json";
import founder4 from "@/assets/founder_new_4.png.asset.json";
import founder5 from "@/assets/founder_new_5.jpg.asset.json";
import founder6 from "@/assets/founder_new_6.jpeg.asset.json";
import founder7 from "@/assets/founder_new_7b.jpeg.asset.json";
import founder9 from "@/assets/founder_new_9.jpg.asset.json";

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

function TextBlock({ num, title, center, vCenter, footer, className, children }: { num: string; title: string; center?: boolean; vCenter?: boolean; footer?: React.ReactNode; className?: string; children: React.ReactNode }) {
  return (
    <div className={`p-3 sm:p-6 md:p-10 h-full min-w-0 flex flex-col ${center ? "justify-center text-center" : vCenter ? "justify-center text-left" : footer ? "justify-between" : "justify-start"} ${className ?? ""}`}>
      <div className={footer ? "flex-1 flex flex-col justify-center" : ""}>
        <h3 className="font-serif text-[14px] sm:text-[20px] md:text-[26px] leading-tight mb-2 md:mb-4" style={{ color: BROWN }}>
          <span className="mr-2">Ch {num} :</span>{title}
        </h3>
        <div className="text-[9px] sm:text-[12px] md:text-[13px] leading-[1.6] md:leading-[1.9] space-y-1.5 md:space-y-3" style={{ color: DARK }}>
          {children}
        </div>
      </div>
      {footer}
    </div>
  );
}

function ImgBlock({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-0 aspect-[10/9] overflow-hidden ${className ?? ""}`}>
      <StoreImage src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover block" />
    </div>
  );
}

function FounderPage() {
  return (
    <div className="min-h-[calc(100vh-10px)] m-[5px]" style={{ color: DARK }}>
      <Header solid solidInk="#E5D9C5" />

      {/* Story grid: hero + chapters share a single connected grid */}
      <section className="max-w-[1440px] mx-auto px-2 sm:px-8 md:px-16 pt-4 pb-20">
        <div className="grid grid-cols-2 gap-0">
          {/* Hero image */}
          <div className="h-full">
            <StoreImage src={founder1.url} loading="eager" fetchPriority="high" sizes="(min-width: 1440px) 656px, 50vw" alt="Neha Prasad" className="w-full h-full object-cover block" />
          </div>

          {/* Hero text */}
          <div className="p-3 sm:p-8 md:p-10 h-full min-w-0 flex flex-col justify-center" style={{ color: BROWN }}>
            <div className="w-fit">
              <div className="flex w-full flex-col items-center">
                <div aria-hidden="true" className="w-14 sm:w-24 aspect-[1483/1132] mb-2 sm:mb-4" />
                <p className="text-[7px] sm:text-[12px] font-bold tracking-[0.2em] sm:tracking-[0.28em] mb-2 sm:mb-4 whitespace-nowrap">FOUNDER <span className="relative inline-block"><StoreImage src={logo.url} sizes="(min-width: 640px) 96px, 56px" alt="Notions in Pattern" className="absolute bottom-[calc(100%+8px)] sm:bottom-[calc(100%+16px)] left-1/2 -translate-x-[36.7%] w-14 sm:w-24 max-w-none h-auto" />&amp;</span> DESIGNER</p>
              </div>
              <div className="w-16 h-px mb-6 mx-auto" style={{ backgroundColor: `${BROWN}66` }} />
              <h1 className="font-serif text-[26px] sm:text-6xl md:text-7xl leading-[1.05] tracking-tight mb-3">Neha Prasad</h1>

            </div>
          </div>

          {/* Ch 1 + Ch 2 stacked */}
          <div className="flex max-md:flex-row flex-col gap-0 max-md:col-span-2 max-md:order-1">
            <TextBlock num="1" title="I grew up moving.">
              <p>Army family.</p>
              <p>Sometimes the most metropolitan cities. Sometimes the most remote postings. Places most people never reach.</p>
              <p>It was in those places that I discovered craft that the world simply didn't know existed.</p>
            </TextBlock>
            <TextBlock num="2" title="Beautiful things in unexpected places.">
              <p>My father was posted in Assam. I was young, but it was my mother who first noticed, she always did. She would see something beautiful and immediately ask how she could make it her own. These discoveries came from the most unexpected sources, a word of mouth from a fellow Army wife, something spotted at a gathering, or something my father came across unexpectedly. No one was really looking. But they always had it coming to them.</p>
            </TextBlock>
          </div>
          <div className="relative w-full h-full min-h-0 aspect-[10/9] overflow-hidden max-md:col-span-2 max-md:order-2">
            <StoreImage src={founder2.url} alt="Two people sitting on the shore at sunset" className="absolute inset-0 w-full h-full object-cover object-[54%_100%] block" />
          </div>

          {/* Row 2 : image | text */}
          <ImgBlock src={founder3.url} alt="Two women embroidering" className="max-md:col-span-2 max-md:order-4" />
          <TextBlock num="3" title="Those pieces became my personality." vCenter className="max-md:col-span-2 max-md:order-3">
            <p>I wouldn't say it was something that was mindfully happening for me. How and when it became a part of me, I still don't know. And you know how parents are. If they made something for themselves, they would sometimes go out of their way to make an exquisite piece for us too. That is how it always happened. Beautiful things in unexpected places. People whose craft had no audience but their own love for it.</p>
            <p>I loved it. I enjoyed it. But I didn't always know what I was collecting.</p>
          </TextBlock>

          {/* Row 3 : text | image */}
          <TextBlock num="4" title="The path that shaped me." vCenter className="max-md:col-span-2 max-md:order-5">
            <p>It is only now, in my thirties, that I realise. Those people, those places, those pieces have become the most treasured things in me. The happiest parts of myself.</p>
            <p>I studied fashion and apparel design in Bangalore. Then spent years assisting on major films, advertising campaigns, and photoshoots and eventually working independently as a costume stylist. That world taught me how aesthetics work. How a garment carries a story. How deeply people attach to what they wear. How a particular piece can belong so completely to a particular person, a particular moment.</p>
          </TextBlock>
          <ImgBlock src={founder4.url} alt="Sketchbook and motifs" className="max-md:col-span-2 max-md:order-6" />

          {/* Row 4 : image | text */}
          <ImgBlock src={founder5.url} alt="Bara Imambara, Lucknow" className="max-md:col-span-2 max-md:order-8" />
          <TextBlock num="5" title="Coming back home." vCenter className="max-md:col-span-2 max-md:order-7">
            <p>Post COVID, I came back to Lucknow. Where my family finally settled after my father's retirement. The city where I did my schooling. The place I have always called my base. My city. My people.</p>
            <p>I came back because I wanted to spend real time here. And because I had always seen traditional chikankari. The blocks, the stitches, the craft. Worn so closely, so quietly. And I wanted to see what happened when the notions shifted. When the patterns evolved. But the effort stayed. The purity of the stitch stayed. And something new emerged.</p>
          </TextBlock>

          {/* Row 5 : text | image */}
          <TextBlock num="6" title="Naqsh-e-Nigāh." vCenter className="max-md:col-span-2 max-md:order-9">
            <p>That is why Naqsh-e-Nigāh Patterns of the Vision, became my first collection. Built from this city. Made and by the beautiful people here.</p>
            <p>I wanted to create pieces that weren't really there. The same blocks had been rotating for years. I wanted to ask: what if they changed? What if new notions could be formed? What if something rooted in real craft could also feel completely of today? I could be wrong. But what is wrong? That is my notion.</p>
            <p>And if such pieces existed at all, they were either exported or priced entirely out of reach. That is the space Notions in Pattern steps into.</p>
          </TextBlock>
          <ImgBlock src={founder6.url} alt="Chikankari embroidery close-up" className="max-md:col-span-2 max-md:order-10" />

          {/* Row 6 : complete rectangular photo, connected to the preceding row */}
          <div className="relative w-full h-full min-h-0 aspect-[10/9] overflow-hidden max-md:col-span-2 max-md:order-12">
            <StoreImage src={founder7.url} alt="Man carving a wooden block, and the studio at work" className="absolute inset-0 w-full h-full object-cover object-[20%_50%] block" />
          </div>
          <div className="flex max-md:flex-row flex-col gap-0 max-md:col-span-2 max-md:order-11">
          <TextBlock num="7" title="A day at Notions in Pattern." vCenter>
            <p>My typical day looks like swatches. Colours for dyes. Thread combinations. Sitting with my team, figuring things out together. The path is not always clear, but the destination always is. There are too many swatches in my bag. Too many threads. Random things everywhere.</p>
            <p>But a very clear vision.</p>
          </TextBlock>
          <TextBlock num="8" title="My people." vCenter>
            <p>My mother is a starist, a traveller, a doctor of Hindi literature. My father, a retired Army officer, art enthusiast, someone who writes beautifully, plays guitar, and loves to read. Craft and creativity have always run quietly through my family.</p>
            <p>I am what I am because of them.</p>
            <p>And I love to dance. That too.</p>
          </TextBlock>
          </div>

          {/* Row 7 : text | image */}
          <TextBlock num="9" title="With Gratitude." className="max-md:col-span-2 max-md:order-13" footer={<p className="font-serif text-center text-[13px] sm:text-[22px] md:text-[26px] mt-3 md:mt-8" style={{ color: BROWN }}>Here's to many more chapters...</p>}>
            <p>The concepts, the designs, the vision, those are mine. But the patterns that came to life, the craft that gave them form, that could only have come from people who truly know what they were doing.</p>
            <p>My artisans. My team.</p>
            <p>I do not take that lightly. I never will.</p>
            <p>If there is one thing this journey has given me, it is the privilege of sitting beside the people I love working with most. Learning from them. Moving with them. Creating together, of something that didn't exist before, according to us.</p>
            <p>That, more than anything, is where Notions in Pattern lives.</p>
          </TextBlock>
          <div className="w-full aspect-square overflow-hidden max-md:col-span-2 max-md:order-14">
            <StoreImage src={founder9.url} alt="Packing shirts and hand-marked NIP pouches in the studio" className="w-full h-auto object-cover block" />
          </div>
        </div>
      </section>

      <AnnouncementBar bg="#7B1113" color="#F7F4EE" />
      <Footer />
    </div>
  );
}

