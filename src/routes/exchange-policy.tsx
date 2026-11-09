import { createFileRoute } from "@tanstack/react-router";
import { Fragment, type ReactNode } from "react";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";

export const Route = createFileRoute("/exchange-policy")({
  head: () => ({
    meta: [
      { title: "Exchange, Store Credit & Refund Policy — Notions in Pattern" },
      {
        name: "description",
        content:
          "Exchanges and store credit within 7 days of delivery, cancellations within 24 hours, and how to reach Notions in Pattern customer care.",
      },
      { property: "og:title", content: "Exchange, Store Credit & Refund Policy — Notions in Pattern" },
      {
        property: "og:description",
        content: "Exchanges, store credit, refunds and cancellations at Notions in Pattern.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExchangePolicyPage,
});

const PHONE = "+91 75218 02791";
const WA = "https://wa.me/917521802791";
const gmail = (to: string) => `https://mail.google.com/mail/?view=cm&fs=1&to=${to}`;

const HIGHLIGHT = /(7 days|24 hours|3 months|3–5\s+business days)/g;
function hl(text: string): ReactNode {
  return text.split(HIGHLIGHT).map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        className="whitespace-nowrap border-b border-[#C9B79C] bg-beige/50 px-1 font-semibold"
        style={{ color: BROWN }}
      >
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

const Email = ({ to }: { to: string }) => (
  <a
    href={gmail(to)}
    target="_blank"
    rel="noreferrer"
    className="font-medium underline decoration-[#C9B79C] underline-offset-[7px] [text-decoration-thickness:1px] transition-opacity hover:opacity-70"
    style={{ color: BROWN }}
  >
    {to}
  </a>
);
const Whats = () => (
  <a
    href={WA}
    target="_blank"
    rel="noreferrer"
    className="whitespace-nowrap font-medium underline decoration-[#C9B79C] underline-offset-[7px] [text-decoration-thickness:1px] transition-opacity hover:opacity-70"
    style={{ color: BROWN }}
  >
    {PHONE}
  </a>
);

const P = ({ children }: { children: ReactNode }) => <p className="leading-[1.85]">{children}</p>;
const List = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-2.5 pl-1">
    {items.map((it, i) => (
      <li key={i} className="flex gap-3 leading-[1.8]">
        <span className="mt-[0.7em] h-[5px] w-[5px] shrink-0 rotate-45 bg-[#B9A486]" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);
const Sub = ({ n, title, children }: { n?: string; title: string; children: ReactNode }) => (
  <div className="space-y-4">
    {title && (
      <h3 className="flex items-baseline gap-3 font-serif text-[22px] md:text-[24px]" style={{ color: BROWN }}>
        {n && <span className="font-sans text-[12px] font-semibold tracking-[0.2em] opacity-60">{n}</span>}
        {title}
      </h3>
    )}
    <div className="space-y-4 text-[15px] md:text-[16px]">{children}</div>
  </div>
);

type Section = { letter: string; title: string; body: ReactNode };

const sections: Section[] = [
  {
    letter: "A",
    title: "RETURN & EXCHANGE ELIGIBILITY",
    body: (
      <>
        <Sub n="1." title="7-Day Window">
          <P>{hl("We offer exchanges or store credit for eligible items requested within 7 days of delivery.")}</P>
          <P>To qualify, items must be:</P>
          <List
            items={[
              "Unworn, unwashed and unused.",
              "In their original condition.",
              "Returned with all original tags, labels and packaging intact.",
            ]}
          />
        </Sub>
        <Sub n="2." title="Non-Returnable Items">
          <P>The following items are not eligible for return or exchange:</P>
          <List
            items={[
              "Items purchased during a sale or from the Archive section.",
              "Customised garments, including pieces with personalised length or fit alterations.",
            ]}
          />
          <P>These exclusions do not affect any remedies available under applicable consumer protection laws.</P>
        </Sub>
      </>
    ),
  },
  {
    letter: "B",
    title: "REFUNDS & STORE CREDIT",
    body: (
      <>
        <Sub n="1." title="Store Credit">
          <P>For eligible returns, we offer store credit instead of refunds to the original payment method.</P>
          <List
            items={[
              hl("Store credit is valid for 3 months from the date of issue."),
              "It can be redeemed exclusively on the Notions in Pattern website.",
              "Store credit is non-transferable and cannot be exchanged for cash.",
              "Any unused balance will expire at the end of its validity period.",
            ]}
          />
        </Sub>
        <Sub n="2." title="Refunds for Defective or Incorrect Products">
          <P>
            In the event of a verified manufacturing defect, damaged product or incorrect item being delivered, we will
            arrange an appropriate resolution, which may include a replacement or refund to the original payment method,
            as applicable under law.
          </P>
        </Sub>
      </>
    ),
  },
  {
    letter: "C",
    title: "EXCHANGES",
    body: (
      <>
        <Sub n="1." title="How to Initiate an Exchange">
          <P>
            To initiate an exchange or request store credit, please email us at{" "}
            <Email to="hello@notionsinpattern.com" /> or WhatsApp us at <Whats /> {hl("within 7 days of delivery.")}
          </P>
          <P>Please include:</P>
          <List
            items={[
              "Your order number.",
              "The name of the product.",
              "The reason for the exchange or return.",
              "Photographs, where applicable.",
            ]}
          />
          <P>we will guide you through the next steps.</P>
        </Sub>
        <Sub n="2." title="Shipping Your Return">
          <P>At present, we do not offer reverse pickup services.</P>
          <P>
            Customers are required to arrange and ship the product to our registered return address. We recommend using
            a reliable courier service with tracking.
          </P>
          <P>
            The customer will be responsible for return shipping costs for exchanges or change-of-mind returns. This
            does not apply to verified defective, damaged or incorrectly shipped products, for which NIP will arrange an
            appropriate resolution.
          </P>
        </Sub>
        <Sub n="3." title="Inspection & Processing">
          <P>Once the returned product reaches us, it will undergo a quality inspection.</P>
          <P>
            {hl(
              "Approved exchanges or store credits will be processed within 3–5 business days of receiving and inspecting the product.",
            )}
          </P>
          <P>Exchanges are subject to stock availability.</P>
        </Sub>
      </>
    ),
  },
  {
    letter: "D",
    title: "ORDER CANCELLATION POLICY",
    body: (
      <Sub title="">
        <P>
          {hl(
            "Orders can be cancelled within 24 hours of placement, provided they have not already entered processing, customisation or dispatch.",
          )}
        </P>
        <P>
          Once an order has been processed or dispatched, cancellation requests cannot be accommodated under this
          policy.
        </P>
        <P>
          To request a cancellation, please contact us at <Email to="hello@notionsinpattern.com" /> or <Whats />.
        </P>
      </Sub>
    ),
  },
  {
    letter: "E",
    title: "DAMAGED, DEFECTIVE OR INCORRECT ITEMS",
    body: (
      <>
        <Sub n="1." title="Reporting an Issue">
          <P>Every Notions in Pattern piece undergoes a quality check before dispatch.</P>
          <P>
            {hl(
              "However, in an unlikely situation, if you receive a damaged,or incorrect product, please notify us within 24 hours of delivery.",
            )}
          </P>
          <P>Please share your order number along with clear photographs or videos showing the issue.</P>
        </Sub>
        <Sub n="2." title="Resolution">
          <P>
            Once the issue has been reviewed and verified, we will arrange a replacement of the same product at no
            additional cost, subject to availability.
          </P>
          <P>
            If the product is unavailable, we will discuss an appropriate alternative or refund, as applicable under
            law.
          </P>
          <P>NIP will bear the applicable shipping costs for verified defective or incorrectly shipped products.</P>
        </Sub>
      </>
    ),
  },
  {
    letter: "F",
    title: "IMPORTANT NOTES",
    body: (
      <Sub title="">
        <List
          items={[
            "Products must be returned in their original condition, without signs of wear, washing, damage or alteration.",
            "Returns that do not meet the eligibility requirements may be declined.",
            "Please retain your courier receipt and tracking details until your return has been received and processed.",
            "This policy does not limit any rights available to consumers under applicable Indian laws.",
          ]}
        />
      </Sub>
    ),
  },
  {
    letter: "G",
    title: "RETURN & EXCHANGE SUPPORT",
    body: (
      <div className="space-y-7 text-[15px] md:text-[16px]">
        <P>For all return, exchange and store-credit-related queries, please contact us:</P>

        <div className="divide-y divide-border border border-border bg-cream/60">
          <div className="flex flex-col gap-1.5 px-5 py-5 sm:flex-row sm:items-baseline sm:gap-7 sm:px-6 sm:py-6">
            <span className="w-[110px] shrink-0 text-[11px] font-semibold tracking-[0.22em] opacity-70">EMAIL</span>
            <p className="font-serif text-[18px] leading-snug md:text-[20px]">
              <Email to="hello@notionsinpattern.com" />
            </p>
          </div>
          <div className="flex flex-col gap-1.5 px-5 py-5 sm:flex-row sm:items-baseline sm:gap-7 sm:px-6 sm:py-6">
            <span className="w-[110px] shrink-0 text-[11px] font-semibold tracking-[0.22em] opacity-70">
              WHATSAPP
            </span>
            <p className="font-serif text-[18px] leading-snug md:text-[20px]">
              <Whats />
            </p>
          </div>
        </div>

        <div className="space-y-5 border-l-2 border-[#C9B79C] pl-6 md:space-y-6 md:pl-8">
          <P>
            All returns and exchanges must be approved by our team before the product is shipped back. Once your
            request is approved, the return shipping address and instructions will be shared with you privately.
          </P>
          <P>
            Please note that the customer is responsible for all return shipping charges. Products must not be
            dispatched without prior approval.
          </P>
        </div>

        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border/60 pt-5 text-[13px] tracking-[0.08em]">
          <span className="text-[11px] font-semibold tracking-[0.22em] opacity-70">GSTIN:</span>
          <span className="font-medium">09AAHCN5057E1ZD</span>
        </p>
      </div>
    ),
  },
];

function ExchangePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      <section className="animate-in fade-in slide-in-from-bottom-3 border-b border-border/60 px-6 pb-12 pt-14 text-center duration-700 md:px-12 md:pb-16 md:pt-24">
        <p className="mb-5 text-[11px] font-semibold tracking-[0.32em]" style={{ color: BROWN }}>
          CUSTOMER CARE
        </p>
        <h1
          className="mx-auto max-w-4xl font-serif text-[38px] leading-[1.1] sm:text-5xl md:text-6xl"
          style={{ color: BROWN }}
        >
          Exchange, Store Credit &amp; Refund Policy
        </h1>
        <div className="mx-auto mt-7 flex items-center justify-center gap-3" style={{ color: BROWN }}>
          <span className="h-px w-16 bg-current opacity-30" />
          <span className="text-[10px]">✦</span>
          <span className="h-px w-16 bg-current opacity-30" />
        </div>
      </section>

      <main className="policy-page mx-auto w-full max-w-[1440px] px-6 py-12 md:px-12 md:py-20" style={{ color: DARK }}>
        <div className="policy-col mx-auto max-w-3xl">
          <p className="animate-in fade-in mb-14 font-serif text-[20px] leading-relaxed duration-1000 md:text-[24px]">
            At Notions in Pattern, every piece is thoughtfully created with attention to detail, craftsmanship and
            quality. We want you to feel confident about your purchase. If something isn't quite right, our exchange and
            store credit policy is designed to help.
          </p>

          <nav className="mb-14 border-y border-border/60 py-6">
            <ol className="grid gap-x-10 gap-y-2 text-[13px] sm:grid-cols-2">
              {sections.map((s) => (
                <li key={s.letter}>
                  <a
                    href={`#policy-${s.letter}`}
                    className="font-medium tracking-[0.08em] transition-opacity hover:opacity-60"
                    style={{ color: BROWN }}
                  >
                    {s.letter}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            {sections.map((s, i) => (
              <section
                key={s.letter}
                id={`policy-${s.letter}`}
                className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both scroll-mt-28 border-b border-border/60 py-10 duration-700 first:pt-0 last:border-b-0 md:py-14"
                style={{ animationDelay: `${Math.min(i, 4) * 90}ms` }}
              >
                <h2
                  className="mb-8 flex items-baseline gap-4 text-[13px] font-semibold tracking-[0.24em] md:text-[14px]"
                  style={{ color: BROWN, fontFamily: "var(--font-sans)" }}
                >
                  <span className="font-serif text-[34px] font-normal leading-none tracking-normal md:text-[40px]">
                    {s.letter}.
                  </span>
                  {s.title}
                </h2>
                <div className="space-y-9">{s.body}</div>
              </section>
            ))}
          </div>

          <p
            className="mt-6 border-t border-border/60 pt-10 text-center font-serif text-[20px] italic leading-relaxed md:text-[22px]"
            style={{ color: BROWN }}
          >
            We appreciate your understanding and thank you for being a part of Notions in Pattern.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
