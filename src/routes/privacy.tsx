import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Notions in Pattern" },
      { name: "description", content: "Read the Notions in Pattern privacy policy to understand how we collect, use, and protect your personal information." },
      { property: "og:title", content: "Privacy Policy — Notions in Pattern" },
      { property: "og:description", content: "Read the Notions in Pattern privacy policy to understand how we collect, use, and protect your personal information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Information We Collect",
    points: [
      "Your name",
      "Email address",
      "Phone number",
      "Billing and shipping address",
      "Order and purchase details",
      "Information you provide when contacting our customer care team",
      "Any other information you voluntarily provide to us",
      "We may also automatically receive certain technical information when you use our website, such as your IP address, browser type, device information, pages visited, and general website usage information.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    intro: "We use your information to:",
    points: [
      "Process and fulfil your orders",
      "Arrange shipping and delivery",
      "Process payments",
      "Provide customer support",
      "Respond to questions, requests, and enquiries",
      "Process returns and exchanges",
      "Improve our website, products, and customer experience",
      "Communicate with you about your orders",
      "Send updates, offers, or other marketing communications where you have chosen to receive them",
      "Prevent fraud, misuse, or security issues",
      "Meet our legal and regulatory obligations",
    ],
    outro: "We only use personal information for purposes that are reasonably connected with providing and improving our services.",
  },
  {
    title: "3. Payments",
    paragraphs: [
      "Payments made through our website may be processed by third-party payment service providers.",
      "Your payment information may be handled directly by the relevant payment provider in accordance with its own privacy and security practices. We do not intend to store your complete card, UPI, or other payment credentials on our own systems.",
    ],
  },
  {
    title: "4. Shipping & Service Providers",
    paragraphs: [
      "To fulfil your order, we may share necessary information with trusted third-party service providers, such as payment processors, logistics and shipping partners, technology providers, and other service providers who help us operate our business.",
      "We only share information that is reasonably necessary for them to provide the relevant service.",
    ],
  },
  {
    title: "5. Cookies & Website Technologies",
    intro: "Our website may use cookies and similar technologies to help us:",
    points: [
      "Keep the website functioning properly",
      "Remember certain preferences",
      "Understand how visitors use our website",
      "Improve website performance and experience",
      "Measure the effectiveness of our communications and marketing",
    ],
    outro: "You may be able to manage or disable cookies through your browser settings. Some website features may not function properly if certain cookies are disabled.",
  },
  {
    title: "6. Marketing Communications",
    paragraphs: [
      "If you choose to receive communications from us, we may contact you by email, SMS, WhatsApp, or other available channels regarding NIP products, launches, offers, or updates.",
      "You can opt out of marketing communications at any time by using the unsubscribe option provided in the communication or by contacting us.",
      "Please note that even if you opt out of marketing communications, we may still contact you when necessary to fulfil an order or provide important service-related information.",
    ],
  },
  {
    title: "7. How We Protect Your Information",
    paragraphs: [
      "We take reasonable technical and organisational measures to protect your personal information from unauthorised access, misuse, loss, alteration, or disclosure.",
      "However, no method of transmitting or storing information online can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "8. How Long We Keep Your Information",
    paragraphs: [
      "We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including fulfilling orders, providing customer support, maintaining business and transaction records, resolving disputes, and complying with applicable legal or regulatory requirements.",
      "When information is no longer required, we will take reasonable steps to delete or anonymise it, subject to applicable law.",
    ],
  },
  {
    title: "9. Your Choices & Rights",
    intro: "Depending on applicable law, you may have rights relating to your personal information, including the ability to:",
    points: [
      "Request information about the personal data we hold about you",
      "Request correction of inaccurate or incomplete information",
      "Request deletion of your personal information where applicable",
      "Withdraw consent where processing is based on consent",
      "Opt out of marketing communications",
      "Raise a concern or grievance regarding the handling of your personal information",
    ],
    outro: "To make a privacy-related request, please contact us using the details below.",
  },
  {
    title: "10. Third-Party Websites",
    paragraphs: [
      "Our website may contain links to websites or services operated by third parties.",
      "We are not responsible for the privacy practices, content, or security of third-party websites. We encourage you to review their privacy policies before providing them with your information.",
    ],
  },
  {
    title: "11. Children's Privacy",
    paragraphs: [
      "Our website is not intended for children to independently place orders or provide personal information. If we become aware that personal information has been provided by a child in circumstances where applicable law requires otherwise, we will take appropriate steps in accordance with applicable law.",
    ],
  },
  {
    title: "12. Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes in our business, website, technology, or applicable laws.",
      'The updated version will be posted on this page with the revised "Last updated" date.',
    ],
  },
  {
    title: "13. Contact Us",
    paragraphs: [
      "If you have any questions, concerns, or requests relating to your personal information or this Privacy Policy, please contact us at:",
      "Email: care@yourdomain.com",
      "Notions in Pattern",
      "[Registered business name / legal entity]",
      "[Business address]",
    ],
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar bg="#7A8063" color="#F7F4EE" />
      <Header />

      {/* Masthead */}
      <section className="px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-10 text-center border-b border-border/60">
        <p className="text-[11px] font-bold tracking-[0.32em] mb-5" style={{ color: BROWN }}>
          NOTIONS IN PATTERN
        </p>
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black tracking-tight" style={{ color: BROWN }}>
          Privacy Policy
        </h1>
        <div className="mx-auto mt-6 flex items-center justify-center gap-3" style={{ color: BROWN }}>
          <span className="h-px w-16 bg-current opacity-40" />
          <span className="text-[10px] tracking-[0.3em] font-bold">✦</span>
          <span className="h-px w-16 bg-current opacity-40" />
        </div>
        <p className="mt-6 text-[11px] font-bold tracking-[0.24em]" style={{ color: BROWN }}>
          LAST UPDATED · 24 AUGUST 2026
        </p>
      </section>

      <main className="px-6 md:px-12 lg:px-20 py-14 md:py-20" style={{ color: DARK }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-serif text-xl md:text-2xl leading-relaxed mb-6">
            At Notions in Pattern (“NIP”, “we”, “us” or “our”), we value your trust and respect your privacy. This
            Privacy Policy explains what information we collect when you visit or shop through our website, how we use
            it, and the choices available to you.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-14 opacity-85">
            By using our website, you acknowledge the practices described below.
          </p>

          {/* Index */}
          <nav className="mb-16 border-y border-border/60 py-8">
            <p className="text-[11px] font-bold tracking-[0.26em] mb-5" style={{ color: BROWN }}>
              CONTENTS
            </p>
            <ol className="grid gap-x-10 gap-y-2 sm:grid-cols-2 text-[13px] leading-relaxed">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#s-${i + 1}`}
                    className="hover:opacity-60 transition-opacity font-medium"
                    style={{ color: BROWN }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-16">
            {sections.map((section, i) => (
              <section key={section.title} id={`s-${i + 1}`} className="scroll-mt-28">
                <div className="flex items-baseline gap-4 mb-5">
                  <span
                    className="font-serif text-3xl md:text-4xl font-black leading-none opacity-30"
                    style={{ color: BROWN }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-tight" style={{ color: BROWN }}>
                    {section.title.replace(/^\d+\.\s*/, "")}
                  </h2>
                </div>
                <div className="border-l pl-6 md:pl-8" style={{ borderColor: "rgba(75,53,40,0.25)" }}>
                  {section.intro && (
                    <p className="text-base md:text-lg leading-relaxed mb-4">{section.intro}</p>
                  )}
                  {section.points && (
                    <ul className="space-y-2.5 text-base md:text-lg leading-relaxed mb-4">
                      {section.points.map((point, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45" style={{ backgroundColor: BROWN, opacity: 0.5 }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.paragraphs && (
                    <div className="space-y-4 text-base md:text-lg leading-relaxed">
                      {section.paragraphs.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                    </div>
                  )}
                  {section.outro && (
                    <p className="text-base md:text-lg leading-relaxed mt-4">{section.outro}</p>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 border-t border-border/60 pt-8 text-center">
            <p className="font-serif text-xl md:text-2xl" style={{ color: BROWN }}>
              Thank you for trusting us with your details.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

