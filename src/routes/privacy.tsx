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
      <main className="px-6 md:px-12 lg:px-20 py-16 md:py-24" style={{ color: DARK }}>
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ color: BROWN }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base font-medium mb-14" style={{ color: BROWN }}>
            Last updated: 24 August 2026
          </p>

          <p className="text-base md:text-lg leading-relaxed mb-10">
            At Notions in Pattern (“NIP”, “we”, “us” or “our”), we value your trust and respect your privacy. This Privacy Policy explains what information we collect when you visit or shop through our website, how we use it, and the choices available to you.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-16">
            By using our website, you acknowledge the practices described below.
          </p>

          <div className="space-y-14">
            {sections.map((section) => (
              <section key={section.title}>
                <h2
                  className="text-xl md:text-2xl font-bold tracking-tight mb-4"
                  style={{ color: BROWN }}
                >
                  {section.title}
                </h2>
                {section.intro && (
                  <p className="text-base md:text-lg leading-relaxed mb-3">{section.intro}</p>
                )}
                {section.points && (
                  <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed mb-3">
                    {section.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
                {section.paragraphs && (
                  <div className="space-y-3 text-base md:text-lg leading-relaxed">
                    {section.paragraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                )}
                {section.outro && (
                  <p className="text-base md:text-lg leading-relaxed mt-3">{section.outro}</p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
