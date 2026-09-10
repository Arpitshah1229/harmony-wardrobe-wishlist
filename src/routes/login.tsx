import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Phone, ShieldCheck, ArrowLeft } from "lucide-react";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import { useAuth, normalizeMobile, DEMO_OTP } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/cart",
  }),
  head: () => ({
    meta: [
      { title: "Login | Notions in Pattern" },
      {
        name: "description",
        content:
          "Sign in with your mobile number and a one-time code to continue to checkout at Notions in Pattern.",
      },
      { property: "og:title", content: "Login | Notions in Pattern" },
      { property: "og:description", content: "Sign in with your mobile number and OTP." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const IVORY = "#F7F4EE";

function LoginPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const sendOtp = () => {
    if (normalizeMobile(mobile).length !== 10) {
      setError("Enter a valid 10 digit mobile number.");
      return;
    }
    setError("");
    setStep("otp");
  };

  const verify = () => {
    if (otp.trim() !== DEMO_OTP) {
      setError("Incorrect code. Please try again.");
      return;
    }
    setError("");
    login(mobile);
    navigate({ to: redirect as never });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <AnnouncementBar />

      <main className="flex-1 px-6 md:px-16 py-14 flex justify-center">
        <div className="w-full max-w-[440px]">
          <h1
            className="font-serif text-[34px] md:text-[42px] font-bold leading-tight text-center"
            style={{ color: BROWN }}
          >
            Login
          </h1>
          <p className="mt-3 text-center text-[13px] leading-relaxed" style={{ color: DARK }}>
            Enter your mobile number and we'll send you a one-time code.
          </p>

          <div className="mt-10 border p-7 md:p-9" style={{ borderColor: BROWN }}>
            {step === "mobile" ? (
              <>
                <label
                  className="block text-[11px] font-bold tracking-[0.22em]"
                  style={{ color: BROWN }}
                  htmlFor="mobile"
                >
                  MOBILE NUMBER
                </label>
                <div className="mt-3 flex items-center border" style={{ borderColor: BROWN }}>
                  <span
                    className="px-3 py-3 text-[13px] font-bold border-r"
                    style={{ borderColor: BROWN, color: BROWN }}
                  >
                    +91
                  </span>
                  <input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    onKeyDown={(e) => e.key === "Enter" && sendOtp()}
                    placeholder="98765 43210"
                    className="w-full bg-transparent px-3 py-3 text-[14px] outline-none"
                    style={{ color: DARK }}
                  />
                </div>

                <button
                  type="button"
                  onClick={sendOtp}
                  className="mt-7 w-full py-4 text-[12px] font-bold tracking-[0.24em] flex items-center justify-center gap-2"
                  style={{ backgroundColor: BROWN, color: IVORY }}
                >
                  <Phone size={13} /> SEND OTP
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setStep("mobile");
                    setOtp("");
                    setError("");
                  }}
                  className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em]"
                  style={{ color: BROWN }}
                >
                  <ArrowLeft size={13} /> CHANGE NUMBER
                </button>

                <p className="mt-5 text-[13px]" style={{ color: DARK }}>
                  We've sent a code to <span className="font-bold">+91 {normalizeMobile(mobile)}</span>
                </p>

                <label
                  className="mt-6 block text-[11px] font-bold tracking-[0.22em]"
                  style={{ color: BROWN }}
                  htmlFor="otp"
                >
                  ENTER OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  onKeyDown={(e) => e.key === "Enter" && verify()}
                  placeholder="1234"
                  className="mt-3 w-full border bg-transparent px-3 py-3 text-center text-[20px] tracking-[0.5em] outline-none"
                  style={{ borderColor: BROWN, color: DARK }}
                />

                <p
                  className="mt-3 text-[11px] font-bold tracking-[0.12em] text-center"
                  style={{ color: DARK }}
                >
                  Demo mode — use code {DEMO_OTP}
                </p>

                <button
                  type="button"
                  onClick={verify}
                  className="mt-7 w-full py-4 text-[12px] font-bold tracking-[0.24em] flex items-center justify-center gap-2"
                  style={{ backgroundColor: BROWN, color: IVORY }}
                >
                  <ShieldCheck size={13} /> VERIFY & LOGIN
                </button>
              </>
            )}

            {error && (
              <p className="mt-4 text-[12px] font-bold text-center" style={{ color: "#7B1113" }}>
                {error}
              </p>
            )}

            <p className="mt-8 pt-6 border-t text-center text-[12px]" style={{ borderColor: BROWN, color: DARK }}>
              New to Notions in Pattern?{" "}
              <Link
                to="/register"
                search={{ redirect }}
                className="font-bold underline"
                style={{ color: BROWN }}
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
