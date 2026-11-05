import { StoreImage } from "@/components/store-image";
import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { Header, Footer, AnnouncementBar, BROWN, DARK } from "@/components/site-chrome";
import { useAuth, normalizeMobile } from "@/lib/auth";
import loginBackground from "@/assets/login-background-right.jpg";
import nipLogo from "@/assets/nip_logo.png.asset.json";

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
          "Sign in with your mobile number to continue to checkout at Notions in Pattern.",
      },
      { property: "og:title", content: "Login | Notions in Pattern" },
      { property: "og:description", content: "Sign in with your mobile number and password." },
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

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (normalizeMobile(mobile).length !== 10) {
      setError("Enter a valid 10 digit mobile number.");
      return;
    }
    if (password.length < 6) {
      setError("Enter your password.");
      return;
    }
    const result = login(mobile, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate({ to: redirect as never });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <AnnouncementBar />

      <main className="relative isolate flex w-full flex-1 overflow-hidden">
        <div className="relative min-h-[610px] w-full flex-1">
          <StoreImage
            src={loginBackground}
            loading="eager"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-right max-sm:origin-right max-sm:scale-[1.1] max-sm:translate-x-[1.1cm] sm:hidden"
          />
          <StoreImage
            src={loginBackground}
            loading="eager"
            fetchPriority="high"
            alt="Man relaxing on an ornate bench wearing a green NIP shirt"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-right max-sm:hidden"
          />
          <div className="absolute inset-0 -z-10 bg-foreground/20" aria-hidden="true" />
          <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 w-[22px] backdrop-blur-md sm:hidden" />
          <div aria-hidden="true" className="login-edge-blur login-edge-blur-left max-sm:hidden" />
          <div aria-hidden="true" className="login-edge-blur login-edge-blur-right max-sm:hidden" />

          <div className="absolute inset-y-0 left-1/2 flex w-full max-w-[1440px] -translate-x-1/2 items-center max-sm:items-start max-sm:px-1 max-sm:pt-[19vh] px-5 py-10 sm:px-10 lg:px-[7%] lg:py-8">




        <section className="hidden w-[40%] max-w-[420px] text-background lg:block">
          <p className="font-serif text-[33px] font-bold leading-[1.18]">
            Join us<br />
            and see us evolve.<br />
            Understand yourself.<br />
            Change <em>our</em> patterns.
          </p>
          <div className="my-7 h-px w-9 bg-background/70" />
          <p className="font-serif text-[19px] font-semibold leading-tight">
            Nothing is fixed.<br />
            Not even us.
          </p>
          <div className="my-7 h-px w-9 bg-background/70" />
          <p className="font-serif text-[19px] font-semibold leading-tight">
            Why not be a part<br />
            of the community?
          </p>
          <div className="my-7 h-px w-9 bg-background/70" />
          <p className="mt-10 text-[13px] font-semibold tracking-[0.28em]">NOTIONS IN PATTERN</p>
          <p className="mt-2 text-[10px] font-semibold tracking-[0.22em]">
            CLOTHING · LIFESTYLE · HANDCRAFTED IN INDIA
          </p>
        </section>

        <section className="mx-auto w-full max-w-[355px] border border-foreground/70 bg-background/95 p-1 shadow-xl backdrop-blur-sm max-sm:ml-0 max-sm:mr-auto max-sm:max-w-[280px] max-sm:origin-top-left max-sm:scale-[0.57] min-[360px]:max-sm:scale-[0.64] min-[390px]:max-sm:scale-[0.70] min-[412px]:max-sm:scale-[0.74] min-[430px]:max-sm:scale-[0.77] max-sm:bg-background/90 sm:-translate-x-40">
          <div className="border border-foreground/35 px-6 py-2.5 max-sm:px-4 max-sm:py-2 sm:px-7 sm:py-3.5">
            <h1 className="relative mx-auto mt-[78px] w-fit text-center font-serif text-[30px] leading-tight text-foreground max-sm:mt-[58px] max-sm:text-[26px] md:mt-[91px]">
              <StoreImage
                src={nipLogo.url}
                alt="Notions in Pattern"
                className="absolute bottom-full left-1 h-24 w-auto max-w-none object-contain -translate-x-[22.97%] translate-y-[11%] max-sm:h-[72px] md:h-28"
              />
              Login
            </h1>
            <p className="mt-1 text-center font-serif text-[17px]" style={{ color: DARK }}>
              Let us know you.
            </p>

            <div className="mt-3 flex items-center border" style={{ borderColor: BROWN }}>
              <span
                className="border-r px-3 py-2.5 text-[13px] font-bold"
                style={{ borderColor: BROWN, color: BROWN }}
              >
                +91
              </span>
              <label className="sr-only" htmlFor="mobile">
                Mobile number
              </label>
              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Mobile number"
                className="w-full bg-transparent px-3 py-2.5 text-[13px] outline-none"
                style={{ color: DARK }}
              />
            </div>

            <div className="mt-2.5 flex items-center border" style={{ borderColor: BROWN }}>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Password"
                className="w-full bg-transparent px-3 py-2.5 text-[13px] outline-none"
                style={{ color: DARK }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="px-3 py-2.5"
                style={{ color: BROWN }}
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[12px]" style={{ color: DARK }}>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="h-3.5 w-3.5 accent-[#4B3528]"
                />
                Keep me signed in
              </label>
              <button type="button" className="hover:underline" style={{ color: DARK }}>
                Forgot password?
              </button>
            </div>

            <button
              type="button"
              onClick={submit}
              className="mt-3 flex w-full items-center justify-center gap-2 py-3 text-[12px] font-bold tracking-[0.24em]"
              style={{ backgroundColor: BROWN, color: IVORY }}
            >
              LOGIN <span aria-hidden="true">→</span>
            </button>

            {error && (
              <p className="mt-4 text-center text-[12px] font-bold" style={{ color: "#7B1113" }}>
                {error}
              </p>
            )}

            <div className="mt-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-[12px]" style={{ color: DARK }}>
                or continue with
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Continue with Google"
                className="flex h-10 w-10 items-center justify-center rounded-full border"
                style={{ borderColor: BROWN }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    fill="#4B3528"
                    d="M12 11v2.6h6.1c-.3 1.7-2 5-6.1 5A6.6 6.6 0 0 1 12 5.4c1.7 0 3 .7 3.8 1.5l2-1.9A9.2 9.2 0 0 0 12 2.4 9.6 9.6 0 1 0 12 21.6c5.5 0 9.2-3.9 9.2-9.3 0-.6-.1-1-.1-1.3H12Z"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Continue with Apple"
                className="flex h-10 w-10 items-center justify-center rounded-full border"
                style={{ borderColor: BROWN }}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path
                    fill="#2C2110"
                    d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.8-1.4-.1-2.6.8-3.3.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.5ZM14.3 5.8c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.7-1 1.7-.9 2.6 1 .1 2-.5 2.6-1.2Z"
                  />
                </svg>
              </button>
            </div>

            <p className="mt-3 text-center text-[12px]" style={{ color: DARK }}>
              New to NIP?{" "}
              <Link
                to="/register"
                search={{ redirect }}
                className="underline"
                style={{ color: BROWN }}
              >
                Create an account
              </Link>
            </p>

            <div className="mt-3 flex flex-col items-center">
              <p className="font-serif text-[24px] font-semibold tracking-[0.35em]" style={{ color: BROWN }}>
                NIP
              </p>
              <p
                className="mt-2 text-[10px] font-medium tracking-[0.26em]"
                style={{ color: BROWN }}
              >
                YOU ARE YOUR PATTERNS.
              </p>
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
