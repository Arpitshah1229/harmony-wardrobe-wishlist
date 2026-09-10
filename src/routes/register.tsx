import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, ArrowLeft, UserPlus } from "lucide-react";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import { useAuth, normalizeMobile, DEMO_OTP } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/cart",
  }),
  head: () => ({
    meta: [
      { title: "Create Account | Notions in Pattern" },
      {
        name: "description",
        content:
          "Create your Notions in Pattern account with your name, mobile number and email to check out faster.",
      },
      { property: "og:title", content: "Create Account | Notions in Pattern" },
      { property: "og:description", content: "Register with your name, mobile number and email." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const IVORY = "#F7F4EE";

function Field({
  id,
  label,
  ...props
}: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mt-6 first:mt-0">
      <label className="block text-[11px] font-bold tracking-[0.22em]" style={{ color: BROWN }} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="mt-3 w-full border bg-transparent px-3 py-3 text-[14px] outline-none"
        style={{ borderColor: BROWN, color: DARK }}
        {...props}
      />
    </div>
  );
}

function RegisterPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { register } = useAuth();

  const [step, setStep] = useState<"details" | "otp">("details");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const submitDetails = () => {
    if (name.trim().length < 2) return setError("Please enter your full name.");
    if (normalizeMobile(mobile).length !== 10) return setError("Enter a valid 10 digit mobile number.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError("Enter a valid email address.");
    setError("");
    setStep("otp");
  };

  const verify = () => {
    if (otp.trim() !== DEMO_OTP) {
      setError("Incorrect code. Please try again.");
      return;
    }
    setError("");
    register({ name: name.trim(), mobile, email: email.trim() });
    navigate({ to: redirect as never });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <AnnouncementBar />

      <main className="flex-1 px-6 md:px-16 py-14 flex justify-center">
        <div className="w-full max-w-[460px]">
          <h1
            className="font-serif text-[34px] md:text-[42px] font-bold leading-tight text-center"
            style={{ color: BROWN }}
          >
            Create Account
          </h1>
          <p className="mt-3 text-center text-[13px] leading-relaxed" style={{ color: DARK }}>
            A few details and you're ready to check out.
          </p>

          <div className="mt-10 border p-7 md:p-9" style={{ borderColor: BROWN }}>
            {step === "details" ? (
              <>
                <Field
                  id="name"
                  label="NAME"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                />
                <Field
                  id="mobile"
                  label="MOBILE NUMBER"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="98765 43210"
                  autoComplete="tel"
                />
                <Field
                  id="email"
                  label="EMAIL ID"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  autoComplete="email"
                />

                <button
                  type="button"
                  onClick={submitDetails}
                  className="mt-7 w-full py-4 text-[12px] font-bold tracking-[0.24em] flex items-center justify-center gap-2"
                  style={{ backgroundColor: BROWN, color: IVORY }}
                >
                  <UserPlus size={13} /> SEND OTP
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setStep("details");
                    setOtp("");
                    setError("");
                  }}
                  className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.2em]"
                  style={{ color: BROWN }}
                >
                  <ArrowLeft size={13} /> EDIT DETAILS
                </button>

                <p className="mt-5 text-[13px]" style={{ color: DARK }}>
                  We've sent a code to <span className="font-bold">+91 {normalizeMobile(mobile)}</span>
                </p>

                <label
                  className="mt-6 block text-[11px] font-bold tracking-[0.22em]"
                  style={{ color: BROWN }}
                  htmlFor="reg-otp"
                >
                  ENTER OTP
                </label>
                <input
                  id="reg-otp"
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
                  <ShieldCheck size={13} /> VERIFY & CREATE ACCOUNT
                </button>
              </>
            )}

            {error && (
              <p className="mt-4 text-[12px] font-bold text-center" style={{ color: "#7B1113" }}>
                {error}
              </p>
            )}

            <p className="mt-8 pt-6 border-t text-center text-[12px]" style={{ borderColor: BROWN, color: DARK }}>
              Already have an account?{" "}
              <Link to="/login" search={{ redirect }} className="font-bold underline" style={{ color: BROWN }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
