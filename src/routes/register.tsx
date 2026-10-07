import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, ArrowLeft, UserPlus } from "lucide-react";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { useAuth, normalizeMobile, DEMO_OTP } from "@/lib/auth";
import accountBackground from "@/assets/register-wallpaper.jpg.asset.json";
import nipLogo from "@/assets/nip_logo.png.asset.json";

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
    <div className="mt-3 first:mt-0">
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="w-full border bg-transparent px-3 py-3 text-[13px] outline-none transition-colors focus:border-foreground"
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

      <main className="relative isolate flex-1 overflow-hidden">
        <div
          className="relative w-full min-h-[740px]"
          style={{ aspectRatio: "1920 / 1212" }}
        >
          <img
            src={accountBackground.url}
            alt="Man wearing a white NIP shirt drinking tea against a tropical wallpaper"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[35%_100%]"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-foreground/60 via-foreground/15 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-center px-5 py-10 sm:px-10 lg:px-[7.5%] lg:py-6">

        <section className="w-[39%] max-w-[410px] text-background sm:block">
          <h2 className="font-serif text-[26px] leading-[0.98] md:text-[34px] lg:text-[48px]">
            Why wait!<br />
            <em className="font-normal">C’mon.</em>
          </h2>
          <div className="my-3 h-px w-8 bg-background/70 md:my-4 lg:my-6" />
          <p className="font-serif text-[17px] leading-[1.05] md:text-[23px] lg:text-[31px]">
            Join us<br />
            and see us evolve.<br />
            Understand yourself.<br />
            Change <em>our</em> patterns.
          </p>
          <div className="my-3 h-px w-8 bg-background/70 md:my-4 lg:my-6" />
          <p className="font-serif text-[12px] leading-tight md:text-[15px] lg:text-[19px]">
            Nothing is fixed.<br />
            Not even us.
          </p>
          <div className="my-3 h-px w-8 bg-background/70 md:my-4 lg:my-6" />
          <p className="font-serif text-[12px] leading-tight md:text-[15px] lg:text-[19px]">
            Why not be a part<br />
            of the community?
          </p>
        </section>

        <section className="ml-auto w-full max-w-[355px] border border-foreground/70 bg-background/95 p-1 shadow-xl backdrop-blur-sm sm:translate-x-4 lg:translate-x-10">
          <div className="border border-foreground/35 px-6 py-2.5 sm:px-7 sm:py-3.5">
            <div className="flex flex-col items-center">
              <img src={nipLogo.url} alt="Notions in Pattern" className="h-24 w-auto object-contain md:h-28" />
            </div>

            <h1 className="mt-2.5 text-center font-serif text-[30px] leading-tight text-foreground">
              Create an account
            </h1>
            <p className="mx-auto mt-2 max-w-[300px] text-center text-[12px] leading-[1.45] text-foreground">
              Create an account to track your orders, save your wishlists, get exclusive
              discounts and everything else you love.
            </p>

            <div className="mt-5">
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

                <Button
                  type="button"
                  onClick={submitDetails}
                  className="mt-4 h-11 w-full rounded-none text-[11px] font-bold tracking-[0.24em]"
                  style={{ backgroundColor: BROWN, color: IVORY }}
                >
                  <UserPlus size={13} /> SEND OTP
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setStep("details");
                    setOtp("");
                    setError("");
                  }}
                  className="h-auto rounded-none p-0 text-[10px] font-bold tracking-[0.2em] hover:bg-transparent"
                  style={{ color: BROWN }}
                >
                  <ArrowLeft size={13} /> EDIT DETAILS
                </Button>

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

                <Button
                  type="button"
                  onClick={verify}
                  className="mt-5 h-11 w-full rounded-none text-[11px] font-bold tracking-[0.24em]"
                  style={{ backgroundColor: BROWN, color: IVORY }}
                >
                  <ShieldCheck size={13} /> VERIFY & CREATE ACCOUNT
                </Button>
              </>
            )}

            {error && (
              <p className="mt-4 text-[12px] font-bold text-center" style={{ color: "#7B1113" }}>
                {error}
              </p>
            )}

            <p className="mt-5 text-center text-[12px]" style={{ color: DARK }}>
              Already have an account?{" "}
              <Link to="/login" search={{ redirect }} className="font-bold underline" style={{ color: BROWN }}>
                Login
              </Link>
            </p>

            <div className="mt-3 flex flex-col items-center">
              <p className="font-serif text-[24px] font-semibold tracking-[0.35em]" style={{ color: BROWN }}>
                NIP
              </p>
              <p className="mt-1 text-[9px] font-semibold tracking-[0.32em]" style={{ color: BROWN }}>
                NOTIONS IN PATTERN
              </p>
              <p
                className="mt-2 text-[10px] font-medium tracking-[0.26em]"
                style={{ color: BROWN }}
              >
                YOU ARE YOUR PATTERNS.
              </p>
            </div>
            </div>
          </div>
        </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
